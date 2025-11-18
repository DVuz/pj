import { createFileRoute } from '@tanstack/react-router'
import FavoriteProductsPage from '@/page/public/favorites/FavoriteProductsPage'

export const Route = createFileRoute('/__public/favorite')({
  component: FavoriteProductsPage,
})

