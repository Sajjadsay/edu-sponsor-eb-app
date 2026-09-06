import React, { useState } from 'react';
import { 
  FileText, 
  UploadCloud, 
  CheckCircle2, 
  Lock, 
  ShieldCheck, 
  GraduationCap, 
  DollarSign, 
  Calendar, 
  AlertCircle, 
  Sparkles, 
  BookOpen, 
  Inbox, 
  Building2,
  FileCheck,
  ChevronRight,
  ArrowRight
} from 'lucide-react';
import { Student, AcademicCategory, GradeItem } from '../types';

interface StudentPortalProps {
  students: Student[];
  onAddNewStudent: (newStudent: Student) => void;
  onOpenMessage: (student: Student) => void;
}

export const StudentPortal: React.FC<StudentPortalProps> = ({
  students,
  onAddNewStudent,
  onOpenMessage,
}) => {
  const [activePortalView, setActivePortalView] = useState<'apply' | 'dashboard'>('dashboard');
  const [selectedStudentId, setSelectedStudentId] = useState<string>(students[0]?.id || '');

  // Form states for application
  const [fullName, setFullName] = useState('');
  const [university, setUniversity] = useState('');
  const [studentIdNumber, setStudentIdNumber] = useState('');
  const [major, setMajor] = useState('');
  const [category, setCategory] = useState<AcademicCategory>('STEM');
  const [gpa, setGpa] = useState('3.85');
  const [tuitionDue, setTuitionDue] = useState('5200');
  const [deadlineDays, setDeadlineDays] = useState('5');
  const [bursarOffice, setBursarOffice] = useState('');
  const [story, setStory] = useState('');
  const [firstGen, setFirstGen] = useState(true);

  // File upload simulation states
  const [idFileUploaded, setIdFileUploaded] = useState(false);
  const [statementUploaded, setStatementUploaded] = useState(false);
  const [transcriptUploaded, setTranscriptUploaded] = useState(false);
  const [isAnalyzingAi, setIsAnalyzingAi] = useState(false);
  const [aiVerifiedBadge, setAiVerifiedBadge] = useState(false);

  // Grade upload modal in dashboard
  const [showGradeUpload, setShowGradeUpload] = useState(false);
  const [newCourseCode, setNewCourseCode] = useState('');
  const [newCourseTitle, setNewCourseTitle] = useState('');
  const [newCourseCredits, setNewCourseCredits] = useState('4');
  const [newCourseGrade, setNewCourseGrade] = useState('A');
  const [newCourseTerm, setNewCourseTerm] = useState('Fall 2026');

  const currentStudent = students.find((s) => s.id === selectedStudentId) || students[0];

  const handleSimulateDocumentAi = () => {
    setIsAnalyzingAi(true);
    setTimeout(() => {
      setIsAnalyzingAi(false);
      setAiVerifiedBadge(true);
      setIdFileUploaded(true);
      setStatementUploaded(true);
      setTranscriptUploaded(true);
    }, 1200);
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName || !university || !tuitionDue) return;

    const parsedDue = parseFloat(tuitionDue) || 4500;
    const parsedGpa = parseFloat(gpa) || 3.8;
    const days = parseInt(deadlineDays) || 6;

    const newStudent: Student = {
      id: `stu-${Date.now().toString().slice(-4)}`,
      name: fullName,
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&auto=format&fit=crop&q=80',
      university,
      schoolLogo: 'https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=120&auto=format&fit=crop&q=80',
      major,
      category,
      year: 'Junior (Year 3)',
      gpa: parsedGpa,
      firstGen,
      tuitionDue: parsedDue,
      amountRaised: 0,
      urgencyBadge: days <= 3 ? 'Tuition Due in 3 Days' : days <= 7 ? 'Tuition Due in 7 Days' : 'Immediate Deregistration Risk',
      daysRemaining: days,
      deadlineDate: new Date(Date.now() + days * 86400000).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }),
      itemizedCosts: [
        { item: 'Bursar Base Semester Tuition', amount: Math.round(parsedDue * 0.75), covered: false },
        { item: 'Lab Fee & Technology Assessment', amount: Math.round(parsedDue * 0.25), covered: false },
      ],
      story: story || 'Undergraduate student seeking emergency bursar assistance to maintain continuous enrollment.',
      academicHonors: ['Dean’s Honor List', 'Verified Applicant'],
      verification: {
        idCheck: {
          verified: true,
          timestamp: new Date().toISOString(),
          method: 'GovID Biometric Match (NFC Passport + Live Face Scan)',
          hash: `0x${Math.random().toString(16).substring(2, 42)}`,
          details: 'Digital identity validated via institutional identity engine.'
        },
        documentAiCheck: {
          verified: true,
          timestamp: new Date().toISOString(),
          method: 'Document AI Registrar Ingestion & Seal Verification Engine',
          hash: `0x${Math.random().toString(16).substring(2, 42)}`,
          details: `Invoice matched university bursar records. GPA ${parsedGpa} extracted directly from official transcript.`,
          documentType: 'Official Student Account Statement & Degree Audit',
          confidenceScore: 99.5,
          extractedGpa: parsedGpa,
          termVerified: 'Current Academic Term',
          registrarSealDetected: true
        },
        schoolSignOff: {
          verified: true,
          timestamp: new Date().toISOString(),
          method: 'Institutional Bursar & Financial Aid Officer Cryptographic Sign-Off',
          hash: `0x${Math.random().toString(16).substring(2, 42)}`,
          details: 'Direct registrar office sign-off received.',
          officialName: 'Registrar Staff Operations',
          officialTitle: 'Bursar Student Aid Division',
          institutionalEmail: `bursar@${university.toLowerCase().replace(/[^a-z]/g, '')}.edu`,
          signOffId: `BUR-ONBOARD-${Date.now().toString().slice(-4)}`,
          phoneExtension: 'x5000'
        }
      },
      bursarEscrow: {
        institutionName: university,
        bursarOffice: bursarOffice || `Bursar’s Office - ${university}`,
        studentIdNumber: studentIdNumber || `STU-${Math.floor(1000000 + Math.random() * 9000000)}`,
        escrowRoutingRef: `ESC-${university.substring(0, 4).toUpperCase()}-${Math.floor(1000 + Math.random() * 9000)}-ACH`,
        escrowStatus: 'Locked & Verified',
        depositAccountType: 'Direct Clearinghouse Automated ACH (Title IV Compliant)',
        verificationDate: new Date().toLocaleDateString()
      },
      gradeReports: [
        { term: 'Current Term', courseCode: 'ACAD 301', courseTitle: major || 'Core Foundations', credits: 4, grade: 'A', status: 'Completed' }
      ],
      messages: []
    };

    onAddNewStudent(newStudent);
    setSelectedStudentId(newStudent.id);
    setActivePortalView('dashboard');
    alert('Application and Grade Report verified via Document AI! Your profile is now live in the Direct Bursar Escrow Discovery.');
  };

  const handleAddGradeReport = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCourseCode || !newCourseTitle || !currentStudent) return;

    const newGrade: GradeItem = {
      term: newCourseTerm,
      courseCode: newCourseCode,
      courseTitle: newCourseTitle,
      credits: parseFloat(newCourseCredits) || 3,
      grade: newCourseGrade,
      status: 'Completed'
    };

    currentStudent.gradeReports.unshift(newGrade);
    setShowGradeUpload(false);
    setNewCourseCode('');
    setNewCourseTitle('');
    alert(`Grade report for ${newGrade.courseCode} added and cryptographically verified!`);
  };

  return (
    <div className="space-y-6">
      {/* Top Selector Banner */}
      <div className="bg-white rounded-2xl p-4 sm:p-5 border border-slate-200 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold font-display text-slate-900 flex items-center gap-2">
            <GraduationCap className="w-5 h-5 text-blue-600" />
            <span>Student Application & Academic Grade Report Portal</span>
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Submit tuition funding applications, upload certified grade reports, and track direct-to-bursar escrow disbursements.
          </p>
        </div>

        <div className="flex items-center gap-2 bg-slate-100 p-1 rounded-xl">
          <button
            onClick={() => setActivePortalView('dashboard')}
            className={`px-3.5 py-1.5 text-xs font-semibold rounded-lg transition-all ${
              activePortalView === 'dashboard'
                ? 'bg-white text-blue-700 shadow-sm'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            My Active Dashboard
          </button>
          <button
            onClick={() => setActivePortalView('apply')}
            className={`px-3.5 py-1.5 text-xs font-semibold rounded-lg transition-all ${
              activePortalView === 'apply'
                ? 'bg-white text-blue-700 shadow-sm'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            New Application & AI Audit
          </button>
        </div>
      </div>

      {/* VIEW 1: MY ACTIVE DASHBOARD */}
      {activePortalView === 'dashboard' && currentStudent && (
        <div className="space-y-6">
          {/* Active Student Switcher */}
          <div className="flex items-center justify-between bg-slate-50 p-3 rounded-xl border border-slate-200 text-xs">
            <span className="font-semibold text-slate-700">Select Active Student Profile:</span>
            <select
              value={selectedStudentId}
              onChange={(e) => setSelectedStudentId(e.target.value)}
              className="bg-white border border-slate-300 rounded-lg px-3 py-1.5 font-bold text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer"
            >
              {students.map((stu) => (
                <option key={stu.id} value={stu.id}>
                  {stu.name} — {stu.university} ({stu.bursarEscrow.studentIdNumber})
                </option>
              ))}
            </select>
          </div>

          {/* Student Status Header Card */}
          <div className="bg-gradient-to-r from-blue-900 via-indigo-900 to-slate-900 text-white rounded-2xl p-6 shadow-md relative overflow-hidden">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 relative z-10">
              <div className="flex items-start gap-4">
                <img
                  src={currentStudent.avatar}
                  alt={currentStudent.name}
                  className="w-20 h-20 rounded-2xl object-cover border-2 border-white/20 shadow-md shrink-0"
                  referrerPolicy="no-referrer"
                />
                <div>
                  <div className="flex items-center gap-2 flex-wrap">
                    <h3 className="text-2xl font-bold font-display text-white">{currentStudent.name}</h3>
                    <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-500/20 text-emerald-300 border border-emerald-400/30">
                      Active Campaign
                    </span>
                  </div>
                  <p className="text-sm text-blue-200 mt-1">
                    {currentStudent.university} • {currentStudent.major}
                  </p>
                  <p className="text-xs text-slate-300 font-mono mt-1">
                    Student Bursar ID: {currentStudent.bursarEscrow.studentIdNumber} • Escrow Ref: {currentStudent.bursarEscrow.escrowRoutingRef}
                  </p>
                </div>
              </div>

              {/* Escrow Status Badge & Quick Stats */}
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 bg-white/10 backdrop-blur-md p-4 rounded-xl border border-white/15">
                <div className="space-y-0.5">
                  <span className="text-[11px] text-blue-200 block uppercase font-mono">Bursar Escrow Balance</span>
                  <span className="text-2xl font-bold font-mono text-emerald-400">
                    ${currentStudent.amountRaised.toLocaleString()}
                  </span>
                  <span className="text-[11px] text-slate-300 block">
                    Target: ${currentStudent.tuitionDue.toLocaleString()} ({Math.round((currentStudent.amountRaised / currentStudent.tuitionDue) * 100)}% Funded)
                  </span>
                </div>

                <div className="h-10 w-px bg-white/20 hidden sm:block"></div>

                <div className="space-y-1">
                  <span className="inline-flex items-center gap-1 text-xs font-bold text-emerald-300">
                    <Lock className="w-3.5 h-3.5" />
                    Direct Clearinghouse Active
                  </span>
                  <p className="text-[11px] text-slate-300 max-w-[200px]">
                    Automatic remittance triggers when deadline is reached or goal is satisfied.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Two-Column Layout: Grade Reports & Sponsor Communications */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Left 2 Cols: Grade Reports & Document AI Verification Trail */}
            <div className="lg:col-span-2 space-y-6">
              <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="text-base font-bold font-display text-slate-900 flex items-center gap-2">
                      <BookOpen className="w-5 h-5 text-indigo-600" />
                      <span>Certified Academic Grade Reports & GPA Audit</span>
                    </h4>
                    <p className="text-xs text-slate-500 mt-0.5">
                      Ongoing grade reports are required to release programmatic corporate CSR grants and escrow disbursements.
                    </p>
                  </div>

                  <button
                    onClick={() => setShowGradeUpload(true)}
                    className="px-3 py-1.5 bg-indigo-50 hover:bg-indigo-100 text-indigo-700 text-xs font-bold rounded-lg border border-indigo-200 transition-colors flex items-center gap-1.5"
                  >
                    <UploadCloud className="w-3.5 h-3.5" />
                    <span>Upload New Grade Report</span>
                  </button>
                </div>

                {/* Grade Table */}
                <div className="overflow-x-auto rounded-xl border border-slate-200">
                  <table className="w-full text-left text-xs">
                    <thead className="bg-slate-50 text-slate-600 uppercase text-[10px] font-bold">
                      <tr>
                        <th className="py-3 px-3.5">Academic Term</th>
                        <th className="py-3 px-3.5">Course Code & Description</th>
                        <th className="py-3 px-3.5">Credits</th>
                        <th className="py-3 px-3.5">Official Grade</th>
                        <th className="py-3 px-3.5">Verification</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {currentStudent.gradeReports.map((grade, idx) => (
                        <tr key={idx} className="hover:bg-slate-50/50">
                          <td className="py-2.5 px-3.5 font-mono text-slate-500 font-semibold">{grade.term}</td>
                          <td className="py-2.5 px-3.5">
                            <span className="font-bold text-slate-900">{grade.courseCode}</span>
                            <span className="text-slate-600 ml-2">{grade.courseTitle}</span>
                          </td>
                          <td className="py-2.5 px-3.5 font-mono text-slate-700">{grade.credits}</td>
                          <td className="py-2.5 px-3.5">
                            <span className="font-display font-extrabold text-slate-900 text-sm">{grade.grade}</span>
                          </td>
                          <td className="py-2.5 px-3.5">
                            <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                              <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                              Doc AI Verified
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {/* Add Grade Modal */}
                {showGradeUpload && (
                  <form onSubmit={handleAddGradeReport} className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-3">
                    <h5 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
                      Submit Verified Term Grade
                    </h5>
                    <div className="grid grid-cols-1 sm:grid-cols-4 gap-2 text-xs">
                      <div>
                        <label className="text-[10px] text-slate-500 block">Term</label>
                        <input
                          type="text"
                          value={newCourseTerm}
                          onChange={(e) => setNewCourseTerm(e.target.value)}
                          className="w-full px-2.5 py-1.5 border border-slate-300 rounded-lg text-xs"
                          placeholder="e.g. Fall 2026"
                          required
                        />
                      </div>
                      <div>
                        <label className="text-[10px] text-slate-500 block">Course Code</label>
                        <input
                          type="text"
                          value={newCourseCode}
                          onChange={(e) => setNewCourseCode(e.target.value)}
                          className="w-full px-2.5 py-1.5 border border-slate-300 rounded-lg text-xs"
                          placeholder="e.g. ENGR 401"
                          required
                        />
                      </div>
                      <div className="sm:col-span-2">
                        <label className="text-[10px] text-slate-500 block">Course Title</label>
                        <input
                          type="text"
                          value={newCourseTitle}
                          onChange={(e) => setNewCourseTitle(e.target.value)}
                          className="w-full px-2.5 py-1.5 border border-slate-300 rounded-lg text-xs"
                          placeholder="e.g. Advanced Bio-Mechanics Capstone"
                          required
                        />
                      </div>
                    </div>
                    <div className="flex items-center justify-between pt-2">
                      <div className="flex items-center gap-3 text-xs">
                        <div>
                          <label className="text-[10px] text-slate-500 mr-1.5">Grade:</label>
                          <select
                            value={newCourseGrade}
                            onChange={(e) => setNewCourseGrade(e.target.value)}
                            className="border border-slate-300 rounded px-2 py-1 text-xs font-bold"
                          >
                            <option value="A">A (4.0)</option>
                            <option value="A-">A- (3.7)</option>
                            <option value="B+">B+ (3.3)</option>
                            <option value="B">B (3.0)</option>
                            <option value="Honors">Honors Pass</option>
                          </select>
                        </div>
                        <div>
                          <label className="text-[10px] text-slate-500 mr-1.5">Credits:</label>
                          <input
                            type="number"
                            value={newCourseCredits}
                            onChange={(e) => setNewCourseCredits(e.target.value)}
                            className="w-16 border border-slate-300 rounded px-2 py-1 text-xs"
                            min="1"
                            max="12"
                          />
                        </div>
                      </div>

                      <div className="flex items-center gap-2">
                        <button
                          type="button"
                          onClick={() => setShowGradeUpload(false)}
                          className="px-3 py-1.5 text-xs text-slate-500 hover:text-slate-800"
                        >
                          Cancel
                        </button>
                        <button
                          type="submit"
                          className="px-4 py-1.5 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold rounded-lg transition-colors"
                        >
                          Verify & Record Grade
                        </button>
                      </div>
                    </div>
                  </form>
                )}
              </div>
            </div>

            {/* Right Column: Safe Sponsor Messages */}
            <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm space-y-4">
              <div className="flex items-center justify-between">
                <h4 className="text-sm font-bold font-display text-slate-900 flex items-center gap-2">
                  <Inbox className="w-4 h-4 text-blue-600" />
                  <span>Sponsor Mailbox</span>
                </h4>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
                  PII Shielded
                </span>
              </div>

              <p className="text-xs text-slate-500">
                Messages from donors & CSR mentors are screened in real-time to protect student privacy and preserve escrow safety.
              </p>

              {currentStudent.messages && currentStudent.messages.length > 0 ? (
                <div className="space-y-3">
                  {currentStudent.messages.map((msg) => (
                    <div key={msg.id} className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 space-y-2 text-xs">
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-slate-900">{msg.senderName}</span>
                        <span className="text-[10px] text-slate-400">{msg.timestamp}</span>
                      </div>
                      <span className="inline-block px-1.5 py-0.5 rounded text-[10px] bg-blue-50 text-blue-700 font-medium">
                        {msg.senderRole}
                      </span>
                      <p className="text-slate-700 leading-relaxed">
                        {msg.screenedContent}
                      </p>
                      {msg.piiDetected && (
                        <div className="text-[10px] text-amber-700 bg-amber-50 p-1.5 rounded border border-amber-200 flex items-center gap-1">
                          <ShieldCheck className="w-3 h-3 text-amber-600" />
                          <span>Personal contact redacted for privacy.</span>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              ) : (
                <div className="p-6 rounded-xl bg-slate-50 text-center text-xs text-slate-500 border border-slate-100">
                  <Inbox className="w-8 h-8 text-slate-300 mx-auto mb-2" />
                  <p>No messages received yet.</p>
                  <button
                    onClick={() => onOpenMessage(currentStudent)}
                    className="mt-3 px-3 py-1.5 bg-white border border-slate-300 rounded-lg text-xs font-semibold text-slate-700 hover:bg-slate-100 transition-colors"
                  >
                    Test Send a Safe Message
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* VIEW 2: NEW APPLICATION & AI AUDIT */}
      {activePortalView === 'apply' && (
        <form onSubmit={handleFormSubmit} className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-6">
          <div className="border-b border-slate-200 pb-4">
            <h3 className="text-xl font-bold font-display text-slate-900">
              Apply for Verified EduSponsor Direct Bursar Funding
            </h3>
            <p className="text-xs text-slate-500 mt-1 max-w-2xl">
              Complete your verification profile. Our Document AI engine ingests your student tuition ledger, calculates course loads, and matches university bursar clearing details within seconds.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div>
              <label className="font-bold text-slate-800 block mb-1">Full Legal Name</label>
              <input
                type="text"
                placeholder="e.g. Jordan Alexander Kim"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                className="w-full px-3 py-2 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            <div>
              <label className="font-bold text-slate-800 block mb-1">Accredited University / College</label>
              <input
                type="text"
                placeholder="e.g. Purdue University, Northwestern, UCLA"
                value={university}
                onChange={(e) => setUniversity(e.target.value)}
                className="w-full px-3 py-2 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            <div>
              <label className="font-bold text-slate-800 block mb-1">Institutional Student ID #</label>
              <input
                type="text"
                placeholder="e.g. PURDUE-9018420"
                value={studentIdNumber}
                onChange={(e) => setStudentIdNumber(e.target.value)}
                className="w-full px-3 py-2 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 font-mono"
                required
              />
            </div>

            <div>
              <label className="font-bold text-slate-800 block mb-1">Academic Discipline Category</label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value as AcademicCategory)}
                className="w-full px-3 py-2 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
              >
                <option value="STEM">STEM & Engineering</option>
                <option value="Medicine">Medicine & Healthcare</option>
                <option value="Arts">Arts & Industrial Design</option>
                <option value="Law">Law & Legal Advocacy</option>
                <option value="Business">Business & Economics</option>
                <option value="Humanities">Humanities & Social Sciences</option>
              </select>
            </div>

            <div>
              <label className="font-bold text-slate-800 block mb-1">Degree Major & Program</label>
              <input
                type="text"
                placeholder="e.g. Chemical Engineering & Clean Energy"
                value={major}
                onChange={(e) => setMajor(e.target.value)}
                className="w-full px-3 py-2 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            <div>
              <label className="font-bold text-slate-800 block mb-1">Current Cumulative GPA</label>
              <input
                type="number"
                step="0.01"
                min="2.0"
                max="4.0"
                value={gpa}
                onChange={(e) => setGpa(e.target.value)}
                className="w-full px-3 py-2 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 font-mono"
                required
              />
            </div>

            <div>
              <label className="font-bold text-slate-800 block mb-1">Unfunded Bursar Tuition Due ($)</label>
              <input
                type="number"
                value={tuitionDue}
                onChange={(e) => setTuitionDue(e.target.value)}
                className="w-full px-3 py-2 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 font-mono"
                required
              />
            </div>

            <div>
              <label className="font-bold text-slate-800 block mb-1">Days Until Deregistration Deadline</label>
              <input
                type="number"
                value={deadlineDays}
                onChange={(e) => setDeadlineDays(e.target.value)}
                className="w-full px-3 py-2 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 font-mono"
                min="1"
                max="60"
                required
              />
            </div>
          </div>

          <div>
            <label className="font-bold text-slate-800 block mb-1 text-xs">University Bursar Office Details</label>
            <input
              type="text"
              placeholder="e.g. Office of the Bursar, Hovde Hall Room 108"
              value={bursarOffice}
              onChange={(e) => setBursarOffice(e.target.value)}
              className="w-full px-3 py-2 text-xs border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="font-bold text-slate-800 block mb-1 text-xs">Personal Narrative & Academic Aspiration</label>
            <textarea
              rows={3}
              placeholder="Describe your research, family background, academic goals, and why clearing this bursar gap is pivotal to staying enrolled..."
              value={story}
              onChange={(e) => setStory(e.target.value)}
              className="w-full px-3 py-2 text-xs border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <label className="flex items-center gap-2 text-xs cursor-pointer text-slate-700">
            <input
              type="checkbox"
              checked={firstGen}
              onChange={(e) => setFirstGen(e.target.checked)}
              className="rounded text-blue-600 focus:ring-blue-500 h-4 w-4"
            />
            <span className="font-semibold">I am a First-Generation College Student (Qualifies for Corporate CSR Diversity Grants)</span>
          </label>

          {/* Document AI Upload & OCR Simulation Box */}
          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider flex items-center gap-1.5">
                  <FileCheck className="w-4 h-4 text-indigo-600" />
                  <span>3-Step Protocol Document Ingestion</span>
                </h4>
                <p className="text-[11px] text-slate-500">
                  Upload Government ID, Tuition Billing Statement, and Certified Transcript for Document AI ingestion.
                </p>
              </div>

              <button
                type="button"
                onClick={handleSimulateDocumentAi}
                disabled={isAnalyzingAi || aiVerifiedBadge}
                className="px-3 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 text-white text-xs font-bold transition-colors flex items-center gap-1.5 shadow-sm"
              >
                {isAnalyzingAi ? (
                  <>
                    <span className="w-3 h-3 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
                    <span>Document AI Parsing...</span>
                  </>
                ) : aiVerifiedBadge ? (
                  <>
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-300" />
                    <span>Audit Passed (99.5%)</span>
                  </>
                ) : (
                  <>
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>Run Instant AI Audit</span>
                  </>
                )}
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
              <div className={`p-3 rounded-lg border text-center transition-all ${idFileUploaded ? 'bg-emerald-50 border-emerald-200 text-emerald-800' : 'bg-white border-dashed border-slate-300 text-slate-500'}`}>
                <FileText className="w-5 h-5 mx-auto mb-1 text-slate-400" />
                <span className="block font-bold">1. GovID Scan</span>
                <span className="text-[10px] block text-slate-500">{idFileUploaded ? 'Biometrics Verified' : 'Click "Run Instant AI Audit"'}</span>
              </div>
              <div className={`p-3 rounded-lg border text-center transition-all ${statementUploaded ? 'bg-emerald-50 border-emerald-200 text-emerald-800' : 'bg-white border-dashed border-slate-300 text-slate-500'}`}>
                <FileText className="w-5 h-5 mx-auto mb-1 text-slate-400" />
                <span className="block font-bold">2. Tuition Statement</span>
                <span className="text-[10px] block text-slate-500">{statementUploaded ? 'Bursar Ledger Matched' : 'Click "Run Instant AI Audit"'}</span>
              </div>
              <div className={`p-3 rounded-lg border text-center transition-all ${transcriptUploaded ? 'bg-emerald-50 border-emerald-200 text-emerald-800' : 'bg-white border-dashed border-slate-300 text-slate-500'}`}>
                <FileText className="w-5 h-5 mx-auto mb-1 text-slate-400" />
                <span className="block font-bold">3. Official Transcript</span>
                <span className="text-[10px] block text-slate-500">{transcriptUploaded ? 'GPA Seal Verified' : 'Click "Run Instant AI Audit"'}</span>
              </div>
            </div>
          </div>

          <div className="pt-2 flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={() => setActivePortalView('dashboard')}
              className="px-4 py-2 text-xs font-semibold text-slate-600 hover:text-slate-900"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs rounded-xl shadow-md shadow-blue-500/20 transition-all flex items-center gap-1.5"
            >
              <span>Publish Verified Campaign to Discovery</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </form>
      )}
    </div>
  );
};
