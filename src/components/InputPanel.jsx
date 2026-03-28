import React from 'react';
import { TEAM_SIZE_OPTIONS, SPRINT_LENGTH_OPTIONS, PLATFORM_OPTIONS, EXAMPLE_PRD } from '../utils/constants';

export function InputPanel({ 
  prdText, 
  setPrdText, 
  context, 
  setContext, 
  onGenerate, 
  isGenerating,
  onCancel 
}) {
  const updateContext = (key, value) => {
    setContext(prev => ({ ...prev, [key]: value }));
  };

  const loadExample = () => {
    setPrdText(EXAMPLE_PRD);
    setContext({
      teamSize: '2-3',
      stack: 'React Native, NestJS, MongoDB',
      sprintLength: '2 weeks',
      platform: 'Cross-platform'
    });
  };

  return (
    <div className="h-full flex flex-col">
      {/* Context Fields */}
      <div className="mb-5">
        <h3 className="text-sm font-medium text-text-muted mb-3 flex items-center gap-2">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
            <circle cx="12" cy="12" r="10" />
            <path d="M12 16v-4M12 8h.01" />
          </svg>
          Project Context
        </h3>
        <div className="grid grid-cols-2 gap-3">
          {/* Team Size */}
          <div>
            <label className="block text-xs text-text-dim mb-1.5">Team Size</label>
            <select
              value={context.teamSize || ''}
              onChange={(e) => updateContext('teamSize', e.target.value)}
              className="w-full px-3 py-2.5 bg-bg-card border border-border rounded-lg text-sm text-text focus:border-accent focus:ring-1 focus:ring-accent/50 transition-all cursor-pointer"
            >
              <option value="">Select...</option>
              {TEAM_SIZE_OPTIONS.map(opt => (
                <option key={opt} value={opt}>{opt}</option>
              ))}
            </select>
          </div>

          {/* Sprint Length */}
          <div>
            <label className="block text-xs text-text-dim mb-1.5">Sprint Length</label>
            <select
              value={context.sprintLength || ''}
              onChange={(e) => updateContext('sprintLength', e.target.value)}
              className="w-full px-3 py-2.5 bg-bg-card border border-border rounded-lg text-sm text-text focus:border-accent focus:ring-1 focus:ring-accent/50 transition-all cursor-pointer"
            >
              <option value="">Select...</option>
              {SPRINT_LENGTH_OPTIONS.map(opt => (
                <option key={opt} value={opt}>{opt}</option>
              ))}
            </select>
          </div>

          {/* Tech Stack */}
          <div>
            <label className="block text-xs text-text-dim mb-1.5">Tech Stack</label>
            <input
              type="text"
              value={context.stack || ''}
              onChange={(e) => updateContext('stack', e.target.value)}
              placeholder="React, Node, Postgres..."
              className="w-full px-3 py-2.5 bg-bg-card border border-border rounded-lg text-sm text-text placeholder:text-text-dim focus:border-accent focus:ring-1 focus:ring-accent/50 transition-all"
            />
          </div>

          {/* Platform */}
          <div>
            <label className="block text-xs text-text-dim mb-1.5">Platform</label>
            <select
              value={context.platform || ''}
              onChange={(e) => updateContext('platform', e.target.value)}
              className="w-full px-3 py-2.5 bg-bg-card border border-border rounded-lg text-sm text-text focus:border-accent focus:ring-1 focus:ring-accent/50 transition-all cursor-pointer"
            >
              <option value="">Select...</option>
              {PLATFORM_OPTIONS.map(opt => (
                <option key={opt} value={opt}>{opt}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* PRD Textarea */}
      <div className="flex-1 flex flex-col min-h-0">
        <div className="flex items-center justify-between mb-2">
          <label className="text-sm font-medium text-text-muted flex items-center gap-2">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
              <path d="M14 2v6h6M16 13H8M16 17H8M10 9H8" />
            </svg>
            Product Requirement
          </label>
          <button
            onClick={loadExample}
            className="text-xs text-accent hover:text-accent-hover transition-colors flex items-center gap-1"
          >
            Try an example PRD
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </button>
        </div>
        
        <textarea
          value={prdText}
          onChange={(e) => setPrdText(e.target.value)}
          placeholder="Paste your product requirement here. Can be a rough idea, a full PRD, or anything in between. The more context you give, the better the tasks."
          className="flex-1 w-full px-4 py-3 bg-bg-card border border-border rounded-xl text-text placeholder:text-text-dim focus:border-accent focus:ring-1 focus:ring-accent/50 transition-all resize-none min-h-[300px] text-sm leading-relaxed"
        />
      </div>

      {/* Generate Button */}
      <div className="mt-4">
        {isGenerating ? (
          <button
            onClick={onCancel}
            className="w-full py-3.5 px-4 bg-red-500/20 hover:bg-red-500/30 border border-red-500/50 text-red-400 font-medium rounded-xl transition-all duration-200 flex items-center justify-center gap-2"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <rect x="3" y="3" width="18" height="18" rx="2" />
            </svg>
            Cancel Generation
          </button>
        ) : (
          <button
            onClick={onGenerate}
            disabled={!prdText.trim()}
            className="w-full py-3.5 px-4 bg-gradient-to-r from-accent to-indigo-500 hover:from-accent-hover hover:to-indigo-400 disabled:from-gray-600 disabled:to-gray-700 disabled:cursor-not-allowed text-white font-medium rounded-xl transition-all duration-200 flex items-center justify-center gap-2 btn-press glow-accent disabled:shadow-none"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
              <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
            </svg>
            Generate Tasks
          </button>
        )}
      </div>
    </div>
  );
}
