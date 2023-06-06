import { setupWorker } from 'msw';
import handlers from './handlers';
import { dashboardHandler } from './os/dashboard';
import { postWriteHandler } from './os/PostWrite';
import { postViewHandler } from './os/PostView';

import mockAuth from './mockAuth';
import mockAdmin from './mockAdmin';
import mockPost from './mockPost';
import mockComments from './mockComments';
import {alarmHandler} from "./os/Alarm";

const set = [
  ...dashboardHandler,
  ...postWriteHandler,
  ...postViewHandler,
    ...alarmHandler
];

// Service worker에서 mock handler 실행
export const worker = setupWorker(
  ...handlers,
  ...mockAuth,
  ...mockAdmin,
  ...mockPost,
  ...mockComments,
  ...mockAuth,
  ...set
);
