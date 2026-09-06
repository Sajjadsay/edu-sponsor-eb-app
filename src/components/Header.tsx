import React from 'react';
import { 
  GraduationCap, 
  ShieldCheck, 
  Building2, 
  FileText, 
  Sparkles, 
  ExternalLink,
  Lock,
  Search
} from 'lucide-react';
import { isSupabaseConfigured } from '../lib/supabase';

interface HeaderProps {
  activeTab: 'discovery' | 'student-portal' | 'csr-rules' | 'trust-protocol';
  setActiveTab: (tab: 'discovery' | 'student-portal' | 'csr-rules' | 'trust-protocol') => void;
  totalFundedCount: number;
  totalEscrowAmount: number;
  onOpenApply: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  activeTab,
  setActiveTab,
  totalFundedCount,
  totalEscrowAmount,
  onOpenApply,
}) => {
  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200">
      {/* Trust & Guarantee Banner */}
      <div className="bg-slate-900 text-slate-200 text-xs py-1.5 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 font-medium text-[11px] border border-emerald-500/30">
              <Lock className="w-3 h-3 text-emerald-400" />
              Direct Bursar Escrow
            </span>
            <span className="hidden sm:inline text-slate-300">
              100% of student funds disburse directly to university registrars. Zero cash to personal accounts.
            </span>
          </div>

          <div className="flex items-center gap-4 text-slate-300 text-[11px]">
            <span className="flex items-center gap-1 text-slate-300">
              <span className="inline-block w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
              Bursar Clearinghouse Active
            </span>
            <span className="hidden md:inline text-slate-400">|</span>
            <span className="hidden md:inline font-mono text-emerald-400">
              ${totalEscrowAmount.toLocaleString()} in Protected Escrow
            </span>
            <span className="hidden md:inline text-slate-400">|</span>
            <span className="inline-flex items-center gap-1 text-slate-300">
              {isSupabaseConfigured ? (
                <span className="text-emerald-400 font-medium">Supabase Connected</span>
              ) : (
                <span className="text-slate-400">Local Cache • Supabase Ready</span>
              )}
            </span>
          </div>
        </div>
      </div>

      {/* Main Navigation Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3.5">
        <div className="flex items-center justify-between gap-4">
          {/* Brand Logo */}
          <div 
            onClick={() => setActiveTab('discovery')}
            className="flex items-center gap-3 cursor-pointer group"
          >
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-600 to-indigo-700 flex items-center justify-center text-white shadow-md shadow-blue-500/20 group-hover:scale-105 transition-transform">
              <GraduationCap className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-display font-bold text-xl tracking-tight text-slate-900">
                  Edu<span className="text-blue-600">Sponsor</span>
                </span>
                <span className="px-1.5 py-0.5 text-[10px] uppercase font-bold tracking-wider rounded bg-blue-50 text-blue-700 border border-blue-200">
                  Direct Escrow
                </span>
              </div>
              <p className="text-[11px] text-slate-500 hidden sm:block">
                Institutional Student Sponsorship & 3-Step Verified Bursar Funding
              </p>
            </div>
          </div>

          {/* Nav Tabs */}
          <nav className="flex items-center gap-1 bg-slate-100/80 p-1 rounded-xl border border-slate-200">
            <button
              id="nav-tab-discovery"
              onClick={() => setActiveTab('discovery')}
              className={`flex items-center gap-2 px-3.5 py-1.5 text-xs font-semibold rounded-lg transition-all ${
                activeTab === 'discovery'
                  ? 'bg-white text-blue-700 shadow-sm'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/50'
              }`}
            >
              <Search className="w-3.5 h-3.5" />
              <span>Discover Students</span>
            </button>

            <button
              id="nav-tab-student-portal"
              onClick={() => setActiveTab('student-portal')}
              className={`flex items-center gap-2 px-3.5 py-1.5 text-xs font-semibold rounded-lg transition-all ${
                activeTab === 'student-portal'
                  ? 'bg-white text-blue-700 shadow-sm'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/50'
              }`}
            >
              <FileText className="w-3.5 h-3.5" />
              <span>Student & Grade Portal</span>
            </button>

            <button
              id="nav-tab-csr-rules"
              onClick={() => setActiveTab('csr-rules')}
              className={`flex items-center gap-2 px-3.5 py-1.5 text-xs font-semibold rounded-lg transition-all ${
                activeTab === 'csr-rules'
                  ? 'bg-white text-blue-700 shadow-sm'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/50'
              }`}
            >
              <Building2 className="w-3.5 h-3.5" />
              <span>Corporate CSR Engine</span>
            </button>

            <button
              id="nav-tab-trust"
              onClick={() => setActiveTab('trust-protocol')}
              className={`hidden md:flex items-center gap-2 px-3.5 py-1.5 text-xs font-semibold rounded-lg transition-all ${
                activeTab === 'trust-protocol'
                  ? 'bg-white text-blue-700 shadow-sm'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/50'
              }`}
            >
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
              <span>3-Step Verification</span>
            </button>
          </nav>

          {/* Header Actions */}
          <div className="flex items-center gap-2">
            <button
              id="btn-header-apply"
              onClick={onOpenApply}
              className="hidden lg:flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-slate-700 bg-white hover:bg-slate-50 border border-slate-300 rounded-lg transition-colors shadow-sm"
            >
              <Sparkles className="w-3.5 h-3.5 text-amber-500" />
              <span>Apply for Tuition</span>
            </button>

            <a
              href="#one-click-deploy"
              onClick={(e) => {
                e.preventDefault();
                alert('EduSponsor is configured for Vercel with vercel.json, package.json build, and optional Supabase backend environment variables.');
              }}
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-slate-600 hover:text-slate-900 bg-slate-100 hover:bg-slate-200/80 rounded-lg border border-slate-200 transition-colors"
              title="One-click Vercel deployment ready"
            >
              <span className="w-2 h-2 rounded-full bg-black"></span>
              <span className="hidden sm:inline">Vercel Ready</span>
              <ExternalLink className="w-3 h-3 text-slate-400" />
            </a>
          </div>
        </div>
      </div>
    </header>
  );
};
