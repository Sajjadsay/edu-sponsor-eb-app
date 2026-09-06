import React, { useState, useMemo } from 'react';
import { 
  Building2, 
  Sliders, 
  Sparkles, 
  FileCheck, 
  Download, 
  CheckCircle2, 
  Lock, 
  ArrowRight, 
  Layers, 
  Filter, 
  ShieldCheck, 
  Plus, 
  Users, 
  Printer
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { CSRRule, Student, AcademicCategory, TaxReportItem } from '../types';

interface CSRRulesEngineProps {
  students: Student[];
  csrRules: CSRRule[];
  onAddRule: (rule: CSRRule) => void;
  onExecuteBulkFunding: (ruleId: string, matchedStudents: Student[], amountPerStudent: number) => void;
}

export const CSRRulesEngine: React.FC<CSRRulesEngineProps> = ({
  students,
  csrRules,
  onAddRule,
  onExecuteBulkFunding,
}) => {
  const [selectedRuleId, setSelectedRuleId] = useState<string>(csrRules[0]?.id || '');
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showTaxReportModal, setShowTaxReportModal] = useState(false);

  // New Rule Form State
  const [newRuleName, setNewRuleName] = useState('First-Gen Clean Energy Scholars');
  const [newCompanyName, setNewCompanyName] = useState('NextEra Energy Global CSR');
  const [selectedCats, setSelectedCats] = useState<AcademicCategory[]>(['STEM']);
  const [minGpa, setMinGpa] = useState('3.7');
  const [urgentOnly, setUrgentOnly] = useState(true);
  const [firstGenOnly, setFirstGenOnly] = useState(true);
  const [maxPerStudent, setMaxPerStudent] = useState('2500');
  const [totalBudget, setTotalBudget] = useState('25000');

  // Active Rule
  const activeRule = csrRules.find((r) => r.id === selectedRuleId) || csrRules[0];

  // Matched Students for Active Rule
  const matchedStudents = useMemo(() => {
    if (!activeRule) return [];

    return students.filter((s) => {
      // Category match
      if (activeRule.targetCategories.length > 0 && !activeRule.targetCategories.includes(s.category)) {
        return false;
      }
      // Min GPA
      if (s.gpa < activeRule.minGpa) {
        return false;
      }
      // Urgency
      if (activeRule.requireUrgentOnly && s.daysRemaining > 7) {
        return false;
      }
      // First gen
      if (activeRule.requireFirstGen && !s.firstGen) {
        return false;
      }
      // Already fully funded
      if (s.amountRaised >= s.tuitionDue) {
        return false;
      }
      return true;
    });
  }, [students, activeRule]);

  // Bulk funding calculation
  const calculatedGrantPerStudent = useMemo(() => {
    if (!activeRule || matchedStudents.length === 0) return 0;
    const pool = activeRule.remainingBudget;
    const count = matchedStudents.length;
    const rawPerStudent = Math.floor(pool / count);
    return Math.min(activeRule.maxPerStudent, rawPerStudent);
  }, [activeRule, matchedStudents]);

  const totalBulkCommitment = calculatedGrantPerStudent * matchedStudents.length;

  const handleCreateRuleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const budget = parseFloat(totalBudget) || 20000;
    const maxPer = parseFloat(maxPerStudent) || 2500;
    const gpaNum = parseFloat(minGpa) || 3.5;

    const newRule: CSRRule = {
      id: `csr-${Date.now().toString().slice(-4)}`,
      ruleName: newRuleName,
      companyName: newCompanyName,
      targetCategories: selectedCats,
      minGpa: gpaNum,
      requireUrgentOnly: urgentOnly,
      requireFirstGen: firstGenOnly,
      maxPerStudent: maxPer,
      allocatedBudget: budget,
      remainingBudget: budget,
      active: true,
    };

    onAddRule(newRule);
    setSelectedRuleId(newRule.id);
    setShowCreateModal(false);
  };

  const handleTriggerBulkFunding = () => {
    if (!activeRule || matchedStudents.length === 0 || calculatedGrantPerStudent <= 0) return;

    try {
      confetti({
        particleCount: 100,
        spread: 80,
        origin: { y: 0.5 },
      });
    } catch (e) {
      console.log('confetti:', e);
    }

    onExecuteBulkFunding(activeRule.id, matchedStudents, calculatedGrantPerStudent);
    alert(
      `🎉 Corporate Bulk Funding Executed!\n\nAllocated: $${totalBulkCommitment.toLocaleString()} across ${matchedStudents.length} verified scholars directly into their university bursar accounts.\n\nAudit report ready for IRS Form 990 / 501(c)(3) filing.`
    );
  };

  // Sample Corporate Tax Report Data
  const taxReportList: TaxReportItem[] = [
    {
      id: 'CSR-TAX-2026-901',
      transactionDate: 'Sep 01, 2026',
      corporateEntity: 'Qualcomm Global Philanthropy',
      ein: '95-4281902',
      totalDonation: 50000,
      bursarDirectAmount: 47500,
      platformTipAmount: 2500,
      recipientCount: 19,
      status: 'Audit Certified',
    },
    {
      id: 'CSR-TAX-2026-844',
      transactionDate: 'Aug 28, 2026',
      corporateEntity: 'Genentech Healthcare Access Foundation',
      ein: '94-1184920',
      totalDonation: 75000,
      bursarDirectAmount: 70000,
      platformTipAmount: 5000,
      recipientCount: 22,
      status: 'Audit Certified',
    },
    {
      id: 'CSR-TAX-2026-720',
      transactionDate: 'Aug 15, 2026',
      corporateEntity: 'Patagonia 1% for the Planet Alliance',
      ein: '77-3810492',
      totalDonation: 30000,
      bursarDirectAmount: 28500,
      platformTipAmount: 1500,
      recipientCount: 14,
      status: 'Audit Certified',
    },
  ];

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="bg-slate-900 text-white rounded-3xl p-6 sm:p-8 border border-slate-800 shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="space-y-2 max-w-2xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/20 text-blue-300 text-xs font-semibold border border-blue-400/30">
            <Building2 className="w-3.5 h-3.5 text-blue-400" />
            <span>Corporate Philanthropy & ESG Compliance</span>
          </div>

          <h2 className="text-2xl sm:text-3xl font-extrabold font-display text-white tracking-tight">
            Corporate CSR Programmatic Rules Engine
          </h2>

          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
            Deploy algorithmic scholarship pools with <strong>direct university bursar routing</strong>. Build demographic, GPA, and urgency rules to disburse bulk funds automatically with zero administrative overhead and instant audit-ready IRS 501(c)(3) tax documentation.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
          <button
            onClick={() => setShowTaxReportModal(true)}
            className="px-4 py-2.5 bg-white/10 hover:bg-white/20 text-white text-xs font-bold rounded-xl border border-white/20 transition-colors flex items-center justify-center gap-2"
          >
            <FileCheck className="w-4 h-4 text-emerald-400" />
            <span>Audit-Ready Tax Reports</span>
          </button>

          <button
            onClick={() => setShowCreateModal(true)}
            className="px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold rounded-xl shadow-md shadow-blue-500/20 transition-all flex items-center justify-center gap-2"
          >
            <Plus className="w-4 h-4" />
            <span>Create CSR Rule</span>
          </button>
        </div>
      </div>

      {/* Rules Engine Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column: Active Programmatic Rules Selector */}
        <div className="space-y-4">
          <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm space-y-3">
            <div className="flex items-center justify-between pb-2 border-b border-slate-100">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
                Programmatic CSR Rules ({csrRules.length})
              </span>
              <button
                onClick={() => setShowCreateModal(true)}
                className="text-xs font-semibold text-blue-600 hover:text-blue-800"
              >
                + New Rule
              </button>
            </div>

            <div className="space-y-2.5">
              {csrRules.map((rule) => {
                const isSelected = rule.id === selectedRuleId;
                return (
                  <div
                    key={rule.id}
                    onClick={() => setSelectedRuleId(rule.id)}
                    className={`p-3.5 rounded-xl border cursor-pointer transition-all ${
                      isSelected
                        ? 'border-blue-600 bg-blue-50/50 shadow-sm ring-1 ring-blue-500'
                        : 'border-slate-200 hover:border-slate-300 hover:bg-slate-50/50'
                    }`}
                  >
                    <div className="flex items-start justify-between gap-2">
                      <h4 className="text-xs font-bold text-slate-900 leading-snug">
                        {rule.ruleName}
                      </h4>
                      <span className="px-1.5 py-0.5 text-[10px] font-bold rounded bg-emerald-100 text-emerald-800 shrink-0">
                        Active
                      </span>
                    </div>

                    <p className="text-[11px] text-slate-500 mt-1">
                      {rule.companyName}
                    </p>

                    <div className="mt-2.5 pt-2 border-t border-slate-100/80 flex items-center justify-between text-[11px] font-mono">
                      <span className="text-slate-500">
                        Remaining Pool:
                      </span>
                      <span className="font-bold text-slate-900">
                        ${rule.remainingBudget.toLocaleString()} / ${rule.allocatedBudget.toLocaleString()}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Rule Breakdown Card */}
          {activeRule && (
            <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm space-y-3 text-xs">
              <h4 className="font-bold text-slate-900 flex items-center gap-1.5 uppercase tracking-wider text-[11px]">
                <Sliders className="w-3.5 h-3.5 text-blue-600" />
                <span>Rule Criteria Configuration</span>
              </h4>

              <div className="space-y-2 text-slate-600">
                <div className="flex justify-between py-1 border-b border-slate-100">
                  <span className="text-slate-500">Corporate Donor:</span>
                  <span className="font-bold text-slate-900">{activeRule.companyName}</span>
                </div>
                <div className="flex justify-between py-1 border-b border-slate-100">
                  <span className="text-slate-500">Target Disciplines:</span>
                  <span className="font-bold text-blue-700">{activeRule.targetCategories.join(', ')}</span>
                </div>
                <div className="flex justify-between py-1 border-b border-slate-100">
                  <span className="text-slate-500">Min GPA Threshold:</span>
                  <span className="font-mono font-bold text-slate-900">&ge; {activeRule.minGpa}</span>
                </div>
                <div className="flex justify-between py-1 border-b border-slate-100">
                  <span className="text-slate-500">Urgency Requirement:</span>
                  <span className="font-bold text-slate-800">
                    {activeRule.requireUrgentOnly ? 'Urgent (< 7 Days)' : 'Any Term'}
                  </span>
                </div>
                <div className="flex justify-between py-1 border-b border-slate-100">
                  <span className="text-slate-500">First-Gen Preference:</span>
                  <span className="font-bold text-slate-800">
                    {activeRule.requireFirstGen ? 'Required' : 'Open'}
                  </span>
                </div>
                <div className="flex justify-between py-1">
                  <span className="text-slate-500">Max Cap Per Student:</span>
                  <span className="font-mono font-bold text-emerald-700">${activeRule.maxPerStudent.toLocaleString()}</span>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Right 2 Columns: Algorithmic Matching & One-Click Bulk Funding */}
        <div className="lg:col-span-2 space-y-4">
          {activeRule && (
            <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200">
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="text-lg font-bold font-display text-slate-900">
                      Algorithmic Match: {activeRule.ruleName}
                    </h3>
                    <span className="px-2 py-0.5 rounded-full text-xs font-bold bg-blue-100 text-blue-800">
                      {matchedStudents.length} Students Matched
                    </span>
                  </div>
                  <p className="text-xs text-slate-500 mt-0.5">
                    Verified scholars matching this rule's GPA, category, and urgency parameters.
                  </p>
                </div>

                {/* Bulk Action Button */}
                <button
                  onClick={handleTriggerBulkFunding}
                  disabled={matchedStudents.length === 0 || activeRule.remainingBudget <= 0}
                  className="px-5 py-2.5 bg-emerald-600 hover:bg-emerald-700 disabled:opacity-50 text-white text-xs font-bold rounded-xl shadow-md shadow-emerald-500/20 transition-all flex items-center justify-center gap-2 shrink-0"
                >
                  <Lock className="w-4 h-4" />
                  <span>Execute Bulk Funding (${totalBulkCommitment.toLocaleString()})</span>
                </button>
              </div>

              {/* Bulk Allocation Overview Callout */}
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                <div>
                  <span className="text-[10px] text-slate-400 block uppercase font-mono">Total Commitment</span>
                  <span className="text-base font-bold font-mono text-slate-900">
                    ${totalBulkCommitment.toLocaleString()}
                  </span>
                </div>
                <div>
                  <span className="text-[10px] text-slate-400 block uppercase font-mono">Grant Per Scholar</span>
                  <span className="text-base font-bold font-mono text-emerald-700">
                    ${calculatedGrantPerStudent.toLocaleString()}
                  </span>
                </div>
                <div>
                  <span className="text-[10px] text-slate-400 block uppercase font-mono">Remittance Destination</span>
                  <span className="text-xs font-bold text-slate-800 flex items-center gap-1 mt-0.5">
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                    University Bursars Direct
                  </span>
                </div>
              </div>

              {/* Matched Students List */}
              <div className="space-y-3">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
                  Matched Verified Scholars Ready for Escrow Remittance
                </span>

                {matchedStudents.length > 0 ? (
                  <div className="divide-y divide-slate-100 rounded-xl border border-slate-200 overflow-hidden">
                    {matchedStudents.map((stu) => {
                      const gap = Math.max(0, stu.tuitionDue - stu.amountRaised);
                      return (
                        <div key={stu.id} className="p-4 hover:bg-slate-50/70 transition-colors flex items-center justify-between gap-4">
                          <div className="flex items-center gap-3 min-w-0">
                            <img
                              src={stu.avatar}
                              alt={stu.name}
                              className="w-12 h-12 rounded-xl object-cover border border-slate-200 shrink-0"
                              referrerPolicy="no-referrer"
                            />
                            <div className="min-w-0">
                              <div className="flex items-center gap-2">
                                <h4 className="font-bold text-xs text-slate-900 truncate">{stu.name}</h4>
                                <span className="px-1.5 py-0.5 text-[10px] font-bold rounded bg-slate-100 text-slate-700">
                                  {stu.category}
                                </span>
                              </div>
                              <p className="text-[11px] text-slate-500 truncate">
                                {stu.university} • {stu.major}
                              </p>
                              <p className="text-[10px] text-slate-400 font-mono mt-0.5">
                                GPA: <span className="font-bold text-slate-700">{stu.gpa}</span> • Bursar Ref: {stu.bursarEscrow.escrowRoutingRef}
                              </p>
                            </div>
                          </div>

                          <div className="text-right shrink-0">
                            <span className="text-[10px] text-slate-400 block font-mono">Unfunded Gap</span>
                            <span className="text-xs font-bold font-mono text-rose-600">
                              ${gap.toLocaleString()}
                            </span>
                            <span className="text-[10px] text-emerald-700 block font-semibold font-mono">
                              +${calculatedGrantPerStudent.toLocaleString()} grant
                            </span>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                ) : (
                  <div className="p-8 text-center text-xs text-slate-500 border border-dashed border-slate-300 rounded-xl">
                    <Users className="w-8 h-8 text-slate-300 mx-auto mb-2" />
                    <p>No students currently match this rule's threshold.</p>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* CREATE NEW RULE MODAL */}
      {showCreateModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm overflow-y-auto">
          <div className="relative w-full max-w-lg bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden my-6">
            <form onSubmit={handleCreateRuleSubmit} className="p-6 space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-slate-200">
                <h3 className="font-bold font-display text-slate-900 text-base">
                  Define Programmatic CSR Funding Rule
                </h3>
                <button
                  type="button"
                  onClick={() => setShowCreateModal(false)}
                  className="text-slate-400 hover:text-slate-600 text-xs font-bold"
                >
                  ✕
                </button>
              </div>

              <div className="space-y-3 text-xs">
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Rule Name</label>
                  <input
                    type="text"
                    value={newRuleName}
                    onChange={(e) => setNewRuleName(e.target.value)}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg text-xs"
                    required
                  />
                </div>

                <div>
                  <label className="font-bold text-slate-700 block mb-1">Corporate Sponsor Entity Name</label>
                  <input
                    type="text"
                    value={newCompanyName}
                    onChange={(e) => setNewCompanyName(e.target.value)}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg text-xs"
                    required
                  />
                </div>

                <div>
                  <label className="font-bold text-slate-700 block mb-1">Target Category</label>
                  <div className="flex flex-wrap gap-1.5">
                    {(['STEM', 'Medicine', 'Arts', 'Law', 'Business', 'Humanities'] as AcademicCategory[]).map((cat) => (
                      <button
                        key={cat}
                        type="button"
                        onClick={() => {
                          if (selectedCats.includes(cat)) {
                            setSelectedCats(selectedCats.filter((c) => c !== cat));
                          } else {
                            setSelectedCats([...selectedCats, cat]);
                          }
                        }}
                        className={`px-2.5 py-1 rounded-lg text-xs font-semibold border ${
                          selectedCats.includes(cat)
                            ? 'bg-blue-600 text-white border-blue-600'
                            : 'bg-slate-50 text-slate-700 border-slate-200'
                        }`}
                      >
                        {cat}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="font-bold text-slate-700 block mb-1">Min GPA</label>
                    <input
                      type="number"
                      step="0.05"
                      min="2.5"
                      max="4.0"
                      value={minGpa}
                      onChange={(e) => setMinGpa(e.target.value)}
                      className="w-full px-3 py-2 border border-slate-300 rounded-lg text-xs font-mono"
                    />
                  </div>

                  <div>
                    <label className="font-bold text-slate-700 block mb-1">Max Grant / Student ($)</label>
                    <input
                      type="number"
                      value={maxPerStudent}
                      onChange={(e) => setMaxPerStudent(e.target.value)}
                      className="w-full px-3 py-2 border border-slate-300 rounded-lg text-xs font-mono"
                    />
                  </div>
                </div>

                <div>
                  <label className="font-bold text-slate-700 block mb-1">Total Dedicated Pool Budget ($)</label>
                  <input
                    type="number"
                    value={totalBudget}
                    onChange={(e) => setTotalBudget(e.target.value)}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg text-xs font-mono"
                    required
                  />
                </div>

                <div className="space-y-2 pt-2 border-t border-slate-100">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={urgentOnly}
                      onChange={(e) => setUrgentOnly(e.target.checked)}
                      className="rounded text-blue-600 focus:ring-blue-500 h-3.5 w-3.5"
                    />
                    <span className="font-semibold text-slate-700">Urgent Deregistration Risks Only (&le; 7 Days)</span>
                  </label>

                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={firstGenOnly}
                      onChange={(e) => setFirstGenOnly(e.target.checked)}
                      className="rounded text-blue-600 focus:ring-blue-500 h-3.5 w-3.5"
                    />
                    <span className="font-semibold text-slate-700">First-Generation Student Preference</span>
                  </label>
                </div>
              </div>

              <div className="pt-3 border-t border-slate-200 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowCreateModal(false)}
                  className="px-3 py-1.5 text-xs text-slate-600 hover:text-slate-800"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold rounded-lg transition-colors"
                >
                  Save & Activate Rule
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* AUDIT-READY TAX REPORTS MODAL */}
      {showTaxReportModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm overflow-y-auto">
          <div className="relative w-full max-w-3xl bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden my-6">
            <div className="bg-slate-900 text-white p-6 relative">
              <button
                type="button"
                onClick={() => setShowTaxReportModal(false)}
                className="absolute top-5 right-5 w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors text-slate-300 hover:text-white"
              >
                ✕
              </button>

              <div className="flex items-center gap-2 mb-1">
                <span className="px-2 py-0.5 text-[10px] font-bold rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-400/30">
                  IRS Form 990 / 501(c)(3) Compliant
                </span>
              </div>
              <h3 className="text-xl font-bold font-display text-white">
                Corporate CSR Audit-Ready Tax Reports
              </h3>
              <p className="text-xs text-slate-300 mt-1">
                Cryptographically certified records verifying 100% direct bursar disbursement for institutional corporate tax write-offs.
              </p>
            </div>

            <div className="p-6 space-y-4 max-h-[70vh] overflow-y-auto text-xs">
              <div className="divide-y divide-slate-100 border border-slate-200 rounded-xl overflow-hidden">
                {taxReportList.map((item) => (
                  <div key={item.id} className="p-4 bg-white hover:bg-slate-50 transition-colors space-y-2">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                      <div>
                        <span className="font-mono text-[10px] text-slate-400 block">{item.id}</span>
                        <h4 className="font-bold text-sm text-slate-900">{item.corporateEntity}</h4>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-100 text-emerald-800">
                          {item.status}
                        </span>
                        <button
                          onClick={() => {
                            window.print();
                          }}
                          className="p-1.5 rounded-lg border border-slate-200 hover:bg-slate-100 text-slate-600 transition-colors"
                          title="Print / Save PDF"
                        >
                          <Printer className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-[11px] font-mono bg-slate-50 p-2.5 rounded-lg border border-slate-100">
                      <div>
                        <span className="text-slate-400 block text-[9px]">TOTAL DONATION</span>
                        <span className="font-bold text-slate-900">${item.totalDonation.toLocaleString()}</span>
                      </div>
                      <div>
                        <span className="text-slate-400 block text-[9px]">BURSAR DIRECT WIRE</span>
                        <span className="font-bold text-emerald-700">${item.bursarDirectAmount.toLocaleString()}</span>
                      </div>
                      <div>
                        <span className="text-slate-400 block text-[9px]">SCHOLARS FUNDED</span>
                        <span className="font-bold text-slate-900">{item.recipientCount} Students</span>
                      </div>
                      <div>
                        <span className="text-slate-400 block text-[9px]">IRS EIN</span>
                        <span className="font-bold text-slate-900">{item.ein}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="p-4 bg-slate-50 border-t border-slate-200 flex justify-between items-center">
              <span className="text-xs text-slate-500 font-mono">
                Certified Partner: EduSponsor Charitable Escrow Clearinghouse
              </span>
              <button
                onClick={() => setShowTaxReportModal(false)}
                className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold rounded-lg transition-colors"
              >
                Close Reports
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
