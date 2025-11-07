import { createFileRoute } from '@tanstack/react-router';
import AdminTest from '../../page/admin/AdminTest';

export const Route = createFileRoute('/admin/dashboard')({
  component: AdminTest,
  beforeLoad: () => {
    document.title = 'Dashboard | Admin DDStore';
  },
});
