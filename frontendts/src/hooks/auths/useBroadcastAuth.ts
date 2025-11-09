import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { authChannel, syncCredentials } from '@/slices/authSlice.ts';
import type { UserInfo } from '@/types/auth.types.ts';

interface AuthBroadcastMessage {
  type: 'AUTH_UPDATE' | 'AUTH_LOGOUT';
  payload?: {
    userInfo: UserInfo;
    accessToken: string;
  };
}

export const useBroadcastAuth = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const handleMessage = (event: MessageEvent<AuthBroadcastMessage>) => {
      // only handle messages from other tabs, not from the current tab
      if (event.data.type === 'AUTH_UPDATE' && event.data.payload) {
        dispatch(syncCredentials(event.data.payload));
      } else if (event.data.type === 'AUTH_LOGOUT') {
        //only sync state, do not call clearCredentials to avoid loops
        dispatch(syncCredentials({ userInfo: null, accessToken: null }));
      }
    };

    authChannel.addEventListener('message', handleMessage);

    return () => {
      authChannel.removeEventListener('message', handleMessage);
    };
  }, [dispatch]);
};
