export type TFoodSearchHit = {
  foodId: string;
  name: string;
  brand: string | null;
  description: string;
  calories: number | null;
  proteinG: number | null;
  carbsG: number | null;
  fatsG: number | null;
};

export type TFoodServing = {
  servingId: string;
  description: string;
  calories: number;
  proteinG: number | null;
  carbsG: number | null;
  fatsG: number | null;
};

export type TFoodDetail = {
  foodId: string;
  name: string;
  brand: string | null;
  servings: TFoodServing[];
};

export type TFoodSearchResult =
  | { ok: true; foods: TFoodSearchHit[]; message?: string }
  | { ok: false; error: string };

export type TFoodDetailResult =
  | { ok: true; food: TFoodDetail }
  | { ok: false; error: string };
