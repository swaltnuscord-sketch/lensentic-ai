import {
  RouterProvider,
  createRootRoute,
  createRoute,
  createRouter,
} from "@tanstack/react-router";
import Features from "./components/Features";
import FinalCTA from "./components/FinalCTA";
import Footer from "./components/Footer";
import Hero from "./components/Hero";
import Navbar from "./components/Navbar";
import Pipeline from "./components/Pipeline";
import Showcase from "./components/Showcase";
import SocialProof from "./components/SocialProof";
import Technology from "./components/Technology";

function LandingPage() {
  return (
    <div className="min-h-screen bg-background text-foreground antialiased">
      <Navbar />
      <main>
        <Hero />
        <Pipeline />
        <Features />
        <Showcase />
        <Technology />
        <SocialProof />
        <FinalCTA />
      </main>
      <Footer />
    </div>
  );
}

const rootRoute = createRootRoute();

const indexRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/",
  component: LandingPage,
});

const routeTree = rootRoute.addChildren([indexRoute]);

const router = createRouter({ routeTree });

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

export default function App() {
  return <RouterProvider router={router} />;
}
