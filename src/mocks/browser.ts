import { setupWorker } from 'msw';
import handlers from './handlers';
import mockAuth from './mockAuth';
import mockAdmin from './mockAdmin';
import mockPost from './mockPost';
import mockComments from './mockComments';
// Service worker에서 mock handler 실행
export const worker = setupWorker(
  ...handlers,
  ...mockAuth,
  ...mockAdmin,
  ...mockPost,
  ...mockComments
);
