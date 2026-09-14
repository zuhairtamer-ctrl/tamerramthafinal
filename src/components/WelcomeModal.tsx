import { useEffect, useMemo, useState } from "react";
import { Sparkles, X, ClipboardList, GraduationCap } from "lucide-react";
import Logo from "./Logo";
import type { Page } from "./Navbar";

export default function WelcomeModal({ onNavigate }: { onNavigate: (p: Page) => void }) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setOpen(true), 900);
    return () => clearTimeout(t);
  }, []);

  const confetti = useMemo(
    () =>
      Array.from({ length: 34 }).map((_, i) => ({
        left: `${(i * 97) % 100}%`,
        delay: `${((i * 37) % 40) / 10}s`,
        dur: `${3.5 + ((i * 53) % 30) / 10}s`,
        size: 6 + ((i * 29) % 8),
        color: ["#d61f26", "#c9a227", "#0d7a4f", "#ffffff", "#f3e5b8"][i % 5],
        round: i % 3 === 0,
      })),
    []
  );

  if (!open) return null;

  const go = (p: Page) => {
    setOpen(false);
    onNavigate(p);
  };

  return (
    <div className="fade-in fixed inset-0 z-[80] flex items-center justify-center overflow-hidden bg-ink/80 p-4 backdrop-blur-sm">
      {/* قصاصات الاحتفال */}
      <div className="pointer-events-none absolute inset-0">
        {confetti.map((c, i) => (
          <span
            key={i}
            className="confetti-piece"
            style={{
              left: c.left,
              width: c.size,
              height: c.round ? c.size : c.size * 0.5,
              background: c.color,
              borderRadius: c.round ? "50%" : "2px",
              animationDelay: c.delay,
              animationDuration: c.dur,
            }}
          />
        ))}
      </div>

      <div className="modal-enter relative max-h-[92vh] w-full max-w-lg overflow-y-auto rounded-[2rem] bg-white p-8 text-center shadow-2xl">
        <button
          onClick={() => setOpen(false)}
          className="absolute left-4 top-4 flex h-9 w-9 items-center justify-center rounded-full bg-sand text-ink transition hover:bg-vtc-red hover:text-white"
          aria-label="إغلاق"
        >
          <X size={17} />
        </button>

        <div className="mx-auto flex w-fit items-center gap-1.5 rounded-full bg-gold/15 px-4 py-1.5 text-[12.5px] font-black text-gold-dark">
          <Sparkles size={14} /> اليوبيل الذهبي — 50 عاماً من العطاء
        </div>

        <div className="mt-5 flex justify-center">
          <Logo variant="full" />
        </div>

        <h2 className="font-ruqaa mt-5 text-3xl leading-relaxed text-ink">
          حيّاكم الله وبيّاكم
          <br />
          في معهد تدريب مهني الرمثا
        </h2>
        <p className="mx-auto mt-3 max-w-md text-[14px] leading-8 text-ink-soft/75">
          نرحب بكم أجمل ترحيب في صرح المهنة وعنوان التميز في شمال المملكة.
          التسجيل مفتوح الآن للدور التدريبي <b>2026 – 2027</b> في أكثر من 12 تخصصاً
          مهنياً — مهنتك بانتظارك ومستقبلك يبدأ من هنا!
        </p>

        <div className="mt-6 grid gap-3 sm:grid-cols-2">
          <button
            onClick={() => go("register")}
            className="flex items-center justify-center gap-2 rounded-2xl bg-vtc-red py-3.5 font-black text-white shadow-xl transition-all hover:-translate-y-0.5 hover:bg-vtc-red-dark"
          >
            <ClipboardList size={18} /> سجّل الآن
          </button>
          <button
            onClick={() => go("courses")}
            className="flex items-center justify-center gap-2 rounded-2xl bg-ink py-3.5 font-black text-white transition-all hover:-translate-y-0.5"
          >
            <GraduationCap size={18} /> تصفح الدورات
          </button>
        </div>
        <button
          onClick={() => setOpen(false)}
          className="mt-3 text-[13px] font-bold text-ink-soft/50 transition-colors hover:text-vtc-red"
        >
          دخول الموقع مباشرة
        </button>
      </div>
    </div>
  );
}
