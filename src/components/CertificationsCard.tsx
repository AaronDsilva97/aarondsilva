import { useState } from 'react';

const certifications = [
  {
    name: 'Professional Scrum Master I',
    issuer: 'Scrum.org',
    icon: '🏅',
    status: 'Certified',
    url: 'https://www.credly.com/badges/59b7db24-3ce5-4040-b386-df0530e0bd3e'
  },
  {
    name: 'Software Engineering for Cloud, Blockchain & IoT',
    issuer: 'Advanced Certification',
    icon: '☁️',
    status: 'Certified',
    url: 'https://olympus1.mygreatlearning.com/certificate/JOHMAJBX'
  },
  {
    name: 'AWS Solutions Architect',
    issuer: 'Amazon Web Services',
    icon: '🎯',
    status: 'In Progress',
    url: null
  }
];

export default function CertificationsCard() {
  const [activeCert, setActiveCert] = useState(0);

  return (
    <div className="flex flex-col h-full">
      <div className="mb-2">
        <div className="flex items-center gap-2 mb-1">
          <span className="text-base">🎓</span>
          <h3 className="text-base font-semibold text-slate-900 dark:text-white">Certifications</h3>
        </div>
        <p className="text-xs text-slate-500 dark:text-slate-400">Professional credentials</p>
      </div>

      <div className="flex-1 space-y-2">
        {certifications.map((cert, index) => {
          const content = (
            <div className="flex items-start gap-2">
              <span className="text-base">{cert.icon}</span>
              <div className="flex-1 min-w-0">
                <div className="text-xs font-medium text-slate-900 dark:text-white truncate">{cert.name}</div>
                <div className="text-[10px] text-slate-500 dark:text-slate-400">{cert.issuer}</div>
              </div>
              <span className={`text-[10px] px-1.5 py-0.5 rounded shrink-0 ${
                cert.status === 'Certified'
                  ? 'bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400'
                  : 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-600 dark:text-yellow-400'
              }`}>
                {cert.status}
              </span>
            </div>
          );

          const className = `w-full text-left p-2 rounded-lg transition-all duration-200 ${
            activeCert === index
              ? 'bg-purple-100 dark:bg-purple-600/20 border border-purple-300 dark:border-purple-400/40'
              : 'bg-slate-50 dark:bg-slate-800/30 border border-slate-200 dark:border-slate-700/30 hover:bg-slate-100 dark:hover:bg-slate-700/30'
          }`;

          return cert.url ? (
            <a
              key={index}
              href={cert.url}
              target="_blank"
              rel="noopener noreferrer"
              className={`block ${className}`}
              onMouseEnter={() => setActiveCert(index)}
            >
              {content}
            </a>
          ) : (
            <button
              key={index}
              onClick={() => setActiveCert(index)}
              className={className}
            >
              {content}
            </button>
          );
        })}
      </div>
    </div>
  );
}
