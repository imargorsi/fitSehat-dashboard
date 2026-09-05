import { Type, type Schema } from "@google/genai";

export const fitsehatMealResponseSchema: Schema = {
  type: Type.OBJECT,
  properties: {
    status: {
      type: Type.STRING,
      enum: ["success", "clarification_required"],
    },
    message: { type: Type.STRING },
    items: {
      type: Type.ARRAY,
      items: {
        type: Type.OBJECT,
        properties: {
          name: { type: Type.STRING },
          quantity: { type: Type.NUMBER },
          unit: { type: Type.STRING },
          portionDescription: { type: Type.STRING },
          calories: { type: Type.NUMBER },
          proteinG: { type: Type.NUMBER },
          carbohydratesG: { type: Type.NUMBER },
          fatG: { type: Type.NUMBER },
          confidence: { type: Type.NUMBER },
        },
        required: [
          "name",
          "quantity",
          "unit",
          "portionDescription",
          "calories",
          "proteinG",
          "carbohydratesG",
          "fatG",
          "confidence",
        ],
      },
    },
    total: {
      type: Type.OBJECT,
      properties: {
        calories: { type: Type.NUMBER },
        proteinG: { type: Type.NUMBER },
        carbohydratesG: { type: Type.NUMBER },
        fatG: { type: Type.NUMBER },
      },
      required: ["calories", "proteinG", "carbohydratesG", "fatG"],
    },
  },
  required: ["status", "items", "total"],
};
