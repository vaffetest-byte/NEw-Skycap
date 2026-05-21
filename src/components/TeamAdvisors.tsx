import { Sparkles, Phone, Mail, UserCheck } from "lucide-react";
import useScrollAnimation from "@/hooks/useScrollAnimation";

const advisors = [
  {
    name: "Michael Vance",
    role: "Senior Funding Specialist",
    specialty: "Merchant Cash Advances & Retail",
    phone: "(516) 523-0489 ext. 101",
    email: "m.vance@skycapnow.com",
    avatar: "MV",
  },
  {
    name: "Sarah Jenkins",
    role: "Working Capital Advisor",
    specialty: "Construction & B2B Contracting",
    phone: "(516) 523-0489 ext. 104",
    email: "s.jenkins@skycapnow.com",
    avatar: "SJ",
  },
  {
    name: "David Ross",
    role: "Commercial Funding Manager",
    specialty: "Healthcare & Equipment Leasing",
    phone: "(516) 523-0489 ext. 108",
    email: "d.ross@skycapnow.com",
    avatar: "DR",
  },
];

export const TeamAdvisors = () => {
  const { ref: headerRef, isVisible: headerVisible } = useScrollAnimation();
  const { ref: gridRef, isVisible: gridVisible } = useScrollAnimation({ threshold: 0.05 });

  return (
    <section 
      id="team" 
      className="py-24 bg-card border-t border-border/50 relative overflow-hidden"
      aria-label="SkyCapital Business Funding Advisors"
    >
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-10 w-72 h-72 bg-accent/5 rounded-full blur-3xl" />
      </div>

      <div className="container px-4 md:px-8 relative z-10">
        {/* Header */}
        <div 
          ref={headerRef}
          className={`text-center mb-16 scroll-reveal ${headerVisible ? 'visible' : ''}`}
        >
          <span className="inline-flex items-center gap-2 text-sm font-semibold text-primary mb-4 px-4 py-1.5 bg-primary/5 rounded-full">
            <UserCheck className="w-4 h-4 text-accent" />
            Human Connection
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4">
            Meet Your Dedicated Funding Advisors
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            We don&apos;t hide behind automated algorithms. Our experienced advisors work directly with you to structure programs tailored to your cash flow.
          </p>
        </div>

        {/* Advisors Grid */}
        <div 
          ref={gridRef}
          className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto"
        >
          {advisors.map((adv, idx) => (
            <div 
              key={adv.name}
              className={`bg-muted/30 border border-border/60 rounded-3xl p-6 text-center hover:shadow-elevated hover:border-primary/20 transition-all duration-500 hover:-translate-y-1.5 scroll-reveal-scale stagger-${idx + 1} ${gridVisible ? 'visible' : ''}`}
            >
              {/* Avatar placeholder / stylized initial */}
              <div className="w-20 h-20 rounded-full bg-gradient-to-br from-primary to-secondary text-primary-foreground font-black text-2xl flex items-center justify-center mx-auto mb-6 shadow-md border-4 border-white">
                {adv.avatar}
              </div>

              <h3 className="text-lg font-bold text-foreground mb-1">{adv.name}</h3>
              <p className="text-xs font-semibold text-primary uppercase tracking-wider mb-4">{adv.role}</p>
              
              <div className="border-y border-border/60 py-3 mb-6 text-xs text-muted-foreground font-medium">
                <span className="block text-xxs font-bold text-muted-foreground/60 uppercase tracking-widest mb-1">Focus Area</span>
                {adv.specialty}
              </div>

              {/* Contact options */}
              <div className="space-y-2 text-sm">
                <a 
                  href={`tel:${adv.phone.replace(/[^0-9]/g, '')}`}
                  className="flex items-center justify-center gap-2 py-2 px-4 rounded-xl border border-border/80 hover:bg-primary/5 hover:border-primary/20 text-foreground transition-all duration-200"
                >
                  <Phone className="w-4 h-4 text-accent" />
                  <span className="font-bold text-xs">{adv.phone}</span>
                </a>
                <a 
                  href={`mailto:${adv.email}`}
                  className="flex items-center justify-center gap-2 py-2 px-4 rounded-xl border border-border/80 hover:bg-primary/5 hover:border-primary/20 text-foreground transition-all duration-200"
                >
                  <Mail className="w-4 h-4 text-accent" />
                  <span className="font-bold text-xs">{adv.email}</span>
                </a>
              </div>
            </div>
          ))}
        </div>

        {/* Small trust seal */}
        <p className="text-center text-xs text-muted-foreground mt-12 font-medium">
          Have general questions? Reach our general support queue at <a href="mailto:info@skycapnow.com" className="text-primary hover:underline font-bold">info@skycapnow.com</a> or call <a href="tel:5165230489" className="text-primary hover:underline font-bold">+1-516-523-0489</a>.
        </p>
      </div>
    </section>
  );
};

export default TeamAdvisors;
