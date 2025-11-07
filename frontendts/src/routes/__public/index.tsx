import { createFileRoute } from '@tanstack/react-router';
import HomePage from '../../page/HomePage';

export const Route = createFileRoute('/__public/')({
  component: HomePage,
  beforeLoad: async () => {
    document.title = 'Home - DDStore';
  },
});
