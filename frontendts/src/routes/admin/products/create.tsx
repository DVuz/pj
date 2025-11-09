import { createFileRoute } from '@tanstack/react-router'
import CreateProductPage from "@/page/admin/products/CreateProductPage.tsx";

export const Route = createFileRoute('/admin/products/create')({
  component: CreateProductPage,
})
