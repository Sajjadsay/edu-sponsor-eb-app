import React, { useState, useEffect } from 'react';
import { 
  Header 
} from './components/Header';
import { 
  StudentDiscovery 
} from './components/StudentDiscovery';
import { 
  StudentPortal 
} from './components/StudentPortal';
import { 
  CSRRulesEngine 
} from './components/CSRRulesEngine';
import { 
  TrustProtocolView 
} from './components/TrustProtocolView';
import { 
  SponsorshipModal 
} from './components/SponsorshipModal';
import { 
  VerificationModal 
} from './components/VerificationModal';
import { 
  ModeratedMessagingModal 
} from './components/ModeratedMessagingModal';
import { 
  Student, 
  CSRRule, 
  SponsorshipTransaction, 
  SponsorMessage 
} from './types';
import { 
  INITIAL_STUDENTS, 
  INITIAL_CSR_RULES 
} from './data/mockStudents';
import { 
  getStoredData, 
  setStoredData, 
  isSupabaseConfigured 
} from './lib/supabase';
import { 
  ShieldCheck, 
  Lock, 
  Heart, 
  GraduationCap, 
  ExternalLink,
  CheckCircle2
} from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState<'discovery' | 'student-portal' | 'csr-rules' | 'trust-protocol'>('discovery');

  // Core State with resilient persistence
  const [students, setStudents] = useState<Student[]>(() => {
    return getStoredData('students', INITIAL_STUDENTS);
  });

  const [csrRules, setCsrRules] = useState<CSRRule[]>(() => {
    return getStoredData('csr_rules', INITIAL_CSR_RULES);
  });

  const [transactions, setTransactions] = useState<SponsorshipTransaction[]>(() => {
    return getStoredData('transactions', []);
  });

  // Modals state
  const [sponsoringStudent, setSponsoringStudent] = useState<Student | null>(null);
  const [verifyingStudent, setVerifyingStudent] = useState<Student | null>(null);
  const [messagingStudent, setMessagingStudent] = useState<Student | null>(null);

  // Sync to persistence
  useEffect(() => {
    setStoredData('students', students);
  }, [students]);

  useEffect(() => {
    setStoredData('csr_rules', csrRules);
  }, [csrRules]);

  useEffect(() => {
    setStoredData('transactions', transactions);
  }, [transactions]);

  // Handler: Handle sponsorship completion
  const handleSponsorshipSuccess = (tx: SponsorshipTransaction) => {
    setTransactions((prev) => [tx, ...prev]);

    setStudents((prev) =>
      prev.map((s) => {
        if (s.id === tx.studentId) {
          const newRaised = Math.min(s.tuitionDue, s.amountRaised + tx.baseAmount);
          return {
            ...s,
            amountRaised: newRaised,
            bursarEscrow: {
              ...s.bursarEscrow,
              escrowStatus: newRaised >= s.tuitionDue ? 'Fully Disbursed' : 'Locked & Verified',
            },
          };
        }
        return s;
      })
    );
  };

  // Handler: Send Moderated Message
  const handleSendMessage = (studentId: string, msg: SponsorMessage) => {
    setStudents((prev) =>
      prev.map((s) => {
        if (s.id === studentId) {
          return {
            ...s,
            messages: [msg, ...(s.messages || [])],
          };
        }
        return s;
      })
    );
  };

  // Handler: Add New Student from Application Portal
  const handleAddNewStudent = (newStudent: Student) => {
    setStudents((prev) => [newStudent, ...prev]);
  };

  // Handler: Add New CSR Rule
  const handleAddCsrRule = (newRule: CSRRule) => {
    setCsrRules((prev) => [newRule, ...prev]);
  };

  // Handler: Execute Corporate Bulk Funding
  const handleExecuteBulkFunding = (ruleId: string, matchedStudents: Student[], amountPerStudent: number) => {
    const totalDeduction = amountPerStudent * matchedStudents.length;

    // Deduct from rule pool
    setCsrRules((prev) =>
      prev.map((r) => {
        if (r.id === ruleId) {
          return {
            ...r,
            remainingBudget: Math.max(0, r.remainingBudget - totalDeduction),
          };
        }
        return r;
      })
    );

    // Credit matched students' bursar accounts
    const matchedIds = new Set(matchedStudents.map((m) => m.id));
    setStudents((prev) =>
      prev.map((s) => {
        if (matchedIds.has(s.id)) {
          const updatedRaised = Math.min(s.tuitionDue, s.amountRaised + amountPerStudent);
          return {
            ...s,
            amountRaised: updatedRaised,
            bursarEscrow: {
              ...s.bursarEscrow,
              escrowStatus: updatedRaised >= s.tuitionDue ? 'Fully Disbursed' : 'Locked & Verified',
            },
          };
        }
        return s;
      })
    );
  };

  const totalEscrowAmount = students.reduce((acc, s) => acc + s.amountRaised, 0);
  const totalFundedCount = students.filter((s) => s.amountRaised >= s.tuitionDue).length;

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col justify-between selection:bg-blue-100 selection:text-blue-900">
      {/* Top Header */}
      <Header
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        totalFundedCount={totalFundedCount}
        totalEscrowAmount={totalEscrowAmount}
        onOpenApply={() => setActiveTab('student-portal')}
      />

      {/* Main App Container */}
      <main className="max-w-7xl w-full mx-auto px-4 sm:px-6 py-6 sm:py-8 flex-1">
        {activeTab === 'discovery' && (
          <StudentDiscovery
            students={students}
            onOpenSponsor={(student) => setSponsoringStudent(student)}
            onOpenVerification={(student) => setVerifyingStudent(student)}
            onOpenMessage={(student) => setMessagingStudent(student)}
          />
        )}

        {activeTab === 'student-portal' && (
          <StudentPortal
            students={students}
            onAddNewStudent={handleAddNewStudent}
            onOpenMessage={(student) => setMessagingStudent(student)}
          />
        )}

        {activeTab === 'csr-rules' && (
          <CSRRulesEngine
            students={students}
            csrRules={csrRules}
            onAddRule={handleAddCsrRule}
            onExecuteBulkFunding={handleExecuteBulkFunding}
          />
        )}

        {activeTab === 'trust-protocol' && (
          <TrustProtocolView
            onGoToDiscovery={() => setActiveTab('discovery')}
          />
        )}
      </main>

      {/* Global Modals */}
      {sponsoringStudent && (
        <SponsorshipModal
          student={sponsoringStudent}
          onClose={() => setSponsoringStudent(null)}
          onSuccess={handleSponsorshipSuccess}
        />
      )}

      {verifyingStudent && (
        <VerificationModal
          student={verifyingStudent}
          onClose={() => setVerifyingStudent(null)}
          onOpenSponsor={(s) => {
            setVerifyingStudent(null);
            setSponsoringStudent(s);
          }}
        />
      )}

      {messagingStudent && (
        <ModeratedMessagingModal
          student={messagingStudent}
          onClose={() => setMessagingStudent(null)}
          onSendMessage={handleSendMessage}
        />
      )}

      {/* Platform Footer */}
      <footer className="bg-slate-900 text-slate-400 text-xs border-t border-slate-800 mt-12 py-8 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto space-y-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 pb-6 border-b border-slate-800">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center text-white font-bold">
                <GraduationCap className="w-5 h-5" />
              </div>
              <div>
                <span className="font-display font-bold text-white text-base">EduSponsor</span>
                <p className="text-[11px] text-slate-400">Institutional Student Scholarship & Direct Bursar Escrow Network</p>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-6 text-[11px] text-slate-300">
              <span className="flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                3-Step Verification Protocol
              </span>
              <span className="flex items-center gap-1.5">
                <Lock className="w-4 h-4 text-emerald-400" />
                Title IV Direct Bursar Escrow
              </span>
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                IRS 501(c)(3) Tax-Deductible
              </span>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 text-[11px] text-slate-500">
            <p>
              &copy; {new Date().getFullYear()} EduSponsor Foundation. All tuition contributions are processed via accredited Title IV clearinghouses directly to institutional registrar accounts.
            </p>
            <div className="flex items-center gap-4">
              <span>Vercel Deploy Ready</span>
              <span>•</span>
              <span>FERPA & PII Protected</span>
              <span>•</span>
              <span>Supabase Enabled</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
