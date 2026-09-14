import { useEffect, useState } from "react";
import {
  Phone,
  MapPin,
  Clock,
  Globe,
  ChevronLeft,
  Share2,
  PlaySquare,
  Camera,
  ArrowUp,
  MessageCircle,
} from "lucide-react";
import Logo from "./Logo";
import type { Page } from "./Navbar";

export function FloatingButtons() {
  const [showTop, setShowTop] = useState(false);

  useEffect(() => {
    const fn = () => setShowTop(window.scrollY > 500);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);

  return (
    <div className="fixed bottom-6 left-6 z-[60] flex flex-col gap-3 print:hidden">
      <a
        href="https://wa.me/962798137070"
        target="_blank"
        rel="noreferrer"
        aria-label="واتساب"
        className="pulse-ring relative flex h-14 w-14 items-center justify-center rounded-full bg-[#25d366] text-white shadow-2xl transition-transform hover:scale-110"
      >
        <MessageCircle size={26} />
      </a>
      <button
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        aria-label="العودة للأعلى"
        className={`flex h-12 w-12 items-center justify-center rounded-full bg-ink text-gold-light shadow-2xl transition-all hover:bg-vtc-red hover:text-white ${
          showTop ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-4 opacity-0"
        }`}
      >
        <ArrowUp size={22} />
      </button>
    </div>
  );
}

export default function Footer({ onNavigate }: { onNavigate: (p: Page) => void }) {
  return (
    <footer className="relative overflow-hidden bg-ink text-white print:hidden">
      {/* شريط العلم */}
      <div className="flex h-2">
        <div className="flex-1 bg-black" />
        <div className="flex-1 bg-white" />
        <div className="flex-1 bg-[#0d7a4f]" />
        <div className="flex-1 bg-[#d61f26]" />
      </div>
      <div className="dot-grid absolute inset-0 opacity-20" />

      <div className="relative mx-auto grid max-w-7xl gap-10 px-4 py-14 md:grid-cols-2 lg:grid-cols-4">
        <div>
          <div className="rounded-2xl bg-white p-4">
            <Logo variant="compact" />
          </div>
          <p className="mt-4 text-[13.5px] leading-8 text-white/70">
            معهد تدريب مهني الرمثا — أحد معاهد مؤسسة التدريب المهني في محافظة إربد،
            نُعدّ القوى العاملة الماهرة ونخدم أبناء الشمال منذ عقود.
          </p>
          <div className="mt-4 flex gap-2">
            {[
              { icon: <Share2 size={18} />, t: "فيسبوك" },
              { icon: <PlaySquare size={18} />, t: "يوتيوب" },
              { icon: <Camera size={18} />, t: "انستغرام" },
              { icon: <Globe size={18} />, t: "الموقع الرسمي" },
            ].map((s, i) => (
              <button
                key={i}
                title={s.t}
                className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white transition-all hover:-translate-y-1 hover:bg-vtc-red"
              >
                {s.icon}
              </button>
            ))}
          </div>
        </div>

        <div>
          <h3 className="text-lg font-black text-gold-light">روابط سريعة</h3>
          <ul className="mt-4 space-y-2.5">
            {[
              { t: "الصفحة الرئيسية", p: "home" as Page },
              { t: "عن المعهد والمؤسسة", p: "about" as Page },
              { t: "الدورات التدريبية", p: "courses" as Page },
              { t: "تسجيل طالب جديد", p: "register" as Page },
            ].map((l, i) => (
              <li key={i}>
                <button
                  onClick={() => onNavigate(l.p)}
                  className="group flex items-center gap-2 text-[14px] font-bold text-white/70 transition-colors hover:text-gold-light"
                >
                  <ChevronLeft size={15} className="text-vtc-red transition-transform group-hover:-translate-x-1" />
                  {l.t}
                </button>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="text-lg font-black text-gold-light">أشهر التخصصات</h3>
          <ul className="mt-4 space-y-2.5">
            {[
              "ميكانيك وكهرباء المركبات",
              "الطاقة الشمسية والكهرباء",
              "الحلاقة والتجميل",
              "تقنية المعلومات",
              "فنون الطهي والحلويات",
            ].map((t, i) => (
              <li key={i}>
                <button
                  onClick={() => onNavigate("courses")}
                  className="group flex items-center gap-2 text-[14px] font-bold text-white/70 transition-colors hover:text-gold-light"
                >
                  <span className="h-1.5 w-1.5 rounded-full bg-gold transition-transform group-hover:scale-150" />
                  {t}
                </button>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="text-lg font-black text-gold-light">تواصل معنا</h3>
          <ul className="mt-4 space-y-3 text-[13.5px] font-bold text-white/75">
            <li className="flex items-start gap-2.5">
              <MapPin size={17} className="mt-0.5 shrink-0 text-vtc-red" />
              لواء الرمثا — محافظة إربد
              <br />
            </li>
            <li className="flex items-center gap-2.5" dir="ltr">
              <Phone size={17} className="shrink-0 text-vtc-red" />
              <span className="tracking-wider">0798137070</span>
            </li>
            <li className="flex items-start gap-2.5">
              <Clock size={17} className="mt-0.5 shrink-0 text-vtc-red" />
              الأحد – الخميس: 8:00 ص – 3:00 م
            </li>
            <li className="flex items-center gap-2.5" dir="ltr">
              <Globe size={17} className="shrink-0 text-vtc-red" />
              <span className="text-[12.5px]">ereg.vtc.gov.jo</span>
            </li>
          </ul>
          <button
            onClick={() => onNavigate("register")}
            className="mt-5 w-full rounded-2xl bg-vtc-red py-3 font-black text-white shadow-xl transition-all hover:-translate-y-0.5 hover:bg-vtc-red-dark"
          >
            سجّل الآن — المقاعد محدودة
          </button>
        </div>
      </div>

      <div className="relative border-t border-white/10 bg-black/40">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-2 px-4 py-4 text-[12.5px] font-bold text-white/55">
          <span>© 2026 معهد تدريب مهني الرمثا — مؤسسة التدريب المهني | جميع الحقوق محفوظة</span>
          <span className="flex items-center gap-1.5">
            صُنع بفخر في الأردن
            <span className="relative inline-flex h-3.5 w-6 overflow-hidden rounded-[3px]" dir="ltr">
              <span className="flex h-full w-full flex-col">
                <span className="flex-1 bg-black" />
                <span className="flex-1 bg-white" />
                <span className="flex-1 bg-[#007a3d]" />
              </span>
              <span className="absolute inset-y-0 left-0 w-[45%] bg-[#ce1126]" style={{ clipPath: "polygon(0 0, 100% 50%, 0 100%)" }} />
            </span>
          </span>
        </div>
      </div>
    </footer>
  );
}
