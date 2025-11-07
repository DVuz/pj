import { createFileRoute } from '@tanstack/react-router'
import ProductTypeListPage from '@/page/admin/product-types/ProducTypeListPage'

export const Route = createFileRoute('/admin/product-types/list')({
  component: ProductTypeListPage,
})
