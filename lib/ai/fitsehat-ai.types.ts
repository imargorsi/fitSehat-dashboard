export type TFitSehatAiItem = {
  name: string;
  quantity: number;
  unit: string;
  portionDescription: string;
  calories: number;
  proteinG: number;
  carbohydratesG: number;
  fatG: number;
  confidence: number;
};

export type TFitSehatAiTotals = {
  calories: number;
  proteinG: number;
  carbohydratesG: number;
  fatG: number;
};

export type TFitSehatAiSuccess = {
  status: "success";
  message?: string;
  items: TFitSehatAiItem[];
  total: TFitSehatAiTotals;
};

export type TFitSehatAiClarification = {
  status: "clarification_required";
  message: string;
  items: [];
  total: TFitSehatAiTotals;
};

export type TFitSehatAiAnalysis = TFitSehatAiSuccess | TFitSehatAiClarification;

export type TAnalyzeMealInput = {
  text: string;
  previousAnalysis?: TFitSehatAiAnalysis;
  clarification?: string;
};

export type TAnalyzeMealResult =
  | { ok: true; analysis: TFitSehatAiAnalysis }
  | { ok: false; error: string };
