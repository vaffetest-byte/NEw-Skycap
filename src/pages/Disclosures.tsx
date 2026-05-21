import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SEOHead from "@/components/SEOHead";
import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";

const Disclosures = () => {
  return (
    <div className="min-h-screen bg-background">
      <SEOHead
        title="Disclosures | SkyCapital Business Funding"
        description="Important disclosures about SkyCapital's business funding services, MCA terms, SBA loans, rates, fees, and state licensing information."
        canonicalUrl="https://skycapnow.com/disclosures"
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

          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-8">Disclosures</h1>
          
          <div className="prose prose-lg max-w-none text-muted-foreground">
            <section className="mb-8">
              <h2 className="text-2xl font-bold text-foreground mb-4">General Disclosures</h2>
              <p className="mb-4">
                SkyCapital is not a direct lender. We work with a network of lending partners to provide funding solutions for businesses. The terms, rates, and conditions of funding are determined by the respective lenders.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-foreground mb-4">Funding Terms</h2>
              <ul className="list-disc pl-6 mb-4 space-y-2">
                <li>Funding amounts range from $5,000 to $5,000,000</li>
                <li>Approval is subject to business qualifications and lender criteria</li>
                <li>Rates and terms vary based on business profile and product type</li>
                <li>The 95% approval rate is based on qualified applications</li>
                <li>24-48 hour funding timeline is for approved applications with complete documentation</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-foreground mb-4">Merchant Cash Advance (MCA) Disclosure</h2>
              <p className="mb-4">
                A Merchant Cash Advance is not a loan. It is a purchase of future receivables at a discount. Repayment is typically made through a percentage of daily credit card sales or fixed daily/weekly ACH debits.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-foreground mb-4">SBA Loan Disclosure</h2>
              <p className="mb-4">
                SBA loans are provided through our partner network. SkyCapital facilitates connections but is not an SBA lender. All SBA loans are subject to SBA guidelines and lender approval.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-foreground mb-4">Rate and Fee Disclosure</h2>
              <p className="mb-4">
                The cost of funding varies based on:
              </p>
              <ul className="list-disc pl-6 mb-4 space-y-2">
                <li>Type of funding product</li>
                <li>Business revenue and time in business</li>
                <li>Credit profile of business and owner(s)</li>
                <li>Industry and business model</li>
                <li>Repayment term selected</li>
              </ul>
              <p className="mb-4">
                All rates, fees, and terms will be clearly disclosed before you accept any funding offer.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-foreground mb-4">No Guarantee</h2>
              <p className="mb-4">
                Submitting an application does not guarantee approval or any specific terms. Past performance and success stories are not guarantees of future results.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-foreground mb-4">State Licensing</h2>
              <p className="mb-4">
                SkyCapital operates in compliance with applicable state and federal regulations. Certain products may not be available in all states.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-foreground mb-4">Contact for Questions</h2>
              <p className="mb-4">
                If you have questions about our disclosures or funding products:
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

export default Disclosures;
