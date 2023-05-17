import { setupWorker } from 'msw';
import handlers from './handlers';
import {dashboardHandler} from "./os/dashboard";
import {postWriteHandler} from "./os/PostWrite";
import {postViewHandler} from "./os/PostView";

const set = [...handlers,...dashboardHandler,...postWriteHandler,...postViewHandler]

// Service worker에서 mock handler 실행
export const worker = setupWorker(...set);
