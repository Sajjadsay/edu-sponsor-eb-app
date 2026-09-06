import React from 'react';
import { 
  ShieldCheck, 
  UserCheck, 
  FileCheck, 
  Building, 
  Lock, 
  CheckCircle2, 
  AlertOctagon, 
  DollarSign, 
  ArrowRight,
  School,
  FileBadge,
  Sparkles
} from 'lucide-react';

interface TrustProtocolViewProps {
  onGoToDiscovery: () => void;
}

export const TrustProtocolView: React.FC<TrustProtocolViewProps> = ({ onGoToDiscovery }) => {
  return (
    <div className="space-y-8 max-w-5xl mx-auto">
      {/* Hero */}
      <div className="text-center space-y-3 max-w-3xl mx-auto">
        <span className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-emerald-50 text-emerald-700 border border-emerald-200">
          The Zero-Fraud Institutional Standard
        </span>
        <h1 className="text-3xl sm:text-4xl font-extrabold font-display text-slate-900 tracking-tight">
          How EduSponsor Eliminates Fraud with Direct Bursar Escrow
        </h1>
        <p className="text-sm text-slate-600 leading-relaxed">
          Traditional student crowdfunding suffers from up to 18% fund misdirection and fraud. 
          EduSponsor guarantees that <strong>100% of donor contributions</strong> wire directly to accredited college bursars to pay official tuition invoices.
        </p>
      </div>

      {/* Comparison: Generic Crowdfunding vs EduSponsor */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white rounded-2xl p-6 border border-rose-200/80 shadow-sm space-y-4">
          <div className="flex items-center gap-2 text-rose-700 font-bold text-sm">
            <AlertOctagon className="w-5 h-5" />
            <span>Legacy Personal Crowdfunding</span>
          </div>

          <ul className="space-y-3 text-xs text-slate-600">
            <li className="flex items-start gap-2">
              <span className="text-rose-500 font-bold">✕</span>
              <span>Funds sent directly to personal bank accounts, Venmo, or CashApp without verification.</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-rose-500 font-bold">✕</span>
              <span>No registrar verification of active academic standing, GPA, or tuition bill accuracy.</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-rose-500 font-bold">✕</span>
              <span>Students face tax surprises or loss of need-based federal financial aid due to personal deposits.</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-rose-500 font-bold">✕</span>
              <span>Donors receive zero corporate tax deductibility or IRS Form 990 audit trails.</span>
            </li>
          </ul>
        </div>

        <div className="bg-emerald-50/50 rounded-2xl p-6 border border-emerald-300 shadow-sm space-y-4">
          <div className="flex items-center gap-2 text-emerald-800 font-bold text-sm">
            <ShieldCheck className="w-5 h-5 text-emerald-600" />
            <span>EduSponsor Direct Bursar Escrow Standard</span>
          </div>

          <ul className="space-y-3 text-xs text-emerald-950 font-medium">
            <li className="flex items-start gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
              <span><strong>Direct Bursar Wire:</strong> Funds flow exclusively to accredited university financial aid offices via Title IV automated clearinghouses.</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
              <span><strong>3-Step Verification:</strong> Biometric GovID check, Document AI registrar statement OCR, and school official sign-off.</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
              <span><strong>Aid Safe:</strong> Qualified third-party scholarship payments preserve student federal grants and Pell eligibility.</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
              <span><strong>100% Tax Deductible:</strong> Instant IRS 501(c)(3) tax receipts and corporate ESG compliance audits.</span>
            </li>
          </ul>
        </div>
      </div>

      {/* The 3-Step Verification Protocol Deep Dive */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-6">
        <div className="border-b border-slate-100 pb-4">
          <span className="text-xs font-bold uppercase tracking-wider text-blue-600 block">
            Institutional Standard
          </span>
          <h2 className="text-xl font-bold font-display text-slate-900 mt-1">
            The EduSponsor 3-Step Verification Protocol
          </h2>
          <p className="text-xs text-slate-500 mt-1">
            Each student profile displayed on our platform must complete and maintain all three cryptographic verification milestones.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Step 1 */}
          <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
            <div className="w-10 h-10 rounded-xl bg-blue-100 text-blue-700 flex items-center justify-center font-bold">
              <UserCheck className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-sm text-slate-900">1. Biometric GovID Check</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              We ingest passports or Real ID credentials paired with 3D facial liveness biometric verification to confirm the applicant's true legal identity against federal databases.
            </p>
            <div className="pt-2 text-[11px] font-mono text-blue-700 font-semibold">
              Status: 100% Identity Certified
            </div>
          </div>

          {/* Step 2 */}
          <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
            <div className="w-10 h-10 rounded-xl bg-indigo-100 text-indigo-700 flex items-center justify-center font-bold">
              <FileCheck className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-sm text-slate-900">2. Document AI Registrar OCR</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Our Document AI parses official tuition account ledgers and registrar transcripts, confirming active term enrollment, GPA validity, and itemized course fee breakdowns.
            </p>
            <div className="pt-2 text-[11px] font-mono text-indigo-700 font-semibold">
              Accuracy: 99.6% Automated Audit
            </div>
          </div>

          {/* Step 3 */}
          <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
            <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-700 flex items-center justify-center font-bold">
              <Building className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-sm text-slate-900">3. School Official Sign-Off</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Every tuition request is signed off with institutional registrar or financial aid officer email credentials, certifying the student’s bursar account reference number.
            </p>
            <div className="pt-2 text-[11px] font-mono text-amber-800 font-semibold">
              Direct University Authorization
            </div>
          </div>
        </div>
      </div>

      {/* Call to action */}
      <div className="bg-slate-900 text-white rounded-2xl p-6 text-center space-y-3">
        <h3 className="text-xl font-bold font-display text-white">
          Support a Verified Scholar Today
        </h3>
        <p className="text-xs text-slate-300 max-w-xl mx-auto">
          Choose from verified candidates facing urgent deregistration across STEM, Medicine, Law, and Design.
        </p>
        <button
          onClick={onGoToDiscovery}
          className="px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold rounded-xl shadow-md shadow-blue-500/20 transition-all inline-flex items-center gap-2"
        >
          <span>Explore Verified Students</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
};
