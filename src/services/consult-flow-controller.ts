// myMedKitt — Consult Flow Controller
// Thin wrapper around TreeEngine that maintains a cardStack[] for rendering
// all answered + current cards simultaneously. TreeEngine is UNCHANGED.

import { TreeEngine } from './tree-engine.js';
import type { DecisionNode } from '../models/types.js';

export interface CardEntry {
  nodeId: string;
  node: DecisionNode;
  selectedOptionIndex?: number;
  selectedLabel?: string;
  /** Whether this card was auto-advanced by smart skip */
  autoAdvanced?: boolean;
}

export class ConsultFlowController {
  private engine: TreeEngine;
  private cardStack: CardEntry[] = [];

  constructor(nodes: DecisionNode[]) {
    this.engine = new TreeEngine(nodes);
  }

  /** Start a new consult from the given entry node */
  startConsult(treeId: string, entryNodeId: string): void {
    this.engine.startTree(treeId, entryNodeId);
    this.cardStack = [];
    // Don't add current node to stack — it's rendered separately as the active card
  }

  /** Restore session: rebuild card stack from engine history + answers */
  restoreSession(treeId: string): boolean {
    const restored = this.engine.restoreSession(treeId);
    if (!restored) return false;

    this.cardStack = [];
    const session = this.engine.getSession();
    if (!session) return false;

    // Reconstruct stack from history
    for (const nodeId of session.history) {
      const node = this.engine.getNode(nodeId);
      if (!node) continue;

      const answerLabel = session.answers[nodeId];
      let selectedIndex: number | undefined;
      let selectedLabel: string | undefined;

      if (answerLabel !== undefined) {
        if (Array.isArray(answerLabel)) {
          // Input node with checkbox-group selections
          selectedLabel = answerLabel.join(', ');
        } else {
          selectedLabel = String(answerLabel);
          if (node.options) {
            // Find matching option index for question nodes
            const idx = node.options.findIndex(o => o.label === selectedLabel);
            if (idx !== -1) selectedIndex = idx;
          }
        }
      }

      this.cardStack.push({
        nodeId,
        node,
        selectedOptionIndex: selectedIndex,
        selectedLabel,
      });
    }

    return true;
  }

  /** Select an option on the current (active) card */
  selectOption(optionIndex: number): DecisionNode | null {
    const currentNode = this.engine.getCurrentNode();
    if (!currentNode) return null;

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
  continueToNext(): DecisionNode | null {
    const currentNode = this.engine.getCurrentNode();
    if (!currentNode) return null;

    // Push info card to answered stack (no selection)
    this.cardStack.push({
      nodeId: currentNode.id,
      node: currentNode,
    });

    this.engine.continueToNext();
    this.autoSkipIfNeeded();
    return this.engine.getCurrentNode();
  }

  /**
   * Continue from an input node, recording the user's checkbox selections in
   * the session answers. Mutates the live session via getSession() so the
   * engine's persistence picks it up on the next saveSession() inside
   * continueToNext().
   */
  continueWithInput(values: string[]): DecisionNode | null {
    const currentNode = this.engine.getCurrentNode();
    if (!currentNode) return null;

    const session = this.engine.getSession();
    if (session) {
      session.answers[currentNode.id] = values;
    }

    this.cardStack.push({
      nodeId: currentNode.id,
      node: currentNode,
      selectedLabel: values.length > 0 ? values.join(', ') : undefined,
    });

    this.engine.continueToNext();
    this.autoSkipIfNeeded();
    return this.engine.getCurrentNode();
  }

  /** Auto-skip skippable info nodes for expert mode */
  private autoSkipIfNeeded(): void {
    let skips = 0;
    while (skips < 20) {
      const node = this.engine.getCurrentNode();
      if (!node) break;
      if (node.skippable && node.type === 'info' && node.next && !node.safetyLevel) {
        this.cardStack.push({ nodeId: node.id, node, autoAdvanced: true });
        this.engine.continueToNext();
        skips++;
      } else {
        break;
      }
    }
  }

  /** Go back one step */
  goBack(): DecisionNode | null {
    if (this.cardStack.length > 0) {
      this.cardStack.pop();
    }
    return this.engine.goBack();
  }

  /** Reset to beginning */
  reset(entryNodeId: string): DecisionNode | null {
    this.cardStack = [];
    return this.engine.goToEntry(entryNodeId);
  }

  /** Jump to a specific node (clears history) */
  jumpToNode(nodeId: string): DecisionNode | null {
    this.cardStack = [];
    return this.engine.jumpToNode(nodeId);
  }

  /** Get the full card stack (answered cards only) */
  getCardStack(): CardEntry[] {
    return this.cardStack;
  }

  /** Get the current active node */
  getCurrentNode(): DecisionNode | null {
    return this.engine.getCurrentNode();
  }

  /** Get the underlying engine (for session access, answer history, etc.) */
  getEngine(): TreeEngine {
    return this.engine;
  }

  /** Check if we can go back */
  canGoBack(): boolean {
    return this.engine.canGoBack();
  }

  /** Get a node by ID */
  getNode(nodeId: string): DecisionNode | null {
    return this.engine.getNode(nodeId);
  }

  /** Full reset — clear session */
  fullReset(): void {
    this.cardStack = [];
    this.engine.reset();
  }
}
