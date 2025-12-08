import { useState } from 'react';

const specializations = [
  {
    icon: '🏥',
    name: 'Healthcare Tech',
    description: 'HIPAA-compliant systems for hospitals & clinics'
  },
  {
    icon: '🔧',
    name: 'Full-Stack & Cloud',
    description: 'Mobile, Backend (Node, Laravel, Rails) & AWS infrastructure'
  },
  {
    icon: '🤖',
    name: 'AI Integration',
    description: 'RAG pipelines & LLM APIs in production'
  },
  {
    icon: '🔒',
    name: 'Security & Compliance',
    description: 'SOC2, GDPR, ISO 27001, HIPAA certified systems'
  }
];

export default function Specializations() {
  const [activeArea, setActiveArea] = useState(0);

  return (
    <div className="flex flex-col h-full">
      <div className="mb-4">
        <h3 className="text-lg font-semibold text-white mb-1">Specializations</h3>
        <p className="text-sm text-slate-400">What I build & where I excel</p>
      </div>

      <div className="grid grid-cols-2 gap-3 flex-1">
        {specializations.map((spec, index) => (
          <button
            key={index}
            onClick={() => setActiveArea(index)}
            className={`p-3 rounded-lg text-left transition-all duration-200 ${
              activeArea === index
                ? 'bg-purple-600/20 border-2 border-purple-400/40'
                : 'bg-slate-800/30 border border-slate-700/30 hover:bg-slate-700/30'
            }`}
          >
            <div className="text-xl mb-2">{spec.icon}</div>
            <div className="text-sm font-medium text-white mb-1">{spec.name}</div>
            <div className="text-xs text-slate-400">{spec.description}</div>
          </button>
        ))}
      </div>

      <div className="pt-3 mt-3 border-t border-slate-700/30">
        <div className="text-xs text-slate-400">
          Markets: <span className="text-emerald-400">US, UK, Europe, UAE, India</span>
        </div>
      </div>
    </div>
  );
}
