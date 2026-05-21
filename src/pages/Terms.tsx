import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SEOHead from "@/components/SEOHead";
import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";

const Terms = () => {
  return (
    <div className="min-h-screen bg-background">
      <SEOHead
        title="Terms of Service | SkyCapital Business Funding"
        description="Read SkyCapital's terms of service. Understand the conditions for using our business funding services, eligibility requirements, and user responsibilities."
        canonicalUrl="https://skycapnow.com/terms"
      />
      <Navbar />
      
      <main className="pt-40 pb-20">
        <div className="container px-4 md:px-8 max-w-4xl">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-8 group"
          >
            <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
            Back to Home
          </Link>

          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-8">Terms of Service</h1>
          
          <div className="prose prose-lg max-w-none text-muted-foreground">
            <p className="text-lg mb-6">
              <strong>Last Updated:</strong> {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
            </p>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-foreground mb-4">1. Acceptance of Terms</h2>
              <p className="mb-4">
                By accessing or using SkyCapital's website and services, you agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use our services.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-foreground mb-4">2. Services Description</h2>
              <p className="mb-4">
                SkyCapital provides business funding solutions including Merchant Cash Advance (MCA), working capital loans, equipment financing, and other financial products. We connect businesses with funding opportunities but are not a direct lender for all products.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-foreground mb-4">3. Eligibility</h2>
              <p className="mb-4">To use our services, you must:</p>
              <ul className="list-disc pl-6 mb-4 space-y-2">
                <li>Be at least 18 years of age</li>
                <li>Be a business owner or authorized representative</li>
                <li>Provide accurate and complete information</li>
                <li>Have the legal authority to bind your business</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-foreground mb-4">4. Application Process</h2>
              <p className="mb-4">
                Submitting an application does not guarantee approval. All funding decisions are subject to our underwriting criteria and the terms of our lending partners. Approval rates and terms may vary.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-foreground mb-4">5. User Responsibilities</h2>
              <p className="mb-4">You agree to:</p>
              <ul className="list-disc pl-6 mb-4 space-y-2">
                <li>Provide truthful and accurate information</li>
                <li>Keep your account information secure</li>
                <li>Notify us of any unauthorized use</li>
                <li>Comply with all applicable laws and regulations</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-foreground mb-4">6. Intellectual Property</h2>
              <p className="mb-4">
                All content on this website, including text, graphics, logos, and software, is the property of SkyCapital and is protected by intellectual property laws.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-foreground mb-4">7. Limitation of Liability</h2>
              <p className="mb-4">
                SkyCapital shall not be liable for any indirect, incidental, special, or consequential damages arising from your use of our services or inability to access our services.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-foreground mb-4">8. Changes to Terms</h2>
              <p className="mb-4">
                We reserve the right to modify these terms at any time. Continued use of our services after changes constitutes acceptance of the new terms.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-foreground mb-4">9. Contact Us</h2>
              <p className="mb-4">
                For questions about these Terms of Service, please contact us at:
              </p>
              <p className="mb-2"><strong>Email:</strong> info@skycapnow.com</p>
              <p className="mb-2"><strong>Phone:</strong> (516)-523-0489</p>
            </section>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Terms;
