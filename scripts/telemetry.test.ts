// Data Dog telemetry client tests (privacy floor, payload schema, dev no-op).
// Run: node --test <this file>   (Node strips the TypeScript types itself)
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { createTelemetry, cleanId, uuid, resultBucket, rankBucket, telemetryAllowed } from '../src/services/telemetry.ts';

const store = new Map<string, string>();
(globalThis as any).localStorage = {
  getItem: (k: string) => store.get(k) ?? null,
  setItem: (k: string, v: string) => { store.set(k, String(v)); },
  removeItem: (k: string) => { store.delete(k); },
};
const setLoc = (href: string) => {
  const u = new URL(href);
  Object.defineProperty(globalThis, 'location', { value: { protocol: u.protocol, hostname: u.hostname }, configurable: true });
};

const UUID = /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/;
const KEYS = ['app', 'app_version', 'event', 'feature_id', 'install_id', 'platform', 'props', 'screen_id', 'session_id', 'ts'];

function harness(now = () => Date.parse('2026-10-17T12:00:00Z')) {
  const sent: any[] = [];
  const fetchImpl = (async (url: string, init: any) => { sent.push({ url, init, rows: JSON.parse(init.body) }); return new Response(null, { status: 201 }); }) as any;
  const t = createTelemetry({ app: 'vertigo', appVersion: '1.4.0', platform: 'web', url: 'https://x.supabase.co', anonKey: 'anon', enabled: true, fetchImpl, now });
  return { t, sent };
}

test('uuid is a v4 uuid from getRandomValues', () => {
  for (let i = 0; i < 50; i++) assert.match(uuid(), UUID);
  assert.notEqual(uuid(), uuid());
});

test('payload schema: every row has exactly the sink columns', () => {
  store.clear();
  const { t, sent } = harness();
  t.track('screen_view', { screen_id: '/consult/dka' });
  t.flush();
  assert.equal(sent.length, 1);
  assert.equal(sent[0].url, 'https://x.supabase.co/rest/v1/app_events');
  assert.equal(sent[0].init.keepalive, true);
  assert.equal(sent[0].init.headers.Prefer, 'return=minimal');
  const rows = sent[0].rows;
  assert.deepEqual(rows.map((r: any) => r.event), ['session_start', 'screen_view']);
  for (const r of rows) {
    assert.deepEqual(Object.keys(r).sort(), KEYS);
    assert.match(r.install_id, UUID);
    assert.match(r.session_id, UUID);
    assert.equal(r.app, 'vertigo');
    assert.equal(r.platform, 'web');
  }
  assert.equal(rows[1].screen_id, 'consult/dka');
  assert.equal(rows[0].install_id, rows[1].install_id);
});

test('privacy: search text can never be sent', () => {
  store.clear();
  const { t, sent } = harness();
  const secret = 'chest pain John Smith MRN 12345';
  t.track('search', { screen_id: `search?q=${secret}`, props: { surface: 'hero', result_bucket: resultBucket(0), query: secret, q: 'dka', text: secret } as any });
  t.track('search', { props: { surface: secret, result_bucket: secret } });
  t.flush();
  const body = sent.map((s) => s.init.body).join('');
  for (const word of ['chest', 'john', 'smith', 'mrn', '12345', 'dka']) assert.ok(!body.toLowerCase().includes(word), `leaked ${word}`);
  const searches = sent[0].rows.filter((r: any) => r.event === 'search');
  assert.deepEqual(searches[0].props, { surface: 'hero', result_bucket: '0' });
  assert.equal(searches[0].screen_id, 'search');
  assert.deepEqual(searches[1].props, {});
});

test('privacy: error events carry a kind enum only, never a message', () => {
  store.clear();
  const { t, sent } = harness();
  t.track('error', { props: { kind: 'js', message: 'TypeError at patient.name', stack: 'at x (app.js:1)' } as any });
  t.flush();
  const row = sent[0].rows.find((r: any) => r.event === 'error');
  assert.deepEqual(row.props, { kind: 'js' });
  assert.ok(!sent[0].init.body.includes('patient'));
});

test('ids are cleaned to safe lowercase route ids', () => {
  assert.equal(cleanId('/Tree/DKA/node/Step 2?x=1#y'), 'tree/dka/node/step-2');
  assert.equal(cleanId(''), '');
  assert.equal(cleanId(42 as any), '');
  assert.equal(rankBucket(1), '1');
  assert.equal(rankBucket(7), '4-10');
});

test('unknown events are ignored', () => {
  store.clear();
  const { t, sent } = harness();
  t.track('keystroke' as any, { screen_id: 'x' });
  t.flush();
  assert.equal(sent.length, 0);
});

test('a new session starts after 30 minutes idle', () => {
  store.clear();
  let now = Date.parse('2026-10-17T12:00:00Z');
  const { t, sent } = harness(() => now);
  t.track('screen_view', { screen_id: 'home' });
  now += 31 * 60 * 1000;
  t.track('screen_view', { screen_id: 'home' });
  t.flush();
  const rows = sent[0].rows;
  assert.deepEqual(rows.map((r: any) => r.event), ['session_start', 'screen_view', 'session_start', 'screen_view']);
  assert.notEqual(rows[0].session_id, rows[2].session_id);
  assert.equal(rows[0].install_id, rows[2].install_id);
});

test('fails silently when the network throws', () => {
  store.clear();
  const t = createTelemetry({ app: 'mymedkitt', appVersion: '1', platform: 'web', url: 'https://x', anonKey: 'k', enabled: true,
    fetchImpl: (() => { throw new Error('offline'); }) as any });
  t.track('screen_view', { screen_id: 'home' });
  assert.doesNotThrow(() => t.flush());
});

test('dev, localhost, Do Not Track and opt-out send nothing', () => {
  store.clear();
  setLoc('http://localhost:5173/');
  assert.equal(telemetryAllowed(), false);
  setLoc('http://127.0.0.1:3000/');
  assert.equal(telemetryAllowed(), false);
  setLoc('https://dell-seton-ops.vercel.app/');
  assert.equal(telemetryAllowed(), true);
  setLoc('capacitor://localhost/');
  assert.equal(telemetryAllowed(), true, 'the iOS shell is production');
  store.set('kt_telemetry_optout', '1');
  assert.equal(telemetryAllowed(), false);
  store.clear();
  Object.defineProperty(globalThis, 'navigator', { value: { doNotTrack: '1' }, configurable: true });
  assert.equal(telemetryAllowed(), false);
  Object.defineProperty(globalThis, 'navigator', { value: {}, configurable: true });
  setLoc('http://localhost:5173/');
  const sent: any[] = [];
  const t = createTelemetry({ app: 'dell-seton', appVersion: '50', platform: 'web', url: 'https://x', anonKey: 'k', fetchImpl: (async (...a: any[]) => { sent.push(a); }) as any });
  t.track('screen_view', { screen_id: 'home' });
  t.flush();
  assert.equal(t.enabled, false);
  assert.equal(sent.length, 0);
});
