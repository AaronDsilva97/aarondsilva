export type Cert = {
  name: string;
  issuer: string;
  date: string;
  featured: boolean;
  url?: string;
};

export const certifications: Cert[] = [
  {
    name: 'AWS Certified Solutions Architect',
    issuer: 'Amazon Web Services',
    date: 'Dec 2025',
    featured: true,
    url: 'https://www.credly.com/badges/1b573241-4619-453f-96da-504d21e036a7/public_url',
  },
  {
    name: 'AI Strategy and Governance',
    issuer: 'University of Pennsylvania',
    date: 'Jan 2026',
    featured: true,
  },
  {
    name: 'Generative AI: Governance, Policy & Regulation',
    issuer: 'University of Michigan',
    date: 'Apr 2026',
    featured: true,
  },
  {
    name: 'The Zero Trust Framework',
    issuer: 'Pearson',
    date: 'Jan 2026',
    featured: true,
  },
  {
    name: 'Introduction to Healthcare',
    issuer: 'Stanford University',
    date: 'Jan 2026',
    featured: true,
  },
  {
    name: 'Streaming HL7 to FHIR Data with Healthcare API',
    issuer: 'Google Cloud',
    date: 'Mar 2026',
    featured: false,
  },
  {
    name: 'Responsible AI: Applying AI Principles',
    issuer: 'Google Cloud',
    date: 'Jan 2026',
    featured: false,
  },
  {
    name: 'Introduction to Large Language Models',
    issuer: 'Google Cloud',
    date: 'Jan 2026',
    featured: false,
  },
  {
    name: 'Introduction to Responsible AI',
    issuer: 'Google Cloud',
    date: 'Jan 2026',
    featured: false,
  },
  {
    name: 'Introduction to Generative AI',
    issuer: 'Google Cloud',
    date: 'Jan 2026',
    featured: false,
  },
  {
    name: 'Introduction to Clinical Data',
    issuer: 'Stanford University',
    date: 'Jan 2026',
    featured: false,
  },
  {
    name: 'Software Engineering for Cloud, Blockchain & IoT',
    issuer: 'IIT Madras',
    date: 'Apr 2023',
    featured: false,
    url: 'https://olympus1.mygreatlearning.com/certificate/JOHMAJBX',
  },
  {
    name: 'Professional Scrum Master I',
    issuer: 'Scrum.org',
    date: 'Jul 2022',
    featured: false,
    url: 'https://www.credly.com/badges/59b7db24-3ce5-4040-b386-df0530e0bd3e',
  },
];
