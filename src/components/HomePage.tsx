import { useEffect, useRef, useState } from "react";
import {
  ChevronLeft,
  ChevronRight,
  Quote,
  BadgeCheck,
  Briefcase,
  MonitorCog,
  HeartHandshake,
  ShieldCheck,
  Landmark,
  Star,
  Plus,
  Minus,
  MapPin,
  Phone,
  Clock,
  ArrowLeft,
} from "lucide-react";
import { courses, stats, gallery, faqs, testimonials } from "../data/content";
import { useReveal } from "../hooks/useReveal";
import type { Page } from "./Navbar";

/* عدّاد متحرك */
function Counter({ value, suffix }: { value: number; suffix: string }) {
  const [n, setN] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const started = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (es) => {
        if (es[0].isIntersecting && !started.current) {
          started.current = true;
          const t0 = performance.now();
          const dur = 1800;
          const tick = (t: number) => {
            const p = Math.min((t - t0) / dur, 1);
            const eased = 1 - Math.pow(1 - p, 3);
            setN(Math.round(value * eased));
            if (p < 1) requestAnimationFrame(tick);
          };
          requestAnimationFrame(tick);
        }
      },
      { threshold: 0.4 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [value]);

  return (
    <span ref={ref}>
      {n}
      {suffix}
    </span>
  );
}

export default function HomePage({ onNavigate }: { onNavigate: (p: Page) => void }) {
  useReveal();
  const [faqOpen, setFaqOpen] = useState<number | null>(0);
  const [slide, setSlide] = useState(0);
  const [lightbox, setLightbox] = useState<number | null>(null);

  useEffect(() => {
    const t = setInterval(() => setSlide((s) => (s + 1) % testimonials.length), 6000);
    return () => clearInterval(t);
  }, []);

  const features = [
    { icon: <BadgeCheck size={26} />, t: "شهادات معتمدة رسمياً", d: "اختبارات مستوى مهني معتمدة (مهني / ماهر / محدد المهارات) معترف بها محلياً وإقليمياً.", c: "bg-vtc-red" },
    { icon: <MonitorCog size={26} />, t: "مشاغل مجهزة حديثاً", d: "مختبرات ومشاغل بأحدث التقنيات وتدريب عملي مكثف يحاكي بيئة العمل الحقيقية.", c: "bg-ink" },
    { icon: <Briefcase size={26} />, t: "تشبيك وظيفي", d: "تدريب ميداني في مواقع العمل وربط الخريجين بأصحاب العمل ودعم المشاريع الصغيرة.", c: "bg-jordan-green" },
    { icon: <HeartHandshake size={26} />, t: "رسوم رمزية", d: "رسوم تدريبية رمزية وبرامج مدعومة ومجانية لخدمة أبناء المجتمع المحلي.", c: "bg-gold-dark" },
    { icon: <ShieldCheck size={26} />, t: "سلامة وصحة مهنية", d: "برامج متخصصة في السلامة والصحة المهنية للحد من حوادث مواقع العمل.", c: "bg-vtc-red-dark" },
    { icon: <Landmark size={26} />, t: "50 عاماً من الثقة", d: "مؤسسة حكومية رائدة منذ 1976 والحاضنة الأولى للتدريب المهني في الأردن.", c: "bg-ink-soft" },
  ];

  return (
    <div>
      {/* ===== الإحصائيات ===== */}
      <section className="relative z-10 mx-auto -mt-2 max-w-7xl px-4 py-14">
        <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
          {stats.map((s, i) => (
            <div
              key={i}
              className={`reveal delay-${i} group relative overflow-hidden rounded-3xl bg-white p-6 text-center shadow-xl shadow-black/5 ring-1 ring-sand-dark transition-all hover:-translate-y-2 hover:shadow-2xl`}
            >
              <div className="absolute inset-x-0 top-0 h-1.5 bg-gradient-to-l from-vtc-red via-gold to-jordan-green" />
              <div className="dot-grid-dark absolute inset-0 opacity-0 transition-opacity group-hover:opacity-100" />
              <div className="relative font-black text-5xl text-ink">
                <Counter value={s.value} suffix={s.suffix} />
              </div>
              <div className="relative mt-2 font-extrabold text-vtc-red">{s.label}</div>
              <div className="relative text-[12px] font-bold text-ink-soft/60">{s.sub}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ===== لماذا المعهد ===== */}
      <section className="relative overflow-hidden bg-white py-20">
        <div className="zellige-pattern absolute inset-0 opacity-50" />
        <div className="relative mx-auto max-w-7xl px-4">
          <div className="reveal mx-auto max-w-2xl text-center">
            <span className="rounded-full bg-vtc-red-light px-4 py-1.5 text-[13px] font-black text-vtc-red">
              لماذا معهد تدريب مهني الرمثا؟
            </span>
            <h2 className="mt-4 text-3xl font-black text-ink sm:text-4xl">
              صرحٌ يصنع <span className="text-vtc-red">المهارة</span> ويبني{" "}
              <span className="text-shimmer">المستقبل</span>
            </h2>
            <p className="mt-3 leading-8 text-ink-soft/70">
              نجمع بين عراقة مؤسسة التدريب المهني وروح الحداثة، لنقدم لأبناء الرمثا وإربد
              والشمال تجربة تدريبية متكاملة من القبول حتى التوظيف.
            </p>
          </div>
          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {features.map((f, i) => (
              <div
                key={i}
                className={`reveal group rounded-3xl border border-sand-dark bg-sand p-6 transition-all duration-300 hover:-translate-y-2 hover:border-transparent hover:bg-ink hover:shadow-2xl`}
              >
                <div
                  className={`flex h-14 w-14 items-center justify-center rounded-2xl ${f.c} text-white shadow-lg transition-transform group-hover:rotate-6 group-hover:scale-110`}
                >
                  {f.icon}
                </div>
                <h3 className="mt-4 text-lg font-black text-ink transition-colors group-hover:text-gold-light">
                  {f.t}
                </h3>
                <p className="mt-2 text-[14px] leading-7 text-ink-soft/70 transition-colors group-hover:text-white/75">
                  {f.d}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== معاينة الدورات ===== */}
      <section className="relative overflow-hidden bg-ink py-20">
        <div className="dot-grid absolute inset-0 opacity-30" />
        <div className="animate-spin-slower absolute -right-28 -top-28 h-96 w-96 rounded-full border-2 border-dashed border-gold/20" />
        <div className="relative mx-auto max-w-7xl px-4">
          <div className="reveal flex flex-wrap items-end justify-between gap-4">
            <div>
              <span className="rounded-full bg-gold/20 px-4 py-1.5 text-[13px] font-black text-gold-light">
                الدورات الأكثر طلباً
              </span>
              <h2 className="mt-4 text-3xl font-black text-white sm:text-4xl">
                تخصصات تواكب سوق العمل
              </h2>
            </div>
            <button
              onClick={() => onNavigate("courses")}
              className="group flex items-center gap-2 rounded-full bg-vtc-red px-6 py-3 font-black text-white shadow-xl transition-all hover:bg-vtc-red-dark"
            >
              جميع الدورات
              <ChevronLeft size={18} className="transition-transform group-hover:-translate-x-1" />
            </button>
          </div>

          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {courses
              .filter((c) => c.featured)
              .map((c, i) => (
                <article
                  key={c.id}
                  className={`reveal course-card group cursor-pointer overflow-hidden rounded-3xl bg-white shadow-2xl`}
                  style={{ transitionDelay: `${i * 0.1}s` }}
                  onClick={() => onNavigate("courses")}
                >
                  <div className="relative h-52 overflow-hidden">
                    <img src={c.image} alt={c.title} className="h-full w-full object-cover" loading="lazy" />
                    <div className="absolute inset-0 bg-gradient-to-t from-ink/80 via-transparent to-transparent" />
                    <span className="absolute right-3 top-3 rounded-full bg-gold px-3 py-1 text-[11px] font-black text-ink shadow">
                      {c.category}
                    </span>
                    <div className="absolute bottom-3 right-4 left-4 flex items-center justify-between text-white">
                      <span className="rounded-full bg-white/20 px-3 py-1 text-[11px] font-bold backdrop-blur-sm">
                        {c.duration}
                      </span>
                      <span className="rounded-full bg-white/20 px-3 py-1 text-[11px] font-bold backdrop-blur-sm">
                        {c.students}
                      </span>
                    </div>
                  </div>
                  <div className="p-5">
                    <h3 className="text-lg font-black text-ink transition-colors group-hover:text-vtc-red">
                      {c.title}
                    </h3>
                    <p className="mt-2 line-clamp-2 text-[13.5px] leading-7 text-ink-soft/70">{c.short}</p>
                    <div className="mt-4 flex items-center justify-between border-t border-sand-dark pt-3">
                      <span className="text-[12px] font-bold text-ink-soft/60">{c.level}</span>
                      <span className="flex items-center gap-1 text-[13px] font-black text-vtc-red">
                        التفاصيل والتسجيل <ArrowLeft size={15} />
                      </span>
                    </div>
                  </div>
                </article>
              ))}
          </div>
        </div>
      </section>

      {/* ===== الثقافة الأردنية ===== */}
      <section className="relative overflow-hidden py-20">
        <div className="mx-auto max-w-7xl px-4">
          <div className="reveal mx-auto max-w-2xl text-center">
            <span className="rounded-full bg-jordan-green/10 px-4 py-1.5 text-[13px] font-black text-jordan-green">
              الأردن… إربد… الرمثا
            </span>
            <h2 className="mt-4 text-3xl font-black text-ink sm:text-4xl">
              من رحم <span className="text-jordan-green">الحضارة</span> نصنع{" "}
              <span className="text-vtc-red">المهارة</span>
            </h2>
            <p className="mt-3 leading-8 text-ink-soft/70">
              يقع معهدنا في مدينة الرمثا بسفل سهول حوران الخصبة، على مقربة من جامعة العلوم
              والتكنولوجيا، وفي محافظة إربد عروس الشمال الغنية بآثارها وجامعاتها وكرم أهلها.
              اضغط على أي صورة لعرضها.
            </p>
          </div>

          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {gallery.map((g, i) => (
              <figure
                key={i}
                onClick={() => setLightbox(i)}
                className={`reveal gold-frame group relative h-64 cursor-zoom-in overflow-hidden rounded-3xl shadow-xl`}
                style={{ transitionDelay: `${(i % 3) * 0.12}s` }}
              >
                <img
                  src={g.image}
                  alt={g.title}
                  loading="lazy"
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-ink/90 via-ink/20 to-transparent" />
                <figcaption className="absolute bottom-0 right-0 left-0 p-5">
                  <h3 className="text-lg font-black text-white">{g.title}</h3>
                  <p className="text-[12.5px] font-bold text-gold-light">{g.subtitle}</p>
                </figcaption>
                <div className="absolute left-4 top-4 flex h-10 w-10 items-center justify-center rounded-full bg-white/20 text-white opacity-0 backdrop-blur-sm transition-all group-hover:opacity-100">
                  <Plus size={18} />
                </div>
              </figure>
            ))}
          </div>

          {/* بطاقات الرمثا وإربد */}
          <div className="mt-8 grid gap-4 md:grid-cols-3">
            {[
              { icon: <MapPin size={22} />, t: "مدينة الرمثا", d: "مدينة التجارة والزراعة على سهول حوران، تشتهر بأسواقها وكرم أهلها وقربها من الحدود الشمالية.", c: "from-vtc-red to-vtc-red-dark" },
              { icon: <Landmark size={22} />, t: "محافظة إربد", d: "عروس الشمال ومدينة الجامعات: اليرموك والعلوم والتكنولوجيا، وآثار طبقة فحل وأم قيس.", c: "from-jordan-green to-emerald-900" },
              { icon: <Star size={22} />, t: "الثقافة الحورانية", d: "الدبكة والمهاهاة والمنسف والقهوة العربية… تراث أصيل نفخر به ونحتفي به في فعاليات المعهد.", c: "from-gold-dark to-yellow-700" },
            ].map((b, i) => (
              <div
                key={i}
                className={`reveal delay-${i} group relative overflow-hidden rounded-3xl bg-gradient-to-l ${b.c} p-[1.5px] shadow-xl`}
              >
                <div className="h-full rounded-3xl bg-white p-6 transition-colors group-hover:bg-transparent">
                  <div className={`flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-l ${b.c} text-white shadow-lg`}>
                    {b.icon}
                  </div>
                  <h3 className="mt-3 text-lg font-black text-ink group-hover:text-white">{b.t}</h3>
                  <p className="mt-2 text-[13.5px] leading-7 text-ink-soft/70 group-hover:text-white/85">{b.d}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* عارض الصور */}
        {lightbox !== null && (
          <div
            className="fade-in fixed inset-0 z-[70] flex items-center justify-center bg-ink/90 p-4 backdrop-blur-sm"
            onClick={() => setLightbox(null)}
          >
            <div className="modal-enter relative max-w-4xl overflow-hidden rounded-3xl shadow-2xl" onClick={(e) => e.stopPropagation()}>
              <img src={gallery[lightbox].image} alt={gallery[lightbox].title} className="max-h-[75vh] w-full object-cover" />
              <div className="absolute bottom-0 right-0 left-0 bg-gradient-to-t from-ink to-transparent p-6 pt-14">
                <h3 className="text-xl font-black text-white">{gallery[lightbox].title}</h3>
                <p className="text-sm font-bold text-gold-light">{gallery[lightbox].subtitle}</p>
              </div>
              <button
                onClick={() => setLightbox((lightbox + gallery.length - 1) % gallery.length)}
                className="absolute right-4 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-white/20 text-white backdrop-blur transition hover:bg-vtc-red"
              >
                <ChevronRight size={20} />
              </button>
              <button
                onClick={() => setLightbox((lightbox + 1) % gallery.length)}
                className="absolute left-4 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-white/20 text-white backdrop-blur transition hover:bg-vtc-red"
              >
                <ChevronLeft size={20} />
              </button>
            </div>
          </div>
        )}
      </section>

      {/* ===== آراء الخريجين ===== */}
      <section className="relative overflow-hidden bg-white py-20">
        <div className="zellige-pattern absolute inset-0 opacity-40" />
        <div className="relative mx-auto max-w-4xl px-4 text-center">
          <div className="reveal">
            <span className="rounded-full bg-vtc-red-light px-4 py-1.5 text-[13px] font-black text-vtc-red">
              قصص نجاح
            </span>
            <h2 className="mt-4 text-3xl font-black text-ink sm:text-4xl">ماذا يقول خريجونا؟</h2>
          </div>
          <div className="reveal relative mt-10 overflow-hidden rounded-[2rem] bg-ink p-8 shadow-2xl sm:p-12">
            <div className="dot-grid absolute inset-0 opacity-30" />
            <Quote size={56} className="absolute right-8 top-6 text-gold/30" />
            <div key={slide} className="page-enter relative">
              <div className="flex justify-center gap-1 text-gold">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={18} fill="currentColor" />
                ))}
              </div>
              <p className="mx-auto mt-5 max-w-2xl text-lg leading-10 text-white sm:text-xl">
                "{testimonials[slide].text}"
              </p>
              <div className="mt-6">
                <div className="text-lg font-black text-gold-light">{testimonials[slide].name}</div>
                <div className="text-[13px] font-bold text-white/60">{testimonials[slide].role}</div>
              </div>
            </div>
            <div className="relative mt-8 flex items-center justify-center gap-3">
              <button
                onClick={() => setSlide((slide + testimonials.length - 1) % testimonials.length)}
                className="flex h-11 w-11 items-center justify-center rounded-full bg-white/10 text-white transition hover:bg-vtc-red"
              >
                <ChevronRight size={18} />
              </button>
              <div className="flex gap-2">
                {testimonials.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setSlide(i)}
                    className={`h-2.5 rounded-full transition-all ${i === slide ? "w-8 bg-gold" : "w-2.5 bg-white/25 hover:bg-white/50"}`}
                  />
                ))}
              </div>
              <button
                onClick={() => setSlide((slide + 1) % testimonials.length)}
                className="flex h-11 w-11 items-center justify-center rounded-full bg-white/10 text-white transition hover:bg-vtc-red"
              >
                <ChevronLeft size={18} />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ===== الأسئلة الشائعة ===== */}
      <section className="py-20">
        <div className="mx-auto grid max-w-7xl gap-10 px-4 lg:grid-cols-[.9fr_1.1fr]">
          <div className="reveal-right">
            <span className="rounded-full bg-gold/20 px-4 py-1.5 text-[13px] font-black text-gold-dark">
              الأسئلة الشائعة
            </span>
            <h2 className="mt-4 text-3xl font-black text-ink sm:text-4xl">
              كل ما تريد معرفته عن المعهد
            </h2>
            <p className="mt-3 leading-8 text-ink-soft/70">
              جمعنا لكم أكثر الأسئلة تكراراً حول القبول والرسوم والشهادات. لم تجد إجابتك؟
              تواصل معنا مباشرة وسيسعد المرشدون المهنيون بخدمتك.
            </p>
            <div className="mt-6 space-y-3">
              {[
                { icon: <Phone size={18} />, t: "الرقم الساخن", d: "027395351" },
                { icon: <MapPin size={18} />, t: "العنوان", d: "الرمثا — محافظة إربد — الأردن" },
                { icon: <Clock size={18} />, t: "الدوام الرسمي", d: "الأحد – الخميس: 8 صباحاً – 3 مساءً" },
              ].map((c, i) => (
                <div key={i} className="flex items-center gap-3 rounded-2xl bg-white p-4 shadow-lg ring-1 ring-sand-dark">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-vtc-red text-white">
                    {c.icon}
                  </div>
                  <div>
                    <div className="text-[12px] font-bold text-ink-soft/60">{c.t}</div>
                    <div className="font-black text-ink" dir="auto">{c.d}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="reveal-left space-y-3">
            {faqs.map((f, i) => (
              <div
                key={i}
                className={`overflow-hidden rounded-2xl bg-white shadow-lg ring-1 transition-all ${
                  faqOpen === i ? "ring-vtc-red" : "ring-sand-dark"
                }`}
              >
                <button
                  onClick={() => setFaqOpen(faqOpen === i ? null : i)}
                  className="flex w-full items-center justify-between gap-3 p-5 text-right"
                >
                  <span className="text-[15px] font-black text-ink">{f.q}</span>
                  <span
                    className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full transition-all ${
                      faqOpen === i ? "rotate-180 bg-vtc-red text-white" : "bg-sand-dark text-ink"
                    }`}
                  >
                    {faqOpen === i ? <Minus size={16} /> : <Plus size={16} />}
                  </span>
                </button>
                <div
                  className={`transition-all duration-500 ${
                    faqOpen === i ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
                  }`}
                >
                  <p className="border-t border-sand-dark p-5 pt-4 text-[14px] leading-8 text-ink-soft/80">
                    {f.a}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== دعوة للتسجيل ===== */}
      <section className="relative overflow-hidden bg-gradient-to-l from-vtc-red-dark via-vtc-red to-vtc-red-dark py-16">
        <div className="geometric-band absolute inset-0" />
        <div className="animate-spin-slow absolute -left-20 -top-20 h-64 w-64 rounded-full border-2 border-dashed border-white/25" />
        <div className="relative mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-6 px-4">
          <div className="reveal-right">
            <h2 className="font-ruqaa text-3xl text-white sm:text-4xl">
              مقعدك المهني بانتظارك… ابدأ رحلتك اليوم!
            </h2>
            <p className="mt-2 font-bold text-white/85">
              التسجيل مفتوح الآن للدور التدريبي 2026 – 2027 — المقاعد محدودة في كل تخصص
            </p>
          </div>
          <button
            onClick={() => onNavigate("register")}
            className="reveal-left group flex items-center gap-2 rounded-2xl bg-white px-10 py-4 text-lg font-black text-vtc-red shadow-2xl transition-all hover:-translate-y-1 hover:shadow-black/30"
          >
            سجّل الآن مجاناً
            <ChevronLeft size={20} className="transition-transform group-hover:-translate-x-1" />
          </button>
        </div>
      </section>
    </div>
  );
}
