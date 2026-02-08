import React from 'react';

// Using raw SVG paths for a "Phosphor-like" custom icon set.
// Style: Thin stroke, crisp edges, premium feel.

interface IconProps {
  className?: string;
  size?: number;
  color?: string;
  strokeWidth?: string | number;
}

export const IconDiamond: React.FC<IconProps> = ({ className, size = 24, color = "currentColor", strokeWidth = 16 }) => (
  <svg width={size} height={size} viewBox="0 0 256 256" className={className} fill="none" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round">
    <path d="M52.3,108.8,116.5,231a16,16,0,0,0,28.3,0l64.2-122.2a16.2,16.2,0,0,0-2.3-17.7L153.5,29.8A16.2,16.2,0,0,0,141.2,24H114.8a16.2,16.2,0,0,0-12.3,5.8L49.9,91.1A16.2,16.2,0,0,0,52.3,108.8Z"></path>
  </svg>
);

export const IconUsers: React.FC<IconProps> = ({ className, size = 24, color = "currentColor", strokeWidth = 16 }) => (
  <svg width={size} height={size} viewBox="0 0 256 256" className={className} fill="none" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round">
    <circle cx="88" cy="108" r="52"></circle>
    <path d="M155.4,57.9A54.5,54.5,0,0,1,169.5,56a52,52,0,0,1,0,104"></path>
    <path d="M16,197.4a88,88,0,0,1,144,0"></path>
    <path d="M169.5,160a87.9,87.9,0,0,1,72,37.4"></path>
  </svg>
);

export const IconCompass: React.FC<IconProps> = ({ className, size = 24, color = "currentColor", strokeWidth = 16 }) => (
  <svg width={size} height={size} viewBox="0 0 256 256" className={className} fill="none" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round">
    <circle cx="128" cy="128" r="96"></circle>
    <polygon points="160 96 96 160 116.7 106 160 96"></polygon>
    <polygon points="160 96 139.3 150 96 160 160 96"></polygon>
  </svg>
);

export const IconTrendUp: React.FC<IconProps> = ({ className, size = 24, color = "currentColor", strokeWidth = 16 }) => (
  <svg width={size} height={size} viewBox="0 0 256 256" className={className} fill="none" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round">
    <polyline points="232 56 136 152 96 112 24 184"></polyline>
    <polyline points="232 120 232 56 168 56"></polyline>
  </svg>
);

export const IconCheck: React.FC<IconProps> = ({ className, size = 24, color = "currentColor", strokeWidth = 16 }) => (
  <svg width={size} height={size} viewBox="0 0 256 256" className={className} fill="none" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round">
    <polyline points="216 72 104 184 48 128"></polyline>
  </svg>
);

export const IconArrowRight: React.FC<IconProps> = ({ className, size = 24, color = "currentColor", strokeWidth = 16 }) => (
  <svg width={size} height={size} viewBox="0 0 256 256" className={className} fill="none" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round">
    <line x1="64" y1="128" x2="216" y2="128"></line>
    <polyline points="168 80 216 128 168 176"></polyline>
  </svg>
);

export const IconMapPin: React.FC<IconProps> = ({ className, size = 24, color = "currentColor", strokeWidth = 16 }) => (
  <svg width={size} height={size} viewBox="0 0 256 256" className={className} fill="none" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round">
    <circle cx="128" cy="104" r="32"></circle>
    <path d="M208,104c0,72-80,128-80,128S48,176,48,104a80,80,0,0,1,160,0Z"></path>
  </svg>
);

export const IconCalendar: React.FC<IconProps> = ({ className, size = 24, color = "currentColor", strokeWidth = 16 }) => (
  <svg width={size} height={size} viewBox="0 0 256 256" className={className} fill="none" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round">
    <rect x="40" y="48" width="176" height="176" rx="8"></rect>
    <line x1="176" y1="24" x2="176" y2="56"></line>
    <line x1="80" y1="24" x2="80" y2="56"></line>
    <line x1="40" y1="88" x2="216" y2="88"></line>
  </svg>
);

export const IconPlay: React.FC<IconProps> = ({ className, size = 24, color = "currentColor", strokeWidth = 16 }) => (
  <svg width={size} height={size} viewBox="0 0 256 256" className={className} fill="none" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round">
    <polygon points="72 40 200 128 72 216 72 40"></polygon>
  </svg>
);

// --- New Icons for EVO Care ---

export const IconSend: React.FC<IconProps> = ({ className, size = 24, color = "currentColor", strokeWidth = 16 }) => (
  <svg width={size} height={size} viewBox="0 0 256 256" className={className} fill="none" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round">
    <line x1="224" y1="128" x2="32" y2="128"></line>
    <polyline points="152 56 224 128 152 200"></polyline>
  </svg>
);

export const IconSparkle: React.FC<IconProps> = ({ className, size = 24, color = "currentColor", strokeWidth = 16 }) => (
  <svg width={size} height={size} viewBox="0 0 256 256" className={className} fill="none" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round">
    <path d="M160,16A95.9,95.9,0,0,0,98.7,92.5,96.3,96.3,0,0,0,32,128a96.3,96.3,0,0,0,66.7,35.5A95.9,95.9,0,0,0,160,240a95.9,95.9,0,0,0,61.3-76.5A96.3,96.3,0,0,0,224,128,96.3,96.3,0,0,0,160,16Z"></path>
  </svg>
);

export const IconCircleDashed: React.FC<IconProps> = ({ className, size = 24, color = "currentColor", strokeWidth = 16 }) => (
  <svg width={size} height={size} viewBox="0 0 256 256" className={className} fill="none" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round">
    <path d="M128,24A104,104,0,1,0,232,128,104.2,104.2,0,0,0,128,24Zm0,176a72,72,0,1,1,72-72A72.1,72.1,0,0,1,128,200Z" opacity="0.2"></path>
    <circle cx="128" cy="128" r="104" strokeDasharray="16 16"></circle>
  </svg>
);

export const IconLock: React.FC<IconProps> = ({ className, size = 24, color = "currentColor", strokeWidth = 16 }) => (
  <svg width={size} height={size} viewBox="0 0 256 256" className={className} fill="none" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round">
    <rect x="40" y="88" width="176" height="128" rx="8"></rect>
    <path d="M92,88V52a36,36,0,0,1,72,0V88"></path>
  </svg>
);

export const IconWarning: React.FC<IconProps> = ({ className, size = 24, color = "currentColor", strokeWidth = 16 }) => (
  <svg width={size} height={size} viewBox="0 0 256 256" className={className} fill="none" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round">
    <path d="M114.2,40l-88,152A16,16,0,0,0,40,216H216a16,16,0,0,0,13.8-24l-88-152A15.9,15.9,0,0,0,114.2,40Z"></path>
    <line x1="128" y1="104" x2="128" y2="144"></line>
    <circle cx="128" cy="180" r="2" fill={color} stroke="none"></circle>
  </svg>
);
export const IconDoor: React.FC<IconProps> = ({ className, size = 24, color = "currentColor", strokeWidth = 16 }) => (
  <svg width={size} height={size} viewBox="0 0 256 256" className={className} fill="none" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round">
    <rect x="40" y="32" width="176" height="192" rx="8"></rect>
    <line x1="88" y1="32" x2="88" y2="224"></line>
    <circle cx="128" cy="128" r="4" fill={color} stroke="none"></circle>
  </svg>
);
