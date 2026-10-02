import React from 'react';
import { Globe } from 'lucide-react';

export const Header: React.FC = () => {
  return (
    <header className="sticky top-0 z-40 w-full border-b border-slate-800/80 bg-slate-950/90 backdrop-blur-md py-3.5 px-4">
      <div className="max-w-2xl mx-auto flex flex-wrap items-center justify-center gap-x-6 gap-y-3 text-center">
        {/* Brand: Centered */}
        <div className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-cyan-500/10 text-cyan-400 border border-cyan-500/30">
            <Globe className="h-4 w-4" />
          </div>
          <span className="text-base font-bold tracking-tight text-white flex items-center gap-1.5">
            LookupIP Tools
            <span className="h-1.5 w-1.5 rounded-full bg-cyan-400"></span>
          </span>
        </div>

        {/* Clean Nav Links: Centered */}
        <nav className="flex items-center gap-4 sm:gap-6 text-xs sm:text-sm font-medium text-slate-400">
          <a href="#lookup-section" className="hover:text-cyan-300 transition-colors">
            IP Lookup
          </a>
          <a href="#identity-section" className="hover:text-cyan-300 transition-colors">
            Identity Details
          </a>
          <a href="#network-section" className="hover:text-cyan-300 transition-colors">
            Network & Map
          </a>
          <a href="#history-section" className="hover:text-cyan-300 transition-colors">
            History
          </a>
        </nav>
      </div>
    </header>
  );
};
