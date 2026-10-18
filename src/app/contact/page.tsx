import type { Metadata } from "next";
import { ContactForm } from "@/components/ContactForm";

export const metadata: Metadata = {
  title: "Book a demo",
  description:
    "See Agentra in your supply chain. Book a 30-minute demo and we will map a real use case for a production agent, live in 6 to 8 weeks.",
};

export default function ContactPage() {
  return <ContactForm />;
}
