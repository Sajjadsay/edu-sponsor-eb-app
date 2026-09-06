import React, { useState, useMemo } from 'react';
import { 
  X, 
  ShieldCheck, 
  Send, 
  AlertTriangle, 
  Lock, 
  Sparkles, 
  Eye, 
  CheckCircle2,
  Info
} from 'lucide-react';
import { Student, SponsorMessage } from '../types';
import { scanAndScreenPII } from '../lib/piiScanner';

interface ModeratedMessagingModalProps {
  student: Student | null;
  onClose: () => void;
  onSendMessage: (studentId: string, message: SponsorMessage) => void;
}

export const ModeratedMessagingModal: React.FC<ModeratedMessagingModalProps> = ({
  student,
  onClose,
  onSendMessage,
}) => {
  if (!student) return null;

  const [messageText, setMessageText] = useState('');
  const [senderName, setSenderName] = useState('Alexandra Vance');
  const [senderRole, setSenderRole] = useState<'Individual Sponsor' | 'Corporate CSR Officer' | 'Alumni Mentor'>('Individual Sponsor');
  const [isSentSuccess, setIsSentSuccess] = useState(false);

  // Real-time PII scan
  const scanResult = useMemo(() => {
    return scanAndScreenPII(messageText);
  }, [messageText]);

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!messageText.trim()) return;

    const newMsg: SponsorMessage = {
      id: `msg-${Date.now().toString().slice(-5)}`,
      studentId: student.id,
      senderName: senderName.trim() || 'Verified Sponsor',
      senderRole,
      content: messageText,
      screenedContent: scanResult.screenedText,
      piiDetected: scanResult.hasPII,
      piiFlags: scanResult.flags,
      timestamp: 'Just now',
      moderationStatus: scanResult.hasPII ? 'Redacted & Delivered' : 'Approved'
    };

    onSendMessage(student.id, newMsg);
    setIsSentSuccess(true);
    setTimeout(() => {
      setIsSentSuccess(false);
      onClose();
    }, 1200);
  };

  const sampleTestPrompts = [
    {
      label: 'Safe Mentorship Message',
      text: 'Amina, your engineering research is inspiring! Keep pushing forward; we are honored to support your bursar account.',
    },
    {
      label: 'Contains Phone & Email (PII)',
      text: 'Call me at 415-555-0199 or email me at mentor.vance@gmail.com so we can discuss internship opportunities.',
    },
    {
      label: 'Direct Payment Handle Violation',
      text: 'Do you have $CashApp or @venmo? I want to send you an extra $500 directly instead of using bursar escrow.',
    }
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm overflow-y-auto">
      <div className="relative w-full max-w-2xl bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden my-6 animate-in fade-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="bg-slate-900 text-white p-6 relative">
          <button
            onClick={onClose}
            className="absolute top-5 right-5 w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors text-slate-300 hover:text-white"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="flex items-center gap-2 mb-2">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
              Active PII Screening Firewall
            </span>
            <span className="text-xs text-slate-400">
              Direct Student-Sponsor Channel
            </span>
          </div>

          <h2 className="text-xl font-bold font-display text-white">
            Send Moderated Note to {student.name}
          </h2>
          <p className="text-xs text-slate-300 mt-1">
            {student.university} • {student.major}
          </p>
        </div>

        {/* Content */}
        <form onSubmit={handleSend} className="p-6 space-y-5 max-h-[75vh] overflow-y-auto">
          {/* Trust Banner */}
          <div className="p-3.5 rounded-xl bg-blue-50/80 border border-blue-200 text-xs text-blue-900 space-y-1">
            <div className="flex items-center gap-1.5 font-bold">
              <Lock className="w-3.5 h-3.5 text-blue-700" />
              <span>FERPA & Student Privacy Compliance Guard</span>
            </div>
            <p className="text-[11px] text-blue-800 leading-relaxed">
              All messages are scanned for Personally Identifiable Information (phone numbers, personal emails, social media links, and direct cash handles). This shields student privacy and prevents fraudulent circumventing of institutional bursar escrow.
            </p>
          </div>

          {/* Interactive Test Prompts */}
          <div className="space-y-1.5">
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block">
              Quick Test Scenarios (Click to test PII filter):
            </span>
            <div className="flex flex-wrap gap-2">
              {sampleTestPrompts.map((p, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => setMessageText(p.text)}
                  className="px-2.5 py-1 rounded-lg text-xs bg-slate-100 hover:bg-slate-200/70 text-slate-700 border border-slate-200 transition-colors"
                >
                  {p.label}
                </button>
              ))}
            </div>
          </div>

          {/* Sender Details */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
            <div>
              <label className="font-bold text-slate-700 block mb-1">Your Sender Name</label>
              <input
                type="text"
                value={senderName}
                onChange={(e) => setSenderName(e.target.value)}
                className="w-full px-3 py-2 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="e.g. Dr. Jordan Vance"
                required
              />
            </div>
            <div>
              <label className="font-bold text-slate-700 block mb-1">Sender Role</label>
              <select
                value={senderRole}
                onChange={(e) => setSenderRole(e.target.value as any)}
                className="w-full px-3 py-2 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
              >
                <option value="Individual Sponsor">Individual Sponsor</option>
                <option value="Corporate CSR Officer">Corporate CSR Officer</option>
                <option value="Alumni Mentor">Alumni Mentor</option>
              </select>
            </div>
          </div>

          {/* Message Input Box */}
          <div className="space-y-1.5">
            <div className="flex items-center justify-between text-xs">
              <label className="font-bold text-slate-800">
                Your Words of Encouragement & Support
              </label>
              <span className="text-[11px] text-slate-400 font-mono">
                {messageText.length} characters
              </span>
            </div>

            <textarea
              rows={4}
              value={messageText}
              onChange={(e) => setMessageText(e.target.value)}
              placeholder="Write a message of congratulations, encouragement, or professional mentorship..."
              className="w-full p-3 text-xs border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 font-sans"
              required
            />
          </div>

          {/* PII SCAN RESULT BANNER */}
          {scanResult.hasPII && (
            <div className="p-4 rounded-xl bg-amber-50 border border-amber-300 text-amber-900 space-y-2 animate-in fade-in duration-150">
              <div className="flex items-center gap-2">
                <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0" />
                <h4 className="text-xs font-bold">
                  PII Shield Activated: {scanResult.flags.join(', ')} Detected
                </h4>
              </div>

              <p className="text-[11px] text-amber-800 leading-relaxed">
                {scanResult.securityNotice}
              </p>

              <div className="space-y-1 pt-1">
                <span className="text-[10px] font-bold uppercase tracking-wider text-amber-700 block">
                  Violations Filtered for Student Protection:
                </span>
                {scanResult.violations.map((v, i) => (
                  <div key={i} className="text-[11px] bg-white/70 p-2 rounded border border-amber-200 flex items-start gap-2">
                    <span className="px-1.5 py-0.5 rounded text-[10px] font-bold bg-amber-200 text-amber-900 shrink-0">
                      {v.type}
                    </span>
                    <span className="font-mono text-amber-950 font-semibold">{v.original}</span>
                    <span className="text-slate-500 ml-auto hidden sm:inline text-[10px]">{v.reason}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Real-time Screened Preview */}
          <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 space-y-1 text-xs">
            <span className="font-bold text-slate-500 uppercase tracking-wider text-[10px] block flex items-center gap-1">
              <Eye className="w-3.5 h-3.5" />
              <span>What {student.name} Will Receive:</span>
            </span>
            <p className="text-slate-800 italic bg-white p-3 rounded-lg border border-slate-100 min-h-[48px]">
              {scanResult.screenedText || <span className="text-slate-400 not-italic">Start typing above to preview screened message...</span>}
            </p>
          </div>

          {/* Footer Buttons */}
          <div className="pt-2 flex items-center justify-between border-t border-slate-100">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-xs font-semibold text-slate-600 hover:text-slate-900"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={!messageText.trim() || isSentSuccess}
              className="px-5 py-2.5 bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white text-xs font-bold rounded-xl shadow-md shadow-blue-500/20 transition-all flex items-center gap-2"
            >
              {isSentSuccess ? (
                <>
                  <CheckCircle2 className="w-4 h-4 text-emerald-300" />
                  <span>Screened & Delivered!</span>
                </>
              ) : (
                <>
                  <Send className="w-3.5 h-3.5" />
                  <span>Send Shielded Message</span>
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
