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

export default function TestimonialsCard() {
  const [activeCert, setActiveCert] = useState(0);

  return (
    <div className="flex flex-col h-full">
      <div className="mb-4">
        <div className="flex items-center gap-2 mb-2">
          <span className="text-lg">🎓</span>
          <h3 className="font-semibold text-white">Certifications</h3>
        </div>
        <p className="text-xs text-slate-400">Professional credentials</p>
      </div>

      <div className="flex-1 space-y-3">
        {certifications.map((cert, index) => {
          const content = (
            <div className="flex items-start gap-3">
              <span className="text-xl">{cert.icon}</span>
              <div className="flex-1 min-w-0">
                <div className="text-sm font-medium text-white truncate">{cert.name}</div>
                <div className="text-xs text-slate-400">{cert.issuer}</div>
              </div>
              <div className="flex items-center gap-2">
                <span className={`text-xs px-2 py-0.5 rounded ${
                  cert.status === 'Certified'
                    ? 'bg-emerald-900/30 text-emerald-400 border border-emerald-700/30'
                    : 'bg-yellow-900/30 text-yellow-400 border border-yellow-700/30'
                }`}>
                  {cert.status}
                </span>
                {cert.url && (
                  <svg className="w-4 h-4 text-slate-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                )}
              </div>
            </div>
          );

          const className = `w-full text-left p-3 rounded-lg transition-all duration-200 ${
            activeCert === index
              ? 'bg-purple-600/20 border border-purple-400/40'
              : 'bg-slate-800/30 border border-slate-700/30 hover:bg-slate-700/30'
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

      <div className="pt-3 mt-auto border-t border-slate-700/30">
        <div className="text-xs text-slate-400 text-center">
          Compliance expertise: <span className="text-emerald-400">HIPAA, SOC2, GDPR, ISO 27001</span>
        </div>
      </div>
    </div>
  );
}
