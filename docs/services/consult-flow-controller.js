// myMedKitt — Consult Flow Controller
// Thin wrapper around TreeEngine that maintains a cardStack[] for rendering
// all answered + current cards simultaneously. TreeEngine is UNCHANGED.
import { TreeEngine } from './tree-engine.js';
export class ConsultFlowController {
    constructor(nodes) {
        this.cardStack = [];
        this.engine = new TreeEngine(nodes);
    }
    /** Start a new consult from the given entry node */
    startConsult(treeId, entryNodeId) {
        this.engine.startTree(treeId, entryNodeId);
        this.cardStack = [];
        // Don't add current node to stack — it's rendered separately as the active card
    }
    /** Restore session: rebuild card stack from engine history + answers */
    restoreSession(treeId) {
        const restored = this.engine.restoreSession(treeId);
        if (!restored)
            return false;
        this.cardStack = [];
        const session = this.engine.getSession();
        if (!session)
            return false;
        // Reconstruct stack from history
        for (const nodeId of session.history) {
            const node = this.engine.getNode(nodeId);
            if (!node)
                continue;
            const answerLabel = session.answers[nodeId];
            let selectedIndex;
            if (answerLabel !== undefined && node.options) {
                // Find matching option index
                const labelStr = String(answerLabel);
                selectedIndex = node.options.findIndex(o => o.label === labelStr);
                if (selectedIndex === -1)
                    selectedIndex = undefined;
            }
            this.cardStack.push({
                nodeId,
                node,
                selectedOptionIndex: selectedIndex,
                selectedLabel: answerLabel !== undefined ? String(answerLabel) : undefined,
            });
        }
        return true;
    }
    /** Select an option on the current (active) card */
    selectOption(optionIndex) {
        const currentNode = this.engine.getCurrentNode();
        if (!currentNode)
            return null;
        const selectedLabel = currentNode.options?.[optionIndex]?.label;
        // Push current card to answered stack
        this.cardStack.push({
            nodeId: currentNode.id,
            node: currentNode,
            selectedOptionIndex: optionIndex,
            selectedLabel,
        });
        // Navigate engine
        this.engine.selectOption(optionIndex);
        this.autoSkipIfNeeded();
        return this.engine.getCurrentNode();
    }
    /** Continue to next node (info nodes) */
    continueToNext() {
        const currentNode = this.engine.getCurrentNode();
        if (!currentNode)
            return null;
        // Push info card to answered stack (no selection)
        this.cardStack.push({
            nodeId: currentNode.id,
            node: currentNode,
        });
        this.engine.continueToNext();
        this.autoSkipIfNeeded();
        return this.engine.getCurrentNode();
    }
    /** Auto-skip skippable info nodes for expert mode */
    autoSkipIfNeeded() {
        let skips = 0;
        while (skips < 20) {
            const node = this.engine.getCurrentNode();
            if (!node)
                break;
            if (node.skippable && node.type === 'info' && node.next && !node.safetyLevel) {
                this.cardStack.push({ nodeId: node.id, node, autoAdvanced: true });
                this.engine.continueToNext();
                skips++;
            }
            else {
                break;
            }
        }
    }
    /** Go back one step */
    goBack() {
        if (this.cardStack.length > 0) {
            this.cardStack.pop();
        }
        return this.engine.goBack();
    }
    /** Reset to beginning */
    reset(entryNodeId) {
        this.cardStack = [];
        return this.engine.goToEntry(entryNodeId);
    }
    /** Jump to a specific node (clears history) */
    jumpToNode(nodeId) {
        this.cardStack = [];
        return this.engine.jumpToNode(nodeId);
    }
    /** Get the full card stack (answered cards only) */
    getCardStack() {
        return this.cardStack;
    }
    /** Get the current active node */
    getCurrentNode() {
        return this.engine.getCurrentNode();
    }
    /** Get the underlying engine (for session access, answer history, etc.) */
    getEngine() {
        return this.engine;
    }
    /** Check if we can go back */
    canGoBack() {
        return this.engine.canGoBack();
    }
    /** Get a node by ID */
    getNode(nodeId) {
        return this.engine.getNode(nodeId);
    }
    /** Full reset — clear session */
    fullReset() {
        this.cardStack = [];
        this.engine.reset();
    }
}
