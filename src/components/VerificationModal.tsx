import React from 'react';
import { 
  X, 
  ShieldCheck, 
  UserCheck, 
  FileCheck, 
  Building, 
  Lock, 
  CheckCircle2, 
  ExternalLink,
  Copy,
  Check,
  Building2,
  FileBadge
} from 'lucide-react';
import { Student } from '../types';

interface VerificationModalProps {
  student: Student | null;
  onClose: () => void;
  onOpenSponsor: (student: Student) => void;
}

export const VerificationModal: React.FC<VerificationModalProps> = ({
  student,
  onClose,
  onOpenSponsor,
}) => {
  const [copiedHash, setCopiedHash] = React.useState<string | null>(null);

  if (!student) return null;

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedHash(text);
    setTimeout(() => setCopiedHash(null), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm overflow-y-auto">
      <div className="relative w-full max-w-3xl bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden my-8 animate-in fade-in zoom-in-95 duration-200">
        {/* Modal Header */}
        <div className="bg-gradient-to-r from-slate-900 via-blue-950 to-indigo-950 text-white p-6 relative">
          <button
            onClick={onClose}
            className="absolute top-5 right-5 w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors text-slate-300 hover:text-white"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="flex items-center gap-2 mb-2">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-500/20 text-emerald-300 border border-emerald-400/30">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
              Cryptographically Audited
            </span>
            <span className="text-xs text-slate-400 font-mono">
              REF: {student.bursarEscrow.escrowRoutingRef}
            </span>
          </div>

          <h2 className="text-2xl font-bold font-display tracking-tight text-white">
            3-Step Verification & Bursar Escrow Protocol
          </h2>
          <p className="text-sm text-slate-300 mt-1 max-w-xl">
            Independent institutional verification trail for <strong className="text-white">{student.name}</strong> at <strong className="text-blue-200">{student.university}</strong>.
          </p>
        </div>

        {/* Modal Body */}
        <div className="p-6 space-y-6 max-h-[75vh] overflow-y-auto">
          {/* Direct Bursar Escrow Callout */}
          <div className="p-4 rounded-xl bg-gradient-to-r from-emerald-50 to-teal-50 border border-emerald-200">
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-lg bg-emerald-600 text-white flex items-center justify-center shrink-0 shadow-sm">
                <Lock className="w-5 h-5" />
              </div>
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <h3 className="text-sm font-bold text-emerald-950">
                    Direct-to-School Bursar Escrow Protected
                  </h3>
                  <span className="px-2 py-0.5 text-[10px] font-bold rounded-full bg-emerald-100 text-emerald-800 border border-emerald-300">
                    {student.bursarEscrow.escrowStatus}
                  </span>
                </div>
                <p className="text-xs text-emerald-800 leading-relaxed">
                  Donations for {student.name} do <strong>not</strong> enter personal student checking or peer-to-peer accounts. 
                  EduSponsor is legally bound to disburse funds strictly via automated ACH direct to the official 
                  University Bursar Office under Institutional Student ID <strong className="font-mono text-emerald-900">#{student.bursarEscrow.studentIdNumber}</strong>.
                </p>
                <div className="pt-2 flex flex-wrap items-center gap-4 text-[11px] text-emerald-700 font-mono">
                  <span>Bursar Office: {student.bursarEscrow.bursarOffice}</span>
                  <span>•</span>
                  <span>Clearing: Title IV Compliant</span>
                </div>
              </div>
            </div>
          </div>

          {/* 3-Step Protocol Cards */}
          <div className="space-y-4">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 flex items-center gap-2">
              <span>Verification Checklist & Ledger</span>
              <span className="h-px bg-slate-200 flex-1"></span>
            </h4>

            {/* Step 1: ID Check */}
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-3">
              <div className="flex items-start justify-between gap-2">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-lg bg-blue-100 text-blue-700 flex items-center justify-center font-bold">
                    <UserCheck className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h4 className="text-sm font-bold text-slate-900">1. Biometric & Government ID Check</h4>
                      <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-emerald-100 text-emerald-800">
                        PASSED
                      </span>
                    </div>
                    <p className="text-xs text-slate-500">
                      Method: {student.verification.idCheck.method}
                    </p>
                  </div>
                </div>
                <span className="text-[11px] text-slate-400 font-mono">
                  {new Date(student.verification.idCheck.timestamp).toLocaleDateString()}
                </span>
              </div>

              <div className="text-xs text-slate-600 bg-white p-3 rounded-lg border border-slate-200">
                <p>{student.verification.idCheck.details}</p>
                <div className="mt-2 flex items-center justify-between text-[11px] font-mono text-slate-400 pt-2 border-t border-slate-100">
                  <span className="truncate max-w-[280px]">Hash: {student.verification.idCheck.hash}</span>
                  <button 
                    onClick={() => handleCopy(student.verification.idCheck.hash)}
                    className="flex items-center gap-1 text-blue-600 hover:text-blue-800 font-medium"
                  >
                    {copiedHash === student.verification.idCheck.hash ? (
                      <>
                        <Check className="w-3 h-3 text-emerald-600" />
                        <span>Copied</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3 h-3" />
                        <span>Copy</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>

            {/* Step 2: Document AI Check */}
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-3">
              <div className="flex items-start justify-between gap-2">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-lg bg-indigo-100 text-indigo-700 flex items-center justify-center font-bold">
                    <FileCheck className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h4 className="text-sm font-bold text-slate-900">2. Document AI Registrar & OCR Check</h4>
                      <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-emerald-100 text-emerald-800">
                        {student.verification.documentAiCheck.confidenceScore}% CONFIDENCE
                      </span>
                    </div>
                    <p className="text-xs text-slate-500">
                      Document: {student.verification.documentAiCheck.documentType}
                    </p>
                  </div>
                </div>
                <span className="text-[11px] text-slate-400 font-mono">
                  {new Date(student.verification.documentAiCheck.timestamp).toLocaleDateString()}
                </span>
              </div>

              <div className="text-xs text-slate-600 bg-white p-3 rounded-lg border border-slate-200 space-y-2">
                <p>{student.verification.documentAiCheck.details}</p>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 text-[11px] bg-slate-50 p-2 rounded border border-slate-100 font-mono">
                  <div>
                    <span className="text-slate-400 block text-[10px]">VERIFIED GPA</span>
                    <span className="font-bold text-slate-800">{student.verification.documentAiCheck.extractedGpa}</span>
                  </div>
                  <div>
                    <span className="text-slate-400 block text-[10px]">ENROLLMENT TERM</span>
                    <span className="font-bold text-slate-800">{student.verification.documentAiCheck.termVerified}</span>
                  </div>
                  <div>
                    <span className="text-slate-400 block text-[10px]">REGISTRAR DIGITAL SEAL</span>
                    <span className="font-bold text-emerald-600 flex items-center gap-1">
                      <CheckCircle2 className="w-3 h-3" />
                      Authentic
                    </span>
                  </div>
                </div>
                <div className="flex items-center justify-between text-[11px] font-mono text-slate-400 pt-1">
                  <span className="truncate max-w-[280px]">Hash: {student.verification.documentAiCheck.hash}</span>
                  <button 
                    onClick={() => handleCopy(student.verification.documentAiCheck.hash)}
                    className="flex items-center gap-1 text-blue-600 hover:text-blue-800 font-medium"
                  >
                    {copiedHash === student.verification.documentAiCheck.hash ? 'Copied' : 'Copy'}
                  </button>
                </div>
              </div>
            </div>

            {/* Step 3: School Sign-Off */}
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-3">
              <div className="flex items-start justify-between gap-2">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-lg bg-amber-100 text-amber-700 flex items-center justify-center font-bold">
                    <Building className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h4 className="text-sm font-bold text-slate-900">3. Direct Institutional School Sign-Off</h4>
                      <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-emerald-100 text-emerald-800">
                        DIRECTLY CERTIFIED
                      </span>
                    </div>
                    <p className="text-xs text-slate-500">
                      Officer: {student.verification.schoolSignOff.officialName} ({student.verification.schoolSignOff.officialTitle})
                    </p>
                  </div>
                </div>
                <span className="text-[11px] text-slate-400 font-mono">
                  {new Date(student.verification.schoolSignOff.timestamp).toLocaleDateString()}
                </span>
              </div>

              <div className="text-xs text-slate-600 bg-white p-3 rounded-lg border border-slate-200 space-y-2">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div>
                    <span className="text-slate-400 block text-[10px] font-mono">OFFICIAL REGISTRAR CONTACT</span>
                    <a 
                      href={`mailto:${student.verification.schoolSignOff.institutionalEmail}`}
                      className="text-blue-600 hover:underline font-mono text-xs font-semibold"
                    >
                      {student.verification.schoolSignOff.institutionalEmail}
                    </a>
                  </div>
                  <div>
                    <span className="text-slate-400 block text-[10px] font-mono">INSTITUTIONAL SIGN-OFF ID</span>
                    <span className="font-mono font-bold text-slate-800">{student.verification.schoolSignOff.signOffId}</span>
                  </div>
                </div>
                <p className="text-[11px] text-slate-500 pt-1 border-t border-slate-100">
                  {student.verification.schoolSignOff.details}
                </p>
              </div>
            </div>
          </div>

          {/* Academic Grade Report Snapshot */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 flex items-center gap-2">
              <FileBadge className="w-3.5 h-3.5 text-blue-600" />
              <span>Certified Academic Transcript Ledger</span>
              <span className="h-px bg-slate-200 flex-1"></span>
            </h4>

            <div className="overflow-x-auto rounded-xl border border-slate-200">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-100 text-slate-600 uppercase text-[10px] font-semibold">
                  <tr>
                    <th className="py-2.5 px-3">Term</th>
                    <th className="py-2.5 px-3">Course</th>
                    <th className="py-2.5 px-3">Credits</th>
                    <th className="py-2.5 px-3">Grade</th>
                    <th className="py-2.5 px-3">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 bg-white">
                  {student.gradeReports.map((grade, idx) => (
                    <tr key={idx} className="hover:bg-slate-50/50">
                      <td className="py-2 px-3 font-mono text-slate-500 text-[11px]">{grade.term}</td>
                      <td className="py-2 px-3">
                        <span className="font-semibold text-slate-800">{grade.courseCode}</span>
                        <span className="text-slate-500 ml-1.5 hidden sm:inline">- {grade.courseTitle}</span>
                      </td>
                      <td className="py-2 px-3 font-mono">{grade.credits}</td>
                      <td className="py-2 px-3 font-bold text-slate-900">{grade.grade}</td>
                      <td className="py-2 px-3">
                        <span className={`px-2 py-0.5 rounded text-[10px] font-semibold ${
                          grade.status === 'Completed' 
                            ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                            : 'bg-blue-50 text-blue-700 border border-blue-200'
                        }`}>
                          {grade.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="p-4 bg-slate-50 border-t border-slate-200 flex flex-wrap items-center justify-between gap-3">
          <div className="text-xs text-slate-500 flex items-center gap-1.5">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            <span>Audit Trail Verified by EduSponsor Compliance Clearinghouse</span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={onClose}
              className="px-4 py-2 text-xs font-semibold text-slate-600 hover:text-slate-900 bg-white hover:bg-slate-100 border border-slate-200 rounded-lg transition-colors"
            >
              Close Audit
            </button>
            <button
              onClick={() => {
                onClose();
                onOpenSponsor(student);
              }}
              className="px-4 py-2 text-xs font-bold text-white bg-blue-600 hover:bg-blue-700 rounded-lg shadow-sm shadow-blue-500/20 transition-all flex items-center gap-1.5"
            >
              <Lock className="w-3.5 h-3.5" />
              <span>Sponsor Tuition Directly</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
