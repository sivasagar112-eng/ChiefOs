"use client";

import React from 'react';
import {
  Activity, CheckCircle, Mail, DollarSign, ArrowUpRight, TrendingUp,
  Plus, Check, Clock, Sparkles, MessageSquare, AlertCircle
} from 'lucide-react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from 'chart.js';
import { Line, Bar } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

export default function DashboardPage() {
  // Revenue Chart Data
  const revenueData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [
      {
        label: 'Revenue',
        data: [32000, 38000, 35000, 42000, 45000, 48200],
        borderColor: '#3b82f6', 
        backgroundColor: 'rgba(59, 130, 246, 0.1)',
        borderWidth: 2,
        tension: 0.4,
        fill: true,
        pointBackgroundColor: '#3b82f6',
      },
    ],
  };

  const revenueOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
    },
    scales: {
      y: {
        grid: {
          color: 'rgba(255, 255, 255, 0.07)', 
          drawBorder: false,
        },
      },
      x: {
        grid: {
          display: false,
          drawBorder: false,
        },
      },
    },
  };

  // Productivity Chart Data
  const productivityData = {
    labels: ['Alex', 'Sarah', 'Marcus', 'Priya', 'David', 'Emma'],
    datasets: [
      {
        label: 'Productivity Score',
        data: [85, 72, 91, 68, 88, 76],
        backgroundColor: '#a855f7', 
        borderRadius: 6,
      },
    ],
  };

  const productivityOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
    },
    scales: {
      y: {
        grid: {
          color: 'rgba(255, 255, 255, 0.07)', 
          drawBorder: false,
        },
      },
      x: {
        grid: {
          display: false,
          drawBorder: false,
        },
      },
    },
  };

  return (
    <section className="section active">
      {/* Row 1: Stat Cards */}
      <div className="grid grid-4 gap-6 mb-6">
        <div className="card stat-card">
          <div className="flex justify-between items-start">
            <span className="label">Business Health</span>
            <Activity className="text-accent" />
          </div>
          <div className="value">87/100</div>
          <div className="trend up">
            <TrendingUp style={{ width: '14px' }} /> Excellent status
          </div>
        </div>
        <div className="card stat-card">
          <div className="flex justify-between items-start">
            <span className="label">Tasks Completed</span>
            <CheckCircle className="text-success" />
          </div>
          <div className="value">24/31</div>
          <div className="w-full bg-elevated" style={{ height: '6px', borderRadius: '3px', marginTop: '8px' }}>
            <div className="bg-success h-full" style={{ width: '77%', borderRadius: '3px', background: 'var(--success)' }}></div>
          </div>
        </div>
        <div className="card stat-card">
          <div className="flex justify-between items-start">
            <span className="label">Emails Processed</span>
            <Mail className="text-purple" />
          </div>
          <div className="value">128</div>
          <div className="trend up">
            <ArrowUpRight style={{ width: '14px' }} /> 12% this week
          </div>
        </div>
        <div className="card stat-card">
          <div className="flex justify-between items-start">
            <span className="label">Revenue (Month)</span>
            <DollarSign className="text-warning" />
          </div>
          <div className="value">$48,200</div>
          <div className="trend up">
            <TrendingUp style={{ width: '14px' }} /> 8% above target
          </div>
        </div>
      </div>

      {/* Row 2: Charts */}
      <div className="grid grid-2 gap-6 mb-6">
        <div className="card">
          <h3 className="font-semibold mb-4 text-sm text-secondary">Revenue Trend (6 Months)</h3>
          <div className="chart-container">
            <Line data={revenueData} options={revenueOptions} />
          </div>
        </div>
        <div className="card">
          <h3 className="font-semibold mb-4 text-sm text-secondary">Team Productivity</h3>
          <div className="chart-container">
            <Bar data={productivityData} options={productivityOptions} />
          </div>
        </div>
      </div>

      {/* Row 3: Activity Widgets */}
      <div className="grid grid-3 gap-6 mb-6">
        <div className="card">
          <h3 className="font-semibold mb-4 flex items-center justify-between">
            Today's Priorities
            <button className="btn-icon"><Plus /></button>
          </h3>
          <div className="flex flex-col gap-2">
            <div className="checkbox-wrapper list-item">
              <div className="checkbox"><Check style={{ display: 'none' }} /></div>
              <span className="flex-1 text-sm">Review Q3 marketing proposal</span>
              <span className="badge error">HIGH</span>
            </div>
            <div className="checkbox-wrapper list-item">
              <div className="checkbox"><Check style={{ display: 'none' }} /></div>
              <span className="flex-1 text-sm">Follow up with Acme Corp</span>
              <span className="badge error">URGENT</span>
            </div>
            <div className="checkbox-wrapper list-item">
              <div className="checkbox"><Check style={{ display: 'none' }} /></div>
              <span className="flex-1 text-sm">Team standup at 10am</span>
              <span className="badge blue">MEETING</span>
            </div>
            <div className="checkbox-wrapper list-item">
              <div className="checkbox"><Check style={{ display: 'none' }} /></div>
              <span className="flex-1 text-sm">Approve design mockups</span>
              <span className="badge warning">MEDIUM</span>
            </div>
            <div className="checkbox-wrapper list-item">
              <div className="checkbox"><Check style={{ display: 'none' }} /></div>
              <span className="flex-1 text-sm">Send invoice to ClientCo</span>
              <span className="badge error">HIGH</span>
            </div>
          </div>
        </div>

        <div className="card">
          <h3 className="font-semibold mb-4">Upcoming Meetings</h3>
          <div className="flex flex-col">
            <div className="list-item flex-col items-start gap-1">
              <div className="font-medium text-sm">Product Sync</div>
              <div className="text-xs text-secondary flex items-center gap-2">
                <Clock style={{ width: '12px' }} /> 10:00 AM • 4 attendees
              </div>
            </div>
            <div className="list-item flex-col items-start gap-1">
              <div className="font-medium text-sm">Client Call (Nexus)</div>
              <div className="text-xs text-secondary flex items-center gap-2">
                <Clock style={{ width: '12px' }} /> 2:00 PM • 2 attendees
              </div>
            </div>
            <div className="list-item flex-col items-start gap-1">
              <div className="font-medium text-sm">Weekly Review</div>
              <div className="text-xs text-secondary flex items-center gap-2">
                <Clock style={{ width: '12px' }} /> 4:30 PM • Team
              </div>
            </div>
          </div>
          <button className="btn w-full mt-4">View Calendar</button>
        </div>

        <div className="card" style={{ borderColor: 'var(--accent-transparent)' }}>
          <h3 className="font-semibold mb-4 flex items-center gap-2 gradient-text">
            <Sparkles /> AI Insights
          </h3>
          <div className="ai-insight">
            <TrendingUp className="text-accent" style={{ minWidth: '20px' }} />
            <div className="text-sm">Revenue is trending 8% above target this week based on recent Stripe sync.</div>
          </div>
          <div className="ai-insight">
            <MessageSquare className="text-warning" style={{ minWidth: '20px' }} />
            <div className="text-sm">Marcus hasn't replied to your email for 3 days — follow up recommended.</div>
          </div>
          <div className="ai-insight">
            <AlertCircle className="text-error" style={{ minWidth: '20px' }} />
            <div className="text-sm">4 tasks are due today and 2 are overdue in your pipeline.</div>
          </div>
        </div>
      </div>
    </section>
  );
}
