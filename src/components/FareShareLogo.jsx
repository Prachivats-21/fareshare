import React from 'react';

/**
 * FareShare Smart Transit Emblem
 * Palette: Midnight Obsidian (#0B1120), Electric Taxi Amber (#F59E0B, #FBBF24),
 * and Shared Mint Emerald (#10B981, #34D399) with Pearlescent Platinum chassis.
 */
export default function FareShareLogo({ className = "w-9 h-9", animated = true }) {
  return (
    <div className={`relative shrink-0 ${className} group select-none`}>
      <svg
        viewBox="0 0 48 48"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full drop-shadow-md transition-transform duration-300 group-hover:scale-105"
      >
        {/* 1. Deep Midnight Obsidian Squircle Badge */}
        <rect width="48" height="48" rx="14" fill="url(#fs_badge_bg)" />
        <rect
          x="0.75"
          y="0.75"
          width="46.5"
          height="46.5"
          rx="13.25"
          stroke="url(#fs_border_grad)"
          strokeWidth="1.5"
          strokeOpacity="0.65"
        />

        {/* 2. Dual Ambient Glow Auras (Amber & Mint) */}
        <circle cx="18" cy="24" r="10" fill="#F59E0B" fillOpacity="0.14" filter="blur(6px)" />
        <circle cx="30" cy="24" r="10" fill="#10B981" fillOpacity="0.18" filter="blur(6px)" />

        {/* 3. Highway Lane Lines (Perspective Road beneath vehicle) */}
        <path
          d="M8 43L16 33.5M40 43L32 33.5"
          stroke="url(#road_neon_grad)"
          strokeWidth="2.2"
          strokeLinecap="round"
          strokeOpacity="0.8"
        />
        {/* Center Dashed Lane Divider */}
        <line
          x1="24"
          y1="43"
          x2="24"
          y2="34"
          stroke="#FBBF24"
          strokeWidth="1.6"
          strokeDasharray="2.5 2.5"
          strokeLinecap="round"
          strokeOpacity="0.85"
        />

        {/* 4. Left & Right Aero Tyres */}
        <rect x="11.5" y="29.5" width="3.2" height="7.5" rx="1.6" fill="#0B0F19" stroke="#38BDF8" strokeWidth="0.6" strokeOpacity="0.5" />
        <rect x="33.3" y="29.5" width="3.2" height="7.5" rx="1.6" fill="#0B0F19" stroke="#38BDF8" strokeWidth="0.6" strokeOpacity="0.5" />

        {/* 5. Aerodynamic Vehicle Body Shell (Pearlescent Platinum & Electric Accents) */}
        <path
          d="M14.5 37C13.2 37 12.3 35.8 12.6 34.4L15 22C15.6 17.8 18.8 14.8 22.8 14.8H25.2C29.2 14.8 32.4 17.8 33 22L35.4 34.4C35.7 35.8 34.8 37 33.5 37H14.5Z"
          fill="url(#cab_body_platinum)"
        />
        <path
          d="M14.5 37C13.2 37 12.3 35.8 12.6 34.4L15 22C15.6 17.8 18.8 14.8 22.8 14.8H25.2C29.2 14.8 32.4 17.8 33 22L35.4 34.4C35.7 35.8 34.8 37 33.5 37H14.5Z"
          stroke="url(#cab_body_stroke)"
          strokeWidth="0.8"
        />

        {/* Dynamic Aerodynamic Side Mirrors */}
        <path d="M12.5 24.5C11 24.5 10.5 25.5 11 26.8L12.8 29H14.2L13.5 25C13.3 24.7 12.9 24.5 12.5 24.5Z" fill="#F59E0B" />
        <path d="M35.5 24.5C37 24.5 37.5 25.5 37 26.8L35.2 29H33.8L34.5 25C34.7 24.7 35.1 24.5 35.5 24.5Z" fill="#10B981" />

        {/* 6. Tinted Cyber Canopy (Deep Indigo Glass) */}
        <path
          d="M17 33L18.4 22.5C18.8 20.2 20.8 18.5 23.2 18.5H24.8C27.2 18.5 29.2 20.2 29.6 22.5L31 33H17Z"
          fill="url(#cab_canopy_tint)"
        />
        <path
          d="M17 33L18.4 22.5C18.8 20.2 20.8 18.5 23.2 18.5H24.8C27.2 18.5 29.2 20.2 29.6 22.5L31 33H17Z"
          stroke="#38BDF8"
          strokeWidth="0.75"
          strokeOpacity="0.6"
        />

        {/* 7. Four Glowing Student Pooling Seats (The Signature 4-Way Co-Rider Split) */}
        {/* Front Left Rider (Golden Amber) */}
        <circle cx="20.8" cy="23.6" r="2" fill="#F59E0B" />
        <circle cx="20.8" cy="23.6" r="0.9" fill="#FFFBEB" />

        {/* Front Right Rider (Mint Emerald) */}
        <circle cx="27.2" cy="23.6" r="2" fill="#10B981" />
        <circle cx="27.2" cy="23.6" r="0.9" fill="#ECFDF5" />

        {/* Rear Left Rider (Mint Emerald) */}
        <circle cx="20.8" cy="29.2" r="2" fill="#10B981" />
        <circle cx="20.8" cy="29.2" r="0.9" fill="#ECFDF5" />

        {/* Rear Right Rider (Golden Amber) */}
        <circle cx="27.2" cy="29.2" r="2" fill="#F59E0B" />
        <circle cx="27.2" cy="29.2" r="0.9" fill="#FFFBEB" />

        {/* Equal Fare-Split Nexus (Center sharing matrix lines) */}
        <line x1="20.8" y1="23.6" x2="27.2" y2="29.2" stroke="#FDE047" strokeWidth="0.8" strokeOpacity="0.85" strokeDasharray="1.2 1.2" />
        <line x1="27.2" y1="23.6" x2="20.8" y2="29.2" stroke="#6EE7B7" strokeWidth="0.8" strokeOpacity="0.85" strokeDasharray="1.2 1.2" />
        <circle cx="24" cy="26.4" r="1.6" fill="#FFFFFF" stroke="#0F172A" strokeWidth="0.8" />
        <circle cx="24" cy="26.4" r="0.7" fill="#10B981" />

        {/* 8. Twin Angled High-Beam Projector Headlights */}
        <polygon points="15.2,34.8 19.4,34.8 18.6,32.2 14.8,32.8" fill="#FDE047" />
        <polygon points="32.8,34.8 28.6,34.8 29.4,32.2 33.2,32.8" fill="#6EE7B7" />

        {/* 9. Smart Pool Lightbar (Iconic Taxi Roof Pod reimagined) */}
        <rect x="20" y="14.8" width="8" height="2.4" rx="1.2" fill="url(#roof_pod_grad)" />
        <circle cx="24" cy="16" r="1" fill="#FFFFFF" />

        {/* 10. Forward Waypoint Arrow (High-Beam Direction) */}
        <path
          d="M21.2 12.8L24 6.2L26.8 12.8L24 11.4L21.2 12.8Z"
          fill="url(#waypoint_arrow_grad)"
          className={animated ? "animate-pulse" : ""}
        />

        {/* Gradients */}
        <defs>
          {/* Midnight Obsidian Badge */}
          <linearGradient id="fs_badge_bg" x1="0" y1="0" x2="48" y2="48" gradientUnits="userSpaceOnUse">
            <stop stopColor="#0B1120" />
            <stop offset="0.55" stopColor="#0F172A" />
            <stop offset="1" stopColor="#1E293B" />
          </linearGradient>

          {/* Border Gradient (Gold Amber to Mint Emerald) */}
          <linearGradient id="fs_border_grad" x1="0" y1="0" x2="48" y2="48" gradientUnits="userSpaceOnUse">
            <stop stopColor="#F59E0B" />
            <stop offset="0.5" stopColor="#FBBF24" />
            <stop offset="1" stopColor="#10B981" />
          </linearGradient>

          {/* Road Neon Gradient */}
          <linearGradient id="road_neon_grad" x1="8" y1="43" x2="40" y2="33" gradientUnits="userSpaceOnUse">
            <stop stopColor="#F59E0B" />
            <stop offset="1" stopColor="#10B981" />
          </linearGradient>

          {/* Pearlescent Platinum Cab Shell */}
          <linearGradient id="cab_body_platinum" x1="12" y1="15" x2="36" y2="37" gradientUnits="userSpaceOnUse">
            <stop stopColor="#FFFFFF" />
            <stop offset="0.7" stopColor="#F1F5F9" />
            <stop offset="1" stopColor="#E2E8F0" />
          </linearGradient>

          <linearGradient id="cab_body_stroke" x1="12" y1="15" x2="36" y2="37" gradientUnits="userSpaceOnUse">
            <stop stopColor="#F59E0B" stopOpacity="0.8" />
            <stop offset="1" stopColor="#10B981" stopOpacity="0.8" />
          </linearGradient>

          {/* Smoked Cyber Canopy */}
          <linearGradient id="cab_canopy_tint" x1="17" y1="18" x2="31" y2="33" gradientUnits="userSpaceOnUse">
            <stop stopColor="#0F172A" />
            <stop offset="0.5" stopColor="#1E293B" />
            <stop offset="1" stopColor="#0B132B" />
          </linearGradient>

          {/* Roof Pod Gradient */}
          <linearGradient id="roof_pod_grad" x1="20" y1="15" x2="28" y2="17" gradientUnits="userSpaceOnUse">
            <stop stopColor="#F59E0B" />
            <stop offset="1" stopColor="#10B981" />
          </linearGradient>

          {/* Waypoint Arrow Gradient */}
          <linearGradient id="waypoint_arrow_grad" x1="21" y1="6" x2="27" y2="13" gradientUnits="userSpaceOnUse">
            <stop stopColor="#FBBF24" />
            <stop offset="1" stopColor="#34D399" />
          </linearGradient>
        </defs>
      </svg>
    </div>
  );
}
