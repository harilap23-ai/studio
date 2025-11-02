import { defineFlow } from 'genkit';
import { z } from 'zod';

export const testFlow = defineFlow(
  {
    name: 'testFlow',
    inputSchema: z.object({
      name: z.string(),
    }),
    outputSchema: z.object({
      message: z.string(),
    }),
  },
  async (input) => {
    return {
      message: `Hello, ${input.name}!`,
    };
  }
);