import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IUser } from '@/types/user';
import { getItem, setItem } from '@/utils';
interface UserState {
  userInfo: IUser;
}

const localCacheUser = (getItem('userInfo') as IUser) || {};
console.log('localCacheUser', localCacheUser);
const initialState: UserState = {
  userInfo: {
    userName: localCacheUser.userName || '',
    passWord: localCacheUser.passWord || '',
    token: localCacheUser.token || ''
  }
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUserInfo: (state, action: PayloadAction<IUser>) => {
      state.userInfo = { ...action.payload, token: '1234' };
      setItem('userInfo', { ...action.payload, token: '1234' });
    }
  }
});

export const { setUserInfo } = userSlice.actions;
export default userSlice.reducer;
