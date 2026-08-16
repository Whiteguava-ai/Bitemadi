"use client";

import { useState } from "react";
import Link from "next/link";
import PageHero from "@/components/PageHero";
import CTABanner from "@/components/CTABanner";
import { images } from "@/lib/images";

export default function ContactPage() {
  const [sent, setSent] = useState(false);

  return (
    <>
      <PageHero
        title="We’re Here to Serve You Better"
        subtitle="Have a question, feedback, or planning an event? Reach out to us — we’d love to hear from you anytime with quick, friendly support."
      />
      <section className="bg-cream px-5 py-16 md:px-8 md:pb-24">
        <div className="mx-auto grid max-w-[1100px] items-start gap-10 lg:grid-cols-[1fr_0.7fr]">
          <form
            className="grid gap-4 rounded-[32px] bg-white/50 p-6 md:grid-cols-2 md:p-10"
            onSubmit={(e) => {
              e.preventDefault();
              setSent(true);
            }}
          >
            <label className="block text-sm text-muted">
              First Name
              <input
                required
                name="first"
                className="mt-2 w-full rounded-2xl border border-brown/15 bg-cream px-4 py-3 text-brown"
              />
            </label>
            <label className="block text-sm text-muted">
              Last Name
              <input
                required
                name="last"
                className="mt-2 w-full rounded-2xl border border-brown/15 bg-cream px-4 py-3 text-brown"
              />
            </label>
            <label className="block text-sm text-muted">
              Email Address
              <input
                required
                type="email"
                name="email"
                className="mt-2 w-full rounded-2xl border border-brown/15 bg-cream px-4 py-3 text-brown"
              />
            </label>
            <label className="block text-sm text-muted">
              Phone Number
              <input
                name="phone"
                placeholder="+91"
                className="mt-2 w-full rounded-2xl border border-brown/15 bg-cream px-4 py-3 text-brown"
              />
            </label>
            <label className="block text-sm text-muted md:col-span-2">
              City
              <input
                name="city"
                defaultValue="Manipal"
                className="mt-2 w-full rounded-2xl border border-brown/15 bg-cream px-4 py-3 text-brown"
              />
            </label>
            <label className="block text-sm text-muted md:col-span-2">
              Message
              <textarea
                required
                name="message"
                rows={5}
                className="mt-2 w-full resize-none rounded-2xl border border-brown/15 bg-cream px-4 py-3 text-brown"
              />
            </label>
            <button
              type="submit"
              className="rounded-full bg-burgundy px-8 py-3.5 text-white transition hover:bg-burgundy-dark md:col-span-2"
            >
              {sent ? "Message Sent" : "Send Message"}
            </button>
          </form>
          <div className="space-y-5">
            <div className="overflow-hidden rounded-[32px]">
              <img
                src={images.contactArt}
                alt="Bite Maadi restaurant"
                className="h-[280px] w-full object-cover lg:h-[320px]"
              />
            </div>
            <Link
              href="/book"
              className="block rounded-[28px] bg-burgundy p-6 text-white transition hover:bg-burgundy-dark"
            >
              <p className="text-sm text-gold">Reservations</p>
              <p className="mt-1 font-display text-3xl uppercase">Book a Table</p>
              <p className="mt-2 text-sm text-white/75">
                Pick a date, time, and party size — we’ll save your seat.
              </p>
            </Link>
          </div>
        </div>
      </section>
      <CTABanner />
    </>
  );
}
