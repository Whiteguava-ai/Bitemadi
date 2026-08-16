import PageHero from "@/components/PageHero";
import CTABanner from "@/components/CTABanner";

export default function TermsPage() {
  return (
    <>
      <PageHero
        title="Terms & Conditions"
        subtitle="Please read these terms carefully before using our services to understand rules, conditions, and guidelines clearly."
      />
      <article className="mx-auto max-w-3xl bg-cream px-5 py-12 text-[16px] leading-relaxed text-muted md:px-8 md:pb-24">
        <h4 className="font-display text-3xl uppercase text-brown">Terms Content</h4>
        <p className="mt-4">Last Updated: January 2026</p>

        <h4 className="mt-10 font-display text-3xl uppercase text-brown">
          1. General Terms
        </h4>
        <p className="mt-4">
          At Bite Maadi, we respect your privacy and are committed to protecting your
          personal information. This Privacy Policy outlines how we collect, use,
          store, and share your information when you use our website, services,
          or interact with us
        </p>

        <h4 className="mt-10 font-display text-3xl uppercase text-brown">
          2. Orders & Services
        </h4>
        <ul className="mt-4 space-y-2">
          <li>• All orders are subject to availability</li>
          <li>• We reserve the right to modify or cancel orders</li>
          <li>• Menu items and prices may change without notice</li>
        </ul>

        <h4 className="mt-10 font-display text-3xl uppercase text-brown">
          3. Reservations
        </h4>
        <ul className="mt-4 space-y-2">
          <li>• Reservations are subject to availability</li>
          <li>• Please arrive on time to avoid cancellation</li>
          <li>• Late arrivals may result in rescheduling</li>
        </ul>

        <h4 className="mt-10 font-display text-3xl uppercase text-brown">
          4. Payments
        </h4>
        <ul className="mt-4 space-y-2">
          <li>• Payment is required at the time of order or service</li>
          <li>• We accept major payment methods</li>
          <li>• Prices may include applicable taxes</li>
        </ul>

        <h4 className="mt-10 font-display text-3xl uppercase text-brown">
          5. Cancellations & Refunds
        </h4>
        <ul className="mt-4 space-y-2">
          <li>• Orders can be canceled within a limited time</li>
          <li>• Refunds are processed based on our policy</li>
          <li>• Late cancellations may not be eligible for refunds</li>
        </ul>

        <h4 className="mt-10 font-display text-3xl uppercase text-brown">
          6. User Responsibilities
        </h4>
        <ul className="mt-4 space-y-2">
          <li>• Provide accurate information</li>
          <li>• Do not misuse our services</li>
          <li>• Respect staff and policies</li>
        </ul>

        <h4 className="mt-10 font-display text-3xl uppercase text-brown">
          7. Intellectual Property
        </h4>
        <p className="mt-4">
          All content on this website, including text, images, and branding, is
          the property of Bite Maadi and may not be used without permission.
        </p>

        <h4 className="mt-10 font-display text-3xl uppercase text-brown">
          8. Limitation of Liability
        </h4>
        <p className="mt-4">
          We are not responsible for any indirect or incidental damages arising
          from the use of our services under any circumstances whatsoever.
        </p>

        <h4 className="mt-10 font-display text-3xl uppercase text-brown">
          9. Changes to Terms
        </h4>
        <p className="mt-4">
          We use your information to process orders, manage deliveries, improve
          our services, personalize your experience, respond to inquiries, and
          send updates or offers, while ensuring your data is kept secure and
          used responsibly.
        </p>

        <h4 className="mt-10 font-display text-3xl uppercase text-brown">
          10. Contact
        </h4>
        <p className="mt-4">
          For any questions regarding these terms, please contact us through our
          website anytime for quick assistance, clear answers, and helpful
          customer support.
        </p>
      </article>
      <CTABanner />
    </>
  );
}
