import React, { useState } from 'react';
import {
  User,
  Mail,
  MapPin,
  Phone,
  Building,
  Copy,
  Check,
  RefreshCw,
  Download,
  FileText,
  AlignLeft,
  List,
  ExternalLink
} from 'lucide-react';
import { PersonIdentity, GeoLocationData } from '../types';
import { exportToJson, exportToVcf, formatFullText } from '../utils/formatters';

interface IdentityCardProps {
  identity: PersonIdentity;
  geo: GeoLocationData;
  onRegenerate: (gender: 'all' | 'male' | 'female') => void;
  isRegenerating?: boolean;
}

export const IdentityCard: React.FC<IdentityCardProps> = ({
  identity,
  geo,
  onRegenerate,
  isRegenerating = false,
}) => {
  const [copiedField, setCopiedField] = useState<string | null>(null);
  const [copiedAll, setCopiedAll] = useState(false);
  const [selectedGender, setSelectedGender] = useState<'all' | 'male' | 'female'>('all');
  const [viewMode, setViewMode] = useState<'lines' | 'raw'>('lines');

  const copyToClipboard = (text: string, fieldName: string) => {
    navigator.clipboard.writeText(text);
    setCopiedField(fieldName);
    setTimeout(() => {
      setCopiedField(null);
    }, 1800);
  };

  const handleCopyAll = () => {
    const formatted = formatFullText(identity, geo);
    navigator.clipboard.writeText(formatted);
    setCopiedAll(true);
    setTimeout(() => {
      setCopiedAll(false);
    }, 2000);
  };

  const handleGenderChange = (gender: 'all' | 'male' | 'female') => {
    setSelectedGender(gender);
    onRegenerate(gender);
  };

  // Line-by-line items tailored precisely to the user's brief:
  // "fairst name last name street citry state mail egulo"
  const lines = [
    {
      id: 'firstName',
      label: 'First Name',
      value: identity.firstName,
      icon: User,
      primary: true,
    },
    {
      id: 'lastName',
      label: 'Last Name',
      value: identity.lastName,
      icon: User,
      primary: true,
    },
    {
      id: 'street',
      label: 'Street Address',
      value: identity.streetAddress,
      icon: MapPin,
      primary: true,
    },
    {
      id: 'city',
      label: 'City',
      value: identity.city,
      icon: Building,
      primary: true,
    },
    {
      id: 'state',
      label: 'State / Region',
      value: identity.state,
      icon: MapPin,
      primary: true,
    },
    {
      id: 'email',
      label: 'Email (Mail)',
      value: identity.email,
      icon: Mail,
      primary: true,
    },
    {
      id: 'postal',
      label: 'Postal / ZIP Code',
      value: identity.postalCode,
      icon: MapPin,
      isMono: true,
    },
    {
      id: 'phone',
      label: 'Phone Number',
      value: identity.phone,
      icon: Phone,
      isMono: true,
    },
    {
      id: 'country',
      label: 'Country',
      value: `${geo.country} (${geo.countryCode})`,
      icon: Building,
      primary: true,
    },
  ];

  const rawCleanText = lines
    .map(line => `${line.label}: ${line.value}`)
    .join('\n');

  return (
    <div id="identity-section" className="w-full max-w-2xl mx-auto rounded-2xl border border-slate-800 bg-slate-900/95 shadow-2xl backdrop-blur-xl p-5 sm:p-7 transition-all">
      {/* Country Header Centered */}
      <div className="text-center pb-5 border-b border-slate-800/80">
        <div className="inline-flex items-center justify-center gap-2 mb-2">
          {geo.countryFlag ? (
            <img
              src={geo.countryFlag}
              alt={geo.country}
              className="w-7 h-5 rounded object-cover shadow-md border border-slate-700/60 inline-block"
            />
          ) : (
            <span className="text-2xl">🌐</span>
          )}
          <span className="text-xl sm:text-2xl font-extrabold text-white tracking-tight">
            {geo.country}
          </span>
          <span className="text-xs px-2 py-0.5 rounded-full bg-cyan-500/10 text-cyan-400 font-mono border border-cyan-500/20">
            {geo.ip}
          </span>
        </div>

        <p className="text-xs sm:text-sm text-slate-400">
          📍 {geo.city}, {geo.region} · {geo.isp}
        </p>

        {/* Action Controls in Center */}
        <div className="mt-4 flex flex-wrap items-center justify-center gap-2.5">
          {/* Big One-Click Copy All */}
          <button
            onClick={handleCopyAll}
            className={`flex items-center gap-2 rounded-xl px-5 py-2.5 text-xs sm:text-sm font-bold shadow-lg transition-all duration-150 cursor-pointer hover:scale-105 active:scale-95 ${
              copiedAll
                ? 'bg-emerald-500 text-white shadow-emerald-500/25 ring-2 ring-emerald-400'
                : 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white hover:from-cyan-400 hover:to-blue-500 shadow-cyan-500/25 hover:shadow-cyan-500/40'
            }`}
          >
            {copiedAll ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
            <span>{copiedAll ? 'Copied All!' : 'Copy All Lines'}</span>
          </button>

          {/* Regenerate New Persona */}
          <button
            onClick={() => onRegenerate(selectedGender)}
            disabled={isRegenerating}
            className="flex items-center gap-1.5 rounded-xl border border-slate-700 bg-slate-800 px-4 py-2.5 text-xs sm:text-sm font-semibold text-slate-200 hover:border-cyan-500/60 hover:text-cyan-300 hover:bg-slate-700 hover:scale-105 active:scale-95 transition-all duration-150 disabled:opacity-50 cursor-pointer shadow-sm"
          >
            <RefreshCw className={`h-4 w-4 text-cyan-400 ${isRegenerating ? 'animate-spin' : ''}`} />
            <span>Generate New</span>
          </button>

          {/* Gender Filter */}
          <div className="flex items-center rounded-xl border border-slate-800 bg-slate-950 p-1 text-xs">
            <button
              onClick={() => handleGenderChange('all')}
              className={`rounded-lg px-2.5 py-1.5 font-medium transition-all duration-150 cursor-pointer hover:scale-105 active:scale-95 ${
                selectedGender === 'all'
                  ? 'bg-cyan-500/20 text-cyan-300 font-semibold'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              All
            </button>
            <button
              onClick={() => handleGenderChange('male')}
              className={`rounded-lg px-2.5 py-1.5 font-medium transition-all duration-150 cursor-pointer hover:scale-105 active:scale-95 ${
                selectedGender === 'male'
                  ? 'bg-cyan-500/20 text-cyan-300 font-semibold'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              Male
            </button>
            <button
              onClick={() => handleGenderChange('female')}
              className={`rounded-lg px-2.5 py-1.5 font-medium transition-all duration-150 cursor-pointer hover:scale-105 active:scale-95 ${
                selectedGender === 'female'
                  ? 'bg-cyan-500/20 text-cyan-300 font-semibold'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              Female
            </button>
          </div>

          {/* View Mode Toggle (Line by line vs Raw Block) */}
          <div className="flex items-center rounded-xl border border-slate-800 bg-slate-950 p-1 text-xs">
            <button
              onClick={() => setViewMode('lines')}
              className={`flex items-center gap-1 rounded-lg px-2.5 py-1.5 font-medium transition-all duration-150 cursor-pointer hover:scale-105 active:scale-95 ${
                viewMode === 'lines'
                  ? 'bg-slate-800 text-cyan-300 font-semibold'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
              title="Line by line view"
            >
              <List className="h-3.5 w-3.5" />
              <span>Lines</span>
            </button>
            <button
              onClick={() => setViewMode('raw')}
              className={`flex items-center gap-1 rounded-lg px-2.5 py-1.5 font-medium transition-all duration-150 cursor-pointer hover:scale-105 active:scale-95 ${
                viewMode === 'raw'
                  ? 'bg-slate-800 text-cyan-300 font-semibold'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
              title="Raw text block"
            >
              <AlignLeft className="h-3.5 w-3.5" />
              <span>Text</span>
            </button>
          </div>
        </div>
      </div>

      {/* Raw Text Block View */}
      {viewMode === 'raw' ? (
        <div className="mt-5 space-y-3">
          <div className="flex items-center justify-between text-xs text-slate-400 px-1">
            <span>Select or copy all text below:</span>
            <button
              onClick={() => copyToClipboard(rawCleanText, 'raw_all')}
              className="flex items-center gap-1 text-cyan-400 hover:text-cyan-300 font-semibold cursor-pointer hover:scale-105 active:scale-95 transition-all"
            >
              {copiedField === 'raw_all' ? <Check className="h-3.5 w-3.5 text-emerald-400" /> : <Copy className="h-3.5 w-3.5" />}
              <span>{copiedField === 'raw_all' ? 'Copied!' : 'Copy Text'}</span>
            </button>
          </div>
          <pre className="w-full rounded-xl border border-slate-800 bg-slate-950 p-4 font-mono text-xs sm:text-sm text-slate-200 whitespace-pre-wrap leading-relaxed select-all">
            {rawCleanText}
          </pre>
        </div>
      ) : (
        /* Line by line centered interactive rows with hover animation */
        <div className="mt-5 space-y-2">
          {lines.map((line) => {
            const isCopied = copiedField === line.id;
            const Icon = line.icon;

            return (
              <div
                key={line.id}
                onClick={() => copyToClipboard(line.value, line.id)}
                title="Click anywhere to copy"
                className={`group relative flex items-center justify-between gap-3 rounded-xl border px-4 py-3 transition-all duration-200 cursor-pointer hover:scale-[1.015] hover:-translate-y-0.5 hover:shadow-lg ${
                  line.primary
                    ? 'border-slate-800 bg-slate-950/80 hover:border-cyan-500/60 hover:bg-slate-900/90 hover:shadow-cyan-500/10'
                    : 'border-slate-800/60 bg-slate-950/40 hover:border-slate-700 hover:bg-slate-900/60'
                } ${isCopied ? 'border-emerald-500/70 bg-emerald-950/30' : ''}`}
              >
                {/* Left: Label with Icon */}
                <div className="flex items-center gap-2.5 min-w-[130px] sm:min-w-[150px] shrink-0">
                  <div className={`p-1.5 rounded-lg transition-transform duration-200 group-hover:scale-110 ${line.primary ? 'bg-cyan-500/10 text-cyan-400' : 'bg-slate-800/60 text-slate-400'}`}>
                    <Icon className="h-4 w-4" />
                  </div>
                  <span className="text-xs font-semibold text-slate-400 group-hover:text-slate-200 transition-colors">
                    {line.label}
                  </span>
                </div>

                {/* Center / Right: Value */}
                <div className="flex-1 text-right sm:text-left overflow-hidden">
                  <span className={`text-xs sm:text-sm font-bold text-slate-100 truncate block group-hover:text-cyan-200 transition-colors select-all ${
                    line.isMono ? 'font-mono text-cyan-300' : ''
                  }`}>
                    {line.value}
                  </span>
                </div>

                {/* Far Right: Copy Button & Homes.com real estate link */}
                <div className="shrink-0 pl-1 flex items-center gap-1.5">
                  {line.id === 'street' && (
                    <a
                      href="https://www.homes.com/?msockid=38af4073e4e16c3900775792e5c56d0b"
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={(e) => e.stopPropagation()}
                      className="inline-flex items-center gap-1 rounded-lg border border-slate-800 bg-slate-900/90 px-2 py-1 text-[11px] font-medium text-slate-300 hover:border-cyan-500/50 hover:text-cyan-300 hover:bg-slate-800 hover:scale-105 active:scale-95 transition-all cursor-pointer shadow-sm"
                      title="Explore real property details on Homes.com"
                    >
                      <span>🏡 Homes.com</span>
                      <ExternalLink className="h-3 w-3 text-cyan-400" />
                    </a>
                  )}

                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      copyToClipboard(line.value, line.id);
                    }}
                    className={`flex items-center gap-1.5 rounded-lg px-2.5 py-1 text-xs font-semibold transition-all duration-150 cursor-pointer hover:scale-105 active:scale-95 ${
                      isCopied
                        ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 shadow-sm'
                        : 'border border-slate-800 bg-slate-900 text-slate-400 group-hover:border-cyan-500/50 group-hover:text-cyan-300 group-hover:bg-slate-800'
                    }`}
                  >
                    {isCopied ? (
                      <>
                        <Check className="h-3.5 w-3.5 text-emerald-400" />
                        <span className="text-emerald-400 font-bold">Copied!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="h-3.5 w-3.5" />
                        <span className="hidden sm:inline">Copy</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Footer Exporters */}
      <div className="mt-6 pt-4 border-t border-slate-800/80 flex flex-wrap items-center justify-between gap-3 text-xs text-slate-400">
        <span className="text-center sm:text-left text-slate-400">
          💡 Click any line directly to copy its value.
        </span>
        <div className="flex items-center gap-2 mx-auto sm:mx-0">
          <button
            onClick={() => exportToJson(identity, geo)}
            className="flex items-center gap-1 rounded-lg border border-slate-800 bg-slate-950 px-3 py-1.5 text-xs text-slate-300 hover:text-white hover:border-slate-700 transition-colors cursor-pointer"
          >
            <Download className="h-3.5 w-3.5 text-cyan-400" />
            <span>JSON</span>
          </button>
          <button
            onClick={() => exportToVcf(identity)}
            className="flex items-center gap-1 rounded-lg border border-slate-800 bg-slate-950 px-3 py-1.5 text-xs text-slate-300 hover:text-white hover:border-slate-700 transition-colors cursor-pointer"
          >
            <FileText className="h-3.5 w-3.5 text-blue-400" />
            <span>vCard</span>
          </button>
        </div>
      </div>
    </div>
  );
};
