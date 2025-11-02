import { configureGenkit } from 'genkit';
import { firebase } from '@genkit-ai/firebase/plugin';
import { googleAI } from '@genkit-ai/googleai';

export default configureGenkit({
  plugins: [
    firebase(),
    googleAI(),
  ],
  flowStateStore: 'firebase',
  traceStore: 'firebase',
  logLevel: 'debug',
  enableTracingAndMetrics: true,
});