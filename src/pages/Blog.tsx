import { Link } from 'react-router-dom';
import { useBlogPosts } from '@/hooks/useBlogPosts';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import { Calendar, DollarSign, Building2, ArrowLeft, TrendingUp, Briefcase } from 'lucide-react';
import { format } from 'date-fns';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import SEOHead from '@/components/SEOHead';

// Blog SEO configuration
const BLOG_SEO = {
  title: 'Funding Success Stories | Business Funding Blog | SkyCapital',
  description: 'Discover how SkyCapital has helped businesses secure funding nationwide. Read success stories of MCA, working capital loans, and small business financing deals.',
  canonicalUrl: 'https://skycapnow.com/blog',
};

function formatCurrency(amount: number) {
  if (amount >= 1000000) {
    return `$${(amount / 1000000).toFixed(1)}M`;
  } else if (amount >= 1000) {
    return `$${(amount / 1000).toFixed(0)}K`;
  }
  return `$${amount.toLocaleString()}`;
}

interface BlogPost {
  id: string;
  title: string;
  content: string;
  featured_image_url?: string;
  funding_amount?: number;
  company_name: string;
  deal_date?: string;
}

// Sample posts for display when database is empty
const samplePosts: BlogPost[] = [
  {
    id: '1',
    title: 'TechFlow Industries Secures $2.5M Growth Capital',
    content: 'TechFlow Industries, a leading manufacturing automation company, has successfully secured $2.5 million in growth capital funding. This investment will fuel their expansion into new markets and accelerate their innovative production line development.',
    featured_image_url: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&q=80',
    funding_amount: 2500000,
    company_name: 'TechFlow Industries',
    deal_date: '2024-01-15',
  },
  {
    id: '2',
    title: 'GreenLeaf Farms Receives $850K Equipment Financing',
    content: 'GreenLeaf Farms has obtained $850,000 in equipment financing to modernize their sustainable agriculture operations. The funding will be used to purchase state-of-the-art irrigation systems and automated harvesting equipment.',
    featured_image_url: 'https://images.unsplash.com/photo-1625246333195-78d9c38ad449?w=800&q=80',
    funding_amount: 850000,
    company_name: 'GreenLeaf Farms',
    deal_date: '2024-02-08',
  },
  {
    id: '3',
    title: 'Metro Construction Group Closes $4.2M SBA Loan',
    content: 'Metro Construction Group has closed a $4.2 million SBA loan to support their commercial development projects across the tri-state area. This funding enables them to take on larger contracts and expand their workforce significantly.',
    featured_image_url: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=800&q=80',
    funding_amount: 4200000,
    company_name: 'Metro Construction Group',
    deal_date: '2024-01-28',
  },
  {
    id: '4',
    title: 'HealthFirst Medical Supplies Obtains $1.8M Working Capital',
    content: 'HealthFirst Medical Supplies has secured $1.8 million in working capital to expand their inventory and distribution network. This strategic funding will help them meet growing demand from healthcare facilities nationwide.',
    featured_image_url: 'https://images.unsplash.com/photo-1538108149393-fbbd81895907?w=800&q=80',
    funding_amount: 1800000,
    company_name: 'HealthFirst Medical',
    deal_date: '2024-02-20',
  },
  {
    id: '5',
    title: 'Summit Logistics Receives $3.1M Fleet Expansion Funding',
    content: 'Summit Logistics has obtained $3.1 million to expand their transportation fleet with 25 new vehicles. This investment will significantly increase their delivery capacity and service coverage area.',
    featured_image_url: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=800&q=80',
    funding_amount: 3100000,
    company_name: 'Summit Logistics',
    deal_date: '2024-03-05',
  },
  {
    id: '6',
    title: 'Coastal Seafood Co. Secures $1.2M Expansion Capital',
    content: 'Coastal Seafood Co. has secured $1.2 million to expand their processing facility and distribution network. The family-owned business plans to increase capacity by 40% and enter new regional markets.',
    featured_image_url: 'https://images.unsplash.com/photo-1559827291-72ee739d0d9a?w=800&q=80',
    funding_amount: 1200000,
    company_name: 'Coastal Seafood Co.',
    deal_date: '2024-03-12',
  },
];

function BlogPostCard({ post, featured = false }: { post: BlogPost; featured?: boolean }) {
  return (
    <article 
      className={`group relative overflow-hidden rounded-2xl border border-border/50 transition-all duration-500 hover:shadow-elevated hover:border-primary/20 ${
        featured ? 'md:col-span-2 md:row-span-2' : ''
      }`}
    >
      <div className={`relative ${featured ? 'aspect-[16/9]' : 'aspect-[4/3]'}`}>
        {post.featured_image_url ? (
          <img
            src={post.featured_image_url}
            alt={post.title}
            loading="lazy"
            className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          />
        ) : (
          <div className="absolute inset-0 w-full h-full bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center">
            <Briefcase className="w-16 h-16 text-primary/40" />
          </div>
        )}
        
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />
        
        {/* Badges */}
        <div className="absolute top-4 left-4 flex flex-wrap gap-2 z-10">
          {post.funding_amount && (
            <Badge className="bg-accent text-accent-foreground font-semibold shadow-lg backdrop-blur-sm">
              <DollarSign className="h-3 w-3 mr-1" />
              {formatCurrency(post.funding_amount)}
            </Badge>
          )}
        </div>
        
        {/* Content */}
        <div className="absolute bottom-0 left-0 right-0 p-6 text-white z-10">
          <div className="flex items-center gap-3 mb-3 text-sm text-white/80">
            <span className="flex items-center gap-1.5">
              <Building2 className="h-4 w-4" />
              {post.company_name}
            </span>
            {post.deal_date && (
              <span className="flex items-center gap-1.5">
                <Calendar className="h-4 w-4" />
                {format(new Date(post.deal_date), 'MMM yyyy')}
              </span>
            )}
          </div>
          
          <h2 className={`font-heading font-bold leading-tight mb-2 transition-colors group-hover:text-accent ${
            featured ? 'text-2xl md:text-3xl' : 'text-lg md:text-xl'
          }`}>
            {post.title}
          </h2>
          
          {featured && (
            <p className="text-white/80 line-clamp-2 text-sm md:text-base">
              {post.content}
            </p>
          )}
        </div>
      </div>
    </article>
  );
}

function BlogSkeleton({ featured = false }: { featured?: boolean }) {
  return (
    <div className={`rounded-2xl overflow-hidden bg-card border ${featured ? 'md:col-span-2 md:row-span-2' : ''}`}>
      <Skeleton className={`w-full ${featured ? 'aspect-[16/9]' : 'aspect-[4/3]'}`} />
    </div>
  );
}

function StatsCard({ icon: Icon, value, label }: { icon: React.ComponentType<{ className?: string }>; value: string; label: string }) {
  return (
    <div className="text-center">
      <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-accent/20 text-accent mb-3">
        <Icon className="w-6 h-6" />
      </div>
      <div className="text-3xl md:text-4xl font-heading font-bold text-white mb-1">{value}</div>
      <div className="text-primary-foreground/70 text-sm">{label}</div>
    </div>
  );
}

export default function Blog() {
  const { data: posts, isLoading, error } = useBlogPosts();
  
  // Use sample posts if no real posts exist
  const displayPosts = posts && posts.length > 0 ? posts : samplePosts;
  const isShowingSamples = !posts || posts.length === 0;

  // Generate JSON-LD for blog listing
  const blogJsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "Blog",
      "name": "SkyCapital Funding Blog",
      "description": "Success stories and funding news from SkyCapital",
      "url": "https://skycapnow.com/blog",
      "publisher": {
        "@type": "Organization",
        "name": "SkyCapital",
        "logo": "https://skycapnow.com/favicon.png"
      },
      "blogPost": displayPosts.slice(0, 10).map(post => ({
        "@type": "BlogPosting",
        "headline": post.title,
        "description": post.content.substring(0, 160),
        "image": post.featured_image_url || "https://skycapnow.com/favicon.png",
        "datePublished": post.deal_date || new Date().toISOString(),
        "author": {
          "@type": "Organization",
          "name": "SkyCapital"
        },
        "publisher": {
          "@type": "Organization",
          "name": "SkyCapital",
          "logo": {
            "@type": "ImageObject",
            "url": "https://skycapnow.com/favicon.png"
          }
        }
      }))
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      "itemListElement": [
        {
          "@type": "ListItem",
          "position": 1,
          "name": "Home",
          "item": "https://skycapnow.com/"
        },
        {
          "@type": "ListItem",
          "position": 2,
          "name": "Funding Blog",
          "item": "https://skycapnow.com/blog"
        }
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <SEOHead
        title={BLOG_SEO.title}
        description={BLOG_SEO.description}
        canonicalUrl={BLOG_SEO.canonicalUrl}
        jsonLd={blogJsonLd}
      />
      <Navbar />
      
      {/* Hero Header */}
      <header className="relative pt-40 pb-20 md:pt-48 md:pb-28 overflow-hidden">
        <div className="absolute inset-0 gradient-hero" />
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1560472355-536de3962603?w=1920&q=80')] bg-cover bg-center opacity-10" />
        <div className="container relative z-10">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-white/60 hover:text-white transition-colors mb-8 group"
          >
            <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
            Back to Home
          </Link>
          
          <div className="max-w-3xl">
            <Badge className="bg-accent/20 text-accent border-accent/30 mb-6">
              <TrendingUp className="w-3 h-3 mr-1" />
              Success Stories
            </Badge>
            
            <h1 className="text-4xl md:text-6xl font-heading font-bold text-white mb-6 leading-tight">
              Funding Blog
            </h1>
            
            <p className="text-xl text-white/70 leading-relaxed">
              Discover how we've helped businesses across industries secure the capital they need to grow, expand, and thrive.
            </p>
          </div>
          
          {/* Stats */}
          <div className="grid grid-cols-3 gap-8 mt-16 pt-12 border-t border-white/10 max-w-2xl">
            <StatsCard icon={DollarSign} value="$50M+" label="Total Funded" />
            <StatsCard icon={Building2} value="200+" label="Businesses Helped" />
            <StatsCard icon={TrendingUp} value="98%" label="Success Rate" />
          </div>
        </div>
      </header>

      {/* Content */}
      <main className="container py-16 md:py-24">
        {isLoading ? (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            <BlogSkeleton featured />
            {[...Array(4)].map((_, i) => (
              <BlogSkeleton key={i} />
            ))}
          </div>
        ) : error ? (
          <div className="text-center py-16">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-destructive/10 text-destructive mb-4">
              <Briefcase className="w-8 h-8" />
            </div>
            <p className="text-destructive text-lg">Failed to load blog posts. Please try again later.</p>
          </div>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 auto-rows-fr">
            {displayPosts.map((post, index) => (
              <BlogPostCard key={post.id} post={post} featured={index === 0} />
            ))}
          </div>
        )}
      </main>
      
      <Footer />
    </div>
  );
}
