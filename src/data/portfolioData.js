export const defaultProfile = {
  name: "Alex Vance Mwangi",
  tagline: "Senior Full-Stack Product Engineer & Systems Architect",
  bio: "I partner with funded startups, innovative SMEs, and founders to take ambitious digital products from zero to production-grade software in weeks, not months.",
  status: "Available for Q4/Q1 Projects",
  location: "Nairobi, Kenya • Working Globally (Remote)",
  hourlyRate: 85,
  avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80",
  experienceYears: "8+",
  revenueDelivered: "$2.4M+",
  shippedProjects: "46",
  clientSatisfaction: "100%",
  skills: [
    "React 19 & Next.js",
    "Node.js & Go",
    "AI Agents & MCP",
    "PostgreSQL & BigQuery",
    "Tailwind CSS & UI/UX",
    "Cloud CI/CD & Vercel",
    "Stripe & M-Pesa APIs"
  ]
};

export const initialProjects = [
  {
    id: "PRJ-01",
    title: "ApexVentures — Private Equity Dealflow & Investor Portal",
    client: "Apex Global Capital (San Francisco)",
    category: "Full-Stack Web App",
    thumbnail: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80",
    summary: "Built an institutional-grade investment pipeline dashboard handling $45M in syndicated venture capital rounds.",
    metrics: "+340% Deal Velocity • $45M Processed",
    techStack: ["Next.js", "TypeScript", "Tailwind", "Supabase", "Chart.js"],
    challenge: "The fund was managing syndicates through chaotic spreadsheets and fragmented email threads, slowing deal closure times by weeks.",
    solution: "Designed and engineered a centralized real-time dealroom with electronic signing, investor allocation algorithms, and automated investor capital call notices.",
    liveUrl: "https://apex-business-park.vercel.app",
    testimonial: {
      quote: "Alex transformed our entire operational pipeline. What used to take our analysts 3 days now happens automatically in 15 seconds.",
      author: "David Vance",
      role: "Managing General Partner, Apex Global"
    }
  },
  {
    id: "PRJ-02",
    title: "Crown Hotels — Real-Time Multi-Property Booking Engine",
    client: "Crown Hospitality Group",
    category: "Full-Stack Web App",
    thumbnail: "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=800&q=80",
    summary: "High-converting boutique reservation portal with instant room availability, M-Pesa/Stripe checkout, and calendar sync.",
    metrics: "+62% Direct Bookings • Zero Overbooking",
    techStack: ["React", "Vite", "Node.js", "PostgreSQL", "M-Pesa API"],
    challenge: "Relying purely on third-party OTAs cost Crown Hotels 22% in commission fees per booking with zero guest relationship retention.",
    solution: "Delivered a lightning-fast direct booking engine with mobile-optimized guest check-in, automated SMS confirmations, and dynamic room pricing.",
    liveUrl: "https://crown-hotels.vercel.app",
    testimonial: {
      quote: "Direct bookings skyrocketed within our first month. The return on investment paid for Alex's engagement three times over.",
      author: "Elena Rostova",
      role: "Chief Operating Officer, Crown Hotels"
    }
  },
  {
    id: "PRJ-03",
    title: "NeuroSift — Autonomous Multimodal Agent Knowledge System",
    client: "Cognitive AI Labs",
    category: "AI & Systems",
    thumbnail: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=800&q=80",
    summary: "Enterprise Model Context Protocol (MCP) server integration indexing 100,000+ technical blueprints for autonomous LLM discovery.",
    metrics: "99.4% Extraction Accuracy • <180ms Latency",
    techStack: ["Python", "FastAPI", "Vector DB", "MCP Protocol", "Claude 3.5 Sonnet"],
    challenge: "Enterprise engineers were spending 12 hours weekly searching through non-standard PDF technical documentation.",
    solution: "Built a high-performance semantic vector retrieval engine using custom MCP tool endpoints with hybrid sparse-dense ranking.",
    liveUrl: "https://skillforge-learning-platform-sepia.vercel.app",
    testimonial: {
      quote: "Alex has a rare ability to understand complex distributed systems and turn them into intuitive software that engineers love.",
      author: "Dr. Ethan Mwangi",
      role: "VP of Engineering, Cognitive AI"
    }
  },
  {
    id: "PRJ-04",
    title: "LuxeRent — Prime Commercial Real Estate Marketplace",
    client: "Kilimani Realty Partners",
    category: "UI/UX & Web",
    thumbnail: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80",
    summary: "Visual property showcase with interactive mortgage calculators, 4K gallery walkthroughs, and direct WhatsApp agent routing.",
    metrics: "4.9★ User Score • 12,000 Monthly Visitors",
    techStack: ["React", "Tailwind CSS v4", "Lucide", "Vercel Edge"],
    challenge: "Old portal suffered from high 68% bounce rates due to clunky search filters and slow mobile load times.",
    solution: "Rebuilt from ground up with instant client-side filtering, sleek obsidian typography, and high-conversion WhatsApp inquiry CTA.",
    liveUrl: "https://primehaven-property-platform.vercel.app",
    testimonial: {
      quote: "Our inquiries tripled immediately. The UI aesthetics blew our luxury clients away.",
      author: "Sophia Chen",
      role: "Broker & Founder, Kilimani Realty"
    }
  }
];

export const initialServices = [
  {
    id: "SRV-MVP",
    title: "The MVP Sprint",
    price: "$3,800",
    duration: "2–3 Weeks",
    description: "Perfect for founders needing to validate a software concept and pitch to investors with real functioning software.",
    deliverables: [
      "Full-Stack Web App (React / Next.js)",
      "User Authentication & Database Architecture",
      "Payment Processing (Stripe / M-Pesa)",
      "Production Cloud Deployment (Vercel / AWS)",
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
      "High-Throughput Backend & REST/GraphQL API",
      "Role-Based Access Control & Admin Console",
      "Full Automated Unit & Integration Testing",
      "CI/CD Pipelines & Observability Metrics",
      "30 Days Dedicated Support"
    ],
    recommended: false
  },
  {
    id: "SRV-ADVISORY",
    title: "Fractional Tech Lead / CTO",
    price: "$4,200/mo",
    duration: "Monthly Retainer",
    description: "Ongoing architectural guidance, code reviews, DevOps maintenance, and strategic sprint roadmapping.",
    deliverables: [
      "Weekly Architecture Strategy Calls",
      "Direct Slack/Discord Team Access",
      "Code Reviews & Security Audits",
      "Hiring & Technical Interview Assistance",
      "Guaranteed 24h Emergency SLA"
    ],
    recommended: false
  }
];
