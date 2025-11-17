import { createFileRoute } from '@tanstack/react-router'
import EditProductTypePage from '@/page/admin/product-types/EditProductTypePage'

export const Route = createFileRoute('/admin/product-types/edit/$productTypeId')({
  component: EditProductTypePage,
});
