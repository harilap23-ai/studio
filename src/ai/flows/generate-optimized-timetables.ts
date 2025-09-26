// src/ai/flows/generate-optimized-timetables.ts
'use server';
/**
 * @fileOverview AI-powered timetable generator flow.
 *
 * - generateOptimizedTimetables - A function that generates optimized timetable options.
 * - GenerateTimetableInput - The input type for the generateOptimizedTimetables function.
 * - GenerateTimetableOutput - The return type for the generateOptimizedTimetables function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateTimetableInputSchema = z.object({
  classrooms: z.array(z.object({
    name: z.string().describe('Classroom name or identifier'),
    capacity: z.number().describe('Maximum student capacity of the classroom'),
  })).describe('List of available classrooms and their capacities.'),
  batches: z.array(z.object({
    name: z.string().describe('Batch name or identifier'),
    studentCount: z.number().describe('Number of students in the batch'),
  })).describe('List of student batches and their sizes.'),
  subjects: z.array(z.object({
    name: z.string().describe('Subject name'),
    credits: z.number().describe('Number of credits for the subject'),
    classesPerWeek: z.number().describe('Number of classes per week for this subject'),
  })).describe('List of subjects to be scheduled.'),
  faculties: z.array(z.object({
    name: z.string().describe('Faculty name'),
    subjects: z.array(z.string()).describe('List of subjects the faculty can teach'),
    maxWorkload: z.number().describe('Maximum number of classes the faculty can handle per week'),
    availability: z.array(z.object({
      day: z.string().describe('Day of the week (e.g., Monday, Tuesday)'),
      slots: z.array(z.boolean()).describe('Availability slots for the day (true if available, false otherwise)'),
    })).describe('Weekly availability of the faculty.'),
    monthlyLeaves: z.number().describe('Average monthly leave days of faculty')
  })).describe('List of available faculty members and their expertise.'),
  timetableSlots: z.array(z.object({
    day: z.string().describe('Day of the week'),
    time: z.string().describe('Time slot (e.g., 9:00-10:00)'),
  })).describe('List of available timetable slots.'),
  constraints: z.object({
    maxClassesPerDay: z.number().describe('Maximum number of classes that can be scheduled per day'),
    roomCapacityMargin: z.number().describe('The minimum acceptable margin between room capacity and number of enrolled students'),
  }).describe('Various constraints to consider'),
  numberOfTimetablesToGenerate: z.number().default(3).describe('The number of timetable options to generate')
});
export type GenerateTimetableInput = z.infer<typeof GenerateTimetableInputSchema>;

const GenerateTimetableOutputSchema = z.array(z.object({
  timetable: z.record(z.string(), z.object({
    subject: z.string().describe('Subject name'),
    faculty: z.string().describe('Faculty name'),
    classroom: z.string().describe('Classroom name'),
    time: z.string().describe('Time slot'),
  })).describe('Generated timetable, mapping time slots to class details.'),
  qualityScore: z.number().describe('A score representing the quality of the timetable (higher is better).'),
  violations: z.array(z.string()).describe('List of constraint violations in this timetable')
})).describe('Array of generated timetable options.');
export type GenerateTimetableOutput = z.infer<typeof GenerateTimetableOutputSchema>;

export async function generateOptimizedTimetables(input: GenerateTimetableInput): Promise<GenerateTimetableOutput> {
  return generateOptimizedTimetablesFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateOptimizedTimetablesPrompt',
  input: {schema: GenerateTimetableInputSchema},
  output: {schema: GenerateTimetableOutputSchema},
  prompt: `You are a world-class expert at generating optimized timetables for universities.

  Given the following information about the university's resources and constraints, generate {{numberOfTimetablesToGenerate}} different timetable options that satisfy as many constraints as possible.

  Classrooms:
  {{#each classrooms}}
  - {{name}} (Capacity: {{capacity}})
  {{/each}}

  Batches:
  {{#each batches}}
  - {{name}} (Students: {{studentCount}})
  {{/each}}

  Subjects:
  {{#each subjects}}
  - {{name}} (Credits: {{credits}}, Classes per week: {{classesPerWeek}})
  {{/each}}

  Faculties:
  {{#each faculties}}
  - {{name}} (Subjects: {{subjects}}, Max workload: {{maxWorkload}}, Monthly leaves: {{monthlyLeaves}})
    Availability:
    {{#each availability}}
    - {{day}}: {{slots}}
    {{/each}}
  {{/each}}

  Timetable Slots:
  {{#each timetableSlots}}
  - {{day}} - {{time}}
  {{/each}}

  Constraints:
  - Max classes per day: {{constraints.maxClassesPerDay}}
  - Room capacity margin: {{constraints.roomCapacityMargin}}

  Each timetable should be optimized to avoid clashes (same faculty or classroom being used for multiple classes at the same time), respect faculty availability and workload limits, and ensure that classrooms are large enough for the batches assigned to them.

  Prioritize generating complete timetables that cover all subjects and batches. If a perfect solution is not possible, indicate the constraints that could not be met in the "violations" field.

  Each timetable should include a "qualityScore" which is a number between 0 and 1 representing how well the timetable satisfies all constraints. A score of 1 indicates a perfect timetable with no violations.

  Return the generated timetables as a JSON array.
  `,
});

const generateOptimizedTimetablesFlow = ai.defineFlow(
  {
    name: 'generateOptimizedTimetablesFlow',
    inputSchema: GenerateTimetableInputSchema,
    outputSchema: GenerateTimetableOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
