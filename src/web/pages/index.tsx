import { useEffect, useState } from "react";
import { Link } from "wouter";
import {
  ArrowRight,
  BadgeCheck,
  ChevronDown,
  Clock,
  FileText,
  Globe2,
  GraduationCap,
  Headphones,
  IndianRupee,
  Instagram,
  Landmark,
  MapPin,
  MessageCircle,
  Palette,
  PenTool,
  PhoneCall,
  Rocket,
  ShieldCheck,
  Smartphone,
  Sparkles,
  Star,
  Store,
  Users,
} from "lucide-react";
import { CATEGORIES, POPULAR, SLIDES, serviceUrl, waLink } from "../lib/site";
import { asset } from "../lib/demo";
import { useSite } from "../queries/site";
import { LeadForm } from "../components/lead-form";
import { WaIcon } from "../components/header";
import { Cloud, HandNote, SectionTitle, Sparkle, Squiggle, Sun, Wave } from "../components/doodles";

/* ───────────────────────── helpers ───────────────────────── */

const ALL_SERVICES = CATEGORIES.flatMap((c) => c.services.map((s) => ({ ...s, cat: c })));
/** Link for a service by its exact name (names come from site.ts). */
function svc(name: string) {
  const s = ALL_SERVICES.find((x) => x.name === name);
  return s ? { name: s.name, short: s.name.replace(" (Pvt Ltd)", "").replace(": ", " · "), url: serviceUrl(s.cat.slug, s.name), days: s.days } : null;
}

const GEN_TEXT =
  "Registration, logo & branding, websites, social media, AI tools and Microsoft certifications — all in one place, handled by experts, 100% online.";

/* ───────────────────────── 1. hero ───────────────────────── */

type HeroSlide = { tag: string; title: string; text: string; link: string; linkText: string; image: string; note: string[] };

const slideBy = (link: string) => SLIDES.find((s) => s.link === link)!;
const HERO: HeroSlide[] = [
  {
    tag: "All Services",
    title: "Everything Your Business Needs",
    text: GEN_TEXT,
    link: "/contact",
    linkText: "Talk to an Expert",
    image: asset("/images/hero-all.jpg"),
    note: ["Start.", "Grow.", "Succeed!"],
  },
  ...[
    { link: "/services/registration", image: "hero-registration.jpg", note: ["Register", "the easy way"] },
    { link: "/services/branding", image: "hero-branding.jpg", note: ["Look", "professional!"] },
    { link: "/services/website", image: "hero-website.jpg", note: ["Get found", "online!"] },
    { link: "/services/microsoft-certifications", image: "hero-microsoft.jpg", note: ["Learn.", "Practice.", "Get certified!"] },
  ].map((x) => {
    const s = slideBy(x.link);
    return { tag: s.tag, title: s.title, text: s.text, link: s.link, linkText: s.linkText, image: asset(`/images/${x.image}`), note: x.note };
  }),
];

function Hero() {
  const [i, setI] = useState(0);
  const [paused, setPaused] = useState(false);
  useEffect(() => {
    if (paused) return;
    const t = setTimeout(() => setI((v) => (v + 1) % HERO.length), 5000);
    return () => clearTimeout(t);
  }, [i, paused]);
  const h = HERO[i];
  const words = h.title.split(" ");
  const tail = words.splice(-2).join(" ");

  return (
    <section
      className="relative isolate overflow-hidden bg-gradient-to-b from-[#fff3e2] via-cream to-cream"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div className="dots-bg pointer-events-none absolute inset-0 -z-10 opacity-60 [mask-image:linear-gradient(to_bottom,black,transparent_80%)]" />
      <Cloud className="pointer-events-none absolute left-[44%] top-24 -z-10 hidden w-20 opacity-70 lg:block" />

      <div className="container-x grid items-center gap-10 pb-28 pt-10 sm:pt-14 lg:grid-cols-[1.02fr_1fr] lg:gap-14 lg:pb-32 [&>*]:min-w-0">
        <div className="max-lg:text-center">
          {/* topic tabs */}
          <div role="tablist" aria-label="Choose a topic" className="no-scrollbar -mx-4 flex gap-2 overflow-x-auto px-4 pb-1 sm:mx-0 sm:flex-wrap sm:overflow-visible sm:px-0 max-lg:sm:justify-center">
            {HERO.map((t, idx) => (
              <button
                key={t.tag}
                role="tab"
                aria-selected={idx === i}
                onClick={() => setI(idx)}
                className={`relative shrink-0 overflow-hidden whitespace-nowrap rounded-full px-4 py-2 text-[13.5px] font-extrabold transition ${
                  idx === i ? "bg-navy text-white shadow-[0_8px_18px_-8px_rgba(27,43,94,0.6)]" : "bg-white text-navy ring-1 ring-line hover:ring-brand"
                }`}
              >
                {t.tag}
                {idx === i && !paused && <span key={i} className="hero-progress absolute bottom-0 left-0 h-[3px] bg-sun" />}
              </button>
            ))}
          </div>

          <h1 key={`t${i}`} className="rise mt-7 text-[40px] font-black leading-[1.05] sm:text-[54px] lg:text-[60px]">
            {words.join(" ")} <span className="wiggle-underline whitespace-nowrap text-brand">{tail}</span>
          </h1>
          <p key={`p${i}`} className="rise mx-auto mt-5 max-w-xl text-[17.5px] leading-relaxed lg:mx-0" style={{ animationDelay: "80ms" }}>
            {h.text}
          </p>
          <div key={`b${i}`} className="rise mt-8 flex flex-wrap gap-3 max-lg:justify-center" style={{ animationDelay: "150ms" }}>
            <a href="#enquiry" className="btn-brand">
              Get Free Consultation <ArrowRight className="h-4 w-4" />
            </a>
            <Link to={h.link} className="btn-outline">
              {h.linkText}
            </Link>
          </div>
          <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-2 text-[14px] font-bold text-navy max-lg:justify-center">
            <span className="flex items-center gap-1.5"><ShieldCheck className="h-4 w-4 text-leaf" /> 100% online</span>
            <span className="flex items-center gap-1.5"><PhoneCall className="h-4 w-4 text-leaf" /> Free expert call</span>
            <span className="flex items-center gap-1.5"><MapPin className="h-4 w-4 text-leaf" /> Pan-India</span>
          </div>
        </div>

        {/* illustration frame */}
        <div className="relative mx-auto w-full max-w-[600px]">
          <Sun className="absolute -right-6 -top-10 z-20 w-28 sm:-right-10 sm:w-36" />
          <div className="absolute -left-4 -top-4 h-full w-full rounded-[44px] bg-sun/40" aria-hidden />
          <div className="relative aspect-[16/11] overflow-hidden rounded-[44px] border-[6px] border-white bg-peach shadow-[0_40px_70px_-40px_rgba(27,43,94,0.55)]">
            {HERO.map((s, idx) => (
              <img
                key={s.image}
                src={s.image}
                alt=""
                aria-hidden={idx !== i}
                className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-1000 ${idx === i ? "opacity-100" : "opacity-0"}`}
              />
            ))}
          </div>
          <div className="bob absolute -bottom-8 -left-2 z-20 rounded-[22px] bg-white px-5 py-3 shadow-[0_20px_40px_-24px_rgba(27,43,94,0.5)] sm:-left-8">
            <HandNote key={i} lines={h.note} className="!text-[24px]" />
          </div>
          <div className="absolute -bottom-6 right-6 z-20 flex items-center gap-2.5 rounded-full bg-white py-2 pl-2 pr-4 shadow-[0_20px_40px_-24px_rgba(27,43,94,0.5)]">
            <span className="grid h-9 w-9 place-items-center rounded-full bg-mint text-leaf">
              <Users className="h-4.5 w-4.5" />
            </span>
            <span className="text-[13px] font-extrabold leading-tight text-navy">
              1,000+ happy
              <br />
              <span className="font-semibold text-body">businesses</span>
            </span>
          </div>
        </div>
      </div>
      <Wave className="absolute -bottom-px left-0 h-10 w-full sm:h-14" fill="#ffffff" />
    </section>
  );
}

/* ───────────────────────── 2. enquiry + stats ───────────────────────── */

function GoogleG() {
  return (
    <svg viewBox="0 0 48 48" className="h-6 w-6" aria-hidden>
      <path fill="#FFC107" d="M43.6 20.5H42V20H24v8h11.3C33.7 32.7 29.2 36 24 36c-6.6 0-12-5.4-12-12s5.4-12 12-12c3.1 0 5.8 1.2 7.9 3.1l5.7-5.7C34 6.1 29.3 4 24 4 12.9 4 4 12.9 4 24s8.9 20 20 20 20-8.9 20-20c0-1.3-.1-2.4-.4-3.5z" />
      <path fill="#FF3D00" d="m6.3 14.7 6.6 4.8C14.7 15.1 19 12 24 12c3.1 0 5.8 1.2 7.9 3.1l5.7-5.7C34 6.1 29.3 4 24 4 16.3 4 9.7 8.3 6.3 14.7z" />
      <path fill="#4CAF50" d="M24 44c5.2 0 9.9-2 13.4-5.2l-6.2-5.2C29.2 35.1 26.7 36 24 36c-5.2 0-9.6-3.3-11.3-8l-6.5 5C9.5 39.6 16.2 44 24 44z" />
      <path fill="#1976D2" d="M43.6 20.5H42V20H24v8h11.3c-.8 2.2-2.2 4.2-4.1 5.6l6.2 5.2C37 39.2 44 34 44 24c0-1.3-.1-2.4-.4-3.5z" />
    </svg>
  );
}

const STATS = [
  { icon: Star, big: "4.8", small: "Google Rating", tone: "bg-sun/30 text-[#c98a00]", google: true },
  { icon: Users, big: "1,000+", small: "Happy Clients", tone: "bg-peach text-brand" },
  { icon: MapPin, big: "Pan-India", small: "Service", tone: "bg-mint text-leaf" },
  { icon: ShieldCheck, big: "100%", small: "Online Process", tone: "bg-[#e3eefe] text-sky" },
];

function EnquiryAndStats() {
  return (
    <section id="enquiry" className="relative z-10 scroll-mt-28 bg-white pb-14">
      <div className="container-x -mt-10 sm:-mt-12">
        <div className="card-soft relative grid gap-5 p-5 sm:p-7 lg:grid-cols-[230px_1fr] lg:items-center">
          <div className="flex items-center gap-3 max-lg:justify-center">
            <span className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-brand text-white shadow-[0_10px_20px_-8px_rgba(242,106,27,0.7)]">
              <PhoneCall className="h-5 w-5" />
            </span>
            <p className="text-[17px] font-black leading-tight text-navy">
              Get a free call
              <span className="block text-[14px] font-semibold text-body">from our expert</span>
            </p>
          </div>
          <LeadForm cta="Call Me Back" />
        </div>
        <div className="mt-10 grid grid-cols-2 gap-4 md:grid-cols-4">
          {STATS.map((s) => (
            <div key={s.small} className="flex items-center gap-3 rounded-[22px] bg-cream px-4 py-4 ring-1 ring-line sm:px-5">
              <span className={`grid h-12 w-12 shrink-0 place-items-center rounded-2xl ${s.tone}`}>
                {s.google ? <GoogleG /> : <s.icon className="h-5 w-5" />}
              </span>
              <span className="leading-tight">
                <span className="block text-[21px] font-black text-navy">{s.big}</span>
                <span className="text-[13.5px] font-semibold">{s.small}</span>
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ───────────────────────── 3. goals ───────────────────────── */

const GOALS = [
  {
    icon: Rocket,
    title: "Start a business",
    text: "Get your business registered the right way.",
    tone: "bg-peach",
    iconTone: "bg-brand text-white",
    services: ["GST Registration", "Company Registration (Pvt Ltd)", "MSME / Udyam", "Trademark"],
  },
  {
    icon: Smartphone,
    title: "Get customers online",
    text: "Be found on Google, Instagram and WhatsApp.",
    tone: "bg-mint",
    iconTone: "bg-leaf text-white",
    services: ["Business Website", "Instagram & Facebook Handling", "Google Ranking (SEO)", "WhatsApp Auto-Reply"],
  },
  {
    icon: Palette,
    title: "Build my brand",
    text: "Look professional from day one.",
    tone: "bg-[#fff1c9]",
    iconTone: "bg-sun text-navy",
    services: ["Logo Design", "Business Card", "Brochure", "Full Brand Kit"],
  },
  {
    icon: GraduationCap,
    title: "Get certified",
    text: "Microsoft Fundamentals training with exam help.",
    tone: "bg-[#e3eefe]",
    iconTone: "bg-sky text-white",
    services: ["AZ-900: Azure Fundamentals", "AI-901: Azure AI Fundamentals", "PL-900: Power Platform Fundamentals", "MS-900: Microsoft 365 Fundamentals"],
  },
];

function Goals() {
  return (
    <section className="relative bg-white pb-20 pt-6">
      <div className="container-x">
        <div className="relative">
          <SectionTitle label="Start here" title="What's your goal today?" text="Pick what you want to do — we'll show you the services that help." />
          <div className="pointer-events-none absolute right-0 top-2 hidden text-brand lg:block">
            <HandNote lines={["Easy to", "understand!"]} className="!text-[24px] text-brand" />
            <Squiggle className="ml-8 mt-1 h-10 w-16 rotate-[30deg]" />
          </div>
        </div>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {GOALS.map((g) => (
            <div key={g.title} className={`group flex flex-col rounded-[32px] ${g.tone} p-6 transition hover:-translate-y-1.5`}>
              <span className={`grid h-14 w-14 place-items-center rounded-[20px] ${g.iconTone} shadow-[0_12px_24px_-12px_rgba(27,43,94,0.5)] transition group-hover:rotate-[-6deg]`}>
                <g.icon className="h-6 w-6" />
              </span>
              <h3 className="mt-5 text-[22px] font-black leading-tight">{g.title}</h3>
              <p className="mt-1.5 text-[15px]">{g.text}</p>
              <ul className="mt-5 space-y-2">
                {g.services.map(svc).filter(Boolean).map((s) => (
                  <li key={s!.name}>
                    <Link to={s!.url} className="flex items-center justify-between gap-2 rounded-2xl bg-white/80 px-3.5 py-2.5 text-[14.5px] font-bold text-navy transition hover:bg-white hover:text-brand">
                      {s!.short}
                      <ArrowRight className="h-4 w-4 shrink-0 opacity-50" />
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ───────────────────────── 4. services tiles ───────────────────────── */

const TILE_TONES = ["bg-peach", "bg-[#fff1c9]", "bg-mint", "bg-[#e3eefe]", "bg-[#fde4ec]", "bg-[#e8f6f7]", "bg-[#efe9ff]"];

function ServiceTiles() {
  const site = useSite();
  return (
    <section className="relative bg-surface py-20">
      <Wave className="absolute -top-px left-0 h-10 w-full rotate-180" fill="#ffffff" />
      <div className="container-x">
        <SectionTitle label="Our services" title="Everything, in one friendly place" text="Tap a card to see every service inside." />
        <div className="grid grid-cols-2 gap-4 sm:gap-5 lg:grid-cols-4">
          {CATEGORIES.map((c, idx) => (
            <Link
              key={c.slug}
              to={`/services/${c.slug}`}
              className="group relative flex flex-col overflow-hidden rounded-[30px] bg-white p-3 ring-1 ring-line transition hover:-translate-y-1 hover:shadow-[0_26px_50px_-30px_rgba(27,43,94,0.5)] sm:p-4"
            >
              <div className={`relative aspect-square overflow-hidden rounded-[24px] ${TILE_TONES[idx % TILE_TONES.length]}`}>
                <img src={c.image} alt="" loading="lazy" className="h-full w-full object-cover transition duration-500 group-hover:scale-105" />
                {/* hover: top services */}
                <div className="absolute inset-0 hidden flex-col justify-end bg-gradient-to-t from-navy/95 via-navy/80 to-navy/10 p-4 opacity-0 transition duration-300 group-hover:opacity-100 sm:flex">
                  <ul className="space-y-1.5">
                    {c.services.slice(0, 3).map((s) => (
                      <li key={s.name} className="flex items-center gap-2 text-[13.5px] font-bold text-white">
                        <Sparkle className="h-3 w-3 shrink-0 text-sun" /> <span className="truncate">{s.name}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
              <div className="flex flex-1 items-end justify-between gap-2 px-1 pb-1 pt-4">
                <span>
                  <span className="block text-[16px] font-black leading-tight text-navy sm:text-[18px]">{c.title}</span>
                  <span className="mt-1 inline-block rounded-full bg-cream px-2.5 py-0.5 text-[12px] font-bold text-brand ring-1 ring-line">
                    {c.services.length} {c.slug === "microsoft-certifications" ? "exams" : "services"}
                  </span>
                </span>
                <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-brand text-white transition group-hover:rotate-[-45deg]">
                  <ArrowRight className="h-4 w-4" />
                </span>
              </div>
            </Link>
          ))}
          {/* helper tile */}
          <a
            href={waLink(site.whatsapp)}
            target="_blank"
            rel="noreferrer"
            className="relative flex flex-col justify-between overflow-hidden rounded-[30px] bg-navy p-6 text-white transition hover:-translate-y-1"
          >
            <Sun className="absolute -right-8 -top-8 w-28 opacity-90" />
            <span className="relative grid h-12 w-12 place-items-center rounded-2xl bg-wa">
              <WaIcon className="h-6 w-6" />
            </span>
            <span className="relative">
              <span className="block text-[20px] font-black leading-tight !text-white">Not sure what you need?</span>
              <span className="mt-2 block text-[14.5px] text-white/80">Message us on WhatsApp — a real expert will guide you, free.</span>
              <span className="mt-4 inline-flex items-center gap-1.5 font-extrabold text-sun">
                Chat now <ArrowRight className="h-4 w-4" />
              </span>
            </span>
          </a>
        </div>
      </div>
    </section>
  );
}

/* ───────────────────────── 5. microsoft banner ───────────────────────── */

const MS = CATEGORIES.find((c) => c.slug === "microsoft-certifications")!;

function MicrosoftBanner() {
  return (
    <section className="bg-surface pb-20">
      <div className="container-x">
        <div className="relative overflow-hidden rounded-[40px] bg-[#e4f5f3] ring-1 ring-[#cbe9e5]">
          <img
            src={asset("/images/ms-banner.jpg")}
            alt=""
            loading="lazy"
            className="absolute inset-y-0 right-0 hidden h-full w-[62%] object-cover lg:block [mask-image:linear-gradient(to_right,transparent,black_30%)]"
          />
          <div className="relative grid gap-6 p-7 sm:p-10 lg:max-w-[56%] lg:p-12">
            <p className="inline-flex w-fit items-center gap-2 rounded-full bg-white px-4 py-1.5 text-[13px] font-extrabold uppercase tracking-[0.12em] text-royal">
              <GraduationCap className="h-4 w-4" /> {MS.title}
            </p>
            <h2 className="text-[30px] font-black leading-tight sm:text-[40px]">
              Learn step by step. <span className="wiggle-underline">Get certified</span> with confidence.
            </h2>
            <p className="text-[16.5px]">{MS.intro}</p>
            <div className="flex flex-wrap gap-2">
              {MS.services.map((s) => (
                <Link
                  key={s.name}
                  to={serviceUrl(MS.slug, s.name)}
                  className="rounded-full bg-white px-3 py-1.5 text-[13px] font-extrabold text-navy ring-1 ring-[#cbe9e5] transition hover:bg-royal hover:text-white"
                >
                  {s.name.split(":")[0]}
                </Link>
              ))}
            </div>
            <div className="flex flex-wrap items-center gap-4">
              <Link to={`/services/${MS.slug}`} className="btn-brand">
                View All Exams <ArrowRight className="h-4 w-4" />
              </Link>
              <HandNote lines={["Learn · Practice · Pass!"]} className="!text-[24px] text-royal" />
            </div>
          </div>
          <img src={asset("/images/ms-banner.jpg")} alt="" loading="lazy" className="aspect-[16/8] w-full object-cover lg:hidden" />
        </div>
      </div>
    </section>
  );
}

/* ───────────────────────── 6. popular pills ───────────────────────── */

const POP_ICONS = [FileText, Landmark, BadgeCheck, Store, PenTool, Globe2, Instagram, MessageCircle];
const POP_TONES = ["bg-peach text-brand", "bg-mint text-leaf", "bg-[#e3eefe] text-sky", "bg-[#fff1c9] text-[#b07d00]"];

function PopularPills() {
  return (
    <section className="bg-white py-20">
      <div className="container-x">
        <SectionTitle label="Most asked" title="Most popular right now" text="These are what most of our customers start with." />
        <div className="mx-auto flex max-w-5xl flex-wrap justify-center gap-3 sm:gap-4">
          {POPULAR.map((p, idx) => {
            const Icon = POP_ICONS[idx % POP_ICONS.length];
            return (
              <Link
                key={p.name}
                to={serviceUrl(p.cat, p.name)}
                className="group flex items-center gap-3 rounded-full bg-cream py-2 pl-2 pr-5 ring-1 ring-line transition hover:-translate-y-0.5 hover:bg-white hover:shadow-[0_16px_30px_-20px_rgba(27,43,94,0.5)] hover:ring-brand/40"
              >
                <span className={`grid h-11 w-11 shrink-0 place-items-center rounded-full ${POP_TONES[idx % POP_TONES.length]}`}>
                  <Icon className="h-5 w-5" />
                </span>
                <span className="leading-tight">
                  <span className="block text-[15.5px] font-black text-navy group-hover:text-brand">{p.name}</span>
                  <span className="flex items-center gap-1 text-[12.5px] font-semibold">
                    <Clock className="h-3 w-3" /> {p.days}
                  </span>
                </span>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ───────────────────────── 7. comic strip ───────────────────────── */

const STEPS = [
  { img: "step-1.jpg", bubble: "Hi! I need help with my business.", title: "Tell us what you need", text: "Fill the form or call us. It takes 1 minute." },
  { img: "step-2.jpg", bubble: "Sending my documents on WhatsApp!", title: "Share your documents", text: "Send them on WhatsApp or email. No office visit." },
  { img: "step-3.jpg", bubble: "Done! That was so easy.", title: "We get it done", text: "You get updates at every step until it's complete." },
];

function ComicSteps() {
  return (
    <section className="relative bg-surface py-20">
      <Wave className="absolute -top-px left-0 h-10 w-full rotate-180" fill="#ffffff" />
      <div className="container-x">
        <SectionTitle label="How it works" title="As easy as 1, 2, 3" text="No office visits. No confusing forms. Just three friendly steps." />
        <div className="grid gap-8 md:grid-cols-3 md:gap-6">
          {STEPS.map((s, idx) => (
            <div key={s.title} className="relative">
              <div className={`overflow-hidden rounded-[26px] border-[3px] border-navy bg-white shadow-[6px_6px_0_0_#1b2b5e] ${idx === 1 ? "md:rotate-1" : "md:-rotate-1"}`}>
                <div className="relative">
                  <img src={asset(`/images/${s.img}`)} alt="" loading="lazy" className="aspect-[5/4] w-full object-cover" />
                  <span className="absolute left-3 top-3 grid h-11 w-11 place-items-center rounded-full border-[3px] border-navy bg-sun text-[18px] font-black text-navy">
                    {idx + 1}
                  </span>
                  {/* speech bubble */}
                  <span className="absolute bottom-3 right-3 max-w-[70%] rounded-[18px] border-[3px] border-navy bg-white px-3 py-2 text-[13.5px] font-extrabold leading-snug text-navy">
                    {s.bubble}
                    <span className="absolute -bottom-[11px] left-6 h-4 w-4 rotate-45 border-b-[3px] border-r-[3px] border-navy bg-white" />
                  </span>
                </div>
                <div className="border-t-[3px] border-navy p-5">
                  <h3 className="text-[20px] font-black">{s.title}</h3>
                  <p className="mt-1 text-[15px]">{s.text}</p>
                </div>
              </div>
              {idx < STEPS.length - 1 && (
                <Squiggle className="absolute -right-9 top-[38%] z-10 hidden h-10 w-14 text-brand md:block" />
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ───────────────────────── 8. reviews ───────────────────────── */

const WHY = [
  { icon: Sparkles, title: "One place for everything", text: "Registration, branding, website and marketing — no running around." },
  { icon: IndianRupee, title: "Clear pricing", text: "You know the full cost before we start. No hidden charges." },
  { icon: Smartphone, title: "Fully online", text: "Do everything from your phone, from anywhere in India." },
  { icon: Headphones, title: "Real experts", text: "CA, CS and design experts guide you at every step." },
];

const REVIEWS = [
  { name: "Ravi K.", city: "Hyderabad", text: "My GST and company registration were done in a week. Very smooth, and they explained everything simply.", tone: "bg-brand" },
  { name: "Priya S.", city: "Bengaluru", text: "They designed our logo and website together. Looks very professional and customers notice it.", tone: "bg-royal" },
  { name: "Arjun M.", city: "Pune", text: "Our Instagram enquiries doubled in 2 months. The team posts on time every week.", tone: "bg-leaf" },
];

function Reviews() {
  return (
    <section className="bg-white py-20">
      <div className="container-x">
        <SectionTitle label="Happy customers" title="Why people love us" />
        <div className="mb-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {WHY.map((w) => (
            <div key={w.title} className="flex gap-3 rounded-[24px] bg-cream p-5 ring-1 ring-line">
              <span className="grid h-11 w-11 shrink-0 place-items-center rounded-2xl bg-peach text-brand">
                <w.icon className="h-5 w-5" />
              </span>
              <span>
                <span className="block font-black text-navy">{w.title}</span>
                <span className="mt-0.5 block text-[14px] leading-snug">{w.text}</span>
              </span>
            </div>
          ))}
        </div>
        <div className="grid gap-6 lg:grid-cols-[260px_1fr] lg:items-start">
          <div className="flex flex-col items-center rounded-[30px] bg-navy p-7 text-center text-white">
            <GoogleG />
            <p className="mt-3 text-[54px] font-black leading-none !text-white">4.8</p>
            <div className="mt-2 flex text-sun">{[0, 1, 2, 3, 4].map((k) => <Star key={k} className="h-5 w-5 fill-current" />)}</div>
            <p className="mt-2 text-[14px] text-white/80">Average rating on Google from 1,000+ happy clients</p>
            <HandNote lines={["Thank you!"]} className="mt-3 !text-[26px] text-sun" />
          </div>
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {REVIEWS.map((r) => (
              <figure key={r.name} className="flex flex-col">
                <blockquote className="relative flex-1 rounded-[26px] bg-cream p-6 text-[15.5px] font-semibold leading-relaxed text-navy ring-1 ring-line">
                  <div className="mb-2 flex text-brand">{[0, 1, 2, 3, 4].map((k) => <Star key={k} className="h-4 w-4 fill-current" />)}</div>
                  "{r.text}"
                  <span className="absolute -bottom-[9px] left-9 h-4 w-4 rotate-45 border-b border-r border-line bg-cream" />
                </blockquote>
                <figcaption className="mt-5 flex items-center gap-3 pl-4">
                  <span className={`grid h-11 w-11 place-items-center rounded-full ${r.tone} text-[16px] font-black text-white`}>{r.name[0]}</span>
                  <span className="leading-tight">
                    <span className="block font-black text-navy">{r.name}</span>
                    <span className="text-[13px]">{r.city}</span>
                  </span>
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ───────────────────────── 9. FAQ ───────────────────────── */

const FAQS = [
  { q: "Do I need to visit your office?", a: "No. Everything is done online. You can share documents on WhatsApp or email." },
  { q: "How long does GST registration take?", a: "Usually 3 to 7 working days, once we have all your documents." },
  { q: "Can you do registration and the website together?", a: "Yes. Many clients start with registration and logo, then add a website. We offer combo prices." },
  { q: "How do I pay?", a: "You can pay by UPI, debit/credit card or bank transfer. You get a proper GST invoice." },
  { q: "I'm not sure which registration I need. Can you help?", a: "Yes — that's what the free consultation is for. Our expert will suggest the right option for you." },
];

function Faq() {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <section className="relative bg-surface py-20">
      <Wave className="absolute -top-px left-0 h-10 w-full rotate-180" fill="#ffffff" />
      <div className="container-x grid gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:items-center">
        <div className="relative mx-auto w-full max-w-[420px]">
          <div className="absolute inset-4 -z-0 rounded-[48%_52%_46%_54%/55%_45%_55%_45%] bg-sun/40" aria-hidden />
          <img
            src={asset("/images/faq-helper.jpg")}
            alt=""
            loading="lazy"
            className="relative aspect-[9/10] w-full rounded-[48%_52%_46%_54%/55%_45%_55%_45%] object-cover"
          />
          <div className="bob absolute -right-2 top-6 rounded-[20px] bg-white px-4 py-3 shadow-[0_20px_40px_-24px_rgba(27,43,94,0.5)]">
            <HandNote lines={["Ask us", "anything!"]} className="!text-[24px] text-brand" />
          </div>
        </div>
        <div>
          <SectionTitle label="FAQ" title="Common questions" center={false} />
          <div className="space-y-3">
            {FAQS.map((f, idx) => {
              const isOpen = open === idx;
              return (
                <div key={f.q} className={`rounded-[22px] bg-white ring-1 transition ${isOpen ? "ring-brand/40 shadow-[0_18px_36px_-26px_rgba(27,43,94,0.45)]" : "ring-line"}`}>
                  <button
                    onClick={() => setOpen(isOpen ? null : idx)}
                    className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left text-[16px] font-black text-navy"
                    aria-expanded={isOpen}
                  >
                    {f.q}
                    <span className={`grid h-8 w-8 shrink-0 place-items-center rounded-full transition ${isOpen ? "rotate-180 bg-brand text-white" : "bg-peach text-brand"}`}>
                      <ChevronDown className="h-4 w-4" />
                    </span>
                  </button>
                  <div className={`grid transition-all duration-300 ${isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"}`}>
                    <div className="overflow-hidden">
                      <p className="px-5 pb-5 text-[15.5px]">{f.a}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ───────────────────────── 10. CTA (also used on inner pages) ───────────────────────── */

export function CtaBand() {
  const site = useSite();
  return (
    <section className="bg-cream py-16">
      <div className="container-x">
        <div className="relative isolate overflow-hidden rounded-[40px] bg-navy">
          <img src={asset("/images/cta-city.jpg")} alt="" loading="lazy" className="absolute inset-0 -z-20 h-full w-full object-cover" />
          <div className="absolute inset-0 -z-10 bg-gradient-to-r from-navy via-navy/85 to-navy/20" />
          <Sun className="absolute -right-6 -top-10 w-32 opacity-95 sm:w-40" />
          <div className="grid gap-6 px-7 py-12 sm:px-12 lg:max-w-[62%]">
            <HandNote lines={["Let's grow together!"]} className="!text-[28px] text-sun" />
            <h2 className="text-[32px] font-black leading-tight !text-white sm:text-[44px]">Ready to grow your business?</h2>
            <p className="text-[17px] text-white/85">Talk to our expert today. The first consultation is free.</p>
            <div className="flex flex-wrap gap-3">
              <Link to="/contact" className="btn-brand">
                Get Free Consultation <ArrowRight className="h-4 w-4" />
              </Link>
              <a href={waLink(site.whatsapp)} target="_blank" rel="noreferrer" className="btn-ghost">
                <WaIcon /> WhatsApp Us
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default function Index() {
  return (
    <>
      <Hero />
      <EnquiryAndStats />
      <Goals />
      <ServiceTiles />
      <MicrosoftBanner />
      <PopularPills />
      <ComicSteps />
      <Reviews />
      <Faq />
      <CtaBand />
    </>
  );
}
