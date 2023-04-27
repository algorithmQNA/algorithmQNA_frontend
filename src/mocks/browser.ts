import { setupWorker } from 'msw';
import handlers from './handlers';

// Service worker에서 mock handler 실행
export const worker = setupWorker(...handlers);
