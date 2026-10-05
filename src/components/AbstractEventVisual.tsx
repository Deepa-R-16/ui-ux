import React from 'react';
import { PulseEvent } from '../types';

interface AbstractEventVisualProps {
  theme?: PulseEvent['visualTheme'];
  eventId?: string;
  title: string;
  category: string;
  primaryColor?: string;
  accentColor?: string;
  size?: 'compact' | 'medium' | 'large' | 'hero';
}

export const AbstractEventVisual: React.FC<AbstractEventVisualProps> = ({
  eventId = '',
  category,
  size = 'medium'
}) => {
  return (
    <div
      className={`relative w-full overflow-hidden select-none flex items-center justify-center border-b border-slate-200 dark:border-[#212c42] transition-colors ${
        size === 'hero'
          ? 'h-64 sm:h-72 lg:h-80'
          : size === 'large'
          ? 'h-52 md:h-64'
          : size === 'compact'
          ? 'h-32'
          : 'h-40 md:h-44'
      }`}
    >
      {/* 1. MOONLIGHT MUSIC FEST (YMCA Grounds, Nandanam) */}
      {eventId === 'moonlight-music-fest' && (
        <div className="w-full h-full bg-[#0f172a] flex items-center justify-center p-4 relative">
          <svg className="w-full h-full max-w-sm" viewBox="0 0 360 160" fill="none">
            {/* Flat Solid Moon Crescent */}
            <circle cx="280" cy="45" r="28" fill="#f8fafc" />
            <circle cx="288" cy="40" r="24" fill="#0f172a" />

            {/* Stage Acoustic Frequency Rods in Flat Solid Rose & Slate */}
            {[-80, -60, -40, -20, 0, 20, 40, 60, 80].map((offset, i) => {
              const heights = [32, 56, 88, 110, 120, 110, 88, 56, 32];
              const h = heights[i];
              const isCenter = Math.abs(offset) <= 20;
              return (
                <rect
                  key={i}
                  x={180 + offset - 4}
                  y={80 - h / 2}
                  width="8"
                  height={h}
                  rx="3"
                  fill={isCenter ? '#e11d48' : '#64748b'}
                />
              );
            })}

            {/* Studio Horizon Line */}
            <line x1="40" y1="138" x2="320" y2="138" stroke="#334155" strokeWidth="2" />
            <text x="180" y="152" textAnchor="middle" fill="#94a3b8" fontSize="10" fontFamily="monospace" fontWeight="bold">
              YMCA NANDANAM · OPEN AIR ARENA
            </text>
          </svg>
        </div>
      )}

      {/* 2. MARGAZHI SEASON - SANJAY SUBRAHMANYAN (The Music Academy, Alwarpet) */}
      {eventId === 'margazhi-sanjay-live' && (
        <div className="w-full h-full bg-[#2a0c04] flex items-center justify-center p-4 relative">
          <svg className="w-full h-full max-w-sm" viewBox="0 0 360 160" fill="none">
            {/* Sabha Proscenium Arch */}
            <path d="M 50 145 L 50 40 Q 180 15, 310 40 L 310 145" stroke="#d97706" strokeWidth="2" />
            
            {/* Traditional Tambura & Veena Strings Silhouette */}
            <line x1="165" y1="25" x2="165" y2="135" stroke="#fcd34d" strokeWidth="1.5" />
            <line x1="175" y1="25" x2="175" y2="135" stroke="#fcd34d" strokeWidth="1.5" />
            <line x1="185" y1="25" x2="185" y2="135" stroke="#fcd34d" strokeWidth="1.5" />
            <line x1="195" y1="25" x2="195" y2="135" stroke="#fcd34d" strokeWidth="1.5" />

            {/* Geometric Kolam Rosette Center */}
            <rect x="155" y="55" width="50" height="50" fill="#e11d48" transform="rotate(45 180 80)" />
            <circle cx="180" cy="80" r="14" fill="#fcd34d" />
            <circle cx="180" cy="80" r="6" fill="#2a0c04" />

            {/* Cardinal Dots */}
            <circle cx="180" cy="40" r="4" fill="#fcd34d" />
            <circle cx="180" cy="120" r="4" fill="#fcd34d" />
            <circle cx="140" cy="80" r="4" fill="#fcd34d" />
            <circle cx="220" cy="80" r="4" fill="#fcd34d" />

            <text x="180" y="150" textAnchor="middle" fill="#fcd34d" fontSize="10" fontFamily="monospace" fontWeight="bold">
              THE MUSIC ACADEMY · EST. 1928
            </text>
          </svg>
        </div>
      )}

      {/* 3. EVAM STANDUP TAMASHA (Sir Mutha Hall, Chetpet) */}
      {eventId === 'chennai-laugh-lab' && (
        <div className="w-full h-full bg-[#18181b] flex items-center justify-center p-4 relative">
          <svg className="w-full h-full max-w-sm" viewBox="0 0 360 160" fill="none">
            {/* Vintage Chrome Stage Microphone */}
            <rect x="168" y="30" width="24" height="42" rx="12" fill="#e11d48" stroke="#ffffff" strokeWidth="2" />
            <line x1="168" y1="44" x2="192" y2="44" stroke="#ffffff" strokeWidth="2" />
            <line x1="168" y1="56" x2="192" y2="56" stroke="#ffffff" strokeWidth="2" />
            
            {/* Mic stand & neck */}
            <path d="M 160 52 C 160 76, 200 76, 200 52" stroke="#ffffff" strokeWidth="2" fill="none" />
            <line x1="180" y1="76" x2="180" y2="125" stroke="#ffffff" strokeWidth="3" />
            <line x1="150" y1="125" x2="210" y2="125" stroke="#ffffff" strokeWidth="4" strokeLinecap="round" />

            {/* Comic Laugh Soundwaves in Solid Coral */}
            <path d="M 135 45 Q 120 52, 135 60" stroke="#f43f5e" strokeWidth="3" strokeLinecap="round" />
            <path d="M 120 38 Q 100 52, 120 68" stroke="#f43f5e" strokeWidth="3" strokeLinecap="round" />

            <path d="M 225 45 Q 240 52, 225 60" stroke="#f43f5e" strokeWidth="3" strokeLinecap="round" />
            <path d="M 240 38 Q 260 52, 240 68" stroke="#f43f5e" strokeWidth="3" strokeLinecap="round" />

            {/* Flat Block Badge */}
            <rect x="130" y="132" width="100" height="20" rx="4" fill="#27272a" />
            <text x="180" y="146" textAnchor="middle" fill="#f43f5e" fontSize="9" fontFamily="monospace" fontWeight="bold">
              SIR MUTHA HALL · LIVE COMEDY
            </text>
          </svg>
        </div>
      )}

      {/* 4. THE MADRAS PLAYERS: STORIES UNDER THE LIGHTS (Museum Theatre, Egmore) */}
      {eventId === 'stories-under-the-lights' && (
        <div className="w-full h-full bg-[#3b0720] flex items-center justify-center p-4 relative">
          <svg className="w-full h-full max-w-sm" viewBox="0 0 360 160" fill="none">
            {/* Classic Victorian Proscenium Arch */}
            <rect x="50" y="30" width="260" height="110" fill="#220412" stroke="#f472b6" strokeWidth="2" rx="4" />
            
            {/* Symmetrical Stage Curtains in Flat Bold Solid Blocks */}
            <polygon points="52,32 120,32 90,138 52,138" fill="#e11d48" />
            <polygon points="308,32 240,32 270,138 308,138" fill="#e11d48" />
            
            {/* Stage Spotlight Overhead Cone */}
            <polygon points="150,32 210,32 240,138 120,138" fill="#fdf2f8" fillOpacity="0.12" />

            {/* Historic Theatre Stalls Row */}
            <line x1="80" y1="120" x2="280" y2="120" stroke="#f472b6" strokeWidth="2" strokeDasharray="6 6" />

            <circle cx="180" cy="85" r="16" fill="#fdf2f8" />
            <text x="180" y="89" textAnchor="middle" fill="#3b0720" fontSize="11" fontWeight="bold">
              1896
            </text>

            <text x="180" y="152" textAnchor="middle" fill="#fbcfe8" fontSize="10" fontFamily="monospace" fontWeight="bold">
              EGMORE MUSEUM THEATRE · EST. 1896
            </text>
          </svg>
        </div>
      )}

      {/* 5. BACKYARD ADYAR: CRAFT & COFFEE (Backyard, Adyar) */}
      {eventId === 'create-and-coffee-backyard' && (
        <div className="w-full h-full bg-[#064e3b] flex items-center justify-center p-4 relative">
          <svg className="w-full h-full max-w-sm" viewBox="0 0 360 160" fill="none">
            {/* Linocut Block Print Stamp */}
            <rect x="90" y="35" width="80" height="80" rx="6" fill="#022c22" stroke="#a7f3d0" strokeWidth="2" />
            <circle cx="130" cy="75" r="24" stroke="#e11d48" strokeWidth="3" />
            <line x1="106" y1="75" x2="154" y2="75" stroke="#a7f3d0" strokeWidth="2" />
            <line x1="130" y1="51" x2="130" y2="99" stroke="#a7f3d0" strokeWidth="2" />

            {/* South Indian Filter Coffee Davarah / Tumbler Silhouette */}
            <polygon points="215,45 255,45 248,95 222,95" fill="#e11d48" />
            <ellipse cx="235" cy="45" rx="20" ry="5" fill="#fde047" />
            <ellipse cx="235" cy="98" rx="28" ry="8" fill="#fde047" />

            {/* Coffee Steam Lines */}
            <path d="M 230 38 Q 235 25, 230 18" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" />
            <path d="M 240 38 Q 245 25, 240 18" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" />

            <text x="180" y="145" textAnchor="middle" fill="#a7f3d0" fontSize="10" fontFamily="monospace" fontWeight="bold">
              BACKYARD ADYAR · LINOCUT & BREW
            </text>
          </svg>
        </div>
      )}

      {/* 6. BESSIE SUNSET ACOUSTICS (Besant Nagar Beach) */}
      {eventId === 'marina-sunset-sessions' && (
        <div className="w-full h-full bg-[#082f49] flex items-center justify-center p-4 relative">
          <svg className="w-full h-full max-w-sm" viewBox="0 0 360 160" fill="none">
            {/* Flat Bold Crimson Sun Setting over Horizon */}
            <circle cx="180" cy="70" r="32" fill="#e11d48" />

            {/* Coastal Horizon Line */}
            <line x1="30" y1="72" x2="330" y2="72" stroke="#38bdf8" strokeWidth="2" />

            {/* Karl Schmidt Memorial Arch Silhouette */}
            <path d="M 80 72 L 80 40 Q 100 25, 120 40 L 120 72" stroke="#bae6fd" strokeWidth="2.5" fill="none" />
            <rect x="75" y="70" width="50" height="4" fill="#bae6fd" />

            {/* Bay of Bengal Layered Flat Solid Ocean Waves */}
            <path d="M 30 88 C 90 76, 150 96, 210 88 C 270 80, 310 96, 330 88" stroke="#0284c7" strokeWidth="3" fill="none" />
            <path d="M 30 108 C 80 98, 140 118, 200 108 C 260 98, 300 116, 330 108" stroke="#38bdf8" strokeWidth="2.5" fill="none" />
            <path d="M 30 128 C 90 120, 160 136, 220 128 C 280 120, 310 132, 330 128" stroke="#bae6fd" strokeWidth="2" fill="none" />

            <text x="180" y="150" textAnchor="middle" fill="#7dd3fc" fontSize="10" fontFamily="monospace" fontWeight="bold">
              BESANT NAGAR · ELLIOT'S BEACH DECK
            </text>
          </svg>
        </div>
      )}

      {/* 7. INDIE ARTISTS LIVE (Phoenix Marketcity, Velachery) */}
      {eventId === 'indie-artists-live-phoenix' && (
        <div className="w-full h-full bg-[#09090b] flex items-center justify-center p-4 relative">
          <svg className="w-full h-full max-w-sm" viewBox="0 0 360 160" fill="none">
            {/* Arena Tiered Acoustic Truss */}
            <rect x="50" y="24" width="260" height="12" fill="#27272a" rx="2" />
            <line x1="70" y1="24" x2="70" y2="40" stroke="#e11d48" strokeWidth="2" />
            <line x1="140" y1="24" x2="140" y2="40" stroke="#e11d48" strokeWidth="2" />
            <line x1="220" y1="24" x2="220" y2="40" stroke="#e11d48" strokeWidth="2" />
            <line x1="290" y1="24" x2="290" y2="40" stroke="#e11d48" strokeWidth="2" />

            {/* Synthesizer 9-Band Equalizer Blocks */}
            {[60, 90, 120, 150, 180, 210, 240, 270, 300].map((xPos, idx) => {
              const bars = [3, 5, 7, 8, 9, 8, 7, 5, 4][idx];
              return (
                <g key={idx}>
                  {Array.from({ length: bars }).map((_, barIdx) => (
                    <rect
                      key={barIdx}
                      x={xPos - 8}
                      y={118 - barIdx * 8}
                      width="16"
                      height="6"
                      rx="1"
                      fill={barIdx >= 7 ? '#e11d48' : barIdx >= 4 ? '#f43f5e' : '#3f3f46'}
                    />
                  ))}
                </g>
              );
            })}

            <line x1="40" y1="126" x2="320" y2="126" stroke="#27272a" strokeWidth="2" />
            <text x="180" y="148" textAnchor="middle" fill="#a1a1aa" fontSize="10" fontFamily="monospace" fontWeight="bold">
              VELACHERY · PHOENIX INDOOR ARENA
            </text>
          </svg>
        </div>
      )}

      {/* 8. CHENNAI SANGAMAM (Island Grounds) */}
      {eventId === 'chennai-sangamam-food-fest' && (
        <div className="w-full h-full bg-[#431407] flex items-center justify-center p-4 relative">
          <svg className="w-full h-full max-w-sm" viewBox="0 0 360 160" fill="none">
            {/* Parai Drum Silhouette in Flat Solid Amber & Crimson */}
            <circle cx="180" cy="75" r="42" fill="#7c2d12" stroke="#ea580c" strokeWidth="3" />
            <circle cx="180" cy="75" r="30" stroke="#fde047" strokeWidth="2" strokeDasharray="5 5" />
            <circle cx="180" cy="75" r="8" fill="#e11d48" />

            {/* Crossed Drumsticks */}
            <line x1="120" y1="35" x2="165" y2="70" stroke="#ffffff" strokeWidth="4" strokeLinecap="round" />
            <line x1="240" y1="35" x2="195" y2="70" stroke="#ffffff" strokeWidth="4" strokeLinecap="round" />

            {/* Festive Carnival Bunting Flags */}
            <polygon points="60,25 90,25 75,50" fill="#e11d48" />
            <polygon points="100,25 130,25 115,50" fill="#fde047" />
            <polygon points="230,25 260,25 245,50" fill="#ea580c" />
            <polygon points="270,25 300,25 285,50" fill="#e11d48" />

            <text x="180" y="145" textAnchor="middle" fill="#fed7aa" fontSize="10" fontFamily="monospace" fontWeight="bold">
              ISLAND GROUNDS · 120 CULTURAL STALLS
            </text>
          </svg>
        </div>
      )}

      {/* 9. SAARANG IIT MADRAS (Open Air Theatre, Guindy) */}
      {eventId === 'saarang-iit-madras' && (
        <div className="w-full h-full bg-[#1e1b4b] flex items-center justify-center p-4 relative">
          <svg className="w-full h-full max-w-sm" viewBox="0 0 360 160" fill="none">
            {/* IIT Madras Gajendra Circle Iconic Arch */}
            <path d="M 90 120 L 90 50 Q 180 20, 270 50 L 270 120" stroke="#818cf8" strokeWidth="3" fill="none" />
            
            {/* Electric Rock Guitar Silhouette */}
            <path d="M 175 40 L 185 40 L 183 95 C 195 98, 205 110, 195 125 C 185 135, 175 135, 165 125 C 155 110, 165 98, 177 95 Z" fill="#e11d48" />
            <circle cx="180" cy="112" r="6" fill="#ffffff" />

            {/* OAT Tiered Bowl Seats */}
            <path d="M 60 135 Q 180 110, 300 135" stroke="#4338ca" strokeWidth="3" fill="none" />
            
            <text x="180" y="152" textAnchor="middle" fill="#c7d2fe" fontSize="10" fontFamily="monospace" fontWeight="bold">
              IIT MADRAS OAT · GUINDY
            </text>
          </svg>
        </div>
      )}

      {/* 10. MADRAS HERITAGE WALK: MYLAPORE TANK */}
      {eventId === 'madras-heritage-walk' && (
        <div className="w-full h-full bg-[#1e293b] flex items-center justify-center p-4 relative">
          <svg className="w-full h-full max-w-sm" viewBox="0 0 360 160" fill="none">
            {/* Kapaleeshwarar Temple Gopuram Architectural Facet in Solid Terracotta & Gold */}
            <polygon points="180,25 210,50 205,75 220,105 140,105 155,75 150,50" fill="#e11d48" stroke="#fcd34d" strokeWidth="2" />
            <rect x="172" y="105" width="16" height="25" fill="#fcd34d" />
            
            {/* Stepped Water Tank Ghat Steps */}
            <line x1="80" y1="130" x2="280" y2="130" stroke="#fcd34d" strokeWidth="2" />
            <line x1="100" y1="138" x2="260" y2="138" stroke="#fcd34d" strokeWidth="2" />
            <line x1="120" y1="146" x2="240" y2="146" stroke="#fcd34d" strokeWidth="2" />

            <text x="180" y="158" textAnchor="middle" fill="#e2e8f0" fontSize="9" fontFamily="monospace" fontWeight="bold">
              MYLAPORE TANK · HERITAGE CORRIDOR
            </text>
          </svg>
        </div>
      )}

      {/* 11. CHENNAI RUNNERS: ECR NIGHT RUN 10K */}
      {eventId === 'east-coast-night-run-10k' && (
        <div className="w-full h-full bg-[#0f172a] flex items-center justify-center p-4 relative">
          <svg className="w-full h-full max-w-sm" viewBox="0 0 360 160" fill="none">
            {/* ECR Coastal Road Highway Lanes */}
            <path d="M 50 140 C 110 30, 250 30, 310 140" stroke="#0284c7" strokeWidth="5" strokeLinecap="round" />
            <path d="M 75 142 C 125 50, 235 50, 285 142" stroke="#e11d48" strokeWidth="2.5" strokeDasharray="6 6" />

            {/* 10K Waypoint Marker */}
            <circle cx="180" cy="45" r="18" fill="#e11d48" stroke="#ffffff" strokeWidth="2" />
            <text x="180" y="49" textAnchor="middle" fill="#ffffff" fontSize="10" fontWeight="bold" fontFamily="sans-serif">
              10K
            </text>

            <text x="180" y="150" textAnchor="middle" fill="#94a3b8" fontSize="10" fontFamily="monospace" fontWeight="bold">
              ECR PROMENADE · CHENNAI RUNNERS
            </text>
          </svg>
        </div>
      )}

      {/* Fallback Graphic if any unexpected ID */}
      {![
        'moonlight-music-fest',
        'margazhi-sanjay-live',
        'chennai-laugh-lab',
        'stories-under-the-lights',
        'create-and-coffee-backyard',
        'marina-sunset-sessions',
        'indie-artists-live-phoenix',
        'chennai-sangamam-food-fest',
        'saarang-iit-madras',
        'madras-heritage-walk',
        'east-coast-night-run-10k'
      ].includes(eventId) && (
        <div className="w-full h-full bg-[#18181b] flex items-center justify-center p-4 relative">
          <svg className="w-full h-full max-w-sm" viewBox="0 0 360 160" fill="none">
            <rect x="60" y="40" width="240" height="80" rx="8" fill="#27272a" stroke="#e11d48" strokeWidth="2" />
            <circle cx="180" cy="80" r="22" fill="#e11d48" />
            <text x="180" y="84" textAnchor="middle" fill="#ffffff" fontSize="12" fontWeight="bold">
              MADRAS
            </text>
            <text x="180" y="145" textAnchor="middle" fill="#a1a1aa" fontSize="10" fontFamily="monospace" fontWeight="bold">
              CHENNAI LIVE EXPERIENCE
            </text>
          </svg>
        </div>
      )}

      {/* Subtle Category Pill on Top Left - Flat Bold Solid Color Block */}
      <div className="absolute top-3 left-3 z-10">
        <span className="text-[10px] font-mono tracking-wider uppercase font-bold px-2 py-0.5 rounded bg-slate-900 text-white border border-slate-700 shadow-sm">
          {category}
        </span>
      </div>
    </div>
  );
};
