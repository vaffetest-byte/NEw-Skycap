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
import FaqSection from "@/components/FaqSection";
import StickyCTA from "@/components/StickyCTA";
import Footer from "@/components/Footer";
import SEOHead from "@/components/SEOHead";

const Index = () => {
  const indexSchemas = [
    {
      "@context": "https://schema.org",
      "@type": "Organization",
      "name": "SkyCapital",
      "url": "https://skycapnow.com/",
      "logo": "https://skycapnow.com/logo.png",
      "contactPoint": {
        "@type": "ContactPoint",
        "telephone": "+1-516-523-0489",
        "contactType": "customer service",
        "email": "info@skycapnow.com",
        "areaServed": "US",
        "availableLanguage": "en"
      },
      "description": "SkyCapital provides fast business funding nationwide across all 50 states. Get MCA, working capital loans & small business loans with 95% approval."
    },
    {
      "@context": "https://schema.org",
      "@type": "FinancialProduct",
      "name": "Small Business Loans & Merchant Cash Advances (MCA)",
      "description": "Unsecured business financing solutions up to $5,000,000 with same-day approvals and 24-48 hour funding.",
      "provider": {
        "@type": "Organization",
        "name": "SkyCapital",
        "url": "https://skycapnow.com/"
      },
      "offers": {
        "@type": "Offer",
        "priceCurrency": "USD",
        "price": "0"
      },
      "interestRate": "Factor rates starting at 1.11",
      "feesAndCommissionsSpecification": "No application fees. All terms clearly disclosed before acceptance.",
      "amount": {
        "@type": "MonetaryAmount",
        "currency": "USD",
        "minValue": "5000",
        "maxValue": "5000000"
      }
    },
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "mainEntity": [
        {
          "@type": "Question",
          "name": "What are the requirements to qualify for business funding?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Our basic requirements are extremely simple compared to traditional banks: 1) Minimum of 6 months in business, 2) Minimum of $10,000 in monthly gross revenue, and 3) An active business bank account. We accept all credit profiles and focus primarily on your business performance rather than personal credit scores."
          }
        },
        {
          "@type": "Question",
          "name": "How fast is the funding process from application to cash?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "We offer some of the fastest turnaround times in the alternative lending industry. Once you complete our 5-minute online pre-qualification, you will receive funding decisions within 2 to 4 hours. Upon selecting a program and executing the agreement, funds are typically wired directly to your account within 24 to 48 hours."
          }
        },
        {
          "@type": "Question",
          "name": "What is a Merchant Cash Advance (MCA) and how does it work?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "A Merchant Cash Advance (MCA) is not a loan, but rather the sale of future business receivables at a discount. In exchange for immediate lump-sum cash, you agree to repay the advance with a small, set percentage of your future daily credit card or bank deposit sales. This is ideal for seasonal businesses because payments adjust dynamically based on your actual revenue flow."
          }
        },
        {
          "@type": "Question",
          "name": "Do I need to pledge collateral or personal assets?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "No, most of our funding products—including Merchant Cash Advances, revenue-based financing, and standard working capital loans—are completely unsecured. You do not need to pledge personal real estate, equipment, or business assets to qualify for funding."
          }
        },
        {
          "@type": "Question",
          "name": "Can my business qualify if I have a low personal credit score?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Absolutely. Traditional banks rely heavily on FICO credit scores, leading to high rejection rates. At SkyCapital, we believe credit scores don't tell the whole story. We analyze the health, cash flow, bank deposits, and transaction history of your business. As long as your business meets our monthly deposit requirements, we can secure options."
          }
        },
        {
          "@type": "Question",
          "name": "What industries do you serve?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "We serve a wide variety of commercial sectors across all 50 states. Common industries include Construction, Retail, Restaurants, Dental and Medical Practices, Logistics, Auto Repair, Wholesalers, and Professional Services. We offer tailored programs designed to match the unique cash flow cycle of your specific sector."
          }
        }
      ]
    }
  ];

  return (
    <main className="min-h-screen bg-background antialiased selection:bg-accent selection:text-accent-foreground">
      <SEOHead
        title="Best Small Business Loans & MCA Funding Nationwide | SkyCapital"
        description="Compare and apply for fast small business loans, working capital loans, and merchant cash advances (MCA) from $5k to $5M. 95% approval rate. Get funded in 24-48 hours."
        canonicalUrl="https://skycapnow.com/"
        ogImage="https://skycapnow.com/og-image.jpg"
        jsonLd={indexSchemas}
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
      <FaqSection />
      <Footer />
      <StickyCTA />
    </main>
  );
};

export default Index;
