import { useEffect } from "react";
import { Clock, Facebook, Instagram, Linkedin, Mail, MapPin, Phone, Youtube } from "lucide-react";
import { waLink } from "../lib/site";
import { telHref, useSite } from "../queries/site";
import { HandNote, Sun } from "../components/doodles";
import { LeadForm } from "../components/lead-form";
import { WaIcon } from "../components/header";

export default function ContactPage() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  const site = useSite();
  const items: { icon: typeof Phone; label: string; value: string; href?: string }[] = [
    { icon: Phone, label: "Call us", value: site.phone, href: telHref(site.phone) },
    { icon: Mail, label: "Email", value: site.email, href: `mailto:${site.email}` },
    { icon: Clock, label: "Working hours", value: site.hours },
    ...site.phones.map((p) => ({ icon: Phone, label: p.label || "Phone", value: p.number, href: telHref(p.number) })),
    ...site.emails.map((m) => ({ icon: Mail, label: m.label || "Email", value: m.email, href: `mailto:${m.email}` })),
    ...(site.addresses.length
      ? site.addresses.map((a) => ({ icon: MapPin, label: a.label || "Office", value: a.line, href: a.mapUrl || undefined }))
      : [{ icon: MapPin, label: "Office", value: site.city, href: undefined }]),
  ];
  const socials = (
    [
      ["facebook", Facebook],
      ["instagram", Instagram],
      ["linkedin", Linkedin],
      ["youtube", Youtube],
    ] as const
  ).filter(([k]) => site.socials[k]);
  return (
    <section className="relative isolate overflow-hidden bg-gradient-to-b from-[#fff3e2] to-cream py-14 sm:py-20">
      <div className="dots-bg pointer-events-none absolute inset-0 -z-10 opacity-50 [mask-image:linear-gradient(to_bottom,black,transparent_70%)]" />
      <Sun className="pointer-events-none absolute -right-8 top-6 -z-10 hidden w-36 lg:block" />
      <div className="container-x grid gap-10 lg:grid-cols-[1fr_1.1fr] lg:items-start">
        <div>
          <p className="mb-3 inline-flex rounded-full bg-peach px-4 py-1.5 text-[13px] font-extrabold uppercase tracking-[0.12em] text-brand">Contact Us</p>
          <h1 className="text-4xl font-black sm:text-5xl">Let's talk about your <span className="wiggle-underline text-brand">business</span></h1>
          <HandNote lines={["We reply within 30 minutes!"]} className="mt-3 !text-[24px]" />
          <p className="mt-4 max-w-md text-[17px]">Fill the form and our expert will call you within 30 minutes. The first consultation is free.</p>
          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            {items.map((it) => {
              const inner = (
                <>
                  <span className="grid h-11 w-11 place-items-center rounded-2xl bg-peach text-brand"><it.icon className="h-5 w-5" /></span>
                  <span>
                    <span className="block text-[13px]">{it.label}</span>
                    <span className="block whitespace-pre-line font-semibold text-navy">{it.value}</span>
                  </span>
                </>
              );
              return it.href ? (
                <a key={it.label + it.value} href={it.href} target={it.href.startsWith("http") ? "_blank" : undefined} rel="noreferrer" className="flex items-center gap-3 rounded-[22px] bg-white p-4 ring-1 ring-line transition hover:-translate-y-0.5 hover:ring-brand/40">{inner}</a>
              ) : (
                <div key={it.label + it.value} className="flex items-center gap-3 rounded-[22px] bg-white p-4 ring-1 ring-line">{inner}</div>
              );
            })}
          </div>
          <a href={waLink(site.whatsapp, site.bot.whatsappMessage)} target="_blank" rel="noreferrer" className="mt-6 inline-flex items-center gap-2 rounded-full bg-wa px-6 py-3 font-extrabold text-white hover:brightness-95">
            <WaIcon /> Chat on WhatsApp
          </a>
          {socials.length > 0 && (
            <div className="mt-6 flex gap-2">
              {socials.map(([k, Icon]) => (
                <a key={k} href={site.socials[k]} target="_blank" rel="noreferrer" aria-label={k} className="grid h-11 w-11 place-items-center rounded-full bg-white text-brand ring-1 ring-line hover:bg-brand hover:text-white">
                  <Icon className="h-5 w-5" />
                </a>
              ))}
            </div>
          )}
        </div>
        <div className="rounded-[32px] border border-line bg-white p-6 shadow-[0_30px_60px_-34px_rgba(27,43,94,0.45)] sm:p-8">
          <h2 className="text-2xl font-black">Request a free call</h2>
          <p className="mt-1 text-[14px]">Takes less than a minute.</p>
          <div className="mt-6">
            <LeadForm layout="stack" source="contact" cta="Get Free Consultation" withEmail withMessage />
          </div>
        </div>
      </div>
    </section>
  );
}
