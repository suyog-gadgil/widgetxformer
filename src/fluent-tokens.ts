/**
 * Fluent UI Design Tokens for WidgetXFormer
 * Based on Microsoft Fluent Design System
 */

// Import Fluent UI tokens (these are CSS custom properties)
export const fluentTokens = {
  // Colors - Neutral Palette
  colorNeutralForeground1: 'var(--colorNeutralForeground1, #242424)',
  colorNeutralForeground2: 'var(--colorNeutralForeground2, #424242)',
  colorNeutralForeground3: 'var(--colorNeutralForeground3, #616161)',
  colorNeutralBackground1: 'var(--colorNeutralBackground1, #ffffff)',
  colorNeutralBackground2: 'var(--colorNeutralBackground2, #fafafa)',
  colorNeutralBackground3: 'var(--colorNeutralBackground3, #f5f5f5)',
  colorNeutralStroke1: 'var(--colorNeutralStroke1, #d1d1d1)',
  colorNeutralStroke2: 'var(--colorNeutralStroke2, #e0e0e0)',

  // Colors - Brand Palette
  colorBrandBackground: 'var(--colorBrandBackground, #0078d4)',
  colorBrandBackgroundHover: 'var(--colorBrandBackgroundHover, #106ebe)',
  colorBrandBackgroundPressed: 'var(--colorBrandBackgroundPressed, #005a9e)',
  colorBrandForeground1: 'var(--colorBrandForeground1, #0078d4)',
  colorBrandForeground2: 'var(--colorBrandForeground2, #106ebe)',

  // Colors - Semantic
  colorStatusSuccessBackground1: 'var(--colorStatusSuccessBackground1, #f1f8ff)',
  colorStatusSuccessForeground1: 'var(--colorStatusSuccessForeground1, #107c10)',
  colorStatusWarningBackground1: 'var(--colorStatusWarningBackground1, #fff8f0)',
  colorStatusWarningForeground1: 'var(--colorStatusWarningForeground1, #bc4a00)',
  colorStatusDangerBackground1: 'var(--colorStatusDangerBackground1, #fdf6f6)',
  colorStatusDangerForeground1: 'var(--colorStatusDangerForeground1, #c50e20)',

  // Typography
  fontFamilyBase: 'var(--fontFamilyBase, "Segoe UI", "Segoe UI Web (West European)", -apple-system, BlinkMacSystemFont, Roboto, "Helvetica Neue", sans-serif)',
  fontFamilyMonospace: 'var(--fontFamilyMonospace, "Cascadia Code", "Cascadia Mono", Consolas, "Courier New", Courier, monospace)',
  
  fontSizeBase100: 'var(--fontSizeBase100, 10px)',
  fontSizeBase200: 'var(--fontSizeBase200, 12px)',
  fontSizeBase300: 'var(--fontSizeBase300, 14px)',
  fontSizeBase400: 'var(--fontSizeBase400, 16px)',
  fontSizeBase500: 'var(--fontSizeBase500, 20px)',
  fontSizeBase600: 'var(--fontSizeBase600, 24px)',
  fontSizeHero700: 'var(--fontSizeHero700, 28px)',
  fontSizeHero800: 'var(--fontSizeHero800, 32px)',
  fontSizeHero900: 'var(--fontSizeHero900, 40px)',
  fontSizeHero1000: 'var(--fontSizeHero1000, 68px)',

  fontWeightRegular: 'var(--fontWeightRegular, 400)',
  fontWeightMedium: 'var(--fontWeightMedium, 500)',
  fontWeightSemibold: 'var(--fontWeightSemibold, 600)',
  fontWeightBold: 'var(--fontWeightBold, 700)',

  lineHeightBase100: 'var(--lineHeightBase100, 14px)',
  lineHeightBase200: 'var(--lineHeightBase200, 16px)',
  lineHeightBase300: 'var(--lineHeightBase300, 20px)',
  lineHeightBase400: 'var(--lineHeightBase400, 22px)',
  lineHeightBase500: 'var(--lineHeightBase500, 28px)',
  lineHeightBase600: 'var(--lineHeightBase600, 32px)',
  lineHeightHero700: 'var(--lineHeightHero700, 36px)',
  lineHeightHero800: 'var(--lineHeightHero800, 40px)',
  lineHeightHero900: 'var(--lineHeightHero900, 52px)',
  lineHeightHero1000: 'var(--lineHeightHero1000, 92px)',

  // Spacing
  spacingHorizontalXXS: 'var(--spacingHorizontalXXS, 2px)',
  spacingHorizontalXS: 'var(--spacingHorizontalXS, 4px)',
  spacingHorizontalSNudge: 'var(--spacingHorizontalSNudge, 6px)',
  spacingHorizontalS: 'var(--spacingHorizontalS, 8px)',
  spacingHorizontalMNudge: 'var(--spacingHorizontalMNudge, 10px)',
  spacingHorizontalM: 'var(--spacingHorizontalM, 12px)',
  spacingHorizontalL: 'var(--spacingHorizontalL, 16px)',
  spacingHorizontalXL: 'var(--spacingHorizontalXL, 20px)',
  spacingHorizontalXXL: 'var(--spacingHorizontalXXL, 24px)',
  spacingHorizontalXXXL: 'var(--spacingHorizontalXXXL, 32px)',

  spacingVerticalXXS: 'var(--spacingVerticalXXS, 2px)',
  spacingVerticalXS: 'var(--spacingVerticalXS, 4px)',
  spacingVerticalSNudge: 'var(--spacingVerticalSNudge, 6px)',
  spacingVerticalS: 'var(--spacingVerticalS, 8px)',
  spacingVerticalMNudge: 'var(--spacingVerticalMNudge, 10px)',
  spacingVerticalM: 'var(--spacingVerticalM, 12px)',
  spacingVerticalL: 'var(--spacingVerticalL, 16px)',
  spacingVerticalXL: 'var(--spacingVerticalXL, 20px)',
  spacingVerticalXXL: 'var(--spacingVerticalXXL, 24px)',
  spacingVerticalXXXL: 'var(--spacingVerticalXXXL, 32px)',

  // Border Radius
  borderRadiusNone: 'var(--borderRadiusNone, 0)',
  borderRadiusSmall: 'var(--borderRadiusSmall, 2px)',
  borderRadiusMedium: 'var(--borderRadiusMedium, 4px)',
  borderRadiusLarge: 'var(--borderRadiusLarge, 6px)',
  borderRadiusXLarge: 'var(--borderRadiusXLarge, 8px)',
  borderRadiusCircular: 'var(--borderRadiusCircular, 10000px)',

  // Shadows
  shadow2: 'var(--shadow2, 0px 1px 2px rgba(0, 0, 0, 0.14), 0px 0px 2px rgba(0, 0, 0, 0.12))',
  shadow4: 'var(--shadow4, 0px 2px 4px rgba(0, 0, 0, 0.14), 0px 0px 2px rgba(0, 0, 0, 0.12))',
  shadow8: 'var(--shadow8, 0px 4px 8px rgba(0, 0, 0, 0.14), 0px 0px 2px rgba(0, 0, 0, 0.12))',
  shadow16: 'var(--shadow16, 0px 8px 16px rgba(0, 0, 0, 0.14), 0px 0px 2px rgba(0, 0, 0, 0.12))',
  shadow28: 'var(--shadow28, 0px 14px 28px rgba(0, 0, 0, 0.24), 0px 0px 8px rgba(0, 0, 0, 0.20))',
  shadow64: 'var(--shadow64, 0px 32px 64px rgba(0, 0, 0, 0.24), 0px 0px 8px rgba(0, 0, 0, 0.20))',

  // Stroke Width
  strokeWidthThin: 'var(--strokeWidthThin, 1px)',
  strokeWidthThick: 'var(--strokeWidthThick, 2px)',
  strokeWidthThicker: 'var(--strokeWidthThicker, 3px)',
  strokeWidthThickest: 'var(--strokeWidthThickest, 4px)',

  // Animation
  curveAccelerateMax: 'var(--curveAccelerateMax, cubic-bezier(0.9,0.1,1,0.2))',
  curveAccelerateMid: 'var(--curveAccelerateMid, cubic-bezier(1,0,1,1))',
  curveAccelerateMin: 'var(--curveAccelerateMin, cubic-bezier(0.8,0,0.78,1))',
  curveDecelerateMax: 'var(--curveDecelerateMax, cubic-bezier(0.1,0.9,0.2,1))',
  curveDecelerateMid: 'var(--curveDecelerateMid, cubic-bezier(0,0,0,1))',
  curveDecelerateMin: 'var(--curveDecelerateMin, cubic-bezier(0.33,0,0.1,1))',
  curveEasyEaseMax: 'var(--curveEasyEaseMax, cubic-bezier(0.8,0,0.2,1))',
  curveEasyEase: 'var(--curveEasyEase, cubic-bezier(0.33,0,0.67,1))',
  curveLinear: 'var(--curveLinear, cubic-bezier(0,0,1,1))',

  durationUltraFast: 'var(--durationUltraFast, 50ms)',
  durationFaster: 'var(--durationFaster, 100ms)',
  durationFast: 'var(--durationFast, 150ms)',
  durationNormal: 'var(--durationNormal, 200ms)',
  durationGentle: 'var(--durationGentle, 250ms)',
  durationSlow: 'var(--durationSlow, 300ms)',
  durationSlower: 'var(--durationSlower, 400ms)',
  durationUltraSlow: 'var(--durationUltraSlow, 500ms)',
};

// Dark theme variants
export const fluentTokensDark = {
  colorNeutralForeground1: 'var(--colorNeutralForeground1, #ffffff)',
  colorNeutralForeground2: 'var(--colorNeutralForeground2, #f0f0f0)',
  colorNeutralForeground3: 'var(--colorNeutralForeground3, #c8c8c8)',
  colorNeutralBackground1: 'var(--colorNeutralBackground1, #1f1f1f)',
  colorNeutralBackground2: 'var(--colorNeutralBackground2, #2d2d2d)',
  colorNeutralBackground3: 'var(--colorNeutralBackground3, #404040)',
  colorNeutralStroke1: 'var(--colorNeutralStroke1, #616161)',
  colorNeutralStroke2: 'var(--colorNeutralStroke2, #525252)',
};

export type FluentTheme = 'light' | 'dark' | 'highContrast';

export const getFluentTokens = (theme: FluentTheme = 'light') => {
  const baseTokens = fluentTokens;
  
  switch (theme) {
    case 'dark':
      return { ...baseTokens, ...fluentTokensDark };
    case 'highContrast':
      // High contrast theme could be added here
      return baseTokens;
    default:
      return baseTokens;
  }
};

// Helper function to apply Fluent UI CSS custom properties
export const applyFluentTokens = (element: HTMLElement, theme: FluentTheme = 'light') => {
  const tokens = getFluentTokens(theme);
  
  // Apply CSS custom properties to the element
  Object.entries(tokens).forEach(([key, value]) => {
    const cssProperty = `--${key}`;
    element.style.setProperty(cssProperty, value.replace(/var\([^,]+,\s*([^)]+)\)/, '$1'));
  });
};

export default fluentTokens;
