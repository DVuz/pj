import { createFileRoute } from '@tanstack/react-router'
import CategoryTest from '@/page/admin/category/CategoryTest'

export const Route = createFileRoute('/admin/categories/test')({
  component: CategoryTest,
})

