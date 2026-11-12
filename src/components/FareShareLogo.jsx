import React from 'react';

/**
 * FareShare Friendly Co-Rider Transit Logo
 * Faithful to the reference illustration color palette:
 * - Jet Black friendly car silhouette (#18181B)
 * - Two co-riders sharing the ride inside the windshield
 * - Vibrant Sunset Coral location pin (#FF6536)
 * - Sunset Aurora orbital ring (#7C3AED Violet -> #F43F5E Coral Pink -> #FBBF24 Sunny Gold)
 * - Soft Lilac / Lavender ground shadows (#DDD6FE)
 * - Radiant amber motion accents (#F59E0B) and playful violet & gold sparkle stars
 */
export default function FareShareLogo({ className = "w-9 h-9", animated = true }) {
  return (
    <div className={`relative shrink-0 ${className} group select-none`}>
      <svg
        viewBox="0 0 64 64"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full drop-shadow-sm transition-transform duration-300 group-hover:scale-105"
      >
        {/* Seamless Transparent Background (No bounding box or border) */}

        {/* Soft Lavender / Lilac Ground Shadows (Exact reference match) */}
        <ellipse cx="37" cy="49.5" rx="15" ry="2.4" fill="#DDD6FE" fillOpacity="0.8" />
        <ellipse cx="14" cy="42.5" rx="3.8" ry="1.3" fill="#DDD6FE" fillOpacity="0.75" />

        {/* Orbiting Route Ring - Back Arc (Behind Car) */}
        <path
          d="M13 39C16 30 46 26.5 54 34.5"
          stroke="url(#ref_ring_back)"
          strokeWidth="3.4"
          strokeLinecap="round"
          strokeOpacity="0.45"
        />

        {/* Destination Map Pin (Vibrant Sunset Coral) */}
        <g className={animated ? "transition-transform duration-300 group-hover:-translate-y-0.5" : ""}>
          <path
            d="M14 25.5C10.5 25.5 7.8 28.3 7.8 31.8C7.8 36.2 14 41.5 14 41.5C14 41.5 20.2 36.2 20.2 31.8C20.2 28.3 17.5 25.5 14 25.5Z"
            fill="url(#ref_pin_grad)"
          />
          <circle cx="14" cy="31.6" r="2.3" fill="#FFFDF9" />
        </g>

        {/* The Front-Facing Friendly Car (Jet Black Silhouette) */}
        <g className={animated ? "transition-transform duration-300 group-hover:translate-y-[-1px]" : ""}>
          {/* Main Car Body Shell */}
          <path
            d="M26 24.8C26.8 19 30 16.5 37 16.5C44 16.5 47.2 19 48 24.8L49.5 28C52.2 28.2 53.8 29.5 53.5 31.6C53.2 33.4 51.6 34.2 49 34L49.5 37.2C50.2 42 48.4 45.4 43.8 45.8C40.8 46.1 33.2 46.1 30.2 45.8C25.6 45.4 23.8 42 24.5 37.2L25 34C22.4 34.2 20.8 33.4 20.5 31.6C20.2 29.5 21.8 28.2 24.5 28L26 24.8Z"
            fill="#18181B"
          />

          {/* Windshield Cutout Opening */}
          <path
            d="M28 26.5C28.6 20.8 31.5 18.8 37 18.8C42.5 18.8 45.4 20.8 46 26.5C46 28.2 28 28.2 28 26.5Z"
            fill="#FFFDF9"
          />

          {/* Two Co-Riders Inside Windshield (Jet Black Silhouettes) */}
          {/* Rider 1 (Left) */}
          <circle cx="33.2" cy="23.2" r="2.7" fill="#18181B" />
          <path d="M29.8 28.2C30 25.6 36.4 25.6 36.6 28.2Z" fill="#18181B" />

          {/* Rider 2 (Right) */}
          <circle cx="40.8" cy="23.2" r="2.7" fill="#18181B" />
          <path d="M37.4 28.2C37.6 25.6 44 25.6 44.2 28.2Z" fill="#18181B" />

          {/* Friendly Oval Headlights (Crisp Cream with Subtle Warm Glow) */}
          <ellipse
            cx="29"
            cy="36.8"
            rx="3.6"
            ry="2.4"
            transform="rotate(-12 29 36.8)"
            fill="#FFFDF9"
            stroke="#FEF08A"
            strokeWidth="0.8"
          />
          <ellipse
            cx="45"
            cy="36.8"
            rx="3.6"
            ry="2.4"
            transform="rotate(12 45 36.8)"
            fill="#FFFDF9"
            stroke="#FEF08A"
            strokeWidth="0.8"
          />
        </g>

        {/* Orbiting Route Ring - Front Sweeping Arc (Sunset Purple -> Pink -> Amber Gold) */}
        <path
          d="M10.5 40C10.5 49 53.5 49 55.5 35.8"
          stroke="url(#ref_ring_front)"
          strokeWidth="3.8"
          strokeLinecap="round"
        />

        {/* Motion Energy Rays (Top Right, Vibrant Amber & Gold) */}
        <path
          d="M48 13.5L52 7.5"
          stroke="#F59E0B"
          strokeWidth="3"
          strokeLinecap="round"
          className={animated ? "animate-pulse" : ""}
        />
        <path
          d="M53.5 17.5L58.5 13"
          stroke="#FBBF24"
          strokeWidth="3"
          strokeLinecap="round"
          className={animated ? "animate-pulse" : ""}
        />

        {/* Playful Transit Sparkle Stars */}
        {/* Top-Left Sparkle (Periwinkle Violet) */}
        <path
          d="M20 12.5C20 14.5 18.5 16 16.5 16C18.5 16 20 17.5 20 19.5C20 17.5 21.5 16 23.5 16C21.5 16 20 14.5 20 12.5Z"
          fill="#818CF8"
        />
        {/* Bottom-Right Sparkle (Sunny Gold) */}
        <path
          d="M56 42.5C56 43.8 55 44.8 53.8 44.8C55 44.8 56 45.8 56 47C56 45.8 57 44.8 58.2 44.8C57 44.8 56 43.8 56 42.5Z"
          fill="#FBBF24"
        />
        {/* Top-Right Small Sparkle (Warm Orange) */}
        <path
          d="M56 22.5C56 23.4 55.3 24 54.4 24C55.3 24 56 24.6 56 25.5C56 24.6 56.7 24 57.6 24C56.7 24 56 23.4 56 22.5Z"
          fill="#FB923C"
        />

        {/* Accurate Gradients */}
        <defs>
          {/* Coral Map Pin */}
          <linearGradient id="ref_pin_grad" x1="8" y1="25.5" x2="20" y2="41.5" gradientUnits="userSpaceOnUse">
            <stop stopColor="#FF7A59" />
            <stop offset="1" stopColor="#EA580C" />
          </linearGradient>

          {/* Ring Back Arc (Violet to Coral) */}
          <linearGradient id="ref_ring_back" x1="13" y1="39" x2="54" y2="34" gradientUnits="userSpaceOnUse">
            <stop stopColor="#7C3AED" />
            <stop offset="1" stopColor="#F59E0B" />
          </linearGradient>

          {/* Ring Front Sweeping Arc (Violet -> Magenta/Coral -> Sunny Gold) */}
          <linearGradient id="ref_ring_front" x1="10" y1="41" x2="56" y2="36" gradientUnits="userSpaceOnUse">
            <stop stopColor="#7C3AED" />
            <stop offset="0.32" stopColor="#A855F7" />
            <stop offset="0.65" stopColor="#F43F5E" />
            <stop offset="1" stopColor="#FBBF24" />
          </linearGradient>
        </defs>
      </svg>
    </div>
  );
}
