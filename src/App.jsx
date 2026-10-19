import React, { useState, useEffect } from 'react';
import {
  Code2,
  Briefcase,
  Sparkles,
  CheckCircle2,
  ExternalLink,
  ArrowRight,
  Clock,
  DollarSign,
  Star,
  Layers,
  Send,
  Plus,
  Sliders,
  Settings,
  X,
  PhoneCall,
  Mail,
  Check,
  TrendingUp,
  Globe,
  Terminal,
  ShieldCheck,
  Copy,
  Download,
  FileText
} from 'lucide-react';
import { defaultProfile, initialProjects, initialServices } from './data/portfolioData';

export default function App() {
  const [profile, setProfile] = useState(() => {
    const saved = localStorage.getItem('apex_portfolio_profile');
    return saved ? JSON.parse(saved) : defaultProfile;
  });

  const [projects, setProjects] = useState(() => {
    const saved = localStorage.getItem('apex_portfolio_projects');
    return saved ? JSON.parse(saved) : initialProjects;
  });

  const [services, setServices] = useState(() => {
    const saved = localStorage.getItem('apex_portfolio_services');
    return saved ? JSON.parse(saved) : initialServices;
  });

  // Filter and Modals
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedCaseStudy, setSelectedCaseStudy] = useState(null);
  const [isEditProfileOpen, setIsEditProfileOpen] = useState(false);
  const [isPitchModalOpen, setIsPitchModalOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState(null);
  const [generatedPitch, setGeneratedPitch] = useState(null);
  const [hasCopiedPitch, setHasCopiedPitch] = useState(false);

  // Scope Estimator State
  const [estimatorType, setEstimatorType] = useState('mvp');
  const [estimatorTimeline, setEstimatorTimeline] = useState('standard');
  const [estimatorAddons, setEstimatorAddons] = useState(['auth', 'payments']);

  // Contact Form State
  const [contactForm, setContactForm] = useState({
    name: '',
    email: '',
    budget: '$5k - $10k',
    timeline: 'Within 30 Days',
    projectScope: 'Full-Stack Web App',
    message: '',
  });

  // Global ESC key listener to dismiss modals & drawers
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        setSelectedCaseStudy(null);
        setIsEditProfileOpen(false);
        setIsPitchModalOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  useEffect(() => {
    localStorage.setItem('apex_portfolio_profile', JSON.stringify(profile));
  }, [profile]);

  useEffect(() => {
    localStorage.setItem('apex_portfolio_projects', JSON.stringify(projects));
  }, [projects]);

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  // Guarded Scope Estimator Calculations
  const calculateEstimate = () => {
    let base = 3500;
    if (estimatorType === 'mobile') base = 4800;
    if (estimatorType === 'ai') base = 5500;
    if (estimatorType === 'enterprise') base = 8500;

    let timelineMultiplier = 1.0;
    if (estimatorTimeline === 'rush') timelineMultiplier = 1.35;
    if (estimatorTimeline === 'extended') timelineMultiplier = 0.95;

    let addonsCost = 0;
    if (estimatorAddons.includes('auth')) addonsCost += 600;
    if (estimatorAddons.includes('payments')) addonsCost += 750;
    if (estimatorAddons.includes('seo')) addonsCost += 500;
    if (estimatorAddons.includes('cicd')) addonsCost += 650;

    const total = Math.round(base * timelineMultiplier + addonsCost);
    return Math.max(1500, total);
  };

  const handleToggleAddon = (addonKey) => {
    setEstimatorAddons(prev =>
      prev.includes(addonKey) ? prev.filter(k => k !== addonKey) : [...prev, addonKey]
    );
  };

  const handleApplyEstimateToContact = () => {
    const estTotal = calculateEstimate();
    const typeLabel =
      estimatorType === 'mvp'
        ? 'MVP Web App'
        : estimatorType === 'mobile'
        ? 'Cross-Platform Mobile App'
        : estimatorType === 'ai'
        ? 'Semantic AI Workflow Engine'
        : 'Enterprise Custom System';

    setContactForm(prev => ({
      ...prev,
      projectScope: typeLabel,
      budget: `$${estTotal.toLocaleString()} (Estimated Scope)`,
      message: `Hi Alex, I configured a ${typeLabel} project with timeline (${estimatorTimeline}) and ${estimatorAddons.length} technical modules, estimating ~$${estTotal.toLocaleString()}. Let's schedule a sprint kickoff!`,
    }));

    const el = document.getElementById('contact-section');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
    showToast('Estimate copied to project consultation form below!');
  };

  // Generate Structured Client Proposal Pitch
  const handleGeneratePitch = (e) => {
    e.preventDefault();
    if (!contactForm.name || !contactForm.email) {
      showToast('Please enter your name and email first.');
      return;
    }

    const estAmount = calculateEstimate();
    const pitchText = `# Client Project Proposal: ${contactForm.projectScope}
Prepared for: ${contactForm.name} (${contactForm.email})
Architect: ${profile.name} — Senior Full-Stack Product Engineer
Date: ${new Date().toISOString().split('T')[0]}

---

## 1. Executive Summary & Objective
To architect and deliver a high-performance ${contactForm.projectScope} built with a scalable architecture, verified usability, and fast execution within a ${contactForm.timeline} timeline.

## 2. Technical Scope & Key Deliverables
- Core Application: React 19 / Next.js frontend with clean responsive component design.
- Data Layer: PostgreSQL / SQLite database with authenticated role permissions.
- Integrations: Stripe payment workflows, webhook processing, and email triggers.
- Cloud Infrastructure: Production deployment on Vercel Edge with zero-downtime CI/CD.
- Quality Assurance: 100% passing build checks and WCAG accessibility compliance.

## 3. Timeline & Sprint Milestones
- Sprint 1 (Week 1–2): UI/UX high-fidelity prototypes, database schema & auth.
- Sprint 2 (Week 3–4): Core features, API integration & payment testing.
- Launch (Week 5): Security audit, performance optimization & deployment.

## 4. Investment & Terms
- Estimated Project Fee: $${estAmount.toLocaleString()} USD
- Client Milestone Schedule: 50% upon project kickoff, 50% upon final acceptance.
- Post-Launch Warranty: 14 days of complimentary bug-fix support.

*Status: SIMULATED PROPOSAL ENGINE (DEMO)*
`;

    setGeneratedPitch(pitchText);
    setIsPitchModalOpen(true);
  };

  const handleCopyPitch = () => {
    if (!generatedPitch) return;
    navigator.clipboard.writeText(generatedPitch);
    setHasCopiedPitch(true);
    setTimeout(() => setHasCopiedPitch(false), 3000);
    showToast('Proposal copied to clipboard!');
  };

  const handleDownloadPitch = () => {
    if (!generatedPitch) return;
    const blob = new Blob([generatedPitch], { type: 'text/markdown;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `proposal-${contactForm.name.toLowerCase().replace(/\s+/g, '-')}.md`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    showToast('Proposal markdown downloaded!');
  };

  const handleContactSubmit = (e) => {
    e.preventDefault();
    showToast('Consultation request sent! (Simulator Mode)');
    setContactForm({
      name: '',
      email: '',
      budget: '$5k - $10k',
      timeline: 'Within 30 Days',
      projectScope: 'Full-Stack Web App',
      message: '',
    });
  };

  const filteredProjects = projects.filter(
    p => selectedCategory === 'All' || p.category === selectedCategory
  );

  const categories = ['All', 'Full-Stack Web App', 'AI & Systems', 'UI/UX & Web'];

  return (
    <div className="min-h-screen bg-[#09090B] text-zinc-100 flex flex-col font-sans selection:bg-violet-600 selection:text-white">
      {/* Toast Alert */}
      {toastMessage && (
        <div
          role="status"
          aria-live="polite"
          className="fixed top-5 right-5 z-50 flex items-center gap-3 bg-zinc-900 text-white font-semibold px-4 py-3 rounded-xl shadow-2xl border border-violet-500/50"
        >
          <CheckCircle2 className="w-5 h-5 text-violet-400 shrink-0" />
          <span className="text-sm">{toastMessage}</span>
        </div>
      )}

      {/* Navigation Header */}
      <header className="sticky top-0 z-40 bg-[#09090B]/90 backdrop-blur-md border-b border-zinc-800/80 px-4 sm:px-8 py-3.5 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-violet-600 flex items-center justify-center text-white font-black shadow-md shadow-violet-600/30">
            A
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-lg font-bold tracking-tight text-white font-display">
                ApexCraft
              </span>
              <span className="text-[10px] font-bold uppercase tracking-wider text-violet-300 bg-violet-950/80 border border-violet-700/60 px-2 py-0.5 rounded-full">
                Product Studio
              </span>
            </div>
            <p className="text-xs text-zinc-400">{profile.name} • {profile.tagline}</p>
          </div>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-3">
          <a
            href="#contact-section"
            className="px-4 py-2 text-xs font-bold rounded-xl bg-violet-600 hover:bg-violet-500 text-white shadow-md shadow-violet-600/25 transition-all"
          >
            Start Project
          </a>
        </div>
      </header>

      {/* Main Container */}
      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full space-y-16">
        
        {/* ======================= HERO SECTION ======================= */}
        <section aria-label="Hero Overview" className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center pt-4">
          <div className="lg:col-span-8 space-y-5">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-950/60 text-emerald-300 border border-emerald-800/80">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
              <span>{profile.status}</span>
            </div>

            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-white font-display tracking-tight leading-tight">
              Taking software from concept to production in weeks.
            </h1>

            <p className="text-sm sm:text-base text-zinc-400 max-w-2xl leading-relaxed">
              {profile.bio} Based in {profile.location}.
            </p>

            {/* Metric Achievements */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-4 border-t border-zinc-800">
              <div className="space-y-0.5">
                <div className="text-2xl font-black font-display text-white">{profile.experienceYears}</div>
                <div className="text-xs text-zinc-400">Years Experience</div>
              </div>
              <div className="space-y-0.5">
                <div className="text-2xl font-black font-display text-violet-400">{profile.shippedProjects}</div>
                <div className="text-xs text-zinc-400">Products Shipped</div>
              </div>
              <div className="space-y-0.5">
                <div className="text-2xl font-black font-display text-white">{profile.revenueDelivered}</div>
                <div className="text-xs text-zinc-400">Client Revenue Impact</div>
              </div>
              <div className="space-y-0.5">
                <div className="text-2xl font-black font-display text-emerald-400">{profile.clientSatisfaction}</div>
                <div className="text-xs text-zinc-400">On-Time Delivery</div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-4 flex justify-center">
            <div className="relative w-64 sm:w-72 aspect-square rounded-3xl overflow-hidden border-2 border-violet-500/30 shadow-2xl shadow-violet-500/20 bg-zinc-900">
              <img
                src={profile.avatar}
                alt={profile.name}
                width="400"
                height="400"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#09090B] via-transparent to-transparent" />
              <div className="absolute bottom-4 left-4 right-4 bg-zinc-950/90 backdrop-blur-md p-3 rounded-2xl border border-zinc-800 text-xs">
                <div className="font-bold text-white">{profile.name}</div>
                <div className="text-zinc-400 text-[11px]">Contract Rate: ${profile.hourlyRate}/hr</div>
              </div>
            </div>
          </div>
        </section>

        {/* ======================= CASE STUDIES & PROJECTS ======================= */}
        <section aria-label="Selected Client Work" className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h2 className="text-2xl font-black text-white font-display">Featured Case Studies</h2>
              <p className="text-xs sm:text-sm text-zinc-400 mt-1">
                Real client applications engineered for scale, verified speed, and commercial adoption.
              </p>
            </div>

            {/* Category Filter */}
            <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0" role="tablist">
              {categories.map(cat => (
                <button
                  key={cat}
                  type="button"
                  role="tab"
                  aria-selected={selectedCategory === cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-3 py-1.5 text-xs font-semibold rounded-xl whitespace-nowrap transition-colors ${
                    selectedCategory === cat
                      ? 'bg-violet-600 text-white font-bold shadow-xs'
                      : 'bg-zinc-900 text-zinc-400 hover:text-white border border-zinc-800'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {filteredProjects.map(project => (
              <article
                key={project.id}
                className="rounded-3xl bg-zinc-900/60 border border-zinc-800 hover:border-violet-500/50 transition-all duration-300 overflow-hidden shadow-xl flex flex-col justify-between group"
              >
                <div>
                  <div className="relative aspect-[16/9] overflow-hidden bg-zinc-950">
                    <img
                      src={project.thumbnail}
                      alt={project.title}
                      width="800"
                      height="450"
                      loading="lazy"
                      decoding="async"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute top-3 left-3">
                      <span className="px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-zinc-950/80 backdrop-blur-md text-violet-300 border border-violet-800/80">
                        {project.category}
                      </span>
                    </div>
                    <div className="absolute bottom-3 left-3 right-3 bg-zinc-950/80 backdrop-blur-md px-3 py-1.5 rounded-xl border border-zinc-800 flex items-center justify-between text-xs">
                      <span className="text-emerald-400 font-bold">{project.metrics}</span>
                      <span className="text-zinc-400 text-[11px]">{project.client}</span>
                    </div>
                  </div>

                  <div className="p-6 space-y-3">
                    <h3 className="font-bold text-lg text-white group-hover:text-violet-300 transition-colors font-display">
                      {project.title}
                    </h3>
                    <p className="text-xs text-zinc-400 leading-relaxed">
                      {project.summary}
                    </p>

                    <div className="flex flex-wrap gap-1.5 pt-2">
                      {project.techStack.map(tech => (
                        <span
                          key={tech}
                          className="px-2 py-0.5 rounded-md text-[10px] font-medium bg-zinc-800 text-zinc-300 border border-zinc-700/50"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="p-6 pt-0 flex items-center justify-between">
                  <button
                    type="button"
                    onClick={() => setSelectedCaseStudy(project)}
                    className="text-xs font-bold text-violet-400 hover:text-violet-300 flex items-center gap-1 transition-colors"
                  >
                    <span>Read Deep-Dive Case Study</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>

                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noreferrer"
                    aria-label={`Open live demonstration of ${project.title}`}
                    className="p-2 rounded-xl bg-zinc-800 text-zinc-300 hover:text-white hover:bg-zinc-700 transition-colors"
                  >
                    <ExternalLink className="w-4 h-4" />
                  </a>
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* ======================= INTERACTIVE PROJECT SCOPE ESTIMATOR ======================= */}
        <section aria-label="Scope & Investment Estimator" className="p-6 sm:p-10 rounded-3xl bg-zinc-900/80 border border-zinc-800 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <span className="text-xs uppercase font-bold tracking-wider text-violet-400">Interactive Estimator</span>
              <h2 className="text-2xl font-black text-white font-display mt-0.5">Project Scope & Investment Calculator</h2>
              <p className="text-xs sm:text-sm text-zinc-400 mt-1">
                Configure your product scope to calculate realistic sprint duration and budgetary investment.
              </p>
            </div>
            <div className="text-right">
              <div className="text-xs text-zinc-400">Estimated Investment</div>
              <div className="text-3xl font-black font-display text-violet-400">
                ${calculateEstimate().toLocaleString()}
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4 border-t border-zinc-800 text-xs">
            {/* Scope Type */}
            <div className="space-y-2">
              <label className="block text-zinc-300 font-bold uppercase tracking-wider text-[11px]">
                1. Product Architecture
              </label>
              {[
                { id: 'mvp', name: 'MVP Web Application', desc: 'React 19 + Node.js baseline' },
                { id: 'mobile', name: 'Cross-Platform Mobile App', desc: 'React Native / Responsive PWA' },
                { id: 'ai', name: 'Semantic AI Workflow Engine', desc: 'FastAPI + Vector RAG + Custom Tools' },
                { id: 'enterprise', name: 'Full Custom Platform', desc: 'Distributed architecture & multi-role' },
              ].map(opt => (
                <button
                  key={opt.id}
                  type="button"
                  onClick={() => setEstimatorType(opt.id)}
                  className={`w-full p-3 rounded-xl text-left border transition-all ${
                    estimatorType === opt.id
                      ? 'bg-violet-600/20 border-violet-500 text-white'
                      : 'bg-zinc-950/60 border-zinc-800 text-zinc-400 hover:text-zinc-200'
                  }`}
                >
                  <div className="font-bold text-xs">{opt.name}</div>
                  <div className="text-[11px] text-zinc-400 mt-0.5">{opt.desc}</div>
                </button>
              ))}
            </div>

            {/* Timeline Speed */}
            <div className="space-y-2">
              <label className="block text-zinc-300 font-bold uppercase tracking-wider text-[11px]">
                2. Sprint Speed
              </label>
              {[
                { id: 'rush', name: 'Fast-Track (2–3 Weeks)', desc: 'Accelerated delivery (+35% rush rate)' },
                { id: 'standard', name: 'Standard (4–6 Weeks)', desc: 'Standard sprint cadence' },
                { id: 'extended', name: 'Flexible (8+ Weeks)', desc: 'Budget-optimized flexible timeline (-5%)' },
              ].map(opt => (
                <button
                  key={opt.id}
                  type="button"
                  onClick={() => setEstimatorTimeline(opt.id)}
                  className={`w-full p-3 rounded-xl text-left border transition-all ${
                    estimatorTimeline === opt.id
                      ? 'bg-violet-600/20 border-violet-500 text-white'
                      : 'bg-zinc-950/60 border-zinc-800 text-zinc-400 hover:text-zinc-200'
                  }`}
                >
                  <div className="font-bold text-xs">{opt.name}</div>
                  <div className="text-[11px] text-zinc-400 mt-0.5">{opt.desc}</div>
                </button>
              ))}
            </div>

            {/* Add-on Modules */}
            <div className="space-y-2">
              <label className="block text-zinc-300 font-bold uppercase tracking-wider text-[11px]">
                3. Technical Modules
              </label>
              {[
                { id: 'auth', name: 'Multi-Role Auth & RBAC', cost: '+$600' },
                { id: 'payments', name: 'Stripe Checkout & Billing', cost: '+$750' },
                { id: 'seo', name: 'SEO Architecture & JSON-LD', cost: '+$500' },
                { id: 'cicd', name: 'Automated CI/CD & Tests', cost: '+$650' },
              ].map(opt => (
                <button
                  key={opt.id}
                  type="button"
                  onClick={() => handleToggleAddon(opt.id)}
                  className={`w-full p-3 rounded-xl text-left border flex items-center justify-between transition-all ${
                    estimatorAddons.includes(opt.id)
                      ? 'bg-violet-600/20 border-violet-500 text-white'
                      : 'bg-zinc-950/60 border-zinc-800 text-zinc-400 hover:text-zinc-200'
                  }`}
                >
                  <div>
                    <div className="font-bold text-xs">{opt.name}</div>
                    <div className="text-[11px] text-zinc-400">Production-tested implementation</div>
                  </div>
                  <span className="font-mono font-bold text-violet-400 text-xs">{opt.cost}</span>
                </button>
              ))}
            </div>
          </div>

          <div className="pt-4 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-zinc-800">
            <p className="text-xs text-zinc-400">
              *Fixed-price estimates include source code ownership, production deployment, and 14-day warranty.
            </p>
            <button
              type="button"
              onClick={handleApplyEstimateToContact}
              className="px-6 py-2.5 rounded-xl bg-violet-600 hover:bg-violet-500 text-white font-bold text-xs shadow-md transition-all flex items-center gap-2"
            >
              <span>Apply Configuration to Inquiry</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </section>

        {/* ======================= CONTACT & PROPOSAL GENERATOR ======================= */}
        <section id="contact-section" aria-label="Contact and Pitch Proposal" className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          <div className="lg:col-span-5 space-y-4">
            <span className="text-xs uppercase font-bold tracking-wider text-violet-400">Let's Connect</span>
            <h2 className="text-3xl font-black text-white font-display">Start a Project Consultation</h2>
            <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed">
              Have an MVP or platform to build? Fill out the details to generate an instant structured proposal and sprint plan.
            </p>

            <div className="p-5 rounded-2xl bg-zinc-900/60 border border-zinc-800 space-y-3 text-xs">
              <div className="flex items-center gap-3 text-zinc-300">
                <Mail className="w-4 h-4 text-violet-400" />
                <span>alex@apexstudio.design</span>
              </div>
              <div className="flex items-center gap-3 text-zinc-300">
                <Globe className="w-4 h-4 text-violet-400" />
                <span>San Francisco, CA (Remote Worldwide)</span>
              </div>
              <div className="flex items-center gap-3 text-zinc-300">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                <span>Non-Disclosure Agreements Respected</span>
              </div>
            </div>
          </div>

          <div className="lg:col-span-7 p-6 sm:p-8 rounded-3xl bg-zinc-900/80 border border-zinc-800 shadow-xl">
            <form onSubmit={handleContactSubmit} className="space-y-4 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="apex-client-name" className="block text-zinc-300 font-semibold mb-1">
                    Your Full Name *
                  </label>
                  <input
                    id="apex-client-name"
                    type="text"
                    required
                    placeholder="e.g. David Vance"
                    value={contactForm.name}
                    onChange={e => setContactForm({ ...contactForm, name: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-zinc-950 border border-zinc-800 text-white placeholder-zinc-500 focus:outline-hidden focus:ring-2 focus:ring-violet-500"
                  />
                </div>

                <div>
                  <label htmlFor="apex-client-email" className="block text-zinc-300 font-semibold mb-1">
                    Work Email *
                  </label>
                  <input
                    id="apex-client-email"
                    type="email"
                    required
                    placeholder="david@company.com"
                    value={contactForm.email}
                    onChange={e => setContactForm({ ...contactForm, email: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-zinc-950 border border-zinc-800 text-white placeholder-zinc-500 focus:outline-hidden focus:ring-2 focus:ring-violet-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label htmlFor="apex-client-scope" className="block text-zinc-300 font-semibold mb-1">
                    Project Scope
                  </label>
                  <input
                    id="apex-client-scope"
                    type="text"
                    value={contactForm.projectScope}
                    onChange={e => setContactForm({ ...contactForm, projectScope: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-zinc-950 border border-zinc-800 text-white focus:outline-hidden focus:ring-2 focus:ring-violet-500"
                  />
                </div>

                <div>
                  <label htmlFor="apex-client-budget" className="block text-zinc-300 font-semibold mb-1">
                    Budget Range
                  </label>
                  <input
                    id="apex-client-budget"
                    type="text"
                    value={contactForm.budget}
                    onChange={e => setContactForm({ ...contactForm, budget: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-zinc-950 border border-zinc-800 text-white focus:outline-hidden focus:ring-2 focus:ring-violet-500"
                  />
                </div>

                <div>
                  <label htmlFor="apex-client-timeline" className="block text-zinc-300 font-semibold mb-1">
                    Target Timeline
                  </label>
                  <input
                    id="apex-client-timeline"
                    type="text"
                    value={contactForm.timeline}
                    onChange={e => setContactForm({ ...contactForm, timeline: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-zinc-950 border border-zinc-800 text-white focus:outline-hidden focus:ring-2 focus:ring-violet-500"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="apex-client-message" className="block text-zinc-300 font-semibold mb-1">
                  Project Context & Requirements
                </label>
                <textarea
                  id="apex-client-message"
                  rows="3"
                  placeholder="Tell me about your product, audience, and goals..."
                  value={contactForm.message}
                  onChange={e => setContactForm({ ...contactForm, message: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-zinc-950 border border-zinc-800 text-white placeholder-zinc-500 focus:outline-hidden focus:ring-2 focus:ring-violet-500"
                />
              </div>

              <div className="flex flex-col sm:flex-row items-center gap-3 pt-2">
                <button
                  type="button"
                  onClick={handleGeneratePitch}
                  className="w-full sm:flex-1 py-3 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-violet-300 border border-violet-500/40 font-bold text-xs transition-colors flex items-center justify-center gap-2"
                >
                  <FileText className="w-4 h-4" />
                  <span>Generate Instant Proposal Pitch</span>
                </button>

                <button
                  type="submit"
                  className="w-full sm:flex-1 py-3 rounded-xl bg-violet-600 hover:bg-violet-500 text-white font-bold text-xs shadow-md transition-all flex items-center justify-center gap-2"
                >
                  <Send className="w-4 h-4" />
                  <span>Submit Consultation Request</span>
                </button>
              </div>
            </form>
          </div>
        </section>
      </main>

      {/* ======================= MODAL: PROPOSAL PITCH GENERATOR ======================= */}
      {isPitchModalOpen && generatedPitch && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Client Project Proposal"
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-xs p-4"
        >
          <div className="bg-zinc-900 border border-zinc-800 max-w-2xl w-full p-6 sm:p-8 rounded-3xl shadow-2xl space-y-4 text-xs">
            <div className="flex items-center justify-between pb-3 border-b border-zinc-800">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-xl bg-violet-600/20 text-violet-400 flex items-center justify-center">
                  <FileText className="w-4 h-4" />
                </div>
                <div>
                  <h2 className="font-bold text-sm text-white">Generated Client Proposal Pitch</h2>
                  <p className="text-[11px] text-zinc-400">Ready for review or instant export</p>
                </div>
              </div>
              <span className="text-[10px] font-bold text-amber-400 bg-amber-950/80 border border-amber-800 px-2 py-0.5 rounded-md">
                MOCKED PITCH ENGINE
              </span>
            </div>

            <pre className="p-4 rounded-2xl bg-zinc-950 text-zinc-300 font-mono text-[11px] whitespace-pre-wrap max-h-72 overflow-y-auto leading-relaxed border border-zinc-800">
              {generatedPitch}
            </pre>

            <div className="flex items-center justify-between pt-2">
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={handleCopyPitch}
                  className="px-3 py-2 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-white font-semibold flex items-center gap-1.5 transition-colors"
                >
                  <Copy className="w-3.5 h-3.5" />
                  <span>{hasCopiedPitch ? 'Copied!' : 'Copy Markdown'}</span>
                </button>
                <button
                  type="button"
                  onClick={handleDownloadPitch}
                  className="px-3 py-2 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-white font-semibold flex items-center gap-1.5 transition-colors"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Download .md</span>
                </button>
              </div>

              <button
                type="button"
                onClick={() => setIsPitchModalOpen(false)}
                className="px-4 py-2 rounded-xl bg-violet-600 hover:bg-violet-500 text-white font-bold transition-colors"
              >
                Close Proposal
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ======================= DRAWER: CASE STUDY DEEP DIVE ======================= */}
      {selectedCaseStudy && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={`Case Study: ${selectedCaseStudy.title}`}
          className="fixed inset-0 z-50 flex justify-end bg-black/80 backdrop-blur-xs"
        >
          <div className="bg-zinc-900 border-l border-zinc-800 max-w-xl w-full p-6 sm:p-8 shadow-2xl flex flex-col justify-between h-full overflow-y-auto text-xs space-y-6">
            <div className="space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-zinc-800">
                <span className="text-[11px] font-mono text-violet-400 font-bold uppercase">
                  Case Study Deep Dive
                </span>
                <button
                  type="button"
                  onClick={() => setSelectedCaseStudy(null)}
                  aria-label="Close case study drawer"
                  className="text-zinc-400 hover:text-white p-1 rounded-md"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="aspect-[16/9] rounded-2xl overflow-hidden bg-zinc-950 border border-zinc-800">
                <img
                  src={selectedCaseStudy.thumbnail}
                  alt={selectedCaseStudy.title}
                  width="800"
                  height="450"
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="space-y-1">
                <span className="text-[10px] font-bold uppercase text-emerald-400 bg-emerald-950/60 border border-emerald-800 px-2 py-0.5 rounded-md">
                  {selectedCaseStudy.metrics}
                </span>
                <h2 className="text-xl font-bold text-white font-display pt-1">
                  {selectedCaseStudy.title}
                </h2>
                <p className="text-zinc-400 text-xs">Client: {selectedCaseStudy.client}</p>
              </div>

              <div className="space-y-3 pt-2">
                <div className="p-4 rounded-xl bg-zinc-950 border border-zinc-800 space-y-1">
                  <div className="font-bold text-white text-[11px] uppercase tracking-wider">The Problem:</div>
                  <p className="text-zinc-400 leading-relaxed">{selectedCaseStudy.challenge}</p>
                </div>

                <div className="p-4 rounded-xl bg-zinc-950 border border-zinc-800 space-y-1">
                  <div className="font-bold text-white text-[11px] uppercase tracking-wider">The Solution Architecture:</div>
                  <p className="text-zinc-400 leading-relaxed">{selectedCaseStudy.solution}</p>
                </div>

                {selectedCaseStudy.testimonial && (
                  <div className="p-4 rounded-xl bg-violet-950/40 border border-violet-800/60 space-y-2">
                    <p className="text-violet-200 italic leading-relaxed">
                      "{selectedCaseStudy.testimonial.quote}"
                    </p>
                    <div className="text-[11px] text-zinc-400">
                      <strong>{selectedCaseStudy.testimonial.author}</strong> • {selectedCaseStudy.testimonial.role}
                    </div>
                  </div>
                )}
              </div>
            </div>

            <div className="pt-4 border-t border-zinc-800 flex items-center gap-3">
              <button
                type="button"
                onClick={() => setSelectedCaseStudy(null)}
                className="flex-1 py-2.5 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-white font-semibold"
              >
                Close Case Study
              </button>
              <a
                href={selectedCaseStudy.liveUrl}
                target="_blank"
                rel="noreferrer"
                className="flex-1 py-2.5 rounded-xl bg-violet-600 hover:bg-violet-500 text-white font-bold text-center flex items-center justify-center gap-1.5"
              >
                <span>Live Demo</span>
                <ExternalLink className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
