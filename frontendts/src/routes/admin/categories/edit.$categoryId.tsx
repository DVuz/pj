import { createFileRoute } from '@tanstack/react-router'
import EditCategoryPage from '@/page/admin/category/EditCategoryPage'

export const Route = createFileRoute('/admin/categories/edit/$categoryId')({
  component: EditCategoryPage,
});
