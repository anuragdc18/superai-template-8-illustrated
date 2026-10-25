/** Hand-drawn decorations for the illustrated, friendly look. */

export function Sun({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 120 120" className={className} aria-hidden>
      <g className="sun-rays" style={{ transformOrigin: "60px 60px" }}>
        {Array.from({ length: 12 }).map((_, i) => (
          <rect key={i} x="57" y="4" width="6" height="18" rx="3" fill="#ffc83d" transform={`rotate(${i * 30} 60 60)`} opacity="0.9" />
        ))}
      </g>
      <circle cx="60" cy="60" r="27" fill="#ffc83d" />
      <circle cx="60" cy="60" r="27" fill="url(#sunGlow)" />
      <defs>
        <radialGradient id="sunGlow" cx="0.35" cy="0.35" r="0.8">
          <stop offset="0" stopColor="#fff3c4" stopOpacity="0.9" />
          <stop offset="1" stopColor="#ffb21e" stopOpacity="0" />
        </radialGradient>
      </defs>
    </svg>
  );
}

export function Cloud({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 120 60" className={className} aria-hidden>
      <path
        d="M24 50h70a18 18 0 0 0 1-36 26 26 0 0 0-49-4A20 20 0 0 0 24 50Z"
        fill="#ffffff"
        stroke="#bfe3e6"
        strokeWidth="3"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/** Curly hand-drawn arrow. */
export function Squiggle({ className = "", flip = false }: { className?: string; flip?: boolean }) {
  return (
    <svg viewBox="0 0 90 60" className={className} style={flip ? { transform: "scaleX(-1)" } : undefined} aria-hidden>
      <path d="M6 10c22 2 34 12 30 24-3 9-15 6-11-3 6-13 30-10 46 14" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
      <path d="M64 38l8 8 2-11" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function Sparkle({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden>
      <path d="M12 1c.8 5.4 2.6 7.2 8 8-5.4.8-7.2 2.6-8 8-.8-5.4-2.6-7.2-8-8 5.4-.8 7.2-2.6 8-8Z" fill="currentColor" />
    </svg>
  );
}

/** Gentle wavy divider between sections. */
export function Wave({ className = "", fill = "#fff6e9" }: { className?: string; fill?: string }) {
  return (
    <svg viewBox="0 0 1440 60" preserveAspectRatio="none" className={className} aria-hidden>
      <path d="M0 30c120 22 240 22 360 0s240-22 360 0 240 22 360 0 240-22 360 0v30H0Z" fill={fill} />
    </svg>
  );
}

/** Handwritten note, e.g. "Learn · Grow · Succeed". */
export function HandNote({ lines, className = "" }: { lines: string[]; className?: string }) {
  return (
    <p className={`font-hand text-[26px] font-bold leading-[1.05] text-leaf ${className}`}>
      {lines.map((l) => (
        <span key={l} className="block">
          {l}
        </span>
      ))}
    </p>
  );
}

/** Section label + title used across the site. */
export function SectionTitle({
  label,
  title,
  text,
  center = true,
  light = false,
}: {
  label?: string;
  title: string;
  text?: string;
  center?: boolean;
  light?: boolean;
}) {
  return (
    <div className={`mb-10 ${center ? "mx-auto max-w-2xl text-center" : "max-w-2xl"}`}>
      {label && (
        <p className={`mb-3 inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-[13px] font-extrabold uppercase tracking-[0.12em] ${light ? "bg-white/15 text-sun" : "bg-peach text-brand"}`}>
          <Sparkle className="h-3.5 w-3.5" /> {label}
        </p>
      )}
      <h2 className={`text-[32px] font-black leading-tight sm:text-[42px] ${light ? "!text-white" : ""}`}>{title}</h2>
      {text && <p className={`mt-3 text-[17px] ${light ? "text-white/80" : ""}`}>{text}</p>}
    </div>
  );
}
