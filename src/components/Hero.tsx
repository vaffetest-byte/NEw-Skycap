import { Phone, ShieldCheck, Clock, Award, Star } from "lucide-react";
import FundingCalculator from "./FundingCalculator";
import useScrollAnimation from "@/hooks/useScrollAnimation";

export const Hero = () => {
  const { ref: contentRef, isVisible: contentVisible } = useScrollAnimation();

  return (
    <section className="relative min-h-screen gradient-hero overflow-hidden flex items-center pt-28 pb-20 md:py-32" aria-label="Business Funding Hero Section">
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-96 h-96 bg-secondary/15 rounded-full blur-3xl animate-float will-change-transform" />
        <div className="absolute bottom-20 right-10 w-80 h-80 bg-accent/10 rounded-full blur-3xl animate-float will-change-transform" style={{ animationDelay: '2s' }} />
      </div>

      {/* Grid pattern overlay */}
      <div className="absolute inset-0 opacity-[0.03]" style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
      }} />

      <div className="container px-4 md:px-8 relative z-10">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Column: Heading and trust signals */}
          <div 
            ref={contentRef}
            className={`lg:col-span-7 space-y-8 text-left transition-all duration-700 ${
              contentVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
            }`}
          >
            {/* Trust badge */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 border border-white/20 backdrop-blur-md">
              <span className="flex h-2 w-2 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-accent"></span>
              </span>
              <span className="text-xs font-bold text-white uppercase tracking-wider">Fast Nationwide Funding</span>
            </div>

            {/* Main Headline */}
            <div className="space-y-4">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-white leading-[1.1] tracking-tight">
                Secure <span className="text-accent">$20K–$5M</span> in Fast Capital For Your Business
              </h1>
              <p className="text-lg md:text-xl text-white/80 max-w-2xl leading-relaxed">
                Unlock flexible business funding with a <strong>95% approval rate</strong>. Same-day approvals, funding in as little as 24 hours, and a simple 5-minute pre-qualification.
              </p>
            </div>

            {/* Key benefits list (outcome-focused) */}
            <div className="grid sm:grid-cols-2 gap-4 border-y border-white/10 py-6 max-w-xl">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-accent/20 flex items-center justify-center text-accent">
                  <Clock className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-white">Funding in 24 Hours</h4>
                  <p className="text-xs text-white/60">Speed that beats traditional banks</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-accent/20 flex items-center justify-center text-accent">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-white">Apply in 5 Minutes</h4>
                  <p className="text-xs text-white/60">No collateral or paperwork hassle</p>
                </div>
              </div>
            </div>

            {/* Live Trust Metrics */}
            <div className="flex flex-wrap items-center gap-6 pt-2">
              {/* Trustpilot-style indicator */}
              <div className="flex items-center gap-2">
                <div className="flex gap-0.5">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-accent text-accent" />
                  ))}
                </div>
                <div className="text-sm font-bold text-white">
                  4.9/5 <span className="text-white/60 font-medium">Rating (10k+ Funded)</span>
                </div>
              </div>

              <div className="hidden sm:block w-px h-6 bg-white/20" />

              {/* Security indicator */}
              <div className="flex items-center gap-2">
                <Award className="w-5 h-5 text-accent" />
                <span className="text-xs font-bold text-white/90 uppercase tracking-widest">
                  256-Bit SSL Encrypted
                </span>
              </div>
            </div>

            {/* Phone Quick Call */}
            <div className="pt-2">
              <a 
                href="tel:5165230489" 
                className="inline-flex items-center gap-3 text-white hover:text-accent transition-colors group"
                aria-label="Call a business funding advisor at +1-516-523-0489"
              >
                <span className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center group-hover:scale-110 transition-transform">
                  <Phone className="w-4 h-4 text-accent fill-accent" />
                </span>
                <div>
                  <span className="block text-xxs font-bold text-white/50 uppercase tracking-widest">Prefer talking to an advisor?</span>
                  <span className="text-sm font-bold">(516)-523-0489</span>
                </div>
              </a>
            </div>

          </div>

          {/* Right Column: Funding Calculator widget */}
          <div className="lg:col-span-5 relative w-full flex justify-center">
            {/* Decorative background glow behind the card */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-accent/20 rounded-full blur-3xl pointer-events-none" />
            <FundingCalculator />
          </div>

        </div>
      </div>

      {/* Bottom wave decoration */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-auto translate-y-px" aria-hidden="true">
          <path d="M0 120L60 105C120 90 240 60 360 45C480 30 600 30 720 37.5C840 45 960 60 1080 67.5C1200 75 1320 75 1380 75L1440 75V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0Z" fill="hsl(210 40% 99%)"/>
        </svg>
      </div>
    </section>
  );
};

export default Hero;