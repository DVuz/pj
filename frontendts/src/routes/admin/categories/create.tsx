import { createFileRoute } from '@tanstack/react-router';
import CreateCategoryPage from '../../../page/admin/category/CreateCategoryPage';

export const Route = createFileRoute('/admin/categories/create')({
  component: CreateCategoryPage,
  beforeLoad: () => {
    document.title = 'Tạo danh mục | Admin DDStore';
  },
});
