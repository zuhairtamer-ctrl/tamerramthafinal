import { useMemo, useState } from "react";
import {
  Search,
  ChevronLeft,
  X,
  Clock,
  BarChart3,
  Users,
  Timer,
  CheckCircle2,
  Briefcase,
  ClipboardList,
  Sparkles,
  GraduationCap,
} from "lucide-react";
import { courses, categories, type Course } from "../data/content";
import { useReveal } from "../hooks/useReveal";
import type { Page } from "./Navbar";

export default function CoursesPage({ onNavigate }: { onNavigate: (p: Page, courseId?: string) => void }) {
  const [cat, setCat] = useState("الكل");
  const [q, setQ] = useState("");
  const [selected, setSelected] = useState<Course | null>(null);
  useReveal(`${cat}|${q}`);

  const filtered = useMemo(
    () =>
      courses.filter(
        (c) =>
          (cat === "الكل" || c.category === cat) &&
          (q.trim() === "" || c.title.includes(q.trim()) || c.short.includes(q.trim()))
      ),
    [cat, q]
  );

  return (
    <div className="page-enter">
      {/* رأس الصفحة */}
      <section className="relative overflow-hidden bg-ink py-16">
        <div className="absolute inset-0 opacity-25">
          <img
            src={`${import.meta.env.BASE_URL}images/site/courses-bg.jpg`}
            alt="مشاغل التدريب"
            className="h-full w-full object-cover"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-l from-ink via-ink/90 to-ink/60" />
        <div className="dot-grid absolute inset-0 opacity-30" />
        <div className="relative mx-auto max-w-7xl px-4">
          <div className="flex items-center gap-2 text-[13px] font-bold text-gold-light">
            الرئيسية <ChevronLeft size={14} /> الدورات التدريبية
          </div>
          <h1 className="font-ruqaa mt-3 text-4xl text-white sm:text-5xl">
            الدورات والتخصصات التدريبية
          </h1>
          <p className="mt-3 max-w-2xl leading-8 text-white/75">
            اكثر من 12 تخصصاً مهنياً مطلوباً في سوق العمل — اختر تخصصك واطّلع على التفاصيل
            ثم سجّل مباشرة. جميع البرامج تشمل تدريباً عملياً مكثفاً وشهادة معتمدة.
          </p>

          {/* البحث */}
          <div className="relative mt-6 max-w-xl">
            <Search size={20} className="absolute right-4 top-1/2 -translate-y-1/2 text-ink-soft/50" />
            <input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="ابحث عن تخصص… (مثال: كهرباء، تجميل، طهي)"
              className="w-full rounded-2xl border-2 border-transparent bg-white py-4 pl-4 pr-12 text-[15px] font-bold text-ink shadow-xl outline-none transition-all placeholder:font-bold placeholder:text-ink-soft/40 focus:border-gold"
            />
          </div>
        </div>
      </section>

      {/* التصنيفات */}
      <section className="sticky top-[68px] z-30 border-b border-sand-dark bg-sand/95 py-3 backdrop-blur-md">
        <div className="no-scrollbar mx-auto flex max-w-7xl gap-2 overflow-x-auto px-4">
          {categories.map((c) => (
            <button
              key={c}
              onClick={() => setCat(c)}
              className={`shrink-0 rounded-full px-5 py-2.5 text-[13.5px] font-black transition-all ${
                cat === c
                  ? "bg-vtc-red text-white shadow-lg shadow-red-600/25"
                  : "bg-white text-ink-soft ring-1 ring-sand-dark hover:ring-vtc-red/40"
              }`}
            >
              {c}
            </button>
          ))}
        </div>
      </section>

      {/* البطاقات */}
      <section className="mx-auto max-w-7xl px-4 py-12">
        <div className="mb-6 flex items-center justify-between">
          <p className="font-black text-ink">
            عرض <span className="text-vtc-red">{filtered.length}</span> من أصل {courses.length} تخصصاً
          </p>
          {q && (
            <button onClick={() => setQ("")} className="flex items-center gap-1 text-[13px] font-bold text-vtc-red">
              <X size={15} /> مسح البحث
            </button>
          )}
        </div>

        {filtered.length === 0 ? (
          <div className="rounded-3xl bg-white p-14 text-center shadow-xl">
            <GraduationCap size={56} className="mx-auto text-sand-dark" />
            <h3 className="mt-4 text-xl font-black text-ink">لا توجد نتائج مطابقة</h3>
            <p className="mt-2 text-ink-soft/60">جرّب كلمة بحث مختلفة أو تصفح جميع التخصصات</p>
            <button
              onClick={() => { setQ(""); setCat("الكل"); }}
              className="mt-5 rounded-full bg-vtc-red px-6 py-2.5 font-black text-white"
            >
              عرض الكل
            </button>
          </div>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {filtered.map((c, i) => (
              <article
                key={c.id}
                className="reveal course-card group cursor-pointer overflow-hidden rounded-3xl bg-white shadow-xl ring-1 ring-sand-dark"
                style={{ transitionDelay: `${(i % 6) * 0.08}s` }}
                onClick={() => setSelected(c)}
              >
                <div className="relative h-52 overflow-hidden">
                  <img src={c.image} alt={c.title} loading="lazy" className="h-full w-full object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-ink/85 via-ink/10 to-transparent" />
                  <span className="absolute right-3 top-3 flex items-center gap-1 rounded-full bg-gold px-3 py-1 text-[11px] font-black text-ink shadow">
                    {c.featured && <Sparkles size={11} />} {c.category}
                  </span>
                  <h3 className="absolute bottom-3 right-4 left-4 text-lg font-black leading-snug text-white">
                    {c.title}
                  </h3>
                </div>
                <div className="p-5">
                  <p className="line-clamp-2 min-h-[3.5rem] text-[13.5px] leading-7 text-ink-soft/70">{c.short}</p>
                  <div className="mt-3 grid grid-cols-3 gap-2 text-center">
                    {[
                      { icon: <Clock size={14} />, v: c.duration },
                      { icon: <BarChart3 size={14} />, v: c.level.split(" /")[0] },
                      { icon: <Users size={14} />, v: c.students.split(" ")[0] },
                    ].map((b, j) => (
                      <div key={j} className="flex items-center justify-center gap-1 rounded-xl bg-sand px-1 py-2 text-[11px] font-black text-ink-soft">
                        <span className="text-vtc-red">{b.icon}</span> {b.v}
                      </div>
                    ))}
                  </div>
                  <div className="mt-4 flex gap-2">
                    <button
                      onClick={(e) => { e.stopPropagation(); setSelected(c); }}
                      className="flex-1 rounded-xl border-2 border-ink/10 py-2.5 text-[13.5px] font-black text-ink transition-all hover:border-ink"
                    >
                      التفاصيل
                    </button>
                    <button
                      onClick={(e) => { e.stopPropagation(); onNavigate("register", c.id); }}
                      className="flex flex-1 items-center justify-center gap-1.5 rounded-xl bg-vtc-red py-2.5 text-[13.5px] font-black text-white shadow-lg transition-all hover:bg-vtc-red-dark"
                    >
                      <ClipboardList size={15} /> سجّل الآن
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}
      </section>

      {/* نافذة التفاصيل */}
      {selected && (
        <div
          className="fade-in fixed inset-0 z-[70] overflow-y-auto bg-ink/85 p-4 backdrop-blur-sm"
          onClick={() => setSelected(null)}
        >
          <div
            className="modal-enter relative mx-auto my-8 max-w-3xl overflow-hidden rounded-[2rem] bg-white shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative h-64 sm:h-72">
              <img src={selected.image} alt={selected.title} className="h-full w-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-ink/90 via-ink/20 to-transparent" />
              <button
                onClick={() => setSelected(null)}
                className="absolute left-4 top-4 flex h-10 w-10 items-center justify-center rounded-full bg-ink/60 text-white backdrop-blur transition hover:bg-vtc-red"
              >
                <X size={18} />
              </button>
              <div className="absolute bottom-4 right-6 left-6">
                <span className="rounded-full bg-gold px-3 py-1 text-[11px] font-black text-ink">
                  {selected.category}
                </span>
                <h2 className="mt-2 text-2xl font-black text-white sm:text-3xl">{selected.title}</h2>
              </div>
            </div>

            <div className="p-6 sm:p-8">
              <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
                {[
                  { icon: <Clock size={18} />, t: "المدة", v: selected.duration },
                  { icon: <Timer size={18} />, t: "الساعات", v: selected.hours },
                  { icon: <BarChart3 size={18} />, t: "المستوى", v: selected.level },
                  { icon: <Users size={18} />, t: "الفئة", v: selected.students },
                ].map((b, i) => (
                  <div key={i} className="rounded-2xl bg-sand p-3 text-center ring-1 ring-sand-dark">
                    <div className="mx-auto flex h-9 w-9 items-center justify-center rounded-full bg-vtc-red-light text-vtc-red">
                      {b.icon}
                    </div>
                    <div className="mt-1.5 text-[11px] font-bold text-ink-soft/60">{b.t}</div>
                    <div className="text-[13px] font-black text-ink">{b.v}</div>
                  </div>
                ))}
              </div>

              <h3 className="mt-6 text-lg font-black text-ink">عن البرنامج</h3>
              <p className="mt-2 text-[14.5px] leading-8 text-ink-soft/85">{selected.description}</p>

              <h3 className="mt-6 text-lg font-black text-ink">المهارات المكتسبة</h3>
              <div className="mt-3 grid gap-2 sm:grid-cols-2">
                {selected.skills.map((s, i) => (
                  <div key={i} className="flex items-center gap-2 rounded-xl bg-jordan-green/5 px-4 py-2.5 text-[13.5px] font-bold text-ink-soft ring-1 ring-jordan-green/15">
                    <CheckCircle2 size={16} className="shrink-0 text-jordan-green" /> {s}
                  </div>
                ))}
              </div>

              <h3 className="mt-6 flex items-center gap-2 text-lg font-black text-ink">
                <Briefcase size={18} className="text-vtc-red" /> الفرص الوظيفية
              </h3>
              <div className="mt-3 flex flex-wrap gap-2">
                {selected.jobs.map((j, i) => (
                  <span key={i} className="rounded-full bg-ink px-4 py-2 text-[12.5px] font-black text-gold-light">
                    {j}
                  </span>
                ))}
              </div>

              <button
                onClick={() => { setSelected(null); onNavigate("register", selected.id); }}
                className="mt-7 flex w-full items-center justify-center gap-2 rounded-2xl bg-vtc-red py-4 text-lg font-black text-white shadow-xl transition-all hover:-translate-y-0.5 hover:bg-vtc-red-dark"
              >
                <ClipboardList size={20} /> سجّل في هذا التخصص الآن
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
