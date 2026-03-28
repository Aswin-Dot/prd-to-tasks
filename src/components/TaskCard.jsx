import React from 'react';

const priorityConfig = {
  P1: { color: '#ff5555', label: 'P1' },
  P2: { color: '#ffb347', label: 'P2' },
  P3: { color: '#50c878', label: 'P3' },
};

const effortConfig = {
  S: { color: '#50c878', label: 'S' },
  M: { color: '#ffb347', label: 'M' },
  L: { color: '#ff8c69', label: 'L' },
};

const typeConfig = {
  frontend: { color: '#61dafb' },
  backend: { color: '#68d391' },
  design: { color: '#f687b3' },
  infra: { color: '#ffa726' },
  research: { color: '#a78bfa' },
};

function Badge({ label, color }) {
  return (
    <span
      className="px-2.5 py-1 rounded-md text-xs font-semibold tracking-wide"
      style={{
        color,
        backgroundColor: `${color}15`,
        border: `1px solid ${color}30`,
      }}
    >
      {label}
    </span>
  );
}

export function TaskCard({ task, index }) {
  const priority = priorityConfig[task.priority] || priorityConfig.P2;
  const effort = effortConfig[task.effort] || effortConfig.M;
  const type = typeConfig[task.type] || typeConfig.backend;

  return (
    <div
      className="task-card-enter bg-bg-card border border-border rounded-xl p-5 hover:border-border-hover transition-all duration-200"
      style={{ animationDelay: `${index * 60}ms` }}
    >
      {/* Header */}
      <div className="flex items-start justify-between gap-3 mb-3">
        <span className="font-mono text-sm text-accent font-medium">{task.id}</span>
        <div className="flex flex-wrap gap-1.5">
          <Badge label={priority.label} color={priority.color} />
          <Badge label={effort.label} color={effort.color} />
          <Badge label={task.type} color={type.color} />
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
          <h4 className="text-xs font-semibold text-text-dim uppercase tracking-wider mb-2">
            Acceptance Criteria
          </h4>
          <ul className="space-y-1.5">
            {task.acceptanceCriteria.map((criterion, i) => (
              <li key={i} className="flex items-start gap-2 text-sm text-text-muted">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" className="text-accent flex-shrink-0 mt-0.5">
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
