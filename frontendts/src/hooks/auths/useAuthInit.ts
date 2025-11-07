import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { syncCredentials } from '../../slices/authSlice';
import type { UserInfo } from '../../types/auth.types';

export const useAuthInit = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const storedAccessToken = localStorage.getItem('accessToken');
    const storedUserInfo = localStorage.getItem('userInfo');

    if (storedAccessToken && storedUserInfo) {
      try {
        const userInfo: UserInfo = JSON.parse(storedUserInfo);
        dispatch(
          syncCredentials({
            userInfo,
            accessToken: storedAccessToken,
          })
        );
      } catch (error) {
        console.error('Failed to parse user info from localStorage', error);
        // Clear corrupted data
        localStorage.removeItem('accessToken');
        localStorage.removeItem('userInfo');
      }
    }
  }, [dispatch]);
};
