import { createRoute } from '@tanstack/react-router';
import { Route as rootRoute } from '../../__root';
import DetailCategory from '@/page/admin/category/DetailCategory';

export const detailCategoryRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/admin/categories/detail/$id/$slug',
  component: DetailCategory,
});
