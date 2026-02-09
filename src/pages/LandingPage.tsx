import Hero from "@/components/landing/Hero";
import TrustedBy from "@/components/landing/TrustedBy";
import Problem from "@/components/landing/Problem";
import HowItWorks from "@/components/landing/HowItWorks";
import Features from "@/components/landing/Features";
import FeatureShowcase from "@/components/landing/FeatureShowcase";
import UseCases from "@/components/landing/UseCases";
import Testimonials from "@/components/landing/Testimonials";
import Comparison from "@/components/landing/Comparison";
import Pricing from "@/components/landing/Pricing";
import FAQ from "@/components/landing/FAQ";
import FinalCTA from "@/components/landing/FinalCTA";
import SEO from "@/components/SEO";


const LandingPage = () => {
  return (
    <>
      <SEO
        title="PostZaper - Save Posts, Generate Content, Own Your Feed"
        description="Bookmark the best posts from X & LinkedIn, then turn them into original content with AI. One-click save, AI Content Studio, collections, and calendar scheduling — all from one dashboard."
        keywords="bookmark manager, twitter bookmarks, linkedin bookmarks, save tweets, social media organizer, content curation, chrome extension, ai content generation, content studio"
      />
      <Hero />
      <TrustedBy />
      <Problem />
      <HowItWorks />
      <Features />
      <FeatureShowcase />
      <UseCases />
      <Testimonials />
      <Comparison />
      <Pricing />
      <FAQ />
      <FinalCTA />
    </>
  );
};

export default LandingPage;
