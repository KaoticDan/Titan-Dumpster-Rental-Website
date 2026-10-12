import Link from "next/link";
import { assets, faqs, prices } from "./data";
import { Gallery } from "./gallery";

export function Header() {
  return <div className="site-header">
    <div className="header-inner">
      <Link href="/" className="brand" aria-label="Titan Dumpster Rental home"><img src={assets.logo} alt="Titan Dumpster Rental" /></Link>
      <nav className="desktop-nav" aria-label="Main navigation">
        <Link href="/#Pricing">Pricing</Link>
        <div className="nav-dropdown"><button type="button" aria-haspopup="true">Industries <span aria-hidden="true">⌄</span></button><div className="nav-dropdown-menu">
          <Link href="/residential-hub">Residential Hub</Link><Link href="/contractors-hub">Contractor Hub</Link><Link href="/hoa-property-manager-hub">HOA &amp; Property Managers Hub</Link>
        </div></div>
        <a className="button outline small" href="tel:+14802568784">Call Now</a>
        <Link className="button small" href="/quote">Get a Quote</Link>
      </nav>
      <details className="mobile-nav"><summary aria-label="Open navigation"><span></span><span></span><span></span></summary><nav aria-label="Mobile navigation"><Link href="/#Pricing">Pricing</Link><Link href="/residential-hub">Residential Hub</Link><Link href="/contractors-hub">Contractor Hub</Link><Link href="/hoa-property-manager-hub">HOA &amp; Property Managers Hub</Link><a href="tel:+14802568784">Call Now</a><Link href="/quote">Get a Quote</Link></nav></details>
    </div>
  </div>;
}

export function Footer() {
  return <footer className="footer"><div className="container">
    <div className="footer-grid"><div><Link href="/" className="footer-logo"><img src={assets.logo} alt="Titan Dumpster Rental" /></Link><p><strong>Address:</strong><br />1234 Dumpster Lane, Phoenix, AZ 85001</p><p><strong>Contact:</strong><br /><a href="tel:+14802568784">480-256-8784</a><br /><a href="mailto:info@titantdumpsterrental.com">info@titantdumpsterrental.com</a></p></div><div className="footer-links"><Link href="/#Pricing">Pricing</Link><Link href="/quote">Get A Quote</Link><Link href="/residential-hub">Residential Hub</Link><Link href="/contractors-hub">Contractor Hub</Link><Link href="/hoa-property-manager-hub">HOA &amp; Property Manager Hub</Link><span className="footer-inactive">Blog</span></div><div className="footer-cta"><a className="button outline" href="tel:+14802568784">Call Now</a></div></div>
    <div className="footer-bottom"><span>© 2025 Titan Dumpster Rental. All rights reserved.</span><Link href="/privacy-policy">Privacy Policy</Link></div>
  </div></footer>;
}

export function ActionButtons({ callText = "Call Now" }: { callText?: string }) {
  return <div className="button-group"><Link className="button" href="/quote">Get a Quote</Link><a className="button outline" href="tel:+14802568784">{callText}</a></div>;
}

export function Hero({ heading, text, image, callText, narrow = false }: { heading: React.ReactNode; text: string; image: string; callText?: string; narrow?: boolean }) {
  return <section className={narrow ? "hero narrow" : "hero"} style={{ backgroundImage: `linear-gradient(90deg,rgba(0,0,0,.68),rgba(0,0,0,.5)),url('${image}')` }}><div className="container hero-inner"><div className="hero-copy"><h1>{heading}</h1><p>{text}</p><ActionButtons callText={callText} /></div></div></section>;
}

export function Pricing() {
  return <section className="pricing" id="Pricing" style={{ backgroundImage: `linear-gradient(rgba(0,0,0,.72),rgba(0,0,0,.78)),url('${assets.pricing}')` }}><div className="container"><div className="section-heading"><span className="eyebrow">Pricing</span><h2>A <em>Size</em> For Every Job</h2><p>We offer a variety of dumpster sizes to fit your project needs. From small cleanouts to large renovations, we have the perfect solution for you.</p></div><div className="price-grid">{prices.map(item=><article className="price-card" key={item.size}><h3>{item.size}</h3><p>{item.summary}</p><ul><li><strong>Price:</strong> Starts at {item.price}</li><li><strong>Dimensions:</strong> {item.dimensions}</li><li><strong>Weight:</strong> {item.weight}</li><li><strong>Best For:</strong> {item.best}</li></ul></article>)}</div><div className="center-actions"><ActionButtons /></div></div></section>;
}

export function Features({ eyebrow, heading, subheading, features, timeline = false }: { eyebrow: string; heading: string; subheading: string; features: readonly (readonly [string,string,string])[]; timeline?: boolean }) {
  return <section className={timeline ? "features timeline" : "features"}><div className="container"><div className="section-heading center"><span className="eyebrow">{eyebrow}</span><h2>{heading}</h2><p>{subheading}</p></div><div className="feature-list">{features.map(([title,text,image],index)=><article className="feature" key={title}><div className="feature-image"><img src={image} alt="" loading="lazy" /></div><div className="feature-copy"><h3>{title}</h3><p>{text}</p></div><span className="feature-dot" aria-hidden="true"></span></article>)}</div></div></section>;
}

export function Callout({ heading, text }: { heading: string; text: string }) {
  return <section className="callout" style={{ backgroundImage: `linear-gradient(rgba(0,0,0,.65),rgba(0,0,0,.65)),url('${assets.residential}')` }}><div className="container"><h2>{heading}</h2><p>{text}</p><ActionButtons /></div></section>;
}

export function Faqs() {
  return <section className="faq-section"><div className="container faq-layout"><div className="faq-intro"><h2>FAQs</h2><p>Have questions about renting a dumpster? Find quick answers to our most common inquiries below. If you don&apos;t see your question here, just give us a call!</p></div><div className="faq-items">{faqs.map(([question,answer])=><details key={question}><summary>{question}<span className="faq-plus" aria-hidden="true">+</span></summary><p>{answer}</p></details>)}<div className="faq-more"><h3>Still have questions?</h3><p>Our team is ready to help you find the perfect dumpster solution for your project.</p><a className="button outline" href="tel:+14802568784">Call Now</a></div></div></div></section>;
}

export function IndustryCards() {
  const cards = [
    { title:"Residential", text:"Perfect for home renovations, major cleanouts, landscaping projects, or roofing jobs. We help you choose the right size to handle all your residential debris easily and affordably.", href:"/residential-hub", image:assets.residential },
    { title:"Commercial & Contractors", text:"Keep your job site clean and efficient. We offer reliable, scheduled drop-offs and pickups for construction, demolition, and commercial waste, with priority service and pricing for our contractor partners.", href:"/contractors-hub", image:assets.contractors },
    { title:"HOA & Property Managers", text:"Manage community-wide cleanups, move-out debris, or renovation projects with ease. We provide flexible rental terms and multiple dumpster options to serve the needs of your properties and residents.", href:"/hoa-property-manager-hub", image:assets.hoa },
  ];
  return <section className="industries"><div className="container"><div className="section-heading center"><span className="eyebrow">Industries</span><h2>Solutions for <em>Every</em> Project</h2><p>Whether you&apos;re a homeowner clearing out a garage or a contractor managing a large job site, we provide tailored dumpster solutions to keep your project on track.</p></div><div className="industry-grid">{cards.map(card=><Link href={card.href} className="industry-card" key={card.href} style={{backgroundImage:`linear-gradient(180deg,transparent,rgba(0,0,0,.9)),url('${card.image}')`}}><div><h3>{card.title}</h3><p>{card.text}</p><span>Learn More →</span></div></Link>)}</div></div></section>;
}

export function GallerySection() { return <Gallery images={assets.gallery} />; }
