import { useEffect, useState } from "react";
import {
  ChevronLeft,
  User,
  IdCard,
  Phone,
  PhoneCall,
  CalendarDays,
  GraduationCap,
  Sun,
  FileText,
  CheckCircle2,
  AlertCircle,
  Printer,
  RotateCcw,
  ShieldCheck,
  ClipboardList,
  VenusAndMars,
  BookOpenCheck,
} from "lucide-react";
import Logo from "./Logo";
import { courses } from "../data/content";
import { useReveal } from "../hooks/useReveal";
import type { Page } from "./Navbar";

interface FormState {
  name: string;
  nationalId: string;
  phone1: string;
  phone2: string;
  birth: string;
  gender: string;
  qualification: string;
  courseId: string;
  period: string;
  notes: string;
  agree: boolean;
}

const initial: FormState = {
  name: "",
  nationalId: "",
  phone1: "",
  phone2: "",
  birth: "",
  gender: "",
  qualification: "",
  courseId: "",
  period: "صباحي",
  notes: "",
  agree: false,
};

const inputCls =
  "w-full rounded-2xl border-2 border-sand-dark bg-white py-3.5 pl-4 pr-12 text-[15px] font-bold text-ink outline-none transition-all placeholder:font-bold placeholder:text-ink-soft/35 focus:border-vtc-red focus:ring-4 focus:ring-vtc-red/10";

function FormField({
  icon,
  label,
  error,
  children,
  required,
}: {
  icon: React.ReactNode;
  label: string;
  error?: string;
  children: React.ReactNode;
  required?: boolean;
}) {
  return (
    <div>
      <label className="mb-1.5 flex items-center gap-1.5 text-[14px] font-black text-ink">
        <span className="text-vtc-red">{icon}</span> {label}
        {required && <span className="text-vtc-red">*</span>}
      </label>
      <div className="relative">{children}</div>
      {error && (
        <p className="mt-1.5 flex items-center gap-1 text-[12.5px] font-bold text-vtc-red">
          <AlertCircle size={14} /> {error}
        </p>
      )}
    </div>
  );
}

export default function RegisterPage({
  onNavigate,
  preselected,
}: {
  onNavigate: (p: Page) => void;
  preselected?: string;
}) {
  useReveal();
  const [form, setForm] = useState<FormState>(initial);
  const [errors, setErrors] = useState<Partial<Record<keyof FormState, string>>>({});
  const [done, setDone] = useState(false);
  const [refNo, setRefNo] = useState("");
  const [sending, setSending] = useState(false);
  const [submitError, setSubmitError] = useState("");

  useEffect(() => {
    if (preselected) setForm((f) => ({ ...f, courseId: preselected }));
  }, [preselected]);

  const set = (v: string | boolean, k: keyof FormState) => {
    setForm((f) => ({ ...f, [k]: v }));
    setErrors((e) => ({ ...e, [k]: undefined }));
  };

  const validate = (): boolean => {
    const e: Partial<Record<keyof FormState, string>> = {};
    if (form.name.trim().split(/\s+/).length < 3)
      e.name = "يرجى إدخال الاسم الرباعي كاملاً (3 مقاطع على الأقل)";
    if (!/^\d{10}$/.test(form.nationalId.trim()))
      e.nationalId = "الرقم الوطني يجب أن يتكون من 10 أرقام بالضبط";
    if (!/^07\d{8}$/.test(form.phone1.trim()))
      e.phone1 = "رقم الهاتف الأول يجب أن يبدأ بـ 07 ويتكون من 10 أرقام";
    if (!/^07\d{8}$/.test(form.phone2.trim()))
      e.phone2 = "رقم الهاتف الثاني يجب أن يبدأ بـ 07 ويتكون من 10 أرقام";
    if (form.phone1.trim() !== "" && form.phone1.trim() === form.phone2.trim())
      e.phone2 = "رقم الهاتف الثاني يجب أن يكون مختلفاً عن الأول";
    if (!form.birth) e.birth = "يرجى إدخال تاريخ الميلاد";
    if (!form.gender) e.gender = "يرجى اختيار الجنس";
    if (!form.qualification) e.qualification = "يرجى اختيار المؤهل العلمي";
    if (!form.courseId) e.courseId = "يرجى اختيار الدورة التدريبية";
    if (!form.agree) e.agree = "يجب الموافقة على صحة البيانات لاستكمال التسجيل";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const submit = async (ev: React.FormEvent) => {
    ev.preventDefault();
    if (!validate()) {
      document.getElementById("register-form")?.scrollIntoView({ behavior: "smooth", block: "start" });
      return;
    }
    const ref = `VTC-RAM-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`;
    setRefNo(ref);
    setSending(true);
    setSubmitError("");
    const courseName = courses.find((c) => c.id === form.courseId)?.title || "—";
    const payload = {
      ...form,
      courseName,
      refNo: ref,
      _subject: `طلب تسجيل جديد - ${ref}`,
      _template: "table",
      _captcha: "false",
    };
    try {
      const prev = JSON.parse(localStorage.getItem("vtc-ramtha-apps") || "[]");
      prev.push({ ...payload, date: new Date().toISOString() });
      localStorage.setItem("vtc-ramtha-apps", JSON.stringify(prev));
    } catch {
      /* ignore */
    }
    try {
      const response = await fetch("https://formsubmit.co/ajax/vtcalramtha@gmail.com", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify(payload),
      });
      if (!response.ok) throw new Error("email delivery failed");
      setDone(true);
      window.scrollTo({ top: 0, behavior: "smooth" });
    } catch {
      setSubmitError("تعذر إرسال الطلب حالياً. تم حفظ بياناتك محلياً، يرجى المحاولة مرة أخرى أو التواصل مع المعهد على الرقم 027395351.");
    } finally {
      setSending(false);
    }
  };

  const courseName = courses.find((c) => c.id === form.courseId)?.title || "—";

  /* ===== شاشة النجاح ===== */
  if (done) {
    return (
      <div className="page-enter mx-auto max-w-3xl px-4 py-14">
        <div className="overflow-hidden rounded-[2rem] bg-white shadow-2xl ring-1 ring-sand-dark">
          <div className="relative bg-gradient-to-l from-jordan-green to-emerald-800 p-8 text-center text-white">
            <div className="dot-grid absolute inset-0 opacity-30" />
            <div className="relative mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-white shadow-xl">
              <CheckCircle2 size={44} className="text-jordan-green" />
            </div>
            <h2 className="font-ruqaa relative mt-4 text-3xl">تم استلام طلبك بنجاح!</h2>
            <p className="relative mt-1 font-bold text-white/85">
              أهلاً بك في أسرة معهد تدريب مهني الرمثا — سيتواصل معك المرشد المهني قريباً
            </p>
          </div>
          <div className="p-6 sm:p-8">
            <div className="mb-5 flex justify-center">
              <Logo variant="compact" />
            </div>
            <div className="rounded-2xl border-2 border-dashed border-gold bg-gold/5 p-5 text-center">
              <div className="text-[13px] font-bold text-ink-soft/60">رقم الطلب المرجعي</div>
              <div className="mt-1 text-2xl font-black tracking-wider text-vtc-red" dir="ltr">{refNo}</div>
              <div className="mt-1 text-[12px] font-bold text-ink-soft/60">
                احتفظ بهذا الرقم لمتابعة طلبك لدى إدارة المعهد
              </div>
            </div>
            <div className="mt-5 grid gap-3 sm:grid-cols-2">
              {[
                ["اسم الطالب", form.name],
                ["الرقم الوطني", form.nationalId],
                ["رقم الهاتف الأول", form.phone1],
                ["رقم الهاتف الثاني", form.phone2],
                ["الدورة المطلوبة", courseName],
                ["الفترة", form.period],
              ].map(([k, v], i) => (
                <div key={i} className="rounded-xl bg-sand px-4 py-3 ring-1 ring-sand-dark">
                  <div className="text-[11.5px] font-bold text-ink-soft/55">{k}</div>
                  <div className="font-black text-ink" dir="auto">{v}</div>
                </div>
              ))}
            </div>
            <div className="mt-6 rounded-2xl bg-vtc-red-light p-4 text-[13.5px] font-bold leading-8 text-vtc-red-dark">
              الخطوات التالية: مراجعة المعهد في الرمثا — محافظة إربد مصطحباً الهوية الشخصية
              وصورة عن المؤهل العلمي، أو انتظر اتصال المرشد المهني على الرقم الأول المسجل.
              للاستفسار: 027395351
            </div>
            <div className="mt-6 flex flex-wrap gap-3">
              <button
                onClick={() => window.print()}
                className="flex flex-1 items-center justify-center gap-2 rounded-2xl bg-ink py-3.5 font-black text-white transition-all hover:-translate-y-0.5"
              >
                <Printer size={18} /> طباعة الإيصال
              </button>
              <button
                onClick={() => { setForm(initial); setDone(false); }}
                className="flex flex-1 items-center justify-center gap-2 rounded-2xl border-2 border-sand-dark py-3.5 font-black text-ink transition-all hover:border-vtc-red hover:text-vtc-red"
              >
                <RotateCcw size={18} /> تسجيل طالب آخر
              </button>
              <button
                onClick={() => onNavigate("courses")}
                className="flex flex-1 items-center justify-center gap-2 rounded-2xl bg-vtc-red py-3.5 font-black text-white shadow-xl transition-all hover:-translate-y-0.5 hover:bg-vtc-red-dark"
              >
                تصفح الدورات <ChevronLeft size={18} />
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  /* ===== نموذج التسجيل ===== */
  return (
    <div className="page-enter">
      <section className="relative overflow-hidden bg-ink py-16">
        <div className="absolute inset-0 opacity-20">
          <img
            src={`${import.meta.env.BASE_URL}images/site/registration-bg.jpg`}
            alt="التسجيل"
            className="h-full w-full object-cover"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-l from-ink via-ink/90 to-ink/60" />
        <div className="dot-grid absolute inset-0 opacity-30" />
        <div className="relative mx-auto flex max-w-7xl flex-col gap-8 px-4 lg:flex-row-reverse lg:items-center lg:justify-between">
          <div className="lg:w-[48%]">
            <div className="flex items-center gap-2 text-[13px] font-bold text-gold-light">
              الرئيسية <ChevronLeft size={14} /> تسجيل طالب جديد
            </div>
            <h1 className="font-ruqaa mt-3 text-4xl text-white sm:text-5xl">
              استمارة التسجيل في الدورات
            </h1>
            <p className="mt-3 max-w-2xl leading-8 text-white/75">
              املأ البيانات التالية بدقة — الحقول المميزة بـ <span className="text-vtc-red font-black">*</span> مطلوبة.
              بعد الإرسال ستحصل على رقم مرجعي لمتابعة طلبك.
            </p>
          </div>
          <div className="relative overflow-hidden rounded-3xl bg-[#fff000] shadow-2xl ring-4 ring-white/10 lg:w-[48%]">
            <video
              controls
              preload="metadata"
              playsInline
              className="aspect-video h-full w-full object-cover"
              aria-label="فيديو إرشادات التسجيل"
            >
              <source src={`${import.meta.env.BASE_URL}videos/registration-guide.mp4`} type="video/mp4" />
              متصفحك لا يدعم تشغيل الفيديو.
            </video>
          </div>
        </div>
      </section>

      <section id="register-form" className="mx-auto max-w-7xl scroll-mt-32 px-4 py-12">
        <div className="grid gap-8 lg:grid-cols-[1fr_.65fr]">
          {/* النموذج */}
          <form onSubmit={submit} noValidate className="reveal-right rounded-[2rem] bg-white p-6 shadow-2xl ring-1 ring-sand-dark sm:p-9">
            <div className="mb-7 flex items-center gap-3 border-b-2 border-dashed border-sand-dark pb-5">
              <div className="flex h-13 w-13 items-center justify-center rounded-2xl bg-vtc-red p-3 text-white shadow-lg">
                <ClipboardList size={24} />
              </div>
              <div>
                <h2 className="text-xl font-black text-ink">بيانات الطالب</h2>
                <p className="text-[13px] font-bold text-ink-soft/55">الدور التدريبي 2026 – 2027</p>
              </div>
            </div>

            <div className="grid gap-5 sm:grid-cols-2">
              <div className="sm:col-span-2">
                <FormField icon={<User size={18} />} label="اسم الطالب الرباعي" error={errors.name} required>
                  <User size={18} className="absolute right-4 top-1/2 -translate-y-1/2 text-ink-soft/35" />
                  <input
                    value={form.name}
                    onChange={(e) => set(e.target.value.replace(/[0-9]/g, ""), "name")}
                    placeholder="مثال: محمد عبدالله أحمد الزعبي"
                    className={inputCls}
                  />
                </FormField>
              </div>

              <FormField icon={<IdCard size={18} />} label="الرقم الوطني" error={errors.nationalId} required>
                <IdCard size={18} className="absolute right-4 top-1/2 -translate-y-1/2 text-ink-soft/35" />
                <input
                  value={form.nationalId}
                  onChange={(e) => set(e.target.value.replace(/\D/g, "").slice(0, 10), "nationalId")}
                  placeholder="10 أرقام"
                  inputMode="numeric"
                  dir="ltr"
                  className={`${inputCls} text-left tracking-widest`}
                />
              </FormField>

              <FormField icon={<CalendarDays size={18} />} label="تاريخ الميلاد" error={errors.birth} required>
                <CalendarDays size={18} className="absolute right-4 top-1/2 -translate-y-1/2 text-ink-soft/35" />
                <input
                  type="date"
                  value={form.birth}
                  max={new Date().toISOString().split("T")[0]}
                  onChange={(e) => set(e.target.value, "birth")}
                  className={inputCls}
                />
              </FormField>

              <FormField icon={<Phone size={18} />} label="رقم الهاتف الأول" error={errors.phone1} required>
                <Phone size={18} className="absolute right-4 top-1/2 -translate-y-1/2 text-ink-soft/35" />
                <input
                  value={form.phone1}
                  onChange={(e) => set(e.target.value.replace(/\D/g, "").slice(0, 10), "phone1")}
                  placeholder="07XXXXXXXX"
                  inputMode="numeric"
                  dir="ltr"
                  className={`${inputCls} text-left tracking-widest`}
                />
              </FormField>

              <FormField icon={<PhoneCall size={18} />} label="رقم الهاتف الثاني" error={errors.phone2} required>
                <PhoneCall size={18} className="absolute right-4 top-1/2 -translate-y-1/2 text-ink-soft/35" />
                <input
                  value={form.phone2}
                  onChange={(e) => set(e.target.value.replace(/\D/g, "").slice(0, 10), "phone2")}
                  placeholder="07XXXXXXXX (رقم بديل)"
                  inputMode="numeric"
                  dir="ltr"
                  className={`${inputCls} text-left tracking-widest`}
                />
              </FormField>

              <FormField icon={<VenusAndMars size={18} />} label="الجنس" error={errors.gender} required>
                <div className="grid grid-cols-2 gap-2">
                  {["ذكر", "أنثى"].map((g) => (
                    <button
                      type="button"
                      key={g}
                      onClick={() => set(g, "gender")}
                      className={`rounded-2xl border-2 py-3 font-black transition-all ${
                        form.gender === g
                          ? "border-vtc-red bg-vtc-red-light text-vtc-red"
                          : "border-sand-dark bg-white text-ink-soft/60 hover:border-ink/20"
                      }`}
                    >
                      {g}
                    </button>
                  ))}
                </div>
              </FormField>

              <FormField icon={<BookOpenCheck size={18} />} label="المؤهل العلمي" error={errors.qualification} required>
                <BookOpenCheck size={18} className="absolute right-4 top-1/2 -translate-y-1/2 text-ink-soft/35" />
                <select value={form.qualification} onChange={(e) => set(e.target.value, "qualification")} className={`${inputCls} appearance-none`}>
                  <option value="">— اختر المؤهل —</option>
                  <option>عاشر فما دون</option>
                  <option>أول ثانوي / توجيهي (غير ناجح)</option>
                  <option>ثانوية عامة (ناجح)</option>
                  <option>دبلوم كليات مجتمع</option>
                  <option>بكالوريوس فأعلى</option>
                </select>
              </FormField>

              <div className="sm:col-span-2">
                <FormField icon={<GraduationCap size={18} />} label="الدورة التدريبية المطلوبة" error={errors.courseId} required>
                  <GraduationCap size={18} className="absolute right-4 top-1/2 -translate-y-1/2 text-ink-soft/35" />
                  <select value={form.courseId} onChange={(e) => set(e.target.value, "courseId")} className={`${inputCls} appearance-none`}>
                    <option value="">— اختر التخصص —</option>
                    {courses.map((c) => (
                      <option key={c.id} value={c.id}>{c.title} — {c.duration}</option>
                    ))}
                  </select>
                </FormField>
              </div>

              <FormField icon={<Sun size={18} />} label="الفترة المفضلة">
                <div className="grid grid-cols-2 gap-2">
                  {["صباحي", "مسائي"].map((p) => (
                    <button
                      type="button"
                      key={p}
                      onClick={() => set(p, "period")}
                      className={`rounded-2xl border-2 py-3 font-black transition-all ${
                        form.period === p
                          ? "border-gold-dark bg-gold/15 text-gold-dark"
                          : "border-sand-dark bg-white text-ink-soft/60 hover:border-ink/20"
                      }`}
                    >
                      {p}
                    </button>
                  ))}
                </div>
              </FormField>

              <FormField icon={<FileText size={18} />} label="ملاحظات إضافية">
                <textarea
                  value={form.notes}
                  onChange={(e) => set(e.target.value, "notes")}
                  placeholder="أي معلومات تريد إضافتها (اختياري)"
                  rows={1}
                  className={`${inputCls} resize-none !pr-12`}
                />
              </FormField>
            </div>

            <label className="mt-6 flex cursor-pointer items-start gap-3 rounded-2xl bg-sand p-4 ring-1 ring-sand-dark">
              <input
                type="checkbox"
                checked={form.agree}
                onChange={(e) => set(e.target.checked, "agree")}
                className="mt-1 h-5 w-5 shrink-0 accent-[#d61f26]"
              />
              <span className="text-[13.5px] font-bold leading-7 text-ink-soft">
                أقرّ بأن جميع البيانات المدخلة صحيحة، وأوافق على التواصل معي عبر أرقام الهواتف
                المسجلة بخصوص القبول والتسجيل في معهد تدريب مهني الرمثا.
              </span>
            </label>
            {errors.agree && (
              <p className="mt-2 flex items-center gap-1 text-[12.5px] font-bold text-vtc-red">
                <AlertCircle size={14} /> {errors.agree}
              </p>
            )}

            <button
              type="submit"
              disabled={sending}
              className="group mt-6 flex w-full items-center justify-center gap-2 rounded-2xl bg-gradient-to-l from-vtc-red to-vtc-red-dark py-4.5 text-lg font-black text-white shadow-2xl shadow-red-600/25 transition-all hover:-translate-y-0.5 hover:shadow-red-600/40 disabled:cursor-wait disabled:opacity-60"
              style={{ paddingTop: "1rem", paddingBottom: "1rem" }}
            >
              <CheckCircle2 size={22} />
              {sending ? "جارٍ إرسال الطلب..." : "إرسال طلب التسجيل"}
              <ChevronLeft size={20} className="transition-transform group-hover:-translate-x-1" />
            </button>
            {submitError && <p className="mt-3 rounded-xl bg-vtc-red-light p-3 text-center text-[13px] font-bold leading-7 text-vtc-red-dark">{submitError}</p>}
            <p className="mt-3 flex items-center justify-center gap-1.5 text-[12.5px] font-bold text-ink-soft/50">
              <ShieldCheck size={14} /> بياناتك محمية وتُستخدم لأغراض التسجيل فقط
            </p>
          </form>

          {/* الشريط الجانبي */}
          <aside className="space-y-5">
            <div className="reveal-left overflow-hidden rounded-[2rem] bg-ink p-7 text-white shadow-2xl">
              <div className="dot-grid absolute inset-0 opacity-20" />
              <div className="relative">
                <Logo variant="compact" dark />
                <h3 className="mt-5 text-xl font-black text-gold-light">شروط القبول</h3>
                <ul className="mt-4 space-y-3">
                  {[
                    "أردني الجنسية أو حاصل على تصريح معتمد",
                    "العمر 16 سنة فأكثر لمعظم البرامج",
                    "الصف العاشر فأعلى (الثانوية لبعض التخصصات)",
                    "اجتياز المقابلة والفحص الطبي البسيط",
                    "الالتزام بأنظمة المعهد والدوام الرسمي",
                  ].map((s, i) => (
                    <li key={i} className="flex items-start gap-2 text-[13.5px] font-bold leading-7 text-white/85">
                      <CheckCircle2 size={17} className="mt-1 shrink-0 text-jordan-green" /> {s}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="reveal-left overflow-hidden rounded-[2rem] bg-gradient-to-b from-vtc-red to-vtc-red-dark p-7 text-white shadow-2xl">
              <h3 className="text-xl font-black">الأوراق المطلوبة عند المراجعة</h3>
              <ul className="mt-4 space-y-3">
                {[
                  "صورة عن الهوية الشخصية أو دفتر العائلة",
                  "صورة عن آخر مؤهل علمي (مصدقة)",
                  "صورتان شخصيتان حديثتان",
                  "رقم الطلب المرجعي من هذا التسجيل",
                ].map((s, i) => (
                  <li key={i} className="flex items-start gap-2 text-[13.5px] font-bold leading-7 text-white/90">
                    <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-white/25 text-[12px] font-black">{i + 1}</span>
                    {s}
                  </li>
                ))}
              </ul>
            </div>

            <div className="reveal-left rounded-[2rem] bg-white p-7 shadow-xl ring-1 ring-sand-dark">
              <h3 className="text-lg font-black text-ink">تحتاج مساعدة في التسجيل؟</h3>
              <p className="mt-2 text-[13.5px] leading-7 text-ink-soft/70">
                المرشدون المهنيون في المعهد جاهزون لمساعدتك، أو تواصل عبر القنوات الرسمية:
              </p>
              <div className="mt-4 space-y-2 text-[14px] font-black">
                <div className="flex items-center justify-between rounded-xl bg-sand px-4 py-3">
                  <span className="text-ink-soft/60">الرقم الساخن</span>
                  <span className="text-vtc-red" dir="ltr">027395351</span>
                </div>
                <div className="flex items-center justify-between rounded-xl bg-sand px-4 py-3">
                  <span className="text-ink-soft/60">المنصة الرسمية</span>
                  <a href="https://ereg.vtc.gov.jo" target="_blank" rel="noreferrer" className="text-[12.5px] text-jordan-green underline-offset-4 hover:underline" dir="ltr">ereg.vtc.gov.jo</a>
                </div>
              </div>
              <button
                onClick={() => onNavigate("about")}
                className="mt-4 w-full rounded-2xl border-2 border-ink/10 py-3 font-black text-ink transition-all hover:border-ink"
              >
                تعرّف على المعهد أكثر
              </button>
            </div>
          </aside>
        </div>
      </section>
    </div>
  );
}
