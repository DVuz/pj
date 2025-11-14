import { createFileRoute } from '@tanstack/react-router'
import ProductListPage from '@/page/admin/products/ProductListPage'

export const Route = createFileRoute('/admin/products/list')({
  component: ProductListPage,
});
