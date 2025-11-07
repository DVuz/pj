import { createFileRoute } from '@tanstack/react-router'
import DetailCategoryPage from '@/page/admin/category/DetailCategoryPage'

export const Route = createFileRoute('/admin/categories/detail/$id/test')({
  component: DetailCategoryPage,
})

