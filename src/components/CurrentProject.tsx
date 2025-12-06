import { useState } from 'react';

interface ProjectProgress {
  total: number;
  completed: number;
  label: string;
}

export default function CurrentProject() {
  const [project] = useState({
    name: 'MediTrack Pro',
    description: 'Co-founded healthcare startup enabling doctors to track patient outcomes 10x faster. Led technical development from MVP to 15K+ medical professionals using the platform.',
    status: 'Series A Raised',
    progress: 100,
    demoUrl: 'https://meditrak.com',
    githubUrl: '#',
    tech: ['React Native', 'Node.js', 'PostgreSQL', 'AWS', 'HIPAA Compliant'],
    metrics: {
      users: 15200,
      revenue: 480000,
      valuation: 12000000,
    },
    updates: [
      { date: '3w ago', update: 'Closed $2.5M Series A funding round' },
      { date: '2m ago', update: 'Reached $480K ARR milestone' },
      { date: '4m ago', update: 'Onboarded 10,000th medical professional' },
    ]
  });

  return (
    <div className="flex flex-col h-full">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse"></div>
          <span className="text-sm text-emerald-400 font-medium">{project.status}</span>
        </div>
        <div className="text-xs text-zinc-500">{project.progress}% complete</div>
      </div>

      <div className="space-y-3 flex-1">
        <div>
          <h3 className="text-lg font-semibold text-white mb-1">{project.name}</h3>
          <p className="text-sm text-zinc-400 leading-relaxed">{project.description}</p>
        </div>

        <div className="w-full bg-zinc-800 rounded-full h-2">
          <div
            className="bg-gradient-to-r from-emerald-500 to-emerald-400 h-2 rounded-full transition-all duration-500"
            style={{ width: `${project.progress}%` }}
          ></div>
        </div>

        <div className="flex flex-wrap gap-1">
          {project.tech.map((tech) => (
            <span
              key={tech}
              className="px-2 py-1 bg-zinc-800 text-zinc-300 text-xs rounded-md border border-zinc-700"
            >
              {tech}
            </span>
          ))}
        </div>

        <div className="grid grid-cols-3 gap-4 py-2">
          <div className="text-center">
            <div className="text-lg font-bold text-white">{project.metrics.users.toLocaleString()}</div>
            <div className="text-xs text-zinc-500">Medical Pros</div>
          </div>
          <div className="text-center">
            <div className="text-lg font-bold text-emerald-400">${(project.metrics.revenue / 1000).toFixed(0)}K</div>
            <div className="text-xs text-zinc-500">ARR</div>
          </div>
          <div className="text-center">
            <div className="text-lg font-bold text-purple-400">${(project.metrics.valuation / 1000000).toFixed(1)}M</div>
            <div className="text-xs text-zinc-500">Valuation</div>
          </div>
        </div>

        <div className="space-y-2">
          <h4 className="text-xs font-medium text-zinc-400 uppercase tracking-wider">Recent Updates</h4>
          {project.updates.map((update, index) => (
            <div key={index} className="flex items-start gap-2">
              <div className="w-1 h-1 bg-zinc-600 rounded-full mt-2 flex-shrink-0"></div>
              <div className="space-y-1">
                <div className="text-xs text-zinc-500">{update.date}</div>
                <div className="text-sm text-zinc-300">{update.update}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="flex gap-2 pt-3 mt-auto">
        <button
          onClick={() => window.open('mailto:contact@aarondsilva.dev?subject=Partnership Opportunity', '_blank')}
          className="flex-1 px-3 py-2 bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-medium rounded-md transition-colors"
        >
          Partner with Me
        </button>
        <button
          onClick={() => window.open('https://linkedin.com/in/aarondsilva97', '_blank')}
          className="px-3 py-2 bg-zinc-800 hover:bg-zinc-700 text-zinc-300 text-sm font-medium rounded-md transition-colors border border-zinc-700"
        >
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
            <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
          </svg>
        </button>
      </div>
    </div>
  );
}