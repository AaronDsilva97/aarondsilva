import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'motion/react';

type Cert = {
  name: string;
  issuer: string;
  monogram: string;
  badgeClass: string;
  date: string;
  expires?: string;
  credentialId?: string;
  url?: string;
};

const featured: Cert[] = [
  {
    name: 'AWS Certified Solutions Architect',
    issuer: 'Amazon Web Services',
    monogram: 'AWS',
    badgeClass: 'bg-orange-500/15 text-orange-600 dark:bg-orange-500/20 dark:text-orange-300 ring-1 ring-orange-500/30',
    date: 'Dec 2025',
    expires: 'Dec 2028',
    url: 'https://www.credly.com/badges/1b573241-4619-453f-96da-504d21e036a7/public_url',
  },
  {
    name: 'AI Strategy and Governance',
    issuer: 'University of Pennsylvania',
    monogram: 'UPenn',
    badgeClass: 'bg-red-500/15 text-red-700 dark:bg-red-500/20 dark:text-red-300 ring-1 ring-red-500/30',
    date: 'Jan 2026',
    credentialId: 'V1212037PZGC',
  },
  {
    name: 'Generative AI: Governance, Policy & Regulation',
    issuer: 'University of Michigan',
    monogram: 'UMich',
    badgeClass: 'bg-amber-500/15 text-amber-700 dark:bg-amber-500/20 dark:text-amber-300 ring-1 ring-amber-500/30',
    date: 'Apr 2026',
    credentialId: '60QBPAHDZLKT',
  },
  {
    name: 'The Zero Trust Framework',
    issuer: 'Pearson',
    monogram: 'P',
    badgeClass: 'bg-indigo-500/15 text-indigo-700 dark:bg-indigo-500/20 dark:text-indigo-300 ring-1 ring-indigo-500/30',
    date: 'Jan 2026',
    credentialId: 'E57STNOPKZG9',
  },
  {
    name: 'Introduction to Healthcare',
    issuer: 'Stanford University',
    monogram: 'S',
    badgeClass: 'bg-rose-500/15 text-rose-700 dark:bg-rose-500/20 dark:text-rose-300 ring-1 ring-rose-500/30',
    date: 'Jan 2026',
    credentialId: 'P2C3VIFB9QCS',
  },
];

const additional: Cert[] = [
  {
    name: 'Streaming HL7 to FHIR Data with Healthcare API',
    issuer: 'Google Cloud',
    monogram: 'GC',
    badgeClass: 'bg-sky-500/15 text-sky-700 dark:bg-sky-500/20 dark:text-sky-300 ring-1 ring-sky-500/30',
    date: 'Mar 2026',
    credentialId: 'PVEWARCBMLNV',
  },
  {
    name: 'Responsible AI: Applying AI Principles',
    issuer: 'Google Cloud',
    monogram: 'GC',
    badgeClass: 'bg-sky-500/15 text-sky-700 dark:bg-sky-500/20 dark:text-sky-300 ring-1 ring-sky-500/30',
    date: 'Jan 2026',
    credentialId: 'ETGLKW8RJZ3L',
  },
  {
    name: 'Introduction to Large Language Models',
    issuer: 'Google Cloud',
    monogram: 'GC',
    badgeClass: 'bg-sky-500/15 text-sky-700 dark:bg-sky-500/20 dark:text-sky-300 ring-1 ring-sky-500/30',
    date: 'Jan 2026',
    credentialId: '126T7EYWOJ7Z',
  },
  {
    name: 'Introduction to Responsible AI',
    issuer: 'Google Cloud',
    monogram: 'GC',
    badgeClass: 'bg-sky-500/15 text-sky-700 dark:bg-sky-500/20 dark:text-sky-300 ring-1 ring-sky-500/30',
    date: 'Jan 2026',
    credentialId: 'QZ24EJDMEPBK',
  },
  {
    name: 'Introduction to Generative AI',
    issuer: 'Google Cloud',
    monogram: 'GC',
    badgeClass: 'bg-sky-500/15 text-sky-700 dark:bg-sky-500/20 dark:text-sky-300 ring-1 ring-sky-500/30',
    date: 'Jan 2026',
    credentialId: 'EFAM80FV57BY',
  },
  {
    name: 'Introduction to Clinical Data',
    issuer: 'Stanford University',
    monogram: 'S',
    badgeClass: 'bg-rose-500/15 text-rose-700 dark:bg-rose-500/20 dark:text-rose-300 ring-1 ring-rose-500/30',
    date: 'Jan 2026',
    credentialId: 'QLDMC5MGQQZR',
  },
  {
    name: 'Software Engineering for Cloud, Blockchain & IoT',
    issuer: 'IIT Madras',
    monogram: 'IIT',
    badgeClass: 'bg-emerald-500/15 text-emerald-700 dark:bg-emerald-500/20 dark:text-emerald-300 ring-1 ring-emerald-500/30',
    date: 'Apr 2023',
    url: 'https://olympus1.mygreatlearning.com/certificate/JOHMAJBX',
  },
  {
    name: 'Professional Scrum Master I',
    issuer: 'Scrum.org',
    monogram: 'PSM',
    badgeClass: 'bg-teal-500/15 text-teal-700 dark:bg-teal-500/20 dark:text-teal-300 ring-1 ring-teal-500/30',
    date: 'Jul 2022',
    url: 'https://www.credly.com/badges/59b7db24-3ce5-4040-b386-df0530e0bd3e',
  },
];

const all = [...featured, ...additional];
const total = all.length;

function CertRow({ cert }: { cert: Cert }) {
  const Wrapper: any = cert.url ? 'a' : 'div';
  const wrapperProps = cert.url
    ? { href: cert.url, target: '_blank', rel: 'noopener noreferrer' }
    : {};

  return (
    <Wrapper
      {...wrapperProps}
      className={`group flex items-center gap-2.5 px-2.5 py-2 rounded-lg bg-slate-50/60 dark:bg-slate-800/30 border border-slate-200/60 dark:border-slate-700/40 hover:border-purple-300 dark:hover:border-purple-400/40 hover:bg-white dark:hover:bg-slate-800/60 transition-colors ${cert.url ? 'cursor-pointer' : ''}`}
      aria-label={`${cert.name} — ${cert.issuer}, ${cert.date}`}
    >
      <span
        className={`shrink-0 inline-flex items-center justify-center min-w-[42px] h-[26px] px-1.5 rounded-md text-[10px] font-semibold tracking-wide ${cert.badgeClass}`}
        aria-hidden="true"
      >
        {cert.monogram}
      </span>

      <div className="flex-1 min-w-0">
        <div className="text-xs font-medium text-slate-900 dark:text-white truncate leading-tight">
          {cert.name}
        </div>
        <div className="text-[10px] text-slate-500 dark:text-slate-400 truncate mt-0.5">
          {cert.issuer} · {cert.date}
          {cert.expires && (
            <span className="text-slate-500 dark:text-slate-400"> · Valid {cert.expires}</span>
          )}
        </div>
      </div>

      {cert.url && (
        <svg
          className="shrink-0 w-3 h-3 text-slate-400 dark:text-slate-500 opacity-0 group-hover:opacity-100 transition-opacity"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
        </svg>
      )}
    </Wrapper>
  );
}

function CertModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', onKey);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [open, onClose]);

  if (typeof document === 'undefined') return null;

  return createPortal(
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[100] flex items-center justify-center p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.15 }}
          role="dialog"
          aria-modal="true"
          aria-labelledby="cert-modal-title"
        >
          <motion.div
            className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
            onClick={onClose}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />

          <motion.div
            className="relative w-full max-w-lg max-h-[85vh] flex flex-col rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 shadow-2xl overflow-hidden"
            initial={{ opacity: 0, y: 12, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 12, scale: 0.98 }}
            transition={{ duration: 0.2, ease: 'easeOut' }}
          >
            <div className="flex items-start justify-between gap-4 px-5 pt-5 pb-3 border-b border-slate-200 dark:border-slate-800">
              <div className="min-w-0">
                <div className="flex items-center gap-2">
                  <span className="text-base" aria-hidden="true">🎓</span>
                  <h3
                    id="cert-modal-title"
                    className="text-base font-semibold text-slate-900 dark:text-white"
                  >
                    All Certifications
                  </h3>
                </div>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                  {total} professional credentials
                </p>
              </div>
              <button
                onClick={onClose}
                aria-label="Close"
                className="shrink-0 inline-flex items-center justify-center w-8 h-8 rounded-lg text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-white transition-colors"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <div className="flex-1 overflow-y-auto px-5 py-4 flex flex-col gap-1.5">
              {all.map((cert, i) => (
                <motion.div
                  key={cert.name}
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.18, delay: i * 0.025, ease: 'easeOut' }}
                >
                  <CertRow cert={cert} />
                </motion.div>
              ))}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body,
  );
}

export default function CertificationsCard() {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <>
      <div className="flex flex-col h-full">
        <div className="flex items-start justify-between gap-2 mb-3">
          <div className="min-w-0">
            <div className="flex items-center gap-2">
              <span className="text-base" aria-hidden="true">🎓</span>
              <h3 className="text-base font-semibold text-slate-900 dark:text-white">
                Certifications
              </h3>
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
              Professional credentials
            </p>
          </div>
          <span className="shrink-0 inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-medium bg-purple-100 dark:bg-purple-500/15 text-purple-700 dark:text-purple-300 ring-1 ring-purple-500/20">
            <span className="w-1.5 h-1.5 rounded-full bg-purple-500 dark:bg-purple-400" />
            {total} credentials
          </span>
        </div>

        <div className="flex-1 flex flex-col gap-1.5">
          {featured.map((cert) => (
            <CertRow key={cert.name} cert={cert} />
          ))}
        </div>

        <button
          onClick={() => setModalOpen(true)}
          aria-haspopup="dialog"
          className="mt-2 inline-flex items-center justify-center gap-1.5 w-full py-1.5 rounded-lg text-xs font-medium text-purple-700 dark:text-purple-300 bg-purple-50 dark:bg-purple-500/10 hover:bg-purple-100 dark:hover:bg-purple-500/20 ring-1 ring-purple-200/60 dark:ring-purple-400/20 transition-colors"
        >
          <span>View all {total} credentials</span>
          <svg
            className="w-3.5 h-3.5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>

      <CertModal open={modalOpen} onClose={() => setModalOpen(false)} />
    </>
  );
}
