import { fetchBaseQuery } from '@reduxjs/toolkit/query';
import type { FetchArgs, FetchBaseQueryError, BaseQueryFn } from '@reduxjs/toolkit/query';
import type { RootState } from '../stores/store';
import { clearCredentials, syncCredentials } from '../slices/authSlice';
import type { UserInfo } from '../types/auth.types';

const baseAPIUrl = import.meta.env.VITE_API_URL as string;

// Base query bình thường
const baseQuery = fetchBaseQuery({
  baseUrl: baseAPIUrl,
  prepareHeaders: (headers, { getState }) => {
    const token = (getState() as RootState).authInfo.accessToken;
    if (token) {
      headers.set('authorization', `Bearer ${token}`);
    }
    return headers;
  },
});

// Interface cho response data của refresh token
interface RefreshTokenResponse {
  data: {
    userInfo: UserInfo;
    accessToken: string;
  };
}

// Base query có xử lý refresh token với typing đầy đủ
const baseQueryWithReauth: BaseQueryFn<string | FetchArgs, unknown, FetchBaseQueryError> = async (
  args,
  api,
  extraOptions
) => {
  let result = await baseQuery(args, api, extraOptions);

  if (result.error && result.error.status === 401) {
    console.log('Access token expired, attempting to refresh...');

    try {
      const refreshResponse = await fetch(`${baseAPIUrl}/auth/refresh`, {
        method: 'POST',
        credentials: 'include',
      });

      if (refreshResponse.ok) {
        const refreshData: RefreshTokenResponse = await refreshResponse.json();
        console.log('Token refreshed successfully:', refreshData);

        // Cập nhật store với token mới
        api.dispatch(
          syncCredentials({
            userInfo: refreshData.data.userInfo,
            accessToken: refreshData.data.accessToken,
          })
        );

        // Retry request ban đầu với token mới
        result = await baseQuery(args, api, extraOptions);
      } else {
        // Refresh thất bại, logout user
        api.dispatch(clearCredentials());
      }
    } catch (error) {
      console.error('Refresh token failed:', error);
      api.dispatch(clearCredentials());
    }
  }

  return result;
};

export { baseQuery, baseQueryWithReauth };
