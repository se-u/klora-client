import { useNavigate } from "react-router-dom";
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
import { useTonConnect } from "../../hooks/useTonConnect.js";

export default function LandingPages() {
  const navigate = useNavigate();
  const { connected } = useTonConnect();

  if (connected) {
    return <>{navigate("/app")}</>;
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
