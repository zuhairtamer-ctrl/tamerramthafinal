import { useEffect, useState } from "react";
import { Home, Info, GraduationCap, ClipboardList, Menu, X, Phone, ExternalLink } from "lucide-react";
import Logo from "./Logo";

export type Page = "home" | "about" | "courses" | "register";

interface NavbarProps {
  page: Page;
  onNavigate: (p: Page) => void;
}

const links: { id: Page; label: string; icon: React.ReactNode }[] = [
  { id: "home", label: "الرئيسية", icon: <Home size={17} /> },
  { id: "about", label: "عن المعهد", icon: <Info size={17} /> },
  { id: "courses", label: "الدورات التدريبية", icon: <GraduationCap size={17} /> },
  { id: "register", label: "تسجيل طالب", icon: <ClipboardList size={17} /> },
];

export default function Navbar({ page, onNavigate }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 30);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);

  const go = (p: Page) => {
    setOpen(false);
    onNavigate(p);
  };

  return (
    <div className="print:hidden">
      {/* الشريط العلوي */}
      <div className="relative z-50 bg-ink text-white">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-2 px-4 py-2 text-[12.5px]">
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1.5 text-gold-light">
              <Phone size={13} /> الخط الساخن: <bdi className="font-bold text-white">027395351</bdi>
            </span>
            <span className="hidden items-center gap-1.5 sm:flex">
              <span className="h-2 w-2 animate-pulse rounded-full bg-green-400" />
              التسجيل مفتوح للدور التدريبي الجديد 2026 – 2027
            </span>
          </div>
          <div className="flex items-center">
            <div className="animate-flag relative h-5 w-9 overflow-hidden rounded-sm shadow" dir="ltr">
              <div className="flex h-full flex-col">
                <div className="flex-1 bg-black" />
                <div className="flex-1 bg-white" />
                <div className="flex-1 bg-[#007a3d]" />
              </div>
              <div className="absolute inset-y-0 left-0 w-[45%] bg-[#ce1126]" style={{ clipPath: "polygon(0 0, 100% 50%, 0 100%)" }} />
              <span className="absolute left-[7%] top-1/2 -translate-y-1/2 text-[7px] leading-none text-white">★</span>
            </div>
            <span className="mr-2 font-bold text-gold-light">المملكة الأردنية الهاشمية</span>
          </div>
        </div>
      </div>

      {/* القائمة الرئيسية */}
      <header
        className={`sticky top-0 z-40 transition-all duration-300 ${
          scrolled ? "bg-white/95 shadow-xl shadow-black/5 backdrop-blur-md" : "bg-white"
        }`}
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-3">
          <button onClick={() => go("home")} className="transition-transform hover:scale-[1.02]">
            <Logo variant="compact" />
          </button>

          <nav className="hidden items-center gap-1 lg:flex">
            {links.map((l) => (
              <button
                key={l.id}
                onClick={() => go(l.id)}
                className={`relative flex items-center gap-2 rounded-full px-5 py-2.5 text-[15px] font-extrabold transition-all duration-300 ${
                  page === l.id
                    ? "bg-vtc-red text-white shadow-lg shadow-red-600/30"
                    : "text-ink-soft hover:bg-sand-dark hover:text-vtc-red"
                }`}
              >
                {l.icon}
                {l.label}
              </button>
            ))}
            <a
              href="https://ereg.vtc.gov.jo"
              target="_blank"
              rel="noreferrer"
              className="mr-2 flex items-center gap-2 rounded-full bg-gradient-to-l from-gold-dark via-gold to-gold-dark bg-[length:200%_auto] px-5 py-2.5 text-[15px] font-black text-white shadow-lg transition-all hover:bg-right"
            >
              <ExternalLink size={16} /> التسجيل الإلكتروني
            </a>
          </nav>

          <button
            onClick={() => setOpen(!open)}
            className="flex h-11 w-11 items-center justify-center rounded-xl bg-ink text-white lg:hidden"
            aria-label="القائمة"
          >
            {open ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>

        {/* قائمة الجوال */}
        <div
          className={`overflow-hidden transition-all duration-500 lg:hidden ${
            open ? "max-h-[420px] opacity-100" : "max-h-0 opacity-0"
          }`}
        >
          <nav className="space-y-2 border-t border-sand-dark bg-white px-4 py-4">
            {links.map((l) => (
              <button
                key={l.id}
                onClick={() => go(l.id)}
                className={`flex w-full items-center gap-3 rounded-xl px-4 py-3 text-[15px] font-extrabold transition-all ${
                  page === l.id ? "bg-vtc-red text-white shadow-lg" : "bg-sand text-ink-soft"
                }`}
              >
                {l.icon}
                {l.label}
              </button>
            ))}
          </nav>
        </div>
      </header>
    </div>
  );
}
