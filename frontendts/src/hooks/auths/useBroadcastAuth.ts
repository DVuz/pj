import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { authChannel, syncCredentials } from '../../slices/authSlice';
import type { UserInfo } from '../../types/auth.types';

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
      // Chỉ xử lý message từ tab khác, không xử lý message từ chính tab hiện tại
      if (event.data.type === 'AUTH_UPDATE' && event.data.payload) {
        dispatch(syncCredentials(event.data.payload));
      } else if (event.data.type === 'AUTH_LOGOUT') {
        // Chỉ sync state, không gọi clearCredentials để tránh vòng lặp
        dispatch(syncCredentials({ userInfo: null, accessToken: null }));
      }
    };

    authChannel.addEventListener('message', handleMessage);

    return () => {
      authChannel.removeEventListener('message', handleMessage);
    };
  }, [dispatch]);
};
