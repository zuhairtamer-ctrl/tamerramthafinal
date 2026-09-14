import { useEffect, useState } from "react";
import {
  Sparkles,
  GraduationCap,
  ClipboardList,
  MapPin,
  ChevronLeft,
  Award,
  Users,
  Wrench,
} from "lucide-react";
import Logo from "./Logo";
import type { Page } from "./Navbar";

const slides = [
  {
    image:
      `${import.meta.env.BASE_URL}images/site/hero-training.jpg`,
    tag: "التدريب العملي",
    title: "مهنتك… مستقبلك",
    text: "مشاغل مجهزة بأحدث التقنيات وتدريب عملي مكثف بإشراف نخبة المدربين",
  },
  {
    image:
      `${import.meta.env.BASE_URL}images/site/jerash.jpg`,
    tag: "إربد — عروس الشمال",
    title: "في قلب الحضارة",
    text: "معهد الرمثا يخدم أبناء الشمال وسط عبق التاريخ والحضارة الأردنية العريقة",
  },
  {
    image:
      `${import.meta.env.BASE_URL}images/site/hero-workshop.jpg`,
    tag: "تخصصات المستقبل",
    title: "واكب سوق العمل",
    text: "الطاقة الشمسية، تقنية المعلومات، صيانة المركبات وأكثر من 12 تخصصاً مطلوباً",
  },
];

export default function Hero({ onNavigate }: { onNavigate: (p: Page) => void }) {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const t = setInterval(() => setCurrent((c) => (c + 1) % slides.length), 6000);
    return () => clearInterval(t);
  }, []);

  return (
    <section className="relative overflow-hidden bg-ink">
      {/* خلفية الشرائح */}
      {slides.map((s, i) => (
        <div
          key={i}
          className={`absolute inset-0 transition-opacity duration-[1500ms] ${
            i === current ? "opacity-100" : "opacity-0"
          }`}
        >
          <img
            src={s.image}
            alt={s.title}
            className={`h-full w-full object-cover ${i === current ? "animate-kenburns" : ""}`}
          />
        </div>
      ))}
      <div className="absolute inset-0 bg-gradient-to-l from-ink via-ink/85 to-ink/40" />
      <div className="absolute inset-0 bg-gradient-to-t from-ink via-transparent to-ink/60" />
      <div className="dot-grid absolute inset-0 opacity-40" />

      {/* زخارف دوارة */}
      <div className="animate-spin-slower absolute -left-24 top-16 h-72 w-72 rounded-full border-[3px] border-dashed border-gold/30" />
      <div className="animate-spin-slow absolute -right-10 bottom-24 h-44 w-44 rounded-full border-[3px] border-dashed border-white/15" />

      <div className="relative mx-auto grid max-w-7xl gap-10 px-4 pb-20 pt-14 lg:grid-cols-[1.15fr_.85fr] lg:items-center lg:pt-20">
        {/* النص الترحيبي */}
        <div className="page-enter">
          <div className="mb-5 inline-flex flex-wrap items-center gap-2 rounded-full border border-gold/50 bg-white/10 px-4 py-2 text-[13px] font-bold text-gold-light backdrop-blur-sm">
            <Sparkles size={15} className="text-gold" />
            أهلاً وسهلاً بكم في معهد تدريب مهني الرمثا
            <span className="rounded-full bg-gold px-2.5 py-0.5 text-[11px] font-black text-ink">
              اليوبيل الذهبي 50 عاماً
            </span>
          </div>

          <h1 className="font-ruqaa text-4xl leading-[1.6] text-white sm:text-5xl lg:text-[3.4rem]">
            حيّاكم الله في <span className="text-shimmer font-bold">صرح المهنة</span>
            <br />
            وعنوان التميّز في الشمال
          </h1>

          <p className="mt-5 max-w-2xl text-[16px] leading-9 text-white/85 sm:text-lg">
            <b className="text-gold-light">رسالة ترحيبية من إدارة المعهد:</b> يسرّ أسرة معهد تدريب
            مهني الرمثا — أحد صروح مؤسسة التدريب المهني في محافظة إربد — أن ترحّب بأبنائنا
            الطلبة وأولياء الأمور الكرام، وندعوكم للانضمام إلى مسيرة خمسين عاماً من العطاء،
            حيث نصنع المهارة ونبني المستقبل بأيدي أردنية ماهرة.
          </p>

          <div className="mt-6 flex items-center gap-2 text-[14px] font-bold text-white/75">
            <MapPin size={16} className="text-vtc-red" />
            مدينة الرمثا — محافظة إربد — المملكة الأردنية الهاشمية
          </div>

          <div className="mt-8 flex flex-wrap gap-3">
            <button
              onClick={() => onNavigate("register")}
              className="group flex items-center gap-2 rounded-2xl bg-vtc-red px-8 py-4 text-lg font-black text-white shadow-2xl shadow-red-900/40 transition-all hover:-translate-y-1 hover:bg-vtc-red-dark"
            >
              <ClipboardList size={20} />
              سجّل في الدورات الآن
              <ChevronLeft size={18} className="transition-transform group-hover:-translate-x-1" />
            </button>
            <button
              onClick={() => onNavigate("courses")}
              className="flex items-center gap-2 rounded-2xl border-2 border-white/30 bg-white/10 px-8 py-4 text-lg font-black text-white backdrop-blur-sm transition-all hover:-translate-y-1 hover:border-gold hover:bg-gold/20"
            >
              <GraduationCap size={20} />
              استكشف الدورات
            </button>
          </div>

          {/* مؤشرات الشرائح */}
          <div className="mt-8 flex items-center gap-3">
            {slides.map((s, i) => (
              <button
                key={i}
                onClick={() => setCurrent(i)}
                className={`group flex items-center gap-2 rounded-full px-4 py-2 text-[12px] font-bold backdrop-blur-sm transition-all ${
                  i === current ? "bg-gold text-ink" : "bg-white/10 text-white/70 hover:bg-white/20"
                }`}
              >
                <span className={`h-1.5 w-1.5 rounded-full ${i === current ? "bg-ink" : "bg-gold"}`} />
                {s.tag}
              </button>
            ))}
          </div>
        </div>

        {/* بطاقة الشعار */}
        <div className="page-enter relative" style={{ animationDelay: ".2s" }}>
          <div className="animate-float relative overflow-hidden rounded-[2rem] border border-white/20 bg-white/95 p-8 shadow-2xl backdrop-blur-md">
            <div className="zellige-pattern absolute inset-0 opacity-60" />
            <div className="relative">
              <Logo variant="full" />
              <div className="mx-auto mt-5 grid max-w-sm grid-cols-3 gap-2 text-center">
                {[
                  { icon: <Award size={18} />, n: "50+", t: "عام خبرة" },
                  { icon: <Users size={18} />, n: "آلاف", t: "الخريجين" },
                  { icon: <Wrench size={18} />, n: "12+", t: "تخصصاً" },
                ].map((b, i) => (
                  <div
                    key={i}
                    className="rounded-xl bg-ink p-3 text-white shadow-lg transition-transform hover:-translate-y-1"
                  >
                    <div className="mx-auto mb-1 flex h-8 w-8 items-center justify-center rounded-full bg-gold/20 text-gold">
                      {b.icon}
                    </div>
                    <div className="text-lg font-black text-gold-light">{b.n}</div>
                    <div className="text-[11px] font-bold text-white/70">{b.t}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          {/* شارة عائمة */}
          <div className="animate-float-slow absolute -bottom-5 -right-3 rotate-[-4deg] rounded-2xl bg-vtc-red px-5 py-3 text-white shadow-2xl">
            <div className="text-[12px] font-bold text-white/80">الدور التدريبي</div>
            <div className="text-lg font-black">2026 – 2027 مفتوح الآن</div>
          </div>
        </div>
      </div>

      {/* شريط متحرك */}
      <div className="relative border-t border-white/10 bg-vtc-red py-3">
        <div className="flex overflow-hidden" dir="ltr">
          <div className="animate-marquee-ltr flex w-max shrink-0 items-center whitespace-nowrap text-[15px] font-extrabold text-white">
            {[0, 1].map((k) => (
              <div key={k} className="flex items-center gap-10 px-5">
                <span>★ التسجيل الإلكتروني متاح الآن لجميع التخصصات</span>
                <span>★ رسوم رمزية وبرامج مدعومة</span>
                <span>★ شهادات معتمدة رسمياً</span>
                <span>★ تدريب عملي في مشاغل مجهزة</span>
                <span>★ إرشاد وظيفي ودعم المشاريع الصغيرة</span>
                <span>★ 50 عاماً من الريادة منذ 1976</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
