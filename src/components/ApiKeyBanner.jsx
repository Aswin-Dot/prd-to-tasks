import React from 'react';

export function ApiKeyBanner({ onSettingsClick }) {
  return (
    <div className="mb-6 p-4 bg-amber-500/10 border border-amber-500/30 rounded-xl">
      <div className="flex items-start gap-3">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" className="text-amber-400 flex-shrink-0 mt-0.5">
          <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
          <line x1="12" y1="9" x2="12" y2="13" />
          <line x1="12" y1="17" x2="12.01" y2="17" />
        </svg>
        <div className="flex-1">
          <h4 className="text-sm font-medium text-amber-400 mb-1">
            API Key Required
          </h4>
          <p className="text-sm text-amber-400/80">
            Add your Anthropic API key in{' '}
            <button 
              onClick={onSettingsClick}
              className="underline hover:no-underline"
            >
              Settings
            </button>
            {' '}to generate tasks.{' '}
            <a 
              href="https://console.anthropic.com/settings/keys" 
              target="_blank" 
              rel="noopener noreferrer"
              className="underline hover:no-underline"
            >
              Get one free →
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
