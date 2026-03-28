import React from 'react';
import { TEAM_SIZE_OPTIONS, SPRINT_LENGTH_OPTIONS, PLATFORM_OPTIONS, EXAMPLE_PRD } from '../utils/constants';

const selectClass = "w-full px-3 py-2.5 bg-bg-card border border-border rounded-lg text-sm text-text focus:border-accent transition-all cursor-pointer appearance-none";
const inputClass = "w-full px-3 py-2.5 bg-bg-card border border-border rounded-lg text-sm text-text placeholder:text-text-dim focus:border-accent transition-all";
const labelStyle = { display: 'block', fontSize: '11px', fontWeight: 600, color: '#8888a8', letterSpacing: '0.5px', marginBottom: '6px' };

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
      {/* Section: Project Context */}
      <div style={{ marginBottom: '24px' }}>
        <h3 className="text-xs font-semibold text-text-muted tracking-widest uppercase flex items-center gap-2" style={{ marginBottom: '16px' }}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
            <circle cx="12" cy="12" r="10" />
            <path d="M12 16v-4M12 8h.01" />
          </svg>
          Project Context
        </h3>
        <div className="grid grid-cols-2" style={{ gap: '16px' }}>
          {/* Team Size */}
          <div>
            <label style={labelStyle}>Team Size</label>
            <select
              value={context.teamSize || ''}
              onChange={(e) => updateContext('teamSize', e.target.value)}
              className={selectClass}
            >
              <option value="">Select...</option>
              {TEAM_SIZE_OPTIONS.map(opt => (
                <option key={opt} value={opt}>{opt}</option>
              ))}
            </select>
          </div>

          {/* Sprint Length */}
          <div>
            <label style={labelStyle}>Sprint Length</label>
            <select
              value={context.sprintLength || ''}
              onChange={(e) => updateContext('sprintLength', e.target.value)}
              className={selectClass}
            >
              <option value="">Select...</option>
              {SPRINT_LENGTH_OPTIONS.map(opt => (
                <option key={opt} value={opt}>{opt}</option>
              ))}
            </select>
          </div>

          {/* Tech Stack */}
          <div>
            <label style={labelStyle}>Tech Stack</label>
            <input
              type="text"
              value={context.stack || ''}
              onChange={(e) => updateContext('stack', e.target.value)}
              placeholder="React, Node, Postgres..."
              className={inputClass}
            />
          </div>

          {/* Platform */}
          <div>
            <label style={labelStyle}>Platform</label>
            <select
              value={context.platform || ''}
              onChange={(e) => updateContext('platform', e.target.value)}
              className={selectClass}
            >
              <option value="">Select...</option>
              {PLATFORM_OPTIONS.map(opt => (
                <option key={opt} value={opt}>{opt}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Section: PRD Textarea */}
      <div className="flex-1 flex flex-col" style={{ minHeight: 0 }}>
        <div className="flex items-center justify-between" style={{ marginBottom: '12px' }}>
          <label className="text-xs font-semibold text-text-muted tracking-widest uppercase flex items-center gap-2">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
              <path d="M14 2v6h6M16 13H8M16 17H8M10 9H8" />
            </svg>
            Product Requirement
          </label>
          <button
            onClick={loadExample}
            className="text-xs font-medium text-accent hover:text-accent-hover transition-colors flex items-center gap-1"
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
          className="flex-1 w-full bg-bg-card border border-border rounded-xl text-text placeholder:text-text-dim focus:border-accent transition-all resize-none text-sm"
          style={{ padding: '14px 16px', minHeight: '340px', lineHeight: '1.7' }}
        />
      </div>

      {/* Generate Button */}
      <div style={{ marginTop: '20px' }}>
        {isGenerating ? (
          <button
            onClick={onCancel}
            className="w-full px-4 border text-red-400 font-medium rounded-xl transition-all duration-200 flex items-center justify-center gap-2"
            style={{ padding: '14px 16px', backgroundColor: 'rgba(239,68,68,0.12)', borderColor: 'rgba(239,68,68,0.4)' }}
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
            className="w-full px-4 text-white font-semibold rounded-xl transition-all duration-200 flex items-center justify-center gap-2 btn-press glow-accent disabled:opacity-40 disabled:cursor-not-allowed disabled:shadow-none"
            style={{
              padding: '14px 16px',
              background: prdText.trim()
                ? 'linear-gradient(135deg, #8b7cf7, #6366f1)'
                : '#333',
            }}
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
