import ProductCard from "@/components/ProductCard";
import { 
  Banknote, 
  Building2, 
  CreditCard, 
  Truck, 
  FileText, 
  Rocket, 
  Home, 
  TrendingUp,
  Landmark
} from "lucide-react";
import useScrollAnimation from "@/hooks/useScrollAnimation";

const products = [
  {
    icon: Banknote,
    title: "Merchant Cash Advance (MCA)",
    description: "Fast MCA funding for businesses nationwide. Get capital based on future sales with flexible repayment.",
    featured: true
  },
  {
    icon: Building2,
    title: "Working Capital Loans",
    description: "Working capital loans for small businesses. Predictable payments for growth and operations.",
    featured: false
  },
  {
    icon: CreditCard,
    title: "Business Line of Credit",
    description: "Flexible credit lines for businesses across all 50 states. Only pay interest on what you use.",
    featured: false
  },
  {
    icon: Truck,
    title: "Equipment Financing",
    description: "Equipment financing for your business. Upgrade machinery without draining cash reserves.",
    featured: true
  },
  {
    icon: FileText,
    title: "Invoice Factoring",
    description: "Turn unpaid invoices into immediate working capital for your business.",
    featured: false
  },
  {
    icon: Rocket,
    title: "Startup Funding",
    description: "Startup business loans for new ventures nationwide. Flexible terms available.",
    featured: true
  },
  {
    icon: Home,
    title: "Real Estate Investor Funding",
    description: "Fast real estate funding for investors. Fix-and-flip, rental, or commercial properties.",
    featured: false
  },
  {
    icon: TrendingUp,
    title: "Revenue-Based Financing",
    description: "Revenue-based funding for growing businesses. Payments tied to your revenue.",
    featured: false
  },
  {
    icon: Landmark,
    title: "SBA Loan",
    description: "Government-backed SBA loans with competitive rates and longer repayment terms for qualified businesses.",
    featured: true,
    customLink: "https://apply.sbaloan.app/11111-skycapnowllc"
  }
];

const ProductsGrid = () => {
  const { ref: headerRef, isVisible: headerVisible } = useScrollAnimation();
  const { ref: gridRef, isVisible: gridVisible } = useScrollAnimation({ threshold: 0.05 });

  // Separate featured and regular products for better layout
  const featuredProducts = products.filter(p => p.featured);
  const regularProducts = products.filter(p => !p.featured);

  return (
    <section 
      id="products" 
      className="py-24 bg-background relative overflow-hidden"
      aria-label="Business Funding Solutions for New York and Florida"
    >
      {/* Background decorative elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-20 left-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-0 w-80 h-80 bg-secondary/5 rounded-full blur-3xl" />
      </div>

      <div className="container px-4 md:px-8 relative z-10">
        {/* Section header - SEO optimized */}
        <div 
          ref={headerRef}
          className={`text-center mb-16 scroll-reveal ${headerVisible ? 'visible' : ''}`}
        >
          <span className="inline-block px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-semibold mb-4">
            Business Funding Solutions
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4">
            Small Business Loans & MCA Funding Nationwide
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto mb-8">
            From <strong>merchant cash advance</strong> to <strong>working capital loans</strong>, we provide fast approval business funding 
            for small businesses across <strong>all 50 states</strong>. Get funded in 24-48 hours.
          </p>
          
          {/* Quick list of offerings */}
          <div className="flex flex-wrap justify-center gap-3 max-w-4xl mx-auto">
            {[
              "Collateralized Loan Options",
              "Real Estate Loans",
              "Invoice Factoring",
              "Payment Processing / Credit Card Processing",
              "Equipment Financing"
            ].map((item) => (
              <span 
                key={item}
                className="px-4 py-2 bg-card border border-border/80 rounded-xl text-sm font-semibold text-foreground/80 shadow-soft hover:border-primary/30 hover:text-primary transition-all duration-300"
              >
                {item}
              </span>
            ))}
          </div>
        </div>

        {/* Featured Products Row */}
        <div ref={gridRef} className="mb-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {featuredProducts.map((product, index) => (
              <div
                key={product.title}
                className={`scroll-reveal-scale stagger-${Math.min(index + 1, 4)} ${gridVisible ? 'visible' : ''}`}
              >
                <ProductCard
                  icon={product.icon}
                  title={product.title}
                  description={product.description}
                  featured={product.featured}
                  customLink={product.customLink}
                  delay={0}
                />
              </div>
            ))}
          </div>
        </div>

        {/* Regular Products Row */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-5">
          {regularProducts.map((product, index) => (
            <div
              key={product.title}
              className={`scroll-reveal-scale stagger-${Math.min(index + 5, 8)} ${gridVisible ? 'visible' : ''}`}
            >
              <ProductCard
                icon={product.icon}
                title={product.title}
                description={product.description}
                featured={product.featured}
                customLink={product.customLink}
                delay={0}
              />
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default ProductsGrid;