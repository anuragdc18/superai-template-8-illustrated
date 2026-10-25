import { Link } from "wouter";
import { ChevronRight } from "lucide-react";
import { Cloud, Sun, Wave } from "./doodles";

/** Friendly cream page header with an illustration frame on the right. */
export function PageHero({
  crumbs,
  title,
  text,
  image,
  children,
}: {
  crumbs: { label: string; to?: string }[];
  title: string;
  text: string;
  image: string;
  children?: React.ReactNode;
}) {
  return (
    <section className="relative isolate overflow-hidden bg-gradient-to-b from-[#fff3e2] to-cream">
      <div className="dots-bg pointer-events-none absolute inset-0 -z-10 opacity-50 [mask-image:linear-gradient(to_bottom,black,transparent_85%)]" />
      <Cloud className="pointer-events-none absolute left-[46%] top-8 -z-10 hidden w-24 opacity-80 lg:block" />
      <div className="container-x grid items-center gap-10 pb-20 pt-10 sm:pt-12 lg:grid-cols-[1.15fr_0.85fr] [&>*]:min-w-0">
        <div>
          <nav className="flex flex-wrap items-center gap-1.5 text-[13.5px] font-bold text-body">
            {crumbs.map((c, i) => (
              <span key={c.label} className="flex items-center gap-1.5">
                {c.to ? (
                  <Link to={c.to} className="hover:text-brand">
                    {c.label}
                  </Link>
                ) : (
                  <span className="text-navy">{c.label}</span>
                )}
                {i < crumbs.length - 1 && <ChevronRight className="h-3.5 w-3.5" />}
              </span>
            ))}
          </nav>
          <h1 className="rise mt-4 max-w-2xl text-[38px] font-black leading-[1.08] sm:text-[50px]">{title}</h1>
          <p className="rise mt-4 max-w-xl text-[17.5px] leading-relaxed" style={{ animationDelay: "80ms" }}>
            {text}
          </p>
          <div className="rise mt-7" style={{ animationDelay: "150ms" }}>
            {children}
          </div>
        </div>
        <div className="relative mx-auto hidden w-full max-w-[440px] sm:block">
          <Sun className="absolute -right-6 -top-10 z-10 w-28" />
          <div className="absolute -left-3 -top-3 h-full w-full rounded-[40px] bg-sun/40" aria-hidden />
          <img src={image} alt="" className="relative aspect-[5/4] w-full rounded-[40px] border-[6px] border-white object-cover shadow-[0_30px_60px_-36px_rgba(27,43,94,0.55)]" />
        </div>
      </div>
      <Wave className="absolute -bottom-px left-0 h-10 w-full" fill="#fffbf3" />
    </section>
  );
}
