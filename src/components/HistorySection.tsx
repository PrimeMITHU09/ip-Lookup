import React from 'react';
import { History, Trash2, ArrowUpRight, Clock, Timer } from 'lucide-react';
import { HistoryItem } from '../types';

interface HistorySectionProps {
  history: HistoryItem[];
  onSelect: (ip: string) => void;
  onClear: () => void;
}

export const HistorySection: React.FC<HistorySectionProps> = ({
  history,
  onSelect,
  onClear,
}) => {
  if (history.length === 0) {
    return null;
  }

  const now = Date.now();

  return (
    <div id="history-section" className="w-full max-w-2xl mx-auto rounded-2xl border border-slate-800 bg-slate-900/90 shadow-2xl backdrop-blur-xl p-5 sm:p-7">
      <div className="flex flex-wrap items-center justify-between border-b border-slate-800/80 pb-4 mb-4 gap-2">
        <div className="flex items-center gap-2">
          <History className="h-4 w-4 text-cyan-400" />
          <h3 className="text-base font-bold text-white tracking-tight">
            Recent IP Lookups
          </h3>
          <span className="text-xs text-slate-500 font-mono">({history.length})</span>
        </div>

        <div className="flex items-center gap-2.5">
          {/* 30m Auto-clear notice */}
          <span className="inline-flex items-center gap-1 rounded-md bg-slate-950 px-2 py-0.5 text-[11px] font-medium text-cyan-400/90 border border-slate-800">
            <Timer className="h-3 w-3 text-cyan-400" />
            <span>Auto-clears after 30m</span>
          </span>

          <button
            onClick={onClear}
            className="flex items-center gap-1.5 rounded-lg border border-slate-800 bg-slate-950 px-2.5 py-1 text-xs font-medium text-slate-400 hover:border-rose-900 hover:text-rose-400 hover:bg-rose-950/20 transition-colors cursor-pointer"
          >
            <Trash2 className="h-3 w-3" />
            <span>Clear</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
        {history.map((item) => {
          // Calculate remaining minutes out of 30 minutes
          const ageMs = now - item.timestamp;
          const remainingMinutes = Math.max(1, Math.ceil((30 * 60 * 1000 - ageMs) / 60000));

          return (
            <button
              key={item.id}
              onClick={() => onSelect(item.ip)}
              className="group flex flex-col justify-between rounded-xl border border-slate-800/80 bg-slate-950/60 p-3 text-left hover:border-cyan-500/50 hover:bg-slate-950/90 hover:scale-[1.01] transition-all cursor-pointer"
            >
              <div>
                <div className="flex items-center justify-between">
                  <span className="font-mono text-xs font-semibold text-cyan-300 tabular-nums">
                    {item.ip}
                  </span>
                  <ArrowUpRight className="h-3.5 w-3.5 text-slate-500 group-hover:text-cyan-400 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
                </div>
                <div className="mt-1 text-sm font-bold text-slate-100 truncate">
                  {item.fullName}
                </div>
                <div className="text-xs text-slate-400 truncate">
                  {item.city}, {item.country}
                </div>
              </div>

              <div className="mt-2.5 flex items-center justify-between text-[11px] text-slate-500 border-t border-slate-900 pt-2">
                <span className="font-mono">{item.countryCode}</span>
                <span className="flex items-center gap-1 text-slate-400">
                  <Clock className="h-2.5 w-2.5 text-cyan-400/80" />
                  <span>Clears in {remainingMinutes}m</span>
                </span>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
};
