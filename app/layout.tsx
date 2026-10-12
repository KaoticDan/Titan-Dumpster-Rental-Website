import type { Metadata } from "next";
import { Header, Footer } from "./components";
import "./globals.css";
import "./hero-tuning.css";
import "./industry-interactions.css";

export const metadata: Metadata = {
  title: "Dumpster Rental in Tuscon Arizona | On-Time Service | Titan Dumpster Rental",
  description: "Titan Dumpster Rental provides fast and affordable dumpster solutions for homeowners, contractors, and property managers.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return <html lang="en"><body><Header /><main>{children}</main><Footer /></body></html>;
}
