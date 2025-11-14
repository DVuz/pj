import { createFileRoute } from '@tanstack/react-router'
import ContactPage from '@/page/ContactPage';


export const Route = createFileRoute('/__public/contact')({
  component: ContactPage,
});
