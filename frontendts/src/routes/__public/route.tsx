import Header from '../../components/ui/Header';
import Footer from '../../components/ui/Footer';
import Top from '../../components/ui/Top';
import { createFileRoute, Outlet } from '@tanstack/react-router';

export const Route = createFileRoute('/__public')({
  component: () => (
    <div>
      <Top />
      <Header />
      <Outlet /> {/* nơi render route con */}
      <Footer />
    </div>
  ),
});
