import React, { useState, useEffect } from 'react';
import {
  Globe,
  MapPin,
  Clock,
  Wifi,
  Compass,
  ExternalLink
} from 'lucide-react';
import { GeoLocationData } from '../types';

interface GeoLocationCardProps {
  geo: GeoLocationData;
}

export const GeoLocationCard: React.FC<GeoLocationCardProps> = ({ geo }) => {
  const [localTime, setLocalTime] = useState<string>('');

  useEffect(() => {
    const updateTime = () => {
      try {
        if (geo.timezone) {
          const now = new Date();
          const formatted = new Intl.DateTimeFormat('en-US', {
            timeZone: geo.timezone,
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
            hour12: true,
            weekday: 'short',
            month: 'short',
            day: 'numeric'
          }).format(now);
          setLocalTime(formatted);
        } else {
          setLocalTime(new Date().toLocaleTimeString());
        }
      } catch {
        setLocalTime(new Date().toLocaleTimeString());
      }
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, [geo.timezone]);

  return (
    <div id="network-section" className="w-full max-w-2xl mx-auto rounded-2xl border border-slate-800 bg-slate-900/90 shadow-2xl backdrop-blur-xl p-6 sm:p-7">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800/80 pb-5">
        <div>
          <div className="flex items-center gap-2.5">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-500/10 text-blue-400 border border-blue-500/30">
              <Globe className="h-4 w-4" />
            </div>
            <h2 className="text-xl font-bold tracking-tight text-white">
              Detected Geolocation & Network
            </h2>
          </div>
          <p className="mt-1 text-xs text-slate-400">
            {geo.country} · {geo.city}, {geo.region}
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="font-mono text-sm px-3 py-1 rounded-lg bg-slate-950 border border-slate-800 text-cyan-400 tabular-nums">
            {geo.ip}
          </span>
          <span className="text-xs px-2 py-1 rounded-md bg-blue-500/10 text-blue-400 font-mono border border-blue-500/20">
            {geo.type || 'IPv4'}
          </span>
        </div>
      </div>

      {/* Grid of Geolocation Information */}
      <div className="mt-5 grid grid-cols-1 sm:grid-cols-2 gap-3.5">
        {/* Country & Flag */}
        <div className="rounded-xl border border-slate-800/80 bg-slate-950/60 p-3.5">
          <div className="flex items-center justify-between text-xs text-slate-400 mb-1.5">
            <span>Country</span>
            <span className="font-mono text-slate-500">{geo.countryCode}</span>
          </div>
          <div className="flex items-center gap-3">
            {geo.countryFlag && (
              <img
                src={geo.countryFlag}
                alt={geo.country}
                className="h-6 w-9 rounded object-cover shadow-sm border border-slate-700/50"
              />
            )}
            <div>
              <div className="font-bold text-slate-100 text-sm">{geo.country}</div>
              <div className="text-xs text-slate-400">{geo.continent}</div>
            </div>
          </div>
        </div>

        {/* City & State */}
        <div className="rounded-xl border border-slate-800/80 bg-slate-950/60 p-3.5">
          <div className="flex items-center justify-between text-xs text-slate-400 mb-1.5">
            <span>City / Region</span>
            <MapPin className="h-3.5 w-3.5 text-cyan-400" />
          </div>
          <div className="font-bold text-slate-100 text-sm truncate">{geo.city}</div>
          <div className="text-xs text-slate-400 truncate">{geo.region} {geo.postal ? `· ${geo.postal}` : ''}</div>
        </div>

        {/* ISP & Network */}
        <div className="rounded-xl border border-slate-800/80 bg-slate-950/60 p-3.5">
          <div className="flex items-center justify-between text-xs text-slate-400 mb-1.5">
            <span>ISP / Network</span>
            <Wifi className="h-3.5 w-3.5 text-blue-400" />
          </div>
          <div className="font-bold text-slate-100 text-sm truncate">{geo.isp}</div>
          <div className="text-xs text-slate-400 font-mono">
            {geo.asn ? `ASN: ${geo.asn}` : (geo.org || 'Autonomous System')}
          </div>
        </div>

        {/* Timezone & Live Clock */}
        <div className="rounded-xl border border-slate-800/80 bg-slate-950/60 p-3.5">
          <div className="flex items-center justify-between text-xs text-slate-400 mb-1.5">
            <span>Local Time</span>
            <Clock className="h-3.5 w-3.5 text-emerald-400" />
          </div>
          <div className="font-bold font-mono text-cyan-300 text-sm tabular-nums">
            {localTime || 'Loading...'}
          </div>
          <div className="text-xs text-slate-400 font-mono truncate">
            {geo.timezone} ({geo.utcOffset})
          </div>
        </div>
      </div>

      {/* Map & Coordinates Section */}
      <div className="mt-5 space-y-3">
        <div className="flex items-center justify-between text-xs text-slate-400 px-1">
          <div className="flex items-center gap-1.5 font-medium text-slate-300">
            <Compass className="h-3.5 w-3.5 text-cyan-400" />
            <span>Coordinates: {geo.latitude.toFixed(4)}°, {geo.longitude.toFixed(4)}°</span>
          </div>
          <a
            href={`https://www.openstreetmap.org/?mlat=${geo.latitude}&mlon=${geo.longitude}#map=12/${geo.latitude}/${geo.longitude}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1 text-cyan-400 hover:text-cyan-300 transition-colors"
          >
            <span>Open in OpenStreetMap</span>
            <ExternalLink className="h-3 w-3" />
          </a>
        </div>

        {/* Embedded Interactive OSM Map */}
        <div className="overflow-hidden rounded-xl border border-slate-800/80 bg-slate-950/80 relative h-[180px]">
          <iframe
            title="Location Map"
            width="100%"
            height="100%"
            className="absolute inset-0 w-full h-full border-0 filter grayscale-[40%] contrast-[110%] opacity-90 hover:opacity-100 hover:grayscale-0 transition-all duration-300"
            loading="lazy"
            src={`https://www.openstreetmap.org/export/embed.html?bbox=${geo.longitude - 0.08}%2C${geo.latitude - 0.08}%2C${geo.longitude + 0.08}%2C${geo.latitude + 0.08}&layer=mapnik&marker=${geo.latitude}%2C${geo.longitude}`}
          />
          <div className="absolute bottom-2 left-2 rounded-md bg-slate-950/90 border border-slate-800 px-2.5 py-1 text-[11px] text-slate-300 backdrop-blur-md">
            📍 {geo.city}, {geo.country}
          </div>
        </div>
      </div>
    </div>
  );
};
