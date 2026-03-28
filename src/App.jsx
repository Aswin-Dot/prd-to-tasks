import React, { useState } from 'react';
import { Header } from './components/Header';
import { SettingsPanel } from './components/SettingsPanel';
import { InputPanel } from './components/InputPanel';
import { OutputPanel } from './components/OutputPanel';
import { ApiKeyBanner } from './components/ApiKeyBanner';
import { useLocalStorage } from './hooks/useLocalStorage';
import { useClaudeStream } from './hooks/useClaudeStream';
import { DEFAULT_MODEL } from './utils/constants';

function App() {
  // Settings state
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [apiKey, setApiKey] = useLocalStorage('prd-to-tasks-api-key', '');
  const [model, setModel] = useLocalStorage('prd-to-tasks-model', DEFAULT_MODEL);

  // Input state
  const [prdText, setPrdText] = useState('');
  const [context, setContext] = useState({
    teamSize: '',
    stack: '',
    sprintLength: '2 weeks',
    platform: ''
  });

  // Task generation
  const { 
    tasks, 
    isGenerating, 
    error, 
    generateTasks, 
    cancelGeneration,
    clearTasks 
  } = useClaudeStream();

  const handleGenerate = () => {
    clearTasks();
    generateTasks(prdText, context, apiKey, model);
  };

  return (
    <div className="min-h-screen bg-bg noise-overlay">
      <Header onSettingsClick={() => setSettingsOpen(true)} />
      
      <SettingsPanel
        isOpen={settingsOpen}
        onClose={() => setSettingsOpen(false)}
        apiKey={apiKey}
        setApiKey={setApiKey}
        model={model}
        setModel={setModel}
      />

      <main className="pt-[72px] min-h-screen">
        <div className="max-w-[1600px] mx-auto px-6 py-8">
          {/* API Key Banner */}
          {!apiKey && (
            <ApiKeyBanner onSettingsClick={() => setSettingsOpen(true)} />
          )}

          {/* Two-panel layout */}
          <div className="grid lg:grid-cols-2 gap-6 lg:gap-8">
            {/* Left Panel - Input */}
            <div className="bg-bg-surface border border-border rounded-2xl p-6 lg:p-8 min-h-[600px]">
              <InputPanel
                prdText={prdText}
                setPrdText={setPrdText}
                context={context}
                setContext={setContext}
                onGenerate={handleGenerate}
                isGenerating={isGenerating}
                onCancel={cancelGeneration}
              />
            </div>

            {/* Right Panel - Output */}
            <div className="bg-bg-surface border border-border rounded-2xl p-6 lg:p-8 min-h-[600px]">
              <OutputPanel
                tasks={tasks}
                isGenerating={isGenerating}
                error={error}
                sprintLength={context.sprintLength}
              />
            </div>
          </div>

          {/* Footer */}
          <footer className="mt-12 text-center text-sm text-text-dim">
            <p>
              Built with Claude API by Anthropic · 
              <a
                href="https://github.com/Aswin-Dot/prd-to-tasks"
                target="_blank"
                rel="noopener noreferrer"
                className="text-text-muted hover:text-accent transition-colors ml-1"
              >
                View on GitHub
              </a>
            </p>
          </footer>
        </div>
      </main>
    </div>
  );
}

export default App;
