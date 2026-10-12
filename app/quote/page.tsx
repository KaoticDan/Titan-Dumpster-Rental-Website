import type { Metadata } from "next";
import { Faqs, Pricing } from "../components";
import { QuoteForm } from "./quote-form";

export const metadata: Metadata = { title: "Get a Free Dumpster Rental Quote | Titan Dumpster Rental", description: "Get a fast, all-inclusive quote for your dumpster rental. Just tell us about your project, and we'll provide a transparent price with no hidden fees." };

export default function QuotePage() { return <><QuoteForm /><Pricing /><Faqs /></>; }
