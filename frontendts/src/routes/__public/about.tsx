import { createFileRoute } from '@tanstack/react-router'
import AboutUs from '../../page/AboutUs'
export const Route = createFileRoute('/__public/about')({
  component: RouteComponent,
})

function RouteComponent() {
  return <AboutUs />
}
