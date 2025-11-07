import { createFileRoute } from '@tanstack/react-router'
import SubcategoryListPage from '@/page/admin/subcategories/SubcategoryListPage'

export const Route = createFileRoute('/admin/subcategories/list')({
  component: SubcategoryListPage,
})
