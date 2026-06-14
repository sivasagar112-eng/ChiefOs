"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import { Eye, EyeOff, CheckCircle, AlertCircle, ArrowLeft, Info } from "lucide-react";
import "./login.css";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Toast state
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
    }, 3500);
  };

  useEffect(() => {
    return () => {
      if (toastTimerRef.current) clearTimeout(toastTimerRef.current);
    };
  }, []);

  const validateEmailStr = (v: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.trim());

  const handleEmailBlur = () => {
    if (email) setEmailError(!validateEmailStr(email));
  };

  const handlePasswordBlur = () => {
    if (password) setPasswordError(password.length < 4);
  };

  const handleGoogleAuth = () => {
    showToast("Connecting to Google…", "info");
    setTimeout(() => {
      router.push("/");
    }, 1800);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const isEmailOk = validateEmailStr(email);
    const isPassOk = password.length >= 4;

    setEmailError(!isEmailOk);
    setPasswordError(!isPassOk);

    if (!isEmailOk || !isPassOk) {
      showToast("Please fix the errors above.", "error");
      return;
    }

    setIsLoading(true);
    showToast("Verifying credentials…", "info");

    try {
      const res = await signIn("credentials", {
        redirect: false,
        email,
        password,
      });

      if (res?.error) {
        showToast("Invalid email or password.", "error");
        setIsLoading(false);
        return;
      }

      showToast("Welcome back! Redirecting…", "success");
      setTimeout(() => {
        router.push("/dashboard");
      }, 900);
    } catch (error) {
      showToast("Something went wrong.", "error");
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
        <span>{toast.msg}</span>
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

            <h1 className="panel-headline">
              Your AI Chief<br />of Staff
            </h1>
            <p className="panel-sub">The AI Chief of Staff for Small Businesses — making enterprise-grade intelligence accessible to everyone.</p>

            <div className="features">
              <div className="feature-item">
                <div className="feature-icon fi-blue">⚡</div>
                <div className="feature-text">
                  <h4>Real-time Business Intelligence</h4>
                  <p>Live dashboards and AI-driven insights that surface what matters most, the moment it happens.</p>
                </div>
              </div>
              <div className="feature-item">
                <div className="feature-icon fi-green">🤖</div>
                <div className="feature-text">
                  <h4>Gemini AI Powered</h4>
                  <p>Backed by Google&apos;s most advanced model — your business decisions just got a genius advisor.</p>
                </div>
              </div>
              <div className="feature-item">
                <div className="feature-icon fi-purple">🔒</div>
                <div className="feature-text">
                  <h4>Enterprise-grade Security</h4>
                  <p>SOC 2 Type II compliant, end-to-end encrypted, and built to keep your data 100% private.</p>
                </div>
              </div>
            </div>
          </div>

          <div className="testimonial left-content">
            <p className="testimonial-quote">"ChiefOS is the first tool that actually feels like having a real executive advisor — it caught a cash flow issue I would have missed entirely."</p>
            <div className="testimonial-author">
              <div className="author-avatar">MR</div>
              <div className="author-info">
                <strong>Marcus Reid</strong>
                <span>CEO, Brightline Media</span>
              </div>
            </div>
          </div>
        </aside>

        <main className="right-panel">
          <Link href="/" className="back-link">
            <ArrowLeft />
            Back to home
          </Link>

          <div className="form-card">
            <h2 className="form-heading">Welcome back</h2>
            <p className="form-sub">Log in to your ChiefOS account</p>

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
              <div className="field">
                <label htmlFor="email">Email address</label>
                <div className="field-wrap">
                  <input 
                    type="email" 
                    id="email" 
                    name="email" 
                    placeholder="you@company.com" 
                    autoComplete="email" 
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    onBlur={handleEmailBlur}
                    className={emailError ? "error" : ""}
                  />
                </div>
                {emailError && <p className="field-error">Please enter a valid email address.</p>}
              </div>

              <div className="field">
                <label htmlFor="password">Password</label>
                <div className="field-wrap">
                  <input 
                    type={showPassword ? "text" : "password"} 
                    id="password" 
                    name="password" 
                    placeholder="••••••••" 
                    className={`has-toggle ${passwordError ? "error" : ""}`}
                    autoComplete="current-password" 
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    onBlur={handlePasswordBlur}
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
                {passwordError && <p className="field-error">Password is required.</p>}
              </div>

              <div className="field-row">
                <div></div>
                <button 
                  type="button"
                  className="forgot-link" 
                  style={{ background: 'none', border: 'none', padding: 0, cursor: 'pointer' }}
                  onClick={() => showToast('Password reset link sent to your email.', 'info')}
                >
                  Forgot password?
                </button>
              </div>

              <button type="submit" className="btn-primary" disabled={isLoading}>
                {isLoading ? (
                  <>
                    <div className="spinner"></div>
                    <span style={{ color: "#fff", fontSize: "14px" }}>Signing in…</span>
                  </>
                ) : (
                  <span>Sign In</span>
                )}
              </button>
            </form>

            <div className="form-footer">
              Don&apos;t have an account? <Link href="/signup">Sign up</Link>
            </div>

            <div className="demo-notice">
              <Info />
              <div>
                Demo credentials: <code>demo@chiefos.com</code> / <code>demo1234</code>
              </div>
            </div>
          </div>
        </main>
      </div>
    </>
  );
}
