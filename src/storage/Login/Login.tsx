import { atom } from 'recoil';
import { User } from '../../types/Login';

export const isLogin = atom({
  key: 'loginInfo',
  default: {},
});
