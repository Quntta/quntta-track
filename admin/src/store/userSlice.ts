import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import { IUser } from '@/types/user';
import { getItem, setItem } from '@/utils';
import request from '@/utils/request';
interface UserState {
  userInfo: IUser;
  status: 'fulfilled' | 'loading' | 'failed';
}

const localCacheUser = (getItem('userInfo') as IUser) || {};
const initialState: UserState = {
  userInfo: {
    userName: localCacheUser.userName || '',
    passWord: localCacheUser.passWord || '',
    token: localCacheUser.token || ''
  },
  status: 'fulfilled'
};
export const fetchTodos = createAsyncThunk('todos/fetchTodos', async (id: string) => {
  const response = await request('/fakeApi/todos', id);
  return response;
});
const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUserInfo: (state, action: PayloadAction<IUser>) => {
      state.userInfo = { ...action.payload, token: '1234' };
      setItem('userInfo', { ...action.payload, token: '1234' });
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTodos.pending, (state, action) => {
        console.log('pending---action', action);
        state.status = 'loading';
      })
      .addCase(fetchTodos.fulfilled, (state, action) => {
        console.log('fulfilled----action', action);
        state.status = 'fulfilled';
      })
      .addCase(fetchTodos.rejected, (state, action) => {
        console.log('rejected----action', action);
        state.status = 'failed';
      });
  }
});

export const { setUserInfo } = userSlice.actions;
export default userSlice.reducer;
