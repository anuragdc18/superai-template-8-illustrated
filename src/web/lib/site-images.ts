import { CATEGORIES, SLIDES } from "./site";
import { BASE_CATEGORIES } from "./live-categories";
import { assetPath, imageOverrides } from "./demo";

/**
 * Every replaceable website image, for Admin → Images.
 * Category and banner images are found automatically; add other images used by this design to EXTRA_IMAGES.
 */
const BASE_SLIDES = SLIDES.map((s) => ({ ...s }));

/** Images used directly by this template's pages (not in the category / banner lists). */
export const EXTRA_IMAGES: { path: string; label: string; group: string }[] = [
  { path: "/images/hero-all.jpg", label: "Banner: Everything Your Business Needs", group: "Home page banners" },
  { path: "/images/ms-banner.jpg", label: "Microsoft certifications banner", group: "Other" },
  { path: "/images/step-1.jpg", label: "Step 1 picture (How it works)", group: "How it works pictures" },
  { path: "/images/step-2.jpg", label: "Step 2 picture (How it works)", group: "How it works pictures" },
  { path: "/images/step-3.jpg", label: "Step 3 picture (How it works)", group: "How it works pictures" },
  { path: "/images/faq-helper.jpg", label: "FAQ section photo", group: "Other" },
  { path: "/images/cta-city.jpg", label: "Call-to-action band background", group: "Other" },
];

/** Does this design show the SLIDES photos as home page banners? */
const SLIDE_IMAGES_SHOWN = true;

export type SiteImage = { path: string; label: string; group: string };

export function siteImages(): SiteImage[] {
  const list: SiteImage[] = [
    ...(SLIDE_IMAGES_SHOWN ? BASE_SLIDES.map((s, i) => ({ path: assetPath(s.image), label: `Banner ${i + 1}: ${s.title}`, group: "Home page banners" })) : []),
    ...EXTRA_IMAGES,
    ...BASE_CATEGORIES.map((c) => ({ path: assetPath(c.image), label: c.title, group: "Service category images" })),
    { path: "/og-image.png", label: "Default share image (WhatsApp / Facebook preview)", group: "Other" },
  ];
  const seen = new Set<string>();
  return list.filter((x) => (seen.has(x.path) ? false : (seen.add(x.path), true)));
}

let lastKey = "";
/** Use the owner's replacement images everywhere on the website. */
export function applyLiveImages(images: Record<string, string>) {
  const key = JSON.stringify(images);
  if (key === lastKey) return;
  lastKey = key;
  for (const k of Object.keys(imageOverrides)) delete imageOverrides[k];
  Object.assign(imageOverrides, images);
  const pick = (orig: string) => images[assetPath(orig)] || orig;
  BASE_CATEGORIES.forEach((c, i) => {
    if (CATEGORIES[i]) CATEGORIES[i].image = pick(c.image);
  });
  BASE_SLIDES.forEach((s, i) => {
    if (SLIDES[i]) SLIDES[i].image = pick(s.image);
  });
}
