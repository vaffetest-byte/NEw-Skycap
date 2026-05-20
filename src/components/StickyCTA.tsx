import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Phone, ArrowRight, Sparkles } from "lucide-react";

export const StickyCTA = () => {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Show CTA after user scrolls down 400px
      setShow(window.scrollY > 400);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const applicationUrl = "https://forms.zohopublic.com/skycapnow1/form/BusinessApplication/formperma/k4ySefBCGaIjXzTbs58TKi9KHTcjBurx7BVBYrs0buI";

  return (
    <>
      {/* Floating Apply Now Button (Desktop only) */}
      <div 
        className={`hidden md:block fixed bottom-8 right-8 z-50 transition-all duration-500 transform ${
          show ? "translate-y-0 opacity-100 scale-100" : "translate-y-10 opacity-0 scale-90 pointer-events-none"
        }`}
      >
        <Button 
          size="lg" 
          className="bg-accent text-accent-foreground font-black shadow-accent hover:shadow-elevated hover:scale-105 hover:-translate-y-0.5 rounded-full flex items-center gap-2 pr-5 animate-pulse-glow"
          asChild
        >
          <a href={applicationUrl} target="_blank" rel="noopener noreferrer">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent-foreground opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-accent-foreground"></span>
            </span>
            Apply Now
            <ArrowRight className="w-4 h-4 ml-0.5" />
          </a>
        </Button>
      </div>

      {/* Sticky Bottom Bar CTA (Mobile only) */}
      <div 
        className={`md:hidden fixed bottom-0 left-0 right-0 z-40 bg-primary/95 backdrop-blur-lg border-t border-white/10 shadow-elevated transition-all duration-500 transform py-3 px-4 flex gap-3 ${
          show ? "translate-y-0 opacity-100" : "translate-y-full opacity-0 pointer-events-none"
        }`}
      >
        <Button 
          variant="outline" 
          className="flex-1 border-white/20 hover:border-white/40 text-white bg-white/5 font-bold h-12" 
          asChild
        >
          <a href="tel:5165230489" className="flex items-center justify-center gap-2">
            <Phone className="w-4 h-4 text-accent fill-accent" />
            <span>Call Now</span>
          </a>
        </Button>
        <Button 
          className="flex-[2] bg-accent text-accent-foreground font-black shadow-accent h-12 hover:bg-accent/90" 
          asChild
        >
          <a href={applicationUrl} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-2">
            <Sparkles className="w-4 h-4 fill-accent-foreground" />
            <span>Apply Online</span>
            <ArrowRight className="w-4 h-4" />
          </a>
        </Button>
      </div>
    </>
  );
};

export default StickyCTA;
