import PageHero from "@/components/PageHero";
import CTABanner from "@/components/CTABanner";

export default function PrivacyPage() {
  return (
    <>
      <PageHero
        title="Privacy Policy"
        subtitle="We value your privacy and are committed to protecting your personal information with strict security measures, safe handling, and complete confidentiality."
      />
      <article className="mx-auto max-w-3xl bg-cream px-5 py-12 text-[16px] leading-relaxed text-muted md:px-8 md:pb-24">
        <p>Last Updated: January 2026</p>
        <h4 className="mt-10 font-display text-3xl uppercase text-brown">
          Information We Collect
        </h4>
        <p className="mt-4">
          We may collect personal information such as your name, email address,
          phone number, and other details when you place an order, book a
          service, or contact us.
        </p>
        <p className="mt-4">
          We also collect non-personal information like browser type, device
          details, and usage data to improve our services.
        </p>
        <h4 className="mt-10 font-display text-3xl uppercase text-brown">
          How We Use Your Information
        </h4>
        <p className="mt-4">
          We use your information to process orders, manage deliveries, improve
          our services, personalize your experience, respond to inquiries, and
          send updates or offers, while ensuring your data is kept secure and
          used responsibly.
        </p>
        <p className="mt-4 font-medium text-brown">We use your information to:</p>
        <ul className="mt-3 space-y-2">
          <li>• Process orders and reservations</li>
          <li>• Improve our website and services</li>
          <li>• Communicate updates and offers</li>
          <li>• Respond to inquiries and support requests</li>
        </ul>
        <h4 className="mt-10 font-display text-3xl uppercase text-brown">
          Sharing of Information
        </h4>
        <p className="mt-4">
          At Bite Maadi, we respect your privacy and are committed to protecting your
          personal information. This Privacy Policy outlines how we collect, use,
          store, and share your information when you use
        </p>
        <h4 className="mt-10 font-display text-3xl uppercase text-brown">
          Cookies & Tracking
        </h4>
        <p className="mt-4">
          We use cookies to enhance your browsing experience and analyze website
          traffic. You can manage cookie preferences through your browser
          settings.
        </p>
        <h4 className="mt-10 font-display text-3xl uppercase text-brown">
          Your Rights
        </h4>
        <p className="mt-4 font-medium text-brown">You have the right to:</p>
        <ul className="mt-3 space-y-2">
          <li>• Access your personal data</li>
          <li>• Request corrections</li>
          <li>• Request deletion of your data</li>
        </ul>
        <h4 className="mt-10 font-display text-3xl uppercase text-brown">
          Contact Us
        </h4>
        <p className="mt-4">
          If you have any questions about this Privacy Policy, please contact us
          through our website or support email.
        </p>
        <h4 className="mt-10 font-display text-3xl uppercase text-brown">
          Updates to This Policy
        </h4>
        <p className="mt-4">
          We may update this Privacy Policy from time to time. Changes will be
          posted on this page and take effect immediately thereafter.
        </p>
      </article>
      <CTABanner />
    </>
  );
}
