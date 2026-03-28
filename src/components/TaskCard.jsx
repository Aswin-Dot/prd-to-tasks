import React from 'react';

const priorityConfig = {
  P1: { bg: 'bg-priority-p1/15', text: 'text-priority-p1', border: 'border-priority-p1/30' },
  P2: { bg: 'bg-priority-p2/15', text: 'text-priority-p2', border: 'border-priority-p2/30' },
  P3: { bg: 'bg-priority-p3/15', text: 'text-priority-p3', border: 'border-priority-p3/30' },
};

const effortConfig = {
  S: { bg: 'bg-effort-s/15', text: 'text-effort-s', label: 'Small' },
  M: { bg: 'bg-effort-m/15', text: 'text-effort-m', label: 'Medium' },
  L: { bg: 'bg-effort-l/15', text: 'text-effort-l', label: 'Large' },
};

const typeConfig = {
  frontend: { bg: 'bg-type-frontend/15', text: 'text-type-frontend' },
  backend: { bg: 'bg-type-backend/15', text: 'text-type-backend' },
  design: { bg: 'bg-type-design/15', text: 'text-type-design' },
  infra: { bg: 'bg-type-infra/15', text: 'text-type-infra' },
  research: { bg: 'bg-type-research/15', text: 'text-type-research' },
};

export function TaskCard({ task, index }) {
  const priority = priorityConfig[task.priority] || priorityConfig.P2;
  const effort = effortConfig[task.effort] || effortConfig.M;
  const type = typeConfig[task.type] || typeConfig.backend;

  return (
    <div 
      className="task-card-enter bg-bg-card border border-border rounded-xl p-5 hover:border-border-hover transition-all duration-200"
      style={{ animationDelay: `${index * 50}ms` }}
    >
      {/* Header with ID and badges */}
      <div className="flex items-start justify-between gap-3 mb-3">
        <span className="font-mono text-sm text-accent font-medium">{task.id}</span>
        <div className="flex flex-wrap gap-1.5">
          {/* Priority Badge */}
          <span className={`px-2 py-0.5 rounded-md text-xs font-medium ${priority.bg} ${priority.text} border ${priority.border}`}>
            {task.priority}
          </span>
          {/* Effort Badge */}
          <span className={`px-2 py-0.5 rounded-md text-xs font-medium ${effort.bg} ${effort.text}`}>
            {task.effort}
          </span>
          {/* Type Badge */}
          <span className={`px-2 py-0.5 rounded-md text-xs font-medium ${type.bg} ${type.text}`}>
            {task.type}
          </span>
        </div>
      </div>

      {/* Title */}
      <h3 className="text-base font-semibold text-text mb-2 leading-snug">
        {task.title}
      </h3>

      {/* Description */}
      <p className="text-sm text-text-muted leading-relaxed mb-4">
        {task.description}
      </p>

      {/* Acceptance Criteria */}
      {task.acceptanceCriteria && task.acceptanceCriteria.length > 0 && (
        <div className="mb-4">
          <h4 className="text-xs font-medium text-text-dim uppercase tracking-wider mb-2">
            Acceptance Criteria
          </h4>
          <ul className="space-y-1.5">
            {task.acceptanceCriteria.map((criterion, i) => (
              <li key={i} className="flex items-start gap-2 text-sm text-text-muted">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" className="text-accent flex-shrink-0 mt-0.5">
                  <path d="M20 6L9 17l-5-5" />
                </svg>
                {criterion}
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Dependencies */}
      {task.dependencies && task.dependencies.length > 0 && (
        <div className="pt-3 border-t border-border">
          <div className="flex items-center gap-2 text-xs text-text-dim">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
              <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
            </svg>
            <span>Depends on:</span>
            <span className="font-mono text-text-muted">
              {task.dependencies.join(', ')}
            </span>
          </div>
        </div>
      )}
    </div>
  );
}
