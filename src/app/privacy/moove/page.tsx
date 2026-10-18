import type { Metadata } from "next";
import Link from "next/link";
import { LegalLayout } from "@/components/LegalLayout";

export const metadata: Metadata = {
  title: "Moove Privacy Policy",
  description:
    "How Agentra collects, uses, and protects personal data in the Moove application, including the device permissions the app requests.",
};

export default function MoovePrivacyPage() {
  return (
    <LegalLayout
      eyebrow="Legal"
      title="Moove Privacy Policy"
      updated="September 2026"
      intro="This is a product-specific supplement to our general Privacy Policy. It covers what the Moove application collects, the device permissions it asks for, and why."
      sections={[
        {
          heading: "Who we are and what this covers",
          body: [
            "Agentra B.V. (“Agentra”, “we”, “us”) is the data controller for personal data processed through the Moove application. We are headquartered in Amsterdam, with teams in Dubai, Delhi NCR, and St. Louis.",
            "This policy sits underneath our general Privacy Policy and addresses only what is specific to Moove. Anything it does not cover is governed by the general policy, and where the two overlap, the general policy applies.",
          ],
        },
        {
          heading: "Data we collect",
          body: [
            "Information you give us when you create a Moove account: name, gender, date of birth, email address, address, mobile number, and payment details. Some of these are required to open an account and use the service, and we will tell you which at the point we ask.",
            "Information collected automatically through the app: device and app version details, usage data about the features you interact with, and your location where you have granted that permission.",
            "You are responsible for keeping your account details accurate, and for having the authority to enter another person’s details into the app if you do so.",
          ],
        },
        {
          heading: "How we use it",
          body: [
            "To create and manage your account, operate the app, and give you access to the features you have signed up for.",
            "To process and validate transactions and payments, fulfil orders, and keep records of them.",
            "To provide support, answer your questions, and send service messages about updates or changes.",
            "To keep the service secure, prevent fraud, run analytics that help us improve it, and meet our legal and reporting obligations. We do not sell your personal data.",
          ],
        },
        {
          heading: "Legal basis",
          body: [
            "We process personal data to perform our contract with you, on the basis of our legitimate interest in operating and improving the service, to comply with legal obligations, or on the basis of your consent where the law requires it.",
            "Device permissions, location data, and marketing messages rely on your consent. You can withdraw it at any time without affecting processing that has already taken place.",
          ],
        },
        {
          heading: "App permissions",
          body: [
            "Location: used for logistics management, workforce safety, and operational efficiency. Where your organisation has deployed Moove, location may be visible to them for those purposes.",
            "Storage: used to save and retrieve documents securely within the app.",
            "Alarms: used to set reminders for tasks and events related to the service.",
            "Notifications: used to send alerts, service updates, and messages you have opted into.",
            "Every one of these permissions is optional and can be withdrawn in your device settings. Declining one limits only the feature that depends on it.",
          ],
        },
        {
          heading: "Cookies and similar technologies",
          body: [
            "We and our processors use cookies and similar technologies to keep you signed in, remember your preferences, and understand how the app is used. You can accept, manage, or refuse them in your device or browser settings. Our Cookie Policy covers this in more detail.",
          ],
        },
        {
          heading: "Sharing and retention",
          body: [
            "We share personal data only with vetted processors who help us run the service, and only under contract.",
            "We may disclose personal data where we are legally compelled to, under a court order or a binding request from a regulatory, tax, law enforcement, or judicial authority. This does not affect the rights set out below.",
            "Personal data is held behind access controls and encrypted in our databases. We retain it for as long as needed for the purpose it was collected, then delete or anonymise it. Where the app links to third-party services, their own policies govern what you give them.",
          ],
        },
        {
          heading: "Your rights",
          body: [
            "Under the GDPR you may access, correct, delete, or port your data, and object to or restrict certain processing. You may also withdraw any consent you have given, and complain to your local data protection authority — in the Netherlands, the Autoriteit Persoonsgegevens.",
            "To exercise any right, contact us and we will respond within the legal timeframe.",
          ],
        },
        {
          heading: "Changes to this policy",
          body: [
            "We review this policy periodically and may update it. Revisions are posted on this page with a new date above. Where a change materially affects how we use your data, we will tell you through the app or by email.",
          ],
        },
      ]}
    >
      <p className="mt-16 text-sm text-fg-muted">
        This supplement covers the Moove application only. For everything else,
        see our{" "}
        <Link href="/privacy" className="link-glow font-medium text-fg">
          general Privacy Policy
        </Link>
        .
      </p>
    </LegalLayout>
  );
}
