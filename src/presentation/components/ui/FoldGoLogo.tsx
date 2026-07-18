'use client';

import React from 'react';

interface FoldGoLogoProps {
  iconSize?: number;
  title?: string;
  supportingText?: string;
  showText?: boolean;
  className?: string;
}

export const FoldGoLogo: React.FC<FoldGoLogoProps> = ({
  iconSize = 44,
  title = "Fold&Go",
  supportingText = "Freshly Managed",
  showText = true,
  className = "",
}) => {
  const borderRadiusStyle = { borderRadius: `${iconSize * 0.35}px` };
  const sparkleSize = iconSize * 0.35;
  const sparkleOffset = iconSize * 0.12;
  const iconInnerSize = iconSize * 0.55;

  return (
    <div className={`flex items-center gap-3 select-none ${className}`}>
      
      {/* 📦 LOGO ICON LAYER BASE */}
      <div className="relative shrink-0" style={{ width: `${iconSize}px`, height: `${iconSize}px` }}>
        
        {/* Surface Container with Teal/Green Gradient Brush */}
        <div 
          className="w-full h-full bg-gradient-to-br from-[#0298A6] via-[#00BFA5] to-[#00C853] flex items-center justify-center shadow-sm overflow-hidden"
          style={borderRadiusStyle}
        >
          {/* 👕 Exact Material Design Folded Clothes Layers Stack */}
          <svg 
            width={iconInnerSize} 
            height={iconInnerSize} 
            viewBox="0 0 24 24" 
            fill="currentColor" 
            className="text-white/95"
          >
            {/* Bottom Layer */}
            <path d="M2 17l10 5 10-5-10-5L2 17z" opacity="0.8" />
            {/* Middle Layer */}
            <path d="M2 12l10 5 10-5-10-5L2 12z" opacity="0.9" />
            {/* Top Layer */}
            <path d="M12 2L2 7l10 5 10-5-10-5z" />
          </svg>
        </div>

        {/* ✨ Sparkle Overlay (Top Right Overlap Accent) */}
        <div 
          className="absolute z-10 text-[#69F0AE]"
          style={{
            width: `${sparkleSize}px`,
            height: `${sparkleSize}px`,
            top: `-${sparkleOffset}px`,
            right: `-${sparkleOffset}px`,
          }}
        >
          <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full drop-shadow-[0_1px_3px_rgba(0,200,83,0.5)]">
            <path d="M19 9l1.25-2.75L23 5l-2.75-1.25L19 1l-1.25 2.75L15 5l2.75 1.25L19 9zm-7.5.5L9 4 6.5 9.5 1 12l5.5 2.5L9 20l2.5-5.5 5.5-2.5-5.5-2.5zm7.5 7l-1.25 2.75L15 20l2.75 1.25L19 23l1.25-2.75L23 20l-2.75-1.25L19 16.5z"/>
          </svg>
        </div>
      </div>

      {/* 🔤 TEXT LAYOUT BLOCK */}
      {showText && (
        <div className="flex flex-col justify-center">
          <span 
            className="font-bold text-current tracking-tight leading-tight"
            style={{ 
              fontSize: `${iconSize * 0.46}px`, 
              letterSpacing: '-0.03em'
            }}
          >
            {title}
          </span>
          <span 
            className="text-current/60 font-medium tracking-normal block leading-none mt-0.5"
            style={{ 
              fontSize: `${iconSize * 0.26}px`,
              letterSpacing: '0.02em'
            }}
          >
            {supportingText}
          </span>
        </div>
      )}

    </div>
  );
};