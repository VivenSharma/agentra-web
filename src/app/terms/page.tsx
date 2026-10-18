import type { Metadata } from "next";
import { LegalLayout } from "@/components/LegalLayout";

export const metadata: Metadata = {
  title: "Terms of Service",
  description:
    "The terms that govern your use of the Agentra website and agentic supply chain platform.",
};

export default function TermsPage() {
  return (
    <LegalLayout
      eyebrow="Legal"
      title="Terms of Service"
      updated="July 2026"
      intro="These terms govern your access to and use of the Agentra website and platform. By using them, you agree to what follows."
      sections={[
        {
          heading: "Acceptance",
          body: [
            "By accessing this website or using the Agentra platform you agree to these terms. If you are agreeing on behalf of an organisation, you confirm you have authority to bind that organisation.",
          ],
        },
        {
          heading: "Use of the service",
          body: [
            "You may use the platform only for lawful purposes and in line with any order form or agreement between us. You will not attempt to disrupt, reverse engineer, or gain unauthorised access to the service.",
          ],
        },
        {
          heading: "Accounts",
          body: [
            "You are responsible for the security of your account credentials and for all activity that occurs under your account. Tell us immediately if you suspect unauthorised use.",
          ],
        },
        {
          heading: "Intellectual property",
          body: [
            "The platform, this website, and all associated content are owned by Agentra or its licensors. These terms grant you a limited, non-exclusive right to use the service; they transfer no ownership.",
          ],
        },
        {
          heading: "Disclaimers and liability",
          body: [
            "The service is provided on an “as is” basis to the extent permitted by law. Agentra is not liable for indirect or consequential losses. Nothing in these terms limits liability that cannot be limited by law.",
          ],
        },
        {
          heading: "Governing law",
          body: [
            "These terms are governed by the laws of the Netherlands, and the courts of Amsterdam have exclusive jurisdiction over any dispute, unless a separate signed agreement states otherwise.",
          ],
        },
      ]}
    />
  );
}
