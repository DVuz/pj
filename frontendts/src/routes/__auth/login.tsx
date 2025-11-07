import { createFileRoute } from '@tanstack/react-router';
import Login from '../../page/auths/Login';

export const Route = createFileRoute('/__auth/login')({
  component: Login,
  beforeLoad: () => {
    document.title = 'Login - DDStore';
  },
});
