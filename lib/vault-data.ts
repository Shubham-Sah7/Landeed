export interface PropertyDoc {
  id: string;
  name: string;
  type: string;
  issuedBy: string;
  issueDate: string;
  documentNumber: string;
}

export interface PropertyCheck {
  id: string;
  title: string;
  source: string;
  status: 'GOOD' | 'ATTENTION' | 'OFFLINE';
  summary: string;
}

export interface Property {
  id: string;
  title: string;
  subtitle: string;
  location: string;
  city: string;
  state: string;
  status: 'LOOKS_GOOD' | 'NEEDS_ATTENTION' | 'COULD_NOT_CHECK';
  statusText: 'Everything looks good' | 'Needs your attention' | 'Could not check this property';
  lastChecked: string;
  issue?: {
    whatWeFound: string;
    whyItMatters: string;
    nextStepLabel: string;
    amount?: number;
  };
  checks: PropertyCheck[];
  documents: PropertyDoc[];
}

export const PROPERTIES_DATA: Property[] = [
  {
    id: 'prop-ranchi',
    title: 'Kanke Road Plot',
    subtitle: 'Ancestral Land • 0.75 Acres',
    location: 'Mouza Kanke, Khata #142',
    city: 'Ranchi',
    state: 'Jharkhand',
    status: 'NEEDS_ATTENTION',
    statusText: 'Needs your attention',
    lastChecked: 'Checked today at 6:15 AM',
    issue: {
      whatWeFound: 'An unpaid land charge of ₹4,850 was found in the latest municipal record.',
      whyItMatters: 'An unpaid local land charge may need to be cleared before certain property transactions or official record updates.',
      nextStepLabel: 'Review & Pay ₹4,850',
      amount: 4850,
    },
    checks: [
      {
        id: 'c1',
        title: 'Property Ownership',
        source: 'Jharkhand Land Office',
        status: 'GOOD',
        summary: 'Ownership is clean under Rajesh Sharma.',
      },
      {
        id: 'c2',
        title: 'Municipal Land Charges',
        source: 'Ranchi Municipal Corporation',
        status: 'ATTENTION',
        summary: 'Unpaid land charge of ₹4,850 found for FY 2025-26.',
      },
      {
        id: 'c3',
        title: 'Court Claims & Disputes',
        source: 'District & High Court Records',
        status: 'GOOD',
        summary: 'No legal disputes or court stay orders found.',
      },
    ],
    documents: [
      {
        id: 'd1',
        name: 'Ancestral Sale Deed (1984)',
        type: 'Registered Sale Deed',
        issuedBy: 'Sub-Registrar Office, Ranchi',
        issueDate: '14 Oct 1984',
        documentNumber: 'DEED/RN/1984/4409',
      },
      {
        id: 'd2',
        name: 'Mutation Record Slip',
        type: 'Mutation Order',
        issuedBy: 'Circle Office Kanke',
        issueDate: '02 Mar 2002',
        documentNumber: 'MUT/RN/2002/881',
      },
      {
        id: 'd3',
        name: 'Certified Khatian Extract',
        type: 'Record of Rights',
        issuedBy: 'Dept of Revenue & Land Reforms',
        issueDate: '15 Jan 2025',
        documentNumber: 'ROR/JH/2025/1109',
      },
    ],
  },

  {
    id: 'prop-bengaluru',
    title: 'Indiranagar Apartment',
    subtitle: '3BHK Flat • Primary Residence',
    location: '100 Feet Road, Indiranagar',
    city: 'Bengaluru',
    state: 'Karnataka',
    status: 'LOOKS_GOOD',
    statusText: 'Everything looks good',
    lastChecked: 'Checked today at 6:15 AM',
    checks: [
      {
        id: 'cb1',
        title: 'Property Title & Liens',
        source: 'Karnataka Sub-Registrar Office',
        status: 'GOOD',
        summary: 'Title is clear. No mortgages or bank liens.',
      },
      {
        id: 'cb2',
        title: 'Property Tax Ledger',
        source: 'BBMP Property Tax Portal',
        status: 'GOOD',
        summary: 'Property tax paid in full for FY 2025-26.',
      },
      {
        id: 'cb3',
        title: 'Khata Certificate',
        source: 'BBMP e-Aasthi System',
        status: 'GOOD',
        summary: 'e-Khata A active and up to date.',
      },
    ],
    documents: [
      {
        id: 'db1',
        name: 'Registered Sale Deed (2018)',
        type: 'Registered Sale Deed',
        issuedBy: 'Sub-Registrar Office, Shivajinagar',
        issueDate: '22 Jun 2018',
        documentNumber: 'KA-BLR-2018-98211',
      },
      {
        id: 'db2',
        name: 'BBMP e-Khata A Certificate',
        type: 'Khata Certificate',
        issuedBy: 'BBMP Bengaluru',
        issueDate: '10 Nov 2023',
        documentNumber: 'BBMP/E-KHT/2023/550',
      },
      {
        id: 'db3',
        name: 'Encumbrance Certificate (2018-2026)',
        type: 'Encumbrance Certificate',
        issuedBy: 'Kaveri Portal',
        issueDate: '01 Sep 2026',
        documentNumber: 'EC/KAVERI/2026/7821',
      },
    ],
  },

  {
    id: 'prop-patna',
    title: 'Family House',
    subtitle: 'Independent House • Leased Out',
    location: 'Main Road Kankarbagh, Circle 3',
    city: 'Patna',
    state: 'Bihar',
    status: 'LOOKS_GOOD',
    statusText: 'Everything looks good',
    lastChecked: 'Checked today at 6:15 AM',
    checks: [
      {
        id: 'cp1',
        title: 'State Land Records',
        source: 'Bihar Land Records Office',
        status: 'GOOD',
        summary: 'Holding records match and ownership is intact.',
      },
      {
        id: 'cp2',
        title: 'Municipal Holding Tax',
        source: 'Patna Municipal Corporation',
        status: 'GOOD',
        summary: 'Holding tax paid up to current quarter.',
      },
    ],
    documents: [
      {
        id: 'dp1',
        name: 'Gift Deed (1995)',
        type: 'Gift Deed',
        issuedBy: 'Sub-Registrar Patna Sadar',
        issueDate: '18 Dec 1995',
        documentNumber: 'DEED/PAT/1995/104',
      },
      {
        id: 'dp2',
        name: 'Municipal Holding Tax Receipt',
        type: 'Tax Receipt',
        issuedBy: 'Patna Municipal Corporation',
        issueDate: '12 Apr 2024',
        documentNumber: 'PMC/HT/2024/9912',
      },
    ],
  },

  {
    id: 'prop-kolkata',
    title: 'Kolkata Plot',
    subtitle: 'Commercial Land • Investment',
    location: 'Action Area II, New Town',
    city: 'Kolkata',
    state: 'West Bengal',
    status: 'LOOKS_GOOD',
    statusText: 'Everything looks good',
    lastChecked: 'Checked today at 6:15 AM',
    checks: [
      {
        id: 'ck1',
        title: 'Allotment & Possession',
        source: 'WBHIDCO Commercial Wing',
        status: 'GOOD',
        summary: 'Allotment records and possession cleared.',
      },
      {
        id: 'ck2',
        title: 'Land Records & Mutation',
        source: 'New Town Revenue Office',
        status: 'GOOD',
        summary: 'Land conversion & mutation record cleared.',
      },
    ],
    documents: [
      {
        id: 'dk1',
        name: 'WBHIDCO Allotment Letter',
        type: 'Allotment Letter',
        issuedBy: 'WBHIDCO Kolkata',
        issueDate: '10 Feb 2021',
        documentNumber: 'HIDCO/ALLOT/2021/88',
      },
      {
        id: 'dk2',
        name: 'Possession Certificate',
        type: 'Possession Letter',
        issuedBy: 'New Town Development Authority',
        issueDate: '19 Aug 2021',
        documentNumber: 'POSS/NT/2021/409',
      },
    ],
  },
];

export interface SearchResultItem {
  doc?: PropertyDoc;
  property: Property;
  relevanceReason?: string;
}

export interface SearchResult {
  matches: SearchResultItem[];
  matchedProperties: Property[];
  query: string;
  isAllDocsQuery?: boolean;
}

/**
 * Natural language search over Vault properties and stored documents
 */
export function searchVault(rawQuery: string): SearchResult {
  const q = rawQuery.toLowerCase().trim();
  if (!q) {
    return { matches: [], matchedProperties: [], query: rawQuery };
  }

  const isAllDocs = q.includes('all') || q.includes('show all') || q.includes('everything') || q.includes('all documents');
  if (isAllDocs && (q.includes('documents') || q.includes('papers') || q.includes('all'))) {
    const allMatches: SearchResultItem[] = [];
    PROPERTIES_DATA.forEach((prop) => {
      prop.documents.forEach((doc) => {
        allMatches.push({ doc, property: prop });
      });
    });
    return {
      matches: allMatches,
      matchedProperties: PROPERTIES_DATA,
      query: rawQuery,
      isAllDocsQuery: true,
    };
  }

  const results: SearchResultItem[] = [];
  const matchedPropSet = new Set<string>();

  // Extract any 4-digit year from the query (e.g. 1984, 2022, 2025)
  const yearMatch = q.match(/\b(19\d\d|20\d\d)\b/);
  const queryYear = yearMatch ? yearMatch[1] : null;

  // Normalized keywords
  const isSaleDeed = q.includes('sale deed') || q.includes('deed') || q.includes('conveyance') || q.includes('bought') || q.includes('purchased');
  const isTax = q.includes('tax') || q.includes('cess') || q.includes('holding') || q.includes('receipt') || q.includes('unpaid') || q.includes('charge');
  const isKhata = q.includes('khata') || q.includes('aasthi');
  const isMutation = q.includes('mutation') || q.includes('register') || q.includes('slip');
  const isKhatian = q.includes('khatian') || q.includes('ror') || q.includes('rights');
  const isAllotment = q.includes('allotment') || q.includes('possession') || q.includes('hidco');
  const isGift = q.includes('gift');
  const isGenericPapers = q.includes('papers') || q.includes('documents') || q.includes('document') || q.includes('records') || q.includes('files');

  // Location / Property keywords
  const isRanchi = q.includes('ranchi') || q.includes('kanke');
  const isBengaluru = q.includes('bengaluru') || q.includes('bangalore') || q.includes('indiranagar') || q.includes('apartment') || q.includes('flat');
  const isPatna = q.includes('patna') || q.includes('kankarbagh') || q.includes('house');
  const isKolkata = q.includes('kolkata') || q.includes('new town') || q.includes('commercial');

  const hasSpecificLocation = isRanchi || isBengaluru || isPatna || isKolkata;
  const hasSpecificDocType = isSaleDeed || isTax || isKhata || isMutation || isKhatian || isAllotment || isGift;

  PROPERTIES_DATA.forEach((prop) => {
    const propMatchesLocation =
      (isRanchi && prop.city.toLowerCase() === 'ranchi') ||
      (isBengaluru && (prop.city.toLowerCase() === 'bengaluru' || prop.title.toLowerCase().includes('apartment'))) ||
      (isPatna && prop.city.toLowerCase() === 'patna') ||
      (isKolkata && prop.city.toLowerCase() === 'kolkata') ||
      prop.title.toLowerCase().includes(q) ||
      prop.city.toLowerCase().includes(q) ||
      prop.location.toLowerCase().includes(q);

    // Document matching
    prop.documents.forEach((doc) => {
      const docName = doc.name.toLowerCase();
      const docType = doc.type.toLowerCase();
      const docNum = doc.documentNumber.toLowerCase();
      const docDate = doc.issueDate.toLowerCase();

      let docMatchesType = false;
      if (isSaleDeed && (docName.includes('deed') || docType.includes('deed'))) docMatchesType = true;
      if (isTax && (docName.includes('tax') || docName.includes('cess') || docName.includes('receipt') || docType.includes('tax'))) docMatchesType = true;
      if (isKhata && (docName.includes('khata') || docType.includes('khata'))) docMatchesType = true;
      if (isMutation && (docName.includes('mutation') || docType.includes('mutation'))) docMatchesType = true;
      if (isKhatian && (docName.includes('khatian') || docType.includes('khatian'))) docMatchesType = true;
      if (isAllotment && (docName.includes('allotment') || docName.includes('possession'))) docMatchesType = true;
      if (isGift && (docName.includes('gift') || docType.includes('gift'))) docMatchesType = true;

      // Year match check
      let matchesYear = true;
      if (queryYear) {
        matchesYear = docName.includes(queryYear) || docDate.includes(queryYear) || docNum.includes(queryYear);
      }

      // Direct substring match
      const directTextMatch = docName.includes(q) || docType.includes(q) || docNum.includes(q);

      if ((docMatchesType || directTextMatch || (queryYear ? matchesYear : false)) && matchesYear) {
        if (!hasSpecificLocation || propMatchesLocation) {
          results.push({ doc, property: prop });
          matchedPropSet.add(prop.id);
        }
      }
    });

    // Broad property search (e.g., "Ranchi papers", "Patna documents") when no specific doc matches or generic query
    if (propMatchesLocation && (isGenericPapers || !hasSpecificDocType) && (!queryYear || results.some(r => r.property.id === prop.id))) {
      matchedPropSet.add(prop.id);
      prop.documents.forEach((doc) => {
        if (!results.some((r) => r.doc?.id === doc.id)) {
          results.push({ doc, property: prop });
        }
      });
    }
  });

  const matchedProperties = PROPERTIES_DATA.filter((p) => matchedPropSet.has(p.id));

  return {
    matches: results,
    matchedProperties,
    query: rawQuery,
  };
}

export const STRATEGY_RATIONALE = {
  oneSentenceBet:
    'Vault is not a digital document locker—it is a quiet property caretaker that actively checks public records in the background so multi-property owners immediately know whether their properties are okay.',
  mentalModelShift:
    'From "A folder where I manually upload PDFs" → To "Someone already checked everything for me, and I can ask for any document naturally in my own words."',
  personaDetails:
    'Design for a 52-year-old multi-property owner. The interface is so clear that a 10-year-old, 52-year-old, or 75-year-old parent understands the status of their properties in 5 seconds.',
  coreFlow:
    '1. Open Vault → 2. Instantly see "3 properties look good. 1 needs your attention." → 3. Search naturally ("sale deed for Ranchi") → 4. Vault finds it directly without folder navigation.',
  rejectedConcept:
    'AI Chatbots & Conversational UI: Rejected because a 50+ year old user does not want an AI assistant personality or chat bubbles. They want a fast, direct search engine that silently understands their Vault.',
};
