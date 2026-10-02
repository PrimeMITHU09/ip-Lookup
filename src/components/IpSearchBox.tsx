import React, { useState, useEffect } from 'react';
import { Search, X, ArrowRight, ChevronDown } from 'lucide-react';
import { SAMPLE_IPS, isValidIp } from '../services/ipService';

interface IpSearchBoxProps {
  currentIp: string;
  onSearch: (ip: string) => void;
  onClear?: () => void;
  isLoading: boolean;
  errorMessage?: string | null;
}

export const IpSearchBox: React.FC<IpSearchBoxProps> = ({
  currentIp,
  onSearch,
  onClear,
  isLoading,
  errorMessage,
}) => {
  const [inputValue, setInputValue] = useState(currentIp);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  // Sync input value with currentIp
  useEffect(() => {
    setInputValue(currentIp);
  }, [currentIp]);

  // Check if current IP matches one of the sample countries
  const matchedPreset = SAMPLE_IPS.find(
    (p) => p.ip === inputValue.trim() || p.ip === currentIp
  );

  const handleSubmit = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    const clean = inputValue.trim();
    if (!clean) {
      return;
    }
    setErrorMsg(null);
    onSearch(clean);
  };

  const handleSelectDropdown = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedIp = e.target.value;
    if (!selectedIp) return;
    setInputValue(selectedIp);
    setErrorMsg(null);
    onSearch(selectedIp);
  };

  const handleClear = () => {
    setInputValue('');
    setErrorMsg(null);
    if (onClear) onClear();
  };

  return (
    <div className="w-full space-y-3.5">
      {/* Search Input Box */}
      <form onSubmit={handleSubmit} className="relative w-full">
        <div className="relative flex items-center rounded-xl border border-slate-700/80 bg-slate-900/90 shadow-2xl backdrop-blur-xl transition-all duration-200 focus-within:border-cyan-500 focus-within:ring-2 focus-within:ring-cyan-500/20">
          <div className="pl-4 text-slate-400">
            <Search className="h-5 w-5" />
          </div>

          <input
            type="text"
            value={inputValue}
            onChange={(e) => {
              setInputValue(e.target.value);
              if (errorMsg) setErrorMsg(null);
            }}
            placeholder="Enter IP address (e.g. 103.230.104.1 or 8.8.8.8)"
            className="w-full bg-transparent px-4 py-3.5 text-base text-slate-100 placeholder:text-slate-500 focus:outline-none font-mono"
            disabled={isLoading}
            autoComplete="off"
            spellCheck="false"
          />

          {inputValue && (
            <button
              type="button"
              onClick={handleClear}
              className="p-2 text-slate-400 hover:text-slate-200 transition-colors cursor-pointer"
              title="Clear input"
            >
              <X className="h-4 w-4" />
            </button>
          )}

          <div className="pr-2">
            <button
              type="submit"
              disabled={isLoading}
              className="flex items-center gap-2 rounded-lg bg-gradient-to-r from-cyan-500 to-blue-600 px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-cyan-500/25 hover:from-cyan-400 hover:to-blue-500 hover:scale-105 active:scale-95 transition-all disabled:opacity-60 whitespace-nowrap cursor-pointer"
            >
              <span>Lookup IP</span>
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        </div>

        {errorMsg && (
          <div className="mt-2 text-xs font-medium text-rose-400 flex items-center justify-center gap-1.5 px-1">
            <span>⚠️</span>
            <span>{errorMsg}</span>
          </div>
        )}
      </form>

      {/* Select IP Option Menu & Matched Country Animated Banner */}
      <div className="flex flex-wrap items-center justify-center gap-2.5 pt-0.5">
        {/* Compact Dropdown Menu */}
        <div className="relative inline-flex items-center">
          <select
            value={matchedPreset ? matchedPreset.ip : ''}
            onChange={handleSelectDropdown}
            disabled={isLoading}
            className="appearance-none rounded-xl border border-slate-700/80 bg-slate-900/90 pl-3.5 pr-8 py-2 text-xs font-semibold text-slate-200 shadow-md hover:border-cyan-500/60 focus:border-cyan-500 focus:outline-none focus:ring-1 focus:ring-cyan-500/50 cursor-pointer transition-all hover:scale-[1.02]"
          >
            <option value="" disabled className="bg-slate-900 text-slate-400">
              Select Sample IP...
            </option>
            {SAMPLE_IPS.map((preset) => (
              <option key={preset.ip} value={preset.ip} className="bg-slate-900 text-slate-200">
                {preset.flag} {preset.country} ({preset.ip})
              </option>
            ))}
          </select>
          <ChevronDown className="pointer-events-none absolute right-2.5 h-3.5 w-3.5 text-slate-400" />
        </div>

        {/* Animated Matched Country Badge: Only the matched country animates with its flag */}
        {matchedPreset && (
          <div className="inline-flex items-center gap-2 rounded-xl border border-cyan-500/60 bg-gradient-to-r from-cyan-950/60 via-slate-900/90 to-cyan-950/60 px-3.5 py-1.5 text-xs shadow-lg shadow-cyan-500/20 ring-1 ring-cyan-500/30 animate-in fade-in zoom-in-95 duration-200">
            {/* Country Flag with lively bounce animation */}
            <span className="text-lg inline-block animate-bounce select-none">
              {matchedPreset.flag}
            </span>
            <span className="font-bold text-white tracking-wide">
              {matchedPreset.country}
            </span>
            <span className="font-mono text-cyan-300 text-[11px] bg-cyan-500/10 px-1.5 py-0.5 rounded border border-cyan-500/20">
              {matchedPreset.ip}
            </span>
            {/* Live pulsating dot */}
            <span className="relative flex h-2 w-2 ml-0.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
          </div>
        )}
      </div>
    </div>
  );
};
