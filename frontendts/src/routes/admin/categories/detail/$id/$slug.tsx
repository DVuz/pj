// src/routes/admin/categories/detail/$id/$slug.tsx
import { createFileRoute } from '@tanstack/react-router';
//import DetailCategory from '@/page/admin/category/DetailCategory';
import CategoryDetail from '@/page/admin/category/CategoryDetail';

export const Route = createFileRoute('/admin/categories/detail/$id/$slug')({
  component: CategoryDetail,
});
