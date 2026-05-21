import { TrendingUp, Clock, ShieldCheck, Sparkles, ArrowRight } from "lucide-react";
import useScrollAnimation from "@/hooks/useScrollAnimation";

const cases = [
  {
    title: "Bridging Holiday Inventory Cash Flow",
    industry: "Retail & E-commerce",
    fundedAmount: "$85,000",
    fundingProduct: "Merchant Cash Advance",
    timeline: "24 Hours",
    situation: "A local retail chain needed to stock high-margin inventory 2 months ahead of the Christmas season. Traditional bank loan processing would have missed the vendor's discount deadline.",
    outcome: "With $85,000 in same-day funding, the business stocked the inventory on time, secured a 15% wholesale discount, and achieved 35% year-over-year revenue growth.",
    metric: "35% Sales Increase",
  },
  {
    title: "Securing High-Value Municipal Contract",
    industry: "Construction & Contracting",
    fundedAmount: "$250,000",
    fundingProduct: "Working Capital Loan",
    timeline: "36 Hours",
    situation: "A commercial plumbing contractor won a major $1.2M municipal contract but needed substantial upfront capital to secure raw materials and support a 30-person crew before the first invoice cycle.",
    outcome: "SkyCapital provided a $250K working capital loan within 36 hours. The contractor launched operations immediately and completed the contract on time and under budget.",
    metric: "$1.2M Contract Saved",
  },
  {
    title: "Modernizing Outdated Diagnostic Equipment",
    industry: "Healthcare & Dental Practice",
    fundedAmount: "$140,000",
    fundingProduct: "Equipment Financing",
    timeline: "48 Hours",
    situation: "A dental clinic needed to replace three failing treatment chairs and purchase a 3D dental imaging scanner to retain patients and maintain service standards.",
    outcome: "Approved for $140,000 equipment financing. The office installed the machines immediately, leading to a 25% increase in diagnostic billings and positive reviews.",
    metric: "25% Diagnostics Boost",
  },
];

export const CaseStudies = () => {
  const { ref: headerRef, isVisible: headerVisible } = useScrollAnimation();
  const { ref: gridRef, isVisible: gridVisible } = useScrollAnimation({ threshold: 0.05 });

  return (
    <section 
      id="case-studies" 
      className="py-24 bg-[#F8F9FC] border-t border-border/50 relative overflow-hidden"
      aria-label="Real Business Funding Case Studies"
    >
      <div className="container px-4 md:px-8 relative z-10">
        {/* Header */}
        <div 
          ref={headerRef}
          className={`text-center mb-16 scroll-reveal ${headerVisible ? 'visible' : ''}`}
        >
          <span className="inline-flex items-center gap-2 text-sm font-semibold text-primary mb-4 px-4 py-1.5 bg-primary/5 rounded-full">
            <Sparkles className="w-4 h-4 text-accent fill-accent" />
            Success Stories
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4">
            Real Business Outcomes, Fast Deployed Capital
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            We measure our success by the growth of the businesses we fund. See how we help entrepreneurs solve challenges.
          </p>
        </div>

        {/* Case Cards */}
        <div 
          ref={gridRef}
          className="grid grid-cols-1 lg:grid-cols-3 gap-8"
        >
          {cases.map((item, idx) => (
            <div 
              key={idx}
              className={`h-full bg-muted/30 border border-border/60 rounded-3xl p-6 md:p-8 flex flex-col justify-between hover:shadow-elevated hover:border-primary/20 transition-all duration-500 hover:-translate-y-1.5 scroll-reveal-scale stagger-${idx + 1} ${gridVisible ? 'visible' : ''}`}
            >
              <div>
                {/* Meta details */}
                <div className="flex justify-between items-center min-h-[48px] gap-4 mb-6">
                  <span className="px-3 py-1 bg-primary/5 text-primary text-xs font-bold rounded-lg uppercase tracking-wider border border-primary/10">
                    {item.industry}
                  </span>
                  <span className="text-xs font-bold text-muted-foreground flex items-center gap-1 shrink-0">
                    <Clock className="w-3.5 h-3.5 text-accent" />
                    {item.timeline} Approval
                  </span>
                </div>

                <h3 className="text-xl font-bold text-foreground mb-4 leading-tight">
                  {item.title}
                </h3>

                {/* Amount and Product */}
                <div className="grid grid-cols-2 gap-4 bg-card border border-border/50 rounded-2xl p-4 mb-6">
                  <div>
                    <span className="text-xxs font-bold text-muted-foreground uppercase tracking-widest block mb-1">Funded Amount</span>
                    <span className="text-lg font-black text-primary">{item.fundedAmount}</span>
                  </div>
                  <div>
                    <span className="text-xxs font-bold text-muted-foreground uppercase tracking-widest block mb-1">Funding Program</span>
                    <span className="text-sm font-bold text-foreground">{item.fundingProduct}</span>
                  </div>
                </div>

                {/* Description */}
                <div className="space-y-4 text-sm leading-relaxed mb-6">
                  <div>
                    <span className="font-extrabold text-foreground block mb-1">The Challenge:</span>
                    <p className="text-muted-foreground">{item.situation}</p>
                  </div>
                  <div>
                    <span className="font-extrabold text-foreground block mb-1">The Result:</span>
                    <p className="text-muted-foreground">{item.outcome}</p>
                  </div>
                </div>
              </div>

              {/* Bottom Metric */}
              <div className="border-t border-border/65 pt-6 mt-2 flex items-center justify-between">
                <div>
                  <span className="text-xxs font-bold text-muted-foreground uppercase tracking-widest block mb-1">Outcome Metric</span>
                  <span className="text-base font-black text-emerald-600 flex items-center gap-1.5">
                    <TrendingUp className="w-4 h-4" />
                    {item.metric}
                  </span>
                </div>
                <div className="w-10 h-10 rounded-full bg-emerald-100 dark:bg-emerald-950 flex items-center justify-center text-emerald-700">
                  <ShieldCheck className="w-5 h-5" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CaseStudies;
