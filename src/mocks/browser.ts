import { setupWorker } from 'msw';
import handlers from './handlers';
import {dashboardHandler} from "./os/dashboard";
import {postWriteHandler} from "./os/PostWrite";

const set = [...handlers,...dashboardHandler,...postWriteHandler]

// Service worker에서 mock handler 실행
export const worker = setupWorker(...set);
