/** Dell Seton source: myMedKitt BURNS_DSMC_PROTOCOL, info-pages.ts.
 * 15 and 20 mL × percent-number × kg are cumulative volumes in that source.
 * They are NOT hourly rates. Keep the source's explicit institutional scope.
 */
export function validInputs(weight, tbsa) {
    return Number.isFinite(weight) && weight > 0 && Number.isFinite(tbsa) && tbsa > 0 && tbsa <= 100;
}
export function ruleOf10(tbsa, weight) {
    if (!validInputs(weight, tbsa))
        throw new Error('Enter valid weight and TBSA (0–100%).');
    return tbsa * 10 + Math.max(0, Math.floor((weight - 80) / 10)) * 100;
}
export function dellSeton(weight, tbsa, cumulative, crrt) {
    if (!validInputs(weight, tbsa) || !Number.isFinite(cumulative) || cumulative < 0)
        throw new Error('Enter valid weight, TBSA and cumulative volume.');
    const tier = tbsa < 20 ? 0 : tbsa < 40 ? 1 : 2;
    const switchVolume = 15 * tbsa * weight;
    const ceilingVolume = 20 * tbsa * weight;
    return { tier, switchVolume, ceilingVolume, ceilingReached: cumulative >= ceilingVolume,
        fluid: tier === 2 || cumulative >= switchVolume || crrt ? 'FFP only' : 'LR',
        initialRate: ruleOf10(tbsa, weight), crrtRate: crrt ? 125 : null,
        adultUop: .5 * weight, pediatricUop: weight };
}
export function parkland(weight, tbsa, hours, given, multiplier) {
    if (!validInputs(weight, tbsa) || !Number.isFinite(hours) || hours < 0 || hours >= 24 || !Number.isFinite(given) || given < 0)
        throw new Error('Enter valid first-24-hour inputs.');
    const total = multiplier * weight * tbsa;
    const target = hours < 8 ? total / 2 : total;
    const remainingHours = (hours < 8 ? 8 : 24) - hours;
    const remainingVolume = Math.max(0, target - given);
    return { total, target, remainingHours, remainingVolume, rate: remainingVolume / remainingHours, firstRate: total / 16, secondRate: total / 32 };
}
