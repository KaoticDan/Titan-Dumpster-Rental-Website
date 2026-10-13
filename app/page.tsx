import { ActionButtons, Callout, Faqs, Features, GallerySection, Hero, IndustryCards, Pricing } from "./components";
import { assets } from "./data";

const advantages = [
  ["On Time, Every Time", "Your project runs on a schedule, and so do we. We guarantee on-time delivery to get you started without delay and prompt pickup once your job is complete. You can plan with confidence, knowing our team will be there when you need us.", assets.onTime],
  ["Straight Forward Pricing", "We believe in honest work at a fair price. Your quote clearly outlines all costs, including delivery, pickup, rental duration, and a generous weight allowance. With Titan, you'll never find hidden surcharges or surprise fees on your invoice.", assets.straightforward],
  ["Property Protection & Care", "Your property is our priority. Our experienced drivers are trained to carefully place your dumpster on a secure, level surface, using protective techniques to prevent any damage to your driveway, lawn, or landscaping. We treat your space with the care it deserves.", assets.care],
  ["An Effortless Rental Experience", "Contractors can benefit from special pricing options tailored for bulk orders. Contact us for customized quotes.", assets.effortless],
] as const;

export default function Home() {
  return <><Hero heading={<>Reliable Dumpster <em>Rentals</em> for Every Job</>} text="At Titan Dumpster Rental, we provide fast and affordable dumpster solutions tailored to your project. Whether you're a contractor, homeowner, or property manager, we have the right size and service for you." image={assets.hero} callText="Call Today" narrow /><IndustryCards /><Pricing /><Features eyebrow="Why Us" heading="The Titan Advantage" subheading="Discover why homeowners and contractors across the area trust us for service that goes beyond the basics." features={advantages} /><Callout heading="Get Free Quote Today" text="Ready to simplify your project? Rent a dumpster with us for fast and reliable service!" /><Faqs /><GallerySection /></>;
}
