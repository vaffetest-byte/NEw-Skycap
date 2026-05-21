import { useEffect, useRef } from "react";
import { Phone, ShieldCheck, Clock, Award, Star } from "lucide-react";
import FundingCalculator from "./FundingCalculator";
import useScrollAnimation from "@/hooks/useScrollAnimation";

// Dynamic canvas background rendering flowing capital streams, golden coins, and interactive growth nodes
const FundingBackgroundAnimation = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);
    let time = 0;

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener("resize", handleResize);

    interface Particle {
      x: number;
      y: number;
      vx: number;
      vy: number;
      size: number;
      alpha: number;
      type: "coin" | "trend" | "dot";
      angle: number;
      angularSpeed: number;
      label?: string;
    }

    const particles: Particle[] = [];
    const maxParticles = 40;
    const trendLabels = ["+25%", "+80%", "📈", "GROWTH", "SUCCESS"];

    for (let i = 0; i < maxParticles; i++) {
      const typeRand = Math.random();
      let type: "coin" | "trend" | "dot" = "dot";
      if (typeRand > 0.85) type = "coin";
      else if (typeRand > 0.70) type = "trend";

      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.25,
        vy: -Math.random() * 0.4 - 0.15, // Drift upwards
        size: Math.random() * 2 + 1,
        alpha: Math.random() * 0.35 + 0.1,
        type,
        angle: Math.random() * Math.PI * 2,
        angularSpeed: (Math.random() - 0.5) * 0.02,
        label: trendLabels[Math.floor(Math.random() * trendLabels.length)]
      });
    }

    let mouseX = -1000;
    let mouseY = -1000;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouseX = e.clientX - rect.left;
      mouseY = e.clientY - rect.top;
    };

    const handleMouseLeave = () => {
      mouseX = -1000;
      mouseY = -1000;
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseleave", handleMouseLeave);

    const draw = () => {
      time++;
      ctx.clearRect(0, 0, width, height);

      // 1. Draw Flowing Capital Streams (Sine Waves representing money and liquidity flows)
      ctx.lineWidth = 1.5;
      for (let w = 0; w < 3; w++) {
        ctx.beginPath();
        const phase = time * 0.005 * (w + 1) + w * (Math.PI / 3);
        const amplitude = 25 + w * 12;
        const frequency = 0.0015 + w * 0.0008;
        
        // Cycle colors: Sky Blue, Money Green, Soft Mint
        const strokeColors = [
          `rgba(14, 165, 233, ${0.08 - w * 0.02})`, // Blue
          `rgba(16, 185, 129, ${0.07 - w * 0.02})`, // Green
          `rgba(45, 212, 191, ${0.06 - w * 0.02})`  // Mint Teal
        ];
        ctx.strokeStyle = strokeColors[w];

        for (let x = 0; x < width; x += 15) {
          // Wave rises gently toward the right side of the screen
          const yBase = height * 0.55 - (x / width) * 120;
          const y = yBase + Math.sin(x * frequency + phase) * amplitude;
          if (x === 0) {
            ctx.moveTo(x, y);
          } else {
            ctx.lineTo(x, y);
          }
        }
        ctx.stroke();
      }

      // 2. Draw Interactive Ripple Nodes
      if (mouseX > 0) {
        ctx.beginPath();
        const rippleRadius = 80 + Math.sin(time * 0.05) * 10;
        ctx.arc(mouseX, mouseY, rippleRadius, 0, Math.PI * 2);
        const gradient = ctx.createRadialGradient(mouseX, mouseY, 5, mouseX, mouseY, rippleRadius);
        gradient.addColorStop(0, "rgba(14, 165, 233, 0.08)");
        gradient.addColorStop(1, "rgba(14, 165, 233, 0)");
        ctx.fillStyle = gradient;
        ctx.fill();
      }

      // 3. Draw and Update Particles
      particles.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;
        p.angle += p.angularSpeed;

        // Reset particle position when it floats off-screen
        if (p.y < -30) {
          p.y = height + 30;
          p.x = Math.random() * width;
        }
        if (p.x < -30 || p.x > width + 30) {
          p.x = Math.random() * width;
        }

        ctx.save();

        if (p.type === "coin") {
          // Draw floating golden/emerald coin
          ctx.translate(p.x, p.y);
          ctx.rotate(p.angle);
          ctx.beginPath();
          ctx.ellipse(0, 0, p.size * 4 + 4, p.size * 2.5 + 2.5, 0, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(16, 185, 129, ${p.alpha * 0.75})`; // Money Green
          ctx.fill();
          ctx.strokeStyle = `rgba(255, 255, 255, ${p.alpha})`;
          ctx.lineWidth = 1;
          ctx.stroke();

          // Inner dollar sign
          ctx.fillStyle = `rgba(255, 255, 255, ${p.alpha * 0.95})`;
          ctx.font = `bold ${Math.floor(p.size * 4.5 + 6)}px Inter, sans-serif`;
          ctx.textAlign = "center";
          ctx.textBaseline = "middle";
          ctx.fillText("$", 0, 0);

        } else if (p.type === "trend" && p.label) {
          // Draw growth rate indicator
          ctx.fillStyle = `rgba(14, 165, 233, ${p.alpha})`; // Sky blue
          ctx.font = `bold ${Math.floor(p.size * 3.5 + 7)}px Inter, sans-serif`;
          ctx.fillText(p.label, p.x, p.y);

        } else {
          // Draw standard glowing dot
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(255, 255, 255, ${p.alpha})`;
          ctx.fill();
        }

        ctx.restore();

        // Subtle connection lines to nearby particles
        for (let j = 0; j < particles.length; j++) {
          const p2 = particles[j];
          const dist = Math.hypot(p.x - p2.x, p.y - p2.y);
          if (dist < 130) {
            const lineAlpha = (1 - dist / 130) * 0.08;
            ctx.strokeStyle = `rgba(255, 255, 255, ${lineAlpha})`;
            ctx.lineWidth = 0.5;
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.stroke();
          }
        }
      });

      animationFrameId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseleave", handleMouseLeave);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return <canvas ref={canvasRef} className="absolute inset-0 w-full h-full pointer-events-none opacity-60" />;
};

export const Hero = () => {
  const { ref: contentRef, isVisible: contentVisible } = useScrollAnimation();

  return (
    <section className="relative min-h-screen gradient-hero overflow-hidden flex items-center pt-28 pb-20 md:py-32" aria-label="Business Funding Hero Section">
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-96 h-96 bg-secondary/15 rounded-full blur-3xl animate-float will-change-transform" />
        <div className="absolute bottom-20 right-10 w-80 h-80 bg-accent/10 rounded-full blur-3xl animate-float will-change-transform" style={{ animationDelay: '2s' }} />
      </div>

      {/* Animated Funding Particle Network Background */}
      <FundingBackgroundAnimation />

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