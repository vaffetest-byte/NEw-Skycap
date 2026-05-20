import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import TrustBadges from "@/components/TrustBadges";
import ProductsGrid from "@/components/ProductsGrid";
import WhyChooseUs from "@/components/WhyChooseUs";
import FundingProcess from "@/components/FundingProcess";
import Testimonials from "@/components/Testimonials";
import LenderComparison from "@/components/LenderComparison";
import IndustrySolutions from "@/components/IndustrySolutions";
import CaseStudies from "@/components/CaseStudies";
import TeamAdvisors from "@/components/TeamAdvisors";
import FaqSection from "@/components/FaqSection";
import StickyCTA from "@/components/StickyCTA";
import Footer from "@/components/Footer";
import SEOHead from "@/components/SEOHead";

const Index = () => {
  return (
    <main className="min-h-screen bg-background antialiased selection:bg-accent selection:text-accent-foreground">
      <SEOHead
        title="Fast Business Funding Nationwide | MCA & Working Capital Loans | SkyCapital"
        description="SkyCapital provides fast business funding nationwide across all 50 states. Get MCA, working capital loans & small business loans with 95% approval. Same-day approval, funding in 24-48 hours."
        canonicalUrl="https://skycapnow.com/"
        ogImage="https://skycapnow.com/og-image.jpg"
      />
      <Navbar />
      <Hero />
      <TrustBadges />
      <section id="products">
        <ProductsGrid />
      </section>
      <LenderComparison />
      <section id="process">
        <FundingProcess />
      </section>
      <IndustrySolutions />
      <section id="why-us">
        <WhyChooseUs />
      </section>
      <CaseStudies />
      <section id="testimonials">
        <Testimonials />
      </section>
      <TeamAdvisors />
      <FaqSection />
      <Footer />
      <StickyCTA />
    </main>
  );
};

export default Index;
