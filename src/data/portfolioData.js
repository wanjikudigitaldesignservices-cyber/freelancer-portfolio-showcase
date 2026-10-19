export const defaultProfile = {
  name: "Alex Vance",
  tagline: "Senior Full-Stack Product Engineer & Systems Architect",
  bio: "I partner with funded startups, founders, and scaling businesses to take software from concept to production in weeks, not months.",
  status: "Available for Q4/Q1 Client Engagements",
  location: "San Francisco, CA • Available Worldwide (Remote)",
  hourlyRate: 110,
  avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80",
  experienceYears: "8+",
  revenueDelivered: "$3.5M+",
  shippedProjects: "48",
  clientSatisfaction: "100%",
  skills: [
    "React 19 & Next.js",
    "Node.js & TypeScript",
    "PostgreSQL & SQLite",
    "Tailwind CSS & Modern UI",
    "Cloud CI/CD & Vercel",
    "Stripe & Webhook Systems",
    "REST & GraphQL APIs"
  ]
};

export const initialProjects = [
  {
    id: "PRJ-01",
    title: "ApexVentures — Venture Capital Dealflow & Investor Portal",
    client: "Apex Global Capital (San Francisco)",
    category: "Full-Stack Web App",
    thumbnail: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80",
    summary: "Built an investment pipeline dashboard handling $45M in syndicated venture capital rounds.",
    metrics: "+340% Deal Velocity • $45M Processed",
    techStack: ["Next.js", "TypeScript", "Tailwind", "Supabase", "Chart.js"],
    challenge: "The fund was managing syndicates through manual spreadsheets and email threads, slowing deal closure times by weeks.",
    solution: "Designed and engineered a centralized real-time dealroom with electronic signing, investor allocation formulas, and automated capital call notices.",
    liveUrl: "https://primehaven-property-platform.vercel.app",
    testimonial: {
      quote: "Alex transformed our entire operational pipeline. What used to take our analysts 3 days now happens automatically in seconds.",
      author: "David Vance",
      role: "Managing Partner, Apex Global"
    }
  },
  {
    id: "PRJ-02",
    title: "Crown Hotels — Multi-Property Reservation & Guest Engine",
    client: "Crown Hospitality Group",
    category: "Full-Stack Web App",
    thumbnail: "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=800&q=80",
    summary: "Reservation portal with instant room availability, secure checkout, and calendar sync.",
    metrics: "+62% Direct Bookings • Zero Overbooking",
    techStack: ["React", "Vite", "Node.js", "PostgreSQL", "Stripe API"],
    challenge: "Relying purely on third-party OTAs cost Crown Hotels 22% in commission fees per booking with zero guest relationship retention.",
    solution: "Delivered a direct booking engine with mobile-optimized guest check-in, automated confirmations, and dynamic room pricing.",
    liveUrl: "https://sme-booking-system.vercel.app",
    testimonial: {
      quote: "Direct bookings increased significantly within our first month. The investment paid for itself multiple times over.",
      author: "Elena Rostova",
      role: "Chief Operating Officer, Crown Hotels"
    }
  },
  {
    id: "PRJ-03",
    title: "CognitiveStream — Semantic Knowledge Search System",
    client: "Cognitive AI Labs",
    category: "AI & Systems",
    thumbnail: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=800&q=80",
    summary: "Semantic indexing service searching 100,000+ technical blueprints for autonomous developer query discovery.",
    metrics: "99.4% Extraction Accuracy • <180ms Latency",
    techStack: ["Python", "FastAPI", "Vector DB", "Embeddings", "React"],
    challenge: "Engineers were spending 12 hours weekly searching through unindexed documentation across multiple repositories.",
    solution: "Built a high-performance semantic vector retrieval engine using custom endpoints with hybrid sparse-dense ranking.",
    liveUrl: "https://skillforge-learning-platform-sepia.vercel.app",
    testimonial: {
      quote: "Alex has a rare ability to understand complex distributed systems and turn them into intuitive software that engineers love.",
      author: "Dr. Ethan Sterling",
      role: "VP of Engineering, Cognitive AI"
    }
  },
  {
    id: "PRJ-04",
    title: "PrimeHaven — Commercial Real Estate Showcase",
    client: "Pacific Coast Realty Partners",
    category: "UI/UX & Web",
    thumbnail: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80",
    summary: "Visual property showcase with interactive mortgage calculators, HD gallery walkthroughs, and direct broker routing.",
    metrics: "4.9★ User Score • 14,000 Monthly Visitors",
    techStack: ["React", "Tailwind CSS v4", "Lucide", "Vercel Edge"],
    challenge: "Old portal suffered from high bounce rates due to clunky search filters and slow mobile load times.",
    solution: "Rebuilt from ground up with instant client-side filtering, sleek typography, and frictionless inquiry forms.",
    liveUrl: "https://primehaven-property-platform.vercel.app",
    testimonial: {
      quote: "Our qualified inquiries tripled immediately. The UI aesthetics blew our clients away.",
      author: "Sophia Chen",
      role: "Broker & Founder, Pacific Coast Realty"
    }
  }
];

export const initialServices = [
  {
    id: "SRV-MVP",
    title: "The MVP Sprint",
    price: "$3,800",
    duration: "2–3 Weeks",
    description: "Designed for founders needing to validate a software concept and pitch with real functioning code.",
    deliverables: [
      "Full-Stack Web App (React / Next.js)",
      "User Authentication & Database Schema",
      "Payment Processing (Stripe / Webhooks)",
      "Production Cloud Deployment (Vercel)",
      "14 Days Post-Launch Bug Warranty"
    ],
    recommended: true
  },
  {
    id: "SRV-FULL",
    title: "Full Product Engineering",
    price: "$7,500",
    duration: "4–6 Weeks",
    description: "End-to-end custom platform development for scaling startups and businesses with complex workflows.",
    deliverables: [
      "Custom Design System & Interactive Prototypes",
      "High-Throughput Backend & REST API",
      "Role-Based Access Control & Admin Console",
      "Automated Unit & Integration Testing",
      "CI/CD Pipelines & Observability Metrics",
      "30 Days Dedicated Support"
    ],
    recommended: false
  },
  {
    id: "SRV-ADVISORY",
    title: "Fractional Tech Lead / Architect",
    price: "$4,200/mo",
    duration: "Monthly Retainer",
    description: "Ongoing architectural guidance, code reviews, DevOps maintenance, and sprint roadmapping.",
    deliverables: [
      "Weekly Architecture Strategy Calls",
      "Direct Slack/Discord Team Access",
      "Code Reviews & Security Audits",
      "Technical Hiring & Interview Support",
      "Guaranteed 24h Response SLA"
    ],
    recommended: false
  }
];
