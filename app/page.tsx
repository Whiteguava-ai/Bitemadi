import Hero from "@/components/home/Hero";
import {
  Categories,
  MenuPreview,
  AboutPreview,
  WhyUs,
  CateringPreview,
  Gallery,
  BlogPreview,
} from "@/components/home/HomeSections";
import OfferCards from "@/components/OfferCards";
import Testimonials from "@/components/Testimonials";
import FAQ from "@/components/FAQ";
import CTABanner from "@/components/CTABanner";

export default function HomePage() {
  return (
    <>
      <Hero />
      <Categories />
      <OfferCards />
      <MenuPreview />
      <AboutPreview />
      <WhyUs />
      <CateringPreview />
      <Testimonials />
      <FAQ />
      <Gallery />
      <BlogPreview />
      <CTABanner />
    </>
  );
}
