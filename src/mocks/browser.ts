import { setupWorker } from 'msw';
import handlers from './handlers';
import mockAuth from './mockAuth';
// Service worker에서 mock handler 실행
export const worker = setupWorker(...handlers, ...mockAuth);
