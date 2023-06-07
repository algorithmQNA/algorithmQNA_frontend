import { setupWorker } from 'msw';
import handlers from './handlers';

import mockAuth from './mockAuth';
import mockAdmin from './mockAdmin';
import mockPost from './mockPost';
import mockComments from './mockComments';
import {alarmHandler} from "./os/Alarm";
import {postHandler} from "./os/Post";

const set = [
    ...alarmHandler,
    ...postHandler
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
