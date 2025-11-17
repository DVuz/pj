import EditSubcategoryPage from '@/page/admin/subcategories/EditSubcategoryPage';
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/admin/subcategories/edit/$subcategoryId')({
  component: EditSubcategoryPage,
});
