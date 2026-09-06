import React, { useState, useMemo } from 'react';
import { 
  Search, 
  Filter, 
  ShieldCheck, 
  Clock, 
  Sparkles, 
  SlidersHorizontal, 
  CheckCircle2, 
  GraduationCap, 
  ArrowUpDown,
  Lock,
  Flame
} from 'lucide-react';
import { Student, AcademicCategory } from '../types';
import { StudentCard } from './StudentCard';

interface StudentDiscoveryProps {
  students: Student[];
  onOpenSponsor: (student: Student) => void;
  onOpenVerification: (student: Student) => void;
  onOpenMessage: (student: Student) => void;
}

export const StudentDiscovery: React.FC<StudentDiscoveryProps> = ({
  students,
  onOpenSponsor,
  onOpenVerification,
  onOpenMessage,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<AcademicCategory | 'ALL'>('ALL');
  const [urgentOnly, setUrgentOnly] = useState(false);
  const [firstGenOnly, setFirstGenOnly] = useState(false);
  const [sortBy, setSortBy] = useState<'urgency' | 'remaining' | 'percent' | 'gpa'>('urgency');

  const categories: { label: string; value: AcademicCategory | 'ALL' }[] = [
    { label: 'All Verified', value: 'ALL' },
    { label: 'STEM & Robotics', value: 'STEM' },
    { label: 'Medicine & Health', value: 'Medicine' },
    { label: 'Arts & Design', value: 'Arts' },
    { label: 'Law & Justice', value: 'Law' },
    { label: 'Business & Econ', value: 'Business' },
    { label: 'Humanities', value: 'Humanities' },
  ];

  const filteredStudents = useMemo(() => {
    return students
      .filter((s) => {
        // Search query filter
        if (searchQuery.trim()) {
          const q = searchQuery.toLowerCase();
          const matchName = s.name.toLowerCase().includes(q);
          const matchUniv = s.university.toLowerCase().includes(q);
          const matchMajor = s.major.toLowerCase().includes(q);
          const matchStory = s.story.toLowerCase().includes(q);
          if (!matchName && !matchUniv && !matchMajor && !matchStory) return false;
        }

        // Category filter
        if (selectedCategory !== 'ALL' && s.category !== selectedCategory) {
          return false;
        }

        // Urgency filter
        if (urgentOnly && s.daysRemaining > 7) {
          return false;
        }

        // First Gen filter
        if (firstGenOnly && !s.firstGen) {
          return false;
        }

        return true;
      })
      .sort((a, b) => {
        if (sortBy === 'urgency') return a.daysRemaining - b.daysRemaining;
        if (sortBy === 'remaining') {
          const remA = a.tuitionDue - a.amountRaised;
          const remB = b.tuitionDue - b.amountRaised;
          return remB - remA;
        }
        if (sortBy === 'percent') {
          const pctA = a.amountRaised / a.tuitionDue;
          const pctB = b.amountRaised / b.tuitionDue;
          return pctB - pctA;
        }
        if (sortBy === 'gpa') return b.gpa - a.gpa;
        return 0;
      });
  }, [students, searchQuery, selectedCategory, urgentOnly, firstGenOnly, sortBy]);

  // Aggregate stats
  const totalDue = students.reduce((acc, s) => acc + s.tuitionDue, 0);
  const totalRaised = students.reduce((acc, s) => acc + s.amountRaised, 0);
  const urgentCount = students.filter((s) => s.daysRemaining <= 7).length;

  return (
    <div className="space-y-6">
      {/* Hero Header with Escrow Callout */}
      <div className="bg-gradient-to-br from-slate-900 via-blue-950 to-indigo-950 text-white rounded-3xl p-6 sm:p-8 relative overflow-hidden border border-slate-800 shadow-xl">
        <div className="absolute -right-12 -bottom-12 w-64 h-64 rounded-full bg-blue-500/10 blur-3xl pointer-events-none"></div>

        <div className="relative z-10 max-w-3xl space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-semibold border border-emerald-400/30">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span>Title IV Compliant Direct Bursar Escrow</span>
          </div>

          <h1 className="text-2xl sm:text-4xl font-extrabold font-display tracking-tight text-white">
            Discover Verified Scholars. <br className="hidden sm:inline" />
            Fund Tuition Directly to University Bursars.
          </h1>

          <p className="text-sm text-slate-300 max-w-2xl leading-relaxed">
            Every dollar is authenticated through our <strong>3-Step Protocol</strong> (Biometric ID Check, Document AI Registrar OCR, and School Official Sign-Off). Funds never flow to personal accounts—they wire directly to accredited college bursars to clear tuition balances before deregistration deadlines.
          </p>

          {/* Quick Metrics Bar */}
          <div className="pt-4 grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div className="p-3 rounded-xl bg-white/5 border border-white/10 backdrop-blur-sm">
              <span className="text-[11px] text-slate-400 block font-medium">Bursar Escrow Protected</span>
              <span className="text-xl font-bold font-mono text-emerald-400">100%</span>
            </div>
            <div className="p-3 rounded-xl bg-white/5 border border-white/10 backdrop-blur-sm">
              <span className="text-[11px] text-slate-400 block font-medium">Under Deregistration Risk</span>
              <span className="text-xl font-bold font-mono text-rose-400">{urgentCount} Students</span>
            </div>
            <div className="p-3 rounded-xl bg-white/5 border border-white/10 backdrop-blur-sm">
              <span className="text-[11px] text-slate-400 block font-medium">Avg Verification Accuracy</span>
              <span className="text-xl font-bold font-mono text-blue-300">99.6%</span>
            </div>
            <div className="p-3 rounded-xl bg-white/5 border border-white/10 backdrop-blur-sm">
              <span className="text-[11px] text-slate-400 block font-medium">Direct Institutional ACH</span>
              <span className="text-xl font-bold font-mono text-white">Instant Wire</span>
            </div>
          </div>
        </div>
      </div>

      {/* Search & Category Filter Controls */}
      <div className="bg-white rounded-2xl p-4 sm:p-5 border border-slate-200 shadow-sm space-y-4">
        {/* Search Bar + Sort Dropdown */}
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search by student name, major (Biomedical, Law, Design), university..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 bg-slate-50 hover:bg-slate-100/60 focus:bg-white border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-semibold text-slate-400 hover:text-slate-600"
              >
                Clear
              </button>
            )}
          </div>

          <div className="flex items-center gap-2">
            <div className="relative flex items-center bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-700">
              <ArrowUpDown className="w-3.5 h-3.5 text-slate-400 mr-2" />
              <span className="text-slate-400 mr-1.5 hidden sm:inline">Sort:</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="bg-transparent font-semibold text-slate-800 focus:outline-none cursor-pointer"
              >
                <option value="urgency">Urgency (Days Left)</option>
                <option value="remaining">Highest Need ($ Gap)</option>
                <option value="percent">Closest to 100%</option>
                <option value="gpa">Highest Verified GPA</option>
              </select>
            </div>
          </div>
        </div>

        {/* Category Filter Pills (Requirement 1: STEM / Medicine / Arts filters) */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 text-xs no-scrollbar">
          {categories.map((cat) => (
            <button
              key={cat.value}
              onClick={() => setSelectedCategory(cat.value)}
              className={`px-3.5 py-1.5 rounded-xl font-semibold whitespace-nowrap transition-all ${
                selectedCategory === cat.value
                  ? 'bg-blue-600 text-white shadow-sm shadow-blue-500/20'
                  : 'bg-slate-100/80 hover:bg-slate-200/80 text-slate-700 border border-slate-200'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Secondary Toggles (Urgency & First-Gen) */}
        <div className="pt-2 border-t border-slate-100 flex flex-wrap items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-4">
            <label className="flex items-center gap-2 cursor-pointer select-none">
              <input
                type="checkbox"
                checked={urgentOnly}
                onChange={(e) => setUrgentOnly(e.target.checked)}
                className="rounded text-rose-600 focus:ring-rose-500 h-4 w-4"
              />
              <span className="font-semibold text-slate-700 flex items-center gap-1">
                <Flame className="w-3.5 h-3.5 text-rose-500" />
                Urgent Deregistration Risks Only (&le; 7 days)
              </span>
            </label>

            <label className="flex items-center gap-2 cursor-pointer select-none">
              <input
                type="checkbox"
                checked={firstGenOnly}
                onChange={(e) => setFirstGenOnly(e.target.checked)}
                className="rounded text-blue-600 focus:ring-blue-500 h-4 w-4"
              />
              <span className="font-semibold text-slate-700">
                First-Generation College Students
              </span>
            </label>
          </div>

          <span className="text-slate-500 font-mono text-[11px]">
            Showing <strong className="text-slate-900">{filteredStudents.length}</strong> of {students.length} verified scholars
          </span>
        </div>
      </div>

      {/* Students Grid */}
      {filteredStudents.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredStudents.map((student) => (
            <StudentCard
              key={student.id}
              student={student}
              onOpenSponsor={onOpenSponsor}
              onOpenVerification={onOpenVerification}
              onOpenMessage={onOpenMessage}
            />
          ))}
        </div>
      ) : (
        <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center space-y-3">
          <div className="w-12 h-12 rounded-full bg-slate-100 text-slate-400 flex items-center justify-center mx-auto">
            <Search className="w-6 h-6" />
          </div>
          <h3 className="font-bold text-slate-800 text-base">No matching verified students found</h3>
          <p className="text-xs text-slate-500 max-w-sm mx-auto">
            Try resetting your search filter or selecting 'All Verified' to explore scholars across all academic disciplines.
          </p>
          <button
            onClick={() => {
              setSearchQuery('');
              setSelectedCategory('ALL');
              setUrgentOnly(false);
              setFirstGenOnly(false);
            }}
            className="px-4 py-2 bg-blue-50 hover:bg-blue-100 text-blue-700 text-xs font-semibold rounded-lg transition-colors"
          >
            Reset Filters
          </button>
        </div>
      )}
    </div>
  );
};
