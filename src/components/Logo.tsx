interface LogoProps {
  variant?: "full" | "compact";
  dark?: boolean;
}

/** شعار مؤسسة التدريب المهني — إعادة رسم دقيقة للشعار الرسمي */
export default function Logo({ variant = "full", dark = false }: LogoProps) {
  if (variant === "compact") {
    return (
      <div className="flex items-center gap-3">
        {/* الرمز الأحمر */}
        <div className="relative flex h-12 w-12 shrink-0 items-center justify-center overflow-hidden rounded-lg bg-[#d61f26] shadow-lg shadow-red-900/20">
          <svg viewBox="0 0 40 40" className="h-10 w-10" fill="none">
            <ellipse cx="26" cy="9" rx="9" ry="4.6" fill="#fff" />
            <path
              d="M4 16 C 14 15, 24 16, 34 21 C 26 20, 18 21, 12 24 C 20 26, 25 30, 24 38 L 14 38 C 15 32, 11 28, 4 27 C 10 24, 8 20, 4 16 Z"
              fill="#fff"
            />
          </svg>
        </div>
        <div className="leading-tight">
          <div className={`text-lg font-black ${dark ? "text-white" : "text-ink"}`}>
            مؤسسة التدريب المهني
          </div>
          <div className="text-[11px] font-bold tracking-wide text-[#c9a227]">
            معهد تدريب مهني الرمثا — إربد
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-wrap items-center justify-center gap-x-5 gap-y-3" dir="ltr">
      {/* 50 years */}
      <div className="relative select-none text-center leading-none">
        <div
          className="font-black tracking-tighter"
          style={{
            fontSize: "3.4rem",
            background: "linear-gradient(180deg,#e8c96a 0%,#c9a227 35%,#8f6f14 60%,#e8c96a 100%)",
            WebkitBackgroundClip: "text",
            backgroundClip: "text",
            color: "transparent",
            filter: "drop-shadow(0 2px 2px rgba(143,111,20,.35))",
          }}
        >
          50
        </div>
        <div className="mt-0.5 text-[10px] font-bold tracking-[.35em] text-[#8f6f14]">YEARS</div>
      </div>

      {/* الرمز الأحمر */}
      <div className="relative flex h-[74px] w-[74px] items-center justify-center overflow-hidden rounded-md bg-[#d61f26] shadow-xl shadow-red-900/25">
        <svg viewBox="0 0 40 40" className="h-[62px] w-[62px]" fill="none">
          <ellipse cx="26" cy="9" rx="9" ry="4.6" fill="#fff" />
          <path
            d="M4 16 C 14 15, 24 16, 34 21 C 26 20, 18 21, 12 24 C 20 26, 25 30, 24 38 L 14 38 C 15 32, 11 28, 4 27 C 10 24, 8 20, 4 16 Z"
            fill="#fff"
          />
        </svg>
      </div>

      {/* النص */}
      <div className="text-right leading-tight" dir="rtl">
        <div className={`text-[26px] font-black leading-[1.15] ${dark ? "text-white" : "text-[#232323]"}`}>
          مؤسسة
          <br />
          التدريب
          <br />
          المهني
        </div>
      </div>

      {/* السطر السفلي */}
      <div className="w-full text-center">
        <div
          className={`text-[11px] font-bold tracking-[.18em] ${dark ? "text-white/90" : "text-[#232323]"}`}
        >
          VOCATIONAL TRAINING CORPORATION
        </div>
        <div className="mx-auto mt-1.5 flex w-fit items-center gap-2 rounded-full bg-[#d61f26] px-4 py-1 text-[13px] font-extrabold text-white shadow-lg shadow-red-900/20">
          <span className="inline-block h-2 w-2 animate-pulse rounded-full bg-[#f3e5b8]" />
          معهد تدريب مهني الرمثا — محافظة إربد
        </div>
      </div>
    </div>
  );
}
