import { useEffect, useRef } from "react";
import { Phone, ShieldCheck, Clock, Award, Star } from "lucide-react";
import FundingCalculator from "./FundingCalculator";
import useScrollAnimation from "@/hooks/useScrollAnimation";

// Dynamic canvas background rendering an Animated Gradient Mesh (Aurora) with interactive particle gravity
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

    // Mesh gradient nodes that slide and bounce organically
    interface MeshNode {
      x: number;
      y: number;
      vx: number;
      vy: number;
      radius: number;
      color1: string;
      color2: string;
    }

    const meshNodes: MeshNode[] = [
      {
        x: width * 0.2,
        y: height * 0.3,
        vx: 0.35,
        vy: 0.25,
        radius: Math.min(width, height) * 0.7,
        color1: "rgba(16, 185, 129, 0.16)", // Emerald Green
        color2: "rgba(16, 185, 129, 0)"
      },
      {
        x: width * 0.8,
        y: height * 0.2,
        vx: -0.25,
        vy: 0.4,
        radius: Math.min(width, height) * 0.75,
        color1: "rgba(14, 165, 233, 0.18)", // Sky Blue
        color2: "rgba(14, 165, 233, 0)"
      },
      {
        x: width * 0.5,
        y: height * 0.7,
        vx: 0.45,
        vy: -0.3,
        radius: Math.min(width, height) * 0.85,
        color1: "rgba(99, 102, 241, 0.15)", // Indigo
        color2: "rgba(99, 102, 241, 0)"
      },
      {
        x: width * 0.3,
        y: height * 0.85,
        vx: -0.35,
        vy: -0.25,
        radius: Math.min(width, height) * 0.65,
        color1: "rgba(139, 92, 246, 0.15)", // Violet
        color2: "rgba(139, 92, 246, 0)"
      },
      {
        x: width * 0.85,
        y: height * 0.8,
        vx: 0.25,
        vy: -0.45,
        radius: Math.min(width, height) * 0.75,
        color1: "rgba(45, 212, 191, 0.16)", // Mint Teal
        color2: "rgba(45, 212, 191, 0)"
      }
    ];

    interface Particle {
      x: number;
      y: number;
      ox: number;
      oy: number;
      vx: number;
      vy: number;
      size: number;
      alpha: number;
      z: number;
      color: string;
      trail: { x: number; y: number }[];
    }

    const particles: Particle[] = [];
    const maxParticles = 60;
    const colors = [
      "rgba(14, 165, 233, ", // Sky Blue
      "rgba(16, 185, 129, ", // Emerald Green
      "rgba(99, 102, 241, ", // Indigo
      "rgba(45, 212, 191, "  // Teal
    ];

    for (let i = 0; i < maxParticles; i++) {
      const z = Math.random() * 2 + 1;
      const x = Math.random() * width;
      const y = Math.random() * height;
      particles.push({
        x,
        y,
        ox: x,
        oy: y,
        vx: (Math.random() - 0.5) * 0.2,
        vy: -Math.random() * 0.35 - 0.1, // Float upward
        size: Math.random() * 1.5 + 0.8,
        alpha: Math.random() * 0.35 + 0.1,
        z,
        color: colors[Math.floor(Math.random() * colors.length)],
        trail: []
      });
    }

    let mouseX = -1000;
    let mouseY = -1000;
    let targetMouseX = -1000;
    let targetMouseY = -1000;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      targetMouseX = e.clientX - rect.left;
      targetMouseY = e.clientY - rect.top;
    };

    const handleMouseLeave = () => {
      targetMouseX = -1000;
      targetMouseY = -1000;
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseleave", handleMouseLeave);

    const draw = () => {
      time++;
      ctx.clearRect(0, 0, width, height);

      // Smooth mouse interpolation
      if (targetMouseX > 0) {
        if (mouseX === -1000) {
          mouseX = targetMouseX;
          mouseY = targetMouseY;
        } else {
          mouseX += (targetMouseX - mouseX) * 0.08;
          mouseY += (targetMouseY - mouseY) * 0.08;
        }
      } else {
        mouseX = -1000;
        mouseY = -1000;
      }

      // 1. Draw Animated Gradient Mesh (Aurora) using screen blend mode
      ctx.globalCompositeOperation = "screen";
      meshNodes.forEach((node) => {
        // Move nodes and bounce off boundaries
        node.x += node.vx;
        node.y += node.vy;

        if (node.x < 0 || node.x > width) node.vx *= -1;
        if (node.y < 0 || node.y > height) node.vy *= -1;

        // Apply gentle mouse repulsion to the mesh nodes for interactive fluid warping
        if (mouseX > 0) {
          const dx = mouseX - node.x;
          const dy = mouseY - node.y;
          const dist = Math.hypot(dx, dy);
          if (dist < 400) {
            node.x -= (dx / dist) * 0.6;
            node.y -= (dy / dist) * 0.6;
          }
        }

        // Draw radial gradient blob
        const grad = ctx.createRadialGradient(node.x, node.y, 10, node.x, node.y, node.radius);
        grad.addColorStop(0, node.color1);
        grad.addColorStop(1, node.color2);
        
        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.arc(node.x, node.y, node.radius, 0, Math.PI * 2);
        ctx.fill();
      });

      // Restore normal composite operation for lines/particles
      ctx.globalCompositeOperation = "source-over";

      // 2. Draw Floating Capital Stream Ribbons
      ctx.lineWidth = 1;
      for (let w = 0; w < 2; w++) {
        ctx.beginPath();
        const phase = time * 0.003 * (w + 1);
        const amplitude = 25 + w * 12;
        ctx.strokeStyle = w === 0 
          ? "rgba(14, 165, 233, 0.06)" // Blue
          : "rgba(16, 185, 129, 0.05)"; // Green

        for (let x = 0; x < width + 20; x += 25) {
          const mouseParallax = mouseX > 0 ? (mouseX - width/2) * 0.03 * (w + 1) : 0;
          const yBase = height * 0.52 - (x / width) * 80 + mouseParallax;
          const y = yBase + Math.sin(x * 0.0012 + phase) * amplitude;
          if (x === 0) {
            ctx.moveTo(x, y);
          } else {
            ctx.lineTo(x, y);
          }
        }
        ctx.stroke();
      }

      // 3. Draw and Update Particles with Gravitational Physics
      particles.forEach((p) => {
        p.ox += p.vx;
        p.oy += p.vy;

        if (p.oy < -10) {
          p.oy = height + 10;
          p.ox = Math.random() * width;
        }
        if (p.ox < -10 || p.ox > width + 10) {
          p.ox = Math.random() * width;
        }

        let targetX = p.ox;
        let targetY = p.oy;

        if (mouseX > 0) {
          const dx = mouseX - p.x;
          const dy = mouseY - p.y;
          const dist = Math.hypot(dx, dy);
          if (dist < 250) {
            const force = (250 - dist) * 0.0015;
            p.x += (dx / dist) * force;
            p.y += (dy / dist) * force;
            targetX = p.ox + (dx / dist) * (250 - dist) * 0.12;
            targetY = p.oy + (dy / dist) * (250 - dist) * 0.12;
          }
        }

        p.x += (targetX - p.x) * 0.05;
        p.y += (targetY - p.y) * 0.05;

        p.trail.push({ x: p.x, y: p.y });
        if (p.trail.length > 6) {
          p.trail.shift();
        }

        if (p.trail.length > 1) {
          ctx.beginPath();
          ctx.moveTo(p.trail[0].x, p.trail[0].y);
          for (let t = 1; t < p.trail.length; t++) {
            ctx.lineTo(p.trail[t].x, p.trail[t].y);
          }
          ctx.strokeStyle = p.color + (p.alpha * 0.3) + ")";
          ctx.lineWidth = p.size * 0.7;
          ctx.stroke();
        }

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = p.color + p.alpha + ")";
        ctx.fill();

        for (let j = 0; j < particles.length; j++) {
          const p2 = particles[j];
          const dist = Math.hypot(p.x - p2.x, p.y - p2.y);
          if (dist < 100) {
            const lineAlpha = (1 - dist / 100) * 0.04;
            ctx.strokeStyle = `rgba(255, 255, 255, ${lineAlpha})`;
            ctx.lineWidth = 0.3;
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

  return <canvas ref={canvasRef} className="absolute inset-0 w-full h-full pointer-events-none opacity-80" />;
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