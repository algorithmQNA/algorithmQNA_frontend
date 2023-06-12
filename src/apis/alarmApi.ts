import {privateRequest} from "./instance";

export const createPostRequest = ({}) =>
    privateRequest.get('/alarm');