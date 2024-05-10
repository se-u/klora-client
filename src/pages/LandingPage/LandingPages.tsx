import { Navigate } from "react-router-dom";
import {
  Klora,
  AreYouReady,
  Footer,
  Hero,
  Solutions,
  Problem,
  FAQPage,
  Roadmap,
} from "../../components/landingpage/index.jsx";

export default function LandingPages({ connected }: { connected: boolean }) {
  if (connected) {
    return <Navigate to="/app" replace />;
  }
  return (
    <>
      <main className="bg-neutral-50  overflow-hidden">
        <div className="flex flex-col bg-primary-50 pt-[15vh] z-30">
          <Hero />
          <Problem />
          <Solutions />
          <Klora />
          <Roadmap />
          <FAQPage />
          <AreYouReady />
          <Footer />
        </div>
      </main>
    </>
  );
}
