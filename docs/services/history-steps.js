// myMedKitt — History step bookkeeping (pure, no DOM).
//
// Inside a consult every card the clinician moves forward pushes one history entry
// with the SAME URL, stamped { mkTree, mkDepth, mkSid }. That lets the OS/browser back
// gesture step back one card, exactly like the on-screen Back button.
//
// Invariant: while a consult is active, the current history entry is the one stamped
// with depth === cards on screen, and every entry below it down to depth 0 carries the
// same mkSid. Anything that changes the card count without a history step (Reset, Undo,
// jumps, a restored session) re-establishes the invariant: a new sid, a stamped base
// entry, and pushes for the cards on screen. Older entries keep their old sid and are
// "stale".
function asState(raw) {
    if (!raw || typeof raw !== 'object')
        return null;
    const s = raw;
    if (typeof s.mkTree !== 'string' || typeof s.mkSid !== 'string')
        return null;
    if (typeof s.mkDepth !== 'number' || !Number.isInteger(s.mkDepth) || s.mkDepth < 0)
        return null;
    return { mkTree: s.mkTree, mkDepth: s.mkDepth, mkSid: s.mkSid };
}
export class HistoryStepTracker {
    constructor(newSid) {
        this.tree = null;
        this.sid = '';
        this.cards = 0;
        this.broken = false;
        this.newSid = newSid;
    }
    get active() { return this.tree !== null; }
    get depth() { return this.cards; }
    /** Start tracking a consult. `current` is history.state of the entry we are on. */
    begin(treeId, current) {
        this.tree = treeId;
        this.broken = false;
        const s = asState(current);
        if (s && s.mkTree === treeId) {
            // Returned to (or reloaded on) an entry we stamped: adopt it.
            this.sid = s.mkSid;
            this.cards = s.mkDepth;
            return [];
        }
        this.sid = this.newSid();
        this.cards = 0;
        return [{ type: 'replace', state: this.stamp(0) }];
    }
    /** The card stack now holds `cards` cards. Returns the history writes needed. */
    sync(cards) {
        if (!this.tree || this.broken)
            return [];
        const ops = [];
        if (cards < this.cards) {
            // Went shallower without a history step (Reset, jump, restore): re-base.
            this.sid = this.newSid();
            this.cards = 0;
            ops.push({ type: 'replace', state: this.stamp(0) });
        }
        while (this.cards < cards) {
            this.cards += 1;
            ops.push({ type: 'push', state: this.stamp(this.cards) });
        }
        return ops;
    }
    /** Decide what a popstate means. Mutates depth when it returns 'back'. */
    onPop(raw) {
        if (!this.tree || this.broken)
            return { type: 'ignore' };
        const s = asState(raw);
        if (s && s.mkTree !== this.tree)
            return { type: 'ignore' };
        if (!s)
            return { type: 'skip' };
        if (s.mkSid !== this.sid)
            return { type: 'skip' };
        if (s.mkDepth < this.cards) {
            const steps = this.cards - s.mkDepth;
            this.cards = s.mkDepth;
            return { type: 'back', steps };
        }
        if (s.mkDepth === this.cards)
            return { type: 'noop' };
        return { type: 'resync', delta: this.cards - s.mkDepth };
    }
    /** True when the on-screen Back should call history.back() (we own an entry below). */
    canStepBack() {
        return this.tree !== null && !this.broken && this.cards > 0;
    }
    /** A history write failed (e.g. browser throttling): fall back to old behaviour. */
    disable() { this.broken = true; }
    leave() {
        this.tree = null;
        this.cards = 0;
        this.sid = '';
        this.broken = false;
    }
    stamp(depth) {
        return { mkTree: this.tree, mkDepth: depth, mkSid: this.sid };
    }
}
