import { UserInfo } from '../user';

export type GetAuthResponse = UserInfo & { state: string };
