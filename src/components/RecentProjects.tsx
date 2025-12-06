import { useState } from 'react';

interface Project {
  name: string;
  description: string;
  tech: string[];
  status: 'live' | 'archived' | 'wip';
  stars?: number;
  link?: string;
  demo?: string;
}

export default function RecentProjects() {
  const [projects] = useState<Project[]>([
    {
      name: 'The Furry Town',
      description: 'Creative web project showcasing modern Astro development',
      tech: ['Astro', 'TypeScript', 'CSS'],
      status: 'live',
      stars: 1,
      link: 'https://github.com/AaronDsilva97/the-furry-town',
      demo: 'https://aarondsilva97.github.io/the-furry-town'
    },
    {
      name: 'React Native Social Media Template',
      description: 'Complete template for building social media apps with modern patterns',
      tech: ['React Native', 'JavaScript', 'Expo'],
      status: 'live',
      stars: 1,
      link: 'https://github.com/AaronDsilva97/react-native-social-media-template'
    },
    {
      name: 'React Native Boilerplate',
      description: 'Production-ready boilerplate to kickstart React Native projects',
      tech: ['React Native', 'JavaScript', 'Redux'],
      status: 'live',
      stars: 1,
      link: 'https://github.com/AaronDsilva97/react-native-boilerplate'
    },
    {
      name: 'Flutter TDD Clean Architecture',
      description: 'E-Commerce app showcasing advanced Flutter development patterns',
      tech: ['Flutter', 'Dart', 'BLoC'],
      status: 'archived',
      stars: 0,
      link: 'https://github.com/AaronDsilva97/Flutter-TDD-Clean-Architecture-E-Commerce-App'
    }
  ]);

  const statusConfig = {
    live: { label: '🟢 Live', color: 'text-emerald-400' },
    wip: { label: '🔧 Building', color: 'text-yellow-400' },
    archived: { label: '📦 Archived', color: 'text-zinc-500' }
  };

  return (
    <div className="flex flex-col h-full">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-semibold text-slate-100">Featured Projects</h3>
        <a
          href="https://github.com/AaronDsilva97?tab=repositories"
          target="_blank"
          rel="noopener noreferrer"
          className="text-xs text-slate-400 hover:text-purple-400 transition-colors flex items-center gap-1"
        >
          View all
          <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
          </svg>
        </a>
      </div>

      <div className="space-y-4 flex-1 overflow-y-auto">
        {projects.map((project, index) => (
          <div key={project.name} className="group interactive-card glass-effect rounded-lg p-3 border border-slate-700/30">
            <div className="space-y-3">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <h4 className="font-mono text-sm text-slate-200 group-hover:text-purple-400 transition-colors">
                      {project.name}
                    </h4>
                    {project.stars !== undefined && project.stars > 0 && (
                      <div className="flex items-center gap-1 text-xs text-slate-500">
                        <span className="text-yellow-400">⭐</span>
                        <span className="font-mono">{project.stars}</span>
                      </div>
                    )}
                  </div>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    {project.description}
                  </p>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex flex-wrap gap-1">
                  {project.tech.slice(0, 3).map((tech) => (
                    <span
                      key={tech}
                      className="px-2 py-0.5 bg-slate-800/50 text-slate-300 text-xs rounded-md border border-slate-600/30 font-mono"
                    >
                      {tech}
                    </span>
                  ))}
                  {project.tech.length > 3 && (
                    <span className="px-2 py-0.5 bg-slate-800/50 text-slate-400 text-xs rounded-md border border-slate-600/30">
                      +{project.tech.length - 3}
                    </span>
                  )}
                </div>

                <div className="flex items-center gap-2">
                  <span className={`text-xs font-medium ${statusConfig[project.status].color}`}>
                    {statusConfig[project.status].label}
                  </span>
                </div>
              </div>

              <div className="flex gap-3 opacity-60 group-hover:opacity-100 transition-opacity">
                {project.link && (
                  <button
                    onClick={() => window.open(project.link, '_blank')}
                    className="flex items-center gap-1 text-xs text-slate-400 hover:text-slate-200 transition-colors hover-lift"
                  >
                    <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                    </svg>
                    Source
                  </button>
                )}
                {project.demo && (
                  <button
                    onClick={() => window.open(project.demo, '_blank')}
                    className="flex items-center gap-1 text-xs text-slate-400 hover:text-purple-400 transition-colors hover-lift"
                  >
                    <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                    Live Demo
                  </button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}