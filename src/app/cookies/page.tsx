import type { Metadata } from "next";
import { LegalLayout } from "@/components/LegalLayout";

export const metadata: Metadata = {
  title: "Cookie Policy",
  description:
    "How Agentra uses cookies and similar technologies, and how you can control them.",
};

export default function CookiesPage() {
  return (
    <LegalLayout
      eyebrow="Legal"
      title="Cookie Policy"
      updated="July 2026"
      intro="This policy explains how Agentra uses cookies and similar technologies on this website, and how you can control them."
      sections={[
        {
          heading: "What cookies are",
          body: [
            "Cookies are small text files stored on your device when you visit a website. They let the site remember your actions and preferences over time.",
          ],
        },
        {
          heading: "Cookies we use",
          body: [
            "Essential cookies keep the site secure and working, and cannot be switched off.",
            "Analytics cookies help us understand how the site is used so we can improve it. These run only with your consent.",
            "Preference cookies remember choices such as language or region.",
          ],
        },
        {
          heading: "Managing cookies",
          body: [
            "You can accept or reject non-essential cookies through the banner shown on your first visit, and change your choice at any time in your browser settings. Blocking some cookies may affect how the site works.",
          ],
        },
        {
          heading: "Third parties",
          body: [
            "Some analytics cookies are set by trusted third-party providers who process data on our behalf under contract. We do not use cookies to sell your data.",
          ],
        },
      ]}
    />
  );
}
