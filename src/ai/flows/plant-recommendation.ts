'use server';

/**
 * @fileOverview A plant recommendation AI agent.
 *
 * - plantRecommendation - A function that handles the plant recommendation process.
 * - PlantRecommendationInput - The input type for the plantRecommendation function.
 * - PlantRecommendationOutput - The return type for the plantRecommendation function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const PlantRecommendationInputSchema = z.object({
  lightingConditions: z
    .string()
    .describe('The lighting conditions of the space where the plant will be placed (e.g., bright, indirect light, low light).'),
  careLevel: z
    .string()
    .describe('The desired care level for the plant (e.g., easy, moderate, difficult).'),
  desiredAesthetic: z
    .string()
    .describe('The desired aesthetic of the plant (e.g., modern, tropical, minimalist).'),
});
export type PlantRecommendationInput = z.infer<typeof PlantRecommendationInputSchema>;

const PlantRecommendationOutputSchema = z.object({
  recommendedPlants: z
    .array(z.string())
    .describe('A list of plant names that are recommended based on the user preferences.'),
});
export type PlantRecommendationOutput = z.infer<typeof PlantRecommendationOutputSchema>;

export async function plantRecommendation(input: PlantRecommendationInput): Promise<PlantRecommendationOutput> {
  return plantRecommendationFlow(input);
}

const prompt = ai.definePrompt({
  name: 'plantRecommendationPrompt',
  input: {schema: PlantRecommendationInputSchema},
  output: {schema: PlantRecommendationOutputSchema},
  prompt: `You are a knowledgeable plant expert. Based on the user's preferences, recommend a list of plants that are well-suited for their home and lifestyle.

Consider the following preferences:

Lighting Conditions: {{{lightingConditions}}}
Care Level: {{{careLevel}}}
Desired Aesthetic: {{{desiredAesthetic}}}

Recommended Plants:`,
});

const plantRecommendationFlow = ai.defineFlow(
  {
    name: 'plantRecommendationFlow',
    inputSchema: PlantRecommendationInputSchema,
    outputSchema: PlantRecommendationOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
