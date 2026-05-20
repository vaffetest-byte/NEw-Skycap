import { Shield, Award, Lock, Star, CheckCircle2, Sparkles } from "lucide-react";
import useScrollAnimation from "@/hooks/useScrollAnimation";

const trustIndicators = [
  { icon: Shield, label: "Trusted Funding Partner", description: "Serving commercial clients since 2015", color: "from-blue-600 to-blue-700" },
  { icon: CheckCircle2, label: "Fast Same-Day Approvals", description: "Offers within 2 to 4 hours", color: "from-emerald-600 to-emerald-700" },
  { icon: Lock, label: "Bank-Grade Encryption", description: "256-bit secure data protection", color: "from-indigo-600 to-indigo-700" },
  { icon: Award, label: "Top-Rated Customer Service", description: "4.9/5 overall merchant score", color: "from-amber-600 to-amber-700" },
];

const partners = [
  { name: "CHASE", sub: "Commercial Bank" },
  { name: "WELLS FARGO", sub: "Business Banking" },
  { name: "BANK OF AMERICA", sub: "Merchant Services" },
  { name: "CAPITAL ONE", sub: "Financial Corp" },
  { name: "PNC BANK", sub: "Treasury Services" },
];

export const TrustBadges = () => {
  const { ref: badgesRef, isVisible: badgesVisible } = useScrollAnimation();
  const { ref: logosRef, isVisible: logosVisible } = useScrollAnimation();

  return (
    <section className="py-24 bg-gradient-to-b from-[#f8fafc] via-[#f1f5f9]/55 to-[#f8fafc] relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Subtle grid pattern */}
        <div className="absolute inset-0 opacity-[0.02]" style={{ 
          backgroundImage: `radial-gradient(circle at 1px 1px, hsl(var(--primary)) 1px, transparent 0)`,
          backgroundSize: '32px 32px'
        }} />
        
        {/* Floating gradient orbs */}
        <div className="absolute top-20 left-[10%] w-72 h-72 bg-gradient-to-br from-primary/5 to-secondary/5 rounded-full blur-3xl animate-[float_8s_ease-in-out_infinite]" />
        <div className="absolute bottom-20 right-[10%] w-96 h-96 bg-gradient-to-br from-secondary/5 to-accent/5 rounded-full blur-3xl animate-[float_10s_ease-in-out_infinite_reverse]" />
        
        {/* Decorative lines */}
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/10 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/10 to-transparent" />
      </div>

      <div className="container px-4 md:px-8 relative z-10">
        
        {/* Trust Badges */}
        <div 
          ref={badgesRef}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-20"
        >
          {trustIndicators.map((item, index) => (
            <div 
              key={item.label}
              className={`group relative bg-card rounded-3xl p-6 md:p-8 border border-border shadow-soft hover:shadow-elevated transition-all duration-500 hover:-translate-y-1.5 overflow-hidden scroll-reveal-scale stagger-${index + 1} ${badgesVisible ? 'visible' : ''}`}
            >
              {/* Gradient accent top */}
              <div className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${item.color} opacity-0 group-hover:opacity-100 transition-opacity duration-300`} />
              
              {/* Icon */}
              <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${item.color} flex items-center justify-center mb-6 shadow-md group-hover:scale-105 transition-transform duration-300`}>
                <item.icon className="w-6 h-6 text-white" />
              </div>
              
              {/* Content */}
              <h4 className="font-extrabold text-foreground text-sm md:text-base mb-1.5">{item.label}</h4>
              <p className="text-xs md:text-sm text-muted-foreground leading-relaxed">{item.description}</p>
            </div>
          ))}
        </div>

        {/* Divider */}
        <div className="flex items-center gap-4 mb-14">
          <div className="flex-1 h-px bg-gradient-to-r from-transparent via-border to-transparent" />
          <span className="text-xxs font-bold text-muted-foreground/60 uppercase tracking-widest flex items-center gap-1.5">
            <Lock className="w-3.5 h-3.5 text-accent" />
            Direct Clearing Network Partners
          </span>
          <div className="flex-1 h-px bg-gradient-to-r from-transparent via-border to-transparent" />
        </div>

        {/* Partner Logos */}
        <div 
          ref={logosRef}
          className={`scroll-reveal ${logosVisible ? 'visible' : ''}`}
        >
          <div className="flex flex-wrap justify-center items-center gap-6 md:gap-12">
            {partners.map((partner, index) => (
              <div 
                key={partner.name}
                className={`relative group bg-card border border-border/80 rounded-2xl px-5 py-3.5 shadow-soft hover:shadow-elevated transition-all duration-300 hover:-translate-y-0.5 scroll-reveal stagger-${index + 1} ${logosVisible ? 'visible' : ''}`}
              >
                <div className="text-center">
                  <span className="block text-sm md:text-base font-black text-muted-foreground/40 group-hover:text-primary/70 transition-colors tracking-tight">
                    {partner.name}
                  </span>
                  <span className="block text-[8px] font-bold text-muted-foreground/30 group-hover:text-primary/40 uppercase tracking-widest mt-0.5 transition-colors">
                    {partner.sub}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Stats Banner */}
        <div className={`mt-20 scroll-reveal stagger-3 ${logosVisible ? 'visible' : ''}`}>
          <div className="relative bg-gradient-to-r from-primary via-primary/95 to-secondary bg-[length:200%_100%] rounded-3xl p-8 md:p-10 shadow-elevated overflow-hidden text-center md:text-left">
            {/* Decorative elements */}
            <div className="absolute top-0 left-0 w-32 h-32 bg-white/5 rounded-full blur-2xl -translate-x-1/2 -translate-y-1/2" />
            <div className="absolute bottom-0 right-0 w-40 h-40 bg-white/5 rounded-full blur-2xl translate-x-1/2 translate-y-1/2" />
            
            <div className="relative flex flex-col md:flex-row items-center justify-between gap-6 text-white">
              <div className="space-y-2">
                <span className="text-xxs font-bold text-accent uppercase tracking-widest">SkyCapital Track Record</span>
                <h3 className="text-2xl md:text-3xl font-black">Empowering Businesses Across All 50 States</h3>
                <p className="text-sm text-white/70 max-w-2xl leading-relaxed">
                  We deploy capital to sustain day-to-day cash requirements, cover unexpected expenses, and drive scalable revenue growth.
                </p>
              </div>
              <div className="flex flex-col sm:flex-row items-center gap-6 md:gap-8 shrink-0">
                <div className="flex items-center gap-3">
                  <Star className="w-6 h-6 fill-accent text-accent" />
                  <div>
                    <span className="block text-xl font-black text-white">$200M+</span>
                    <span className="block text-xxs text-white/50 uppercase tracking-wider">Capital Deployed</span>
                  </div>
                </div>
                <div className="hidden sm:block w-px h-8 bg-white/20" />
                <div className="flex items-center gap-3">
                  <Star className="w-6 h-6 fill-accent text-accent" />
                  <div>
                    <span className="block text-xl font-black text-white">10,000+</span>
                    <span className="block text-xxs text-white/50 uppercase tracking-wider">Merchants Served</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};

export default TrustBadges;
