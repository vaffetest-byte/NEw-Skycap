import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SEOHead from "@/components/SEOHead";
import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";

const Privacy = () => {
  return (
    <div className="min-h-screen bg-background">
      <SEOHead
        title="Privacy Policy | SkyCapital Business Funding"
        description="Learn how SkyCapital protects your personal and business information. Read our privacy policy for details on data collection, use, and security."
        canonicalUrl="https://skycapnow.com/privacy"
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

          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-8">Privacy Policy</h1>
          
          <div className="prose prose-lg max-w-none text-muted-foreground">
            <p className="text-lg mb-6">
              <strong>Last Updated:</strong> {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
            </p>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-foreground mb-4">1. Information We Collect</h2>
              <p className="mb-4">
                SkyCapital ("we," "our," or "us") collects information you provide directly to us, including but not limited to:
              </p>
              <ul className="list-disc pl-6 mb-4 space-y-2">
                <li>Personal identification information (name, email address, phone number)</li>
                <li>Business information (company name, industry, revenue)</li>
                <li>Financial information necessary for funding applications</li>
                <li>Communication records when you contact us</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-foreground mb-4">2. How We Use Your Information</h2>
              <p className="mb-4">We use the information we collect to:</p>
              <ul className="list-disc pl-6 mb-4 space-y-2">
                <li>Process and evaluate your funding applications</li>
                <li>Communicate with you about our services</li>
                <li>Improve our products and services</li>
                <li>Comply with legal and regulatory requirements</li>
                <li>Protect against fraudulent or unauthorized transactions</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-foreground mb-4">3. Information Sharing</h2>
              <p className="mb-4">
                We may share your information with third parties in the following circumstances:
              </p>
              <ul className="list-disc pl-6 mb-4 space-y-2">
                <li>With lending partners to facilitate funding</li>
                <li>With service providers who assist our operations</li>
                <li>When required by law or legal process</li>
                <li>To protect our rights and safety</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-foreground mb-4">4. Data Security</h2>
              <p className="mb-4">
                We implement appropriate technical and organizational measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-foreground mb-4">5. Cookies</h2>
              <p className="mb-4">
                We use cookies and similar tracking technologies to enhance your experience on our website. You can control cookie preferences through your browser settings.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-foreground mb-4">6. Your Rights</h2>
              <p className="mb-4">
                Depending on your location, you may have rights regarding your personal information, including the right to access, correct, or delete your data. Contact us to exercise these rights.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-foreground mb-4">7. Contact Us</h2>
              <p className="mb-4">
                For questions about this Privacy Policy, please contact us at:
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

export default Privacy;
