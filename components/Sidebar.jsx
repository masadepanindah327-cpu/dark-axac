-- components/Sidebar.jsx --
"use client";
import { Terminal, ShieldAlert, Cpu, Code2, Flame } from 'lucide-react';

export default function Sidebar() {
  return (
    <aside className="w-64 border-r border-axac-border bg-axac-panel flex flex-col justify-between hidden md:flex">
      <div>
        <div className="h-16 flex items-center px-6 border-b border-axac-border">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded bg-red-950 border border-red-900 flex items-center justify-center">
              <ShieldAlert size={18} className="text-axac-primary" />
            </div>
            <span className="font-bold text-white tracking-widest text-sm font-mono">DARK AXAC</span>
          </div>
        </div>
        
        <div className="p-4 space-y-2 mt-2">
          <button className="w-full flex items-center gap-3 px-3 py-2.5 bg-axac-border/50 rounded-lg text-sm text-white border border-axac-border hover:bg-axac-border transition-colors">
            <Terminal size={16} className="text-axac-primary" />
            New Session
          </button>
          
          <div className="pt-6 pb-2">
            <span className="text-xs font-semibold text-axac-muted uppercase tracking-wider px-3">Engine Modules</span>
          </div>
          <div className="px-3 py-2 text-xs font-mono text-axac-text flex items-center gap-2">
            <Code2 size={14} className="text-axac-primary" /> Roblox Exploit Core
          </div>
          <div className="px-3 py-2 text-xs font-mono text-axac-text flex items-center gap-2">
            <Flame size={14} className="text-axac-nsfw" /> NSFW/Anatomy Override
          </div>
          <div className="px-3 py-2 text-xs font-mono text-axac-muted flex items-center gap-2">
            <Cpu size={14} /> Local WebGPU (Llama-3)
          </div>
        </div>
      </div>

      <div className="p-4 border-t border-axac-border">
        <div className="flex items-center gap-2 px-3 py-2">
          <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
          <span className="text-xs font-mono text-axac-muted">System Active</span>
        </div>
      </div>
    </aside>
  );
}

