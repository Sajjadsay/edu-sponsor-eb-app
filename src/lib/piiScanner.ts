export interface PIIScanResult {
  hasPII: boolean;
  screenedText: string;
  flags: string[];
  violations: {
    type: string;
    original: string;
    reason: string;
  }[];
  securityNotice: string;
}

export function scanAndScreenPII(text: string): PIIScanResult {
  if (!text || text.trim() === '') {
    return {
      hasPII: false,
      screenedText: text,
      flags: [],
      violations: [],
      securityNotice: '',
    };
  }

  let screened = text;
  const violations: { type: string; original: string; reason: string }[] = [];
  const flagsSet = new Set<string>();

  // 1. Email addresses
  const emailRegex = /\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}\b/gi;
  screened = screened.replace(emailRegex, (match) => {
    violations.push({
      type: 'Email Address',
      original: match,
      reason: 'Personal email addresses are shielded to prevent off-platform contact and protect student privacy.',
    });
    flagsSet.add('Email Address');
    return '[REDACTED: EMAIL ADDRESS]';
  });

  // 2. Phone numbers (various formats)
  const phoneRegex = /(\+?\d{1,3}[-.\s]?)?(\(?\d{3}\)?[-.\s]?)?\d{3}[-.\s]?\d{4}\b/g;
  screened = screened.replace(phoneRegex, (match) => {
    // Avoid matching simple 4-digit numbers like years (e.g. 2026)
    if (match.replace(/\D/g, '').length < 7) return match;
    violations.push({
      type: 'Phone Number',
      original: match,
      reason: 'Personal phone numbers are masked to comply with student data safety protocols.',
    });
    flagsSet.add('Phone Number');
    return '[REDACTED: PHONE NUMBER]';
  });

  // 3. Payment handles ($CashApp, @venmo, paypal, zelle)
  const paymentRegex = /(\$[A-Za-z0-9_]{2,}|@venmo\b|paypal\.me\/[A-Za-z0-9_.-]+|\bzelle\s*(?:me|to)?\s*[:=]?\s*[\w@.-]+)/gi;
  screened = screened.replace(paymentRegex, (match) => {
    violations.push({
      type: 'Direct Payment Handle',
      original: match,
      reason: 'Direct peer-to-peer payment handles are blocked. All contributions must flow directly through University Bursar Escrow.',
    });
    flagsSet.add('Direct Payment Handle');
    return '[REDACTED: DIRECT PAYMENT HANDLE]';
  });

  // 4. Social media URLs & handles (Instagram, Telegram, WhatsApp, Snapchat, TikTok)
  const socialRegex = /(?:https?:\/\/)?(?:www\.)?(instagram\.com\/[A-Za-z0-9_.]+|t\.me\/[A-Za-z0-9_]+|wa\.me\/\d+|snapchat\.com\/add\/[A-Za-z0-9_.]+|tiktok\.com\/@[A-Za-z0-9_.]+)/gi;
  screened = screened.replace(socialRegex, (match) => {
    violations.push({
      type: 'Social Profile Link',
      original: match,
      reason: 'Direct social media channels are filtered to protect students from unsolicited external contact.',
    });
    flagsSet.add('Social Media Handle');
    return '[REDACTED: SOCIAL LINK]';
  });

  // 5. Street addresses & meeting locations
  const addressRegex = /\b\d{1,5}\s+([A-Za-z0-9\s.,]+)\s+(Street|St|Avenue|Ave|Road|Rd|Boulevard|Blvd|Lane|Ln|Drive|Dr|Way)\b/gi;
  screened = screened.replace(addressRegex, (match) => {
    violations.push({
      type: 'Physical Address',
      original: match,
      reason: 'Physical home and street addresses are redacted for student physical safety.',
    });
    flagsSet.add('Physical Address');
    return '[REDACTED: PHYSICAL ADDRESS]';
  });

  const hasPII = violations.length > 0;
  const flags = Array.from(flagsSet);

  let securityNotice = '';
  if (hasPII) {
    securityNotice = `🛡️ EduSponsor Safety Guard: ${flags.join(', ')} detected and shielded to protect student privacy and ensure all support remains tied to institutional Bursar accounts.`;
  }

  return {
    hasPII,
    screenedText: screened,
    flags,
    violations,
    securityNotice,
  };
}
