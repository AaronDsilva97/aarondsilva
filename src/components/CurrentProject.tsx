import { useState } from 'react';

interface ProjectProgress {
  total: number;
  completed: number;
  label: string;
}

export default function CurrentProject() {
  const [project] = useState({
    name: 'CTO @ Aplify® + Co-Founder @ TLPS',
    description: 'Leading technology strategy for e-commerce SaaS platform while building secure, AI-powered systems for healthcare, e-commerce, and security clients. Distributed team of 10 engineers across time zones.',
    status: 'Active',
    progress: 100,
    tech: ['React Native', 'Flutter', 'Node.js', 'Python', 'AWS', 'Neo4j'],
    highlights: [
      { label: 'Products Shipped', value: '6+' },
      { label: 'Team Size', value: '10' },
      { label: 'Markets', value: 'Global' },
    ],
    updates: [
      { date: 'Current', update: 'CTO at Aplify® architecting multi-vendor e-commerce platform' },
      { date: 'Recent', update: 'Reduced client AWS costs by 33% ($1M+ annual savings)' },
      { date: 'Ongoing', update: 'RAG pipelines (Neo4j, Pinecone, Claude API) for healthcare AI' },
    ]
  });

  return (
    <div className="flex flex-col h-full">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse"></div>
          <span className="text-sm text-emerald-400 font-medium">{project.status}</span>
        </div>
        <div className="text-xs text-slate-500 dark:text-zinc-500">{project.progress}% complete</div>
      </div>

      <div className="space-y-3 flex-1">
        <div>
          <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-1">{project.name}</h3>
          <p className="text-sm text-slate-500 dark:text-zinc-400 leading-relaxed">{project.description}</p>
        </div>

        <div className="w-full bg-slate-200 dark:bg-zinc-800 rounded-full h-2">
          <div
            className="bg-gradient-to-r from-emerald-500 to-emerald-400 h-2 rounded-full transition-all duration-500"
            style={{ width: `${project.progress}%` }}
          ></div>
        </div>

        <div className="flex flex-wrap gap-1">
          {project.tech.map((tech) => (
            <span
              key={tech}
              className="px-2 py-1 bg-slate-100 dark:bg-zinc-800 text-slate-600 dark:text-zinc-300 text-xs rounded-md border border-slate-200 dark:border-zinc-700"
            >
              {tech}
            </span>
          ))}
        </div>

        <div className="grid grid-cols-3 gap-4 py-2">
          {project.highlights.map((highlight, index) => (
            <div key={index} className="text-center">
              <div className="text-lg font-bold text-slate-900 dark:text-white">{highlight.value}</div>
              <div className="text-xs text-slate-500 dark:text-zinc-500">{highlight.label}</div>
            </div>
          ))}
        </div>

        <div className="space-y-2">
          <h4 className="text-xs font-medium text-slate-500 dark:text-zinc-400 uppercase tracking-wider">Recent Updates</h4>
          {project.updates.map((update, index) => (
            <div key={index} className="flex items-start gap-2">
              <div className="w-1 h-1 bg-slate-400 dark:bg-zinc-600 rounded-full mt-2 flex-shrink-0"></div>
              <div className="space-y-1">
                <div className="text-xs text-slate-500 dark:text-zinc-500">{update.date}</div>
                <div className="text-sm text-slate-600 dark:text-zinc-300">{update.update}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="flex gap-2 pt-3 mt-auto">
        <button
          onClick={() => window.open('mailto:contact@aarondsilva.me?subject=Project Inquiry', '_blank')}
          className="flex-1 px-3 py-2 bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-medium rounded-md transition-colors"
        >
          Get in Touch
        </button>
        <button
          onClick={() => window.open('https://www.linkedin.com/in/aaronxdsilva/', '_blank')}
          className="px-3 py-2 bg-slate-100 dark:bg-zinc-800 hover:bg-slate-200 dark:hover:bg-zinc-700 text-slate-600 dark:text-zinc-300 text-sm font-medium rounded-md transition-colors border border-slate-200 dark:border-zinc-700"
        >
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
            <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
          </svg>
        </button>
      </div>
    </div>
  );
}