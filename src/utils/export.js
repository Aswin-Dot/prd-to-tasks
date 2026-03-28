/**
 * Export tasks as Markdown
 */
export function exportAsMarkdown(tasks) {
  if (!tasks || tasks.length === 0) return '';
  
  let md = '# Development Tasks\n\n';
  
  // Group by priority
  const p1 = tasks.filter(t => t.priority === 'P1');
  const p2 = tasks.filter(t => t.priority === 'P2');
  const p3 = tasks.filter(t => t.priority === 'P3');
  
  const renderTask = (task) => {
    let output = `### ${task.id}: ${task.title}\n\n`;
    output += `**Priority:** ${task.priority} | **Effort:** ${task.effort} | **Type:** ${task.type}\n\n`;
    output += `${task.description}\n\n`;
    
    if (task.acceptanceCriteria && task.acceptanceCriteria.length > 0) {
      output += '**Acceptance Criteria:**\n';
      task.acceptanceCriteria.forEach(ac => {
        output += `- [ ] ${ac}\n`;
      });
      output += '\n';
    }
    
    if (task.dependencies && task.dependencies.length > 0) {
      output += `**Dependencies:** ${task.dependencies.join(', ')}\n\n`;
    }
    
    output += '---\n\n';
    return output;
  };
  
  if (p1.length > 0) {
    md += '## 🔴 P1 — Blocks Launch\n\n';
    p1.forEach(t => md += renderTask(t));
  }
  
  if (p2.length > 0) {
    md += '## 🟡 P2 — Important\n\n';
    p2.forEach(t => md += renderTask(t));
  }
  
  if (p3.length > 0) {
    md += '## 🟢 P3 — Nice to Have\n\n';
    p3.forEach(t => md += renderTask(t));
  }
  
  return md;
}

/**
 * Export tasks as JSON
 */
export function exportAsJSON(tasks) {
  return JSON.stringify(tasks, null, 2);
}

/**
 * Export tasks in Notion-friendly format
 */
export function exportForNotion(tasks) {
  if (!tasks || tasks.length === 0) return '';
  
  let output = '| ID | Title | Priority | Effort | Type | Description | Acceptance Criteria | Dependencies |\n';
  output += '|---|---|---|---|---|---|---|---|\n';
  
  tasks.forEach(task => {
    const ac = task.acceptanceCriteria?.join('; ') || '';
    const deps = task.dependencies?.join(', ') || 'None';
    output += `| ${task.id} | ${task.title} | ${task.priority} | ${task.effort} | ${task.type} | ${task.description} | ${ac} | ${deps} |\n`;
  });
  
  return output;
}

/**
 * Copy text to clipboard
 */
export async function copyToClipboard(text) {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch (err) {
    console.error('Failed to copy:', err);
    return false;
  }
}

/**
 * Download text as a file
 */
export function downloadFile(content, filename, type = 'application/json') {
  const blob = new Blob([content], { type });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

/**
 * Calculate sprint estimate based on tasks
 */
export function calculateSprintEstimate(tasks, sprintLength = '2 weeks') {
  if (!tasks || tasks.length === 0) return null;
  
  const effortDays = {
    'S': 0.5,
    'M': 2,
    'L': 4
  };
  
  const sprintDays = {
    '1 week': 5,
    '2 weeks': 10,
    '4 weeks': 20
  };
  
  const totalDays = tasks.reduce((sum, task) => {
    return sum + (effortDays[task.effort] || 2);
  }, 0);
  
  const daysPerSprint = sprintDays[sprintLength] || 10;
  const minSprints = Math.ceil(totalDays / daysPerSprint);
  const maxSprints = Math.ceil(totalDays * 1.3 / daysPerSprint); // 30% buffer
  
  return {
    minSprints,
    maxSprints,
    totalDays
  };
}
