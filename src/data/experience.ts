export type Role = {
  title: string;
  org: string;
  period: string;
  location: string;
  bullets: string[];
  stack: string[];
};

export const experience: Role[] = [
  {
    title: 'Chief Technology Officer (CTO)',
    org: 'Aplify',
    period: 'Sep 2025 - Present',
    location: 'Remote',
    bullets: [
      'Architect scalable marketplace infrastructure for classifieds, auctions, and carpool: real-time listings, payments, and seller management',
      'Lead technical roadmap and engineering team structure, establishing development processes, CI/CD pipelines, and quality assurance standards',
      'Build cloud-native architecture on AWS with a focus on cost optimization, security, and 99.9% uptime SLA for mission-critical marketplace operations',
      'Drive technical decision-making for mobile (React Native/Flutter), backend (Node.js), database (MongoDB/PostgreSQL), and cloud infrastructure choices',
    ],
    stack: ['React Native', 'Flutter', 'Node.js', 'MongoDB', 'PostgreSQL', 'AWS', 'CI/CD'],
  },
  {
    title: 'Co-Founder and Technical Lead',
    org: 'The Lean Product Studio',
    period: 'Jan 2024 - Present',
    location: 'Pune, Maharashtra, India',
    bullets: [
      'Shipped products used by teams at King’s College London and European hospital networks, delivered as a technical partner',
      'Cut a client’s AWS bill by 33% through architecture and instance-level optimization: right-sizing EC2 instances, auto-scaling, and RDS optimization',
      'Built Clinvo, a HIPAA-compliant AI ambient listening system for clinical documentation, now live with clinics in India: AWS Comprehend Medical for PHI extraction/anonymization, Claude API for summarization, Neo4j knowledge graphs for relationship mapping',
      'Rebuilt a failing classifieds and auctions marketplace from constant crashes to 100% uptime: complete Flutter mobile app rewrite, Node.js backend with MongoDB, vendor management dashboards, real-time inventory sync',
      'Developed an ISO 27001-compliant pen testing workflow platform connecting security testers to development teams: NestJS backend, centralized vulnerability tracking, regression testing, remediation verification for enterprise clients',
      'Created an MCP (Model Context Protocol) server for healthcare research, delivered as a technical partner to King’s College London and European hospital networks: real-time analytics, HIPAA-compliant data handling, GDPR consent management',
      'Rebuilt a women’s health platform V2 (UK/Africa markets) in Flutter: cycle tracking, telemedicine provider connections, multi-language support (English, French, Swahili), GDPR compliance with right-to-be-forgotten implementation',
    ],
    stack: ['Flutter', 'Node.js', 'NestJS', 'Python', 'AWS Comprehend Medical', 'Claude API', 'Neo4j', 'Pinecone', 'MCP', 'MongoDB', 'PostgreSQL', 'AWS'],
  },
  {
    title: 'Senior Full-Stack Developer',
    org: 'OpsFuse Technologies Pvt. Ltd.',
    period: 'Feb 2023 - Present',
    location: 'Pune, Maharashtra, India',
    bullets: [
      'Led pen testing remediation across the entire codebase: identified and fixed security vulnerabilities in the React Native mobile app and Flask backend, implemented all recommendations from third-party security audits, passed FDA/HIPAA/SOC2 compliance audits with zero critical findings',
      'Architected AWS infrastructure for secure multi-tenant SaaS: PostgreSQL with Row-Level Security (RLS) for organization data isolation, encrypted data at rest and in transit, role-based access control (RBAC), audit logging for compliance',
      'Achieved and maintained 99.9% uptime for hospital organizations across the US and India processing thousands of daily transactions: built monitoring and alerting systems, implemented disaster recovery procedures, automated backups with point-in-time recovery',
      'Built HIPAA compliance into every layer: PHI encryption (AES-256), access controls, audit trails, disaster recovery, data retention policies, and incident response procedures passing SOC2 Type II and ISO 27001 audits',
      'Developed mission-critical features for hospital workflows: offline-first mobile architecture for unreliable hospital networks, real-time data sync, patient data management, reporting dashboards, and administrative tools',
    ],
    stack: ['React Native', 'Flask (Python)', 'PostgreSQL (RLS)', 'AWS (EC2, RDS, S3)', 'Pen Testing Remediation', 'Offline-First Architecture'],
  },
  {
    title: 'Mobile Developer',
    org: 'Avegen',
    period: 'Jun 2021 - Feb 2023',
    location: 'Pune, Maharashtra, India',
    bullets: [
      'Architected a multi-tenant SaaS platform: complete data isolation between organizations, white-label customization through admin dashboards (logos, colors, features), zero-code configuration for new clients reducing onboarding from weeks to hours',
      'Implemented GDPR compliance controls: data encryption at rest and in transit, user consent management, right-to-be-forgotten workflows, data portability, privacy-by-design architecture passing European regulatory requirements',
      'Built an internationalization (i18n) framework supporting 10+ languages for European markets: English, German, French, Spanish, Italian, with right-to-left (RTL) support for Arabic, dynamic content translation, locale-specific date/time/currency formatting',
      'Led the full product development lifecycle: requirements gathering with European healthcare clients, technical architecture design, React Native mobile development, Ruby on Rails API backend, PostgreSQL database design, AWS deployment, production monitoring',
    ],
    stack: ['React Native', 'Ruby on Rails', 'PostgreSQL', 'AWS', 'i18n (10+ languages)'],
  },
  {
    title: 'Full Stack & Technology Engineer',
    org: 'Kalyani Studio / Sense It Out',
    period: '2016 - 2021',
    location: 'Pune, Maharashtra, India',
    bullets: [
      'Full Stack Engineer, Kalyani Studio (Mar 2020 - Jun 2021): developed web and mobile applications using Laravel, PHP, and JavaScript frameworks',
      'Technology Engineer, Kalyani Studio (Jan 2020 - Mar 2020): full-stack development with Laravel and IoT integrations',
      'Technical Development Engineer, Sense It Out Intelligent Solutions (Aug 2018 - Jan 2020): built IoT solutions and web applications using PHP, Laravel, and cloud platforms',
      'Intern, Sense It Out Technologies (Aug 2016 - May 2018): contributed to web development projects and learned full-stack engineering fundamentals',
    ],
    stack: ['Laravel', 'PHP', 'JavaScript', 'IoT'],
  },
];
