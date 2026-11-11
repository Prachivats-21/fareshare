import React from 'react';

export default function FareShareLogo({ className = "w-9 h-9", animated = true }) {
  return (
    <div className={`relative shrink-0 ${className} group select-none`}>
      <svg
        viewBox="0 0 48 48"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full drop-shadow-sm transition-transform duration-300 group-hover:scale-105"
      >
        {/* 1. Squircle Emblem Badge */}
        <rect width="48" height="48" rx="14" fill="url(#fareshare_unique_bg)" />
        <rect
          x="0.75"
          y="0.75"
          width="46.5"
          height="46.5"
          rx="13.25"
          stroke="#34D399"
          strokeOpacity="0.35"
          strokeWidth="1.5"
        />

        {/* 2. Ambient Mint Energy Aura */}
        <circle cx="24" cy="24" r="13" fill="#10B981" fillOpacity="0.18" filter="blur(5px)" />

        {/* 3. Dual Converging Departure Route Curves (Merging at rear) */}
        <path
          d="M11 41C14.5 35 18.5 32 24 32C29.5 32 33.5 35 37 41"
          stroke="#34D399"
          strokeWidth="2"
          strokeLinecap="round"
          strokeDasharray="2.5 3"
          strokeOpacity="0.75"
        />

        {/* 4. Aerodynamic Vehicle Body Shell (Cream Linen & Emerald Accents) */}
        <path
          d="M15.5 37.5C14 37.5 13 36.2 13.3 34.7L15.8 20.8C16.4 16.8 19.8 13.8 23.8 13.8H24.2C28.2 13.8 31.6 16.8 32.2 20.8L34.7 34.7C35 36.2 34 37.5 32.5 37.5H15.5Z"
          fill="url(#cab_unique_body)"
        />
        <path
          d="M15.5 37.5C14 37.5 13 36.2 13.3 34.7L15.8 20.8C16.4 16.8 19.8 13.8 23.8 13.8H24.2C28.2 13.8 31.6 16.8 32.2 20.8L34.7 34.7C35 36.2 34 37.5 32.5 37.5H15.5Z"
          stroke="#E7E4DC"
          strokeWidth="0.75"
        />

        {/* Aerodynamic Side Winglets / Mirrors */}
        <path d="M13 24C11.3 24 10.8 25.2 11.3 26.5L13.5 29H14.8L14 24.5C13.8 24.2 13.4 24 13 24Z" fill="#1A3D34" />
        <path d="M35 24C36.7 24 37.2 25.2 36.7 26.5L34.5 29H33.2L34 24.5C34.2 24.2 34.6 24 35 24Z" fill="#1A3D34" />

        {/* 5. Panoramic Smoked-Glass Canopy (Deep Forest Glass) */}
        <path
          d="M17.5 33.5L18.8 21.8C19.2 19.6 21.2 17.8 23.5 17.8H24.5C26.8 17.8 28.8 19.6 29.2 21.8L30.5 33.5H17.5Z"
          fill="url(#canopy_unique_glass)"
        />
        <path
          d="M17.5 33.5L18.8 21.8C19.2 19.6 21.2 17.8 23.5 17.8H24.5C26.8 17.8 28.8 19.6 29.2 21.8L30.5 33.5H17.5Z"
          stroke="#34D399"
          strokeWidth="0.8"
          strokeOpacity="0.45"
        />

        {/* 6. Four Glowing Student Pooling Seats (The Signature 4-Way Co-Rider Split) */}
        {/* Co-Rider 1 (Front Left) */}
        <circle cx="21" cy="23.2" r="2" fill="#34D399" />
        <circle cx="21" cy="23.2" r="1" fill="#FAF8F5" />
        
        {/* Co-Rider 2 (Front Right) */}
        <circle cx="27" cy="23.2" r="2" fill="#34D399" />
        <circle cx="27" cy="23.2" r="1" fill="#FAF8F5" />
        
        {/* Co-Rider 3 (Rear Left) */}
        <circle cx="21" cy="29.2" r="2" fill="#34D399" />
        <circle cx="21" cy="29.2" r="1" fill="#FAF8F5" />
        
        {/* Co-Rider 4 (Rear Right) */}
        <circle cx="27" cy="29.2" r="2" fill="#34D399" />
        <circle cx="27" cy="29.2" r="1" fill="#FAF8F5" />

        {/* Equal Fare-Split Nexus (Center sharing matrix lines) */}
        <line x1="21" y1="23.2" x2="27" y2="29.2" stroke="#6EE7B7" strokeWidth="0.8" strokeOpacity="0.8" strokeDasharray="1 1.5" />
        <line x1="27" y1="23.2" x2="21" y2="29.2" stroke="#6EE7B7" strokeWidth="0.8" strokeOpacity="0.8" strokeDasharray="1 1.5" />
        <circle cx="24" cy="26.2" r="1.5" fill="#FAF8F5" stroke="#1A3D34" strokeWidth="0.75" />

        {/* 7. Forward Destination Waypoint Arrow (High-Beam Navigation) */}
        <path
          d="M21 14.2L24 6.8L27 14.2L24 12.6L21 14.2Z"
          fill="#34D399"
          className={animated ? "animate-pulse" : ""}
        />
        {/* Dual LED Projectors */}
        <circle cx="18.5" cy="15.2" r="1.2" fill="#A7F3D0" />
        <circle cx="29.5" cy="15.2" r="1.2" fill="#A7F3D0" />

        {/* Gradients */}
        <defs>
          <linearGradient id="fareshare_unique_bg" x1="0" y1="0" x2="48" y2="48" gradientUnits="userSpaceOnUse">
            <stop stopColor="#1A3D34" />
            <stop offset="0.65" stopColor="#0E241E" />
            <stop offset="1" stopColor="#19463B" />
          </linearGradient>
          <linearGradient id="cab_unique_body" x1="13" y1="14" x2="35" y2="38" gradientUnits="userSpaceOnUse">
            <stop stopColor="#FFFFFF" />
            <stop offset="1" stopColor="#F2EFE9" />
          </linearGradient>
          <linearGradient id="canopy_unique_glass" x1="17" y1="18" x2="31" y2="34" gradientUnits="userSpaceOnUse">
            <stop stopColor="#132B24" />
            <stop offset="1" stopColor="#0B1C17" />
          </linearGradient>
        </defs>
      </svg>
    </div>
  );
}
