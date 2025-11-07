import { createFileRoute } from '@tanstack/react-router'
import CreatePTPage from "@/page/admin/product-types/CreatePTPage.tsx";

export const Route = createFileRoute('/admin/product-types/create')({
  component: CreatePTPage,
})
