import { createFileRoute } from '@tanstack/react-router'
import CategoryListPage from '../../../page/admin/category/CategoryListPage'

export const Route = createFileRoute('/admin/categories/list')({
  component: CategoryListPage,
})

