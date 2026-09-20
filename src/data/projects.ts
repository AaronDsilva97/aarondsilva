export type Flagship = {
  name: string;
  role: string;
  domain: string;
  year: string;
  url: string;
  description: string;
};

export type ClientProject = {
  name: string;
  region: string;
  compliance: string[];
  description: string;
  stack: string[];
  url?: string;
};

export const flagship = [
  { name: 'Clinvo', role: 'Technical creator', domain: 'Healthcare', year: '2026', url: 'https://clinvo.health/',
    description: 'An AI-native EHR and PHR for modern clinics, live with clinics in India: ambient scribing, smart prescriptions, and specialty-aware workflows for doctors and patients. Built on a HIPAA-compliant ambient listening RAG pipeline: AWS Comprehend Medical for entity extraction, Claude for clinical summarization, and Neo4j knowledge graphs for medical relationship mapping.' },
  { name: 'Aplify', role: 'CTO', domain: 'Marketplace', year: '2025', url: 'https://www.aplify.in/',
    description: 'An Indian classifieds and auctions marketplace — buy, sell, bid, and carpool — where I lead technical strategy and engineering. Took it from constant crashes to 100% uptime with a complete Flutter and Node.js rewrite: new flows for ads, auctions, carpool, and chat, admin panels for vendor management, and real-time inventory.' },
  { name: 'Itihaas', role: 'Creator', domain: 'Heritage', year: '2024', url: 'https://itihaas.ai',
    description: 'Where tech meets heritage: a platform documenting 5,000 years of Indian history, from the Indus Valley to Independence. People, dynasties, monuments, and trade routes across 15+ interconnected categories.' },
  { name: 'The Ink-Credible Store', role: 'Creator', domain: 'E-commerce', year: '2026', url: 'https://theinkcrediblestore.com/',
    description: 'A small storefront for fountain pen ink samples in India, built so people can try an ink before buying a whole bottle. Sold in packs of three, six, or twelve 2ml vials, with every swatch shot on the same nib, paper, and lighting so the colours can actually be compared, plus notes on flow, dry time, shading, and sheen.' },
] as const;

export const clientWork: ClientProject[] = [
  {
    name: 'Security Testing Platform',
    region: 'Global',
    compliance: ['ISO 27001'],
    description: 'A SaaS platform connecting penetration testers to development teams: a NestJS backend on AWS for secure vulnerability communication, regression tracking to stop fixed issues from reappearing, and a centralized reporting dashboard for ISO 27001 compliance audits.',
    stack: ['NestJS', 'PostgreSQL', 'AWS', 'React'],
  },
  {
    name: 'FDA Healthcare Platform',
    region: 'US, India',
    compliance: ['FDA', 'HIPAA', 'SOC2', 'ISO 27001'],
    description: 'Led pen testing remediation and implemented all security fixes, built AWS infrastructure with PostgreSQL RLS for secure multi-org data isolation, and achieved 99.9% uptime for hospital organizations across the US and India on FDA, HIPAA, SOC2, and ISO 27001 compliant infrastructure.',
    stack: ['React Native', 'Flask', 'AWS', 'PostgreSQL'],
  },
  {
    name: 'MyMami',
    region: 'UK, Africa',
    compliance: ['GDPR'],
    description: "A women's health platform rebuilt ground-up in Flutter for UK and Africa deployment: cycle tracking, self-testing workflows, healthcare provider connections, multi-language support, and a GDPR-compliant architecture with data privacy controls.",
    stack: ['Flutter', 'Dart', 'AWS'],
    url: 'https://mymamiapp.com/',
  },
  {
    name: 'MCP Server for Healthcare Research',
    region: 'US, EU',
    compliance: ['HIPAA'],
    description: 'A Model Context Protocol server giving researchers no-code access to healthcare datasets, with real-time analytics and visualization and a secure query interface for HIPAA-compliant databases, deployed across US and EU healthcare research institutions.',
    stack: ['Python', 'MCP', 'PostgreSQL', 'AWS'],
  },
];
