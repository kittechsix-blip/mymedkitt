// MedKitt — Data Model
// All interfaces from PRD.md Section 4

/** Module number identifying the phase of the tree (1-based). */
export type ModuleNumber = number;

/** Node types determine rendering: question=choices, info=read-only, input=form fields, result=recommendation */
export type NodeType = 'question' | 'info' | 'result' | 'input';

/** Urgency drives color-coding: critical=red, urgent=orange, routine=teal */
export type Urgency = 'routine' | 'urgent' | 'critical';

/** Confidence in the recommendation */
export type Confidence = 'definitive' | 'recommended' | 'consider';

/** Dosing confidence level for visual traffic-light color coding */
export type DosingConfidence = 'standard' | 'caution' | 'critical';

// -------------------------------------------------------------------
// Node Images (ultrasound, clinical photos)
// -------------------------------------------------------------------

export interface NodeImage {
  /** Relative path from docs/, e.g. 'images/pneumothorax/us-anatomy.png' */
  src: string;
  /** Accessibility alt text (required) */
  alt: string;
  /** Optional figure caption displayed below image */
  caption?: string;
}

// -------------------------------------------------------------------
// Decision Tree Nodes
// -------------------------------------------------------------------

export interface DecisionNode {
  id: string;
  type: NodeType;
  module: ModuleNumber;
  title: string;
  /** Clinical content / question text */
  body: string;
  /** Reference numbers (index into evidence citations) */
  citation?: number[];
  /** For question nodes — the choices the user picks from */
  options?: NodeOption[];
  /** For input nodes — form fields (e.g. CSF values) */
  inputs?: NodeInput[];
  /** Default next node ID (used when there are no options, e.g. info nodes) */
  next?: string;
  /** For result nodes — the clinical recommendation */
  recommendation?: string;
  /** For result nodes — treatment details */
  treatment?: TreatmentRegimen;
  /** For result nodes — confidence level */
  confidence?: Confidence;
  /** Optional images to display (e.g., ultrasound reference images) */
  images?: NodeImage[];
  /** Optional calculator links to show as buttons (e.g., PESI, sPESI) */
  calculatorLinks?: { id: string; label: string }[];
  /** Feature 2: Progressive disclosure - When to use this node */
  whenToUse?: string;
  /** Feature 2: Progressive disclosure - Clinical pearls */
  pearls?: string;
  /** Feature 2: Progressive disclosure - Evidence summary */
  evidence?: string;
  /** Need-to-Know: One-line clinical summary (10-20 words) for accordion mode */
  summary?: string;
  /** Need-to-Know: Info nodes that can be auto-skipped for experts */
  skippable?: boolean;
  /** Need-to-Know: Safety level — always-visible banner above accordion */
  safetyLevel?: 'critical' | 'warning';
}

export interface NodeOption {
  label: string;
  description?: string;
  /** Node ID to navigate to when this option is selected */
  next: string;
  urgency?: Urgency;
}

export interface NodeInput {
  name: string;
  type: 'number' | 'select' | 'checkbox';
  label: string;
  /** Display unit (e.g. "cells/mm³", "mg/dL") */
  unit?: string;
  /** For select/checkbox inputs */
  options?: InputOption[];
}

export interface InputOption {
  label: string;
  value: string;
}

// -------------------------------------------------------------------
// Treatment
// -------------------------------------------------------------------

export interface TreatmentRegimen {
  firstLine: DrugRegimen;
  alternative?: DrugRegimen;
  pcnAllergy?: DrugRegimen;
  /** Additional context-specific regimens (e.g., nsaidAllergy, vascularContraindication, adjunct, dischargeMeds) */
  [key: string]: DrugRegimen | string | undefined;
  /** Follow-up monitoring instructions */
  monitoring: string;
}

export interface DrugRegimen {
  drug: string;
  dose: string;
  route: string;
  frequency: string;
  duration: string;
  notes?: string;
  /** Dosing confidence: standard (green), caution (amber), critical (red) */
  confidence?: DosingConfidence;
}

// -------------------------------------------------------------------
// Category System
// -------------------------------------------------------------------

export interface Category {
  id: string;
  name: string;
  icon: string;
  decisionTrees: DecisionTreeMeta[];
  isCustom: boolean;
}

export interface DecisionTreeMeta {
  id: string;
  title: string;
  subtitle: string;
  categoryId: string;
  version: string;
  nodeCount: number;
  /** ID of the first node in the tree */
  entryNodeId: string;
}

// -------------------------------------------------------------------
// User Session State
// -------------------------------------------------------------------

export interface TreeSession {
  treeId: string;
  currentNodeId: string;
  /** Stack of visited node IDs for back navigation */
  history: string[];
  /** Accumulated answers keyed by node ID */
  answers: Record<string, string | number | boolean | string[]>;
  startedAt: number;
}
