import { createFileRoute } from '@tanstack/react-router'
import CreateSubcategories from '@/page/admin/subcategories/CreateSubcategories'

export const Route = createFileRoute('/admin/subcategories/create')({
  component: CreateSubcategories,
});
