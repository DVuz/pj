// src/routes/admin/categories/detail/$id/$slug.tsx
import { createFileRoute } from '@tanstack/react-router';
import DetailCategory from '@/page/admin/category/DetailCategory';

export const Route = createFileRoute('/admin/categories/detail/$id/$slug')({
  component: DetailCategory,
});
