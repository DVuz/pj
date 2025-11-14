import EditProductPage from '@/page/admin/products/EditProductPage';
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/admin/products/edit/$productId')({
  component: EditProductPage,
});
