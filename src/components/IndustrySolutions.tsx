import { Hammer, ShoppingBag, Utensils, Stethoscope, Truck, Package, ArrowRight, Sparkles } from "lucide-react";
import useScrollAnimation from "@/hooks/useScrollAnimation";
import { Button } from "@/components/ui/button";

const industries = [
  {
    icon: Hammer,
    name: "Construction & Contracting",
    description: "Cover payroll, buy bulk raw materials, or secure heavy equipment before receiving project payments.",
    useCases: ["Material Purchasing", "Payroll Bridges", "Equipment Rentals"],
  },
  {
    icon: ShoppingBag,
    name: "Retail & E-commerce",
    description: "Stock shelves ahead of peak shopping seasons or fund marketing campaigns to launch new product lines.",
    useCases: ["Inventory Growth", "Store Remodeling", "Digital Marketing"],
  },
  {
    icon: Utensils,
    name: "Restaurants & Hospitality",
    description: "Finance kitchen upgrades, cover seasonal slow periods, or expand seating capacities and outdoor spaces.",
    useCases: ["Kitchen Renovations", "Operating Capital", "Supplier Payments"],
  },
  {
    icon: Stethoscope,
    name: "Healthcare & Medical Practice",
    description: "Manage medical equipment leases, fund staffing expansions, or cover gaps while waiting on insurance claims.",
    useCases: ["Staffing Expansion", "Equipment Leasing", "Cash Flow Bridges"],
  },
  {
    icon: Truck,
    name: "Logistics & Transportation",
    description: "Fund vehicle maintenance, offset fleet fuel costs, or finance the purchase of additional trucks.",
    useCases: ["Fleet Fuel Costs", "Vehicle Repairs", "Fleet Expansion"],
  },
  {
    icon: Package,
    name: "Wholesale & Distribution",
    description: "Leverage bulk discounts from suppliers or bridge cash flow gaps on long invoices from retail partners.",
    useCases: ["Bulk Discounting", "Warehouse Leases", "Accounts Receivable"],
  },
];

export const IndustrySolutions = () => {
  const { ref: headerRef, isVisible: headerVisible } = useScrollAnimation();
  const { ref: gridRef, isVisible: gridVisible } = useScrollAnimation({ threshold: 0.05 });

  return (
    <section 
      id="industries" 
      className="py-24 bg-muted/30 relative overflow-hidden"
      aria-label="Funding Solutions By Industry"
    >
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute bottom-20 left-10 w-80 h-80 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute top-20 right-10 w-96 h-96 bg-accent/5 rounded-full blur-3xl" />
      </div>

      <div className="container px-4 md:px-8 relative z-10">
        {/* Header */}
        <div 
          ref={headerRef}
          className={`text-center mb-16 scroll-reveal ${headerVisible ? 'visible' : ''}`}
        >
          <span className="inline-flex items-center gap-2 text-sm font-semibold text-primary mb-4 px-4 py-1.5 bg-primary/5 rounded-full">
            <Sparkles className="w-4 h-4 text-accent fill-accent" />
            Tailored Industry Solutions
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4">
            Flexible Funding for Almost Every Industry
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Every industry has unique challenges and cycles. Our business funding advisors understand your business model and construct custom terms.
          </p>
        </div>

        {/* Grid of industries */}
        <div 
          ref={gridRef}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {industries.map((industry, index) => (
            <div 
              key={industry.name}
              className={`group bg-card rounded-2xl p-8 border border-border/60 hover:border-primary/20 shadow-soft hover:shadow-elevated transition-all duration-500 hover:-translate-y-1.5 scroll-reveal-scale stagger-${(index % 3) + 1} ${gridVisible ? 'visible' : ''}`}
            >
              <div className="w-14 h-14 rounded-2xl bg-primary/5 flex items-center justify-center mb-6 group-hover:bg-primary group-hover:text-white transition-all duration-300">
                <industry.icon className="w-7 h-7 text-primary group-hover:text-white transition-colors duration-300" />
              </div>
              
              <h3 className="text-xl font-bold text-foreground mb-3 group-hover:text-primary transition-colors">
                {industry.name}
              </h3>
              
              <p className="text-sm leading-relaxed text-muted-foreground mb-6">
                {industry.description}
              </p>

              <div className="space-y-2 mb-6 border-t border-border/50 pt-4">
                <span className="text-xs font-bold text-muted-foreground uppercase tracking-widest block mb-2">Common Use Cases</span>
                <div className="flex flex-wrap gap-1.5">
                  {industry.useCases.map((useCase) => (
                    <span 
                      key={useCase}
                      className="px-2.5 py-1 bg-muted text-muted-foreground rounded-lg text-xs font-semibold"
                    >
                      {useCase}
                    </span>
                  ))}
                </div>
              </div>

              <a 
                href="https://forms.zohopublic.com/skycapnow1/form/BusinessApplication/formperma/k4ySefBCGaIjXzTbs58TKi9KHTcjBurx7BVBYrs0buI"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-xs font-bold text-primary group-hover:gap-2.5 transition-all duration-300"
              >
                <span>Get Industry Funding</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </a>
            </div>
          ))}
        </div>

        {/* Action Button Section */}
        <div className="text-center mt-14">
          <Button variant="default" size="lg" className="shadow-elevated" asChild>
            <a 
              href="https://forms.zohopublic.com/skycapnow1/form/TimetoDriveYourBusinessForwardAreYouIn/formperma/n2L5-eBVJbTbpdVyxykY3VosikegBfB5UfccY72D5gA"
              target="_blank"
              rel="noopener noreferrer"
            >
              Get Started In 5 Minutes
              <ArrowRight className="w-5 h-5 ml-1" />
            </a>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default IndustrySolutions;
