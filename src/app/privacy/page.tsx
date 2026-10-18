import type { Metadata } from "next";
import Link from "next/link";
import { LegalLayout } from "@/components/LegalLayout";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "How Agentra collects, uses, and protects personal data across its agentic supply chain platform.",
};

export default function PrivacyPage() {
  return (
    <LegalLayout
      eyebrow="Legal"
      title="Privacy Policy"
      updated="July 2026"
      intro="This policy explains what data Agentra B.V. collects, why we collect it, and the choices you have. We keep it plain and short on purpose."
      sections={[
        {
          heading: "Who we are",
          body: [
            "Agentra B.V. (“Agentra”, “we”, “us”) is the data controller for information processed through this website and our platform. We are headquartered in Amsterdam, with teams in Dubai, Delhi NCR, and St. Louis.",
          ],
        },
        {
          heading: "Data we collect",
          body: [
            "Information you give us: name, work email, company, and anything you include when you request a demo or contact us.",
            "Information collected automatically: device and browser details, pages visited, and approximate location, gathered through cookies and similar technologies.",
          ],
        },
        {
          heading: "How we use it",
          body: [
            "To respond to enquiries, provide and improve the platform, keep it secure, and send you material you have asked for. We do not sell your personal data.",
          ],
        },
        {
          heading: "Legal basis",
          body: [
            "We process personal data under legitimate interest, to perform a contract with you, to comply with legal obligations, or on the basis of your consent where required.",
          ],
        },
        {
          heading: "Sharing and retention",
          body: [
            "We share data only with vetted processors who help us run the service, and only under contract. We retain personal data for as long as needed for the purpose it was collected, then delete or anonymise it.",
          ],
        },
        {
          heading: "Your rights",
          body: [
            "Under the GDPR you may access, correct, delete, or port your data, and object to or restrict certain processing. To exercise any right, contact us and we will respond within the legal timeframe.",
          ],
        },
      ]}
    >
      <p className="mt-16 text-sm text-fg-muted">
        Using the Moove application? Its policy supplement is here:{" "}
        <Link href="/privacy/moove" className="link-glow font-medium text-fg">
          Moove Privacy Policy
        </Link>
        .
      </p>
    </LegalLayout>
  );
}
