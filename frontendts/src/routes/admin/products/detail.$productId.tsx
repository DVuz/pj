import ProductDetailPage from '@/page/admin/products/ProductDetailPage';
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/admin/products/detail/$productId')({
  component: ProductDetailPage,
});
