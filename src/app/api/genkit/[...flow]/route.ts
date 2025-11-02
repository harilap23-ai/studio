import { startFlowsServer } from '@genkit-ai/next';
import { testFlow } from '@/ai/flows/test-flow';
import { timetableFlow } from '@/ai/flows/timetable';
import '@/ai'; // Ensures Genkit is configured

export const { GET, POST, OPTIONS } = startFlowsServer({
  flows: [testFlow, timetableFlow],
});