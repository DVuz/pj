import { createFileRoute } from '@tanstack/react-router';
import ProductListPage from '../../../../../page/public/product/ProductListPage';

export const Route = createFileRoute(
  '/__public/product/$categorySlug-$categoryId/$subcategorySlug-$subcategoryId/'
)({
  component: ProductListPage,
});
