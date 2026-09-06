import React, { useState } from 'react';
import { 
  X, 
  Lock, 
  ShieldCheck, 
  Heart, 
  Sparkles, 
  CreditCard, 
  Building, 
  CheckCircle2, 
  Download, 
  FileText,
  DollarSign,
  Info
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { Student, SponsorshipTransaction } from '../types';

interface SponsorshipModalProps {
  student: Student | null;
  onClose: () => void;
  onSuccess: (transaction: SponsorshipTransaction) => void;
}

export const SponsorshipModal: React.FC<SponsorshipModalProps> = ({
  student,
  onClose,
  onSuccess,
}) => {
  if (!student) return null;

  const remainingGap = Math.max(0, student.tuitionDue - student.amountRaised);

  // Preset options
  const [selectedPreset, setSelectedPreset] = useState<number | 'full' | 'custom'>(500);
  const [customAmount, setCustomAmount] = useState<string>('');
  const [tipPercent, setTipPercent] = useState<0 | 5 | 8 | 10>(8);
  const [sponsorName, setSponsorName] = useState('');
  const [sponsorEmail, setSponsorEmail] = useState('');
  const [paymentMethod, setPaymentMethod] = useState<'Credit Card' | 'ACH Direct Bank Transfer' | 'Corporate DAF'>('Credit Card');
  const [isAnonymous, setIsAnonymous] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [completedTx, setCompletedTx] = useState<SponsorshipTransaction | null>(null);

  // Calculate base amount
  const getBaseAmount = (): number => {
    if (selectedPreset === 'full') return remainingGap;
    if (selectedPreset === 'custom') {
      const parsed = parseFloat(customAmount);
      return isNaN(parsed) || parsed <= 0 ? 0 : parsed;
    }
    return selectedPreset;
  };

  const baseAmount = getBaseAmount();
  const tipAmount = Math.round((baseAmount * tipPercent) / 100);
  const totalAmount = baseAmount + tipAmount;

  const handleConfirmSponsorship = (e: React.FormEvent) => {
    e.preventDefault();
    if (baseAmount <= 0) return;

    setIsSubmitting(true);

    setTimeout(() => {
      const tx: SponsorshipTransaction = {
        id: `TX-BUR-${Math.random().toString(36).substring(2, 9).toUpperCase()}`,
        studentId: student.id,
        studentName: student.name,
        university: student.university,
        bursarRef: student.bursarEscrow.escrowRoutingRef,
        sponsorName: isAnonymous ? 'Anonymous Philanthropist' : (sponsorName.trim() || 'Verified Sponsor'),
        sponsorEmail: sponsorEmail.trim() || 'sponsor@edusponsor.org',
        baseAmount,
        tipPercentage: tipPercent,
        tipAmount,
        totalAmount,
        paymentMethod,
        taxDeductibleReceiptId: `IRS-501C3-EDU-${Date.now().toString().slice(-6)}`,
        timestamp: new Date().toISOString(),
        ein501c3: '47-2910482',
        escrowStatus: 'Held in Escrow'
      };

      try {
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 }
        });
      } catch (err) {
        console.log('Confetti error:', err);
      }

      setCompletedTx(tx);
      setIsSubmitting(false);
      onSuccess(tx);
    }, 900);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm overflow-y-auto">
      <div className="relative w-full max-w-xl bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden my-6 animate-in fade-in zoom-in-95 duration-200">
        
        {/* Success Confirmation View */}
        {completedTx ? (
          <div className="p-8 text-center space-y-6">
            <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto shadow-inner">
              <CheckCircle2 className="w-9 h-9" />
            </div>

            <div className="space-y-2">
              <span className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-emerald-50 text-emerald-700 border border-emerald-200">
                Direct Bursar Escrow Confirmed
              </span>
              <h3 className="text-2xl font-bold font-display text-slate-900">
                ${completedTx.baseAmount.toLocaleString()} Secured for {student.name}
              </h3>
              <p className="text-sm text-slate-600 max-w-md mx-auto">
                Your payment is locked in direct institutional escrow for <strong className="text-slate-900">{student.university} Bursar Office</strong>.
              </p>
            </div>

            {/* Receipt Summary Card */}
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 text-left space-y-3 font-mono text-xs">
              <div className="flex items-center justify-between pb-2 border-b border-slate-200 text-slate-700">
                <span className="font-semibold text-slate-900">Tax-Deductible Receipt</span>
                <span className="text-emerald-700 font-bold">{completedTx.taxDeductibleReceiptId}</span>
              </div>

              <div className="grid grid-cols-2 gap-2 text-slate-600">
                <div>
                  <span className="text-slate-400 block text-[10px]">RECIPIENT INSTITUTION</span>
                  <span className="font-semibold text-slate-800">{student.university}</span>
                </div>
                <div>
                  <span className="text-slate-400 block text-[10px]">BURSAR STUDENT ID</span>
                  <span className="font-semibold text-slate-800">{student.bursarEscrow.studentIdNumber}</span>
                </div>
                <div>
                  <span className="text-slate-400 block text-[10px]">ESCROW ROUTING REF</span>
                  <span className="font-semibold text-slate-800">{student.bursarEscrow.escrowRoutingRef}</span>
                </div>
                <div>
                  <span className="text-slate-400 block text-[10px]">IRS 501(c)(3) EIN</span>
                  <span className="font-semibold text-slate-800">{completedTx.ein501c3}</span>
                </div>
              </div>

              <div className="pt-2 border-t border-slate-200 flex justify-between items-center text-slate-900 font-sans font-bold text-sm">
                <span>Total Tax-Deductible Amount</span>
                <span>${completedTx.totalAmount.toLocaleString()}</span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 justify-center pt-2">
              <button
                onClick={() => {
                  window.print();
                }}
                className="px-4 py-2.5 rounded-xl border border-slate-300 text-slate-700 hover:bg-slate-50 text-xs font-semibold flex items-center justify-center gap-2 transition-colors"
              >
                <Download className="w-4 h-4 text-slate-500" />
                <span>Print / Save 501(c)(3) Receipt</span>
              </button>
              <button
                onClick={onClose}
                className="px-6 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold transition-all shadow-md shadow-blue-500/20"
              >
                Return to Discovery
              </button>
            </div>
          </div>
        ) : (
          /* Sponsorship Form View */
          <form onSubmit={handleConfirmSponsorship}>
            {/* Header */}
            <div className="bg-slate-900 text-white p-6 relative">
              <button
                type="button"
                onClick={onClose}
                className="absolute top-5 right-5 w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors text-slate-300 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="flex items-center gap-2 mb-2">
                <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[11px] font-semibold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                  <Lock className="w-3 h-3 text-emerald-400" />
                  Direct Bursar Escrow
                </span>
                <span className="text-xs text-slate-400">
                  100% Tax-Deductible
                </span>
              </div>

              <h2 className="text-xl font-bold font-display text-white">
                Sponsor Tuition for {student.name}
              </h2>
              <p className="text-xs text-slate-300 mt-1">
                {student.university} • {student.major}
              </p>
            </div>

            {/* Form Content */}
            <div className="p-6 space-y-6 max-h-[75vh] overflow-y-auto">
              {/* Trust Badge Reminder */}
              <div className="flex items-center gap-3 p-3 rounded-xl bg-blue-50/70 border border-blue-200 text-blue-900 text-xs">
                <ShieldCheck className="w-5 h-5 text-blue-600 shrink-0" />
                <span>
                  Funds are held in compliance escrow and wired directly to <strong>{student.university} Bursar Office</strong> under Student ID #{student.bursarEscrow.studentIdNumber}.
                </span>
              </div>

              {/* Amount Selection */}
              <div className="space-y-3">
                <div className="flex items-center justify-between text-xs">
                  <label className="font-bold text-slate-800 uppercase tracking-wider text-[11px]">
                    Select Tuition Support Amount
                  </label>
                  <span className="text-slate-500 font-medium">
                    Remaining Unfunded Gap: <strong className="text-blue-600 font-mono">${remainingGap.toLocaleString()}</strong>
                  </span>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {[250, 500, 1000].map((amt) => (
                    <button
                      key={amt}
                      type="button"
                      onClick={() => {
                        setSelectedPreset(amt);
                      }}
                      className={`py-2.5 px-3 rounded-xl border text-center transition-all ${
                        selectedPreset === amt
                          ? 'border-blue-600 bg-blue-50 text-blue-700 font-bold shadow-sm'
                          : 'border-slate-200 text-slate-700 hover:border-slate-300 hover:bg-slate-50 font-medium'
                      }`}
                    >
                      <span className="text-xs block text-slate-500 font-normal">Grant</span>
                      <span className="text-sm font-display font-bold">${amt}</span>
                    </button>
                  ))}

                  <button
                    type="button"
                    onClick={() => {
                      setSelectedPreset('full');
                    }}
                    className={`py-2.5 px-3 rounded-xl border text-center transition-all ${
                      selectedPreset === 'full'
                        ? 'border-emerald-600 bg-emerald-50 text-emerald-800 font-bold shadow-sm'
                        : 'border-slate-200 text-slate-700 hover:border-slate-300 hover:bg-slate-50 font-medium'
                    }`}
                  >
                    <span className="text-xs block text-emerald-600 font-normal">Clear Full Gap</span>
                    <span className="text-sm font-display font-bold">${remainingGap.toLocaleString()}</span>
                  </button>
                </div>

                {/* Custom Amount Button */}
                <div className="pt-1">
                  <button
                    type="button"
                    onClick={() => setSelectedPreset('custom')}
                    className={`text-xs font-semibold px-3 py-1.5 rounded-lg border transition-all ${
                      selectedPreset === 'custom'
                        ? 'border-blue-600 bg-blue-50 text-blue-700'
                        : 'border-slate-200 text-slate-600 hover:bg-slate-50'
                    }`}
                  >
                    Enter Custom Amount
                  </button>

                  {selectedPreset === 'custom' && (
                    <div className="mt-2 relative">
                      <DollarSign className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                      <input
                        type="number"
                        min="10"
                        max="50000"
                        placeholder="Enter custom grant amount"
                        value={customAmount}
                        onChange={(e) => setCustomAmount(e.target.value)}
                        className="w-full pl-9 pr-4 py-2 border border-slate-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 font-mono"
                        autoFocus
                      />
                    </div>
                  )}
                </div>
              </div>

              {/* Requirement 4: Voluntary Platform Tips (0%, 5%, 8%, 10%) */}
              <div className="space-y-2 p-4 rounded-xl bg-slate-50 border border-slate-200">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-bold text-slate-800 flex items-center gap-1.5">
                    <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500" />
                    <span>Voluntary EduSponsor Platform Contribution</span>
                  </label>
                  <span className="text-xs font-mono font-bold text-slate-700">
                    +${tipAmount.toLocaleString()}
                  </span>
                </div>
                <p className="text-[11px] text-slate-500">
                  EduSponsor charges 0% commission to students. Voluntary tips sustain institutional registrar APIs, Document AI audits, and emergency grants.
                </p>

                <div className="grid grid-cols-4 gap-2 pt-2">
                  {([0, 5, 8, 10] as const).map((pct) => (
                    <button
                      key={pct}
                      type="button"
                      onClick={() => setTipPercent(pct)}
                      className={`py-2 px-2 rounded-lg text-xs font-bold transition-all border ${
                        tipPercent === pct
                          ? 'border-blue-600 bg-white text-blue-700 shadow-sm ring-1 ring-blue-500'
                          : 'border-slate-200 bg-white text-slate-600 hover:bg-slate-100/70'
                      }`}
                    >
                      <span className="block text-sm">{pct}%</span>
                      <span className="text-[10px] text-slate-400 block font-normal">
                        {pct === 0 ? 'No tip' : pct === 8 ? 'Popular' : `${pct}%`}
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Sponsor Information */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-bold text-slate-800 uppercase tracking-wider text-[11px]">
                    Sponsor Tax & Receipt Info
                  </label>
                  <label className="flex items-center gap-1.5 text-xs text-slate-600 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={isAnonymous}
                      onChange={(e) => setIsAnonymous(e.target.checked)}
                      className="rounded text-blue-600 focus:ring-blue-500 h-3.5 w-3.5"
                    />
                    <span>Donate Anonymously</span>
                  </label>
                </div>

                {!isAnonymous && (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="text-[11px] text-slate-600 block mb-1">Full Legal Name (for IRS Receipt)</label>
                      <input
                        type="text"
                        placeholder="e.g., Alexandra Vance"
                        value={sponsorName}
                        onChange={(e) => setSponsorName(e.target.value)}
                        className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required={!isAnonymous}
                      />
                    </div>
                    <div>
                      <label className="text-[11px] text-slate-600 block mb-1">Email for 501(c)(3) Receipt</label>
                      <input
                        type="email"
                        placeholder="e.g., alexandra@firm.com"
                        value={sponsorEmail}
                        onChange={(e) => setSponsorEmail(e.target.value)}
                        className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required
                      />
                    </div>
                  </div>
                )}
              </div>

              {/* Payment Method */}
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-800 uppercase tracking-wider text-[11px]">
                  Payment Method
                </label>
                <div className="grid grid-cols-3 gap-2">
                  <button
                    type="button"
                    onClick={() => setPaymentMethod('Credit Card')}
                    className={`p-2.5 rounded-xl border text-center text-xs transition-all flex flex-col items-center gap-1 ${
                      paymentMethod === 'Credit Card'
                        ? 'border-blue-600 bg-blue-50/50 text-blue-700 font-bold'
                        : 'border-slate-200 text-slate-600 hover:bg-slate-50'
                    }`}
                  >
                    <CreditCard className="w-4 h-4" />
                    <span>Card / Apple Pay</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setPaymentMethod('ACH Direct Bank Transfer')}
                    className={`p-2.5 rounded-xl border text-center text-xs transition-all flex flex-col items-center gap-1 ${
                      paymentMethod === 'ACH Direct Bank Transfer'
                        ? 'border-blue-600 bg-blue-50/50 text-blue-700 font-bold'
                        : 'border-slate-200 text-slate-600 hover:bg-slate-50'
                    }`}
                  >
                    <Building className="w-4 h-4" />
                    <span>ACH Bank Wire</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setPaymentMethod('Corporate DAF')}
                    className={`p-2.5 rounded-xl border text-center text-xs transition-all flex flex-col items-center gap-1 ${
                      paymentMethod === 'Corporate DAF'
                        ? 'border-blue-600 bg-blue-50/50 text-blue-700 font-bold'
                        : 'border-slate-200 text-slate-600 hover:bg-slate-50'
                    }`}
                  >
                    <FileText className="w-4 h-4" />
                    <span>Donor-Advised Fund</span>
                  </button>
                </div>
              </div>

              {/* Live Transparent Receipt Breakdown */}
              <div className="p-4 rounded-xl bg-slate-100/70 border border-slate-200 space-y-2 font-mono text-xs">
                <div className="flex justify-between text-slate-600">
                  <span>Direct Bursar Tuition Escrow</span>
                  <span className="font-bold text-slate-900">${baseAmount.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-slate-600">
                  <span>Student Fee Deductions</span>
                  <span className="text-emerald-700 font-semibold">$0.00 (100% to Bursar)</span>
                </div>
                <div className="flex justify-between text-slate-600">
                  <span>Voluntary Platform Contribution ({tipPercent}%)</span>
                  <span>${tipAmount.toLocaleString()}</span>
                </div>
                <div className="pt-2 border-t border-slate-200 flex justify-between items-center text-slate-900 font-sans font-bold text-sm">
                  <span>Total Tax-Deductible Contribution</span>
                  <span className="text-blue-700 font-mono text-base font-bold">${totalAmount.toLocaleString()}</span>
                </div>
              </div>
            </div>

            {/* Footer Buttons */}
            <div className="p-4 bg-slate-50 border-t border-slate-200 flex items-center justify-between">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 text-xs font-semibold text-slate-600 hover:text-slate-900"
              >
                Cancel
              </button>

              <button
                type="submit"
                disabled={baseAmount <= 0 || isSubmitting}
                className="px-6 py-2.5 bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white text-xs font-bold rounded-xl shadow-md shadow-blue-500/20 transition-all flex items-center gap-2"
              >
                {isSubmitting ? (
                  <>
                    <span className="w-3.5 h-3.5 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
                    <span>Locking Escrow Wire...</span>
                  </>
                ) : (
                  <>
                    <Lock className="w-3.5 h-3.5" />
                    <span>Authorize ${totalAmount.toLocaleString()} Escrow Deposit</span>
                  </>
                )}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
