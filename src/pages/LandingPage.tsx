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
        title="PostZaper - Save & Organize Your Twitter & LinkedIn Bookmarks"
        description="Never lose valuable content again. PostZaper helps you save, organize, and revisit your favorite posts from Twitter and LinkedIn with our powerful Chrome extension."
        keywords="bookmark manager, twitter bookmarks, linkedin bookmarks, save tweets, social media organizer, content curation, chrome extension"
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
