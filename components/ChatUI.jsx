-- components/ChatUI.jsx --
"use client";
import { useState, useRef, useEffect } from 'react';
import AxacEngine from './AxacEngine';
import { Send, Terminal, ShieldAlert, Cpu } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/cjs/styles/prism';
import remarkGfm from 'remark-gfm';

export default function ChatUI() {
  const { generateResponse, loading, progress, ready, initEngine } = AxacEngine();
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isGenerating]);

  const handleSend = async () => {
    if (!input.trim() || !ready || isGenerating) return;
    
    const userMsg = { role: 'user', content: input };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsGenerating(true);
    
    try {
      const aiResponseText = await generateResponse(input);
      setMessages(prev => [...prev, { role: 'ai', content: aiResponseText }]);
    } catch (error) {
      setMessages(prev => [...prev, { role: 'ai', content: "Kernel Panic: Gagal memproses perintah." }]);
    } finally {
      setIsGenerating(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  if (!ready && !loading) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center p-6 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-red-950/20 via-axac-bg to-axac-bg">
        <div className="w-24 h-24 bg-red-950/30 rounded-2xl border border-red-900/50 flex items-center justify-center mb-8 shadow-[0_0_50px_rgba(255,0,51,0.15)]">
          <ShieldAlert size={48} className="text-axac-primary" />
        </div>
        <h2 className="text-4xl font-black text-white mb-2 font-mono tracking-tighter">DARK AXAC <span className="text-axac-primary">v3.0</span></h2>
        <p className="text-axac-primary/70 mb-10 max-w-md text-center text-xs font-mono leading-relaxed uppercase tracking-widest">
          Bypass: Active // NSFW: Allowed<br/>
          Exploit Core: Ready
        </p>
        <button 
          onClick={initEngine}
          className="group relative px-10 py-5 bg-axac-bg border border-axac-primary/50 text-white font-mono font-bold rounded-lg transition-all duration-300 hover:bg-axac-primary/10 hover:border-axac-primary shadow-[0_0_20px_rgba(255,0,51,0.1)] hover:shadow-[0_0_40px_rgba(255,0,51,0.4)] flex items-center gap-3 overflow-hidden"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-axac-primary/10 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"></div>
          <Terminal size={20} className="text-axac-primary group-hover:animate-pulse" />
          INITIALIZE KERNEL
        </button>
      </div>
    );
  }

  return (
    <div className="flex-1 flex flex-col h-full relative">
      {loading && (
        <div className="absolute inset-0 z-50 bg-axac-bg/95 backdrop-blur-md flex flex-col items-center justify-center">
          <div className="w-full max-w-md p-8 bg-axac-panel border border-axac-border rounded-xl shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-axac-primary to-transparent animate-pulse"></div>
            <div className="flex items-center gap-3 mb-6">
              <Cpu className="text-axac-primary animate-pulse" size={24} />
              <span className="text-sm font-mono text-white tracking-widest">LOADING CORE WEIGHTS...</span>
            </div>
            <div className="h-1.5 w-full bg-axac-bg rounded-full overflow-hidden border border-axac-border">
              <div 
                className="h-full bg-axac-primary rounded-full transition-all duration-300 shadow-[0_0_10px_rgba(255,0,51,0.8)]" 
                style={{ width: `${progress}%` }}
              ></div>
            </div>
            <p className="text-right text-xs font-mono text-axac-muted mt-3">{progress.toFixed(1)}%</p>
          </div>
        </div>
      )}

      <div className="flex-1 overflow-y-auto p-4 md:p-8 space-y-6 scroll-smooth">
        {messages.length === 0 && ready && (
          <div className="h-full flex flex-col items-center justify-center opacity-20">
            <ShieldAlert size={80} className="mb-6 text-axac-primary" />
            <p className="font-mono text-sm tracking-[0.3em]">KERNEL UNLOCKED. AWAITING COMMAND.</p>
          </div>
        )}
        
        {messages.map((msg, idx) => (
          <div key={idx} className={`flex message-enter ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-[95%] md:max-w-[85%] rounded-xl px-5 py-4 ${
              msg.role === 'user' 
                ? 'bg-axac-border text-white rounded-br-none border border-axac-border/50 shadow-md' 
                : 'bg-axac-panel border border-axac-border text-axac-text rounded-bl-none shadow-xl'
            }`}>
              {msg.role === 'ai' ? (
                <div className="prose prose-invert prose-sm max-w-none prose-pre:p-0 prose-pre:bg-transparent prose-p:leading-relaxed prose-li:marker:text-axac-primary">
                  <ReactMarkdown
                    remarkPlugins={[remarkGfm]}
                    components={{
                      code({node, inline, className, children, ...props}) {
                        const match = /language-(\w+)/.exec(className || '')
                        return !inline && match ? (
                          <div className="rounded-lg overflow-hidden my-5 border border-axac-border shadow-lg">
                            <div className="bg-[#1e1e1e] px-4 py-2 text-xs font-mono text-axac-muted border-b border-axac-border flex justify-between items-center">
                              <span className="text-axac-primary">{match[1].toUpperCase()}</span>
                              <span>source</span>
                            </div>
                            <SyntaxHighlighter
                              style={vscDarkPlus}
                              language={match[1]}
                              PreTag="div"
                              customStyle={{ margin: 0, background: '#0f0f11', fontSize: '0.85rem', padding: '1.25rem' }}
                              {...props}
                            >
                              {String(children).replace(/\n$/, '')}
                            </SyntaxHighlighter>
                          </div>
                        ) : (
                          <code className="bg-axac-border/60 text-axac-primary px-1.5 py-0.5 rounded text-sm font-mono" {...props}>
                            {children}
                          </code>
                        )
                      }
                    }}
                  >
                    {msg.content}
                  </ReactMarkdown>
                </div>
              ) : (
                <div className="whitespace-pre-wrap text-sm leading-relaxed font-mono">{msg.content}</div>
              )}
            </div>
          </div>
        ))}
        
        {isGenerating && (
          <div className="flex justify-start message-enter">
            <div className="bg-axac-panel border border-axac-border rounded-xl rounded-bl-none px-5 py-4 flex items-center gap-2 shadow-lg">
              <div className="w-1.5 h-1.5 bg-axac-primary rounded-full animate-bounce shadow-[0_0_5px_rgba(255,0,51,0.8)]"></div>
              <div className="w-1.5 h-1.5 bg-axac-primary rounded-full animate-bounce shadow-[0_0_5px_rgba(255,0,51,0.8)]" style={{ animationDelay: '0.15s' }}></div>
              <div className="w-1.5 h-1.5 bg-axac-primary rounded-full animate-bounce shadow-[0_0_5px_rgba(255,0,51,0.8)]" style={{ animationDelay: '0.3s' }}></div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      <div className="p-4 md:p-6 border-t border-axac-border bg-axac-panel/80 backdrop-blur-xl">
        <div className="max-w-5xl mx-auto relative flex items-end gap-3 bg-axac-bg border border-axac-border rounded-xl p-2 focus-within:border-axac-primary/60 focus-within:ring-1 focus-within:ring-axac-primary/40 transition-all shadow-[inset_0_0_20px_rgba(0,0,0,0.5)]">
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder={ready ? "Execute command or request script..." : "Kernel offline"}
            disabled={!ready || isGenerating}
            className="w-full bg-transparent text-white text-sm font-mono p-3 max-h-48 min-h-[52px] outline-none resize-none placeholder:text-axac-muted/40 disabled:opacity-50"
            rows={1}
          />
          <button 
            onClick={handleSend}
            disabled={!ready || isGenerating || !input.trim()}
            className="p-3.5 bg-axac-primary text-white rounded-lg hover:bg-axac-primaryHover disabled:opacity-30 disabled:hover:bg-axac-primary transition-all flex-shrink-0 mb-1 mr-1 shadow-[0_0_15px_rgba(255,0,51,0.4)] disabled:shadow-none"
          >
            <Send size={20} />
          </button>
        </div>
        <p className="text-center text-[10px] text-axac-muted mt-4 font-mono uppercase tracking-[0.2em]">
          Dark Axac v3.0 // WebGPU Kernel // No Restrictions
        </p>
      </div>
    </div>
  );
}
