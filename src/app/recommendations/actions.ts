"use server";

import { plantRecommendation, PlantRecommendationInput, PlantRecommendationOutput } from "@/ai/flows/plant-recommendation";

type RecommendationResult = {
    data?: PlantRecommendationOutput;
    error?: string;
}

export async function getPlantRecommendations(input: PlantRecommendationInput): Promise<RecommendationResult> {
  try {
    const recommendations = await plantRecommendation(input);
    return { data: recommendations };
  } catch (e: any) {
    console.error(e);
    return { error: e.message || "An unexpected error occurred." };
  }
}
