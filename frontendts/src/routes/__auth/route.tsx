import { createFileRoute, Outlet, useNavigate } from '@tanstack/react-router';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import Top from '../../components/ui/Top';
import type { RootState } from '../../stores/store';

function AuthLayout() {
  const { userInfo } = useSelector((state: RootState) => state.authInfo);
  const navigate = useNavigate();

  useEffect(() => {
    // Nếu ĐÃ đăng nhập -> redirect về trang chủ
    if (userInfo) {
      navigate({ to: '/' });
    }
  }, [userInfo, navigate]);
  if (userInfo) {
    return <div>Redirecting...</div>;
  }

  return (
    <div>
      <Top />
      <Outlet />
    </div>
  );
}

export const Route = createFileRoute('/__auth')({
  component: AuthLayout,
});
