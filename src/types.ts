export type AcademicCategory = 'STEM' | 'Medicine' | 'Arts' | 'Humanities' | 'Business' | 'Law';

export type UrgencyLevel = 
  | 'Tuition Due in 3 Days'
  | 'Tuition Due in 7 Days'
  | 'Immediate Deregistration Risk'
  | 'Final Semester Completion'
  | 'Mid-term Lab Fee Deficit';

export interface ItemizedCost {
  item: string;
  amount: number;
  covered: boolean;
}

export interface VerificationCheck {
  verified: boolean;
  timestamp: string;
  method: string;
  hash: string;
  details: string;
}

export interface DocumentAiCheck extends VerificationCheck {
  documentType: string;
  confidenceScore: number;
  extractedGpa: number;
  termVerified: string;
  registrarSealDetected: boolean;
}

export interface SchoolSignOff extends VerificationCheck {
  officialName: string;
  officialTitle: string;
  institutionalEmail: string;
  signOffId: string;
  phoneExtension: string;
}

export interface BursarEscrowAccount {
  institutionName: string;
  bursarOffice: string;
  studentIdNumber: string;
  escrowRoutingRef: string;
  escrowStatus: 'Locked & Verified' | 'Pending Allocation' | 'Fully Disbursed';
  depositAccountType: 'Direct Clearinghouse Automated ACH (Title IV Compliant)';
  verificationDate: string;
}

export interface GradeItem {
  term: string;
  courseCode: string;
  courseTitle: string;
  credits: number;
  grade: string;
  status: 'Completed' | 'Current';
}

export interface SponsorMessage {
  id: string;
  studentId: string;
  senderName: string;
  senderRole: 'Individual Sponsor' | 'Corporate CSR Officer' | 'Alumni Mentor';
  content: string;
  screenedContent: string;
  piiDetected: boolean;
  piiFlags: string[];
  timestamp: string;
  moderationStatus: 'Approved' | 'Redacted & Delivered';
}

export interface Student {
  id: string;
  name: string;
  avatar: string;
  university: string;
  schoolLogo: string;
  major: string;
  category: AcademicCategory;
  year: string;
  gpa: number;
  firstGen: boolean;
  tuitionDue: number;
  amountRaised: number;
  urgencyBadge: UrgencyLevel;
  daysRemaining: number;
  deadlineDate: string;
  itemizedCosts: ItemizedCost[];
  story: string;
  academicHonors: string[];
  verification: {
    idCheck: VerificationCheck;
    documentAiCheck: DocumentAiCheck;
    schoolSignOff: SchoolSignOff;
  };
  bursarEscrow: BursarEscrowAccount;
  gradeReports: GradeItem[];
  messages: SponsorMessage[];
}

export interface SponsorshipTransaction {
  id: string;
  studentId: string;
  studentName: string;
  university: string;
  bursarRef: string;
  sponsorName: string;
  sponsorEmail: string;
  baseAmount: number;
  tipPercentage: number;
  tipAmount: number;
  totalAmount: number;
  paymentMethod: 'Credit Card' | 'ACH Direct Bank Transfer' | 'Corporate DAF' | 'Wire Transfer';
  taxDeductibleReceiptId: string;
  timestamp: string;
  ein501c3: string;
  escrowStatus: 'Held in Escrow' | 'Remitted to Bursar';
}

export interface CSRRule {
  id: string;
  ruleName: string;
  companyName: string;
  targetCategories: AcademicCategory[];
  minGpa: number;
  requireUrgentOnly: boolean;
  requireFirstGen: boolean;
  maxPerStudent: number;
  allocatedBudget: number;
  remainingBudget: number;
  active: boolean;
}

export interface TaxReportItem {
  id: string;
  transactionDate: string;
  corporateEntity: string;
  ein: string;
  totalDonation: number;
  bursarDirectAmount: number;
  platformTipAmount: number;
  recipientCount: number;
  status: 'Audit Certified';
  downloadableDocUrl?: string;
}
