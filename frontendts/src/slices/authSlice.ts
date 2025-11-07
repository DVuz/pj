import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import { authApi } from '../services/api/authApi';
import type { LoginResponse, UserInfo } from '../types/auth.types';


interface AuthState {
  userInfo: UserInfo | null;
  accessToken: string | null;
}

const initialState: AuthState = {
  userInfo: null,
  accessToken: null,
};

const authChannel = new BroadcastChannel('auth');

const authSlice = createSlice({
  name: 'authInfo',
  initialState,
  reducers: {
    setCredentials: (state, action: PayloadAction<LoginResponse>) => {
      const { userInfo, accessToken } = action.payload.data;
      state.userInfo = userInfo;
      state.accessToken = accessToken;
      localStorage.setItem('accessToken', accessToken);
      localStorage.setItem('userInfo', JSON.stringify(userInfo));
      authChannel.postMessage({ type: 'AUTH_UPDATE', payload: { userInfo, accessToken } });
    },
    clearCredentials: state => {
      state.userInfo = null;
      state.accessToken = null;
      localStorage.removeItem('accessToken');
      localStorage.removeItem('userInfo');
      authChannel.postMessage({ type: 'AUTH_LOGOUT' });
    },
    syncCredentials: (
      state,
      action: PayloadAction<{ userInfo: UserInfo | null; accessToken: string | null }>
    ) => {
      state.userInfo = action.payload.userInfo;
      state.accessToken = action.payload.accessToken;
    },
  },
  extraReducers: builder => {
    builder
      .addMatcher(authApi.endpoints.login.matchFulfilled, (state, action) => {
        const { userInfo, accessToken } = action.payload.data;
        state.userInfo = userInfo;
        state.accessToken = accessToken;
        localStorage.setItem('accessToken', accessToken);
        localStorage.setItem('userInfo', JSON.stringify(userInfo));
        authChannel.postMessage({ type: 'AUTH_UPDATE', payload: { userInfo, accessToken } });
      })
      .addMatcher(authApi.endpoints.logout.matchFulfilled, state => {
        state.userInfo = null;
        state.accessToken = null;
        localStorage.removeItem('accessToken');
        localStorage.removeItem('userInfo');
        authChannel.postMessage({ type: 'AUTH_LOGOUT' });
      });
  },
});

export const { setCredentials, clearCredentials, syncCredentials } = authSlice.actions;
export { authChannel };
export default authSlice.reducer;

// Export types để dùng ở nơi khác
export type { AuthState };
