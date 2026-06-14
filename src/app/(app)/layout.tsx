"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import './app.css';
import { ThemeProvider } from "@/components/theme-provider";
import { 
  Zap, Menu, LayoutDashboard, Bot, CheckSquare, BarChart2, 
  Mail, Calendar, Layers, Settings, ChevronsUpDown, 
  Search, Moon, Bell 
} from 'lucide-react';

export default function AppLayout({ children }: { children: React.ReactNode }) {
  const [collapsed, setCollapsed] = useState(false);
  const [isLightMode, setIsLightMode] = useState(false);
  const pathname = usePathname();

  const toggleSidebar = () => setCollapsed(!collapsed);
  const toggleTheme = () => setIsLightMode(!isLightMode);

  return (
    <div className={`app-body h-screen w-screen overflow-hidden flex ${isLightMode ? 'light-mode' : ''}`} style={{ backgroundColor: 'var(--bg-dark)', color: 'var(--text-primary)' }}>
      {/* SIDEBAR */}
      <aside className={`sidebar ${collapsed ? 'collapsed' : ''}`} id="sidebar">
        <div className="sidebar-header">
          <div className="logo">
            <Zap />
            <span>ChiefOS</span>
          </div>
          <button className="btn-icon" onClick={toggleSidebar}>
            <Menu />
          </button>
        </div>

        <nav className="nav-list">
          <Link href="/dashboard" className={`nav-item ${pathname === '/dashboard' ? 'active' : ''}`}>
            <LayoutDashboard />
            <span>Dashboard</span>
          </Link>
          <Link href="/chat" className={`nav-item ${pathname === '/chat' ? 'active' : ''}`}>
            <Bot />
            <span>AI Chat</span>
          </Link>
          <Link href="/tasks" className={`nav-item ${pathname === '/tasks' ? 'active' : ''}`}>
            <CheckSquare />
            <span>Tasks</span>
          </Link>
          <Link href="/reports" className={`nav-item ${pathname === '/reports' ? 'active' : ''}`}>
            <BarChart2 />
            <span>Reports</span>
          </Link>
          <Link href="/emails" className={`nav-item ${pathname === '/emails' ? 'active' : ''}`}>
            <Mail />
            <span>Emails</span>
          </Link>
          <Link href="/calendar" className={`nav-item ${pathname === '/calendar' ? 'active' : ''}`}>
            <Calendar />
            <span>Calendar</span>
          </Link>
          <Link href="/integrations" className={`nav-item ${pathname === '/integrations' ? 'active' : ''}`}>
            <Layers />
            <span>Integrations</span>
          </Link>
          <Link href="/settings" className={`nav-item ${pathname === '/settings' ? 'active' : ''}`}>
            <Settings />
            <span>Settings</span>
          </Link>
        </nav>

        <div className="upgrade-card">
          <h4 className="text-sm font-semibold text-primary mb-1">Upgrade to Pro</h4>
          <p className="text-xs text-secondary mb-3">Unlock advanced AI features</p>
          <button className="btn btn-primary w-full" style={{ padding: '6px' }}>Upgrade</button>
        </div>

        <div className="user-section">
          <div className="avatar">
            <img src="https://ui-avatars.com/api/?name=Alex+Johnson&background=3b82f6&color=fff" alt="User" />
          </div>
          <div className="user-info">
            <span className="name">Alex Johnson</span>
            <span className="role">Acme Corp</span>
          </div>
          <ChevronsUpDown style={{ marginLeft: 'auto', width: '16px', color: 'var(--text-muted)' }} />
        </div>
      </aside>

      {/* MAIN CONTENT */}
      <main className="main-container">
        {/* HEADER */}
        <header className="top-header">
          <h2 id="header-title" className="font-semibold text-lg">
            {pathname === '/dashboard' ? 'Dashboard' : 
             pathname === '/chat' ? 'AI Chat' : 
             pathname === '/tasks' ? 'Tasks' : 
             pathname === '/reports' ? 'Reports' : 
             pathname === '/emails' ? 'Emails' : 
             pathname === '/calendar' ? 'Calendar' : 
             pathname === '/integrations' ? 'Integrations' : 
             pathname === '/settings' ? 'Settings' : 'Dashboard'}
          </h2>
          
          <div className="flex items-center gap-6">
            <div className="input-group" style={{ width: '300px' }}>
              <Search />
              <input type="text" className="input with-icon" placeholder="Ask AI or search..." />
            </div>
            
            <div className="flex items-center gap-4">
              <button className="btn-icon" onClick={toggleTheme}>
                <Moon id="theme-icon" />
              </button>
              <button className="btn-icon" style={{ position: 'relative' }}>
                <Bell />
                <span style={{ position: 'absolute', top: '4px', right: '4px', background: 'var(--error)', width: '8px', height: '8px', borderRadius: '50%' }}></span>
              </button>
              <div className="avatar sm cursor-pointer">
                <img src="https://ui-avatars.com/api/?name=Alex+Johnson&background=3b82f6&color=fff" alt="User" />
              </div>
            </div>
          </div>
        </header>

        {/* SECTIONS CONTAINER */}
        <div className="content-area" id="content-area">
          {children}
        </div>
      </main>
    </div>
  );
}
