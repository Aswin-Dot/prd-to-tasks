import React, { useState } from 'react';
import { TaskCard } from './TaskCard';
import { 
  exportAsMarkdown, 
  exportAsJSON, 
  exportForNotion, 
  copyToClipboard, 
  downloadFile,
  calculateSprintEstimate 
} from '../utils/export';

export function OutputPanel({ tasks, isGenerating, error, sprintLength }) {
  const [copyStatus, setCopyStatus] = useState(null);

  const handleCopy = async (type) => {
    let content;
    let label;
    
    switch (type) {
      case 'markdown':
        content = exportAsMarkdown(tasks);
        label = 'Markdown';
        break;
      case 'notion':
        content = exportForNotion(tasks);
        label = 'Notion format';
        break;
      default:
        return;
    }
    
    const success = await copyToClipboard(content);
    if (success) {
      setCopyStatus(label);
      setTimeout(() => setCopyStatus(null), 2000);
    }
  };

  const handleDownloadJSON = () => {
    const content = exportAsJSON(tasks);
    const timestamp = new Date().toISOString().split('T')[0];
    downloadFile(content, `tasks-${timestamp}.json`);
  };

  // Calculate stats
  const p1Count = tasks.filter(t => t.priority === 'P1').length;
  const p2Count = tasks.filter(t => t.priority === 'P2').length;
  const p3Count = tasks.filter(t => t.priority === 'P3').length;
  const sprintEstimate = calculateSprintEstimate(tasks, sprintLength);

  // Empty state
  if (!isGenerating && tasks.length === 0 && !error) {
    return (
      <div className="h-full flex flex-col items-center justify-center text-center px-8">
        <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-accent/20 to-indigo-500/20 flex items-center justify-center mb-6">
          <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" className="text-accent">
            <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
          </svg>
        </div>
        <h3 className="text-xl font-semibold text-text mb-2">
          Your tasks will appear here
        </h3>
        <p className="text-text-muted max-w-sm leading-relaxed">
          Paste a PRD on the left and hit Generate. Tasks stream in as Claude thinks through your requirement.
        </p>
      </div>
    );
  }

  return (
    <div className="h-full flex flex-col">
      {/* Header with stats */}
      {(tasks.length > 0 || isGenerating) && (
        <div className="mb-5 pb-4 border-b border-border">
          {isGenerating && (
            <div className="flex items-center gap-2 mb-3">
              <div className="w-2 h-2 rounded-full bg-accent animate-pulse" />
              <span className="text-sm text-accent font-medium">Generating tasks...</span>
            </div>
          )}
          
          {tasks.length > 0 && (
            <div className="flex flex-wrap items-center gap-3 text-sm">
              <span className="font-semibold text-text">{tasks.length} tasks</span>
              <span className="text-text-dim">·</span>
              {p1Count > 0 && (
                <span className="text-priority-p1">{p1Count} P1</span>
              )}
              {p2Count > 0 && (
                <>
                  <span className="text-text-dim">·</span>
                  <span className="text-priority-p2">{p2Count} P2</span>
                </>
              )}
              {p3Count > 0 && (
                <>
                  <span className="text-text-dim">·</span>
                  <span className="text-priority-p3">{p3Count} P3</span>
                </>
              )}
              {sprintEstimate && (
                <>
                  <span className="text-text-dim">·</span>
                  <span className="text-text-muted">
                    Est: {sprintEstimate.minSprints === sprintEstimate.maxSprints 
                      ? `${sprintEstimate.minSprints} sprint${sprintEstimate.minSprints > 1 ? 's' : ''}`
                      : `${sprintEstimate.minSprints}–${sprintEstimate.maxSprints} sprints`
                    }
                  </span>
                </>
              )}
            </div>
          )}
        </div>
      )}

      {/* Error state */}
      {error && (
        <div className="mb-4 p-4 bg-red-500/10 border border-red-500/30 rounded-xl">
          <div className="flex items-start gap-3">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" className="text-red-400 flex-shrink-0 mt-0.5">
              <circle cx="12" cy="12" r="10" />
              <path d="M15 9l-6 6M9 9l6 6" />
            </svg>
            <div>
              <h4 className="text-sm font-medium text-red-400 mb-1">Generation Failed</h4>
              <p className="text-sm text-red-400/80">{error}</p>
            </div>
          </div>
        </div>
      )}

      {/* Task cards */}
      <div className="flex-1 overflow-y-auto space-y-4 pr-1">
        {tasks.map((task, index) => (
          <TaskCard key={task.id || index} task={task} index={index} />
        ))}
        
        {/* Loading skeleton */}
        {isGenerating && tasks.length === 0 && (
          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="bg-bg-card border border-border rounded-xl p-5 animate-pulse">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-12 h-5 bg-bg-elevated rounded" />
                  <div className="flex-1" />
                  <div className="flex gap-1.5">
                    <div className="w-8 h-5 bg-bg-elevated rounded" />
                    <div className="w-6 h-5 bg-bg-elevated rounded" />
                    <div className="w-16 h-5 bg-bg-elevated rounded" />
                  </div>
                </div>
                <div className="h-5 bg-bg-elevated rounded w-3/4 mb-3" />
                <div className="space-y-2">
                  <div className="h-4 bg-bg-elevated rounded w-full" />
                  <div className="h-4 bg-bg-elevated rounded w-5/6" />
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Export options */}
      {tasks.length > 0 && !isGenerating && (
        <div className="mt-5 pt-4 border-t border-border">
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => handleCopy('markdown')}
              className="flex-1 min-w-[140px] py-2.5 px-4 bg-bg-card hover:bg-bg-elevated border border-border hover:border-border-hover rounded-lg text-sm font-medium text-text transition-all duration-200 flex items-center justify-center gap-2"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2" />
                <rect x="8" y="2" width="8" height="4" rx="1" ry="1" />
              </svg>
              {copyStatus === 'Markdown' ? 'Copied!' : 'Copy Markdown'}
            </button>
            
            <button
              onClick={handleDownloadJSON}
              className="flex-1 min-w-[140px] py-2.5 px-4 bg-bg-card hover:bg-bg-elevated border border-border hover:border-border-hover rounded-lg text-sm font-medium text-text transition-all duration-200 flex items-center justify-center gap-2"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M7 10l5 5 5-5M12 15V3" />
              </svg>
              Download JSON
            </button>
            
            <button
              onClick={() => handleCopy('notion')}
              className="flex-1 min-w-[140px] py-2.5 px-4 bg-bg-card hover:bg-bg-elevated border border-border hover:border-border-hover rounded-lg text-sm font-medium text-text transition-all duration-200 flex items-center justify-center gap-2"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                <rect x="3" y="3" width="18" height="18" rx="2" />
                <path d="M3 9h18M9 21V9" />
              </svg>
              {copyStatus === 'Notion format' ? 'Copied!' : 'Copy for Notion'}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
