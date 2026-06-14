"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import { Eye, EyeOff, CheckCircle, AlertCircle, ArrowLeft, Info, Check } from "lucide-react";
import "./signup.css";

export default function SignupPage() {
  const router = useRouter();
  
  const [fullName, setFullName] = useState("");
  const [workEmail, setWorkEmail] = useState("");
  const [password, setPassword] = useState("");
  const [company, setCompany] = useState("");
  const [teamSize, setTeamSize] = useState("");
  const [terms, setTerms] = useState(false);

  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Errors
  const [errors, setErrors] = useState({
    fullName: false,
    workEmail: false,
    password: false,
    company: false,
    teamSize: false,
  });

  // Toast
  const [toast, setToast] = useState<{ show: boolean; msg: string; type: "success" | "error" | "info" }>({
    show: false,
    msg: "",
    type: "info",
  });
  const toastTimerRef = useRef<NodeJS.Timeout | null>(null);

  const showToast = (msg: string, type: "success" | "error" | "info" = "info") => {
    setToast({ show: true, msg, type });
    if (toastTimerRef.current) clearTimeout(toastTimerRef.current);
    toastTimerRef.current = setTimeout(() => {
      setToast((prev) => ({ ...prev, show: false }));
    }, 3800);
  };

  useEffect(() => {
    return () => {
      if (toastTimerRef.current) clearTimeout(toastTimerRef.current);
    };
  }, []);

  const validateEmailStr = (v: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.trim());

  const handleBlur = (field: string) => {
    setErrors((prev) => {
      const next = { ...prev };
      if (field === "fullName" && fullName) next.fullName = !(fullName.trim().split(" ").length >= 1 && fullName.trim().length >= 2);
      if (field === "workEmail" && workEmail) next.workEmail = !validateEmailStr(workEmail);
      if (field === "company" && company) next.company = !(company.trim().length >= 2);
      if (field === "password" && password) next.password = password.length < 8;
      if (field === "teamSize" && teamSize) next.teamSize = teamSize === "";
      return next;
    });
  };

  const checkPwStrength = (val: string) => {
    if (!val) return { score: 0, label: "Weak", cls: "weak" };
    let s = 0;
    if (val.length >= 8) s++;
    if (val.length >= 12) s++;
    if (/[A-Z]/.test(val) && /[0-9]/.test(val)) s++;
    if (/[^A-Za-z0-9]/.test(val)) s++;

    const levels = ["weak", "fair", "good", "strong"];
    const labels = ["Weak", "Fair", "Good", "Strong"];
    return {
      score: s,
      label: labels[s - 1] || "Weak",
      cls: levels[s - 1] || "weak"
    };
  };

  const pwInfo = checkPwStrength(password);

  const handleGoogleAuth = () => {
    showToast("Connecting to Google…", "info");
    setTimeout(() => {
      router.push("/");
    }, 1800);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const n = fullName.trim().length >= 2;
    const em = validateEmailStr(workEmail);
    const p = password.length >= 8;
    const c = company.trim().length >= 2;
    const t = teamSize !== "";

    setErrors({
      fullName: !n,
      workEmail: !em,
      password: !p,
      company: !c,
      teamSize: !t,
    });

    if (!terms) {
      showToast("Please accept the Terms of Service to continue.", "error");
      return;
    }
    if (!n || !em || !p || !c || !t) {
      showToast("Please complete all required fields.", "error");
      return;
    }

    setIsLoading(true);
    showToast("Setting up your ChiefOS workspace…", "info");

    try {
      // 1. Register the user
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: workEmail, password, name: fullName }),
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message || "Something went wrong");
      }

      // 2. Sign them in immediately using NextAuth
      const signInRes = await signIn("credentials", {
        redirect: false,
        email: workEmail,
        password,
      });

      if (signInRes?.error) {
        throw new Error(signInRes.error);
      }

      showToast("🎉 Account created! Redirecting to dashboard…", "success");
      setTimeout(() => {
        router.push("/dashboard");
      }, 1000);
      
    } catch (err: any) {
      showToast(err.message, "error");
      setIsLoading(false);
    }
  };

  return (
    <>
      <div className={`toast ${toast.show ? "show" : ""}`} style={{ borderColor: toast.type === "error" ? "rgba(239,68,68,0.4)" : "rgba(59,130,246,0.3)" }} role="alert">
        {toast.type === "error" ? (
          <AlertCircle className="toast-icon" />
        ) : toast.type === "success" ? (
          <CheckCircle className="toast-icon" />
        ) : (
          <Info className="toast-icon" />
        )}
        <span id="toastMsg">{toast.msg}</span>
      </div>

      <div className="auth-shell">
        <aside className="left-panel">
          <div className="mesh-orb mesh-orb-1"></div>
          <div className="mesh-orb mesh-orb-2"></div>
          <div className="mesh-orb mesh-orb-3"></div>

          <div className="left-content">
            <div className="brand-logo">
              <div className="logo-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 3H5a2 2 0 00-2 2v4m6-6h10a2 2 0 012 2v4M9 3v18m0 0h10a2 2 0 002-2V9M9 21H5a2 2 0 01-2-2V9m0 0h18" />
                </svg>
              </div>
              <span className="logo-wordmark">
                Chief<span>OS</span>
              </span>
            </div>

            <h1 className="panel-headline">Join 2,400+<br />thriving businesses</h1>
            <p className="panel-sub">The AI Chief of Staff for Small Businesses. Start your free trial today — no credit card, no commitment.</p>

            <div className="stats-grid">
              <div className="stat-card">
                <div className="stat-icon si-blue">🏢</div>
                <div className="stat-body">
                  <h4>2,400+ Businesses</h4>
                  <p>Trust ChiefOS to run their operations smarter</p>
                </div>
              </div>
              <div className="stat-card">
                <div className="stat-icon si-amber">⚡</div>
                <div className="stat-body">
                  <h4>Setup in Under 5 Minutes</h4>
                  <p>Connect your tools and get insights immediately</p>
                </div>
              </div>
              <div className="stat-card">
                <div className="stat-icon si-green">🎁</div>
                <div className="stat-body">
                  <h4>14-Day Free Trial</h4>
                  <p>No credit card required — cancel anytime, risk-free</p>
                </div>
              </div>
            </div>

            <div className="trust-bar">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
              <span>SOC 2 Type II &bull; <strong>GDPR compliant</strong> &bull; End-to-end encrypted</span>
            </div>
          </div>

          <div className="left-content">
            <div className="avatar-stack">
              <div className="avatar">JK</div>
              <div className="avatar">SR</div>
              <div className="avatar">ML</div>
              <div className="avatar">AP</div>
              <div className="avatar-stack-text">
                <strong>Join 2,400+ small businesses</strong><br />
                that run smarter with ChiefOS
              </div>
            </div>
          </div>
        </aside>

        <main className="right-panel">
          <div style={{ width: "100%", maxWidth: "480px" }}>
            <Link href="/" className="back-link">
              <ArrowLeft />
              Back to home
            </Link>

            <div className="form-card">
              <div className="trial-badge">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
                14-day free trial — no credit card required
              </div>

              <h2 className="form-heading">Create your account</h2>
              <p className="form-sub">Start your free trial. Cancel anytime.</p>

              <button type="button" className="btn-google" onClick={handleGoogleAuth}>
                <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
                  <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                  <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
                  <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
                </svg>
                Continue with Google
              </button>

              <div className="divider"><span>— or continue with email —</span></div>

              <form onSubmit={handleSubmit} noValidate>
                <div className="field-row-2">
                  <div className="field">
                    <label htmlFor="fullName">Full Name</label>
                    <div className="field-wrap">
                      <input 
                        type="text" 
                        id="fullName" 
                        name="fullName" 
                        placeholder="Alex Johnson" 
                        autoComplete="name" 
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        onBlur={() => handleBlur("fullName")}
                        className={errors.fullName ? "error" : ""}
                      />
                    </div>
                    {errors.fullName && <p className="field-error">Please enter your full name.</p>}
                  </div>
                  <div className="field">
                    <label htmlFor="workEmail">Work Email</label>
                    <div className="field-wrap">
                      <input 
                        type="email" 
                        id="workEmail" 
                        name="workEmail" 
                        placeholder="you@company.com" 
                        autoComplete="email" 
                        value={workEmail}
                        onChange={(e) => setWorkEmail(e.target.value)}
                        onBlur={() => handleBlur("workEmail")}
                        className={errors.workEmail ? "error" : ""}
                      />
                    </div>
                    {errors.workEmail && <p className="field-error">Please enter a valid email.</p>}
                  </div>
                </div>

                <div className="field">
                  <label htmlFor="password">Password</label>
                  <div className="field-wrap">
                    <input 
                      type={showPassword ? "text" : "password"} 
                      id="password" 
                      name="password" 
                      placeholder="Create a strong password" 
                      className={`has-toggle ${errors.password ? "error" : ""}`}
                      autoComplete="new-password" 
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      onBlur={() => handleBlur("password")}
                    />
                    <button 
                      type="button" 
                      className="pw-toggle" 
                      aria-label="Toggle password visibility" 
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? <EyeOff /> : <Eye />}
                    </button>
                  </div>
                  {password.length > 0 && (
                    <div className="pw-strength" style={{ display: "flex" }}>
                      <div className="pw-bars">
                        {[0, 1, 2, 3].map((i) => (
                          <div 
                            key={i} 
                            className={`pw-bar ${i < pwInfo.score ? pwInfo.cls : ""}`} 
                          />
                        ))}
                      </div>
                      <span 
                        className="pw-label" 
                        style={{
                          color: pwInfo.score <= 1 ? "#ef4444" : pwInfo.score === 2 ? "#f59e0b" : pwInfo.score === 3 ? "#3b82f6" : "#22c55e"
                        }}
                      >
                        {pwInfo.label}
                      </span>
                    </div>
                  )}
                  {errors.password && <p className="field-error">Password must be at least 8 characters.</p>}
                </div>

                <div className="field-row-2">
                  <div className="field">
                    <label htmlFor="company">Company Name</label>
                    <div className="field-wrap">
                      <input 
                        type="text" 
                        id="company" 
                        name="company" 
                        placeholder="Acme Inc." 
                        autoComplete="organization" 
                        value={company}
                        onChange={(e) => setCompany(e.target.value)}
                        onBlur={() => handleBlur("company")}
                        className={errors.company ? "error" : ""}
                      />
                    </div>
                    {errors.company && <p className="field-error">Please enter your company name.</p>}
                  </div>
                  <div className="field">
                    <label htmlFor="teamSize">Team Size</label>
                    <div className="field-wrap select-wrap">
                      <select 
                        id="teamSize" 
                        name="teamSize"
                        value={teamSize}
                        onChange={(e) => setTeamSize(e.target.value)}
                        onBlur={() => handleBlur("teamSize")}
                        className={errors.teamSize ? "error" : ""}
                      >
                        <option value="">Select size…</option>
                        <option value="1">Just me</option>
                        <option value="2-5">2–5 people</option>
                        <option value="6-20">6–20 people</option>
                        <option value="21-50">21–50 people</option>
                        <option value="51-200">51–200 people</option>
                        <option value="200+">200+ people</option>
                      </select>
                    </div>
                    {errors.teamSize && <p className="field-error">Please select your team size.</p>}
                  </div>
                </div>

                <div className="terms-row">
                  <input 
                    type="checkbox" 
                    id="terms" 
                    name="terms" 
                    checked={terms}
                    onChange={(e) => setTerms(e.target.checked)}
                  />
                  <label htmlFor="terms">
                    I agree to the <a href="#" onClick={(e) => e.preventDefault()}>Terms of Service</a> and <a href="#" onClick={(e) => e.preventDefault()}>Privacy Policy</a>. I understand my data will be used to power AI insights.
                  </label>
                </div>

                <button type="submit" className="btn-primary" disabled={isLoading}>
                  {isLoading ? (
                    <>
                      <div className="spinner"></div>
                      <span style={{ color: "#fff", fontSize: "14px" }}>Creating your account…</span>
                    </>
                  ) : (
                    <span>Create Account — Free for 14 Days</span>
                  )}
                </button>
              </form>

              <div className="form-footer">
                Already have an account? <Link href="/login">Log in</Link>
              </div>
            </div>
          </div>
        </main>
      </div>
    </>
  );
}
