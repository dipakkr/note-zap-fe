import Hero from "@/components/landing/Hero";
import Problem from "@/components/landing/Problem";
import HowItWorks from "@/components/landing/HowItWorks";
import Comparison from "@/components/landing/Comparison";
import Pricing from "@/components/landing/Pricing";
import FAQ from "@/components/landing/FAQ";
import FinalCTA from "@/components/landing/FinalCTA";
import SEO from "@/components/SEO";


const LandingPage = () => {
  return (
    <>
      <SEO
        title="PostZaper - Bookmark Posts from X & LinkedIn. Find Them Instantly."
        description="Save posts from X and LinkedIn with one click. Organize into collections, search instantly, and never lose a great piece of content again."
        keywords="bookmark manager, twitter bookmarks, linkedin bookmarks, save tweets, social media organizer, content curation, chrome extension"
      />
      <Hero />
      <Problem />
      <HowItWorks />
      <Comparison />
      <Pricing />
      <FAQ />
      <FinalCTA />
    </>
  );
};

export default LandingPage;
