import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Sparkles, HelpCircle } from "lucide-react";
import useScrollAnimation from "@/hooks/useScrollAnimation";

const faqs = [
  {
    question: "What are the requirements to qualify for business funding?",
    answer: "Our basic requirements are extremely simple compared to traditional banks: 1) Minimum of 6 months in business, 2) Minimum of $10,000 in monthly gross revenue, and 3) An active business bank account. We accept all credit profiles and focus primarily on your business performance rather than personal credit scores."
  },
  {
    question: "How fast is the funding process from application to cash?",
    answer: "We offer some of the fastest turnaround times in the alternative lending industry. Once you complete our 5-minute online pre-qualification, you will receive funding decisions within 2 to 4 hours. Upon selecting a program and executing the agreement, funds are typically wired directly to your account within 24 to 48 hours."
  },
  {
    question: "What is a Merchant Cash Advance (MCA) and how does it work?",
    answer: "A Merchant Cash Advance (MCA) is not a loan, but rather the sale of future business receivables at a discount. In exchange for immediate lump-sum cash, you agree to repay the advance with a small, set percentage of your future daily credit card or bank deposit sales. This is ideal for seasonal businesses because payments adjust dynamically based on your actual revenue flow."
  },
  {
    question: "Do I need to pledge collateral or personal assets?",
    answer: "No, most of our funding products—including Merchant Cash Advances, revenue-based financing, and standard working capital loans—are completely unsecured. You do not need to pledge personal real estate, equipment, or business assets to qualify for funding."
  },
  {
    question: "Can my business qualify if I have a low personal credit score?",
    answer: "Absolutely. Traditional banks rely heavily on FICO credit scores, leading to high rejection rates. At SkyCapital, we believe credit scores don't tell the whole story. We analyze the health, cash flow, bank deposits, and transaction history of your business. As long as your business meets our monthly deposit requirements, we can secure options."
  },
  {
    question: "What industries do you serve?",
    answer: "We serve a wide variety of commercial sectors across all 50 states. Common industries include Construction, Retail, Restaurants, Dental and Medical Practices, Logistics, Auto Repair, Wholesalers, and Professional Services. We offer tailored programs designed to match the unique cash flow cycle of your specific sector."
  }
];

export const FaqSection = () => {
  const { ref, isVisible } = useScrollAnimation();

  return (
    <section 
      ref={ref} 
      id="faq" 
      className="py-24 bg-muted/30 border-t border-border/50 relative overflow-hidden"
      aria-label="Frequently Asked Questions"
    >
      <div className="absolute inset-0 pointer-events-none opacity-[0.02]" style={{
        backgroundImage: `radial-gradient(circle at 1px 1px, hsl(var(--primary)) 1px, transparent 0)`,
        backgroundSize: '32px 32px'
      }} />

      <div className="container max-w-4xl px-4 md:px-8 relative z-10">
        {/* Section Header */}
        <div className={`text-center mb-16 scroll-reveal ${isVisible ? 'visible' : ''}`}>
          <span className="inline-flex items-center gap-2 text-sm font-semibold text-primary mb-4 px-4 py-1.5 bg-primary/5 rounded-full">
            <HelpCircle className="w-4 h-4 text-accent" />
            Got Questions?
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4">
            Frequently Asked Questions
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Everything you need to know about our simple qualification requirements, funding options, and fast approval process.
          </p>
        </div>

        {/* Accordions */}
        <div className={`bg-card rounded-3xl border border-border/80 shadow-soft p-6 md:p-10 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <Accordion type="single" collapsible className="w-full">
            {faqs.map((faq, index) => (
              <AccordionItem key={index} value={`item-${index}`} className="border-b border-border/60 py-2 last:border-none">
                <AccordionTrigger className="text-left font-bold text-base md:text-lg hover:text-primary transition-colors py-4">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-sm md:text-base text-muted-foreground leading-relaxed pt-2 pb-4">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
};

export default FaqSection;
