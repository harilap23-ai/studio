'use server';

/**
 * @fileOverview This file defines a Genkit flow for suggesting alternative timetable arrangements when an optimal solution cannot be found.
 *
 * The flow takes in the current timetable constraints and outputs suggestions for alternative arrangements
 * such as swapping rooms or faculties to create a viable timetable.
 *
 * @fileOverview
 * - `suggestAlternativeArrangements`: An async function that takes timetable constraints as input and returns alternative arrangements.
 * - `SuggestAlternativeArrangementsInput`: The input type for the suggestAlternativeArrangements function, defining the timetable constraints.
 * - `SuggestAlternativeArrangementsOutput`: The output type for the suggestAlternativeArrangements function, providing suggestions for alternative arrangements.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SuggestAlternativeArrangementsInputSchema = z.object({
  classrooms: z
    .array(z.string())
    .describe('List of available classrooms and their capacities'),
  batches: z.array(z.string()).describe('List of student batches'),
  subjects: z.array(z.string()).describe('List of subjects to be scheduled'),
  faculties: z
    .array(z.string())
    .describe('List of available faculty members and their specializations'),
  timetableSlots: z
    .array(z.string())
    .describe('List of available timetable slots'),
  constraints: z
    .string()
    .describe(
      'A description of constraints such as maximum classes per day, faculty leave, and room capacity'
    ),
  currentTimetable: z
    .string()
    .optional()
    .describe('The current timetable that needs adjustments'),
});

export type SuggestAlternativeArrangementsInput = z.infer<
  typeof SuggestAlternativeArrangementsInputSchema
>;

const SuggestAlternativeArrangementsOutputSchema = z.object({
  suggestions: z
    .array(z.string())
    .describe(
      'A list of suggested alternative timetable arrangements, such as swapping rooms or faculties.'
    ),
  reasoning: z
    .string()
    .describe(
      'Explanation of why the suggested arrangements can resolve the scheduling conflict.'
    ),
});

export type SuggestAlternativeArrangementsOutput = z.infer<
  typeof SuggestAlternativeArrangementsOutputSchema
>;

export async function suggestAlternativeArrangements(
  input: SuggestAlternativeArrangementsInput
): Promise<SuggestAlternativeArrangementsOutput> {
  return suggestAlternativeArrangementsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'suggestAlternativeArrangementsPrompt',
  input: {schema: SuggestAlternativeArrangementsInputSchema},
  output: {schema: SuggestAlternativeArrangementsOutputSchema},
  prompt: `You are an AI timetable assistant that suggests alternative arrangements when an optimal timetable cannot be generated.

  Consider the following constraints:
  {{constraints}}

  The current timetable is as follows, if available:
  {{#if currentTimetable}}
  {{currentTimetable}}
  {{else}}
  No timetable to adjust.
  {{/if}}

  Given the available classrooms: {{classrooms}}, batches: {{batches}}, subjects: {{subjects}}, faculties: {{faculties}}, and timetable slots: {{timetableSlots}}, suggest alternative arrangements to resolve scheduling conflicts.  Explain the reasoning behind each suggestion.

  Your suggestions should focus on swapping rooms, faculties, or time slots, while adhering to the given constraints.
  Return an array of suggestions and a single explanation of how the suggestions work together to resolve the issues.
  `,
});

const suggestAlternativeArrangementsFlow = ai.defineFlow(
  {
    name: 'suggestAlternativeArrangementsFlow',
    inputSchema: SuggestAlternativeArrangementsInputSchema,
    outputSchema: SuggestAlternativeArrangementsOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
