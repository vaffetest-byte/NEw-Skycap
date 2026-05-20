import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X, Phone } from "lucide-react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import skycapitalLogo from "@/assets/skycapital-logo.png";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { label: "Financial Solutions", href: "#products" },
    { label: "Industries", href: "#industries" },
    { label: "Process", href: "#process" },
    { label: "Why Us", href: "#why-us" },
    { label: "FAQ", href: "#faq" },
    { label: "Funding Blog", href: "/blog", isPage: true },
  ];

  const handleNavClick = (href: string) => {
    if (location.pathname !== "/") {
      // Navigate to home page first, then scroll to section
      navigate("/");
      setTimeout(() => {
        const element = document.querySelector(href);
        if (element) {
          element.scrollIntoView({ behavior: "smooth" });
        }
      }, 100);
    } else {
      // Already on home page, just scroll
      const element = document.querySelector(href);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  return (
    <nav 
      className={`fixed top-0 left-0 right-0 z-50 border-b transition-all duration-300 ${
        isScrolled 
          ? "bg-primary/95 backdrop-blur-xl border-white/10 shadow-elevated" 
          : "glass-dark border-white/10"
      }`}
    >
      <div className="container px-4 md:px-8">
        <div className={`flex items-center justify-between transition-all duration-300 ${
          isScrolled ? "h-24" : "h-32"
        }`}>
          {/* Logo */}
          <Link to="/" className="flex items-center">
            <img 
              src={skycapitalLogo} 
              alt="SkyCapital - Nationwide Business Funding for MCA, Working Capital & Small Business Loans" 
              loading="eager"
              decoding="async"
              className={`w-auto brightness-0 invert transition-all duration-300 ${
                isScrolled ? "h-32 md:h-36" : "h-40 md:h-48"
              }`}
            />
          </Link>

          {/* Desktop navigation */}
          <div className="hidden lg:flex items-center gap-6">
            {navLinks.map((link) => (
              link.isPage ? (
                <Link
                  key={link.label}
                  to={link.href}
                  className="text-white/80 hover:text-white transition-colors duration-300 font-medium text-sm relative after:absolute after:bottom-0 after:left-0 after:w-full after:h-0.5 after:bg-accent after:scale-x-0 hover:after:scale-x-100 after:transition-transform after:duration-300 after:origin-left"
                >
                  {link.label}
                </Link>
              ) : (
                <button
                  key={link.label}
                  onClick={() => handleNavClick(link.href)}
                  className="text-white/80 hover:text-white transition-colors duration-300 font-medium text-sm relative after:absolute after:bottom-0 after:left-0 after:w-full after:h-0.5 after:bg-accent after:scale-x-0 hover:after:scale-x-100 after:transition-transform after:duration-300 after:origin-left"
                >
                  {link.label}
                </button>
              )
            ))}
          </div>

          {/* Desktop CTA */}
          <div className="hidden lg:flex items-center gap-3">
            <a href="tel:5165230489" className="flex items-center gap-1.5 text-white hover:text-accent transition-all duration-500 group">
              <Phone className="w-3.5 h-3.5 group-hover:text-accent" />
              <span className="font-medium text-xs">(516)-523-0489</span>
            </a>
            <Button variant="accent" size="sm" className="text-xs px-3 py-1.5 h-auto animate-pulse-glow" asChild>
              <a href="https://apply.sbaloan.app/11111-skycapnowllc" target="_blank" rel="noopener noreferrer">
                SBA Application
              </a>
            </Button>
            <Button variant="accent" size="sm" className="text-xs px-3 py-1.5 h-auto animate-pulse-glow" asChild>
              <a href="https://forms.zohopublic.com/skycapnow1/form/TimetoDriveYourBusinessForwardAreYouIn/formperma/n2L5-eBVJbTbpdVyxykY3VosikegBfB5UfccY72D5gA" target="_blank" rel="noopener noreferrer">
                Business Application
              </a>
            </Button>
          </div>

          {/* Mobile menu button */}
          <button
            className="lg:hidden text-white p-2"
            onClick={() => setIsOpen(!isOpen)}
            aria-expanded={isOpen}
            aria-controls="mobile-menu"
            aria-label={isOpen ? "Close menu" : "Open menu"}
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile menu */}
        {isOpen && (
          <div id="mobile-menu" className="lg:hidden py-6 border-t border-white/10" role="navigation" aria-label="Mobile navigation">
            <div className="flex flex-col gap-4">
              {navLinks.map((link) => (
                link.isPage ? (
                  <Link
                    key={link.label}
                    to={link.href}
                    onClick={() => setIsOpen(false)}
                    className="text-white/80 hover:text-white transition-colors duration-300 font-medium py-2"
                  >
                    {link.label}
                  </Link>
                ) : (
                  <button
                    key={link.label}
                    onClick={() => {
                      handleNavClick(link.href);
                      setIsOpen(false);
                    }}
                    className="text-white/80 hover:text-white transition-colors duration-300 font-medium py-2 text-left"
                  >
                    {link.label}
                  </button>
                )
              ))}
              <hr className="border-white/10 my-2" />
              <a href="tel:5165230489" className="flex items-center gap-2 text-white/80 py-2">
                <Phone className="w-4 h-4" />
                <span className="font-medium">(516)-523-0489</span>
              </a>
              <Button variant="accent" className="w-full mt-2" asChild>
                <a href="https://apply.sbaloan.app/11111-skycapnowllc" target="_blank" rel="noopener noreferrer">
                  SBA Application
                </a>
              </Button>
              <Button variant="accent" className="w-full mt-2" asChild>
                <a href="https://forms.zohopublic.com/skycapnow1/form/TimetoDriveYourBusinessForwardAreYouIn/formperma/n2L5-eBVJbTbpdVyxykY3VosikegBfB5UfccY72D5gA" target="_blank" rel="noopener noreferrer">
                  Business Application
                </a>
              </Button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
