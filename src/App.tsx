import { useCallback, useState } from "react";
import Navbar, { type Page } from "./components/Navbar";
import Hero from "./components/Hero";
import HomePage from "./components/HomePage";
import AboutPage from "./components/AboutPage";
import CoursesPage from "./components/CoursesPage";
import RegisterPage from "./components/RegisterPage";
import Footer, { FloatingButtons } from "./components/Footer";
import WelcomeModal from "./components/WelcomeModal";

export default function App() {
  const [page, setPage] = useState<Page>("home");
  const [preselected, setPreselected] = useState<string | undefined>(undefined);

  const navigate = useCallback((p: Page, courseId?: string) => {
    if (courseId) setPreselected(courseId);
    setPage(p);
    window.scrollTo({ top: 0, behavior: "instant" as ScrollBehavior });
  }, []);

  return (
    <div className="min-h-screen bg-sand">
      <WelcomeModal onNavigate={navigate} />
      <Navbar page={page} onNavigate={navigate} />

      <main key={page}>
        {page === "home" && (
          <>
            <Hero onNavigate={navigate} />
            <HomePage onNavigate={navigate} />
          </>
        )}
        {page === "about" && <AboutPage onNavigate={navigate} />}
        {page === "courses" && <CoursesPage onNavigate={navigate} />}
        {page === "register" && <RegisterPage onNavigate={navigate} preselected={preselected} />}
      </main>

      <Footer onNavigate={navigate} />
      <FloatingButtons />
    </div>
  );
}
