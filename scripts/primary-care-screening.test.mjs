// Primary Care Screening engine (2026-11-26).   node --test scripts/primary-care-screening.test.mjs
// Each case is hand-derived from the issuing body's statement; the source is named beside it.
import { test } from 'node:test';
import assert from 'node:assert/strict';
import {
  screenPatient, summaryText, defaultPreg, avoidLabel, isPatientStop, PCS_SOURCES, PCS_CITATIONS, PCS_FLAG_GROUPS, PCS_GROUP_ORDER, PCS_GROUP_LABELS,
} from '../src/components/primary-care-screening-engine.ts';
import { PRIMARY_CARE_SCREENING_NODES, PRIMARY_CARE_SCREENING_CITATIONS, PRIMARY_CARE_SCREENING_CRITICAL_ACTIONS } from '../src/data/trees/primary-care-screening.ts';

const YEAR = 2026;
const P = (age, sex, extra = {}) => ({ age, sex, preg: 'no', tobacco: 'never', flags: [], year: YEAR, ...extra });
const run = (...a) => screenPatient(P(...a)).recs;
const get = (recs, id) => recs.find(r => r.id === id);
const tier = (recs, id) => get(recs, id)?.tier;
const ALL_FLAGS = PCS_FLAG_GROUPS.flatMap(g => g.flags.map(f => f.id));

test('age gate: under 18 and nonsense ages return a notice, no recommendations', () => {
  for (const age of [0, 5, 17, -1, 121, NaN]) {
    const r = screenPatient(P(age, 'female'));
    assert.ok(r.notice, `age ${age}`);
    assert.equal(r.recs.length, 0);
  }
  assert.equal(screenPatient(P(18, 'male')).notice, undefined);
});

test('integrity: every recommendation is sourced, grouped and unique, across the whole input space', () => {
  let seen = 0;
  const usedSources = new Set();
  for (const sex of ['female', 'male']) {
    for (let age = 18; age <= 100; age++) {
      const pregs = sex === 'female' ? ['no', 'possible', 'pregnant'] : ['no'];
      for (const preg of pregs) for (const tobacco of ['never', 'current', 'former']) {
        for (const flags of [[], ...ALL_FLAGS.map(f => [f]), ALL_FLAGS]) {
          const { recs, notice } = screenPatient({ age, sex, preg, tobacco, flags, year: YEAR });
          assert.equal(notice, undefined);
          assert.equal(new Set(recs.map(r => r.id)).size, recs.length, `duplicate id at ${sex} ${age} ${flags}`);
          for (const r of recs) {
            seen++;
            assert.ok(r.src.length >= 1, `${r.id} has no source`);
            for (const k of r.src) { assert.ok(PCS_SOURCES[k], `${r.id} cites unknown source ${k}`); usedSources.add(k); }
            assert.ok(PCS_GROUP_ORDER.includes(r.group) && PCS_GROUP_LABELS[r.group], `${r.id} group`);
            assert.ok(['do', 'discuss', 'avoid', 'unknown'].includes(r.tier));
            assert.ok(['today', 'refer', 'either'].includes(r.where));
            for (const field of ['title', 'action', 'why', 'strength']) {
              assert.ok(r[field] && r[field].trim().length >= 3, `${r.id}.${field} empty`);
              assert.ok(!/undefined|NaN|\[object/.test(r[field]), `${r.id}.${field} leaked a value: ${r[field]}`);
            }
            if (r.other !== undefined) assert.ok(r.other.length > 10);
          }
        }
      }
    }
  }
  assert.ok(seen > 100000, `sweep looked at ${seen} recommendations`);
  // No dead entries: every declared source is cited by at least one rule.
  for (const k of Object.keys(PCS_SOURCES)) assert.ok(usedSources.has(k), `source ${k} is never cited`);
});

test('sources: each has a citation and an https URL on the issuing body\'s domain', () => {
  const allowed = /^https:\/\/(www\.uspreventiveservicestaskforce\.org|www\.cdc\.gov|www\.cancer\.org|diabetesjournals\.org|doi\.org|kdigo\.org|dailymed\.nlm\.nih\.gov|pmc\.ncbi\.nlm\.nih\.gov|www\.aafp\.org|www\.acog\.org|acgcdn\.gi\.org)\//;
  for (const [k, s] of Object.entries(PCS_SOURCES)) {
    assert.match(s.url, allowed, k);
    assert.ok(s.cite.length > 20, k);
  }
  assert.equal(PCS_CITATIONS.length, Object.keys(PCS_SOURCES).length);
});

test('colorectal (USPSTF 2021): 45-49 B, 50-75 A, 76-85 C, stop after 85; nothing at 44', () => {
  assert.equal(get(run(44, 'male'), 'crc'), undefined);
  assert.equal(get(run(45, 'male'), 'crc').strength, 'USPSTF grade B');
  assert.equal(get(run(49, 'female'), 'crc').strength, 'USPSTF grade B');
  assert.equal(get(run(50, 'female'), 'crc').strength, 'USPSTF grade A');
  assert.equal(tier(run(75, 'male'), 'crc'), 'do');
  assert.equal(tier(run(76, 'male'), 'crc'), 'discuss');
  assert.equal(tier(run(85, 'male'), 'crc'), 'discuss');
  assert.equal(tier(run(86, 'male'), 'crc'), 'avoid');
  assert.match(get(run(50, 'male'), 'crc').action, /colonoscopy every 10 years/);
  assert.match(get(run(50, 'male'), 'crc').action, /FIT.*every year/);
});

test('colorectal high risk: family history (MSTF 2017) and IBD replace the average-risk card', () => {
  const young = run(30, 'male', { flags: ['fhCrcYoung'] });
  assert.match(get(young, 'crc-fh').action, /every 5 years.*age 40 or 10 years before/);
  assert.equal(get(young, 'crc'), undefined);
  assert.ok(get(run(42, 'female', { flags: ['fhCrcOld'] }), 'crc-fh'));
  assert.equal(get(run(39, 'female', { flags: ['fhCrcOld'] }), 'crc-fh'), undefined);
  // one relative at 60+ : from 45 on, the ordinary card applies
  assert.ok(get(run(50, 'female', { flags: ['fhCrcOld'] }), 'crc'));
  const ibd = run(50, 'male', { flags: ['ibd'] });
  assert.ok(get(ibd, 'crc-ibd'));
  assert.equal(get(ibd, 'crc'), undefined);
});

test('breast (USPSTF 2024): women 40-74 every 2 years; 75+ insufficient; never for men', () => {
  assert.equal(get(run(39, 'female'), 'breast'), undefined);
  assert.equal(tier(run(40, 'female'), 'breast'), 'do');
  assert.match(get(run(40, 'female'), 'breast').action, /every 2 years/);
  assert.equal(tier(run(74, 'female'), 'breast'), 'do');
  assert.equal(tier(run(75, 'female'), 'breast'), 'unknown');
  assert.equal(get(run(50, 'male'), 'breast'), undefined);
  assert.ok(get(run(40, 'female'), 'breast').other.includes('American Cancer Society'));
});

test('cervical (USPSTF 2018): <21 D, 21-29 cytology q3y, 30-65 three options, >65 conditional, no cervix D', () => {
  assert.equal(tier(run(20, 'female'), 'cervical'), 'avoid');
  assert.match(get(run(21, 'female'), 'cervical').action, /^Cervical cytology \(Pap\) alone every 3 years\./);
  assert.match(get(run(29, 'female'), 'cervical').action, /alone every 3 years/);
  const a30 = get(run(30, 'female'), 'cervical').action;
  assert.match(a30, /every 3 years/); assert.match(a30, /HPV test alone every 5 years/); assert.match(a30, /both together every 5 years/);
  assert.equal(tier(run(65, 'female'), 'cervical'), 'do');
  const over = get(run(66, 'female'), 'cervical');
  assert.equal(over.tier, 'discuss');
  assert.match(over.action, /inadequate or unknown/);
  assert.equal(tier(run(40, 'female', { flags: ['noCervix'] }), 'cervical'), 'avoid');
  assert.match(get(run(35, 'female', { flags: ['hiv'] }), 'cervical').action, /individualized/);
  assert.equal(get(run(35, 'male'), 'cervical'), undefined);
});

test('lung (USPSTF 2021): 50-80, 20 pack-years, smoking or quit within 15 years', () => {
  const smoker = { tobacco: 'current', flags: ['py20'] };
  assert.equal(get(run(49, 'male', smoker), 'lung'), undefined);
  assert.equal(tier(run(50, 'male', smoker), 'lung'), 'do');
  assert.equal(tier(run(80, 'female', smoker), 'lung'), 'do');
  assert.equal(get(run(81, 'female', smoker), 'lung'), undefined);
  assert.equal(get(run(60, 'male', { tobacco: 'current', flags: [] }), 'lung'), undefined, 'under 20 pack-years');
  assert.equal(tier(run(60, 'male', { tobacco: 'former', flags: ['py20', 'quit15'] }), 'lung'), 'do');
  // quit more than 15 years ago: USPSTF no, ACS yes -> shown as a fork, never as "recommended"
  const fork = get(run(60, 'male', { tobacco: 'former', flags: ['py20'] }), 'lung');
  assert.equal(fork.tier, 'discuss');
  assert.ok(fork.src.includes('acs-lung'));
  assert.equal(get(run(60, 'male', { tobacco: 'never', flags: ['py20'] }), 'lung'), undefined);
});

test('prostate (USPSTF 2018): 55-69 C, 70+ D; 45-54 shown only as a source difference', () => {
  assert.equal(get(run(44, 'male'), 'prostate'), undefined);
  assert.equal(get(run(45, 'male'), 'prostate').strength, 'Sources differ');
  assert.equal(get(run(55, 'male'), 'prostate').strength, 'USPSTF grade C');
  assert.equal(tier(run(69, 'male'), 'prostate'), 'discuss');
  assert.equal(tier(run(70, 'male'), 'prostate'), 'avoid');
  assert.equal(get(run(60, 'female'), 'prostate'), undefined);
});

test('liver cancer surveillance (AASLD 2023): cirrhosis -> ultrasound plus AFP every 6 months', () => {
  const r = get(run(55, 'male', { flags: ['cirrhosis'] }), 'hcc');
  assert.equal(r.tier, 'do');
  assert.match(r.action, /ultrasound plus AFP about every 6 months/);
  assert.equal(tier(run(55, 'male', { flags: ['hepB'] }), 'hcc'), 'discuss');
  assert.equal(get(run(55, 'male'), 'hcc'), undefined);
});

test('vaccines by age (CDC schedule): pneumococcal 50, zoster 50, RSV 75, HPV 26/45, hep B 59/60', () => {
  assert.equal(get(run(49, 'male'), 'vax-pneumo'), undefined);
  assert.ok(get(run(50, 'male'), 'vax-pneumo'));
  assert.ok(get(run(30, 'male', { flags: ['diabetes'] }), 'vax-pneumo'), 'risk condition under 50');
  assert.ok(get(run(30, 'male', { tobacco: 'current' }), 'vax-pneumo'), 'smoking is a risk condition');
  assert.equal(get(run(49, 'female'), 'vax-zoster'), undefined);
  assert.ok(get(run(50, 'female'), 'vax-zoster'));
  assert.ok(get(run(25, 'female', { flags: ['immunocomp'] }), 'vax-zoster'));
  assert.equal(get(run(74, 'male'), 'vax-rsv'), undefined);
  assert.ok(get(run(75, 'male'), 'vax-rsv'));
  assert.ok(get(run(50, 'male', { flags: ['lung'] }), 'vax-rsv'));
  assert.equal(get(run(49, 'male', { flags: ['lung'] }), 'vax-rsv'), undefined);
  assert.equal(tier(run(26, 'female'), 'vax-hpv'), 'do');
  assert.equal(tier(run(27, 'female'), 'vax-hpv'), 'discuss');
  assert.equal(tier(run(45, 'male'), 'vax-hpv'), 'discuss');
  assert.equal(get(run(46, 'male'), 'vax-hpv'), undefined);
  assert.equal(tier(run(59, 'male'), 'vax-hepb'), 'do');
  assert.equal(tier(run(60, 'male'), 'vax-hepb'), 'discuss');
  assert.equal(tier(run(60, 'male', { flags: ['liver'] }), 'vax-hepb'), 'do');
  assert.match(get(run(60, 'male', { flags: ['diabetes'] }), 'vax-hepb').action, /shared decision/);
  assert.equal(get(run(40, 'male', { flags: ['hepB'] }), 'vax-hepb'), undefined, 'already infected');
  assert.match(get(run(65, 'female'), 'vax-flu').action, /high-dose, recombinant or adjuvanted/);
  assert.equal(tier(run(18, 'male'), 'vax-18'), 'unknown');
  assert.equal(get(run(18, 'male'), 'vax-flu'), undefined);
});

test('birth-year immunity (CDC): MMR for those born 1957 or later, varicella 1980 or later', () => {
  // In 2026: aged 70 means born 1955 or 1956 (before 1957); aged 69 could be born 1957.
  assert.equal(get(run(70, 'male'), 'vax-mmr'), undefined);
  assert.ok(get(run(69, 'male'), 'vax-mmr'));
  assert.equal(tier(run(47, 'male'), 'vax-var'), 'discuss'); // born 1978 or 1979: immune only if US-born
  assert.match(get(run(47, 'male'), 'vax-var').action, /Birth in the US before 1980/);
  assert.equal(tier(run(46, 'male'), 'vax-var'), 'do');      // could be born 1980
  // the year is an input, so the rule keeps working after the calendar turns
  assert.equal(get(screenPatient({ ...P(71, 'male'), year: 2027 }).recs, 'vax-mmr'), undefined);
  assert.ok(get(screenPatient({ ...P(70, 'male'), year: 2027 }).recs, 'vax-mmr'));
});

test('live vaccines are never "recommended" in pregnancy or immunocompromise', () => {
  for (const extra of [{ preg: 'pregnant' }, { flags: ['immunocomp'] }]) {
    const recs = run(30, 'female', extra);
    assert.equal(tier(recs, 'vax-mmr'), 'avoid');
    assert.equal(tier(recs, 'vax-var'), 'avoid');
  }
  const preg = run(25, 'female', { preg: 'pregnant' });
  assert.equal(tier(preg, 'vax-hpv'), 'avoid');
  assert.match(get(preg, 'vax-flu').action, /nasal live vaccine is contraindicated/);
  assert.match(get(run(30, 'male', { flags: ['hiv'] }), 'vax-mmr').action, /CD4/);
});

test('pregnancy: Tdap 27-36 weeks, RSV 32-36 weeks, COVID shown as a source conflict, core labs', () => {
  const recs = run(28, 'female', { preg: 'pregnant' });
  assert.match(get(recs, 'vax-tdap').action, /weeks 27 to 36/);
  assert.match(get(recs, 'vax-rsv-preg').action, /32 weeks 0 days to 36 weeks 6 days/);
  assert.match(get(recs, 'vax-rsv-preg').other, /March 1/);
  const covid = get(recs, 'vax-covid');
  assert.equal(covid.tier, 'discuss');
  assert.equal(covid.strength, 'Sources differ');
  for (const k of ['cdc-vax', 'aafp-vax', 'acog-vax']) assert.ok(covid.src.includes(k));
  for (const id of ['hiv', 'hcv', 'hbv', 'syphilis', 'pg-rh', 'pg-urine', 'pg-gdm', 'pg-asa', 'depression', 'ipv', 'bp', 'cervical']) assert.ok(get(recs, id), id);
  assert.equal(get(run(28, 'female', { preg: 'pregnant', flags: ['diabetes'] }), 'pg-gdm'), undefined, 'known diabetes is not screened for gestational diabetes');
  assert.match(get(recs, 'pg-gdm').action, /24 weeks/);
  assert.match(get(recs, 'pg-asa').action, /81 mg daily after 12 weeks/);
  assert.equal(tier(recs, 'pg-asa'), 'discuss');
  assert.equal(tier(run(28, 'female', { preg: 'pregnant', flags: ['htn'] }), 'pg-asa'), 'do');
  assert.equal(get(recs, 'folic'), undefined);
  assert.equal(get(recs, 'no-bacteriuria'), undefined, 'urine culture IS recommended in pregnancy');
  // men and non-pregnant women get no pregnancy group
  assert.ok(!run(28, 'male').some(r => r.group === 'pregnancy'));
  assert.match(get(run(28, 'female', { preg: 'possible' }), 'folic').action, /0\.4 to 0\.8 mg/);
  assert.ok(!run(28, 'female').some(r => r.group === 'pregnancy'));
});

test('blood pressure (USPSTF 2021): all adults without hypertension; interval by age and risk', () => {
  assert.match(get(run(25, 'male'), 'bp').action, /Every 3 to 5 years at 18 to 39/);
  assert.match(get(run(40, 'male'), 'bp').action, /Yearly at 40 and older/);
  assert.match(get(run(25, 'male', { flags: ['obesity'] }), 'bp').action, /Yearly/);
  assert.equal(get(run(50, 'male', { flags: ['htn'] }), 'bp'), undefined);
});

test('diabetes screening: USPSTF 35-70 with overweight (B); ADA from 35; ADA earlier with risk', () => {
  assert.equal(get(run(34, 'male'), 'dm'), undefined);
  assert.equal(get(run(34, 'male', { flags: ['overweight'] }), 'dm'), undefined);
  assert.equal(get(run(34, 'male', { flags: ['overweight', 'htn'] }), 'dm').strength, 'ADA 2026');
  assert.equal(get(run(35, 'male', { flags: ['overweight'] }), 'dm').strength, 'USPSTF grade B');
  assert.equal(get(run(70, 'male', { flags: ['obesity'] }), 'dm').strength, 'USPSTF grade B');
  assert.equal(get(run(71, 'male', { flags: ['obesity'] }), 'dm').strength, 'ADA 2026');
  assert.equal(get(run(35, 'male'), 'dm').strength, 'ADA 2026');
  assert.match(get(run(30, 'female', { flags: ['priorGdm'] }), 'dm').action, /every 1 to 3 years/);
  assert.equal(get(run(50, 'male', { flags: ['diabetes'] }), 'dm'), undefined);
});

test('diabetes care (ADA 2026): the yearly set appears only with diabetes; statin by age', () => {
  const recs = run(50, 'male', { flags: ['diabetes'] });
  for (const id of ['dm-a1c', 'dm-kidney', 'dm-eye', 'dm-foot', 'dm-lipids', 'dm-statin']) assert.ok(get(recs, id), id);
  assert.match(get(recs, 'dm-a1c').action, /twice a year/);
  assert.equal(tier(recs, 'dm-statin'), 'do');
  assert.equal(tier(run(30, 'male', { flags: ['diabetes'] }), 'dm-statin'), 'discuss');
  assert.equal(tier(run(80, 'male', { flags: ['diabetes'] }), 'dm-statin'), 'discuss');
  assert.equal(get(recs, 'statin'), undefined, 'the ADA card replaces the USPSTF risk-estimate card');
  assert.equal(get(recs, 'lipids'), undefined, 'the ADA yearly lipid panel replaces the general card');
  assert.ok(get(recs, 'lpa'));
  assert.ok(get(run(50, 'male'), 'lipids'));
  assert.ok(!run(50, 'male').some(r => r.group === 'diabetes'));
});

test('statin and aspirin (USPSTF 2022)', () => {
  assert.equal(get(run(50, 'male'), 'statin'), undefined, 'no risk factor entered');
  const s = get(run(50, 'male', { flags: ['htn'] }), 'statin');
  assert.match(s.action, /10% or higher, prescribe/); assert.match(s.action, /7\.5% to under 10%/);
  assert.equal(get(run(39, 'male', { flags: ['htn'] }), 'statin'), undefined);
  assert.equal(get(run(76, 'male', { flags: ['htn'] }), 'statin'), undefined);
  assert.equal(get(run(50, 'male', { flags: ['htn', 'cvd'] }), 'statin'), undefined, 'primary prevention only');
  assert.equal(tier(run(60, 'male'), 'aspirin'), 'avoid');
  assert.equal(tier(run(59, 'male', { flags: ['htn'] }), 'aspirin'), 'discuss');
  assert.equal(get(run(59, 'male'), 'aspirin'), undefined);
  assert.equal(get(run(70, 'male', { flags: ['cvd'] }), 'aspirin'), undefined, 'secondary prevention is out of scope');
});

test('aortic aneurysm (USPSTF 2019): four cells at 65-75, nothing outside', () => {
  assert.equal(tier(run(65, 'male', { tobacco: 'former' }), 'aaa'), 'do');
  assert.equal(tier(run(75, 'male', { tobacco: 'current' }), 'aaa'), 'do');
  assert.equal(tier(run(70, 'male'), 'aaa'), 'discuss');
  assert.equal(tier(run(70, 'female', { tobacco: 'former' }), 'aaa'), 'unknown');
  assert.equal(tier(run(70, 'female'), 'aaa'), 'avoid');
  assert.equal(get(run(64, 'male', { tobacco: 'current' }), 'aaa'), undefined);
  assert.equal(get(run(76, 'male', { tobacco: 'current' }), 'aaa'), undefined);
});

test('infection screening: HIV 15-65 (A), hepatitis C 18-79 (B) then CDC, hepatitis B once (CDC 2023)', () => {
  assert.equal(get(run(65, 'male'), 'hiv').strength, 'USPSTF grade A');
  assert.equal(get(run(66, 'male'), 'hiv'), undefined);
  assert.ok(get(run(66, 'male', { flags: ['stiRisk'] }), 'hiv'));
  assert.match(get(run(30, 'male', { flags: ['msm'] }), 'hiv').action, /at least yearly/);
  assert.equal(get(run(30, 'male', { flags: ['hiv'] }), 'hiv'), undefined);
  assert.equal(get(run(30, 'male', { flags: ['hiv'] }), 'prep'), undefined);
  assert.equal(tier(run(30, 'male', { flags: ['idu'] }), 'prep'), 'discuss');
  assert.equal(tier(run(30, 'male', { flags: ['msm'] }), 'prep'), 'discuss');
  assert.equal(tier(run(30, 'male', { flags: ['stiRisk'] }), 'prep'), 'do');
  assert.equal(get(run(30, 'male'), 'prep'), undefined);
  assert.equal(get(run(79, 'male'), 'hcv').strength, 'USPSTF grade B');
  assert.equal(get(run(80, 'male'), 'hcv').strength, 'CDC 2020');
  assert.match(get(run(40, 'male', { flags: ['idu'] }), 'hcv').action, /Repeat periodically/);
  assert.match(get(run(40, 'male'), 'hbv').action, /HBsAg, anti-HBs, and total anti-HBc/);
  assert.equal(get(run(40, 'male', { flags: ['hepB'] }), 'hbv'), undefined);
  assert.equal(get(run(40, 'male'), 'syphilis'), undefined);
  assert.match(get(run(40, 'male', { flags: ['msm'] }), 'syphilis').action, /at least yearly/);
  assert.ok(get(run(24, 'female'), 'ctgc'));
  assert.equal(get(run(25, 'female'), 'ctgc'), undefined);
  assert.ok(get(run(25, 'female', { flags: ['stiRisk'] }), 'ctgc'));
  assert.equal(get(run(24, 'male'), 'ctgc'), undefined);
  assert.equal(tier(run(24, 'male', { flags: ['stiRisk'] }), 'ctgc'), 'unknown');
  assert.equal(get(run(24, 'male', { flags: ['msm'] }), 'ctgc').strength, 'CDC STI guidelines');
  assert.ok(get(run(40, 'male', { flags: ['tbRisk'] }), 'ltbi'));
  assert.equal(get(run(40, 'male'), 'ltbi'), undefined);
  assert.ok(get(run(40, 'male', { flags: ['homeless'] }), 'ltbi'), 'shelters are a named congregate setting');
});

test('behavioral: depression and substance screens for all; anxiety to 64; tobacco help only for smokers', () => {
  const recs = run(64, 'male');
  for (const id of ['depression', 'alcohol', 'drugs', 'anxiety']) assert.equal(tier(recs, id), 'do', id);
  const old = run(65, 'male');
  assert.equal(get(old, 'anxiety'), undefined);
  assert.equal(tier(old, 'un-anxiety'), 'unknown');
  assert.equal(get(recs, 'tobacco'), undefined);
  assert.match(get(run(40, 'male', { tobacco: 'current' }), 'tobacco').action, /medication/);
  assert.match(get(run(30, 'female', { tobacco: 'current', preg: 'pregnant' }), 'tobacco').action, /insufficient/);
  assert.ok(get(run(30, 'female', { preg: 'possible' }), 'ipv'));
  assert.equal(get(run(70, 'female'), 'ipv'), undefined);
  assert.ok(get(run(30, 'female', { preg: 'no' }), 'ipv'), 'reproductive age is not tied to fertility');
  assert.equal(get(run(50, 'female'), 'ipv'), undefined);
  assert.equal(get(run(30, 'male'), 'ipv'), undefined);
});

test('bones and falls: bone density for women 65+ or younger with risk; falls at 65+', () => {
  assert.equal(get(run(64, 'female'), 'osteo'), undefined);
  assert.equal(tier(run(65, 'female'), 'osteo'), 'do');
  assert.match(get(run(55, 'female', { flags: ['postmenoRisk'] }), 'osteo').action, /FRAX/);
  assert.equal(get(run(70, 'male'), 'osteo'), undefined);
  assert.equal(tier(run(70, 'male'), 'un-osteo-men'), 'unknown');
  assert.equal(get(run(64, 'male'), 'falls'), undefined);
  assert.ok(get(run(65, 'male'), 'falls'));
});

test('sex-specific items never cross over', () => {
  for (let age = 18; age <= 95; age++) {
    const m = run(age, 'male', { flags: ALL_FLAGS }).map(r => r.id);
    const f = run(age, 'female', { flags: ALL_FLAGS }).map(r => r.id);
    for (const id of ['breast', 'cervical', 'brca', 'breast-meds', 'osteo', 'no-ovarian', 'ipv', 'folic']) assert.ok(!m.includes(id), `male ${age} got ${id}`);
    for (const id of ['prostate', 'no-testicular', 'vax-mpox', 'un-osteo-men']) assert.ok(!f.includes(id), `female ${age} got ${id}`);
  }
});

test('summaryText: plain text, recommended before discuss, no "avoid" items, no identifiers', () => {
  const p = P(52, 'female', { flags: ['diabetes'] });
  const text = summaryText(p, screenPatient(p).recs);
  assert.match(text, /^Preventive care due by guideline: female, age 52\./);
  assert.ok(text.indexOf('RECOMMENDED') < text.indexOf('TO DISCUSS'));
  assert.ok(text.includes('Mammogram'));
  assert.ok(!text.includes('Thyroid cancer screening'));
  assert.ok(!/undefined|\[object/.test(text));
});

test('pregnancy never yields a statin, weight-loss, lipid or FIB-4 recommendation (review blockers)', () => {
  for (let age = 18; age <= 50; age++) {
    for (const flags of [[], ['diabetes'], ['htn'], ['lipids'], ['obesity', 'htn'], ['diabetes', 'obesity', 'alcohol'], ALL_FLAGS]) {
      for (const tobacco of ['never', 'current']) {
        const recs = run(age, 'female', { preg: 'pregnant', flags, tobacco });
        for (const r of recs) {
          if (/statin/i.test(r.title) || /statin/i.test(r.id)) assert.equal(r.tier, 'avoid', `${r.id} at ${age} ${flags}`);
          assert.ok(!/prescribe a statin|intensity statin/i.test(r.action), `${r.id} tells a pregnant patient to take a statin`);
        }
        for (const id of ['statin', 'lipids', 'lpa', 'fib4', 'obesity', 'aspirin']) assert.equal(get(recs, id), undefined, `${id} at ${age}`);
        assert.ok(!/3 to 5 years|Yearly at 40/.test(get(recs, 'bp')?.action ?? ''), 'nonpregnant interval leaked');
      }
    }
  }
  const dm = get(run(41, 'female', { preg: 'pregnant', flags: ['diabetes'] }), 'dm-statin');
  assert.equal(dm.tier, 'avoid');
  assert.match(get(run(41, 'female', { preg: 'possible', flags: ['diabetes'] }), 'dm-statin').action, /contraception is not reliable/);
  assert.match(get(run(41, 'female', { preg: 'possible', flags: ['htn'] }), 'statin').action, /Exclude pregnancy/);
  assert.equal(tier(run(30, 'female', { preg: 'pregnant', flags: ['diabetes'] }), 'vax-pneumo'), 'discuss');
  assert.match(get(run(30, 'female', { preg: 'pregnant' }), 'syphilis').other, /third trimester/);
  assert.match(get(run(30, 'female', { preg: 'pregnant' }), 'vax-rsv-preg').action, /earlier pregnancy/);
  assert.match(get(run(30, 'female', { preg: 'possible' }), 'vax-mmr').action, /confirm not pregnant/);
});

test('review fixes: dialysis hepatitis B schedule, nasal flu vaccine, patient-specific stops in the copied text', () => {
  assert.match(get(run(40, 'male', { flags: ['dialysis'] }), 'vax-hepb').action, /40 mcg\) at 0, 1 and 6 months/);
  assert.match(get(run(40, 'male', { flags: ['immunocomp'] }), 'vax-flu').action, /Not the nasal live vaccine/);
  const p = P(30, 'female', { preg: 'pregnant' });
  const recs = screenPatient(p).recs;
  const text = summaryText(p, recs);
  assert.ok(text.includes('DO NOT GIVE, START OR SCREEN'));
  assert.ok(text.includes('MMR: do not give now'));
  assert.ok(!text.includes('Thyroid cancer screening'));
  assert.equal(avoidLabel(get(recs, 'vax-mmr')), 'Do not give');
  assert.equal(avoidLabel(get(run(65, 'male'), 'aspirin')), 'Do not start');
  assert.equal(avoidLabel(get(run(72, 'male'), 'prostate')), 'Do not screen');
  assert.ok(isPatientStop(get(recs, 'vax-mmr')));
  assert.ok(!isPatientStop(get(recs, 'no-thyroid-ca')));
});

test('pregnancy scope: only pregnancy care, vaccines, infection and behavioral cards, plus a stated scope note', () => {
  const allowedGroups = ['pregnancy', 'vaccines', 'infection', 'behavior'];
  const allowedIds = ['bp', 'cervical', 'dm-statin'];
  let looked = 0;
  for (let age = 18; age <= 55; age++) for (const tobacco of ['never', 'current', 'former']) {
    for (const flags of [[], ...ALL_FLAGS.map(f => [f]), ALL_FLAGS]) {
      const res = screenPatient({ age, sex: 'female', preg: 'pregnant', tobacco, flags, year: YEAR });
      assert.match(res.scopeNote, /left out/);
      for (const r of res.recs) {
        looked++;
        if (r.tier === 'do' || r.tier === 'discuss') assert.ok(allowedGroups.includes(r.group) || allowedIds.includes(r.id), `${r.id} shown in pregnancy at ${age} ${flags}`);
        assert.ok(!/tamoxifen|raloxifene|aromatase|colonoscopy|low-dose CT|mammogram|bone density/i.test(r.action), `${r.id}: ${r.action}`);
      }
      const ids = res.recs.map(r => r.id);
      assert.ok(!ids.includes('vax-rsv'), 'older-adult RSV card in pregnancy');
      if (age >= 19) assert.equal(res.recs.find(r => r.id === 'vax-var').tier, 'avoid', `varicella stop at ${age}`);
    }
  }
  assert.ok(looked > 20000, `looked at ${looked}`);
  assert.equal(screenPatient(P(40, 'female')).scopeNote, undefined);
  assert.equal(screenPatient(P(40, 'female', { preg: 'possible' })).scopeNote, undefined);
});

test('second-review fixes: HIV varicella wording before 1980, high-risk colonoscopy over 75, breast medication wording', () => {
  assert.match(get(run(48, 'male', { flags: ['hiv'] }), 'vax-var').action, /CD4 is at least 15%/);
  assert.match(get(run(48, 'female', { preg: 'possible' }), 'vax-var').action, /confirm not pregnant/);
  assert.match(get(run(30, 'female', { preg: 'possible', flags: ['hiv'] }), 'vax-mmr').action, /confirm not pregnant/);
  assert.equal(tier(run(90, 'male', { flags: ['ibd'] }), 'crc-ibd'), 'discuss');
  assert.equal(tier(run(60, 'male', { flags: ['ibd'] }), 'crc-ibd'), 'do');
  assert.equal(tier(run(80, 'male', { flags: ['fhCrcYoung'] }), 'crc-fh'), 'discuss');
  assert.match(get(run(40, 'female', { flags: ['fhBreast'] }), 'breast-meds').action, /only tamoxifen is indicated/);
});

test('third-review fixes: tamoxifen caveat, scope note does not defer monitoring, family-history colonoscopy stops at 85', () => {
  const bm = get(run(38, 'female', { preg: 'possible', flags: ['fhBreast'] }), 'breast-meds');
  assert.match(bm.action, /contraception/);
  assert.ok(bm.src.includes('fda-tamoxifen'));
  assert.ok(!/contraception/.test(get(run(60, 'female', { flags: ['fhBreast'] }), 'breast-meds').action));
  const res = screenPatient(P(30, 'female', { preg: 'pregnant', flags: ['diabetes'] }));
  assert.match(res.scopeNote, /is not deferred/);
  assert.ok(summaryText(P(30, 'female', { preg: 'pregnant' }), res.recs, res.scopeNote).includes('is not deferred'));
  const old = run(90, 'male', { flags: ['fhCrcYoung'] });
  assert.equal(get(old, 'crc-fh'), undefined);
  assert.equal(tier(old, 'crc'), 'avoid');
  assert.match(get(run(80, 'male', { flags: ['fhCrcYoung'] }), 'crc-fh').action, /consider stopping at 75/);
  assert.match(get(run(18, 'female', { preg: 'pregnant' }), 'vax-18').action, /Tdap at 27 to 36 weeks/);
  assert.match(get(run(60, 'male', { flags: ['diabetes'] }), 'vax-rsv').action, /end-organ damage/);
  assert.match(get(run(70, 'male', { flags: ['immunocomp'] }), 'vax-covid').action, /multi-dose series/);
});

test('defaultPreg is a display default only', () => {
  assert.equal(defaultPreg(49), 'possible');
  assert.equal(defaultPreg(50), 'no');
});

test('consult nodes: links resolve, citations declared, calculator linked from the entry node', () => {
  const ids = new Set(PRIMARY_CARE_SCREENING_NODES.map(n => n.id));
  const nums = new Set(PRIMARY_CARE_SCREENING_CITATIONS.map(c => c.num));
  assert.equal(PRIMARY_CARE_SCREENING_NODES[0].id, 'pcs-start');
  assert.equal(PRIMARY_CARE_SCREENING_NODES[0].calculatorLinks[0].id, 'primary-care-screening');
  for (const n of PRIMARY_CARE_SCREENING_NODES) {
    if (n.next) assert.ok(ids.has(n.next), `${n.id}.next`);
    for (const o of n.options ?? []) assert.ok(ids.has(o.next), `${n.id} option ${o.label}`);
    for (const c of n.citation ?? []) assert.ok(nums.has(c), `${n.id} cites [${c}]`);
    for (const m of n.body.matchAll(/\[(\d+(?:,\s*\d+)*)\]/g)) for (const c of m[1].split(',')) assert.ok(nums.has(Number(c)), `${n.id} body cites [${c}]`);
    if (n.id !== 'pcs-start') assert.equal(n.next, 'pcs-start', `${n.id} must lead back`);
  }
  for (const a of PRIMARY_CARE_SCREENING_CRITICAL_ACTIONS) assert.ok(ids.has(a.nodeId));
  const cited = new Set(PRIMARY_CARE_SCREENING_NODES.flatMap(n => n.citation ?? []));
  for (const n of nums) assert.ok(cited.has(n), `citation ${n} is never used`);
});

test('summaryText with done items: done items leave the to-do lists and appear under DONE with an optional date', () => {
  const p = P(58, 'female', { flags: ['diabetes'] });
  const recs = screenPatient(p).recs;
  const tasks = recs.filter(r => r.tier === 'do' || r.tier === 'discuss');
  const [a, b] = tasks;
  const stop = recs.find(r => r.tier === 'avoid');
  const text = summaryText(p, recs, undefined, { [a.id]: '2026-11-20', [b.id]: '', [stop.id]: '2026-01-01' });
  const [todoPart, donePart] = text.split('\nDONE\n');
  assert.ok(donePart, 'has a DONE section');
  assert.ok(text.includes('STILL TO DO: RECOMMENDED'));
  assert.ok(!todoPart.includes(`• ${a.title}:`) && !todoPart.includes(`• ${b.title}:`));
  assert.ok(donePart.includes(`• ${a.title}: done 2026-11-20`));
  assert.ok(donePart.includes(`• ${b.title}: done, date not recorded`));
  assert.ok(!donePart.split('\nDO NOT')[0].includes(stop.title), 'an avoid item can never be marked done');
  for (const r of tasks.slice(2)) assert.ok(todoPart.includes(`• ${r.title}:`), `${r.id} still listed`);
  assert.equal(summaryText(p, recs), summaryText(p, recs, undefined, {}), 'no done items: output unchanged');
  assert.ok(!summaryText(p, recs).includes('STILL TO DO'));
});
