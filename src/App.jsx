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
  Cpu,
  Globe,
  Terminal,
  ShieldCheck
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

  // Category filter
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedCaseStudy, setSelectedCaseStudy] = useState(null);
  const [isEditProfileOpen, setIsEditProfileOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState(null);

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

  // Estimator Calculations
  const calculateEstimate = () => {
    let base = 3500;
    if (estimatorType === 'mobile') base = 4800;
    if (estimatorType === 'ai') base = 5500;
    if (estimatorType === 'enterprise') base = 8500;

    let timelineMultiplier = 1.0;
    if (estimatorTimeline === 'rush') timelineMultiplier = 1.35; // 2 weeks fast-track
    if (estimatorTimeline === 'extended') timelineMultiplier = 0.95;

    let addonsCost = 0;
    if (estimatorAddons.includes('auth')) addonsCost += 600;
    if (estimatorAddons.includes('payments')) addonsCost += 750;
    if (estimatorAddons.includes('seo')) addonsCost += 500;
    if (estimatorAddons.includes('cicd')) addonsCost += 650;

    return Math.round(base * timelineMultiplier + addonsCost);
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
        ? 'Cross-Platform App'
        : estimatorType === 'ai'
        ? 'AI Agentic Workflow'
        : 'Enterprise Custom System';

    setContactForm(prev => ({
      ...prev,
      projectScope: typeLabel,
      budget: `$${estTotal.toLocaleString()} (Estimated Scope)`,
      message: `Hi Alex, I configured a ${typeLabel} project with timeline (${estimatorTimeline}) and ${estimatorAddons.length} add-ons, estimating ~$${estTotal.toLocaleString()}. Let's discuss starting!`,
    }));

    showToast('Estimate transferred to Contact Form below!');
    document.getElementById('contact-section')?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSendInquiry = (e) => {
    e.preventDefault();
    if (!contactForm.name || !contactForm.email) return;

    const inquiries = JSON.parse(localStorage.getItem('apex_portfolio_inquiries') || '[]');
    inquiries.push({
      ...contactForm,
      date: new Date().toISOString(),
      id: `INQ-${Date.now().toString().slice(-4)}`,
    });
    localStorage.setItem('apex_portfolio_inquiries', JSON.stringify(inquiries));

    showToast(`Thank you ${contactForm.name}! Your inquiry has been received. I will reply within 24 hours.`);
    setContactForm({
      name: '',
      email: '',
      budget: '$5k - $10k',
      timeline: 'Within 30 Days',
      projectScope: 'Full-Stack Web App',
      message: '',
    });
  };

  const handleSaveProfile = (e) => {
    e.preventDefault();
    setIsEditProfileOpen(false);
    showToast('Portfolio profile details updated!');
  };

  const categories = ['All', 'Full-Stack Web App', 'AI & Systems', 'UI/UX & Web'];

  const filteredProjects = projects.filter(p => {
    return selectedCategory === 'All' || p.category === selectedCategory;
  });

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans">
      {/* Toast Alert */}
      {toastMessage && (
        <div className="fixed top-5 right-5 z-50 flex items-center gap-3 bg-violet-500 text-white font-bold px-4 py-3 rounded-2xl shadow-2xl backdrop-blur-md border border-violet-400 animate-bounce">
          <CheckCircle2 className="w-5 h-5" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Top Navbar */}
      <nav className="sticky top-0 z-40 bg-slate-950/80 backdrop-blur-xl border-b border-slate-800/80 px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-violet-600 to-indigo-500 flex items-center justify-center text-white shadow-lg shadow-violet-500/25">
            <Code2 className="w-5 h-5 stroke-[2.5]" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xl font-extrabold tracking-tight bg-gradient-to-r from-white via-violet-200 to-violet-400 bg-clip-text text-transparent font-display">
                ApexCraft
              </span>
              <span className="text-[10px] font-bold uppercase tracking-wider text-violet-400 border border-violet-500/30 px-2 py-0.5 rounded-full bg-violet-500/10">
                Studio Portfolio
              </span>
            </div>
            <p className="text-[11px] text-slate-400">{profile.name}</p>
          </div>
        </div>

        {/* Center Nav Links */}
        <div className="hidden md:flex items-center gap-6 text-xs font-semibold text-slate-400">
          <a href="#case-studies" className="hover:text-white transition-colors">Case Studies</a>
          <a href="#estimator" className="hover:text-white transition-colors">Scope Estimator</a>
          <a href="#services" className="hover:text-white transition-colors">Packages</a>
          <a href="#contact-section" className="hover:text-white transition-colors">Get in Touch</a>
        </div>

        {/* Right Actions */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => setIsEditProfileOpen(true)}
            className="p-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-400 hover:text-white"
            title="Edit Portfolio Profile"
          >
            <Settings className="w-4 h-4" />
          </button>

          <a
            href="#contact-section"
            className="flex items-center gap-2 px-4 py-2 text-xs font-bold rounded-xl bg-gradient-to-r from-violet-500 to-indigo-600 hover:from-violet-400 hover:to-indigo-500 text-white shadow-lg shadow-violet-500/20 transition-all"
          >
            <Sparkles className="w-4 h-4" />
            <span>Book Intro Call</span>
          </a>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative py-16 sm:py-24 px-6 border-b border-slate-800 overflow-hidden bg-radial from-violet-950/20 via-slate-950 to-slate-950">
        <div className="max-w-5xl mx-auto text-center space-y-6 relative z-10">
          {/* Availability Badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-bold animate-pulse">
            <span className="w-2 h-2 rounded-full bg-emerald-400" />
            <span>{profile.status}</span>
          </div>

          <h1 className="text-4xl sm:text-6xl font-extrabold text-white tracking-tight font-display leading-[1.1]">
            Engineering High-Growth <br />
            <span className="bg-gradient-to-r from-violet-200 via-violet-400 to-indigo-400 bg-clip-text text-transparent">
              Digital Products & Systems
            </span>
          </h1>

          <p className="text-sm sm:text-base text-slate-300 max-w-2xl mx-auto leading-relaxed">
            {profile.bio}
          </p>

          {/* Quick Metrics Counter Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-8 max-w-3xl mx-auto text-left">
            <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800">
              <span className="text-xs text-slate-400 uppercase font-semibold">Experience</span>
              <div className="text-2xl font-extrabold text-white mt-1 font-mono">{profile.experienceYears}</div>
              <span className="text-[11px] text-violet-400">Production Engineering</span>
            </div>

            <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800">
              <span className="text-xs text-slate-400 uppercase font-semibold">Client Value</span>
              <div className="text-2xl font-extrabold text-emerald-400 mt-1 font-mono">{profile.revenueDelivered}</div>
              <span className="text-[11px] text-emerald-400">Revenue & Valuation</span>
            </div>

            <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800">
              <span className="text-xs text-slate-400 uppercase font-semibold">Shipped Apps</span>
              <div className="text-2xl font-extrabold text-white mt-1 font-mono">{profile.shippedProjects}</div>
              <span className="text-[11px] text-slate-400">MVPs & Scaling Platforms</span>
            </div>

            <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800">
              <span className="text-xs text-slate-400 uppercase font-semibold">Satisfaction</span>
              <div className="text-2xl font-extrabold text-violet-300 mt-1 font-mono">{profile.clientSatisfaction}</div>
              <span className="text-[11px] text-violet-400">On-Time & On-Budget</span>
            </div>
          </div>

          {/* Action CTAs */}
          <div className="pt-4 flex flex-wrap items-center justify-center gap-4">
            <a
              href="#case-studies"
              className="px-6 py-3 rounded-2xl bg-violet-600 hover:bg-violet-500 text-white font-bold text-xs shadow-xl shadow-violet-600/25 flex items-center gap-2"
            >
              <span>Explore Selected Work</span>
              <ArrowRight className="w-4 h-4" />
            </a>

            <a
              href="#estimator"
              className="px-6 py-3 rounded-2xl bg-slate-900 hover:bg-slate-800 text-slate-200 border border-slate-800 font-bold text-xs flex items-center gap-2"
            >
              <Sliders className="w-4 h-4 text-violet-400" />
              <span>Interactive Project Estimator</span>
            </a>
          </div>
        </div>
      </section>

      {/* ======================= CASE STUDIES SHOWCASE ======================= */}
      <section id="case-studies" className="py-16 px-6 max-w-7xl mx-auto w-full space-y-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-violet-400">
              Proven Track Record
            </span>
            <h2 className="text-3xl font-extrabold text-white font-display mt-1">
              Featured Client Case Studies
            </h2>
            <p className="text-xs sm:text-sm text-slate-400 mt-1">
              A curated selection of shipped enterprise systems, SaaS platforms, and venture MVPs.
            </p>
          </div>

          {/* Category Filter Pills */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1.5 text-xs font-semibold rounded-xl whitespace-nowrap transition-colors ${
                  selectedCategory === cat
                    ? 'bg-violet-600 text-white font-bold shadow-md'
                    : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {filteredProjects.map(project => (
            <div
              key={project.id}
              onClick={() => setSelectedCaseStudy(project)}
              className="group rounded-3xl bg-slate-900/60 border border-slate-800/80 hover:border-violet-500/50 transition-all duration-300 overflow-hidden cursor-pointer shadow-xl flex flex-col justify-between"
            >
              <div>
                <div className="relative aspect-[16/9] overflow-hidden bg-slate-800">
                  <img
                    src={project.thumbnail}
                    alt={project.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent" />
                  
                  <div className="absolute top-4 left-4">
                    <span className="px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-slate-950/80 backdrop-blur-md text-violet-400 border border-violet-500/30">
                      {project.category}
                    </span>
                  </div>

                  <div className="absolute bottom-4 left-4 right-4">
                    <span className="text-xs text-emerald-400 font-bold bg-slate-950/80 px-2.5 py-1 rounded-lg border border-emerald-500/30">
                      {project.metrics}
                    </span>
                  </div>
                </div>

                <div className="p-6 space-y-3">
                  <div className="text-xs text-slate-500 font-medium">{project.client}</div>
                  <h3 className="font-bold text-lg text-white group-hover:text-violet-300 transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-xs text-slate-400 leading-relaxed line-clamp-2">
                    {project.summary}
                  </p>

                  {/* Tech Stack Pills */}
                  <div className="flex flex-wrap gap-1.5 pt-2">
                    {project.techStack.map((tech, i) => (
                      <span
                        key={i}
                        className="px-2 py-0.5 rounded-md bg-slate-950 border border-slate-800 text-[10px] text-slate-300 font-mono"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="p-4 bg-slate-950/70 border-t border-slate-800 flex items-center justify-between text-xs">
                <span className="text-slate-400 italic text-[11px]">
                  "{project.testimonial.quote.slice(0, 50)}..."
                </span>
                <span className="font-bold text-violet-400 flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                  <span>Read Case Study</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ======================= INTERACTIVE SCOPE & BUDGET ESTIMATOR ======================= */}
      <section id="estimator" className="py-16 px-6 border-y border-slate-800 bg-slate-900/40">
        <div className="max-w-5xl mx-auto space-y-8">
          <div className="text-center space-y-2">
            <span className="text-xs font-bold uppercase tracking-wider text-violet-400">
              Transparent Pricing
            </span>
            <h2 className="text-3xl font-extrabold text-white font-display">
              Interactive Project Scope & Budget Estimator
            </h2>
            <p className="text-xs sm:text-sm text-slate-400 max-w-xl mx-auto">
              Configure your desired deliverables, timeline urgency, and architectural modules to generate an instant estimate.
            </p>
          </div>

          <div className="p-6 sm:p-8 rounded-3xl bg-slate-900 border border-slate-800 shadow-2xl grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Form Controls */}
            <div className="lg:col-span-7 space-y-6 text-xs">
              {/* Type */}
              <div>
                <label className="block text-slate-400 mb-2 font-semibold uppercase text-[10px]">
                  1. Select Product Scope Archetype
                </label>
                <div className="grid grid-cols-2 gap-3">
                  {[
                    { id: 'mvp', label: 'Full-Stack MVP Web App', desc: 'React, Node, DB & Auth' },
                    { id: 'mobile', label: 'Cross-Platform App', desc: 'Mobile iOS/Android Ready' },
                    { id: 'ai', label: 'AI Agent & MCP System', desc: 'Custom RAG & Tools' },
                    { id: 'enterprise', label: 'Custom Enterprise Suite', desc: 'Multi-Role ERP & Dashboards' },
                  ].map(t => (
                    <div
                      key={t.id}
                      onClick={() => setEstimatorType(t.id)}
                      className={`p-3.5 rounded-2xl border cursor-pointer transition-all ${
                        estimatorType === t.id
                          ? 'bg-violet-600/20 border-violet-500 text-white'
                          : 'bg-slate-950 border-slate-800 text-slate-400 hover:border-slate-700'
                      }`}
                    >
                      <div className="font-bold text-white">{t.label}</div>
                      <div className="text-[11px] text-slate-500 mt-0.5">{t.desc}</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Timeline */}
              <div>
                <label className="block text-slate-400 mb-2 font-semibold uppercase text-[10px]">
                  2. Delivery Timeline & Urgency
                </label>
                <div className="grid grid-cols-3 gap-3">
                  {[
                    { id: 'rush', label: 'Fast-Track', time: '2 Weeks (Sprint)' },
                    { id: 'standard', label: 'Standard', time: '4–5 Weeks' },
                    { id: 'extended', label: 'Flexible', time: '8 Weeks' },
                  ].map(tm => (
                    <div
                      key={tm.id}
                      onClick={() => setEstimatorTimeline(tm.id)}
                      className={`p-3 rounded-xl border text-center cursor-pointer transition-all ${
                        estimatorTimeline === tm.id
                          ? 'bg-violet-600/20 border-violet-500 text-white'
                          : 'bg-slate-950 border-slate-800 text-slate-400'
                      }`}
                    >
                      <div className="font-bold text-white">{tm.label}</div>
                      <div className="text-[10px] text-slate-500">{tm.time}</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Addons */}
              <div>
                <label className="block text-slate-400 mb-2 font-semibold uppercase text-[10px]">
                  3. Key Architectural Add-Ons
                </label>
                <div className="grid grid-cols-2 gap-2.5">
                  {[
                    { id: 'auth', label: 'OAuth & Role Security', price: '+$600' },
                    { id: 'payments', label: 'Stripe & M-Pesa Checkout', price: '+$750' },
                    { id: 'seo', label: 'Core Web Vitals & SEO Suite', price: '+$500' },
                    { id: 'cicd', label: 'Automated CI/CD & Cloud Edge', price: '+$650' },
                  ].map(ad => {
                    const isChecked = estimatorAddons.includes(ad.id);
                    return (
                      <div
                        key={ad.id}
                        onClick={() => handleToggleAddon(ad.id)}
                        className={`p-2.5 rounded-xl border cursor-pointer transition-all flex items-center justify-between ${
                          isChecked
                            ? 'bg-violet-500/15 border-violet-500 text-white'
                            : 'bg-slate-950 border-slate-800 text-slate-400'
                        }`}
                      >
                        <div className="flex items-center gap-2">
                          <div className={`w-4 h-4 rounded flex items-center justify-center border ${
                            isChecked ? 'bg-violet-500 border-violet-500 text-white' : 'border-slate-700'
                          }`}>
                            {isChecked && <Check className="w-3 h-3 stroke-[3]" />}
                          </div>
                          <span>{ad.label}</span>
                        </div>
                        <span className="text-[11px] font-mono text-violet-400">{ad.price}</span>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Live Calculation Output Card */}
            <div className="lg:col-span-5 p-6 rounded-2xl bg-slate-950 border border-slate-800 flex flex-col justify-between space-y-6">
              <div className="space-y-4">
                <span className="text-[10px] uppercase font-bold tracking-widest text-violet-400 block">
                  ESTIMATED PROJECT INVESTMENT
                </span>

                <div className="text-4xl font-extrabold text-white font-mono">
                  ${calculateEstimate().toLocaleString()}
                </div>

                <div className="space-y-2 text-xs text-slate-400 pt-2 border-t border-slate-800/80">
                  <div className="flex items-center justify-between">
                    <span>Engagement Model:</span>
                    <strong className="text-white">Fixed-Price Milestone</strong>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Warranty:</span>
                    <strong className="text-emerald-400">14-Day Post-Launch Bug Guarantee</strong>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>IP Ownership:</span>
                    <strong className="text-white">100% Client Codebase Rights</strong>
                  </div>
                </div>
              </div>

              <button
                onClick={handleApplyEstimateToContact}
                className="w-full py-3.5 rounded-xl bg-gradient-to-r from-violet-500 to-indigo-600 hover:from-violet-400 hover:to-indigo-500 text-white font-bold text-xs shadow-xl shadow-violet-500/25 flex items-center justify-center gap-2"
              >
                <span>Request This Scope & Quote &rarr;</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ======================= SERVICES & ENGAGEMENT PACKAGES ======================= */}
      <section id="services" className="py-16 px-6 max-w-7xl mx-auto w-full space-y-8">
        <div className="text-center space-y-2">
          <span className="text-xs font-bold uppercase tracking-wider text-violet-400">
            Work With Me
          </span>
          <h2 className="text-3xl font-extrabold text-white font-display">
            Standard Engagement Packages
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {services.map(srv => (
            <div
              key={srv.id}
              className={`p-6 sm:p-8 rounded-3xl border flex flex-col justify-between relative shadow-xl transition-all ${
                srv.recommended
                  ? 'bg-gradient-to-b from-slate-900 to-violet-950/20 border-violet-500/60 shadow-violet-500/10'
                  : 'bg-slate-900/60 border-slate-800'
              }`}
            >
              {srv.recommended && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-0.5 rounded-full bg-violet-600 text-white text-[10px] font-bold uppercase tracking-wider shadow-md">
                  Most Popular for Startups
                </div>
              )}

              <div className="space-y-4">
                <div>
                  <h3 className="text-xl font-bold text-white">{srv.title}</h3>
                  <p className="text-xs text-slate-400 mt-1">{srv.description}</p>
                </div>

                <div className="pt-2">
                  <div className="text-3xl font-extrabold font-mono text-white">{srv.price}</div>
                  <div className="text-xs text-violet-400 font-semibold">{srv.duration}</div>
                </div>

                <div className="space-y-2 pt-4 border-t border-slate-800 text-xs">
                  {srv.deliverables.map((del, i) => (
                    <div key={i} className="flex items-center gap-2 text-slate-300">
                      <CheckCircle2 className="w-3.5 h-3.5 text-violet-400 flex-shrink-0" />
                      <span>{del}</span>
                    </div>
                  ))}
                </div>
              </div>

              <a
                href="#contact-section"
                onClick={() => {
                  setContactForm(prev => ({
                    ...prev,
                    projectScope: srv.title,
                    budget: srv.price,
                  }));
                }}
                className={`mt-6 w-full py-2.5 rounded-xl text-xs font-bold text-center transition-all ${
                  srv.recommended
                    ? 'bg-violet-600 hover:bg-violet-500 text-white shadow-lg shadow-violet-600/25'
                    : 'bg-slate-800 hover:bg-slate-700 text-white'
                }`}
              >
                Choose {srv.title}
              </a>
            </div>
          ))}
        </div>
      </section>

      {/* ======================= CONTACT & PROJECT INQUIRY ======================= */}
      <section id="contact-section" className="py-16 px-6 max-w-4xl mx-auto w-full space-y-6">
        <div className="p-8 sm:p-12 rounded-3xl bg-slate-900 border border-slate-800 shadow-2xl relative overflow-hidden">
          <div className="space-y-2 mb-8">
            <span className="text-xs font-bold uppercase tracking-wider text-violet-400">
              Start a Conversation
            </span>
            <h2 className="text-3xl font-extrabold text-white font-display">
              Tell Me About Your Project
            </h2>
            <p className="text-xs sm:text-sm text-slate-400">
              Fill out the details below, and I'll review your project scope and schedule a 30-minute introductory architecture call.
            </p>
          </div>

          <form onSubmit={handleSendInquiry} className="space-y-4 text-xs">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-slate-400 mb-1 font-medium">Your Name</label>
                <input
                  type="text"
                  placeholder="e.g. David Vance"
                  value={contactForm.name}
                  onChange={e => setContactForm({ ...contactForm, name: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-slate-200 focus:outline-none focus:border-violet-500"
                  required
                />
              </div>

              <div>
                <label className="block text-slate-400 mb-1 font-medium">Work Email</label>
                <input
                  type="email"
                  placeholder="e.g. david@apexventures.io"
                  value={contactForm.email}
                  onChange={e => setContactForm({ ...contactForm, email: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-slate-200 focus:outline-none focus:border-violet-500"
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-slate-400 mb-1 font-medium">Budget Range</label>
                <input
                  type="text"
                  value={contactForm.budget}
                  onChange={e => setContactForm({ ...contactForm, budget: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-slate-200 font-mono"
                />
              </div>

              <div>
                <label className="block text-slate-400 mb-1 font-medium">Target Launch Timeline</label>
                <select
                  value={contactForm.timeline}
                  onChange={e => setContactForm({ ...contactForm, timeline: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-slate-200 focus:outline-none focus:border-violet-500"
                >
                  <option value="ASAP (Within 2 Weeks)">ASAP (Within 2 Weeks)</option>
                  <option value="Within 30 Days">Within 30 Days</option>
                  <option value="1 - 3 Months">1 - 3 Months</option>
                  <option value="Flexible / Exploring">Flexible / Exploring</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-slate-400 mb-1 font-medium">Project Goals & Brief</label>
              <textarea
                rows={4}
                placeholder="Share your product vision, target audience, key workflows, or existing codebase..."
                value={contactForm.message}
                onChange={e => setContactForm({ ...contactForm, message: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-slate-200 focus:outline-none focus:border-violet-500"
              />
            </div>

            <button
              type="submit"
              className="w-full py-3.5 rounded-xl bg-gradient-to-r from-violet-500 to-indigo-600 hover:from-violet-400 hover:to-indigo-500 text-white font-bold text-xs shadow-xl shadow-violet-500/25 flex items-center justify-center gap-2"
            >
              <Send className="w-4 h-4" />
              <span>Submit Project Inquiry</span>
            </button>
          </form>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-slate-800 py-8 px-6 text-center text-xs text-slate-500">
        <p>© {new Date().getFullYear()} {profile.name} • ApexCraft Portfolio Engine • All Rights Reserved</p>
      </footer>

      {/* ======================= MODAL: CASE STUDY DETAIL ======================= */}
      {selectedCaseStudy && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md overflow-y-auto">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl max-w-2xl w-full p-6 md:p-8 shadow-2xl relative my-8">
            <button
              onClick={() => setSelectedCaseStudy(null)}
              className="absolute top-5 right-5 p-2 rounded-full bg-slate-800 text-slate-400 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="space-y-4">
              <span className="px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-violet-500/10 text-violet-400 border border-violet-500/20">
                {selectedCaseStudy.category} • {selectedCaseStudy.client}
              </span>

              <h2 className="text-2xl font-bold text-white font-display">
                {selectedCaseStudy.title}
              </h2>

              <img
                src={selectedCaseStudy.thumbnail}
                alt={selectedCaseStudy.title}
                className="w-full aspect-video rounded-2xl object-cover border border-slate-800"
              />

              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-3 text-xs">
                <div>
                  <strong className="text-rose-400 block mb-0.5">The Challenge:</strong>
                  <p className="text-slate-400 leading-relaxed">{selectedCaseStudy.challenge}</p>
                </div>
                <div>
                  <strong className="text-emerald-400 block mb-0.5">The Solution & Architecture:</strong>
                  <p className="text-slate-400 leading-relaxed">{selectedCaseStudy.solution}</p>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-violet-950/20 border border-violet-900/40 text-xs">
                <p className="italic text-slate-300">"{selectedCaseStudy.testimonial.quote}"</p>
                <div className="mt-2 text-[11px] text-violet-300 font-semibold">
                  — {selectedCaseStudy.testimonial.author}, {selectedCaseStudy.testimonial.role}
                </div>
              </div>

              <div className="pt-2 flex items-center justify-between">
                <a
                  href={selectedCaseStudy.liveUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="px-4 py-2 rounded-xl bg-violet-600 hover:bg-violet-500 text-white font-bold text-xs flex items-center gap-1.5 shadow-md shadow-violet-600/20"
                >
                  <span>Open Live Application</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>

                <button
                  onClick={() => setSelectedCaseStudy(null)}
                  className="px-4 py-2 text-xs text-slate-400 hover:text-white"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ======================= MODAL: EDIT PROFILE (CMS) ======================= */}
      {isEditProfileOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl max-w-md w-full p-6 shadow-2xl relative">
            <button
              onClick={() => setIsEditProfileOpen(false)}
              className="absolute top-4 right-4 p-2 rounded-full bg-slate-800 text-slate-400 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-3 mb-5">
              <div className="p-3 rounded-2xl bg-violet-500/20 text-violet-400">
                <Settings className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-white">Edit Freelancer Profile</h3>
                <p className="text-xs text-slate-400">Live customization of your portfolio branding</p>
              </div>
            </div>

            <form onSubmit={handleSaveProfile} className="space-y-4 text-xs">
              <div>
                <label className="block text-slate-400 mb-1">Your Name</label>
                <input
                  type="text"
                  value={profile.name}
                  onChange={e => setProfile({ ...profile, name: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-slate-200"
                />
              </div>

              <div>
                <label className="block text-slate-400 mb-1">Professional Tagline</label>
                <input
                  type="text"
                  value={profile.tagline}
                  onChange={e => setProfile({ ...profile, tagline: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-slate-200"
                />
              </div>

              <div>
                <label className="block text-slate-400 mb-1">Bio Summary</label>
                <textarea
                  rows={3}
                  value={profile.bio}
                  onChange={e => setProfile({ ...profile, bio: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-slate-200"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-400 mb-1">Hourly Rate ($)</label>
                  <input
                    type="number"
                    value={profile.hourlyRate}
                    onChange={e => setProfile({ ...profile, hourlyRate: Number(e.target.value) })}
                    className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-slate-200"
                  />
                </div>
                <div>
                  <label className="block text-slate-400 mb-1">Availability Tag</label>
                  <input
                    type="text"
                    value={profile.status}
                    onChange={e => setProfile({ ...profile, status: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-slate-200"
                  />
                </div>
              </div>

              <div className="pt-3 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsEditProfileOpen(false)}
                  className="px-4 py-2 text-slate-400 hover:text-white"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-violet-600 hover:bg-violet-500 text-white font-bold"
                >
                  Save Profile
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
