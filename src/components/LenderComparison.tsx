import { Check, X, ShieldAlert, Sparkles } from "lucide-react";
import useScrollAnimation from "@/hooks/useScrollAnimation";

const criteria = [
  {
    feature: "Funding Limit",
    skycapital: "Up to $5,000,000",
    banks: "Up to $500,000 (Strict)",
    cards: "Up to $50,000",
    highlight: true,
  },
  {
    feature: "Approval Speed",
    skycapital: "2 - 4 Hours",
    banks: "3 - 6 Weeks",
    cards: "Instant (if pre-approved)",
    highlight: true,
  },
  {
    feature: "Funding Timeline",
    skycapital: "24 - 48 Hours",
    banks: "1 - 2 Months",
    cards: "Immediate (via credit line)",
    highlight: false,
  },
  {
    feature: "Approval Rate",
    skycapital: "95% Approval",
    banks: "Under 20% Approval",
    cards: "Credit score dependent",
    highlight: true,
  },
  {
    feature: "Credit Score Required",
    skycapital: "500+ (All Credit Welcome)",
    banks: "680+ (Excellent Only)",
    cards: "670+",
    highlight: false,
  },
  {
    feature: "Collateral Required",
    skycapital: "No Collateral Required",
    banks: "Often Required (Real Estate, Assets)",
    cards: "No",
    highlight: false,
  },
  {
    feature: "Repayment Terms",
    skycapital: "Flexible (tied to revenue)",
    banks: "Fixed Monthly",
    cards: "Fixed Monthly (high interest)",
    highlight: false,
  },
];

export const LenderComparison = () => {
  const { ref, isVisible } = useScrollAnimation();

  return (
    <section 
      ref={ref} 
      className="py-24 bg-card border-y border-border/60 relative overflow-hidden"
      aria-label="Funding Options Comparison Table"
    >
      <div className="absolute inset-0 pointer-events-none opacity-[0.02]" style={{
        backgroundImage: `radial-gradient(circle at 1px 1px, hsl(var(--primary)) 1px, transparent 0)`,
        backgroundSize: '24px 24px'
      }} />

      <div className="container px-4 md:px-8 relative z-10">
        {/* Section Header */}
        <div className={`text-center mb-16 scroll-reveal ${isVisible ? 'visible' : ''}`}>
          <span className="inline-flex items-center gap-2 text-sm font-semibold text-primary mb-4 px-4 py-1.5 bg-primary/5 rounded-full">
            <Sparkles className="w-4 h-4 text-accent fill-accent" />
            Lender Comparison
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4">
            See How SkyCapital Compares to the Alternatives
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Traditional financing isn&apos;t built for the speed of modern business. Discover why business owners choose SkyCapital.
          </p>
        </div>

        {/* Table container for responsiveness */}
        <div className={`overflow-x-auto rounded-3xl border border-border shadow-elevated transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <table className="w-full border-collapse text-left min-w-[600px]">
            <thead>
              <tr className="bg-primary text-white">
                <th className="p-6 font-bold text-sm md:text-base">Features</th>
                <th className="p-6 font-bold text-sm md:text-base bg-primary/90 text-accent flex items-center gap-2">
                  <span>SkyCapital Funding</span>
                  <Sparkles className="w-4 h-4 fill-accent text-accent" />
                </th>
                <th className="p-6 font-bold text-sm md:text-base text-white/70">Traditional Banks</th>
                <th className="p-6 font-bold text-sm md:text-base text-white/70">Business Credit Cards</th>
              </tr>
            </thead>
            <tbody>
              {criteria.map((item, idx) => (
                <tr 
                  key={idx} 
                  className={`border-b border-border/50 transition-colors duration-200 hover:bg-muted/30 ${
                    item.highlight ? "bg-accent/5" : ""
                  }`}
                >
                  <td className="p-6 font-bold text-foreground text-sm md:text-base">{item.feature}</td>
                  <td className="p-6 text-primary font-extrabold text-sm md:text-base bg-accent/10 border-x border-accent/20">
                    <div className="flex items-center gap-2">
                      <Check className="w-5 h-5 text-emerald-600 bg-emerald-100 rounded-full p-0.5" />
                      <span>{item.skycapital}</span>
                    </div>
                  </td>
                  <td className="p-6 text-muted-foreground text-sm">
                    <div className="flex items-center gap-2">
                      <X className="w-4 h-4 text-destructive bg-destructive/10 rounded-full p-0.5" />
                      <span>{item.banks}</span>
                    </div>
                  </td>
                  <td className="p-6 text-muted-foreground text-sm">
                    <div className="flex items-center gap-2">
                      <ShieldAlert className="w-4 h-4 text-amber-600 bg-amber-100 rounded-full p-0.5" />
                      <span>{item.cards}</span>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Footnote */}
        <p className="text-center text-xs text-muted-foreground mt-6">
          *Comparison values represent average estimates based on standard commercial lending products as of 2026. Custom rates and terms are evaluated individually per applicant profile.
        </p>
      </div>
    </section>
  );
};

export default LenderComparison;
