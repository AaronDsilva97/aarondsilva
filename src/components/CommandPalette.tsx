import { useState, useEffect, useRef } from 'react';

interface Command {
  id: string;
  title: string;
  description: string;
  icon: string;
  action: () => void;
  keywords: string[];
}

export default function CommandPalette() {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const [isMac, setIsMac] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  // Detect device type
  useEffect(() => {
    setIsMobile(window.innerWidth <= 768);
    setIsMac(navigator.platform.toLowerCase().includes('mac'));

    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const commands: Command[] = [
    {
      id: 'blog',
      title: 'Read Blog',
      description: 'Technical articles on healthcare, AWS, AI & compliance',
      icon: '📝',
      action: () => window.location.href = '/blog',
      keywords: ['blog', 'articles', 'posts', 'writing', 'healthcare', 'aws', 'ai', 'hipaa']
    },
    {
      id: 'github',
      title: 'View GitHub Profile',
      description: 'Open GitHub profile in new tab',
      icon: '🐙',
      action: () => window.open('https://github.com/AaronDsilva97', '_blank'),
      keywords: ['github', 'code', 'repositories', 'profile']
    },
    {
      id: 'projects',
      title: 'Scroll to Projects',
      description: 'Navigate to featured projects section',
      icon: '🚀',
      action: () => {
        const element = document.querySelector('[data-section="projects"]');
        element?.scrollIntoView({ behavior: 'smooth' });
      },
      keywords: ['projects', 'work', 'portfolio', 'scroll']
    },
    {
      id: 'schedule',
      title: 'Schedule a Meeting',
      description: 'Book time to discuss collaboration',
      icon: '📅',
      action: () => window.open('https://calendly.com/aaronxdsilva/30min', '_blank'),
      keywords: ['schedule', 'meeting', 'call', 'calendly', 'book', 'time']
    },
    {
      id: 'partnership',
      title: 'Partnership Inquiry',
      description: 'Discuss co-founding opportunities',
      icon: '🤝',
      action: () => window.open('mailto:contact@aarondsilva.me?subject=Co-founding Partnership Inquiry', '_blank'),
      keywords: ['partnership', 'co-founder', 'collaborate', 'startup', 'venture']
    },
    {
      id: 'contact',
      title: 'Get in Touch',
      description: 'General inquiries and networking',
      icon: '✉️',
      action: () => window.open('mailto:contact@aarondsilva.me', '_blank'),
      keywords: ['contact', 'email', 'reach', 'message', 'connect']
    },
    {
      id: 'pitch-deck',
      title: 'View Startup Portfolio',
      description: 'See previous co-founded ventures',
      icon: '🚀',
      action: () => window.open('/startup-portfolio.pdf', '_blank'),
      keywords: ['startups', 'ventures', 'portfolio', 'pitch', 'deck', 'experience']
    },
    {
      id: 'linkedin',
      title: 'LinkedIn Profile',
      description: 'Open LinkedIn profile',
      icon: '💼',
      action: () => window.open('https://www.linkedin.com/in/aaronxdsilva/', '_blank'),
      keywords: ['linkedin', 'professional', 'network', 'profile']
    },
    {
      id: 'copy-email',
      title: 'Copy Email Address',
      description: 'Copy email to clipboard',
      icon: '📋',
      action: () => {
        navigator.clipboard.writeText('contact@aarondsilva.me');
        // Could add a toast notification here
      },
      keywords: ['copy', 'email', 'clipboard', 'address']
    },
    {
      id: 'theme',
      title: 'Toggle Theme',
      description: 'Switch between light and dark mode',
      icon: '🌙',
      action: () => {
        const isDark = document.documentElement.classList.toggle('dark');
        localStorage.setItem('theme', isDark ? 'dark' : 'light');
        // Update theme-color meta tag
        const metaTheme = document.querySelector('meta[name="theme-color"]');
        if (metaTheme) {
          metaTheme.setAttribute('content', isDark ? '#0f172a' : '#ffffff');
        }
      },
      keywords: ['theme', 'dark', 'light', 'mode', 'toggle']
    },
    {
      id: 'refresh',
      title: 'Refresh Page',
      description: 'Reload the current page',
      icon: '🔄',
      action: () => window.location.reload(),
      keywords: ['refresh', 'reload', 'restart']
    }
  ];

  // Filter commands based on search query
  const filteredCommands = commands.filter(command => {
    const searchTerm = query.toLowerCase();
    return (
      command.title.toLowerCase().includes(searchTerm) ||
      command.description.toLowerCase().includes(searchTerm) ||
      command.keywords.some(keyword => keyword.toLowerCase().includes(searchTerm))
    );
  });

  // Open command palette function
  const openCommandPalette = () => {
    setIsOpen(true);
    setQuery('');
    setSelectedIndex(0);
  };

  // Keyboard event handlers
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Open command palette with Cmd+K (Mac) or Ctrl+K (Windows/Linux)
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        openCommandPalette();
      }

      // Close with Escape
      if (e.key === 'Escape' && isOpen) {
        setIsOpen(false);
        setQuery('');
        setSelectedIndex(0);
      }

      // Navigate with arrow keys
      if (isOpen) {
        if (e.key === 'ArrowDown') {
          e.preventDefault();
          setSelectedIndex(prev =>
            prev < filteredCommands.length - 1 ? prev + 1 : 0
          );
        }
        if (e.key === 'ArrowUp') {
          e.preventDefault();
          setSelectedIndex(prev =>
            prev > 0 ? prev - 1 : filteredCommands.length - 1
          );
        }
        if (e.key === 'Enter' && filteredCommands[selectedIndex]) {
          e.preventDefault();
          filteredCommands[selectedIndex].action();
          setIsOpen(false);
          setQuery('');
          setSelectedIndex(0);
        }
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, filteredCommands, selectedIndex]);

  // Focus input when opened
  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  // Reset selected index when query changes
  useEffect(() => {
    setSelectedIndex(0);
  }, [query]);

  return (
    <>
      {/* Floating Action Button for Mobile */}
      {isMobile && (
        <button
          id="search-button"
          onClick={openCommandPalette}
          className="fixed top-3 right-16 z-40 w-10 h-10 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white rounded-full shadow-lg shadow-purple-500/25 flex items-center justify-center transition-all duration-500 hover:scale-105 active:scale-95"
          aria-label="Open command palette"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </button>
      )}

      {/* Command Palette Modal */}
      {!isOpen ? null : (
        <div className="fixed inset-0 z-50 flex items-start justify-center pt-8 sm:pt-16 px-2 sm:px-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/30 dark:bg-black/50 backdrop-blur-sm"
        onClick={() => setIsOpen(false)}
      />

      {/* Command Palette */}
      <div className="relative w-full max-w-lg bg-white/95 dark:bg-slate-800/95 backdrop-blur-lg rounded-xl border border-slate-200 dark:border-slate-700/50 shadow-2xl shadow-purple-500/10 mx-2 sm:mx-0">
        {/* Search Input */}
        <div className="flex items-center gap-3 p-4 border-b border-slate-200 dark:border-slate-700/50">
          <svg className="w-5 h-5 text-slate-500 dark:text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <input
            ref={inputRef}
            type="text"
            placeholder="Type a command or search..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="flex-1 bg-transparent text-slate-900 dark:text-slate-100 placeholder-slate-400 outline-none text-sm"
          />
          <div className="flex items-center gap-1">
            <kbd className="px-2 py-1 text-xs text-slate-500 dark:text-slate-400 bg-slate-100 dark:bg-slate-700/50 rounded border border-slate-200 dark:border-slate-600/50">
              {isMac ? '⌘K' : 'Ctrl+K'}
            </kbd>
            <kbd className="px-2 py-1 text-xs text-slate-500 dark:text-slate-400 bg-slate-100 dark:bg-slate-700/50 rounded border border-slate-200 dark:border-slate-600/50">
              ESC
            </kbd>
          </div>
        </div>

        {/* Commands List */}
        <div className="max-h-80 overflow-y-auto py-2">
          {filteredCommands.length === 0 ? (
            <div className="px-4 py-8 text-center text-slate-500 dark:text-slate-400 text-sm">
              No commands found for "{query}"
            </div>
          ) : (
            filteredCommands.map((command, index) => (
              <button
                key={command.id}
                onClick={() => {
                  command.action();
                  setIsOpen(false);
                  setQuery('');
                  setSelectedIndex(0);
                }}
                className={`w-full flex items-center gap-3 px-4 py-3 text-left transition-colors ${
                  index === selectedIndex
                    ? 'bg-purple-600/20 border-l-2 border-purple-400'
                    : 'hover:bg-slate-100 dark:hover:bg-slate-700/30'
                }`}
              >
                <span className="text-lg">{command.icon}</span>
                <div className="flex-1 min-w-0">
                  <div className="text-sm font-medium text-slate-900 dark:text-slate-100 truncate">
                    {command.title}
                  </div>
                  <div className="text-xs text-slate-500 dark:text-slate-400 truncate">
                    {command.description}
                  </div>
                </div>
                {index === selectedIndex && (
                  <kbd className="px-2 py-1 text-xs text-slate-500 dark:text-slate-400 bg-slate-100 dark:bg-slate-700/50 rounded border border-slate-200 dark:border-slate-600/50">
                    ↵
                  </kbd>
                )}
              </button>
            ))
          )}
        </div>

        {/* Footer */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between px-4 py-2 border-t border-slate-200 dark:border-slate-700/50 text-xs text-slate-500 dark:text-slate-400 gap-2 sm:gap-0">
          <div className="flex items-center gap-2 sm:gap-4 flex-wrap">
            <span className="flex items-center gap-1">
              <kbd className="px-1.5 py-0.5 bg-slate-100 dark:bg-slate-700/50 rounded">↑</kbd>
              <kbd className="px-1.5 py-0.5 bg-slate-100 dark:bg-slate-700/50 rounded">↓</kbd>
              <span className="hidden sm:inline">to navigate</span>
              <span className="sm:hidden">navigate</span>
            </span>
            <span className="flex items-center gap-1">
              <kbd className="px-1.5 py-0.5 bg-slate-100 dark:bg-slate-700/50 rounded">↵</kbd>
              <span className="hidden sm:inline">to select</span>
              <span className="sm:hidden">select</span>
            </span>
          </div>
          <span className="text-center sm:text-right">
            {filteredCommands.length} command{filteredCommands.length !== 1 ? 's' : ''}
          </span>
        </div>
      </div>
    </div>
      )}
    </>
  );
}