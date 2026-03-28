import { useState, useCallback, useRef } from 'react';
import { SYSTEM_PROMPT } from '../utils/constants';

export function useClaudeStream() {
  const [tasks, setTasks] = useState([]);
  const [isGenerating, setIsGenerating] = useState(false);
  const [error, setError] = useState(null);
  const [rawOutput, setRawOutput] = useState('');
  const abortControllerRef = useRef(null);

  const generateTasks = useCallback(async (prdText, context, apiKey, model) => {
    if (!apiKey) {
      setError('Please add your Anthropic API key in Settings');
      return;
    }

    if (!prdText.trim()) {
      setError('Please enter a product requirement');
      return;
    }

    setIsGenerating(true);
    setError(null);
    setTasks([]);
    setRawOutput('');

    // Create abort controller for cancellation
    abortControllerRef.current = new AbortController();

    try {
      const response = await fetch('https://api.anthropic.com/v1/messages', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-api-key': apiKey,
          'anthropic-version': '2023-06-01',
          'anthropic-dangerous-direct-browser-access': 'true'
        },
        signal: abortControllerRef.current.signal,
        body: JSON.stringify({
          model: model || 'claude-opus-4-20250514',
          max_tokens: 4000,
          stream: true,
          system: SYSTEM_PROMPT,
          messages: [
            {
              role: 'user',
              content: `Here is the product requirement:\n\n${prdText}\n\nContext:\n- Team size: ${context.teamSize || 'Not specified'}\n- Tech stack: ${context.stack || 'Not specified'}\n- Sprint length: ${context.sprintLength || '2 weeks'}\n- Platform: ${context.platform || 'Not specified'}\n\nBreak this into development tasks.`
            }
          ]
        })
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.error?.message || `API error: ${response.status}`);
      }

      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      let fullText = '';

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        const chunk = decoder.decode(value, { stream: true });
        const lines = chunk.split('\n');

        for (const line of lines) {
          if (line.startsWith('data: ')) {
            const data = line.slice(6);
            if (data === '[DONE]') continue;

            try {
              const parsed = JSON.parse(data);
              
              if (parsed.type === 'content_block_delta' && parsed.delta?.text) {
                fullText += parsed.delta.text;
                setRawOutput(fullText);

                // Try to parse completed tasks as we receive them
                try {
                  // Look for complete task objects in the stream
                  const cleanedText = fullText.trim();
                  if (cleanedText.startsWith('[')) {
                    // Try to find complete task objects
                    const taskMatches = cleanedText.match(/\{[^{}]*(?:\{[^{}]*\}[^{}]*)*\}/g);
                    if (taskMatches) {
                      const parsedTasks = [];
                      for (const match of taskMatches) {
                        try {
                          const task = JSON.parse(match);
                          if (task.id && task.title) {
                            parsedTasks.push(task);
                          }
                        } catch {
                          // Not a complete task yet
                        }
                      }
                      if (parsedTasks.length > 0) {
                        setTasks(parsedTasks);
                      }
                    }
                  }
                } catch {
                  // JSON not complete yet, continue
                }
              }

              if (parsed.type === 'message_stop') {
                // Final parse of complete response
                try {
                  const cleanedFinal = fullText.trim();
                  const finalTasks = JSON.parse(cleanedFinal);
                  if (Array.isArray(finalTasks)) {
                    setTasks(finalTasks);
                  }
                } catch (parseError) {
                  console.error('Final parse error:', parseError);
                  setError('Failed to parse task output. The AI response was not valid JSON.');
                }
              }
            } catch {
              // Not valid JSON, skip
            }
          }
        }
      }
    } catch (err) {
      if (err.name === 'AbortError') {
        setError('Generation cancelled');
      } else {
        setError(err.message || 'Failed to generate tasks');
      }
    } finally {
      setIsGenerating(false);
      abortControllerRef.current = null;
    }
  }, []);

  const cancelGeneration = useCallback(() => {
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }
  }, []);

  const clearTasks = useCallback(() => {
    setTasks([]);
    setRawOutput('');
    setError(null);
  }, []);

  return {
    tasks,
    isGenerating,
    error,
    rawOutput,
    generateTasks,
    cancelGeneration,
    clearTasks
  };
}
