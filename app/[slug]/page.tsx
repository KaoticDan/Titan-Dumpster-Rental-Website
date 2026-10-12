import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Callout, Faqs, Features, Hero, Pricing } from "../components";
import { hubs } from "../data";

type Slug = keyof typeof hubs;
export function generateStaticParams() { return Object.keys(hubs).map(slug=>({slug})); }
export async function generateMetadata({params}:{params:Promise<{slug:string}>}): Promise<Metadata> {const {slug}=await params; const page=hubs[slug as Slug]; return page ? {title:page.title,description:page.description}:{};}

export default async function Hub({params}:{params:Promise<{slug:string}>}) {
  const {slug}=await params;
  const page=hubs[slug as Slug];
  if(!page) notFound();
  return <><Hero heading={page.hero} text={page.intro} image={page.image} callText={slug==="hoa-property-manager-hub"?"Call Today":"Call Now"} /><Features eyebrow={page.eyebrow} heading={page.heading} subheading={page.subheading} features={page.features} /><Pricing /><Callout heading={page.cta} text={page.ctaText} /><Faqs />{slug==="contractors-hub"&&<div className="gallery-mini" />}</>;
}
