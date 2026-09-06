import { Student } from '../types';

export const INITIAL_STUDENTS: Student[] = [
  {
    id: 'stu-101',
    name: 'Amina Al-Mansoor',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&auto=format&fit=crop&q=80',
    university: 'Johns Hopkins University',
    schoolLogo: 'https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=120&auto=format&fit=crop&q=80',
    major: 'Biomedical Engineering & Neural Prosthetics',
    category: 'STEM',
    year: 'Junior (Year 3)',
    gpa: 3.94,
    firstGen: true,
    tuitionDue: 6800,
    amountRaised: 4350,
    urgencyBadge: 'Tuition Due in 3 Days',
    daysRemaining: 3,
    deadlineDate: 'October 15, 2026',
    itemizedCosts: [
      { item: 'Fall Semester Base Tuition', amount: 4800, covered: true },
      { item: 'Neural Fabrication Lab & Cleanroom Fee', amount: 1200, covered: false },
      { item: 'Required Advanced Biomaterials Texts', amount: 450, covered: false },
      { item: 'Institutional Technology Surcharge', amount: 350, covered: false }
    ],
    story: 'I am pioneering low-cost pediatric prosthetic arm sensors. Raised by a single mother working double hospital shifts, I have maintained a 3.94 GPA while running student STEM mentorship programs. Our department instituted a specialized cleanroom materials fee that must be cleared by Friday to prevent immediate course deregistration.',
    academicHonors: [
      'Provost Undergraduate Research Fellow',
      'Tau Beta Pi Engineering Honor Society',
      'Dean’s High Honors List (5 Consecutive Semesters)'
    ],
    verification: {
      idCheck: {
        verified: true,
        timestamp: '2026-09-01T14:22:08Z',
        method: 'GovID Biometric Match (NFC Passport + Real-Time 3D Liveness)',
        hash: '0x8f2b7a89e144a1936c6418fa7b22a01948d3bc61',
        details: 'State Department ID Verified with biometric 99.8% match confidence.'
      },
      documentAiCheck: {
        verified: true,
        timestamp: '2026-09-02T09:15:30Z',
        method: 'Document AI Registrar Ingestion & Seal Verification Engine',
        hash: '0x4c1e92d87e1088a2d1f97b5e83921820bdae7610',
        details: 'Tuition billing ledger validated directly against JHU Student Information System.',
        documentType: 'Official Student Account Statement & Enrollment Verification',
        confidenceScore: 99.4,
        extractedGpa: 3.94,
        termVerified: 'Fall Term 2026',
        registrarSealDetected: true
      },
      schoolSignOff: {
        verified: true,
        timestamp: '2026-09-02T16:40:12Z',
        method: 'Institutional Bursar & Financial Aid Officer Cryptographic Sign-Off',
        hash: '0x992fae3810cb994821a37c0938f7126ebcd40019',
        details: 'Authorized and cross-checked by Office of Student Financial Services.',
        officialName: 'Dr. Marcus Vance',
        officialTitle: 'Associate Dean of Financial Aid & Bursar Operations',
        institutionalEmail: 'm.vance@jhu.edu',
        signOffId: 'JHU-BUR-2026-9042',
        phoneExtension: 'x4891'
      }
    },
    bursarEscrow: {
      institutionName: 'Johns Hopkins University',
      bursarOffice: 'Office of the University Bursar - Garland Hall Suite 104',
      studentIdNumber: 'JHU-9021884',
      escrowRoutingRef: 'ESC-JHU-88402-ACH',
      escrowStatus: 'Locked & Verified',
      depositAccountType: 'Direct Clearinghouse Automated ACH (Title IV Compliant)',
      verificationDate: 'Sep 02, 2026'
    },
    gradeReports: [
      { term: 'Spring 2026', courseCode: 'BME 310', courseTitle: 'Neural Systems Modeling', credits: 4, grade: 'A', status: 'Completed' },
      { term: 'Spring 2026', courseCode: 'BME 312', courseTitle: 'Biomaterials & Tissue Engineering', credits: 4, grade: 'A', status: 'Completed' },
      { term: 'Spring 2026', courseCode: 'MATH 302', courseTitle: 'Differential Equations & Linear Algebra', credits: 4, grade: 'A-', status: 'Completed' },
      { term: 'Fall 2026', courseCode: 'BME 401', courseTitle: 'Senior Clinical Neural Prosthetics Design', credits: 4, grade: 'Enrolled (In Progress)', status: 'Current' }
    ],
    messages: [
      {
        id: 'msg-1',
        studentId: 'stu-101',
        senderName: 'Apex Healthtech Foundation',
        senderRole: 'Corporate CSR Officer',
        content: 'Amina, your research on affordable prosthetics is phenomenal. Our engineering team wants to support your bursar balance and offer you a summer lab fellowship.',
        screenedContent: 'Amina, your research on affordable prosthetics is phenomenal. Our engineering team wants to support your bursar balance and offer you a summer lab fellowship.',
        piiDetected: false,
        piiFlags: [],
        timestamp: 'Yesterday at 3:14 PM',
        moderationStatus: 'Approved'
      }
    ]
  },
  {
    id: 'stu-102',
    name: 'Mateo Hernandez-Cruz',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&auto=format&fit=crop&q=80',
    university: 'University of Michigan Medical School',
    schoolLogo: 'https://images.unsplash.com/photo-1562774053-701939374585?w=120&auto=format&fit=crop&q=80',
    major: 'Medicine (M.D. Candidate - Rural Healthcare Focus)',
    category: 'Medicine',
    year: 'Year 2 Medical Student (M2)',
    gpa: 3.88,
    firstGen: true,
    tuitionDue: 9400,
    amountRaised: 6200,
    urgencyBadge: 'Immediate Deregistration Risk',
    daysRemaining: 5,
    deadlineDate: 'October 18, 2026',
    itemizedCosts: [
      { item: 'Fall Clinical Medicine Practicum Fee', amount: 5500, covered: true },
      { item: 'USMLE Step 1 Preparation & Diagnostic Kit', amount: 1600, covered: false },
      { item: 'Rural Community Health Rotation Surcharge', amount: 1300, covered: false },
      { item: 'Medical Malpractice Student Rider Liability', amount: 1000, covered: false }
    ],
    story: 'I grew up in an agricultural valley without a permanent primary care physician. My life goal is returning to underserved rural clinic networks as a bilingual family physician. My emergency grant fell through when our county clinic funding was delayed, leaving an urgent balance that threatens my hospital rotation clearance.',
    academicHonors: [
      'National Hispanic Health Foundation Scholar',
      'Gold Humanism Honor Society Nominee',
      'Michigan Rural Health Initiative Community Service Award'
    ],
    verification: {
      idCheck: {
        verified: true,
        timestamp: '2026-08-28T11:04:19Z',
        method: 'GovID Biometric Match (REAL ID Driver License + Facial Vector Match)',
        hash: '0x3310da771e84a29810f63901bce5519084c010a3',
        details: 'Biometrics matched with official Michigan SOS database.'
      },
      documentAiCheck: {
        verified: true,
        timestamp: '2026-08-29T10:30:11Z',
        method: 'Document AI Registrar Ingestion & Seal Verification Engine',
        hash: '0x77c220f18391da40b39870198bc431904bbcd112',
        details: 'Official U-M Med Student billing and registration ledger verified.',
        documentType: 'Medical School Registrar Account Statement',
        confidenceScore: 99.8,
        extractedGpa: 3.88,
        termVerified: 'Academic Year 2026-2027',
        registrarSealDetected: true
      },
      schoolSignOff: {
        verified: true,
        timestamp: '2026-08-29T15:12:00Z',
        method: 'Institutional Bursar & Financial Aid Officer Cryptographic Sign-Off',
        hash: '0xee14902188ab61439201940177dfb81920accd91',
        details: 'Verified by University of Michigan Medical School Office of Student Affairs.',
        officialName: 'Elena Rostova, M.Ed.',
        officialTitle: 'Director of Medical Student Financial Services',
        institutionalEmail: 'erostova@umich.edu',
        signOffId: 'UM-MED-BUR-8419',
        phoneExtension: 'x3110'
      }
    },
    bursarEscrow: {
      institutionName: 'University of Michigan',
      bursarOffice: 'Student Financial Services - Central Campus Student Activities Bldg',
      studentIdNumber: 'UMICH-8391040',
      escrowRoutingRef: 'ESC-UMICH-9941-ACH',
      escrowStatus: 'Locked & Verified',
      depositAccountType: 'Direct Clearinghouse Automated ACH (Title IV Compliant)',
      verificationDate: 'Aug 29, 2026'
    },
    gradeReports: [
      { term: 'Year 1 Block 4', courseCode: 'MED 504', courseTitle: 'Cardiovascular & Pulmonary Pathology', credits: 6, grade: 'Honors (A)', status: 'Completed' },
      { term: 'Year 1 Block 5', courseCode: 'MED 505', courseTitle: 'Clinical Neuroscience & Behavioral Health', credits: 6, grade: 'High Pass (A-)', status: 'Completed' },
      { term: 'Year 2 Block 1', courseCode: 'MED 601', courseTitle: 'Endocrine & Reproductive Systems', credits: 5, grade: 'Honors (A)', status: 'Current' }
    ],
    messages: []
  },
  {
    id: 'stu-103',
    name: 'Seraphina Chen',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&auto=format&fit=crop&q=80',
    university: 'Rhode Island School of Design (RISD)',
    schoolLogo: 'https://images.unsplash.com/photo-1568792923760-d70635a89fa1?w=120&auto=format&fit=crop&q=80',
    major: 'Industrial Design & Sustainable Materials',
    category: 'Arts',
    year: 'Senior (Final Year)',
    gpa: 3.91,
    firstGen: false,
    tuitionDue: 4500,
    amountRaised: 3900,
    urgencyBadge: 'Final Semester Completion',
    daysRemaining: 7,
    deadlineDate: 'October 21, 2026',
    itemizedCosts: [
      { item: 'Senior Thesis Studio Capstone Fee', amount: 2200, covered: true },
      { item: 'Biodegradable Filament & CNC Fabrication Materials', amount: 1400, covered: true },
      { item: 'Remaining Semester Bursar Balance', amount: 600, covered: false },
      { item: 'Degree Conformance & Graduation Clearance Fee', amount: 300, covered: false }
    ],
    story: 'I design compostable seaweed-based packaging to eliminate single-use plastics from consumer electronics. This is my absolute final semester. Clearing this remaining $600 gap ensures my degree conferral and allows me to begin my design fellowship at an eco-packaging startup.',
    academicHonors: [
      'Core77 Design Awards Student Notable',
      'RISD Presidential Honors Scholarship',
      'Biodesign Challenge International Finalist'
    ],
    verification: {
      idCheck: {
        verified: true,
        timestamp: '2026-09-03T18:10:02Z',
        method: 'GovID Biometric Match (US Passport NFC + Face Mesh)',
        hash: '0x19fa478201cd994821a8801937ff19038baed022',
        details: 'Passport credentials matched and validated.'
      },
      documentAiCheck: {
        verified: true,
        timestamp: '2026-09-04T08:45:10Z',
        method: 'Document AI Registrar Ingestion & Seal Verification Engine',
        hash: '0x661840abde9041284a190184cba3091849102abf',
        details: 'RISD Bursar billing account matched itemized thesis fees.',
        documentType: 'Certified Bursar Statement & Degree Audit',
        confidenceScore: 99.1,
        extractedGpa: 3.91,
        termVerified: 'Fall Senior Term 2026',
        registrarSealDetected: true
      },
      schoolSignOff: {
        verified: true,
        timestamp: '2026-09-04T13:20:00Z',
        method: 'Institutional Bursar & Financial Aid Officer Cryptographic Sign-Off',
        hash: '0x44810abf19280148901bce49019283918a002931',
        details: 'Signed off by RISD Office of Financial Aid & Student Accounts.',
        officialName: 'Timothy Gable',
        officialTitle: 'Director of Student Accounts',
        institutionalEmail: 'tgable@risd.edu',
        signOffId: 'RISD-BUR-2026-1940',
        phoneExtension: 'x8120'
      }
    },
    bursarEscrow: {
      institutionName: 'Rhode Island School of Design',
      bursarOffice: 'Student Accounts - Woods-Gerry House 62 Prospect St',
      studentIdNumber: 'RISD-2023091',
      escrowRoutingRef: 'ESC-RISD-3091-ACH',
      escrowStatus: 'Locked & Verified',
      depositAccountType: 'Direct Clearinghouse Automated ACH (Title IV Compliant)',
      verificationDate: 'Sep 04, 2026'
    },
    gradeReports: [
      { term: 'Junior Spring', courseCode: 'ID 3100', courseTitle: 'Advanced Circular Product Systems', credits: 4.5, grade: 'A', status: 'Completed' },
      { term: 'Junior Spring', courseCode: 'MAT 2200', courseTitle: 'Biomimicry & Material Futures', credits: 3.0, grade: 'A', status: 'Completed' },
      { term: 'Senior Fall', courseCode: 'ID 4000', courseTitle: 'Senior Degree Thesis Studio', credits: 6.0, grade: 'A (Midterm Pass)', status: 'Current' }
    ],
    messages: []
  },
  {
    id: 'stu-104',
    name: 'Kofi Owusu-Mensah',
    avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400&auto=format&fit=crop&q=80',
    university: 'Georgia Institute of Technology',
    schoolLogo: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=120&auto=format&fit=crop&q=80',
    major: 'Computer Science (Cybersecurity & Autonomous Systems)',
    category: 'STEM',
    year: 'Senior (Year 4)',
    gpa: 3.97,
    firstGen: true,
    tuitionDue: 5400,
    amountRaised: 2100,
    urgencyBadge: 'Tuition Due in 7 Days',
    daysRemaining: 7,
    deadlineDate: 'October 21, 2026',
    itemizedCosts: [
      { item: 'Out-of-State Differential Bursar Gap', amount: 3500, covered: false },
      { item: 'High-Performance Cloud Compute Lab Access', amount: 1100, covered: true },
      { item: 'Cryptographic Security Senior Practicum Fee', amount: 800, covered: false }
    ],
    story: 'I research cryptographic verification of critical water and electrical grid control networks. As an international student from Ghana supporting two younger siblings back home, currency depreciation wiped out my family’s tuition savings for this final semester.',
    academicHonors: [
      'First Place - DefCon Undergraduate CTF Challenge',
      'Georgia Tech President’s Scholar',
      'ACM Student Research Competition Silver Medalist'
    ],
    verification: {
      idCheck: {
        verified: true,
        timestamp: '2026-08-30T14:15:00Z',
        method: 'GovID Biometric Match (Passport NFC Chip + Micro-Expression Liveness)',
        hash: '0x718a2091bcfe00192834bade10928301938fa091',
        details: 'Passport verified with SEVIS status cross-referenced.'
      },
      documentAiCheck: {
        verified: true,
        timestamp: '2026-08-31T09:00:22Z',
        method: 'Document AI Registrar Ingestion & Seal Verification Engine',
        hash: '0x99201bcfea40192834019283401928301938201a',
        details: 'Georgia Tech Bursar fee slip OCR validated with Registrar digital seal.',
        documentType: 'Official Tuition Billing Ledger & Fee Receipt',
        confidenceScore: 99.7,
        extractedGpa: 3.97,
        termVerified: 'Fall Semester 2026',
        registrarSealDetected: true
      },
      schoolSignOff: {
        verified: true,
        timestamp: '2026-08-31T17:00:00Z',
        method: 'Institutional Bursar & Financial Aid Officer Cryptographic Sign-Off',
        hash: '0x5510293847102938401928301928301928301928',
        details: 'Cleared by Georgia Tech Bursar’s Office (Savant Building).',
        officialName: 'Reginald Croft',
        officialTitle: 'Associate Bursar for Student Accounts',
        institutionalEmail: 'rcroft@bursar.gatech.edu',
        signOffId: 'GT-BUR-2026-4401',
        phoneExtension: 'x9012'
      }
    },
    bursarEscrow: {
      institutionName: 'Georgia Institute of Technology',
      bursarOffice: 'Bursar’s Office - Lyman Hall Suite 110',
      studentIdNumber: 'GT-90381044',
      escrowRoutingRef: 'ESC-GT-1044-ACH',
      escrowStatus: 'Locked & Verified',
      depositAccountType: 'Direct Clearinghouse Automated ACH (Title IV Compliant)',
      verificationDate: 'Aug 31, 2026'
    },
    gradeReports: [
      { term: 'Spring 2026', courseCode: 'CS 4235', courseTitle: 'Introduction to Information Security', credits: 3, grade: 'A', status: 'Completed' },
      { term: 'Spring 2026', courseCode: 'CS 4255', courseTitle: 'Cyber-Physical Systems Security', credits: 3, grade: 'A', status: 'Completed' },
      { term: 'Fall 2026', courseCode: 'CS 4980', courseTitle: 'Applied Cryptographic Architectures', credits: 4, grade: 'A (Current)', status: 'Current' }
    ],
    messages: []
  },
  {
    id: 'stu-105',
    name: 'Elena Vasquez-Morales',
    avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&auto=format&fit=crop&q=80',
    university: 'Georgetown University Law Center',
    schoolLogo: 'https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=120&auto=format&fit=crop&q=80',
    major: 'Law (J.D. Candidate - Asylum & Immigration Defense)',
    category: 'Law',
    year: 'Year 2 Law Student (2L)',
    gpa: 3.82,
    firstGen: true,
    tuitionDue: 7200,
    amountRaised: 4800,
    urgencyBadge: 'Immediate Deregistration Risk',
    daysRemaining: 4,
    deadlineDate: 'October 16, 2026',
    itemizedCosts: [
      { item: 'Fall 2L Legal Clinic Tuition', amount: 5000, covered: true },
      { item: 'Immigration Law Court Docket Filing Practicum', amount: 1200, covered: false },
      { item: 'Required Lexis/Westlaw Academic Licensure Surcharge', amount: 1000, covered: false }
    ],
    story: 'I have dedicated over 400 pro bono clinic hours representing unaccompanied minors in federal immigration court. To keep representing my 12 active child clients this term, my law school student account must be in standing before the registrar locks clinical docket privileges.',
    academicHonors: [
      'Georgetown Immigrant Justice Clinic Student Leader',
      'CALI Excellence for the Future Award in Constitutional Law',
      'Equal Justice Works Student Fellow'
    ],
    verification: {
      idCheck: {
        verified: true,
        timestamp: '2026-09-02T12:00:00Z',
        method: 'GovID Biometric Match (US Passport + Real ID)',
        hash: '0x8819203847102938471029384710293847102938',
        details: 'Valid government credentials certified.'
      },
      documentAiCheck: {
        verified: true,
        timestamp: '2026-09-02T15:30:19Z',
        method: 'Document AI Registrar Ingestion & Seal Verification Engine',
        hash: '0x1029384710293847102938471029384710293847',
        details: 'Georgetown Law Registrar account billing audit confirmed.',
        documentType: 'Official Law School Billing Ledger',
        confidenceScore: 99.6,
        extractedGpa: 3.82,
        termVerified: 'Fall 2026 2L Term',
        registrarSealDetected: true
      },
      schoolSignOff: {
        verified: true,
        timestamp: '2026-09-03T10:15:00Z',
        method: 'Institutional Bursar & Financial Aid Officer Cryptographic Sign-Off',
        hash: '0x3918203918203918203918203918203918203918',
        details: 'Signed by Georgetown Law Center Office of the Registrar.',
        officialName: 'Katherine Sullivan, J.D.',
        officialTitle: 'Registrar & Assistant Dean of Academic Records',
        institutionalEmail: 'ksullivan@law.georgetown.edu',
        signOffId: 'GULC-REG-2026-8812',
        phoneExtension: 'x2014'
      }
    },
    bursarEscrow: {
      institutionName: 'Georgetown University Law Center',
      bursarOffice: 'Student Accounts - McDonough Hall Room 120',
      studentIdNumber: 'GULC-8829104',
      escrowRoutingRef: 'ESC-GULC-9104-ACH',
      escrowStatus: 'Locked & Verified',
      depositAccountType: 'Direct Clearinghouse Automated ACH (Title IV Compliant)',
      verificationDate: 'Sep 03, 2026'
    },
    gradeReports: [
      { term: '1L Spring', courseCode: 'LAW 101', courseTitle: 'Constitutional Law II: Equal Protection', credits: 4, grade: 'A', status: 'Completed' },
      { term: '1L Spring', courseCode: 'LAW 105', courseTitle: 'Federal Civil Procedure & Evidence', credits: 4, grade: 'A-', status: 'Completed' },
      { term: '2L Fall', courseCode: 'LAW 240', courseTitle: 'Immigration Advocacy Clinic', credits: 5, grade: 'Enrolled (In Progress)', status: 'Current' }
    ],
    messages: []
  },
  {
    id: 'stu-106',
    name: 'Devon Bradley',
    avatar: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=400&auto=format&fit=crop&q=80',
    university: 'University of Chicago - Booth School of Business',
    schoolLogo: 'https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=120&auto=format&fit=crop&q=80',
    major: 'Impact Finance & Community Banking (B.S. Economics)',
    category: 'Business',
    year: 'Junior (Year 3)',
    gpa: 3.89,
    firstGen: false,
    tuitionDue: 5800,
    amountRaised: 3200,
    urgencyBadge: 'Mid-term Lab Fee Deficit',
    daysRemaining: 12,
    deadlineDate: 'October 28, 2026',
    itemizedCosts: [
      { item: 'Autumn Economics & Econometrics Tuition', amount: 4200, covered: true },
      { item: 'Financial Markets Data Terminal & Bloomberg Access Fee', amount: 1100, covered: false },
      { item: 'Chicago Community Micro-Loan Research Lab Assessment', amount: 500, covered: false }
    ],
    story: 'I research alternative underwriting models that help minority-owned small businesses access low-interest capital without predatory credit score penalties. My research lab fee grant was delayed during departmental realignment.',
    academicHonors: [
      'Booth Undergraduate Social Impact Scholar',
      'Federal Reserve System College Challenge Finalist'
    ],
    verification: {
      idCheck: {
        verified: true,
        timestamp: '2026-09-01T10:00:00Z',
        method: 'GovID Biometric Match (Illinois REAL ID)',
        hash: '0x9928102938471029384710293847102938471029',
        details: 'Biometric verification complete.'
      },
      documentAiCheck: {
        verified: true,
        timestamp: '2026-09-01T14:10:00Z',
        method: 'Document AI Registrar Ingestion & Seal Verification Engine',
        hash: '0x8837102938471029384710293847102938471029',
        details: 'UChicago Bursar ledger confirmed and audited.',
        documentType: 'Student Account Invoice & Financial Ledger',
        confidenceScore: 99.3,
        extractedGpa: 3.89,
        termVerified: 'Autumn Quarter 2026',
        registrarSealDetected: true
      },
      schoolSignOff: {
        verified: true,
        timestamp: '2026-09-02T11:00:00Z',
        method: 'Institutional Bursar & Financial Aid Officer Cryptographic Sign-Off',
        hash: '0x7726102938471029384710293847102938471029',
        details: 'Verified by University of Chicago Bursar Operations.',
        officialName: 'Arthur Pennington',
        officialTitle: 'Associate Bursar of Student Accounts',
        institutionalEmail: 'apennington@uchicago.edu',
        signOffId: 'UC-BUR-2026-7712',
        phoneExtension: 'x1829'
      }
    },
    bursarEscrow: {
      institutionName: 'University of Chicago',
      bursarOffice: 'Bursar’s Office - 6030 S. Ellis Ave',
      studentIdNumber: 'UC-19402881',
      escrowRoutingRef: 'ESC-UC-2881-ACH',
      escrowStatus: 'Locked & Verified',
      depositAccountType: 'Direct Clearinghouse Automated ACH (Title IV Compliant)',
      verificationDate: 'Sep 02, 2026'
    },
    gradeReports: [
      { term: 'Winter 2026', courseCode: 'ECON 202', courseTitle: 'Advanced Macroeconomics', credits: 100, grade: 'A', status: 'Completed' },
      { term: 'Spring 2026', courseCode: 'ECON 210', courseTitle: 'Econometrics & Causal Inference', credits: 100, grade: 'A', status: 'Completed' },
      { term: 'Autumn 2026', courseCode: 'BUSN 301', courseTitle: 'Microfinance & Community Banking', credits: 100, grade: 'In Progress', status: 'Current' }
    ],
    messages: []
  }
];

export const INITIAL_CSR_RULES: import('../types').CSRRule[] = [
  {
    id: 'csr-1',
    ruleName: 'Women & First-Gen STEM Excellence Fund',
    companyName: 'Qualcomm Global Philanthropy',
    targetCategories: ['STEM'],
    minGpa: 3.8,
    requireUrgentOnly: true,
    requireFirstGen: true,
    maxPerStudent: 3000,
    allocatedBudget: 50000,
    remainingBudget: 34500,
    active: true
  },
  {
    id: 'csr-2',
    ruleName: 'Future Rural & Community Doctors Initiative',
    companyName: 'Genentech Healthcare Access Foundation',
    targetCategories: ['Medicine'],
    minGpa: 3.5,
    requireUrgentOnly: true,
    requireFirstGen: false,
    maxPerStudent: 4000,
    allocatedBudget: 75000,
    remainingBudget: 52000,
    active: true
  },
  {
    id: 'csr-3',
    ruleName: 'Creative Arts & Sustainable Design Grant',
    companyName: 'Patagonia 1% for the Planet Alliance',
    targetCategories: ['Arts', 'STEM'],
    minGpa: 3.6,
    requireUrgentOnly: false,
    requireFirstGen: false,
    maxPerStudent: 2500,
    allocatedBudget: 30000,
    remainingBudget: 24000,
    active: true
  }
];
