import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Check, ArrowRight, ArrowLeft, Loader2, Sparkles, Building2, User, Mail, PhoneCall } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

interface CalculatorState {
  amount: number;
  purpose: string;
  timeInBusiness: string;
  monthlyRevenue: string;
  businessName: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
}

const initialCalculatorState: CalculatorState = {
  amount: 150000,
  purpose: "Working Capital",
  timeInBusiness: "1-2 Years",
  monthlyRevenue: "$25,000 - $50,000",
  businessName: "",
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
};

export const FundingCalculator = () => {
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [state, setState] = useState<CalculatorState>(initialCalculatorState);
  const { toast } = useToast();

  const handleSliderChange = (val: number[]) => {
    setState((prev) => ({ ...prev, amount: val[0] }));
  };

  const handlePresetSelect = (preset: number) => {
    setState((prev) => ({ ...prev, amount: preset }));
  };

  const handleInputChange = (field: keyof CalculatorState, val: string) => {
    setState((prev) => ({ ...prev, [field]: val }));
  };

  const nextStep = () => {
    if (step === 1 && !state.purpose) {
      toast({
        title: "Selection Required",
        description: "Please select a funding purpose to continue.",
        variant: "destructive",
      });
      return;
    }
    if (step === 2 && (!state.timeInBusiness || !state.monthlyRevenue)) {
      toast({
        title: "Selection Required",
        description: "Please fill out your business profile to continue.",
        variant: "destructive",
      });
      return;
    }
    setStep((prev) => prev + 1);
  };

  const prevStep = () => {
    setStep((prev) => prev - 1);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!state.businessName || !state.firstName || !state.lastName || !state.email || !state.phone) {
      toast({
        title: "Incomplete Form",
        description: "Please fill out all contact fields to check your pre-qualification.",
        variant: "destructive",
      });
      return;
    }
    
    setLoading(true);
    
    // Save lead entry to Supabase database
    try {
      await (supabase as any).from("leads").insert([{
        first_name: state.firstName,
        last_name: state.lastName,
        business_name: state.businessName,
        email: state.email,
        phone: state.phone,
        amount: state.amount,
        purpose: state.purpose,
        monthly_revenue: state.monthlyRevenue,
        time_in_business: state.timeInBusiness
      }]);
    } catch (dbErr) {
      console.error("Supabase lead insertion error:", dbErr);
    }
    
    // Attempt webhook submission via GoDaddy local proxy script to bypass CORS, fallback to direct webhook for localhost
    const isLocalhost = window.location.hostname === "localhost" || window.location.hostname === "127.0.0.1";
    const webhookUrl = isLocalhost 
      ? (import.meta.env.VITE_ZOHO_WEBHOOK_URL || "https://flow.zoho.com/892759697/flow/webhook/incoming?zapikey=1001.c272b76efb605d41498f5743e00bf107.0255d1f2e43f57c0313469d6084b132f&isdebug=false")
      : "/submit-lead.php";

    try {
      const payload = {
        "First Name": state.firstName,
        "Last Name": state.lastName,
        "What is the funding purpose?": state.purpose,
        "Business Name": state.businessName,
        "Time in Business": state.timeInBusiness,
        "Monthly Gross Revenue": state.monthlyRevenue,
        "How much funding do you need?": state.amount,
        "Business Email": state.email,
        "Mobile Phone": state.phone,
        firstName: state.firstName,
        lastName: state.lastName,
        purpose: state.purpose,
        businessName: state.businessName,
        timeInBusiness: state.timeInBusiness,
        monthlyRevenue: state.monthlyRevenue,
        amount: state.amount,
        email: state.email,
        phone: state.phone,
        First_Name: state.firstName,
        Last_Name: state.lastName,
        Company: state.businessName,
        Email: state.email,
        Phone: state.phone,
        submittedAt: new Date().toISOString(),
        source: "SkyCapital Pre-Qualify Calculator"
      };

      if (isLocalhost) {
        // Send as both search query params + body fallback for local development testing
        const params = new URLSearchParams(
          Object.entries(payload).reduce((acc, [key, val]) => {
            acc[key] = String(val);
            return acc;
          }, {} as Record<string, string>)
        );
        const finalUrl = webhookUrl.includes("?") 
          ? `${webhookUrl}&${params.toString()}` 
          : `${webhookUrl}?${params.toString()}`;

        await fetch(finalUrl, {
          method: "POST",
          headers: {
            "Content-Type": "text/plain",
          },
          body: JSON.stringify(payload),
        });
      } else {
        // Production: send direct application/json to local PHP proxy (exempt from CORS)
        await fetch(webhookUrl, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        });
      }
    } catch (error) {
      console.error("Error sending lead data to Zoho webhook:", error);
    }
    
    // Simulate analyzing profile delay, then transition to success screen
    setTimeout(() => {
      setLoading(false);
      setStep(4);
      toast({
        title: "Pre-Qualification Approved!",
        description: "You have been pre-qualified. Check your options below.",
      });
    }, 1500);
  };

  const resetCalculator = () => {
    setState(initialCalculatorState);
    setStep(1);
  };

  const getZohoPreFilledUrl = () => {
    const baseUrl = "https://forms.zohopublic.com/skycapnow1/form/BusinessApplication/formperma/k4ySefBCGaIjXzTbs58TKi9KHTcjBurx7BVBYrs0buI";
    const params = new URLSearchParams({
      "SingleLine": state.businessName,
      "Name_First": state.firstName,
      "Name_Last": state.lastName,
      "Email": state.email,
      "PhoneNumber": state.phone,
      "Currency": state.amount.toString(),
      "businessname": state.businessName,
      "firstname": state.firstName,
      "lastname": state.lastName,
      "email": state.email,
      "phone": state.phone,
      "amount": state.amount.toString(),
      "purpose": state.purpose,
      "revenue": state.monthlyRevenue,
      "timeinbusiness": state.timeInBusiness
    });
    return `${baseUrl}?${params.toString()}`;
  };

  const formatCurrency = (val: number) => {
    if (val >= 1000000) {
      return `$${(val / 1000000).toFixed(1)}M`;
    }
    return `$${val.toLocaleString()}`;
  };

  const progressPercentage = (step / 3) * 100;

  return (
    <div className="w-full max-w-lg mx-auto bg-card border border-border/80 rounded-3xl shadow-elevated overflow-hidden transition-all duration-500 hover:border-primary/20 hover:shadow-glow">
      {/* Header & Progress Indicator */}
      {step < 4 && (
        <div className="bg-primary px-6 py-5 text-white">
          <div className="flex justify-between items-center mb-3">
            <span className="text-xs font-semibold uppercase tracking-widest text-accent">Pre-Qualify Online</span>
            <span className="text-xs font-medium text-white/70">Step {step} of 3</span>
          </div>
          <div className="w-full h-1 bg-white/10 rounded-full overflow-hidden">
            <div 
              className="h-full bg-accent transition-all duration-500 rounded-full" 
              style={{ width: `${progressPercentage}%` }}
            />
          </div>
        </div>
      )}

      {/* Form Content */}
      <div className="p-6 md:p-8">
        {step === 1 && (
          <div className="space-y-6 animate-scale-in">
            <div>
              <h3 className="text-xl font-bold text-foreground mb-1">How much funding do you need?</h3>
              <p className="text-sm text-muted-foreground">Select an amount from $20K up to $5.0M</p>
            </div>

            {/* Slider & Value Display */}
            <div className="space-y-4">
              <div className="flex justify-between items-baseline">
                <span className="text-sm font-semibold text-muted-foreground">$20,000</span>
                <span className="text-4xl font-extrabold text-primary select-none transition-all duration-200">
                  {formatCurrency(state.amount)}
                </span>
                <span className="text-sm font-semibold text-muted-foreground">$5,000,000</span>
              </div>
              <Slider
                min={20000}
                max={5000000}
                step={10000}
                value={[state.amount]}
                onValueChange={handleSliderChange}
                className="py-4"
              />
            </div>

            {/* Presets */}
            <div className="grid grid-cols-4 gap-2">
              {[50000, 150000, 500000, 1000000].map((preset) => (
                <button
                  key={preset}
                  type="button"
                  onClick={() => handlePresetSelect(preset)}
                  className={`py-2 text-xs font-bold rounded-lg border transition-all duration-200 ${
                    state.amount === preset
                      ? "bg-primary text-white border-primary"
                      : "bg-muted/50 border-border hover:border-primary/50 text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {formatCurrency(preset)}
                </button>
              ))}
            </div>

            {/* Purpose Selector */}
            <div className="space-y-3">
              <Label className="text-sm font-bold text-foreground">What is the funding purpose?</Label>
              <div className="grid grid-cols-2 gap-2">
                {["Working Capital", "Equipment Purchase", "Expansion / Marketing", "Inventory Growth", "Payroll Support", "Debt Refinance"].map((p) => (
                  <button
                    key={p}
                    type="button"
                    onClick={() => handleInputChange("purpose", p)}
                    className={`px-3 py-2.5 text-xs font-semibold text-left rounded-lg border transition-all duration-200 flex items-center justify-between ${
                      state.purpose === p
                        ? "bg-primary/5 border-primary text-primary"
                        : "bg-card border-border hover:border-primary/30 text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    <span>{p}</span>
                    {state.purpose === p && <Check className="w-3.5 h-3.5 text-primary" />}
                  </button>
                ))}
              </div>
            </div>

            {/* Next Button */}
            <Button onClick={nextStep} className="w-full mt-2" size="lg">
              Continue
              <ArrowRight className="w-4 h-4 ml-1" />
            </Button>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-6 animate-scale-in">
            <div>
              <h3 className="text-xl font-bold text-foreground mb-1">Tell us about your business</h3>
              <p className="text-sm text-muted-foreground">This helps customize the matching programs.</p>
            </div>

            {/* Monthly Gross Revenue */}
            <div className="space-y-3">
              <Label className="text-sm font-bold text-foreground">Monthly Gross Revenue</Label>
              <div className="grid grid-cols-1 gap-2">
                {[
                  "Under $10,000",
                  "$10,000 - $25,000",
                  "$25,000 - $50,000",
                  "$50,000 - $100,000",
                  "Over $100,000"
                ].map((rev) => (
                  <button
                    key={rev}
                    type="button"
                    onClick={() => handleInputChange("monthlyRevenue", rev)}
                    className={`px-4 py-3 text-sm font-semibold text-left rounded-lg border transition-all duration-200 flex items-center justify-between ${
                      state.monthlyRevenue === rev
                        ? "bg-primary/5 border-primary text-primary"
                        : "bg-card border-border hover:border-primary/30 text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    <span>{rev}</span>
                    {state.monthlyRevenue === rev && <Check className="w-4 h-4 text-primary" />}
                  </button>
                ))}
              </div>
            </div>

            {/* Time in Business */}
            <div className="space-y-3">
              <Label className="text-sm font-bold text-foreground">Time in Business</Label>
              <div className="grid grid-cols-2 gap-2">
                {[
                  "Under 6 Months",
                  "6 - 12 Months",
                  "1 - 2 Years",
                  "Over 2 Years"
                ].map((time) => (
                  <button
                    key={time}
                    type="button"
                    onClick={() => handleInputChange("timeInBusiness", time)}
                    className={`px-3 py-2.5 text-xs font-semibold text-left rounded-lg border transition-all duration-200 flex items-center justify-between ${
                      state.timeInBusiness === time
                        ? "bg-primary/5 border-primary text-primary"
                        : "bg-card border-border hover:border-primary/30 text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    <span>{time}</span>
                    {state.timeInBusiness === time && <Check className="w-3.5 h-3.5 text-primary" />}
                  </button>
                ))}
              </div>
            </div>

            {/* Buttons */}
            <div className="flex gap-3 pt-2">
              <Button variant="outline" onClick={prevStep} className="flex-1" size="lg">
                <ArrowLeft className="w-4 h-4 mr-1" />
                Back
              </Button>
              <Button onClick={nextStep} className="flex-[2]" size="lg">
                Continue
                <ArrowRight className="w-4 h-4 ml-1" />
              </Button>
            </div>
          </div>
        )}

        {step === 3 && (
          <form onSubmit={handleSubmit} className="space-y-6 animate-scale-in">
            <div>
              <h3 className="text-xl font-bold text-foreground mb-1">Check Pre-Qualification</h3>
              <p className="text-sm text-muted-foreground">Complete details to view your estimated funding terms.</p>
            </div>

            <div className="space-y-4">
              {/* Business Name */}
              <div className="space-y-1.5">
                <Label htmlFor="businessName" className="text-xs font-bold text-muted-foreground uppercase">Business Name</Label>
                <div className="relative">
                  <Building2 className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
                  <Input
                    id="businessName"
                    value={state.businessName}
                    onChange={(e) => handleInputChange("businessName", e.target.value)}
                    placeholder="Enter legal business name"
                    className="pl-9"
                    required
                  />
                </div>
              </div>

              {/* Name Details */}
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1.5">
                  <Label htmlFor="firstName" className="text-xs font-bold text-muted-foreground uppercase">First Name</Label>
                  <div className="relative">
                    <User className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
                    <Input
                      id="firstName"
                      value={state.firstName}
                      onChange={(e) => handleInputChange("firstName", e.target.value)}
                      placeholder="John"
                      className="pl-9"
                      required
                    />
                  </div>
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="lastName" className="text-xs font-bold text-muted-foreground uppercase">Last Name</Label>
                  <Input
                    id="lastName"
                    value={state.lastName}
                    onChange={(e) => handleInputChange("lastName", e.target.value)}
                    placeholder="Doe"
                    required
                  />
                </div>
              </div>

              {/* Email Address */}
              <div className="space-y-1.5">
                <Label htmlFor="email" className="text-xs font-bold text-muted-foreground uppercase">Business Email</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
                  <Input
                    id="email"
                    type="email"
                    value={state.email}
                    onChange={(e) => handleInputChange("email", e.target.value)}
                    placeholder="name@business.com"
                    className="pl-9"
                    required
                  />
                </div>
              </div>

              {/* Phone Number */}
              <div className="space-y-1.5">
                <Label htmlFor="phone" className="text-xs font-bold text-muted-foreground uppercase">Mobile Phone</Label>
                <div className="relative">
                  <PhoneCall className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
                  <Input
                    id="phone"
                    type="tel"
                    value={state.phone}
                    onChange={(e) => handleInputChange("phone", e.target.value)}
                    placeholder="(555) 000-0000"
                    className="pl-9"
                    required
                  />
                </div>
              </div>
            </div>

            {/* Buttons */}
            <div className="flex gap-3 pt-2">
              <Button type="button" variant="outline" onClick={prevStep} className="flex-1" size="lg" disabled={loading}>
                <ArrowLeft className="w-4 h-4 mr-1" />
                Back
              </Button>
              <Button type="submit" className="flex-[2] bg-accent text-accent-foreground shadow-accent hover:shadow-elevated hover:bg-accent/90" size="lg" disabled={loading}>
                {loading ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Analyzing Profile...
                  </>
                ) : (
                  <>
                    Check Qualification
                    <Sparkles className="w-4 h-4 ml-1.5 fill-accent-foreground text-accent-foreground" />
                  </>
                )}
              </Button>
            </div>
          </form>
        )}

        {step === 4 && (
          <div className="text-center py-6 space-y-6 animate-scale-in">
            {/* Visual Success Indicator */}
            <div className="w-20 h-20 rounded-full bg-emerald-100 dark:bg-emerald-950 flex items-center justify-center mx-auto mb-4 animate-bounce">
              <Check className="w-10 h-10 text-emerald-600 dark:text-emerald-400" />
            </div>

            <div className="space-y-2">
              <span className="inline-block px-3 py-1 bg-emerald-50 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400 rounded-full text-xs font-bold uppercase tracking-widest border border-emerald-200">
                Pre-Qualified successfully
              </span>
              <h3 className="text-2xl font-extrabold text-foreground">
                Congratulations, {state.firstName}!
              </h3>
              <p className="text-sm text-muted-foreground max-w-sm mx-auto leading-relaxed">
                Based on your monthly revenue of {state.monthlyRevenue} and business details, you pre-qualify for up to:
              </p>
              <div className="text-5xl font-black text-emerald-600 dark:text-emerald-400 tracking-tight my-4">
                {formatCurrency(Math.min(state.amount, 5000000))}
              </div>
            </div>

            {/* Estimated Terms Card */}
            <div className="bg-muted/50 rounded-2xl p-4 text-left border border-border max-w-sm mx-auto space-y-2.5">
              <div className="flex justify-between text-xs font-medium border-b border-border/80 pb-2">
                <span className="text-muted-foreground">Estimated Approval Speed</span>
                <span className="font-bold text-foreground">Same-Day (2-4 hrs)</span>
              </div>
              <div className="flex justify-between text-xs font-medium border-b border-border/80 pb-2">
                <span className="text-muted-foreground">Funding Timeframe</span>
                <span className="font-bold text-foreground">Within 24 Hours</span>
              </div>
              <div className="flex justify-between text-xs font-medium pb-1">
                <span className="text-muted-foreground">Required Documents</span>
                <span className="font-bold text-foreground">3 Months Bank Statements</span>
              </div>
            </div>

            {/* Call to Action to Finalize */}
            <div className="space-y-3 pt-2">
              <Button className="w-full bg-accent text-accent-foreground shadow-accent hover:shadow-elevated hover:bg-accent/90" size="xl" asChild>
                <a 
                  href={getZohoPreFilledUrl()} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2"
                >
                  Finalize Full Application
                  <ArrowRight className="w-5 h-5" />
                </a>
              </Button>
              <button 
                type="button" 
                onClick={resetCalculator}
                className="text-xs text-muted-foreground hover:text-primary transition-colors underline font-medium"
              >
                Recalculate Estimate
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default FundingCalculator;
