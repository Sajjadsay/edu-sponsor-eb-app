import React, { useState } from 'react';
import { 
  ShieldCheck, 
  UserCheck, 
  FileCheck, 
  Building, 
  Lock, 
  AlertTriangle, 
  Clock, 
  DollarSign, 
  Award, 
  ChevronDown, 
  ChevronUp, 
  MessageSquare,
  Sparkles,
  GraduationCap
} from 'lucide-react';
import { Student } from '../types';

interface StudentCardProps {
  student: Student;
  onOpenSponsor: (student: Student) => void;
  onOpenVerification: (student: Student) => void;
  onOpenMessage: (student: Student) => void;
}

export const StudentCard: React.FC<StudentCardProps> = ({
  student,
  onOpenSponsor,
  onOpenVerification,
  onOpenMessage,
}) => {
  const [showItemizedCosts, setShowItemizedCosts] = useState(false);

  const remaining = Math.max(0, student.tuitionDue - student.amountRaised);
  const percentRaised = Math.min(100, Math.round((student.amountRaised / student.tuitionDue) * 100));

  // Determine urgency styling
  const getUrgencyBadgeStyle = () => {
    switch (student.urgencyBadge) {
      case 'Tuition Due in 3 Days':
      case 'Immediate Deregistration Risk':
        return 'bg-rose-50 text-rose-700 border-rose-300 ring-1 ring-rose-200';
      case 'Tuition Due in 7 Days':
      case 'Final Semester Completion':
        return 'bg-amber-50 text-amber-700 border-amber-300 ring-1 ring-amber-200';
      default:
        return 'bg-blue-50 text-blue-700 border-blue-300';
    }
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-all duration-200 overflow-hidden flex flex-col justify-between">
      {/* Top Banner with Urgency Badge & Category */}
      <div className="p-5 pb-0">
        <div className="flex items-center justify-between gap-2 mb-3">
          {/* Category Chip */}
          <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-slate-100 text-slate-700 border border-slate-200">
            {student.category}
          </span>

          {/* Urgency Badge */}
          <div className={`flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold border ${getUrgencyBadgeStyle()}`}>
            <Clock className="w-3.5 h-3.5 shrink-0" />
            <span>{student.urgencyBadge}</span>
          </div>
        </div>

        {/* Student Profile Info */}
        <div className="flex items-start gap-3.5">
          <img
            src={student.avatar}
            alt={student.name}
            className="w-16 h-16 rounded-xl object-cover border-2 border-slate-100 shadow-sm shrink-0"
            referrerPolicy="no-referrer"
          />

          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-1.5 flex-wrap">
              <h3 className="font-bold font-display text-slate-900 text-base leading-tight truncate">
                {student.name}
              </h3>
              <button
                onClick={() => onOpenVerification(student)}
                title="View 3-Step Verification Protocol Details"
                className="inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-700 bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 px-1.5 py-0.5 rounded-md transition-colors"
              >
                <ShieldCheck className="w-3 h-3 text-emerald-600" />
                <span>Verified</span>
              </button>
            </div>

            <p className="text-xs font-medium text-slate-700 mt-0.5 flex items-center gap-1 truncate">
              <GraduationCap className="w-3.5 h-3.5 text-blue-600 shrink-0" />
              <span>{student.university}</span>
            </p>

            <p className="text-xs text-slate-500 truncate mt-0.5">
              {student.major} • <span className="font-mono text-slate-700 font-semibold">{student.gpa} GPA</span>
            </p>
          </div>
        </div>

        {/* 3-Step Verification Protocol Badges */}
        <div className="mt-4 pt-3 border-t border-slate-100">
          <div className="flex items-center justify-between text-[11px] text-slate-500 mb-1.5">
            <span className="font-bold uppercase tracking-wider text-[10px] text-slate-400">
              3-Step Verification Protocol
            </span>
            <button
              onClick={() => onOpenVerification(student)}
              className="text-blue-600 hover:text-blue-800 text-[11px] font-medium"
            >
              Inspect Audit Trail &rarr;
            </button>
          </div>

          <div className="grid grid-cols-3 gap-1.5">
            {/* Step 1: ID Check */}
            <button
              onClick={() => onOpenVerification(student)}
              className="p-1.5 rounded-lg bg-blue-50/60 hover:bg-blue-100/70 border border-blue-200 text-left transition-colors flex items-center gap-1.5"
            >
              <UserCheck className="w-3.5 h-3.5 text-blue-600 shrink-0" />
              <div className="truncate">
                <span className="block text-[10px] font-bold text-slate-900 leading-tight">1. ID Check</span>
                <span className="block text-[9px] text-emerald-600 font-semibold">Passed</span>
              </div>
            </button>

            {/* Step 2: Document AI Check */}
            <button
              onClick={() => onOpenVerification(student)}
              className="p-1.5 rounded-lg bg-indigo-50/60 hover:bg-indigo-100/70 border border-indigo-200 text-left transition-colors flex items-center gap-1.5"
            >
              <FileCheck className="w-3.5 h-3.5 text-indigo-600 shrink-0" />
              <div className="truncate">
                <span className="block text-[10px] font-bold text-slate-900 leading-tight">2. Doc AI</span>
                <span className="block text-[9px] text-indigo-600 font-semibold">99% Match</span>
              </div>
            </button>

            {/* Step 3: School Sign-Off */}
            <button
              onClick={() => onOpenVerification(student)}
              className="p-1.5 rounded-lg bg-amber-50/60 hover:bg-amber-100/70 border border-amber-200 text-left transition-colors flex items-center gap-1.5"
            >
              <Building className="w-3.5 h-3.5 text-amber-600 shrink-0" />
              <div className="truncate">
                <span className="block text-[10px] font-bold text-slate-900 leading-tight">3. Registrar</span>
                <span className="block text-[9px] text-amber-700 font-semibold">Signed-Off</span>
              </div>
            </button>
          </div>
        </div>

        {/* Direct-to-School Bursar Escrow Badge */}
        <div className="mt-2.5 p-2 rounded-lg bg-slate-50 border border-slate-200 flex items-center justify-between text-xs">
          <div className="flex items-center gap-2 truncate">
            <Lock className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
            <span className="font-semibold text-slate-800 text-[11px] truncate">
              Direct Bursar Escrow: <span className="font-mono text-slate-600 font-normal">{student.bursarEscrow.studentIdNumber}</span>
            </span>
          </div>
          <span className="text-[10px] uppercase font-bold text-emerald-700 bg-emerald-100/80 px-1.5 py-0.5 rounded">
            Title IV
          </span>
        </div>

        {/* Story Narrative */}
        <p className="text-xs text-slate-600 mt-3 line-clamp-3 leading-relaxed">
          {student.story}
        </p>

        {/* Itemized Cost Breakdown Dropdown Toggle */}
        <div className="mt-3">
          <button
            onClick={() => setShowItemizedCosts(!showItemizedCosts)}
            className="w-full flex items-center justify-between text-[11px] text-slate-500 hover:text-slate-800 py-1 font-medium transition-colors"
          >
            <span>Itemized Tuition & Fee Breakdown ({student.itemizedCosts.length} items)</span>
            {showItemizedCosts ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
          </button>

          {showItemizedCosts && (
            <div className="mt-1.5 p-2.5 rounded-lg bg-slate-50 border border-slate-200 space-y-1.5 text-xs animate-in fade-in duration-150">
              {student.itemizedCosts.map((cost, idx) => (
                <div key={idx} className="flex items-center justify-between text-[11px]">
                  <span className={`truncate mr-2 ${cost.covered ? 'line-through text-slate-400' : 'text-slate-700'}`}>
                    • {cost.item}
                  </span>
                  <span className="font-mono font-semibold shrink-0">
                    ${cost.amount.toLocaleString()}
                    {cost.covered && <span className="ml-1 text-[10px] text-emerald-600 font-normal">(Covered)</span>}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Bottom Funding Progress & Action Buttons */}
      <div className="p-5 pt-3">
        {/* Progress Bar */}
        <div className="space-y-1.5 mb-4">
          <div className="flex items-center justify-between text-xs">
            <span className="font-mono text-slate-900 font-bold">
              ${student.amountRaised.toLocaleString()}{' '}
              <span className="text-slate-500 font-normal text-[11px]">raised of ${student.tuitionDue.toLocaleString()}</span>
            </span>
            <span className="font-mono text-xs font-bold text-blue-600">
              {percentRaised}%
            </span>
          </div>

          <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-blue-600 to-indigo-600 rounded-full transition-all duration-500"
              style={{ width: `${percentRaised}%` }}
            />
          </div>

          <div className="flex items-center justify-between text-[11px] text-slate-500 pt-0.5">
            <span>Deadline: {student.deadlineDate}</span>
            <span className="font-semibold text-rose-600 font-mono">
              ${remaining.toLocaleString()} remaining
            </span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="grid grid-cols-2 gap-2">
          <button
            onClick={() => onOpenSponsor(student)}
            className="w-full py-2.5 px-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs shadow-md shadow-blue-500/20 transition-all flex items-center justify-center gap-1.5"
          >
            <Lock className="w-3.5 h-3.5" />
            <span>Sponsor Escrow</span>
          </button>

          <button
            onClick={() => onOpenMessage(student)}
            className="w-full py-2.5 px-3 rounded-xl bg-slate-100 hover:bg-slate-200/80 text-slate-800 font-semibold text-xs border border-slate-200 transition-colors flex items-center justify-center gap-1.5"
          >
            <MessageSquare className="w-3.5 h-3.5 text-slate-500" />
            <span>Safe Message</span>
          </button>
        </div>
      </div>
    </div>
  );
};
