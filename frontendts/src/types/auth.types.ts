export interface UserInfo {
  id: number;
  email: string;
  user_name: string;
  avatar: string;
  role: string;
}



export interface LoginResponse {
  status: 'success' | 'error';
  message: string;
  data: {
    userInfo: UserInfo;
    accessToken: string;
  };
  source?: string;
}
