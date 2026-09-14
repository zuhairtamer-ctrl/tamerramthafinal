import {
  Eye,
  Target,
  History,
  UserCheck,
  MapPin,
  Building2,
  ClipboardList,
  CheckCircle2,
  ChevronLeft,
  GraduationCap,
  Factory,
  HeartPulse,
  Users,
  Leaf,
  Printer,
} from "lucide-react";
import Logo from "./Logo";
import { timeline } from "../data/content";
import { useReveal } from "../hooks/useReveal";
import type { Page } from "./Navbar";

const missions = [
  "توفير فرص التدريب المهني لإعداد القوى العاملة الفنية ورفع كفاءتها في مختلف التخصصات والمستويات.",
  "تنويع التدريب المهني: التلمذة المهنية، تدريب العاملين، التدريب المكثف والسريع، والسلامة والصحة المهنية.",
  "تقديم خدمات الإرشاد والدعم الفني لإنشاء وتطوير المؤسسات الصغيرة والمتوسطة.",
  "تنظيم العمل المهني في سوق العمل الأردني عبر اختبارات تحديد المستوى المهني.",
  "تدريب المدربين والمشرفين وتطوير المنظومة التدريبية بالشراكة مع القطاع الخاص.",
];

const programs = [
  { icon: <GraduationCap size={24} />, t: "برامج الإعداد المهني", d: "إعداد المتدربين في المستويات الأساسية: مهني، ماهر، محدد المهارات، وبرامج الدبلوم التقني." },
  { icon: <Factory size={24} />, t: "برامج رفع الكفاءة", d: "للعمال الممارسين في سوق العمل لرفع كفاءتهم والانتقال من مستوى مهني إلى أعلى." },
  { icon: <Users size={24} />, t: "التدريب المستمر وخدمة المجتمع", d: "برامج قصيرة للمجتمع المحلي تناسب الجميع دون اشتراط مستوى مهني." },
  { icon: <HeartPulse size={24} />, t: "السلامة والصحة المهنية", d: "تدريب العاملين في القطاعين العام والخاص للحد من حوادث مواقع العمل." },
  { icon: <UserCheck size={24} />, t: "تدريب المدربين والمشرفين", d: "برامج إعداد المدربين وتأهيل المشرفين في النواحي المسلكية والإدارية." },
  { icon: <Leaf size={24} />, t: "دعم المشاريع الصغيرة", d: "مساندة الخريجين في إنشاء وتطوير مشاريعهم الصغيرة والمتوسطة." },
];

const families = [
  "ميكانيك وكهرباء المركبات", "تشكيل المعادن واللحام", "الكهرباء والقوى", "التكييف والتبريد",
  "التمديدات الصحية", "تقنية المعلومات", "الإلكترونيات", "الحلاقة والتجميل",
  "الصناعات النسيجية والجلدية", "الصناعات الغذائية", "السياحة والفندقة", "النجارة والديكور",
  "الرعاية الصحية", "المهن المطبعية", "المهن الزراعية", "الحرف اليدوية", "الطاقة المتجددة",
];

export default function AboutPage({ onNavigate }: { onNavigate: (p: Page) => void }) {
  useReveal();

  return (
    <div className="page-enter">
      {/* رأس الصفحة */}
      <section className="relative overflow-hidden bg-ink py-16">
        <div className="absolute inset-0 opacity-25">
          <img
            src={`${import.meta.env.BASE_URL}images/site/roman-street.jpg`}
            alt="آثار جرش"
            className="h-full w-full object-cover"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-l from-ink via-ink/90 to-ink/60" />
        <div className="dot-grid absolute inset-0 opacity-30" />
        <div className="relative mx-auto max-w-7xl px-4">
          <div className="flex items-center gap-2 text-[13px] font-bold text-gold-light">
            الرئيسية <ChevronLeft size={14} /> عن المعهد
          </div>
          <h1 className="font-ruqaa mt-3 text-4xl text-white sm:text-5xl">
            عن معهد تدريب مهني الرمثا
          </h1>
          <p className="mt-3 max-w-2xl leading-8 text-white/75">
            أحد معاهد مؤسسة التدريب المهني في إقليم الشمال — نخدم أبناء الرمثا وإربد
            والشمال منذ عقود ببرامج تدريبية معتمدة وتخصصات مواكبة لسوق العمل.
          </p>
        </div>
      </section>

      {/* الشعار + النبذة */}
      <section className="mx-auto max-w-7xl px-4 py-14">
        <div className="grid items-center gap-8 lg:grid-cols-[.9fr_1.1fr]">
          <div className="reveal-right relative overflow-hidden rounded-[2rem] bg-white p-8 shadow-2xl ring-1 ring-sand-dark">
            <div className="zellige-pattern absolute inset-0 opacity-50" />
            <div className="relative">
              <Logo variant="full" />
            </div>
          </div>
          <div className="reveal-left">
            <span className="rounded-full bg-vtc-red-light px-4 py-1.5 text-[13px] font-black text-vtc-red">
              نبذة عن المؤسسة
            </span>
            <h2 className="mt-4 text-3xl font-black leading-snug text-ink">
              مؤسسة التدريب المهني… خمسون عاماً من الريادة منذ 1976
            </h2>
            <div className="mt-4 space-y-4 text-[15px] leading-9 text-ink-soft/85">
              <p>
                مؤسسة التدريب المهني مؤسسة حكومية أردنية رائدة، أُنشئت بموجب القانون المؤقت
                عام <b>1976</b> وباشرت عملها عام <b>1977</b>، لتكون الحاضنة الأولى للتدريب
                المهني في المملكة، وتعمل بتوجيهات ملكية سامية وبمتابعة حثيثة لإعداد الشباب
                لتلبية احتياجات سوق العمل.
              </p>
              <p>
                تقدم المؤسسة خدماتها لجميع المواطنين بغض النظر عن مستواهم التعليمي من مبدأ
                <b> التعليم المستمر مدى الحياة</b>، عبر أكثر من <b>33 معهداً ومركزاً</b> موزعة
                على أقاليم المملكة الثلاثة، تنفذ <b>250 برنامجاً تدريبياً</b> ضمن{" "}
                <b>49 تخصصاً</b> موزعة على <b>17 عائلة مهنية</b> من خلال مئات المشاغل المجهزة.
              </p>
              <p>
                ويُعد <b>معهد تدريب مهني الرمثا</b> في محافظة إربد أحد هذه الصروح، يقدم
                برامج تدريبية متنوعة لأبناء لواء الرمثا والمناطق المجاورة، بإدارة السيدة{" "}
                <b>كفاية السرحان</b> مديرة المعهد، وضمن إقليم الشمال بمتابعة حثيثة من الإدارة
                العامة للمؤسسة ووزارة العمل.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* الرؤية والرسالة */}
      <section className="bg-white py-16">
        <div className="mx-auto grid max-w-7xl gap-6 px-4 md:grid-cols-2">
          <div className="reveal-right group relative overflow-hidden rounded-[2rem] bg-gradient-to-bl from-vtc-red to-vtc-red-dark p-8 text-white shadow-2xl">
            <div className="geometric-band absolute inset-0" />
            <Eye size={120} className="absolute -left-6 -bottom-6 text-white/10 transition-transform group-hover:scale-110" />
            <div className="relative flex h-14 w-14 items-center justify-center rounded-2xl bg-white/20 backdrop-blur">
              <Eye size={28} />
            </div>
            <h3 className="relative mt-4 text-2xl font-black">رؤيتنا</h3>
            <p className="font-ruqaa relative mt-3 text-2xl leading-relaxed text-gold-light">
              "الريادة والتميز في تقديم خدمات التدريب والتطوير المهني"
            </p>
          </div>
          <div className="reveal-left group relative overflow-hidden rounded-[2rem] bg-ink p-8 text-white shadow-2xl">
            <div className="dot-grid absolute inset-0 opacity-30" />
            <Target size={120} className="absolute -left-6 -bottom-6 text-gold/10 transition-transform group-hover:scale-110" />
            <div className="relative flex h-14 w-14 items-center justify-center rounded-2xl bg-gold/25 text-gold backdrop-blur">
              <Target size={28} />
            </div>
            <h3 className="relative mt-4 text-2xl font-black">رسالتنا</h3>
            <p className="relative mt-3 leading-8 text-white/85">
              تقديم خدمات التدريب والتطوير المهني وفق احتياجات سوق العمل والمجتمع، بالشراكة
              مع القطاع الخاص ومؤسسات المجتمع المدني، من خلال إعداد وتنفيذ برامج التدريب
              المهني، وتنظيم ممارسة المهن، والدعم الفني للمؤسسات الصغيرة والمتوسطة.
            </p>
          </div>
        </div>

        {/* المهام */}
        <div className="mx-auto mt-10 max-w-7xl px-4">
          <h3 className="reveal text-center text-2xl font-black text-ink">مهام وواجبات المؤسسة</h3>
          <div className="mt-6 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {missions.map((m, i) => (
              <div
                key={i}
                className={`reveal flex items-start gap-3 rounded-2xl bg-sand p-5 ring-1 ring-sand-dark transition-all hover:-translate-y-1 hover:bg-vtc-red-light hover:ring-vtc-red/30`}
              >
                <CheckCircle2 size={22} className="mt-0.5 shrink-0 text-jordan-green" />
                <p className="text-[14px] leading-8 font-bold text-ink-soft">{m}</p>
              </div>
            ))}
            <div className="reveal flex items-center justify-center rounded-2xl bg-ink p-5 text-center">
              <p className="font-ruqaa text-xl leading-relaxed text-gold-light">
                "نُعدّ القوى العاملة الأردنية المؤهلة… ونبني مستقبل الوطن"
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* البرامج التدريبية */}
      <section className="py-16">
        <div className="mx-auto max-w-7xl px-4">
          <div className="reveal mx-auto max-w-2xl text-center">
            <span className="rounded-full bg-jordan-green/10 px-4 py-1.5 text-[13px] font-black text-jordan-green">
              منظومة التدريب
            </span>
            <h2 className="mt-4 text-3xl font-black text-ink">البرامج التدريبية في المؤسسة</h2>
          </div>
          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {programs.map((p, i) => (
              <div
                key={i}
                className="reveal group rounded-3xl bg-white p-6 shadow-xl ring-1 ring-sand-dark transition-all hover:-translate-y-2 hover:shadow-2xl"
              >
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-l from-vtc-red to-vtc-red-dark text-white shadow-lg transition-transform group-hover:rotate-6 group-hover:scale-110">
                  {p.icon}
                </div>
                <h3 className="mt-4 text-lg font-black text-ink">{p.t}</h3>
                <p className="mt-2 text-[13.5px] leading-7 text-ink-soft/70">{p.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* الخط الزمني */}
      <section className="relative overflow-hidden bg-ink py-16">
        <div className="dot-grid absolute inset-0 opacity-25" />
        <div className="relative mx-auto max-w-5xl px-4">
          <div className="reveal text-center">
            <span className="rounded-full bg-gold/20 px-4 py-1.5 text-[13px] font-black text-gold-light">
              <History size={14} className="ml-1 inline" /> مسيرة نصف قرن
            </span>
            <h2 className="mt-4 text-3xl font-black text-white">محطات في تاريخ المؤسسة</h2>
          </div>
          <div className="relative mt-12">
            <div className="absolute bottom-0 right-[19px] top-0 w-1 rounded-full bg-gradient-to-b from-vtc-red via-gold to-jordan-green sm:right-1/2 sm:translate-x-1/2" />
            <div className="space-y-8">
              {timeline.map((t, i) => (
                <div
                  key={i}
                  className={`reveal relative pr-12 sm:w-1/2 sm:pr-0 ${
                    i % 2 === 0 ? "sm:ml-auto sm:pl-10" : "sm:mr-auto sm:pr-10 sm:pl-0"
                  }`}
                >
                  <div
                    className={`absolute right-0 top-1 z-10 flex h-10 w-10 items-center justify-center rounded-full border-4 border-ink text-[11px] font-black shadow-xl ${
                      i % 2 === 0
                        ? "bg-vtc-red text-white sm:right-auto sm:-left-5"
                        : "bg-gold text-ink sm:-right-5"
                    }`}
                  >
                    {t.year.slice(2)}
                  </div>
                  <div className="w-full rounded-2xl bg-white/5 p-5 ring-1 ring-white/10 backdrop-blur-sm transition-all hover:bg-white/10 hover:ring-gold/40">
                    <div className="font-black text-2xl text-gold">{t.year}</div>
                    <div className="mt-1 font-black text-white">{t.title}</div>
                    <p className="mt-2 text-[13.5px] leading-7 text-white/70">{t.text}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* العائلات المهنية */}
      <section className="bg-white py-16">
        <div className="mx-auto max-w-7xl px-4">
          <div className="reveal mx-auto max-w-2xl text-center">
            <span className="rounded-full bg-vtc-red-light px-4 py-1.5 text-[13px] font-black text-vtc-red">
              <Printer size={14} className="ml-1 inline" /> 17 عائلة مهنية
            </span>
            <h2 className="mt-4 text-3xl font-black text-ink">المجالات التدريبية في المؤسسة</h2>
            <p className="mt-3 leading-8 text-ink-soft/70">
              تقدم مؤسسة التدريب المهني التدريب في 17 عائلة مهنية تشمل عشرات التخصصات،
              ويقدم معهد الرمثا نخبة منها بما يناسب احتياجات سوق العمل في الشمال.
            </p>
          </div>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            {families.map((f, i) => (
              <span
                key={i}
                className="reveal cursor-default rounded-full bg-sand px-5 py-2.5 text-[13.5px] font-extrabold text-ink-soft ring-1 ring-sand-dark transition-all hover:-translate-y-1 hover:bg-vtc-red hover:text-white hover:shadow-lg"
              >
                {f}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* معلومات المعهد */}
      <section className="py-16">
        <div className="mx-auto grid max-w-7xl gap-6 px-4 lg:grid-cols-3">
          <div className="reveal-right overflow-hidden rounded-[2rem] bg-gradient-to-b from-vtc-red to-vtc-red-dark p-8 text-white shadow-2xl">
            <Building2 size={40} />
            <h3 className="mt-4 text-2xl font-black">معهد تدريب مهني الرمثا</h3>
            <ul className="mt-5 space-y-4 text-[14px] font-bold">
              <li className="flex items-start gap-2">
                <UserCheck size={18} className="mt-1 shrink-0 text-gold-light" />
                مديرة المعهد: السيدة كفاية السرحان
              </li>
              <li className="flex items-start gap-2">
                <MapPin size={18} className="mt-1 shrink-0 text-gold-light" />
                لواء الرمثا — محافظة إربد — إقليم الشمال
              </li>
              <li className="flex items-start gap-2">
                <GraduationCap size={18} className="mt-1 shrink-0 text-gold-light" />
                7 برامج تدريبية وأكثر — ذكور وإناث
              </li>
            </ul>
            <button
              onClick={() => onNavigate("register")}
              className="mt-6 flex w-full items-center justify-center gap-2 rounded-2xl bg-white py-3.5 font-black text-vtc-red shadow-xl transition-all hover:-translate-y-1"
            >
              <ClipboardList size={18} /> سجّل الآن
            </button>
          </div>
          <div className="reveal overflow-hidden rounded-[2rem] shadow-2xl lg:col-span-2">
            <img
              src={`${import.meta.env.BASE_URL}images/site/about-workshop.jpg`}
              alt="التدريب العملي في المشاغل"
              className="h-64 w-full object-cover sm:h-72"
            />
            <div className="bg-white p-8">
              <h3 className="text-2xl font-black text-ink">مدينة الرمثا… بوابة الشمال</h3>
              <p className="mt-3 text-[15px] leading-9 text-ink-soft/80">
                تقع مدينة الرمثا في أقصى شمال المملكة ضمن محافظة إربد، على سهول حوران
                الخصبة، وتشتهر بتجارتها النشطة وأسواقها الشعبية وزراعتها، وبأهلها الكرام
                المشهورين بالكرم والنخوة. ويجاورها صرحان علميان كبيران: جامعة العلوم
                والتكنولوجيا الأردنية وجامعة اليرموك، ما يجعل المنطقة بيئة خصبة للعلم
                والتدريب والعمل. ويستقبل المعهد أبناء الرمثا والقرى والبلدات المجاورة
                كالطرة والشجرة وعمراوة والذنيبة وبشرى وحوارة وغيرها.
              </p>
              <div className="mt-5 flex flex-wrap gap-2">
                {["الرمثا", "الطرة", "الشجرة", "عمراوة", "الذنيبة", "بشرى", "حوارة", "المغير", "جابر"].map((v) => (
                  <span key={v} className="rounded-full bg-sand px-4 py-1.5 text-[12.5px] font-black text-ink-soft ring-1 ring-sand-dark">
                    {v}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
