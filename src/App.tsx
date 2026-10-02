/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useCallback } from 'react';
import { Header } from './components/Header';
import { IpSearchBox } from './components/IpSearchBox';
import { IdentityCard } from './components/IdentityCard';
import { GeoLocationCard } from './components/GeoLocationCard';
import { HistorySection } from './components/HistorySection';
import { fetchIpDetails } from './services/ipService';
import { generateIdentity } from './services/identityGenerator';
import { GeoLocationData, PersonIdentity, HistoryItem } from './types';
import { Sparkles } from 'lucide-react';

const THIRTY_MINUTES_MS = 30 * 60 * 1000;

// Filter out items older than 30 minutes
const filterExpiredHistory = (items: HistoryItem[]) => {
  const now = Date.now();
  return items.filter((item) => now - item.timestamp < THIRTY_MINUTES_MS);
};

export default function App() {
  const [currentIp, setCurrentIp] = useState<string>(''); // Default: empty (hidden initially)
  const [geoData, setGeoData] = useState<GeoLocationData | null>(null);
  const [identity, setIdentity] = useState<PersonIdentity | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isRegenerating, setIsRegenerating] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [history, setHistory] = useState<HistoryItem[]>(() => {
    try {
      const saved = localStorage.getItem('geo_identity_history');
      if (!saved) return [];
      const parsed = JSON.parse(saved);
      return filterExpiredHistory(parsed);
    } catch {
      return [];
    }
  });

  // Auto-clear history items older than 30 minutes
  useEffect(() => {
    const purgeExpired = () => {
      setHistory((prev) => {
        const valid = filterExpiredHistory(prev);
        if (valid.length !== prev.length) {
          try {
            localStorage.setItem('geo_identity_history', JSON.stringify(valid));
          } catch {
            // ignore
          }
          return valid;
        }
        return prev;
      });
    };

    purgeExpired();
    const interval = setInterval(purgeExpired, 15 * 1000); // Check every 15s
    return () => clearInterval(interval);
  }, []);

  // Primary lookup function
  const runLookup = useCallback(async (ipToSearch?: string) => {
    const target = (ipToSearch || '').trim();
    if (!target) return;

    setIsLoading(true);
    setErrorMessage(null);
    try {
      const geo = await fetchIpDetails(target);
      setGeoData(geo);
      setCurrentIp(geo.ip);

      // Generate localized person profile matching detected country
      const generated = generateIdentity(geo, 'all');
      setIdentity(generated);

      // Update history in localStorage
      setHistory((prev) => {
        const filtered = prev.filter((item) => item.ip !== geo.ip);
        const newItem: HistoryItem = {
          id: `hist_${Date.now()}`,
          timestamp: Date.now(),
          ip: geo.ip,
          country: geo.country,
          countryCode: geo.countryCode,
          city: geo.city,
          fullName: generated.fullName,
        };
        const updated = [newItem, ...filtered].slice(0, 10);
        try {
          localStorage.setItem('geo_identity_history', JSON.stringify(updated));
        } catch {
          // ignore
        }
        return updated;
      });
    } catch (err) {
      setErrorMessage('Failed to fetch');
      setGeoData(null);
      setIdentity(null);
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Clear current search and hide results
  const handleClearSearch = () => {
    setCurrentIp('');
    setGeoData(null);
    setIdentity(null);
    setErrorMessage(null);
  };

  // Handle regenerating a new identity for the current location
  const handleRegenerate = (gender: 'all' | 'male' | 'female' = 'all') => {
    if (!geoData) return;
    setIsRegenerating(true);
    setTimeout(() => {
      const newIdentity = generateIdentity(geoData, gender);
      setIdentity(newIdentity);
      setIsRegenerating(false);
    }, 150);
  };

  // Clear lookup history
  const handleClearHistory = () => {
    setHistory([]);
    try {
      localStorage.removeItem('geo_identity_history');
    } catch {
      // ignore
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-cyan-500/30 selection:text-cyan-200">
      {/* Centered Navigation Header */}
      <Header />

      {/* Main Container: Centered max-w-2xl */}
      <main className="flex-1 w-full max-w-2xl mx-auto px-4 sm:px-6 py-6 sm:py-8 space-y-6">
        {/* Hero Section: Simple clean Lookup IP */}
        <section id="lookup-section" className="text-center space-y-4">
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white">
            Lookup IP
          </h1>

          {/* Search Box Component */}
          <div>
            <IpSearchBox
              currentIp={currentIp}
              onSearch={(ip) => runLookup(ip)}
              onClear={handleClearSearch}
              isLoading={isLoading}
              errorMessage={errorMessage}
            />
          </div>
        </section>

        {/* Animated Error Alert for Fake or Unresolvable IPs */}
        {errorMessage && !isLoading && (
          <div className="flex items-center justify-center gap-2.5 rounded-2xl border border-rose-500/50 bg-gradient-to-r from-rose-950/80 via-slate-900/90 to-rose-950/80 px-5 py-3.5 text-center shadow-xl shadow-rose-950/50 backdrop-blur-xl animate-in fade-in zoom-in-95 duration-200 ring-1 ring-rose-500/30">
            <span className="text-base inline-block animate-bounce select-none">
              ⚠️
            </span>
            <span className="font-mono text-sm sm:text-base font-bold text-rose-200 tracking-wide animate-pulse">
              Failed to fetch
            </span>
          </div>
        )}

        {/* Loading Skeleton */}
        {isLoading && (
          <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-6 animate-pulse space-y-4">
            <div className="h-6 bg-slate-800 rounded w-1/2 mx-auto"></div>
            <div className="space-y-2">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="h-12 bg-slate-800/60 rounded-xl"></div>
              ))}
            </div>
            <div className="text-center text-xs text-slate-400 font-mono">
              Resolving IP geolocation and localized profile...
            </div>
          </div>
        )}

        {/* Main Content: Localized Identity Card */}
        {!isLoading && identity && geoData && (
          <div className="space-y-6 animate-in fade-in duration-300">
            {/* The Localized Identity Profile - Centered Line by Line */}
            <IdentityCard
              identity={identity}
              geo={geoData}
              onRegenerate={handleRegenerate}
              isRegenerating={isRegenerating}
            />

            {/* Geolocation & Map Overview */}
            <GeoLocationCard
              geo={geoData}
            />

            {/* History Section */}
            <HistorySection
              history={history}
              onSelect={(ip) => runLookup(ip)}
              onClear={handleClearHistory}
            />
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-800/80 bg-slate-950 py-6 text-xs text-slate-500">
        <div className="max-w-2xl mx-auto px-4 flex items-center justify-center">
          <span className="font-semibold text-slate-400">LookupIP Tools</span>
        </div>
      </footer>
    </div>
  );
}
