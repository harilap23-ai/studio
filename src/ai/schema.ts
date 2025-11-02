import { z } from 'zod';

export const GenerateOptimizedTimetablesInputSchema = z.object({
  classrooms: z.array(z.string()).describe('List of available classrooms and their capacities'),
  batches: z.array(z.string()).describe('List of student batches'),
  subjects: z.array(z.string()).describe('List of subjects to be scheduled'),
  faculties: z.array(z.string()).describe('List of available faculty members and their specializations'),
  timetableSlots: z.array(z.string()).describe('List of available timetable slots'),
  constraints: z.string().describe('A description of constraints such as maximum classes per day, faculty leave, and room capacity'),
});

export type GenerateOptimizedTimetablesInput = z.infer<typeof GenerateOptimizedTimetablesInputSchema>;

export const GenerateOptimizedTimetablesOutputSchema = z.object({
  timetable: z.string().describe('A markdown-formatted timetable string'),
});

export type GenerateOptimizedTimetablesOutput = z.infer<typeof GenerateOptimizedTimetablesOutputSchema>;

export const SuggestAlternativeArrangementsInputSchema = z.object({
  originalTimetable: z.string().describe('The original timetable that needs to be modified'),
  unavailableFaculty: z.string().describe('The faculty member who is unavailable'),
  reason: z.string().describe('The reason for the faculty member\'s unavailability'),
});

export type SuggestAlternativeArrangementsInput = z.infer<typeof SuggestAlternativeArrangementsInputSchema>;

export const SuggestAlternativeArrangementsOutputSchema = z.object({
  alternatives: z.string().describe('A markdown-formatted list of alternative arrangements'),
});

export type SuggestAlternativeArrangementsOutput = z.infer<typeof SuggestAlternativeArrangementsOutputSchema>;
