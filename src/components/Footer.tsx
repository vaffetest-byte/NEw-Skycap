import { Button } from "@/components/ui/button";
import { Phone, Mail, MapPin, Facebook, Twitter, Linkedin, Instagram, ArrowRight } from "lucide-react";
import skycapitalLogo from "@/assets/skycapital-logo.png";

const Footer = () => {
  const serviceAreas = [
    { name: "Business Funding USA", href: "#products" },
    { name: "Small Business Loans", href: "#products" },
    { name: "MCA Funding Nationwide", href: "#products" },
    { name: "Working Capital Loans", href: "#products" },
    { name: "Fast Business Funding", href: "#products" }
  ];

  const fundingProducts = [
    { name: "Merchant Cash Advance", href: "#products" },
    { name: "Working Capital Loans", href: "#products" },
    { name: "Business Line of Credit", href: "#products" },
    { name: "Equipment Financing", href: "#products" },
    { name: "Invoice Factoring", href: "#products" },
    { name: "Revenue-Based Financing", href: "#products" }
  ];

  return (
    <footer className="bg-primary text-primary-foreground" role="contentinfo">
      {/* CTA Section - SEO optimized */}
      <div className="border-b border-white/10">
        <div className="container px-4 md:px-8 py-16">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
            <div>
              <h3 className="text-2xl md:text-3xl font-bold mb-2">
                Ready to Get the Business Funding You Need?
              </h3>
              <p className="text-primary-foreground/80">
                Apply now for fast approval MCA and working capital loans. Get funded in as little as 24 hours.
              </p>
            </div>
            <Button variant="accent" size="xl" asChild>
              <a 
                href="https://forms.zohopublic.com/skycapnow1/form/TimetoDriveYourBusinessForwardAreYouIn/formperma/n2L5-eBVJbTbpdVyxykY3VosikegBfB5UfccY72D5gA" 
                target="_blank" 
                rel="noopener noreferrer"
                aria-label="Apply for business funding"
              >
                Apply Now
                <ArrowRight className="w-5 h-5" aria-hidden="true" />
              </a>
            </Button>
          </div>
        </div>
      </div>

      {/* Main footer content */}
      <div className="container px-4 md:px-8 py-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Company info - SEO optimized */}
          <div className="lg:col-span-1">
            <img 
              src={skycapitalLogo} 
              alt="SkyCapital - Nationwide Business Funding Provider" 
              className="h-36 md:h-44 w-auto brightness-0 invert mb-4"
            />
            <p className="text-primary-foreground/70 mb-6">
              SkyCapital is a trusted nationwide business funding provider serving businesses across <strong>all 50 states</strong> since 2015. 
              We offer MCA, working capital loans, and small business financing with fast approval.
            </p>
            <div className="flex gap-4">
              <a 
                href="https://www.linkedin.com/company/sky-cap"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-lg bg-white/10 flex items-center justify-center hover:bg-[#0A66C2] transition-colors duration-300"
                aria-label="Follow SkyCapital on LinkedIn"
              >
                <Linkedin className="w-5 h-5" aria-hidden="true" />
              </a>
              <a 
                href="#"
                className="w-10 h-10 rounded-lg bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors duration-300"
                aria-label="Follow SkyCapital on Facebook"
              >
                <Facebook className="w-5 h-5" aria-hidden="true" />
              </a>
              <a 
                href="#"
                className="w-10 h-10 rounded-lg bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors duration-300"
                aria-label="Follow SkyCapital on Twitter"
              >
                <Twitter className="w-5 h-5" aria-hidden="true" />
              </a>
              <a 
                href="#"
                className="w-10 h-10 rounded-lg bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors duration-300"
                aria-label="Follow SkyCapital on Instagram"
              >
                <Instagram className="w-5 h-5" aria-hidden="true" />
              </a>
            </div>
          </div>

          {/* Funding Products - SEO optimized */}
          <div>
            <h4 className="font-bold mb-4">Business Funding Solutions</h4>
            <ul className="space-y-3">
              {fundingProducts.map((item) => (
                <li key={item.name}>
                  <a 
                    href={item.href} 
                    className="text-primary-foreground/70 hover:text-primary-foreground transition-colors duration-300"
                  >
                    {item.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Service Areas */}
          <div>
            <h4 className="font-bold mb-4">Why Choose Us</h4>
            <ul className="space-y-3">
              {serviceAreas.map((item) => (
                <li key={item.name}>
                  <a 
                    href={item.href} 
                    className="text-primary-foreground/70 hover:text-primary-foreground transition-colors duration-300"
                  >
                    {item.name}
                  </a>
                </li>
              ))}
            </ul>
            <p className="text-primary-foreground/50 text-sm mt-4">
              Serving businesses in all 50 states
            </p>
          </div>

          {/* Contact - SEO optimized */}
          <div>
            <h4 className="font-bold mb-4">Contact Us</h4>
            <ul className="space-y-4">
              <li>
                <a 
                  href="tel:5165230489" 
                  className="flex items-center gap-3 text-primary-foreground/70 hover:text-primary-foreground transition-colors duration-300 group"
                  aria-label="Call SkyCapital at (516)-523-0489"
                >
                  <span className="w-6 h-6 flex items-center justify-center">
                    <Phone className="w-6 h-6 text-accent group-hover:scale-110 transition-transform" aria-hidden="true" />
                  </span>
                  <span>(516)-523-0489</span>
                </a>
              </li>
              <li>
                <a 
                  href="mailto:info@skycapnow.com" 
                  className="flex items-center gap-3 text-primary-foreground/70 hover:text-primary-foreground transition-colors duration-300 group"
                  aria-label="Email SkyCapital support"
                >
                  <span className="w-6 h-6 flex items-center justify-center">
                    <Mail className="w-6 h-6 text-accent group-hover:scale-110 transition-transform" aria-hidden="true" />
                  </span>
                  <span>info@skycapnow.com</span>
                </a>
              </li>
              <li className="flex items-center gap-3">
                <span className="w-6 h-6 flex items-center justify-center">
                  <MapPin className="w-6 h-6 text-accent" aria-hidden="true" />
                </span>
                <span className="text-primary-foreground/70">
                  Nationwide Coverage
                </span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom bar - SEO optimized */}
      <div className="border-t border-white/10">
        <div className="container px-4 md:px-8 py-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-primary-foreground/60">
            <p>© {new Date().getFullYear()} SkyCapital - Nationwide Business Funding. All rights reserved.</p>
            <div className="flex gap-6">
              <a href="/privacy" className="hover:text-primary-foreground transition-colors duration-300">Privacy Policy</a>
              <a href="/terms" className="hover:text-primary-foreground transition-colors duration-300">Terms of Service</a>
              <a href="/disclosures" className="hover:text-primary-foreground transition-colors duration-300">Disclosures</a>
            </div>
          </div>
          <p className="text-xs text-primary-foreground/40 mt-4 text-center md:text-left">
            SkyCapital is a licensed financial services company providing business funding, MCA, and working capital loans to small businesses 
            across all 50 states. Funding products are subject to credit approval. Terms and conditions apply. This is not an offer to lend. Contact us for complete details.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;