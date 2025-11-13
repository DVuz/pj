import { createFileRoute } from '@tanstack/react-router'
import ProductDetailPage from '../../../page/public/product/ProductDetailPage';
export const Route = createFileRoute('/__public/product/$productSlug-$productId')({
  component: ProductDetailPage,
});
