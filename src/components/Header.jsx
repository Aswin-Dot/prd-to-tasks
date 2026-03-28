import React from 'react';

export function Header({ onSettingsClick }) {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 glass border-b border-border">
      <div className="max-w-[1600px] mx-auto px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-accent to-indigo-500 flex items-center justify-center">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round">
              <path d="M4 6h16M4 12h10M4 18h6" />
              <circle cx="18" cy="18" r="3" fill="white" stroke="none" />
            </svg>
          </div>
          <div>
            <h1 className="text-lg font-semibold text-text">
              prd-to-tasks
            </h1>
            <p className="text-xs text-text-muted -mt-0.5">
              PRDs in, dev tasks out
            </p>
          </div>
        </div>

        <button
          onClick={onSettingsClick}
          className="p-2.5 rounded-lg bg-bg-card hover:bg-bg-elevated border border-border hover:border-border-hover transition-all duration-200"
          aria-label="Settings"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-text-muted">
            <circle cx="12" cy="12" r="3" />
            <path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" />
          </svg>
        </button>
      </div>
    </header>
  );
}
