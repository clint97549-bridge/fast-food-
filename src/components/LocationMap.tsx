import React, { useCallback, useState } from 'react';
import {
  AdvancedMarker,
  APILoadingStatus,
  InfoWindow,
  Map as GoogleMap,
  Pin,
  useAdvancedMarkerRef,
  useApiLoadingStatus,
} from '@vis.gl/react-google-maps';
import { ExternalLink, MapPin, Phone } from 'lucide-react';
import { RESTAURANT_INFO } from '../data/menuData';

interface LocationMapProps {
  hasProvider?: boolean;
}

const GoogleMapCanvas: React.FC<{
  directionsUrl: string;
}> = ({ directionsUrl }) => {
  const [markerRef, marker] = useAdvancedMarkerRef();
  const [infoOpen, setInfoOpen] = useState(true);
  const apiStatus = useApiLoadingStatus();

  const handleMarkerClick = useCallback(() => {
    setInfoOpen((prev) => !prev);
  }, []);

  if (
    apiStatus === APILoadingStatus.FAILED ||
    apiStatus === APILoadingStatus.AUTH_FAILURE
  ) {
    return (
      <div className="w-full h-full bg-zinc-900 flex items-center justify-center p-6">
        <div className="max-w-md w-full p-6 rounded-2xl bg-[#161619] border border-white/10 text-center space-y-3">
          <MapPin className="w-8 h-8 text-amber-400 mx-auto" />
          <h3 className="font-display text-2xl font-bold uppercase text-white">
            Visit Roll N Roll Karachi
          </h3>
          <p className="text-xs sm:text-sm text-zinc-300">
            {RESTAURANT_INFO.address}
          </p>
          <a
            href={directionsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-amber-500 hover:bg-amber-400 text-black font-bold text-xs transition-colors"
          >
            <span>Open in Google Maps</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>
      </div>
    );
  }

  return (
    <GoogleMap
      mapId="DEMO_MAP_ID"
      defaultCenter={RESTAURANT_INFO.coordinates}
      defaultZoom={16}
      gestureHandling="cooperative"
      internalUsageAttributionIds={['gmp_mcp_codeassist_v1_aistudio']}
      style={{ width: '100%', height: '100%' }}
    >
      <AdvancedMarker
        ref={markerRef}
        position={RESTAURANT_INFO.coordinates}
        onClick={handleMarkerClick}
        title="Roll N Roll — Pakistani Restaurant"
      >
        <Pin
          background="#dc2626"
          borderColor="#f59e0b"
          glyphColor="#ffffff"
          scale={1.25}
        />
      </AdvancedMarker>

      {infoOpen && marker && (
        <InfoWindow
          anchor={marker}
          maxWidth={270}
          onCloseClick={() => setInfoOpen(false)}
        >
          <div className="p-1 text-zinc-900">
            <div className="font-bold text-sm">{RESTAURANT_INFO.name}</div>
            <div className="text-xs text-zinc-600 mt-0.5">
              {RESTAURANT_INFO.address}
            </div>
            <div className="mt-2 flex items-center justify-between gap-3 text-xs">
              <span className="font-semibold text-emerald-700">Open now</span>
              <a
                href={directionsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:underline font-semibold inline-flex items-center gap-1"
              >
                Directions <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          </div>
        </InfoWindow>
      )}
    </GoogleMap>
  );
};

export const LocationMap: React.FC<LocationMapProps> = ({ hasProvider = true }) => {
  const hasApiKey = Boolean(import.meta.env.VITE_GOOGLE_MAPS_API_KEY) && hasProvider;

  const directionsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
    RESTAURANT_INFO.address
  )}`;

  return (
    <section
      id="location"
      className="scroll-mt-[140px] relative w-full bg-[#111113] border-t border-white/10"
    >
      {/* Floating Location Card matching the video's Google Map top-left overlay */}
      <div className="relative w-full h-[380px] sm:h-[430px]">
        {hasApiKey ? (
          <GoogleMapCanvas directionsUrl={directionsUrl} />
        ) : (
          <div className="w-full h-full bg-zinc-900 flex items-center justify-center p-6">
            <div className="max-w-md w-full p-6 rounded-2xl bg-[#161619] border border-white/10 text-center space-y-3">
              <MapPin className="w-8 h-8 text-amber-400 mx-auto" />
              <h3 className="font-display text-2xl font-bold uppercase text-white">
                Visit Roll N Roll Karachi
              </h3>
              <p className="text-xs sm:text-sm text-zinc-300">
                {RESTAURANT_INFO.address}
              </p>
              <a
                href={directionsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-amber-500 hover:bg-amber-400 text-black font-bold text-xs transition-colors"
              >
                <span>Open in Google Maps</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        )}

        {/* Top-left Quick Info Card */}
        <div className="hidden sm:block absolute top-4 left-4 z-10 max-w-xs bg-white/95 backdrop-blur-sm text-zinc-900 rounded-xl shadow-lg p-3.5 border border-zinc-200">
          <div className="font-bold text-sm text-zinc-900">
            {RESTAURANT_INFO.name} — {RESTAURANT_INFO.shortAddress}
          </div>
          <p className="text-xs text-zinc-600 mt-1 leading-snug">
            {RESTAURANT_INFO.address}
          </p>
          <div className="mt-2.5 flex items-center justify-between gap-2 text-xs">
            <a
              href={`tel:${RESTAURANT_INFO.phoneInternational.replace(/\s+/g, '')}`}
              className="inline-flex items-center gap-1 font-semibold text-zinc-800 hover:text-amber-600 tabular-nums"
            >
              <Phone className="w-3 h-3" /> {RESTAURANT_INFO.phoneDisplay}
            </a>
            <a
              href={directionsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 font-semibold text-blue-600 hover:underline"
            >
              View larger map <ExternalLink className="w-3 h-3" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};
