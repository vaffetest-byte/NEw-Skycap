import { useEffect, useRef } from "react";
import { Phone, ShieldCheck, Clock, Award, Star } from "lucide-react";
import FundingCalculator from "./FundingCalculator";
import useScrollAnimation from "@/hooks/useScrollAnimation";

// Dynamic canvas background rendering an Aurora Energy Beam and symmetrical curved grid warp
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

    // Mouse coordinates (for perspective tilting and warping)
    let mouseX = width / 2;
    let mouseY = height / 2;
    let targetMouseX = width / 2;
    let targetMouseY = height / 2;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      targetMouseX = e.clientX - rect.left;
      targetMouseY = e.clientY - rect.top;
    };

    const handleMouseLeave = () => {
      targetMouseX = width / 2;
      targetMouseY = height / 2;
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseleave", handleMouseLeave);

    // Energy spark particles inside the center beam
    interface Spark {
      y: number;
      speed: number;
      size: number;
      alpha: number;
      drift: number;
      driftSpeed: number;
    }

    const sparks: Spark[] = [];
    const maxSparks = 25;
    for (let i = 0; i < maxSparks; i++) {
      sparks.push({
        y: Math.random() * height,
        speed: Math.random() * 2 + 1,
        size: Math.random() * 2 + 1,
        alpha: Math.random() * 0.6 + 0.2,
        drift: 0,
        driftSpeed: (Math.random() - 0.5) * 0.05
      });
    }

    const draw = () => {
      time++;
      ctx.clearRect(0, 0, width, height);

      // Smooth mouse interpolation
      mouseX += (targetMouseX - mouseX) * 0.05;
      mouseY += (targetMouseY - mouseY) * 0.05;

      // Base coordinate shift for interactive 3D warp perspective
      const mouseShiftX = (mouseX - width / 2) * 0.12;
      const beamX = width / 2 + mouseShiftX;

      // 1. Draw central glowing aurora backdrop (Ambient center glow)
      const auraGrad = ctx.createRadialGradient(beamX, height / 2, 10, beamX, height / 2, Math.max(width * 0.35, 450));
      auraGrad.addColorStop(0, "rgba(20, 184, 166, 0.18)"); // Neon Teal
      auraGrad.addColorStop(0.3, "rgba(14, 165, 233, 0.06)"); // Sky Blue
      auraGrad.addColorStop(0.7, "rgba(99, 102, 241, 0.01)"); // Indigo
      auraGrad.addColorStop(1, "rgba(0, 0, 0, 0)");
      ctx.fillStyle = auraGrad;
      ctx.beginPath();
      ctx.arc(beamX, height / 2, Math.max(width * 0.35, 450), 0, Math.PI * 2);
      ctx.fill();

      // 2. Draw Hourglass Symmetrical Curved Grid Warp Lines
      const verticalLineCount = 22; // 22 lines on each side
      ctx.lineWidth = 0.8;

      for (let side = -1; side <= 1; side += 2) {
        for (let i = 1; i <= verticalLineCount; i++) {
          const progress = i / verticalLineCount;
          const waistOffset = side * Math.pow(progress, 1.6) * (width * 0.25);
          const flareOffset = side * Math.pow(progress, 1.3) * (width * 0.65);

          const xStart = beamX + flareOffset;
          const xControl1 = beamX + waistOffset;
          const xControl2 = beamX + waistOffset;
          const xEnd = beamX + flareOffset;

          ctx.beginPath();
          ctx.moveTo(xStart, 0);
          ctx.bezierCurveTo(xControl1, height * 0.3, xControl2, height * 0.7, xEnd, height);

          const lineAlpha = (1 - progress) * 0.18 + 0.02;
          ctx.strokeStyle = `rgba(20, 184, 166, ${lineAlpha})`;
          ctx.stroke();
        }
      }

      // 3. Draw Symmetrical Curved Horizontal Waves (Cylindrical grid layers)
      const horizontalLineCount = 12;
      const spacing = height / (horizontalLineCount - 1);
      ctx.lineWidth = 0.5;

      for (let j = 0; j < horizontalLineCount; j++) {
        const baseY = ((j * spacing + time * 0.5) % (height + spacing)) - spacing;
        
        ctx.beginPath();
        for (let x = 0; x < width + 10; x += 15) {
          const dx = x - beamX;
          const curveFactor = Math.cos((dx / width) * Math.PI) * 20;
          const y = baseY + (20 - curveFactor);

          const distFromCenter = Math.abs(dx) / (width / 2);
          const ringAlpha = Math.max(0, (1 - distFromCenter) * 0.08);

          if (x === 0) {
            ctx.moveTo(x, y);
          } else {
            ctx.lineTo(x, y);
          }
        }
        ctx.strokeStyle = `rgba(20, 184, 166, 0.08)`;
        ctx.stroke();
      }

      // 4. Draw Central Energy Beam (Multiple layered lines with core glow)
      const pulseBeamWidth = Math.sin(time * 0.04) * 2;
      
      // Layer A: Outer Teal Aura
      ctx.beginPath();
      ctx.moveTo(beamX, 0);
      ctx.lineTo(beamX, height);
      ctx.lineWidth = 45 + pulseBeamWidth * 5;
      ctx.strokeStyle = "rgba(20, 184, 166, 0.08)";
      ctx.stroke();

      // Layer B: Middle Cyan Glow
      ctx.beginPath();
      ctx.moveTo(beamX, 0);
      ctx.lineTo(beamX, height);
      ctx.lineWidth = 18 + pulseBeamWidth * 3;
      ctx.strokeStyle = "rgba(45, 212, 191, 0.18)";
      ctx.stroke();

      // Layer C: Bright White-Cyan Core Light
      ctx.beginPath();
      ctx.moveTo(beamX, 0);
      ctx.lineTo(beamX, height);
      ctx.lineWidth = 4 + pulseBeamWidth * 0.5;
      ctx.strokeStyle = "rgba(255, 255, 255, 0.75)";
      ctx.stroke();

      // 5. Draw ascending energy spark particles inside the beam
      sparks.forEach((p) => {
        p.y -= p.speed;
        p.drift += p.driftSpeed;
        
        if (p.y < 0) {
          p.y = height;
          p.speed = Math.random() * 2 + 1;
        }

        const sparkX = beamX + Math.sin(p.drift) * 8;
        
        ctx.beginPath();
        ctx.arc(sparkX, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(20, 184, 166, ${p.alpha})`;
        ctx.fill();
        
        ctx.beginPath();
        ctx.arc(sparkX, p.y, p.size * 0.4, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(255, 255, 255, 0.95)";
        ctx.fill();
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

  return <canvas ref={canvasRef} className="absolute inset-0 w-full h-full pointer-events-none opacity-90" />;
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