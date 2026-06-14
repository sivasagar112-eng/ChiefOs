"use client";

import { useEffect, useState, useRef } from 'react';
import Link from 'next/link';


import './marketing.css';

export default function MarketingPage() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isAnnual, setIsAnnual] = useState(false);
  const [openFaq, setOpenFaq] = useState(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const obs = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          e.target.classList.add('visible');
          obs.unobserve(e.target);
        }
      });
    }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });
    
    document.querySelectorAll('.reveal').forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, []);

  useEffect(() => {
    function animCount(el) {
      const dec = el.dataset.decimal === 'true';
      const target = parseFloat(el.dataset.count);
      const pre = el.dataset.prefix || '';
      const suf = el.dataset.suffix || '';
      const dur = 1800, st = performance.now();
      
      function step(now) {
        const p = Math.min((now - st) / dur, 1);
        const e = 1 - Math.pow(1 - p, 3);
        el.textContent = pre + (dec ? (e * target).toFixed(1) : Math.round(e * target)) + suf;
        if (p < 1) requestAnimationFrame(step);
      }
      requestAnimationFrame(step);
    }

    setTimeout(() => {
      document.querySelectorAll('.hero [data-count]').forEach(el => animCount(el));
    }, 700);

    const cObs = new IntersectionObserver(entries => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          animCount(e.target);
          cObs.unobserve(e.target);
        }
      });
    }, { threshold: 0.5 });

    document.querySelectorAll('[data-count]').forEach(el => {
      if (!el.closest('.hero')) cObs.observe(el);
    });

    return () => cObs.disconnect();
  }, []);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const closeMenu = () => setIsMenuOpen(false);

  const toggleFaq = (index) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  return (
    <div className="marketing-page">


{/*  NAVBAR  */}
<nav className="navbar" id="navbar">
  <div className="container">
    <div className="nav-inner">
      <a href="#" className="nav-logo"><div className="nav-logo-dot"></div>ChiefOS</a>
      <ul className="nav-links">
        <li><a href="#features">Features</a></li>
        <li><a href="#integrations">Integrations</a></li>
        <li><a href="#pricing">Pricing</a></li>
        <li><a href="#faq">Blog</a></li>
      </ul>
      <div className="nav-actions">
        <Link href="/login" className="nav-login">Log In</Link>
        <Link href="/signup" className="nav-start">Start Free</Link>
      </div>
      <div className="hamburger" id="hamburger" onClick={toggleMenu}>
        <span></span><span></span><span></span>
      </div>
    </div>
  </div>
</nav>
<div className={`mobile-menu ${isMenuOpen ? "open" : ""}`}>
  <a href="#features" onClick={closeMenu}>Features</a>
  <a href="#integrations" onClick={closeMenu}>Integrations</a>
  <a href="#pricing" onClick={closeMenu}>Pricing</a>
  <a href="#faq" onClick={closeMenu}>Blog</a>
  <div className="mobile-actions">
    <Link href="/login" className="btn-ghost" style={{textAlign: 'center', justifyContent: 'center'}}>Log In</Link>
    <Link href="/signup" className="btn-primary" style={{textAlign: 'center', justifyContent: 'center'}}>Start Free</Link>
  </div>
</div>

{/*  HERO  */}
<section className="hero" id="hero">
  <div className="hero-bg"></div>
  <div className="container" style={{position: 'relative', zIndex: '2', width: '100%'}}>
    <div className="hero-content">
      <div className="hero-badge">&#10022; Now with Gemini AI Integration</div>
      <h1 className="hero-title">Your AI<br /><span className="gradient-text">Chief of Staff</span></h1>
      <p className="hero-sub">Connect your business tools and let AI manage operations, summarize work, track tasks, and surface what matters most.</p>
      <div className="hero-ctas">
        <Link href="/signup" className="btn-primary">&#9733; Start Free &mdash; No Credit Card</Link>
        <Link href="/dashboard" className="btn-ghost">Watch Demo &rarr;</Link>
      </div>
      <div className="hero-stats">
        <div className="hero-stat">
          <div className="hero-stat-num" data-count="2400" data-suffix="+">0</div>
          <div className="hero-stat-label">Companies</div>
        </div>
        <div className="hero-divider"></div>
        <div className="hero-stat">
          <div className="hero-stat-num" data-count="98" data-suffix="%">0</div>
          <div className="hero-stat-label">Satisfaction</div>
        </div>
        <div className="hero-divider"></div>
        <div className="hero-stat">
          <div className="hero-stat-num" data-prefix="$" data-count="2.4" data-suffix="M" data-decimal="true">$0</div>
          <div className="hero-stat-label">Saved by Users</div>
        </div>
        <div className="hero-divider"></div>
        <div className="hero-stat">
          <div className="hero-stat-num" data-count="10" data-suffix="x">0</div>
          <div className="hero-stat-label">Faster Ops</div>
        </div>
      </div>
    </div>
    <div className="hero-mockup-wrap">
      <div className="hero-mockup-glow"></div>
      <div className="float-badge b1"><div className="badge-dot" style={{background: '#22c55e', boxShadow: '0 0 8px #22c55e'}}></div>AI summarized 24 emails</div>
      <div className="float-badge b2"><div className="badge-dot" style={{background: '#3b82f6', boxShadow: '0 0 8px #3b82f6'}}></div>Revenue &#8593; 18% this week</div>
      <div className="float-badge b3" style={{color: '#a855f7'}}>&#9201; 3 tasks due today</div>
      <div className="dashboard">
        <div className="dash-topbar">
          <div className="dash-dot r"></div><div className="dash-dot y"></div><div className="dash-dot g"></div>
          <div className="dash-url">app.chiefos.ai &mdash; Dashboard</div>
        </div>
        <div className="dash-body">
          <div className="dash-sidebar">
            <div className="dash-sidebar-logo"><div className="dash-logo-dot"></div>ChiefOS</div>
            <div className="dash-nav-item active">&#9783; Dashboard</div>
            <div className="dash-nav-item">&#9993; Inbox</div>
            <div className="dash-nav-item">&#10003; Tasks</div>
            <div className="dash-nav-item">&#128202; Reports</div>
            <div className="dash-nav-item">&#128279; Integrations</div>
            <div className="dash-nav-item">&#128172; AI Chat</div>
            <div className="dash-nav-item">&#9881; Settings</div>
          </div>
          <div className="dash-main">
            <div className="dash-greeting">Good morning, <em>Alex</em> &#128075; &mdash; Here's your business snapshot</div>
            <div className="dash-kpis">
              <div className="dash-kpi"><div className="dash-kpi-label">Monthly Revenue</div><div className="dash-kpi-val">$48.2K</div><div className="dash-kpi-chg">&#8593; 12% vs last month</div></div>
              <div className="dash-kpi"><div className="dash-kpi-label">Open Tasks</div><div className="dash-kpi-val">23</div><div className="dash-kpi-chg" style={{color: '#f59e0b'}}>5 overdue</div></div>
              <div className="dash-kpi"><div className="dash-kpi-label">Team Activity</div><div className="dash-kpi-val">92%</div><div className="dash-kpi-chg">&#8593; 4% this week</div></div>
            </div>
            <div className="dash-bottom">
              <div className="dash-card">
                <div className="dash-card-title">Revenue (7 days)</div>
                <div className="mini-chart">
                  <div className="chart-bar" style={{height: '45%'}}></div>
                  <div className="chart-bar" style={{height: '60%'}}></div>
                  <div className="chart-bar" style={{height: '38%'}}></div>
                  <div className="chart-bar" style={{height: '75%'}}></div>
                  <div className="chart-bar" style={{height: '55%'}}></div>
                  <div className="chart-bar hl" style={{height: '90%'}}></div>
                  <div className="chart-bar" style={{height: '70%'}}></div>
                </div>
              </div>
              <div className="dash-card">
                <div className="dash-card-title">Priority Tasks</div>
                <div className="mini-task"><div className="tchk done">&#10003;</div><div className="ttxt done">Send investor update</div></div>
                <div className="mini-task"><div className="tchk done">&#10003;</div><div className="ttxt done">Review Q3 contracts</div></div>
                <div className="mini-task"><div className="tchk"></div><div className="ttxt">Follow up: Acme Corp deal</div></div>
                <div className="mini-task"><div className="tchk"></div><div className="ttxt">Approve marketing budget</div></div>
              </div>
              <div className="dash-card" style={{gridColumn: '1/-1'}}>
                <div className="dash-card-title">AI Chief of Staff</div>
                <div className="ai-bubble">
                  <div className="ai-label"><div className="ai-dot"></div>ChiefOS AI</div>
                  You have 3 unread emails from high-priority clients. Acme Corp's contract expires in 7 days &mdash; want me to draft a renewal proposal? Your team hit 92% task completion this week, up from 84%.
                  <div className="ai-typing"><span></span><span></span><span></span></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>

{/*  PROBLEM  */}
<section className="problem" id="problem">
  <div className="container">
    <div className="section-badge reveal">&#9889; The Problem</div>
    <h2 className="section-title reveal reveal-delay-1">Your business runs on chaos</h2>
    <p className="section-sub reveal reveal-delay-2">Without a system, everything falls through the cracks. Sound familiar?</p>
    <div className="pain-grid">
      <div className="pain-card reveal reveal-delay-1"><span className="pain-icon">&#128231;</span><div className="pain-title">Inbox Overload</div><div className="pain-desc">Drowning in hundreds of emails daily with zero prioritization. Important messages get buried under newsletters and CC chains.</div></div>
      <div className="pain-card reveal reveal-delay-2"><span className="pain-icon">&#9989;</span><div className="pain-title">Lost Tasks</div><div className="pain-desc">Important work slips through the cracks. Tasks assigned in Slack, email, and meetings never get tracked in one place.</div></div>
      <div className="pain-card reveal reveal-delay-3"><span className="pain-icon">&#128202;</span><div className="pain-title">No Visibility</div><div className="pain-desc">You can't see what your team is actually doing. Progress is hidden across a dozen different tools with no unified view.</div></div>
      <div className="pain-card reveal reveal-delay-1"><span className="pain-icon">&#128197;</span><div className="pain-title">Missed Follow-ups</div><div className="pain-desc">Customers are left waiting and deals go cold. Manual follow-up tracking means 30% of opportunities never get a response.</div></div>
      <div className="pain-card reveal reveal-delay-2"><span className="pain-icon">&#128196;</span><div className="pain-title">Document Chaos</div><div className="pain-desc">Files scattered across Google Drive, Notion, Dropbox, and Slack. Nobody can find anything when they need it most.</div></div>
      <div className="pain-card reveal reveal-delay-3"><span className="pain-icon">&#129300;</span><div className="pain-title">Decision Paralysis</div><div className="pain-desc">No clear picture of business health. You're making gut decisions when you should be making data-driven ones.</div></div>
    </div>
  </div>
</section>

{/*  FEATURES  */}
<section className="features" id="features">
  <div className="container">
    <div className="features-header">
      <div className="section-badge reveal">&#10022; Features</div>
      <h2 className="section-title reveal reveal-delay-1">Everything you need to run<br />your business</h2>
      <p className="section-sub reveal reveal-delay-2">One platform to replace your entire operations stack. Less tools. More clarity.</p>
    </div>
    <div className="features-big">
      <div className="feature-card reveal reveal-delay-1">
        <div className="feat-icon">&#129302;</div>
        <div className="feat-title">AI Chief of Staff</div>
        <div className="feat-desc">Ask anything about your business in plain English. ChiefOS searches across all your connected tools and surfaces the exact insight you need &mdash; instantly.</div>
        <div className="feat-ui">
          <div className="chat-row"><div className="chat-av usr">A</div><div className="chat-bbl">What's our biggest deal at risk this week?</div></div>
          <div className="chat-row"><div className="chat-av ai">AI</div><div className="chat-bbl ai">Acme Corp ($42K ARR) hasn't responded in 6 days. I found their last email in Gmail &mdash; want me to draft a follow-up?</div></div>
          <div className="chat-row"><div className="chat-av usr">A</div><div className="chat-bbl">Yes, draft it and add a task to review it.</div></div>
        </div>
      </div>
      <div className="feature-card reveal reveal-delay-2">
        <div className="feat-icon">&#128202;</div>
        <div className="feat-title">Smart Dashboard</div>
        <div className="feat-desc">A real-time command center for your business. Revenue, tasks, team activity, and pipeline &mdash; all unified in one glanceable view that updates automatically.</div>
        <div className="feat-ui">
          <div className="db-row"><div className="db-label">Monthly Revenue</div><div style={{display: 'flex', alignItems: 'center', gap: '8px'}}><div className="db-val">$48.2K</div><div className="db-badge up">&#8593; 12%</div></div></div>
          <div className="db-row"><div className="db-label">Deals in Pipeline</div><div style={{display: 'flex', alignItems: 'center', gap: '8px'}}><div className="db-val">14 Active</div><div className="db-badge up">$230K</div></div></div>
          <div className="db-row"><div className="db-label">Team Task Rate</div><div style={{display: 'flex', alignItems: 'center', gap: '8px'}}><div className="db-val">92%</div><div className="db-badge up">&#8593; 4%</div></div></div>
          <div className="db-row"><div className="db-label">Unread Emails</div><div style={{display: 'flex', alignItems: 'center', gap: '8px'}}><div className="db-val">47</div><div className="db-badge warn">3 urgent</div></div></div>
        </div>
      </div>
    </div>
    <div className="features-small">
      <div className="feature-card reveal reveal-delay-1">
        <div className="feat-icon" style={{fontSize: '18px'}}>&#9989;</div>
        <div className="feat-title" style={{fontSize: '18px'}}>Task Intelligence</div>
        <div className="feat-desc" style={{fontSize: '14px'}}>AI automatically creates, categorizes, and prioritizes tasks from your emails, meetings, and messages. Never lose track of commitments again.</div>
        <div className="feat-ui">
          <div className="tk-item"><div className="tk-dot high"></div><div className="tk-name">Follow up Acme Corp</div><div className="tk-due">Today</div></div>
          <div className="tk-item"><div className="tk-dot med"></div><div className="tk-name">Approve marketing deck</div><div className="tk-due">Tomorrow</div></div>
          <div className="tk-item"><div className="tk-dot low"></div><div className="tk-name">Review Q3 budget</div><div className="tk-due">Fri</div></div>
        </div>
      </div>
      <div className="feature-card reveal reveal-delay-2">
        <div className="feat-icon" style={{fontSize: '18px'}}>&#128231;</div>
        <div className="feat-title" style={{fontSize: '18px'}}>Email Intelligence</div>
        <div className="feat-desc" style={{fontSize: '14px'}}>AI reads and summarizes your inbox, flags urgent emails, detects follow-ups needed, and drafts replies &mdash; all in your voice.</div>
        <div className="feat-ui">
          <div className="em-row"><div className="em-av">S</div><div style={{flex: '1', minWidth: '0'}}><div className="em-from">Sarah Kim</div><div className="em-subj">Re: Partnership proposal &mdash; need response</div></div><div className="em-tag urgent">Urgent</div></div>
          <div className="em-row"><div className="em-av" style={{background: 'rgba(34,197,94,0.1)', color: '#22c55e'}}>M</div><div style={{flex: '1', minWidth: '0'}}><div className="em-from">Marcus Lee</div><div className="em-subj">Invoice #3421 &mdash; awaiting approval</div></div><div className="em-tag follow">Follow-up</div></div>
        </div>
      </div>
      <div className="feature-card reveal reveal-delay-3">
        <div className="feat-icon" style={{fontSize: '18px'}}>&#128203;</div>
        <div className="feat-title" style={{fontSize: '18px'}}>Business Reports</div>
        <div className="feat-desc" style={{fontSize: '14px'}}>Auto-generated daily, weekly, and monthly reports that tell you exactly how your business is doing &mdash; delivered to your inbox automatically.</div>
        <div className="feat-ui">
          <div style={{fontSize: '11px', fontWeight: '700', color: '#3b82f6', marginBottom: '8px', textTransform: 'uppercase', letterSpacing: '0.5px'}}>Weekly Report &middot; June 10</div>
          <div style={{fontSize: '12px', color: '#94a3b8', lineHeight: '1.6'}}>&#10022; Revenue up 12% vs last week<br />&#10022; 3 deals moved to closed-won<br />&#10022; Team completed 47 of 52 tasks<br />&#10022; 2 contracts expiring in 14 days</div>
        </div>
      </div>
    </div>
  </div>
</section>

{/*  HOW IT WORKS  */}
<section className="how" id="how">
  <div className="container">
    <div className="how-header">
      <div className="section-badge reveal">&#128640; How It Works</div>
      <h2 className="section-title reveal reveal-delay-1">Up and running in minutes</h2>
      <p className="section-sub reveal reveal-delay-2" style={{margin: '0 auto'}}>No engineering required. No migration pain. Just connect, learn, and lead.</p>
    </div>
    <div className="how-steps">
      <div className="how-step reveal reveal-delay-1">
        <div className="how-num">1</div>
        <h3 className="how-title">Connect Your Tools</h3>
        <p className="how-desc">Link your existing business tools in one click. ChiefOS securely reads your data without disrupting your workflow.</p>
        <div className="how-pills"><span className="how-pill">Gmail</span><span className="how-pill">Calendar</span><span className="how-pill">Sheets</span><span className="how-pill">Slack</span><span className="how-pill">Notion</span></div>
      </div>
      <div className="how-step reveal reveal-delay-2">
        <div className="how-num">2</div>
        <h3 className="how-title">AI Learns Your Business</h3>
        <p className="how-desc">ChiefOS analyzes your operations, understands your team structure, and builds a complete picture of how your business actually runs.</p>
        <div className="how-pills"><span className="how-pill">Auto-mapping</span><span className="how-pill">Team learning</span><span className="how-pill">Context-aware</span></div>
      </div>
      <div className="how-step reveal reveal-delay-3">
        <div className="how-num">3</div>
        <h3 className="how-title">Get Daily Insights</h3>
        <p className="how-desc">Receive personalized recommendations, automated summaries, and proactive alerts that help you make smarter decisions every day.</p>
        <div className="how-pills"><span className="how-pill">Daily briefings</span><span className="how-pill">Smart alerts</span><span className="how-pill">AI reports</span></div>
      </div>
    </div>
  </div>
</section>

{/*  INTEGRATIONS  */}
<section className="integrations" id="integrations">
  <div className="container">
    <div className="integrations-header">
      <div className="section-badge reveal">&#128279; Integrations</div>
      <h2 className="section-title reveal reveal-delay-1">Connects to your existing tools</h2>
      <p className="section-sub reveal reveal-delay-2">Works with the tools your team already uses. No migration. No disruption.</p>
    </div>
    <div className="integ-grid">
      <div className="integ-card reveal reveal-delay-1"><div className="integ-logo">&#127760;</div><div className="integ-name">Google Workspace</div></div>
      <div className="integ-card reveal reveal-delay-1"><div className="integ-logo">&#128231;</div><div className="integ-name">Gmail</div></div>
      <div className="integ-card reveal reveal-delay-2"><div className="integ-logo">&#128197;</div><div className="integ-name">Google Calendar</div></div>
      <div className="integ-card reveal reveal-delay-2"><div className="integ-logo">&#128202;</div><div className="integ-name">Google Sheets</div></div>
      <div className="integ-card reveal reveal-delay-3"><div className="integ-logo">&#128172;</div><div className="integ-name">Slack</div></div>
      <div className="integ-card reveal reveal-delay-3"><div className="integ-logo">&#128179;</div><div className="integ-name">Stripe</div></div>
      <div className="integ-card reveal reveal-delay-1"><div className="integ-logo">&#128221;</div><div className="integ-name">Notion</div></div>
      <div className="integ-card reveal reveal-delay-1"><div className="integ-logo">&#128208;</div><div className="integ-name">Linear</div></div>
      <div className="integ-card reveal reveal-delay-2"><div className="integ-logo">&#9889;</div><div className="integ-name">Zapier</div></div>
      <div className="integ-card reveal reveal-delay-2"><div className="integ-logo">&#129112;</div><div className="integ-name">HubSpot</div></div>
      <div className="integ-card reveal reveal-delay-3"><div className="integ-logo">&#128025;</div><div className="integ-name">GitHub</div></div>
      <div className="integ-card reveal reveal-delay-3"><div className="integ-logo">&#9729;</div><div className="integ-name">Salesforce</div></div>
    </div>
    <p className="integ-more reveal">And <span>50+ more integrations</span> coming soon &mdash; including Jira, Asana, Xero, QuickBooks, and more.</p>
  </div>
</section>

{/*  TESTIMONIALS  */}
<section className="testimonials" id="testimonials">
  <div className="container">
    <div className="testi-header">
      <div className="section-badge reveal">&#128172; Testimonials</div>
      <h2 className="section-title reveal reveal-delay-1">Loved by founders and operators</h2>
      <p className="section-sub reveal reveal-delay-2">Join thousands of business leaders who run smarter with ChiefOS.</p>
    </div>
    <div className="testi-grid">
      <div className="testi-card reveal reveal-delay-1">
        <div className="testi-quote">&ldquo;</div>
        <div className="testi-stars"><span>&#9733;</span><span>&#9733;</span><span>&#9733;</span><span>&#9733;</span><span>&#9733;</span></div>
        <p className="testi-text">&ldquo;ChiefOS cut my daily operations time by 4 hours. It's like having an executive assistant who never sleeps, never forgets, and always has the context I need.&rdquo;</p>
        <div className="testi-author"><div className="testi-av" style={{background: 'linear-gradient(135deg,#3b82f6,#a855f7)'}}>SC</div><div><div className="testi-name">Sarah Chen</div><div className="testi-role">Founder @ TechFlow</div></div></div>
      </div>
      <div className="testi-card reveal reveal-delay-2">
        <div className="testi-quote">&ldquo;</div>
        <div className="testi-stars"><span>&#9733;</span><span>&#9733;</span><span>&#9733;</span><span>&#9733;</span><span>&#9733;</span></div>
        <p className="testi-text">&ldquo;We went from missing 30% of customer follow-ups to zero. The AI email intelligence is incredible &mdash; it drafts in my voice and catches everything I'd miss.&rdquo;</p>
        <div className="testi-author"><div className="testi-av" style={{background: 'linear-gradient(135deg,#22c55e,#16a34a)'}}>MR</div><div><div className="testi-name">Marcus Rodriguez</div><div className="testi-role">CEO @ GrowthLab</div></div></div>
      </div>
      <div className="testi-card reveal reveal-delay-3">
        <div className="testi-quote">&ldquo;</div>
        <div className="testi-stars"><span>&#9733;</span><span>&#9733;</span><span>&#9733;</span><span>&#9733;</span><span>&#9733;</span></div>
        <p className="testi-text">&ldquo;Our team productivity increased 40% in the first month. The dashboard gives us visibility we never had before &mdash; it's become our daily operating system.&rdquo;</p>
        <div className="testi-author"><div className="testi-av" style={{background: 'linear-gradient(135deg,#f59e0b,#d97706)'}}>PP</div><div><div className="testi-name">Priya Patel</div><div className="testi-role">Operations Director @ Nexus</div></div></div>
      </div>
    </div>
  </div>
</section>

{/*  PRICING  */}
<section className="pricing" id="pricing">
  <div className="container">
    <div className="pricing-header">
      <div className="section-badge reveal">&#128176; Pricing</div>
      <h2 className="section-title reveal reveal-delay-1">Simple, transparent pricing</h2>
      <p className="section-sub reveal reveal-delay-2">Start free, scale as you grow. No hidden fees. Cancel anytime.</p>
    </div>
    <div className="pricing-toggle reveal">
      <span className="tgl-label active" id="ml">Monthly</span>
      <div className="tgl-switch" id="tgl" onClick={() => setIsAnnual(!isAnnual)}><div className="tgl-knob"></div></div>
      <span className="tgl-label" id="al">Annual</span>
      <span className="save-badge">Save 20%</span>
    </div>
    <div className="pricing-grid">
      <div className="pricing-card reveal reveal-delay-1">
        <div className="pc-tier">Starter</div>
        <div className="pc-price"><span className="cur">$</span>{!isAnnual ? "19" : "15"}</div>
        <div className="pc-period"><span className="pp">per month</span> &middot; {isAnnual ? "billed annually" : "billed monthly"}</div>
        <div className="pc-desc">Perfect for solo founders getting started with AI-powered operations.</div>
        <div className="pc-divider"></div>
        <div className="pc-features">
          <div className="pc-feat"><div className="pc-check">&#10003;</div><span>1 user seat</span></div>
          <div className="pc-feat"><div className="pc-check">&#10003;</div><span>5 integrations</span></div>
          <div className="pc-feat"><div className="pc-check">&#10003;</div><span>AI Chat (50 queries/mo)</span></div>
          <div className="pc-feat"><div className="pc-check">&#10003;</div><span>Basic reports (weekly)</span></div>
          <div className="pc-feat"><div className="pc-check">&#10003;</div><span>Email intelligence</span></div>
          <div className="pc-feat"><div className="pc-check">&#10003;</div><span>Task tracking</span></div>
        </div>
        <Link href="/signup" className="pc-btn outline">Start Free Trial</Link>
      </div>
      <div className="pricing-card pop reveal reveal-delay-2">
        <div className="pop-badge">&#10022; Most Popular</div>
        <div className="pc-tier" style={{color: '#3b82f6'}}>Growth</div>
        <div className="pc-price"><span className="cur">$</span>{!isAnnual ? "49" : "39"}</div>
        <div className="pc-period"><span className="pp">per month</span> &middot; {isAnnual ? "billed annually" : "billed monthly"}</div>
        <div className="pc-desc">For growing teams that need full AI operations and advanced reporting.</div>
        <div className="pc-divider"></div>
        <div className="pc-features">
          <div className="pc-feat"><div className="pc-check">&#10003;</div><span>5 user seats</span></div>
          <div className="pc-feat"><div className="pc-check">&#10003;</div><span>15 integrations</span></div>
          <div className="pc-feat"><div className="pc-check">&#10003;</div><span>Full AI Suite (unlimited)</span></div>
          <div className="pc-feat"><div className="pc-check">&#10003;</div><span>Advanced reports (daily/weekly)</span></div>
          <div className="pc-feat"><div className="pc-check">&#10003;</div><span>AI email drafts &amp; summaries</span></div>
          <div className="pc-feat"><div className="pc-check">&#10003;</div><span>Priority support</span></div>
          <div className="pc-feat"><div className="pc-check">&#10003;</div><span>Team analytics dashboard</span></div>
        </div>
        <Link href="/signup" className="pc-btn filled">Start Free Trial</Link>
      </div>
      <div className="pricing-card reveal reveal-delay-3">
        <div className="pc-tier">Pro</div>
        <div className="pc-price"><span className="cur">$</span>{!isAnnual ? "99" : "79"}</div>
        <div className="pc-period"><span className="pp">per month</span> &middot; {isAnnual ? "billed annually" : "billed monthly"}</div>
        <div className="pc-desc">For scaling companies with complex operations and custom AI needs.</div>
        <div className="pc-divider"></div>
        <div className="pc-features">
          <div className="pc-feat"><div className="pc-check">&#10003;</div><span>25 user seats</span></div>
          <div className="pc-feat"><div className="pc-check">&#10003;</div><span>Unlimited integrations</span></div>
          <div className="pc-feat"><div className="pc-check">&#10003;</div><span>Custom AI Agents</span></div>
          <div className="pc-feat"><div className="pc-check">&#10003;</div><span>White-label dashboard</span></div>
          <div className="pc-feat"><div className="pc-check">&#10003;</div><span>API access</span></div>
          <div className="pc-feat"><div className="pc-check">&#10003;</div><span>Dedicated success manager</span></div>
          <div className="pc-feat"><div className="pc-check">&#10003;</div><span>Monthly business reviews</span></div>
        </div>
        <Link href="/signup" className="pc-btn outline">Start Free Trial</Link>
      </div>
      <div className="pricing-card reveal reveal-delay-4">
        <div className="pc-tier" style={{color: '#a855f7'}}>Enterprise</div>
        <div className="pc-price" style={{fontSize: '36px', letterSpacing: '-1px'}}>Custom</div>
        <div className="pc-period">Talk to our team</div>
        <div className="pc-desc">For large organizations requiring bespoke AI, SLAs, and enterprise security.</div>
        <div className="pc-divider"></div>
        <div className="pc-features">
          <div className="pc-feat"><div className="pc-check purple">&#10003;</div><span>Unlimited users</span></div>
          <div className="pc-feat"><div className="pc-check purple">&#10003;</div><span>Dedicated support + SLA</span></div>
          <div className="pc-feat"><div className="pc-check purple">&#10003;</div><span>On-premise deployment</span></div>
          <div className="pc-feat"><div className="pc-check purple">&#10003;</div><span>Custom AI model training</span></div>
          <div className="pc-feat"><div className="pc-check purple">&#10003;</div><span>SSO &amp; SCIM provisioning</span></div>
          <div className="pc-feat"><div className="pc-check purple">&#10003;</div><span>SOC 2 Type II audit logs</span></div>
        </div>
        <Link href="/signup" className="pc-btn ent">Contact Sales &rarr;</Link>
      </div>
    </div>
    <p style={{textAlign: 'center', marginTop: '28px', fontSize: '13px', color: '#475569'}}>All plans include a 14-day free trial &middot; No credit card required &middot; Cancel anytime</p>
  </div>
</section>

{/*  FAQ  */}
<section className="faq" id="faq">
  <div className="container">
    <div className="faq-header">
      <div className="section-badge reveal">&#10067; FAQ</div>
      <h2 className="section-title reveal reveal-delay-1">Frequently asked questions</h2>
      <p className="section-sub reveal reveal-delay-2">Can't find the answer? <a href="/signup" style={{color: '#3b82f6'}}>Chat with us &rarr;</a></p>
    </div>
    <div className="faq-list">
      <div className={`faq-item reveal reveal-delay-1 ${openFaq === 0 ? 'open' : ''}`}><button className="faq-q" onClick={() => toggleFaq(0)}>How does ChiefOS integrate with my existing tools?<div className="faq-ico">+</div></button><div className="faq-a">ChiefOS connects via official OAuth integrations &mdash; click to authorize and we read your data securely. No code, no API keys, no IT support needed. Most teams are fully connected in under 10 minutes. We support Gmail, Google Calendar, Sheets, Slack, Stripe, Notion, Linear, HubSpot, and 40+ more.</div></div>
      <div className={`faq-item reveal reveal-delay-1 ${openFaq === 1 ? 'open' : ''}`}><button className="faq-q" onClick={() => toggleFaq(1)}>Is my business data secure?<div className="faq-ico">+</div></button><div className="faq-a">Absolutely. Your data is encrypted in transit (TLS 1.3) and at rest (AES-256). We are SOC 2 Type II compliant, GDPR ready, and never sell or share your data with third parties. AI processing happens in isolated, private environments. You can revoke access at any time.</div></div>
      <div className={`faq-item reveal reveal-delay-2 ${openFaq === 2 ? 'open' : ''}`}><button className="faq-q" onClick={() => toggleFaq(2)}>How long does setup take?<div className="faq-ico">+</div></button><div className="faq-a">Most users are fully set up in under 15 minutes. Connect your first tools (we recommend starting with Gmail and Calendar), and ChiefOS begins learning your business immediately. Within 24 hours, you'll have your first AI briefing and personalized dashboard.</div></div>
      <div className={`faq-item reveal reveal-delay-2 ${openFaq === 3 ? 'open' : ''}`}><button className="faq-q" onClick={() => toggleFaq(3)}>Can I use ChiefOS without technical knowledge?<div className="faq-ico">+</div></button><div className="faq-a">Yes &mdash; ChiefOS is designed for business operators, not engineers. Everything is click-to-connect and the AI is conversational. If you can use Gmail or Slack, you can use ChiefOS. Our onboarding wizard guides you through every step.</div></div>
      <div className={`faq-item reveal reveal-delay-3 ${openFaq === 4 ? 'open' : ''}`}><button className="faq-q" onClick={() => toggleFaq(4)}>What AI model does ChiefOS use?<div className="faq-ico">+</div></button><div className="faq-a">ChiefOS is powered by Google's Gemini AI &mdash; one of the most capable and context-aware large language models available. We've fine-tuned it for business operations: summarization, task extraction, follow-up detection, and business intelligence. Pro and Enterprise plans can request custom model configurations.</div></div>
      <div className={`faq-item reveal reveal-delay-3 ${openFaq === 5 ? 'open' : ''}`}><button className="faq-q" onClick={() => toggleFaq(5)}>Is there a free trial?<div className="faq-ico">+</div></button><div className="faq-a">Yes! Every plan starts with a 14-day free trial with full feature access. No credit card required. At the end of the trial, you choose to continue with a paid plan or downgrade to our free tier. We'll remind you 3 days before your trial ends.</div></div>
      <div className={`faq-item reveal reveal-delay-4 ${openFaq === 6 ? 'open' : ''}`}><button className="faq-q" onClick={() => toggleFaq(6)}>Can I cancel anytime?<div className="faq-ico">+</div></button><div className="faq-a">Yes, absolutely. No long-term contracts, no cancellation fees. Cancel at any time from your account settings. If you cancel, you'll retain access until the end of your billing period. We can also export all your data before you go.</div></div>
      <div className={`faq-item reveal reveal-delay-4 ${openFaq === 7 ? 'open' : ''}`}><button className="faq-q" onClick={() => toggleFaq(7)}>Do you offer team training?<div className="faq-ico">+</div></button><div className="faq-a">Yes. Growth plans include our self-serve onboarding academy with video tutorials. Pro plans include a dedicated 1-hour onboarding call. Enterprise plans include a full onboarding program with team training sessions, custom playbooks, and a dedicated customer success manager.</div></div>
    </div>
  </div>
</section>

{/*  CTA  */}
<section className="cta-section">
  <div className="container">
    <div className="cta-inner">
      <div className="section-badge reveal" style={{justifyContent: 'center'}}>&#10022; Get Started Today</div>
      <h2 className="section-title reveal reveal-delay-1">Ready to meet your<br /><span className="gradient-text">AI Chief of Staff?</span></h2>
      <p className="section-sub reveal reveal-delay-2">Join 2,400+ businesses already running smarter with ChiefOS. Your first 14 days are completely free.</p>
      <div className="cta-buttons reveal reveal-delay-3">
        <Link href="/signup" className="btn-primary cta-btn-main">&#9733; Start Free Today &mdash; No Credit Card Required</Link>
        <Link href="/dashboard" className="btn-ghost cta-btn-main">Watch Demo &rarr;</Link>
      </div>
      <p className="cta-note reveal reveal-delay-4">14-day free trial &middot; No credit card &middot; SOC2 Ready &middot; Cancel anytime</p>
    </div>
  </div>
</section>

{/*  FOOTER  */}
<footer>
  <div className="container">
    <div className="footer-top">
      <div className="footer-brand">
        <div className="footer-logo"><div className="footer-logo-dot"></div>ChiefOS</div>
        <div className="footer-tagline">The AI Chief of Staff for small businesses. Connect your tools, automate your operations, and run smarter every day.</div>
        <div className="footer-socials">
          <a href="#" className="soc-icon">&#120143;</a>
          <a href="#" className="soc-icon">in</a>
          <a href="#" className="soc-icon">&#9654;</a>
          <a href="#" className="soc-icon"><svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.477 2 2 6.477 2 12c0 4.418 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.603-3.369-1.342-3.369-1.342-.454-1.155-1.11-1.462-1.11-1.462-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.202 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.138 20.161 22 16.418 22 12c0-5.523-4.477-10-10-10z"/></svg></a>
        </div>
      </div>
      <div>
        <div className="footer-col-title">Product</div>
        <div className="footer-links">
          <a href="#features">Features</a><a href="#integrations">Integrations</a>
          <a href="#pricing">Pricing</a><Link href="/dashboard">Demo</Link>
          <a href="#">Changelog</a><a href="#">Roadmap</a>
        </div>
      </div>
      <div>
        <div className="footer-col-title">Company</div>
        <div className="footer-links">
          <a href="#">About Us</a><a href="#">Blog</a>
          <a href="#">Careers</a><a href="#">Press Kit</a><a href="#">Contact</a>
        </div>
      </div>
      <div>
        <div className="footer-col-title">Resources</div>
        <div className="footer-links">
          <a href="#">Documentation</a><a href="#">API Reference</a>
          <a href="#">Help Center</a><a href="#">Community</a>
          <a href="#">Webinars</a><a href="#">Templates</a>
        </div>
      </div>
      <div>
        <div className="footer-col-title">Legal</div>
        <div className="footer-links">
          <a href="#">Privacy Policy</a><a href="#">Terms of Service</a>
          <a href="#">Cookie Policy</a><a href="#">Security</a><a href="#">GDPR</a>
        </div>
      </div>
    </div>
    <div className="footer-bottom">
      <div className="footer-copy">&copy; 2026 ChiefOS, Inc. All rights reserved.</div>
      <div className="footer-badges">
        <span className="footer-badge">&#128274; SOC2 Ready</span>
        <span className="footer-badge">&#127466;&#127482; GDPR Compliant</span>
        <span className="footer-badge">&#128272; 256-bit Encryption</span>
      </div>
    </div>
  </div>
</footer>


    </div>
  );
}
