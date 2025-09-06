/**
 * WidgetXFormer - A JavaScript library for rendering interactive widgets from JSON data
 * Supports: Tabs, Charts (Doughnut, Bar, Line), Accordions, Cards, Maps, and more
 * Enhanced with Microsoft Fluent UI Design System
 * 
 * ==================== LLM INTEGRATION DOCUMENTATION ====================
 * 
 * INITIALIZATION:
 * ```javascript
 * import WidgetXFormer from './widget-xformer';
 * const widgetRenderer = WidgetXFormer.getInstance();
 * ```
 * 
 * PRIMARY METHOD - render():
 * ```javascript
 * widgetRenderer.render(config, containerId);
 * ```
 * 
 * PARAMETERS:
 * - config: WidgetConfig object (required)
 * - containerId: string - DOM element ID where widget will be rendered (required)
 * 
 * WidgetConfig INTERFACE:
 * ```typescript
 * {
 *   type: string,           // Widget type (see SUPPORTED WIDGET TYPES below)
 *   data: any,             // Widget-specific data structure
 *   style?: {              // Optional styling configuration
 *     theme?: string,      // Theme name: 'light' | 'fluent-dark' | 'default' | 'brand' | 'dark'
 *     palette?: string,    // Color palette (future use)
 *     density?: string,    // Layout density (future use)
 *     fluentDesign?: boolean // Enable Fluent UI design (default: true)
 *   }
 * }
 * ```
 * 
 * SUPPORTED WIDGET TYPES:
 * 1. 'tabs' - Tab navigation widget
 * 2. 'doughnut' - Doughnut chart
 * 3. 'bar' - Bar chart
 * 4. 'line' - Line chart
 * 5. 'accordion' - Collapsible content sections
 * 6. 'card' - Content card
 * 7. 'metric' - Key performance indicator display
 * 8. 'table' - Data table
 * 9. 'worldmap' - World map visualization
 * 10. 'timeline' - Event timeline with rich configuration
 * 11. 'fluent-card' - Enhanced Fluent UI card
 * 12. 'fluent-button' - Fluent UI button
 * 13. 'fluent-progressbar' - Fluent UI progress indicator
 * 14. 'profile-card' - Profile/avatar card with social links
 * 15. 'stats-card' - Statistics card with trend information
 * 16. 'notification-card' - Notification/alert card with actions
 * 17. 'progress-bar' - Linear progress bar indicator
 * 18. 'kpi-donut' - KPI donut chart with center text
 * 19. 'funnel' - Multi-stage funnel visualization
 * 20. 'scatter' - Scatter plot chart
 * 21. 'bubble' - Bubble chart with 3D data
 * 22. 'gauge' - Circular gauge/meter widget
 * 23. 'heatmap' - Calendar-style activity heatmap
 * 24. 'slider' - Interactive range slider control
 * 
 * WIDGET DATA STRUCTURES:
 * 
 * TABS:
 * data: { items: TabItem[] }
 * TabItem: { id: string, label: string, content: string }
 * 
 * CHARTS (doughnut, bar, line):
 * data: ChartData
 * ChartData: {
 *   labels: string[],
 *   datasets: ChartDataset[]
 * }
 * ChartDataset: {
 *   label: string,
 *   data: number[],
 *   backgroundColor?: string | string[],
 *   borderColor?: string | string[],
 *   borderWidth?: number
 * }
 * 
 * ACCORDION:
 * data: { items: AccordionItem[] }
 * AccordionItem: {
 *   id: string,
 *   title: string,
 *   content: string,
 *   expanded?: boolean
 * }
 * 
 * CARD:
 * data: {
 *   title?: string,
 *   content?: string,
 *   actions?: any[],
 *   interactive?: boolean
 * }
 * 
 * METRIC:
 * data: {
 *   value: string | number,
 *   label: string
 * }
 * 
 * TABLE:
 * data: {
 *   headers?: string[],
 *   rows?: string[][]
 * }
 * 
 * TIMELINE:
 * data: {
 *   events: TimelineEvent[],
 *   config?: TimelineConfig
 * }
 * TimelineEvent: {
 *   id: string,
 *   date: string | Date,
 *   title: string,
 *   description?: string,
 *   category?: string,
 *   icon?: string,
 *   status?: 'completed' | 'current' | 'upcoming' | 'cancelled',
 *   link?: string,
 *   metadata?: Record<string, any>
 * }
 * TimelineConfig: {
 *   orientation?: 'vertical' | 'horizontal',
 *   layout?: 'left' | 'right' | 'alternating' | 'center',
 *   showDates?: boolean,
 *   showIcons?: boolean,
 *   groupBy?: 'none' | 'year' | 'month' | 'category',
 *   sortOrder?: 'asc' | 'desc',
 *   showProgress?: boolean,
 *   animate?: boolean,
 *   interactive?: boolean,
 *   dateFormat?: string,
 *   showConnectors?: boolean,
 *   compactMode?: boolean
 * }
 * 
 * FLUENT-CARD:
 * data: {
 *   title?: string,
 *   content?: string,
 *   actions?: Array<{
 *     text: string,
 *     appearance?: 'primary' | 'secondary' | 'outline' | 'subtle',
 *     onClick?: Function
 *   }>,
 *   interactive?: boolean
 * }
 * 
 * FLUENT-BUTTON:
 * data: {
 *   text: string,
 *   appearance?: 'primary' | 'secondary' | 'outline' | 'subtle',
 *   onClick?: Function
 * }
 * 
 * FLUENT-PROGRESSBAR:
 * data: {
 *   value: number,      // 0-100
 *   label?: string,
 *   description?: string,
 *   indeterminate?: boolean
 * }
 * 
 * PROFILE-CARD:
 * data: {
 *   name: string,
 *   title?: string,
 *   avatar?: string,    // Image URL
 *   socialLinks?: Array<{
 *     icon: string,     // Icon or emoji
 *     url: string
 *   }>
 * }
 * 
 * STATS-CARD:
 * data: {
 *   title: string,
 *   value: string | number,
 *   trend?: string,     // e.g., "+12% from last week"
 *   icon?: string,      // Icon or emoji
 *   accentColor?: string,
 *   clickable?: boolean,
 *   onClick?: Function
 * }
 * 
 * NOTIFICATION-CARD:
 * data: {
 *   title: string,
 *   message: string,
 *   type?: 'success' | 'warning' | 'error' | 'info',
 *   icon?: string,
 *   action?: {
 *     text: string,
 *     onClick: Function
 *   }
 * }
 * 
 * PROGRESS-BAR:
 * data: {
 *   label?: string,
 *   value: number,      // 0-100
 *   height?: string,    // CSS height value
 *   color?: string,
 *   animated?: boolean
 * }
 * 
 * KPI-DONUT:
 * data: {
 *   value: number,      // 0-100
 *   label?: string,
 *   color?: string
 * }
 * 
 * FUNNEL:
 * data: {
 *   title?: string,
 *   stages: Array<{
 *     label: string,
 *     value: number,
 *     unit?: string,    // e.g., '%', 'users'
 *     color?: string
 *   }>
 * }
 * 
 * SCATTER:
 * data: ChartData with point format: { x: number, y: number }
 * 
 * BUBBLE:
 * data: ChartData with point format: { x: number, y: number, r: number }
 * 
 * GAUGE:
 * data: {
 *   title?: string,
 *   value: number,      // 0-100
 *   color?: string
 * }
 * 
 * HEATMAP:
 * data: {
 *   title?: string,
 *   columns?: number,   // Grid columns (default: 7)
 *   rows?: number,      // Grid rows (default: 13)
 *   data?: number[]     // Activity values 0-1, auto-generated if not provided
 * }
 * 
 * SLIDER:
 * data: {
 *   label?: string,
 *   min?: number,       // Default: 0
 *   max?: number,       // Default: 100
 *   step?: number,      // Default: 1
 *   value?: number,     // Initial value
 *   description?: string,
 *   onChange?: Function // Callback with new value
 * }
 * 
 * EXAMPLE USAGE:
 * 
 * 1. Basic Tab Widget:
 * ```javascript
 * widgetRenderer.render({
 *   type: 'tabs',
 *   data: {
 *     items: [
 *       { id: '1', label: 'Tab 1', content: 'Content 1' },
 *       { id: '2', label: 'Tab 2', content: 'Content 2' }
 *     ]
 *   },
 *   style: { theme: 'light' }
 * }, 'tab-container');
 * ```
 * 
 * 2. Chart Widget:
 * ```javascript
 * widgetRenderer.render({
 *   type: 'bar',
 *   data: {
 *     labels: ['A', 'B', 'C'],
 *     datasets: [{
 *       label: 'Dataset 1',
 *       data: [10, 20, 30],
 *       backgroundColor: ['#ff6384', '#36a2eb', '#ffcd56']
 *     }]
 *   },
 *   style: { theme: 'light' }
 * }, 'chart-container');
 * ```
 * 
 * 3. Timeline Widget:
 * ```javascript
 * widgetRenderer.render({
 *   type: 'timeline',
 *   data: {
 *     events: [
 *       {
 *         id: '1',
 *         date: '2024-01-15',
 *         title: 'Project Started',
 *         description: 'Initial project kickoff',
 *         status: 'completed'
 *       }
 *     ],
 *     config: {
 *       orientation: 'vertical',
 *       showProgress: true,
 *       animate: true
 *     }
 *   },
 *   style: { theme: 'light' }
 * }, 'timeline-container');
 * ```
 * 
 * 4. Fluent UI Card:
 * ```javascript
 * widgetRenderer.render({
 *   type: 'fluent-card',
 *   data: {
 *     title: 'Card Title',
 *     content: 'Card content goes here',
 *     actions: [
 *       { text: 'Primary Action', appearance: 'primary' },
 *       { text: 'Secondary Action', appearance: 'secondary' }
 *     ],
 *     interactive: true
 *   },
 *   style: { theme: 'light' }
 * }, 'card-container');
 * ```
 * 
 * 5. Profile Card:
 * ```javascript
 * widgetRenderer.render({
 *   type: 'profile-card',
 *   data: {
 *     name: 'Alex Vance',
 *     title: 'Lead Developer',
 *     avatar: 'https://example.com/avatar.jpg',
 *     socialLinks: [
 *       { icon: '📧', url: 'mailto:alex@example.com' },
 *       { icon: '💼', url: 'https://linkedin.com/in/alex' }
 *     ]
 *   },
 *   style: { theme: 'light' }
 * }, 'profile-container');
 * ```
 * 
 * 6. Stats Card:
 * ```javascript
 * widgetRenderer.render({
 *   type: 'stats-card',
 *   data: {
 *     title: 'New Users',
 *     value: '1,257',
 *     trend: '+12% from last week',
 *     icon: '👥',
 *     accentColor: '#3b82f6'
 *   },
 *   style: { theme: 'light' }
 * }, 'stats-container');
 * ```
 * 
 * 7. Progress Bar:
 * ```javascript
 * widgetRenderer.render({
 *   type: 'progress-bar',
 *   data: {
 *     label: 'Task Completion',
 *     value: 75,
 *     animated: true
 *   },
 *   style: { theme: 'light' }
 * }, 'progress-container');
 * ```
 * 
 * 8. KPI Donut:
 * ```javascript
 * widgetRenderer.render({
 *   type: 'kpi-donut',
 *   data: {
 *     value: 82,
 *     label: 'Project Completion',
 *     color: '#10b981'
 *   },
 *   style: { theme: 'light' }
 * }, 'kpi-container');
 * ```
 * 
 * 9. Funnel Chart:
 * ```javascript
 * widgetRenderer.render({
 *   type: 'funnel',
 *   data: {
 *     title: 'Sales Funnel',
 *     stages: [
 *       { label: 'Visitors', value: 100, unit: '%' },
 *       { label: 'Sign Ups', value: 45, unit: '%' },
 *       { label: 'Purchases', value: 15, unit: '%' }
 *     ]
 *   },
 *   style: { theme: 'light' }
 * }, 'funnel-container');
 * ```
 * 
 * 10. Interactive Slider:
 * ```javascript
 * widgetRenderer.render({
 *   type: 'slider',
 *   data: {
 *     label: 'Adjust Threshold',
 *     min: 0,
 *     max: 100,
 *     value: 50,
 *     description: 'Controls the sensitivity level',
 *     onChange: (value) => console.log('New value:', value)
 *   },
 *   style: { theme: 'light' }
 * }, 'slider-container');
 * ```
 * 
 * UTILITY METHODS:
 * 
 * 1. parseConfigFromHTML(elementId: string): WidgetConfig | null
 *    - Parses widget configuration from HTML data attribute
 *    - Usage: const config = WidgetXFormer.parseConfigFromHTML('config-element');
 * 
 * 2. autoInitialize(): void
 *    - Automatically initializes all widgets with data-config-ref attribute
 *    - Usage: WidgetXFormer.autoInitialize();
 * 
 * THEMES:
 * - 'light': Fluent UI light theme (default)
 * - 'fluent-dark': Fluent UI dark theme
 * - 'default': Traditional light theme
 * - 'brand': Custom brand theme
 * - 'dark': Traditional dark theme
 * 
 * FLUENT UI FEATURES:
 * - All widgets automatically use Fluent UI design tokens
 * - Consistent typography, spacing, colors, and animations
 * - Accessible design patterns
 * - Responsive layout support
 * - Dark/light theme support
 * 
 * ERROR HANDLING:
 * - Invalid widget types log errors to console
 * - Missing containers log errors to console
 * - Malformed data structures fall back to default rendering
 * 
 * =====================================================================
 */

import { getFluentTokens, applyFluentTokens, type FluentTheme } from './fluent-tokens';

export interface WidgetConfig {
  type: string;
  data: any;
  style?: {
    theme?: string | FluentTheme;
    palette?: string;
    density?: string;
    fluentDesign?: boolean; // Enable Fluent UI design system
  };
}

export interface TabItem {
  id: string;
  label: string;
  content: string;
}

export interface ChartDataset {
  label: string;
  data: number[] | { x: number; y: number }[] | { x: number; y: number; r: number }[];
  backgroundColor?: string | string[];
  borderColor?: string | string[];
  borderWidth?: number;
}

export interface ChartData {
  labels: string[];
  datasets: ChartDataset[];
}

export interface AccordionItem {
  id: string;
  title: string;
  content: string;
  expanded?: boolean;
}

export interface TimelineEvent {
  id: string;
  date: string | Date;
  title: string;
  description?: string;
  category?: string;
  icon?: string;
  status?: 'completed' | 'current' | 'upcoming' | 'cancelled';
  link?: string;
  metadata?: Record<string, any>;
}

export interface TimelineConfig {
  orientation?: 'vertical' | 'horizontal';
  layout?: 'left' | 'right' | 'alternating' | 'center';
  showDates?: boolean;
  showIcons?: boolean;
  groupBy?: 'none' | 'year' | 'month' | 'category';
  sortOrder?: 'asc' | 'desc';
  showProgress?: boolean;
  animate?: boolean;
  interactive?: boolean;
  dateFormat?: string;
  showConnectors?: boolean;
  compactMode?: boolean;
}

class WidgetXFormer {
  private static instance: WidgetXFormer;
  private themes: Map<string, any> = new Map();
  private renderers: Map<string, (config: WidgetConfig, container: HTMLElement) => void> = new Map();

  constructor() {
    this.initializeThemes();
    this.initializeRenderers();
  }

  public static getInstance(): WidgetXFormer {
    if (!WidgetXFormer.instance) {
      WidgetXFormer.instance = new WidgetXFormer();
    }
    return WidgetXFormer.instance;
  }

  private initializeThemes(): void {
    const fluentLight = getFluentTokens('light');
    const fluentDark = getFluentTokens('dark');

    // Traditional themes (maintained for backward compatibility)
    this.themes.set('default', {
      primary: '#0078d4',
      secondary: '#106ebe',
      background: '#ffffff',
      text: '#323130',
      border: '#e1e1e1'
    });

    this.themes.set('brand', {
      primary: '#8B4513',
      secondary: '#D2691E',
      background: '#ffffff',
      text: '#323130',
      border: '#e1e1e1'
    });

    this.themes.set('dark', {
      primary: '#0078d4',
      secondary: '#106ebe',
      background: '#2d2d2d',
      text: '#ffffff',
      border: '#404040'
    });

    // Fluent UI themes
    this.themes.set('light', {
      primary: fluentLight.colorBrandBackground.replace(/var\([^,]+,\s*([^)]+)\)/, '$1'),
      secondary: fluentLight.colorBrandBackgroundHover.replace(/var\([^,]+,\s*([^)]+)\)/, '$1'),
      background: fluentLight.colorNeutralBackground1.replace(/var\([^,]+,\s*([^)]+)\)/, '$1'),
      text: fluentLight.colorNeutralForeground1.replace(/var\([^,]+,\s*([^)]+)\)/, '$1'),
      border: fluentLight.colorNeutralStroke1.replace(/var\([^,]+,\s*([^)]+)\)/, '$1'),
      // Additional Fluent properties
      fontFamily: fluentLight.fontFamilyBase.replace(/var\([^,]+,\s*([^)]+)\)/, '$1'),
      fontSize: fluentLight.fontSizeBase400.replace(/var\([^,]+,\s*([^)]+)\)/, '$1'),
      fontWeight: fluentLight.fontWeightRegular.replace(/var\([^,]+,\s*([^)]+)\)/, '$1'),
      borderRadius: fluentLight.borderRadiusMedium.replace(/var\([^,]+,\s*([^)]+)\)/, '$1'),
      shadow: fluentLight.shadow4.replace(/var\([^,]+,\s*([^)]+)\)/, '$1'),
      spacing: fluentLight.spacingHorizontalM.replace(/var\([^,]+,\s*([^)]+)\)/, '$1'),
      surfaceBackground: fluentLight.colorNeutralBackground2.replace(/var\([^,]+,\s*([^)]+)\)/, '$1'),
      surfaceBorder: fluentLight.colorNeutralStroke2.replace(/var\([^,]+,\s*([^)]+)\)/, '$1'),
      isFluentTheme: true
    });

    this.themes.set('fluent-dark', {
      primary: fluentDark.colorBrandBackground.replace(/var\([^,]+,\s*([^)]+)\)/, '$1'),
      secondary: fluentDark.colorBrandBackgroundHover.replace(/var\([^,]+,\s*([^)]+)\)/, '$1'),
      background: fluentDark.colorNeutralBackground1.replace(/var\([^,]+,\s*([^)]+)\)/, '$1'),
      text: fluentDark.colorNeutralForeground1.replace(/var\([^,]+,\s*([^)]+)\)/, '$1'),
      border: fluentDark.colorNeutralStroke1.replace(/var\([^,]+,\s*([^)]+)\)/, '$1'),
      // Additional Fluent properties
      fontFamily: fluentDark.fontFamilyBase.replace(/var\([^,]+,\s*([^)]+)\)/, '$1'),
      fontSize: fluentDark.fontSizeBase400.replace(/var\([^,]+,\s*([^)]+)\)/, '$1'),
      fontWeight: fluentDark.fontWeightRegular.replace(/var\([^,]+,\s*([^)]+)\)/, '$1'),
      borderRadius: fluentDark.borderRadiusMedium.replace(/var\([^,]+,\s*([^)]+)\)/, '$1'),
      shadow: fluentDark.shadow4.replace(/var\([^,]+,\s*([^)]+)\)/, '$1'),
      spacing: fluentDark.spacingHorizontalM.replace(/var\([^,]+,\s*([^)]+)\)/, '$1'),
      surfaceBackground: fluentDark.colorNeutralBackground2.replace(/var\([^,]+,\s*([^)]+)\)/, '$1'),
      surfaceBorder: fluentDark.colorNeutralStroke2.replace(/var\([^,]+,\s*([^)]+)\)/, '$1'),
      isFluentTheme: true
    });
  }

  private initializeRenderers(): void {
    this.renderers.set('tabs', this.renderTabs.bind(this));
    this.renderers.set('doughnut', this.renderDoughnutChart.bind(this));
    this.renderers.set('bar', this.renderBarChart.bind(this));
    this.renderers.set('line', this.renderLineChart.bind(this));
    this.renderers.set('accordion', this.renderAccordion.bind(this));
    this.renderers.set('card', this.renderCard.bind(this));
    this.renderers.set('worldmap', this.renderWorldMap.bind(this));
    this.renderers.set('metric', this.renderMetric.bind(this));
    this.renderers.set('table', this.renderTable.bind(this));
    this.renderers.set('timeline', this.renderTimeline.bind(this));
    // Fluent UI enhanced widgets
    this.renderers.set('fluent-card', this.renderFluentCard.bind(this));
    this.renderers.set('fluent-button', this.renderFluentButton.bind(this));
    this.renderers.set('fluent-progressbar', this.renderFluentProgressBar.bind(this));
    // New widget types from more-samples.html
    this.renderers.set('profile-card', this.renderProfileCard.bind(this));
    this.renderers.set('stats-card', this.renderStatsCard.bind(this));
    this.renderers.set('notification-card', this.renderNotificationCard.bind(this));
    this.renderers.set('progress-bar', this.renderProgressBar.bind(this));
    this.renderers.set('kpi-donut', this.renderKpiDonut.bind(this));
    this.renderers.set('funnel', this.renderFunnel.bind(this));
    this.renderers.set('scatter', this.renderScatterPlot.bind(this));
    this.renderers.set('bubble', this.renderBubbleChart.bind(this));
    this.renderers.set('gauge', this.renderGauge.bind(this));
    this.renderers.set('heatmap', this.renderHeatmap.bind(this));
    this.renderers.set('slider', this.renderSlider.bind(this));
  }

  public render(config: WidgetConfig, containerId: string): void {
    const container = document.getElementById(containerId);
    if (!container) {
      console.error(`Container with id "${containerId}" not found`);
      return;
    }

    const renderer = this.renderers.get(config.type);
    if (!renderer) {
      console.error(`No renderer found for widget type "${config.type}"`);
      return;
    }

    // Clear container
    container.innerHTML = '';
    
    // Apply Fluent UI tokens if enabled
    if (config.style?.fluentDesign) {
      const fluentTheme = config.style.theme === 'fluent-dark' ? 'dark' : 'light';
      applyFluentTokens(container, fluentTheme as FluentTheme);
    }
    
    // Apply theme styles
    this.applyThemeStyles(container, config.style?.theme || 'default');
    
    // Render widget
    renderer(config, container);
  }

  private applyThemeStyles(container: HTMLElement, themeName: string): void {
    const theme = this.themes.get(themeName) || this.themes.get('default');
    
    container.style.backgroundColor = theme.background;
    container.style.color = theme.text;
    container.style.border = `1px solid ${theme.border}`;
    
    // Apply Fluent-specific styling if it's a Fluent theme
    if (theme.isFluentTheme) {
      container.style.fontFamily = theme.fontFamily;
      container.style.fontSize = theme.fontSize;
      container.style.fontWeight = theme.fontWeight;
      container.style.borderRadius = theme.borderRadius;
      container.style.boxShadow = theme.shadow;
      container.style.padding = theme.spacing;
      
      // Add Fluent design class
      container.classList.add('fluent-widget');
      
      // Apply Fluent motion
      container.style.transition = 'all 200ms cubic-bezier(0.33,0,0.67,1)';
    } else {
      // Traditional styling
      container.style.borderRadius = '8px';
      container.style.padding = '1rem';
      container.style.boxShadow = '0 2px 8px rgba(0,0,0,0.1)';
    }
  }

  private getTheme(themeName?: string): any {
    return this.themes.get(themeName || 'default') || this.themes.get('default');
  }

  private renderTabs(config: WidgetConfig, container: HTMLElement): void {
    const tabsData = config.data as { items: TabItem[] };
    const theme = this.getTheme(config.style?.theme);
    const fluentTokens = getFluentTokens(config.style?.theme === 'fluent-dark' ? 'dark' : 'light');

    const tabsContainer = document.createElement('div');
    tabsContainer.className = 'fluent-tabs';

    // Create tab headers
    const tabHeaders = document.createElement('div');
    tabHeaders.className = 'tab-headers';
    tabHeaders.style.cssText = `
      display: flex;
      border-bottom: 2px solid ${theme.surfaceBorder || theme.border};
      margin-bottom: ${fluentTokens.spacingVerticalM.replace(/var\([^,]+,\s*([^)]+)\)/, '$1')};
      font-family: ${fluentTokens.fontFamilyBase.replace(/var\([^,]+,\s*([^)]+)\)/, '$1')};
    `;

    // Create tab content container
    const tabContent = document.createElement('div');
    tabContent.className = 'tab-content';

    tabsData.items.forEach((tab, index) => {
      // Create tab header
      const tabHeader = document.createElement('button');
      tabHeader.textContent = tab.label;
      tabHeader.className = 'tab-header';
      tabHeader.style.cssText = `
        padding: ${fluentTokens.spacingVerticalS.replace(/var\([^,]+,\s*([^)]+)\)/, '$1')} ${fluentTokens.spacingHorizontalL.replace(/var\([^,]+,\s*([^)]+)\)/, '$1')};
        border: none;
        background: ${index === 0 ? theme.primary : 'transparent'};
        color: ${index === 0 ? '#ffffff' : theme.text};
        cursor: pointer;
        border-radius: ${fluentTokens.borderRadiusMedium.replace(/var\([^,]+,\s*([^)]+)\)/, '$1')} ${fluentTokens.borderRadiusMedium.replace(/var\([^,]+,\s*([^)]+)\)/, '$1')} 0 0;
        font-family: ${fluentTokens.fontFamilyBase.replace(/var\([^,]+,\s*([^)]+)\)/, '$1')};
        font-size: ${fluentTokens.fontSizeBase300.replace(/var\([^,]+,\s*([^)]+)\)/, '$1')};
        font-weight: ${fluentTokens.fontWeightMedium.replace(/var\([^,]+,\s*([^)]+)\)/, '$1')};
        transition: all ${fluentTokens.durationFast.replace(/var\([^,]+,\s*([^)]+)\)/, '$1')} ${fluentTokens.curveEasyEase.replace(/var\([^,]+,\s*([^)]+)\)/, '$1')};
      `;

      // Create tab content panel
      const tabPanel = document.createElement('div');
      tabPanel.className = 'tab-panel';
      tabPanel.style.cssText = `
        display: ${index === 0 ? 'block' : 'none'};
        padding: ${fluentTokens.spacingVerticalM.replace(/var\([^,]+,\s*([^)]+)\)/, '$1')} 0;
        line-height: 1.6;
        font-family: ${fluentTokens.fontFamilyBase.replace(/var\([^,]+,\s*([^)]+)\)/, '$1')};
      `;
      tabPanel.textContent = tab.content;

      // Add click handler
      tabHeader.addEventListener('click', () => {
        // Update headers
        tabHeaders.querySelectorAll('.tab-header').forEach((header, i) => {
          const btn = header as HTMLButtonElement;
          btn.style.background = i === index ? theme.primary : 'transparent';
          btn.style.color = i === index ? '#ffffff' : theme.text;
        });

        // Update content
        tabContent.querySelectorAll('.tab-panel').forEach((panel, i) => {
          (panel as HTMLElement).style.display = i === index ? 'block' : 'none';
        });
      });

      tabHeaders.appendChild(tabHeader);
      tabContent.appendChild(tabPanel);
    });

    tabsContainer.appendChild(tabHeaders);
    tabsContainer.appendChild(tabContent);
    container.appendChild(tabsContainer);
  }

  private renderDoughnutChart(config: WidgetConfig, container: HTMLElement): void {
    this.renderChart(config, container, 'doughnut');
  }

  private renderBarChart(config: WidgetConfig, container: HTMLElement): void {
    this.renderChart(config, container, 'bar');
  }

  private renderLineChart(config: WidgetConfig, container: HTMLElement): void {
    this.renderChart(config, container, 'line');
  }

  private renderChart(config: WidgetConfig, container: HTMLElement, chartType: string): void {
    const chartData = config.data as ChartData;
    const theme = this.getTheme(config.style?.theme);

    const canvas = document.createElement('canvas');
    canvas.width = 400;
    canvas.height = 300;
    canvas.style.maxWidth = '100%';
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Simple chart rendering (you would replace this with Chart.js or similar library)
    if (chartType === 'doughnut') {
      this.drawDoughnutChart(ctx, chartData, canvas.width, canvas.height);
    } else if (chartType === 'bar') {
      this.drawBarChart(ctx, chartData, canvas.width, canvas.height, theme);
    } else if (chartType === 'line') {
      this.drawLineChart(ctx, chartData, canvas.width, canvas.height, theme);
    }

    container.appendChild(canvas);
  }

  private drawDoughnutChart(ctx: CanvasRenderingContext2D, data: ChartData, width: number, height: number): void {
    const centerX = width / 2;
    const centerY = height / 2;
    const radius = Math.min(width, height) / 3;
    const innerRadius = radius * 0.5;

    // Ensure we're working with numeric data for doughnut chart
    const numericData = data.datasets[0].data as number[];
    const total = numericData.reduce((sum, value) => sum + value, 0);
    let currentAngle = -Math.PI / 2;

    numericData.forEach((value, index) => {
      const sliceAngle = (value / total) * 2 * Math.PI;
      const color = Array.isArray(data.datasets[0].backgroundColor) 
        ? data.datasets[0].backgroundColor[index] 
        : data.datasets[0].backgroundColor || '#0078d4';

      ctx.beginPath();
      ctx.arc(centerX, centerY, radius, currentAngle, currentAngle + sliceAngle);
      ctx.arc(centerX, centerY, innerRadius, currentAngle + sliceAngle, currentAngle, true);
      ctx.closePath();
      ctx.fillStyle = color;
      ctx.fill();

      currentAngle += sliceAngle;
    });

    // Draw legend
    this.drawLegend(ctx, data, width, height, 20);
  }

  private drawBarChart(ctx: CanvasRenderingContext2D, data: ChartData, width: number, height: number, theme: any): void {
    const padding = 40;
    const chartWidth = width - 2 * padding;
    const chartHeight = height - 2 * padding;
    
    // Ensure we're working with numeric data for bar chart
    const numericData = data.datasets[0].data as number[];
    const maxValue = Math.max(...numericData);
    const barWidth = chartWidth / data.labels.length * 0.8;
    const barSpacing = chartWidth / data.labels.length * 0.2;

    // Draw axes
    ctx.strokeStyle = theme.border;
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(padding, padding);
    ctx.lineTo(padding, height - padding);
    ctx.lineTo(width - padding, height - padding);
    ctx.stroke();

    // Draw bars
    numericData.forEach((value, index) => {
      const barHeight = (value / maxValue) * chartHeight;
      const x = padding + index * (barWidth + barSpacing) + barSpacing / 2;
      const y = height - padding - barHeight;

      const color = Array.isArray(data.datasets[0].backgroundColor) 
        ? data.datasets[0].backgroundColor[index] 
        : data.datasets[0].backgroundColor || theme.primary;

      ctx.fillStyle = color;
      ctx.fillRect(x, y, barWidth, barHeight);

      // Draw label
      ctx.fillStyle = theme.text;
      ctx.font = '12px system-ui';
      ctx.textAlign = 'center';
      ctx.fillText(data.labels[index], x + barWidth / 2, height - padding + 20);
    });
  }

  private drawLineChart(ctx: CanvasRenderingContext2D, data: ChartData, width: number, height: number, theme: any): void {
    const padding = 40;
    const chartWidth = width - 2 * padding;
    const chartHeight = height - 2 * padding;
    
    // Ensure we're working with numeric data for line chart
    const numericData = data.datasets[0].data as number[];
    const maxValue = Math.max(...numericData);
    const stepX = chartWidth / (data.labels.length - 1);

    // Draw axes
    ctx.strokeStyle = theme.border;
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(padding, padding);
    ctx.lineTo(padding, height - padding);
    ctx.lineTo(width - padding, height - padding);
    ctx.stroke();

    // Draw line
    ctx.strokeStyle = data.datasets[0].borderColor || theme.primary;
    ctx.lineWidth = 3;
    ctx.beginPath();

    numericData.forEach((value, index) => {
      const x = padding + index * stepX;
      const y = height - padding - (value / maxValue) * chartHeight;

      if (index === 0) {
        ctx.moveTo(x, y);
      } else {
        ctx.lineTo(x, y);
      }

      // Draw point
      ctx.fillStyle = data.datasets[0].backgroundColor || theme.primary;
      ctx.beginPath();
      ctx.arc(x, y, 4, 0, 2 * Math.PI);
      ctx.fill();
    });

    ctx.stroke();
  }

  private drawLegend(ctx: CanvasRenderingContext2D, data: ChartData, width: number, _height: number, startY: number): void {
    ctx.font = '12px system-ui';
    ctx.textAlign = 'left';

    data.labels.forEach((label, index) => {
      const color = Array.isArray(data.datasets[0].backgroundColor) 
        ? data.datasets[0].backgroundColor[index] 
        : data.datasets[0].backgroundColor || '#0078d4';

      const y = startY + index * 20;
      
      // Draw color box
      ctx.fillStyle = color;
      ctx.fillRect(width - 150, y - 8, 12, 12);
      
      // Draw label
      ctx.fillStyle = '#323130';
      ctx.fillText(label, width - 130, y);
    });
  }

  private renderAccordion(config: WidgetConfig, container: HTMLElement): void {
    const accordionData = config.data as { items: AccordionItem[] };
    const theme = this.getTheme(config.style?.theme);
    const fluentTokens = getFluentTokens(config.style?.theme === 'fluent-dark' ? 'dark' : 'light');

    const accordionContainer = document.createElement('div');
    accordionContainer.className = 'fluent-accordion';

    accordionData.items.forEach((item) => {
      const itemContainer = document.createElement('div');
      itemContainer.className = 'accordion-item';
      itemContainer.style.cssText = `
        border: 1px solid ${theme.surfaceBorder || theme.border};
        border-radius: ${fluentTokens.borderRadiusMedium.replace(/var\([^,]+,\s*([^)]+)\)/, '$1')};
        margin-bottom: ${fluentTokens.spacingVerticalS.replace(/var\([^,]+,\s*([^)]+)\)/, '$1')};
        overflow: hidden;
        box-shadow: ${fluentTokens.shadow2.replace(/var\([^,]+,\s*([^)]+)\)/, '$1')};
      `;

      // Create header
      const header = document.createElement('button');
      header.className = 'accordion-header';
      header.textContent = item.title;
      header.style.cssText = `
        width: 100%;
        padding: ${fluentTokens.spacingVerticalM.replace(/var\([^,]+,\s*([^)]+)\)/, '$1')} ${fluentTokens.spacingHorizontalM.replace(/var\([^,]+,\s*([^)]+)\)/, '$1')};
        background: ${theme.surfaceBackground || theme.background};
        border: none;
        text-align: left;
        cursor: pointer;
        font-family: ${fluentTokens.fontFamilyBase.replace(/var\([^,]+,\s*([^)]+)\)/, '$1')};
        font-size: ${fluentTokens.fontSizeBase300.replace(/var\([^,]+,\s*([^)]+)\)/, '$1')};
        font-weight: ${fluentTokens.fontWeightMedium.replace(/var\([^,]+,\s*([^)]+)\)/, '$1')};
        color: ${theme.text};
        transition: background-color ${fluentTokens.durationFast.replace(/var\([^,]+,\s*([^)]+)\)/, '$1')} ${fluentTokens.curveEasyEase.replace(/var\([^,]+,\s*([^)]+)\)/, '$1')};
      `;

      // Create content panel
      const content = document.createElement('div');
      content.className = 'accordion-content';
      content.style.cssText = `
        padding: ${item.expanded ? fluentTokens.spacingVerticalM.replace(/var\([^,]+,\s*([^)]+)\)/, '$1') + ' ' + fluentTokens.spacingHorizontalM.replace(/var\([^,]+,\s*([^)]+)\)/, '$1') : '0'};
        max-height: ${item.expanded ? 'none' : '0'};
        overflow: hidden;
        background: ${theme.surfaceBackground || theme.background};
        transition: all ${fluentTokens.durationNormal.replace(/var\([^,]+,\s*([^)]+)\)/, '$1')} ${fluentTokens.curveEasyEase.replace(/var\([^,]+,\s*([^)]+)\)/, '$1')};
        border-top: ${item.expanded ? `1px solid ${theme.surfaceBorder || theme.border}` : 'none'};
        font-family: ${fluentTokens.fontFamilyBase.replace(/var\([^,]+,\s*([^)]+)\)/, '$1')};
        font-size: ${fluentTokens.fontSizeBase300.replace(/var\([^,]+,\s*([^)]+)\)/, '$1')};
        line-height: ${fluentTokens.lineHeightBase300.replace(/var\([^,]+,\s*([^)]+)\)/, '$1')};
      `;
      content.textContent = item.content;

      // Add click handler
      header.addEventListener('click', () => {
        const isExpanded = content.style.maxHeight !== '0' && content.style.maxHeight !== '0px' && content.style.maxHeight !== '';
        
        if (isExpanded) {
          content.style.maxHeight = '0';
          content.style.padding = `0 ${fluentTokens.spacingHorizontalM.replace(/var\([^,]+,\s*([^)]+)\)/, '$1')}`;
          content.style.borderTop = 'none';
        } else {
          content.style.maxHeight = content.scrollHeight + 'px';
          content.style.padding = `${fluentTokens.spacingVerticalM.replace(/var\([^,]+,\s*([^)]+)\)/, '$1')} ${fluentTokens.spacingHorizontalM.replace(/var\([^,]+,\s*([^)]+)\)/, '$1')}`;
          content.style.borderTop = `1px solid ${theme.surfaceBorder || theme.border}`;
        }
      });

      itemContainer.appendChild(header);
      itemContainer.appendChild(content);
      accordionContainer.appendChild(itemContainer);
    });

    container.appendChild(accordionContainer);
  }

  private renderCard(config: WidgetConfig, container: HTMLElement): void {
    const cardData = config.data;
    const theme = this.getTheme(config.style?.theme);
    const fluentTokens = getFluentTokens(config.style?.theme === 'fluent-dark' ? 'dark' : 'light');

    const card = document.createElement('div');
    card.className = 'fluent-card-traditional';
    card.style.cssText = `
      background: ${theme.surfaceBackground || theme.background};
      border: 1px solid ${theme.surfaceBorder || theme.border};
      border-radius: ${fluentTokens.borderRadiusLarge.replace(/var\([^,]+,\s*([^)]+)\)/, '$1')};
      padding: ${fluentTokens.spacingVerticalXL.replace(/var\([^,]+,\s*([^)]+)\)/, '$1')} ${fluentTokens.spacingHorizontalXL.replace(/var\([^,]+,\s*([^)]+)\)/, '$1')};
      box-shadow: ${fluentTokens.shadow4.replace(/var\([^,]+,\s*([^)]+)\)/, '$1')};
      font-family: ${fluentTokens.fontFamilyBase.replace(/var\([^,]+,\s*([^)]+)\)/, '$1')};
      transition: all ${fluentTokens.durationNormal.replace(/var\([^,]+,\s*([^)]+)\)/, '$1')} ${fluentTokens.curveEasyEase.replace(/var\([^,]+,\s*([^)]+)\)/, '$1')};
    `;

    if (cardData.title) {
      const title = document.createElement('h3');
      title.textContent = cardData.title;
      title.style.cssText = `
        margin: 0 0 ${fluentTokens.spacingVerticalM.replace(/var\([^,]+,\s*([^)]+)\)/, '$1')} 0;
        color: ${theme.text};
        font-size: ${fluentTokens.fontSizeBase500.replace(/var\([^,]+,\s*([^)]+)\)/, '$1')};
        font-weight: ${fluentTokens.fontWeightSemibold.replace(/var\([^,]+,\s*([^)]+)\)/, '$1')};
        line-height: ${fluentTokens.lineHeightBase500.replace(/var\([^,]+,\s*([^)]+)\)/, '$1')};
      `;
      card.appendChild(title);
    }

    if (cardData.content) {
      const content = document.createElement('p');
      content.textContent = cardData.content;
      content.style.cssText = `
        margin: 0;
        line-height: ${fluentTokens.lineHeightBase400.replace(/var\([^,]+,\s*([^)]+)\)/, '$1')};
        color: ${theme.text};
        font-size: ${fluentTokens.fontSizeBase300.replace(/var\([^,]+,\s*([^)]+)\)/, '$1')};
      `;
      card.appendChild(content);
    }

    container.appendChild(card);
  }

  private renderMetric(config: WidgetConfig, container: HTMLElement): void {
    const metricData = config.data;
    const theme = this.getTheme(config.style?.theme);
    const fluentTokens = getFluentTokens(config.style?.theme === 'fluent-dark' ? 'dark' : 'light');

    const metric = document.createElement('div');
    metric.className = 'fluent-metric';
    metric.style.cssText = `
      text-align: center;
      padding: ${fluentTokens.spacingVerticalXXL.replace(/var\([^,]+,\s*([^)]+)\)/, '$1')};
      background: ${theme.surfaceBackground || theme.background};
      border-radius: ${fluentTokens.borderRadiusLarge.replace(/var\([^,]+,\s*([^)]+)\)/, '$1')};
      box-shadow: ${fluentTokens.shadow4.replace(/var\([^,]+,\s*([^)]+)\)/, '$1')};
      font-family: ${fluentTokens.fontFamilyBase.replace(/var\([^,]+,\s*([^)]+)\)/, '$1')};
    `;

    const value = document.createElement('div');
    value.textContent = metricData.value;
    value.style.cssText = `
      font-size: ${fluentTokens.fontSizeHero1000.replace(/var\([^,]+,\s*([^)]+)\)/, '$1')};
      font-weight: ${fluentTokens.fontWeightBold.replace(/var\([^,]+,\s*([^)]+)\)/, '$1')};
      color: ${theme.primary};
      margin-bottom: ${fluentTokens.spacingVerticalS.replace(/var\([^,]+,\s*([^)]+)\)/, '$1')};
      line-height: ${fluentTokens.lineHeightHero1000.replace(/var\([^,]+,\s*([^)]+)\)/, '$1')};
    `;

    const label = document.createElement('div');
    label.textContent = metricData.label;
    label.style.cssText = `
      font-size: ${fluentTokens.fontSizeBase400.replace(/var\([^,]+,\s*([^)]+)\)/, '$1')};
      color: ${theme.text};
      opacity: 0.8;
      font-weight: ${fluentTokens.fontWeightMedium.replace(/var\([^,]+,\s*([^)]+)\)/, '$1')};
    `;

    metric.appendChild(value);
    metric.appendChild(label);
    container.appendChild(metric);
  }

  private renderTable(config: WidgetConfig, container: HTMLElement): void {
    const tableData = config.data;
    const theme = this.getTheme(config.style?.theme);
    const fluentTokens = config.style?.fluentDesign ? getFluentTokens(config.style?.theme === 'fluent-dark' ? 'dark' : 'light') : null;

    const table = document.createElement('table');
    table.className = config.style?.fluentDesign ? 'fluent-table' : 'widget-table';
    
    if (config.style?.fluentDesign && fluentTokens) {
      table.style.cssText = `
        width: 100%;
        border-collapse: collapse;
        margin: ${fluentTokens.spacingVerticalM.replace(/var\([^,]+,\s*([^)]+)\)/, '$1')} 0;
        font-family: ${fluentTokens.fontFamilyBase.replace(/var\([^,]+,\s*([^)]+)\)/, '$1')};
        font-size: ${fluentTokens.fontSizeBase300.replace(/var\([^,]+,\s*([^)]+)\)/, '$1')};
        border-radius: ${fluentTokens.borderRadiusMedium.replace(/var\([^,]+,\s*([^)]+)\)/, '$1')};
        overflow: hidden;
        box-shadow: ${fluentTokens.shadow2.replace(/var\([^,]+,\s*([^)]+)\)/, '$1')};
      `;
    } else {
      table.style.cssText = `
        width: 100%;
        border-collapse: collapse;
        margin: 1rem 0;
      `;
    }

    // Create header
    if (tableData.headers) {
      const thead = document.createElement('thead');
      const headerRow = document.createElement('tr');
      
      tableData.headers.forEach((header: string) => {
        const th = document.createElement('th');
        th.textContent = header;
        
        if (config.style?.fluentDesign && fluentTokens) {
          th.style.cssText = `
            padding: ${fluentTokens.spacingVerticalM.replace(/var\([^,]+,\s*([^)]+)\)/, '$1')} ${fluentTokens.spacingHorizontalM.replace(/var\([^,]+,\s*([^)]+)\)/, '$1')};
            text-align: left;
            background: ${theme.primary};
            color: white;
            font-weight: ${fluentTokens.fontWeightSemibold.replace(/var\([^,]+,\s*([^)]+)\)/, '$1')};
            font-size: ${fluentTokens.fontSizeBase300.replace(/var\([^,]+,\s*([^)]+)\)/, '$1')};
          `;
        } else {
          th.style.cssText = `
            padding: 0.75rem;
            text-align: left;
            background: ${theme.primary};
            color: white;
            font-weight: 500;
          `;
        }
        headerRow.appendChild(th);
      });
      
      thead.appendChild(headerRow);
      table.appendChild(thead);
    }

    // Create body
    if (tableData.rows) {
      const tbody = document.createElement('tbody');
      
      tableData.rows.forEach((row: string[], index: number) => {
        const tr = document.createElement('tr');
        
        if (config.style?.fluentDesign && fluentTokens) {
          tr.style.backgroundColor = index % 2 === 0 ? 
            (theme.surfaceBackground || theme.background) : 
            (theme.background || '#f8f9fa');
          tr.style.transition = `background-color ${fluentTokens.durationFast.replace(/var\([^,]+,\s*([^)]+)\)/, '$1')} ${fluentTokens.curveEasyEase.replace(/var\([^,]+,\s*([^)]+)\)/, '$1')}`;
        } else {
          tr.style.backgroundColor = index % 2 === 0 ? theme.background : '#f8f9fa';
        }
        
        row.forEach((cell: string) => {
          const td = document.createElement('td');
          td.textContent = cell;
          
          if (config.style?.fluentDesign && fluentTokens) {
            td.style.cssText = `
              padding: ${fluentTokens.spacingVerticalM.replace(/var\([^,]+,\s*([^)]+)\)/, '$1')} ${fluentTokens.spacingHorizontalM.replace(/var\([^,]+,\s*([^)]+)\)/, '$1')};
              border-bottom: 1px solid ${theme.surfaceBorder || theme.border};
              font-size: ${fluentTokens.fontSizeBase300.replace(/var\([^,]+,\s*([^)]+)\)/, '$1')};
              color: ${theme.text};
            `;
          } else {
            td.style.cssText = `
              padding: 0.75rem;
              border-bottom: 1px solid ${theme.border};
            `;
          }
          tr.appendChild(td);
        });
        
        tbody.appendChild(tr);
      });
      
      table.appendChild(tbody);
    }

    container.appendChild(table);
  }

  private renderWorldMap(config: WidgetConfig, container: HTMLElement): void {
    // Note: mapData would be used for actual map data visualization
    // const mapData = config.data;
    const theme = this.getTheme(config.style?.theme);
    const fluentTokens = config.style?.fluentDesign ? getFluentTokens(config.style?.theme === 'fluent-dark' ? 'dark' : 'light') : null;

    // Create a simple SVG world map representation
    const svgContainer = document.createElement('div');
    svgContainer.className = config.style?.fluentDesign ? 'fluent-worldmap' : 'widget-worldmap';
    
    if (config.style?.fluentDesign && fluentTokens) {
      svgContainer.style.cssText = `
        border-radius: ${fluentTokens.borderRadiusMedium.replace(/var\([^,]+,\s*([^)]+)\)/, '$1')};
        box-shadow: ${fluentTokens.shadow4.replace(/var\([^,]+,\s*([^)]+)\)/, '$1')};
        overflow: hidden;
        font-family: ${fluentTokens.fontFamilyBase.replace(/var\([^,]+,\s*([^)]+)\)/, '$1')};
      `;
    }
    
    svgContainer.innerHTML = `
      <svg width="100%" height="300" viewBox="0 0 800 400" style="background: ${config.style?.fluentDesign ? (theme.surfaceBackground || theme.background) : '#f0f8ff'};">
        <text x="400" y="200" text-anchor="middle" fill="${theme.text}" font-size="${config.style?.fluentDesign && fluentTokens ? fluentTokens.fontSizeBase500.replace(/var\([^,]+,\s*([^)]+)\)/, '$1') : '16px'}" ${config.style?.fluentDesign && fluentTokens ? `font-family="${fluentTokens.fontFamilyBase.replace(/var\([^,]+,\s*([^)]+)\)/, '$1')}" font-weight="${fluentTokens.fontWeightSemibold.replace(/var\([^,]+,\s*([^)]+)\)/, '$1')}"` : ''}>
          World Map Visualization
        </text>
        <text x="400" y="220" text-anchor="middle" fill="${theme.text}" font-size="${config.style?.fluentDesign && fluentTokens ? fluentTokens.fontSizeBase300.replace(/var\([^,]+,\s*([^)]+)\)/, '$1') : '12px'}" opacity="0.7" ${config.style?.fluentDesign && fluentTokens ? `font-family="${fluentTokens.fontFamilyBase.replace(/var\([^,]+,\s*([^)]+)\)/, '$1')}"` : ''}>
          (Integration with mapping libraries like D3.js or Leaflet recommended)
        </text>
      </svg>
    `;

    container.appendChild(svgContainer);
  }

  private renderTimeline(config: WidgetConfig, container: HTMLElement): void {
    const timelineData = config.data as { events: TimelineEvent[], config?: TimelineConfig };
    const timelineConfig = timelineData.config || {} as TimelineConfig;
    const theme = this.getTheme(config.style?.theme);
    const fluentTokens = getFluentTokens(config.style?.theme === 'fluent-dark' ? 'dark' : 'light');

    // Default configuration
    const settings = {
      orientation: timelineConfig.orientation || 'vertical',
      layout: timelineConfig.layout || 'left',
      showDates: timelineConfig.showDates !== false,
      showIcons: timelineConfig.showIcons !== false,
      groupBy: timelineConfig.groupBy || 'none',
      sortOrder: timelineConfig.sortOrder || 'asc',
      showProgress: timelineConfig.showProgress || false,
      animate: timelineConfig.animate !== false,
      interactive: timelineConfig.interactive !== false,
      dateFormat: timelineConfig.dateFormat || 'MMM DD, YYYY',
      showConnectors: timelineConfig.showConnectors !== false,
      compactMode: timelineConfig.compactMode || false
    };

    // Sort events
    let events = [...timelineData.events];
    events.sort((a, b) => {
      const dateA = new Date(a.date).getTime();
      const dateB = new Date(b.date).getTime();
      return settings.sortOrder === 'asc' ? dateA - dateB : dateB - dateA;
    });

    // Group events if needed
    const groupedEvents = this.groupTimelineEvents(events, settings.groupBy);

    // Create timeline container
    const timelineContainer = document.createElement('div');
    timelineContainer.className = config.style?.fluentDesign ? 'fluent-timeline' : 'widget-timeline';
    
    const animationDuration = config.style?.fluentDesign && fluentTokens ? 
      fluentTokens.durationSlow.replace(/var\([^,]+,\s*([^)]+)\)/, '$1') : 
      '0.6s';
    
    timelineContainer.style.cssText = `
      position: relative;
      ${settings.orientation === 'horizontal' ? 'overflow-x: auto; padding: 2rem 0;' : 'padding: 1rem 0;'}
      ${settings.animate ? `animation: fadeIn ${animationDuration} ease-in;` : ''}
      ${config.style?.fluentDesign && fluentTokens ? `font-family: ${fluentTokens.fontFamilyBase.replace(/var\([^,]+,\s*([^)]+)\)/, '$1')};` : ''}
    `;

    if (settings.orientation === 'vertical') {
      this.renderVerticalTimeline(timelineContainer, groupedEvents, settings, theme, fluentTokens);
    } else {
      this.renderHorizontalTimeline(timelineContainer, groupedEvents, settings, theme, fluentTokens);
    }

    // Add progress indicator if enabled
    if (settings.showProgress) {
      this.addTimelineProgress(timelineContainer, events, theme, fluentTokens);
    }

    container.appendChild(timelineContainer);
  }

  private groupTimelineEvents(events: TimelineEvent[], groupBy: string): Array<{group: string, events: TimelineEvent[]}> {
    if (groupBy === 'none') {
      return [{group: '', events}];
    }

    const grouped = new Map<string, TimelineEvent[]>();

    events.forEach(event => {
      const date = new Date(event.date);
      let groupKey = '';

      switch (groupBy) {
        case 'year':
          groupKey = date.getFullYear().toString();
          break;
        case 'month':
          groupKey = `${date.toLocaleString('default', { month: 'long' })} ${date.getFullYear()}`;
          break;
        case 'category':
          groupKey = event.category || 'Uncategorized';
          break;
      }

      if (!grouped.has(groupKey)) {
        grouped.set(groupKey, []);
      }
      grouped.get(groupKey)!.push(event);
    });

    return Array.from(grouped.entries()).map(([group, events]) => ({group, events}));
  }

  private renderVerticalTimeline(container: HTMLElement, groupedEvents: Array<{group: string, events: TimelineEvent[]}>, settings: any, theme: any, fluentTokens: any): void {
    const timelineTrack = document.createElement('div');
    timelineTrack.className = 'timeline-track';
    timelineTrack.style.cssText = `
      position: relative;
      ${settings.layout === 'center' ? 'margin: 0 auto; max-width: 800px;' : ''}
    `;

    // Main timeline line
    if (settings.showConnectors) {
      const timelineLine = document.createElement('div');
      timelineLine.className = 'timeline-line';
      timelineLine.style.cssText = `
        position: absolute;
        ${settings.layout === 'center' ? 'left: 50%; transform: translateX(-50%);' : 'left: 20px;'}
        top: 0;
        bottom: 0;
        width: 3px;
        background: linear-gradient(to bottom, ${theme.primary}, ${theme.secondary});
        z-index: 1;
      `;
      timelineTrack.appendChild(timelineLine);
    }

    let eventIndex = 0;
    groupedEvents.forEach(({group, events}) => {
      // Add group header if grouping is enabled
      if (group && groupedEvents.length > 1) {
        const groupHeader = document.createElement('div');
        groupHeader.className = 'timeline-group-header';
        groupHeader.style.cssText = `
          margin: ${fluentTokens.spacingVerticalXXL.replace(/var\([^,]+,\s*([^)]+)\)/, '$1')} 0 ${fluentTokens.spacingVerticalL.replace(/var\([^,]+,\s*([^)]+)\)/, '$1')} 0;
          padding: ${fluentTokens.spacingVerticalS.replace(/var\([^,]+,\s*([^)]+)\)/, '$1')} ${fluentTokens.spacingHorizontalL.replace(/var\([^,]+,\s*([^)]+)\)/, '$1')};
          background: ${theme.primary};
          color: white;
          border-radius: ${fluentTokens.borderRadiusCircular.replace(/var\([^,]+,\s*([^)]+)\)/, '$1')};
          font-family: ${fluentTokens.fontFamilyBase.replace(/var\([^,]+,\s*([^)]+)\)/, '$1')};
          font-size: ${fluentTokens.fontSizeBase400.replace(/var\([^,]+,\s*([^)]+)\)/, '$1')};
          font-weight: ${fluentTokens.fontWeightSemibold.replace(/var\([^,]+,\s*([^)]+)\)/, '$1')};
          text-align: center;
          ${settings.layout === 'center' ? 'max-width: 200px; margin-left: auto; margin-right: auto;' : ''}
        `;
        groupHeader.textContent = group;
        timelineTrack.appendChild(groupHeader);
      }

      events.forEach((event) => {
        const eventElement = this.createTimelineEvent(event, eventIndex, settings, theme, 'vertical', fluentTokens);
        timelineTrack.appendChild(eventElement);
        eventIndex++;
      });
    });

    container.appendChild(timelineTrack);
  }

  private renderHorizontalTimeline(container: HTMLElement, groupedEvents: Array<{group: string, events: TimelineEvent[]}>, settings: any, theme: any, fluentTokens: any): void {
    const timelineTrack = document.createElement('div');
    timelineTrack.className = 'timeline-track-horizontal';
    timelineTrack.style.cssText = `
      display: flex;
      align-items: center;
      min-width: fit-content;
      position: relative;
      padding: 2rem 0;
    `;

    // Horizontal timeline line
    if (settings.showConnectors) {
      const timelineLine = document.createElement('div');
      timelineLine.className = 'timeline-line-horizontal';
      timelineLine.style.cssText = `
        position: absolute;
        top: 50%;
        left: 0;
        right: 0;
        height: 3px;
        background: linear-gradient(to right, ${theme.primary}, ${theme.secondary});
        z-index: 1;
      `;
      timelineTrack.appendChild(timelineLine);
    }

    let eventIndex = 0;
    groupedEvents.forEach(({events}) => {
      events.forEach((event) => {
        const eventElement = this.createTimelineEvent(event, eventIndex, settings, theme, 'horizontal', fluentTokens);
        timelineTrack.appendChild(eventElement);
        eventIndex++;
      });
    });

    container.appendChild(timelineTrack);
  }

  private createTimelineEvent(event: TimelineEvent, index: number, settings: any, theme: any, orientation: string, fluentTokens: any): HTMLElement {
    const eventContainer = document.createElement('div');
    eventContainer.className = 'timeline-event';
    
    const isLeft = settings.layout === 'alternating' ? index % 2 === 0 : settings.layout === 'left';
    const isHorizontal = orientation === 'horizontal';
    
    eventContainer.style.cssText = `
      position: relative;
      ${isHorizontal ? 
        'margin-right: 3rem; min-width: 250px;' : 
        `margin-bottom: 2rem; ${settings.compactMode ? 'margin-bottom: 1rem;' : ''}`
      }
      ${settings.animate ? `animation: slideIn${isLeft ? 'Left' : 'Right'} 0.6s ease-out ${index * 0.1}s both;` : ''}
      ${settings.interactive ? 'cursor: pointer; transition: transform 0.3s ease;' : ''}
    `;

    if (settings.interactive) {
      eventContainer.addEventListener('mouseenter', () => {
        eventContainer.style.transform = 'scale(1.02)';
      });
      eventContainer.addEventListener('mouseleave', () => {
        eventContainer.style.transform = 'scale(1)';
      });
    }

    // Event marker/icon
    const marker = document.createElement('div');
    marker.className = 'timeline-marker';
    marker.style.cssText = `
      position: absolute;
      ${isHorizontal ? 
        'top: 50%; left: 50%; transform: translate(-50%, -50%);' :
        settings.layout === 'center' ? 
          'left: 50%; transform: translateX(-50%);' :
          'left: 20px; transform: translateX(-50%);'
      }
      width: ${settings.compactMode ? '12px' : '16px'};
      height: ${settings.compactMode ? '12px' : '16px'};
      border-radius: 50%;
      background: ${this.getStatusColor(event.status, theme)};
      border: 3px solid white;
      box-shadow: 0 0 0 3px ${theme.primary};
      z-index: 10;
      ${settings.showIcons && event.icon ? `
        background: white;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 12px;
        width: 24px;
        height: 24px;
      ` : ''}
    `;

    if (settings.showIcons && event.icon) {
      marker.textContent = event.icon;
    }

    // Event content
    const content = document.createElement('div');
    content.className = 'timeline-content';
    content.style.cssText = `
      ${isHorizontal ? 
        'margin-top: 3rem; text-align: center;' :
        settings.layout === 'center' ? 
          `margin-left: ${isLeft ? '0' : '60px'}; margin-right: ${isLeft ? '60px' : '0'}; text-align: ${isLeft ? 'right' : 'left'};` :
          'margin-left: 60px;'
      }
      background: ${theme.background};
      padding: ${settings.compactMode ? fluentTokens.spacingVerticalS.replace(/var\([^,]+,\s*([^)]+)\)/, '$1') : fluentTokens.spacingVerticalM.replace(/var\([^,]+,\s*([^)]+)\)/, '$1')} ${settings.compactMode ? fluentTokens.spacingHorizontalS.replace(/var\([^,]+,\s*([^)]+)\)/, '$1') : fluentTokens.spacingHorizontalM.replace(/var\([^,]+,\s*([^)]+)\)/, '$1')};
      border-radius: ${fluentTokens.borderRadiusLarge.replace(/var\([^,]+,\s*([^)]+)\)/, '$1')};
      box-shadow: ${fluentTokens.shadow4.replace(/var\([^,]+,\s*([^)]+)\)/, '$1')};
      border-left: 4px solid ${this.getStatusColor(event.status, theme)};
      font-family: ${fluentTokens.fontFamilyBase.replace(/var\([^,]+,\s*([^)]+)\)/, '$1')};
    `;

    // Event date
    if (settings.showDates) {
      const dateElement = document.createElement('div');
      dateElement.className = 'timeline-date';
      dateElement.style.cssText = `
        font-size: ${settings.compactMode ? fluentTokens.fontSizeBase100.replace(/var\([^,]+,\s*([^)]+)\)/, '$1') : fluentTokens.fontSizeBase200.replace(/var\([^,]+,\s*([^)]+)\)/, '$1')};
        color: ${theme.primary};
        font-weight: ${fluentTokens.fontWeightSemibold.replace(/var\([^,]+,\s*([^)]+)\)/, '$1')};
        margin-bottom: ${fluentTokens.spacingVerticalS.replace(/var\([^,]+,\s*([^)]+)\)/, '$1')};
      `;
      dateElement.textContent = this.formatDate(event.date, settings.dateFormat);
      content.appendChild(dateElement);
    }

    // Event title
    const title = document.createElement('h4');
    title.style.cssText = `
      margin: 0 0 ${fluentTokens.spacingVerticalS.replace(/var\([^,]+,\s*([^)]+)\)/, '$1')} 0;
      color: ${theme.text};
      font-size: ${settings.compactMode ? fluentTokens.fontSizeBase300.replace(/var\([^,]+,\s*([^)]+)\)/, '$1') : fluentTokens.fontSizeBase400.replace(/var\([^,]+,\s*([^)]+)\)/, '$1')};
      font-weight: ${fluentTokens.fontWeightSemibold.replace(/var\([^,]+,\s*([^)]+)\)/, '$1')};
    `;
    title.textContent = event.title;
    content.appendChild(title);

    // Event description
    if (event.description) {
      const description = document.createElement('p');
      description.style.cssText = `
        margin: 0;
        color: ${theme.text};
        opacity: 0.8;
        font-size: ${settings.compactMode ? fluentTokens.fontSizeBase200.replace(/var\([^,]+,\s*([^)]+)\)/, '$1') : fluentTokens.fontSizeBase300.replace(/var\([^,]+,\s*([^)]+)\)/, '$1')};
        line-height: 1.4;
      `;
      description.textContent = event.description;
      content.appendChild(description);
    }

    // Event category badge
    if (event.category) {
      const category = document.createElement('span');
      category.style.cssText = `
        display: inline-block;
        padding: ${fluentTokens.spacingVerticalXS.replace(/var\([^,]+,\s*([^)]+)\)/, '$1')} ${fluentTokens.spacingHorizontalS.replace(/var\([^,]+,\s*([^)]+)\)/, '$1')};
        background: ${theme.primary}20;
        color: ${theme.primary};
        font-size: ${fluentTokens.fontSizeBase100.replace(/var\([^,]+,\s*([^)]+)\)/, '$1')};
        border-radius: ${fluentTokens.borderRadiusCircular.replace(/var\([^,]+,\s*([^)]+)\)/, '$1')};
        margin-top: ${fluentTokens.spacingVerticalS.replace(/var\([^,]+,\s*([^)]+)\)/, '$1')};
        font-weight: ${fluentTokens.fontWeightMedium.replace(/var\([^,]+,\s*([^)]+)\)/, '$1')};
      `;
      category.textContent = event.category;
      content.appendChild(category);
    }

    // Click handler for links
    if (event.link && settings.interactive) {
      eventContainer.addEventListener('click', () => {
        window.open(event.link!, '_blank');
      });
      eventContainer.style.cursor = 'pointer';
    }

    eventContainer.appendChild(marker);
    eventContainer.appendChild(content);

    return eventContainer;
  }

  private getStatusColor(status?: string, theme?: any): string {
    switch (status) {
      case 'completed': return '#28a745';
      case 'current': return theme?.primary || '#0078d4';
      case 'upcoming': return '#ffc107';
      case 'cancelled': return '#dc3545';
      default: return theme?.primary || '#0078d4';
    }
  }

  private formatDate(date: string | Date, format: string): string {
    const d = new Date(date);
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const fullMonths = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    
    const day = d.getDate();
    const month = d.getMonth();
    const year = d.getFullYear();

    switch (format) {
      case 'MMM DD, YYYY': return `${months[month]} ${day}, ${year}`;
      case 'MMMM DD, YYYY': return `${fullMonths[month]} ${day}, ${year}`;
      case 'DD/MM/YYYY': return `${day.toString().padStart(2, '0')}/${(month + 1).toString().padStart(2, '0')}/${year}`;
      case 'MM/DD/YYYY': return `${(month + 1).toString().padStart(2, '0')}/${day.toString().padStart(2, '0')}/${year}`;
      case 'YYYY-MM-DD': return `${year}-${(month + 1).toString().padStart(2, '0')}-${day.toString().padStart(2, '0')}`;
      case 'relative': return this.getRelativeDate(d);
      default: return `${months[month]} ${day}, ${year}`;
    }
  }

  private getRelativeDate(date: Date): string {
    const now = new Date();
    const diffTime = now.getTime() - date.getTime();
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays === 0) return 'Today';
    if (diffDays === 1) return 'Yesterday';
    if (diffDays === -1) return 'Tomorrow';
    if (diffDays > 0 && diffDays < 7) return `${diffDays} days ago`;
    if (diffDays < 0 && diffDays > -7) return `In ${Math.abs(diffDays)} days`;
    if (diffDays > 0 && diffDays < 30) return `${Math.floor(diffDays / 7)} weeks ago`;
    if (diffDays < 0 && diffDays > -30) return `In ${Math.floor(Math.abs(diffDays) / 7)} weeks`;
    
    return this.formatDate(date, 'MMM DD, YYYY');
  }

  private addTimelineProgress(container: HTMLElement, events: TimelineEvent[], theme: any, fluentTokens: any): void {
    const completedEvents = events.filter(e => e.status === 'completed').length;
    const totalEvents = events.length;
    const progressPercent = (completedEvents / totalEvents) * 100;

    const progressContainer = document.createElement('div');
    progressContainer.style.cssText = `
      margin-bottom: ${fluentTokens.spacingVerticalM.replace(/var\([^,]+,\s*([^)]+)\)/, '$1')};
      padding: ${fluentTokens.spacingVerticalM.replace(/var\([^,]+,\s*([^)]+)\)/, '$1')};
      background: ${theme.background};
      border-radius: ${fluentTokens.borderRadiusLarge.replace(/var\([^,]+,\s*([^)]+)\)/, '$1')};
      box-shadow: ${fluentTokens.shadow4.replace(/var\([^,]+,\s*([^)]+)\)/, '$1')};
      font-family: ${fluentTokens.fontFamilyBase.replace(/var\([^,]+,\s*([^)]+)\)/, '$1')};
    `;

    const progressLabel = document.createElement('div');
    progressLabel.style.cssText = `
      display: flex;
      justify-content: space-between;
      margin-bottom: ${fluentTokens.spacingVerticalS.replace(/var\([^,]+,\s*([^)]+)\)/, '$1')};
      font-weight: ${fluentTokens.fontWeightSemibold.replace(/var\([^,]+,\s*([^)]+)\)/, '$1')};
      color: ${theme.text};
      font-size: ${fluentTokens.fontSizeBase300.replace(/var\([^,]+,\s*([^)]+)\)/, '$1')};
    `;
    progressLabel.innerHTML = `
      <span>Progress</span>
      <span>${completedEvents}/${totalEvents} (${Math.round(progressPercent)}%)</span>
    `;

    const progressBar = document.createElement('div');
    progressBar.style.cssText = `
      width: 100%;
      height: 8px;
      background: ${theme.secondary}40;
      border-radius: ${fluentTokens.borderRadiusSmall.replace(/var\([^,]+,\s*([^)]+)\)/, '$1')};
      overflow: hidden;
    `;

    const progressFill = document.createElement('div');
    progressFill.style.cssText = `
      height: 100%;
      background: linear-gradient(to right, ${theme.primary}, ${theme.secondary});
      width: ${progressPercent}%;
      transition: width ${fluentTokens.durationSlow.replace(/var\([^,]+,\s*([^)]+)\)/, '$1')} ${fluentTokens.curveEasyEase.replace(/var\([^,]+,\s*([^)]+)\)/, '$1')};
      border-radius: ${fluentTokens.borderRadiusSmall.replace(/var\([^,]+,\s*([^)]+)\)/, '$1')};
    `;

    progressBar.appendChild(progressFill);
    progressContainer.appendChild(progressLabel);
    progressContainer.appendChild(progressBar);
    container.insertBefore(progressContainer, container.firstChild);
  }

  // Fluent UI Enhanced Widgets

  private renderFluentCard(config: WidgetConfig, container: HTMLElement): void {
    const cardData = config.data;
    const theme = this.getTheme(config.style?.theme);
    const fluentTokens = getFluentTokens(config.style?.theme === 'fluent-dark' ? 'dark' : 'light');

    const card = document.createElement('div');
    card.className = 'fluent-card';
    card.style.cssText = `
      background: ${theme.surfaceBackground || theme.background};
      border: 1px solid ${theme.surfaceBorder || theme.border};
      border-radius: ${fluentTokens.borderRadiusLarge.replace(/var\([^,]+,\s*([^)]+)\)/, '$1')};
      padding: ${fluentTokens.spacingVerticalXL.replace(/var\([^,]+,\s*([^)]+)\)/, '$1')} ${fluentTokens.spacingHorizontalXL.replace(/var\([^,]+,\s*([^)]+)\)/, '$1')};
      box-shadow: ${fluentTokens.shadow4.replace(/var\([^,]+,\s*([^)]+)\)/, '$1')};
      font-family: ${fluentTokens.fontFamilyBase.replace(/var\([^,]+,\s*([^)]+)\)/, '$1')};
      transition: all ${fluentTokens.durationNormal.replace(/var\([^,]+,\s*([^)]+)\)/, '$1')} ${fluentTokens.curveEasyEase.replace(/var\([^,]+,\s*([^)]+)\)/, '$1')};
      cursor: ${cardData.interactive ? 'pointer' : 'default'};
    `;

    // Add hover effects for interactive cards
    if (cardData.interactive) {
      card.addEventListener('mouseenter', () => {
        card.style.transform = 'translateY(-2px)';
        card.style.boxShadow = fluentTokens.shadow8.replace(/var\([^,]+,\s*([^)]+)\)/, '$1');
      });
      card.addEventListener('mouseleave', () => {
        card.style.transform = 'translateY(0)';
        card.style.boxShadow = fluentTokens.shadow4.replace(/var\([^,]+,\s*([^)]+)\)/, '$1');
      });
    }

    if (cardData.title) {
      const title = document.createElement('h3');
      title.textContent = cardData.title;
      title.style.cssText = `
        margin: 0 0 ${fluentTokens.spacingVerticalM.replace(/var\([^,]+,\s*([^)]+)\)/, '$1')} 0;
        color: ${theme.text};
        font-size: ${fluentTokens.fontSizeBase500.replace(/var\([^,]+,\s*([^)]+)\)/, '$1')};
        font-weight: ${fluentTokens.fontWeightSemibold.replace(/var\([^,]+,\s*([^)]+)\)/, '$1')};
        line-height: ${fluentTokens.lineHeightBase500.replace(/var\([^,]+,\s*([^)]+)\)/, '$1')};
      `;
      card.appendChild(title);
    }

    if (cardData.content) {
      const content = document.createElement('p');
      content.textContent = cardData.content;
      content.style.cssText = `
        margin: 0;
        line-height: ${fluentTokens.lineHeightBase400.replace(/var\([^,]+,\s*([^)]+)\)/, '$1')};
        color: ${theme.text};
        font-size: ${fluentTokens.fontSizeBase300.replace(/var\([^,]+,\s*([^)]+)\)/, '$1')};
      `;
      card.appendChild(content);
    }

    if (cardData.actions && Array.isArray(cardData.actions)) {
      const actionsContainer = document.createElement('div');
      actionsContainer.style.cssText = `
        margin-top: ${fluentTokens.spacingVerticalL.replace(/var\([^,]+,\s*([^)]+)\)/, '$1')};
        display: flex;
        gap: ${fluentTokens.spacingHorizontalS.replace(/var\([^,]+,\s*([^)]+)\)/, '$1')};
        flex-wrap: wrap;
      `;

      cardData.actions.forEach((action: any) => {
        const button = this.createFluentButton(action, theme, fluentTokens);
        actionsContainer.appendChild(button);
      });

      card.appendChild(actionsContainer);
    }

    container.appendChild(card);
  }

  private renderFluentButton(config: WidgetConfig, container: HTMLElement): void {
    const buttonData = config.data;
    const theme = this.getTheme(config.style?.theme);
    const fluentTokens = getFluentTokens(config.style?.theme === 'fluent-dark' ? 'dark' : 'light');

    const button = this.createFluentButton(buttonData, theme, fluentTokens);
    container.appendChild(button);
  }

  private createFluentButton(buttonData: any, theme: any, fluentTokens: any): HTMLButtonElement {
    const button = document.createElement('button');
    button.textContent = buttonData.text || buttonData.label || 'Button';
    button.className = 'fluent-button';
    
    const appearance = buttonData.appearance || 'secondary';
    let buttonStyles = '';

    switch (appearance) {
      case 'primary':
        buttonStyles = `
          background: ${theme.primary};
          color: white;
          border: 1px solid ${theme.primary};
        `;
        break;
      case 'outline':
        buttonStyles = `
          background: transparent;
          color: ${theme.primary};
          border: 1px solid ${theme.primary};
        `;
        break;
      case 'subtle':
        buttonStyles = `
          background: transparent;
          color: ${theme.text};
          border: 1px solid transparent;
        `;
        break;
      default: // secondary
        buttonStyles = `
          background: ${theme.surfaceBackground || theme.background};
          color: ${theme.text};
          border: 1px solid ${theme.border};
        `;
    }

    button.style.cssText = `
      ${buttonStyles}
      border-radius: ${fluentTokens.borderRadiusMedium.replace(/var\([^,]+,\s*([^)]+)\)/, '$1')};
      padding: ${fluentTokens.spacingVerticalSNudge.replace(/var\([^,]+,\s*([^)]+)\)/, '$1')} ${fluentTokens.spacingHorizontalMNudge.replace(/var\([^,]+,\s*([^)]+)\)/, '$1')};
      font-family: ${fluentTokens.fontFamilyBase.replace(/var\([^,]+,\s*([^)]+)\)/, '$1')};
      font-size: ${fluentTokens.fontSizeBase300.replace(/var\([^,]+,\s*([^)]+)\)/, '$1')};
      font-weight: ${fluentTokens.fontWeightMedium.replace(/var\([^,]+,\s*([^)]+)\)/, '$1')};
      cursor: pointer;
      transition: all ${fluentTokens.durationFast.replace(/var\([^,]+,\s*([^)]+)\)/, '$1')} ${fluentTokens.curveEasyEase.replace(/var\([^,]+,\s*([^)]+)\)/, '$1')};
      display: inline-flex;
      align-items: center;
      justify-content: center;
      min-height: 32px;
    `;

    // Add hover and focus effects
    button.addEventListener('mouseenter', () => {
      switch (appearance) {
        case 'primary':
          button.style.background = theme.secondary;
          break;
        case 'outline':
          button.style.background = `${theme.primary}10`;
          break;
        case 'subtle':
          button.style.background = `${theme.text}08`;
          break;
        default:
          button.style.background = theme.surfaceBorder || '#f5f5f5';
      }
    });

    button.addEventListener('mouseleave', () => {
      switch (appearance) {
        case 'primary':
          button.style.background = theme.primary;
          break;
        case 'outline':
        case 'subtle':
          button.style.background = 'transparent';
          break;
        default:
          button.style.background = theme.surfaceBackground || theme.background;
      }
    });

    if (buttonData.onClick) {
      button.addEventListener('click', buttonData.onClick);
    }

    return button;
  }

  private renderFluentProgressBar(config: WidgetConfig, container: HTMLElement): void {
    const progressData = config.data;
    const theme = this.getTheme(config.style?.theme);
    const fluentTokens = getFluentTokens(config.style?.theme === 'fluent-dark' ? 'dark' : 'light');

    const progressContainer = document.createElement('div');
    progressContainer.className = 'fluent-progressbar';
    progressContainer.style.cssText = `
      font-family: ${fluentTokens.fontFamilyBase.replace(/var\([^,]+,\s*([^)]+)\)/, '$1')};
      margin-bottom: ${fluentTokens.spacingVerticalM.replace(/var\([^,]+,\s*([^)]+)\)/, '$1')};
    `;

    if (progressData.label) {
      const label = document.createElement('div');
      label.textContent = progressData.label;
      label.style.cssText = `
        margin-bottom: ${fluentTokens.spacingVerticalXS.replace(/var\([^,]+,\s*([^)]+)\)/, '$1')};
        font-size: ${fluentTokens.fontSizeBase300.replace(/var\([^,]+,\s*([^)]+)\)/, '$1')};
        font-weight: ${fluentTokens.fontWeightMedium.replace(/var\([^,]+,\s*([^)]+)\)/, '$1')};
        color: ${theme.text};
      `;
      progressContainer.appendChild(label);
    }

    const progressTrack = document.createElement('div');
    progressTrack.style.cssText = `
      width: 100%;
      height: 4px;
      background: ${theme.surfaceBorder || theme.border};
      border-radius: ${fluentTokens.borderRadiusCircular.replace(/var\([^,]+,\s*([^)]+)\)/, '$1')};
      overflow: hidden;
    `;

    const progressFill = document.createElement('div');
    const value = Math.min(Math.max(progressData.value || 0, 0), 100);
    progressFill.style.cssText = `
      height: 100%;
      background: ${theme.primary};
      width: ${value}%;
      border-radius: ${fluentTokens.borderRadiusCircular.replace(/var\([^,]+,\s*([^)]+)\)/, '$1')};
      transition: width ${fluentTokens.durationSlow.replace(/var\([^,]+,\s*([^)]+)\)/, '$1')} ${fluentTokens.curveEasyEase.replace(/var\([^,]+,\s*([^)]+)\)/, '$1')};
    `;

    if (progressData.indeterminate) {
      progressFill.style.animation = 'fluent-progress-indeterminate 2s linear infinite';
      progressFill.style.width = '30%';
    }

    progressTrack.appendChild(progressFill);
    progressContainer.appendChild(progressTrack);

    if (progressData.description) {
      const description = document.createElement('div');
      description.textContent = progressData.description;
      description.style.cssText = `
        margin-top: ${fluentTokens.spacingVerticalXS.replace(/var\([^,]+,\s*([^)]+)\)/, '$1')};
        font-size: ${fluentTokens.fontSizeBase200.replace(/var\([^,]+,\s*([^)]+)\)/, '$1')};
        color: ${theme.text};
        opacity: 0.8;
      `;
      progressContainer.appendChild(description);
    }

    container.appendChild(progressContainer);
  }

  // New widget renderers from more-samples.html

  private renderProfileCard(config: WidgetConfig, container: HTMLElement): void {
    const profileData = config.data;
    const theme = this.getTheme(config.style?.theme);
    const fluentTokens = getFluentTokens(config.style?.theme === 'fluent-dark' ? 'dark' : 'light');

    const card = document.createElement('div');
    card.className = 'fluent-profile-card';
    card.style.cssText = `
      background: ${theme.surfaceBackground || theme.background};
      border: 1px solid ${theme.surfaceBorder || theme.border};
      border-radius: ${fluentTokens.borderRadiusLarge.replace(/var\([^,]+,\s*([^)]+)\)/, '$1')};
      padding: ${fluentTokens.spacingVerticalXXL.replace(/var\([^,]+,\s*([^)]+)\)/, '$1')};
      text-align: center;
      font-family: ${fluentTokens.fontFamilyBase.replace(/var\([^,]+,\s*([^)]+)\)/, '$1')};
      box-shadow: ${fluentTokens.shadow4.replace(/var\([^,]+,\s*([^)]+)\)/, '$1')};
      transition: all ${fluentTokens.durationNormal.replace(/var\([^,]+,\s*([^)]+)\)/, '$1')} ${fluentTokens.curveEasyEase.replace(/var\([^,]+,\s*([^)]+)\)/, '$1')};
    `;

    // Avatar
    if (profileData.avatar) {
      const avatar = document.createElement('img');
      avatar.src = profileData.avatar;
      avatar.alt = profileData.name || 'Profile';
      avatar.style.cssText = `
        width: 96px;
        height: 96px;
        border-radius: 50%;
        margin: 0 auto ${fluentTokens.spacingVerticalM.replace(/var\([^,]+,\s*([^)]+)\)/, '$1')};
        border: 4px solid ${theme.surfaceBorder || theme.border};
        box-shadow: ${fluentTokens.shadow4.replace(/var\([^,]+,\s*([^)]+)\)/, '$1')};
      `;
      card.appendChild(avatar);
    }

    // Name
    if (profileData.name) {
      const name = document.createElement('h3');
      name.textContent = profileData.name;
      name.style.cssText = `
        margin: 0 0 ${fluentTokens.spacingVerticalS.replace(/var\([^,]+,\s*([^)]+)\)/, '$1')} 0;
        color: ${theme.text};
        font-size: ${fluentTokens.fontSizeBase500.replace(/var\([^,]+,\s*([^)]+)\)/, '$1')};
        font-weight: ${fluentTokens.fontWeightSemibold.replace(/var\([^,]+,\s*([^)]+)\)/, '$1')};
      `;
      card.appendChild(name);
    }

    // Title/Role
    if (profileData.title) {
      const title = document.createElement('p');
      title.textContent = profileData.title;
      title.style.cssText = `
        margin: 0 0 ${fluentTokens.spacingVerticalM.replace(/var\([^,]+,\s*([^)]+)\)/, '$1')} 0;
        color: ${theme.text};
        opacity: 0.8;
        font-size: ${fluentTokens.fontSizeBase300.replace(/var\([^,]+,\s*([^)]+)\)/, '$1')};
      `;
      card.appendChild(title);
    }

    // Social Icons
    if (profileData.socialLinks && Array.isArray(profileData.socialLinks)) {
      const socialContainer = document.createElement('div');
      socialContainer.style.cssText = `
        display: flex;
        justify-content: center;
        gap: ${fluentTokens.spacingHorizontalM.replace(/var\([^,]+,\s*([^)]+)\)/, '$1')};
        margin-top: ${fluentTokens.spacingVerticalM.replace(/var\([^,]+,\s*([^)]+)\)/, '$1')};
      `;

      profileData.socialLinks.forEach((link: any) => {
        const iconContainer = document.createElement('a');
        iconContainer.href = link.url || '#';
        iconContainer.target = '_blank';
        iconContainer.style.cssText = `
          display: flex;
          align-items: center;
          justify-content: center;
          width: 40px;
          height: 40px;
          border-radius: 50%;
          background: ${theme.surfaceBorder || theme.border};
          color: ${theme.text};
          text-decoration: none;
          transition: all ${fluentTokens.durationFast.replace(/var\([^,]+,\s*([^)]+)\)/, '$1')} ${fluentTokens.curveEasyEase.replace(/var\([^,]+,\s*([^)]+)\)/, '$1')};
        `;
        iconContainer.innerHTML = link.icon || '📧';
        
        iconContainer.addEventListener('mouseenter', () => {
          iconContainer.style.background = theme.primary;
          iconContainer.style.color = 'white';
        });
        iconContainer.addEventListener('mouseleave', () => {
          iconContainer.style.background = theme.surfaceBorder || theme.border;
          iconContainer.style.color = theme.text;
        });

        socialContainer.appendChild(iconContainer);
      });

      card.appendChild(socialContainer);
    }

    container.appendChild(card);
  }

  private renderStatsCard(config: WidgetConfig, container: HTMLElement): void {
    const statsData = config.data;
    const theme = this.getTheme(config.style?.theme);
    const fluentTokens = getFluentTokens(config.style?.theme === 'fluent-dark' ? 'dark' : 'light');

    const card = document.createElement('div');
    card.className = 'fluent-stats-card';
    card.style.cssText = `
      background: ${statsData.accentColor || theme.primary};
      color: white;
      border-radius: ${fluentTokens.borderRadiusLarge.replace(/var\([^,]+,\s*([^)]+)\)/, '$1')};
      padding: ${fluentTokens.spacingVerticalXL.replace(/var\([^,]+,\s*([^)]+)\)/, '$1')};
      font-family: ${fluentTokens.fontFamilyBase.replace(/var\([^,]+,\s*([^)]+)\)/, '$1')};
      box-shadow: ${fluentTokens.shadow4.replace(/var\([^,]+,\s*([^)]+)\)/, '$1')};
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      min-height: 150px;
      transition: all ${fluentTokens.durationNormal.replace(/var\([^,]+,\s*([^)]+)\)/, '$1')} ${fluentTokens.curveEasyEase.replace(/var\([^,]+,\s*([^)]+)\)/, '$1')};
      cursor: ${statsData.clickable ? 'pointer' : 'default'};
    `;

    // Header with title and icon
    const header = document.createElement('div');
    header.style.cssText = `
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: ${fluentTokens.spacingVerticalM.replace(/var\([^,]+,\s*([^)]+)\)/, '$1')};
    `;

    const title = document.createElement('h3');
    title.textContent = statsData.title || 'Stat';
    title.style.cssText = `
      margin: 0;
      font-size: ${fluentTokens.fontSizeBase400.replace(/var\([^,]+,\s*([^)]+)\)/, '$1')};
      font-weight: ${fluentTokens.fontWeightSemibold.replace(/var\([^,]+,\s*([^)]+)\)/, '$1')};
    `;

    const icon = document.createElement('div');
    icon.innerHTML = statsData.icon || '📊';
    icon.style.cssText = `
      opacity: 0.7;
      font-size: 24px;
    `;

    header.appendChild(title);
    header.appendChild(icon);

    // Value
    const value = document.createElement('div');
    value.textContent = statsData.value || '0';
    value.style.cssText = `
      font-size: ${fluentTokens.fontSizeHero1000.replace(/var\([^,]+,\s*([^)]+)\)/, '$1')};
      font-weight: ${fluentTokens.fontWeightBold.replace(/var\([^,]+,\s*([^)]+)\)/, '$1')};
      line-height: 1;
      margin-bottom: ${fluentTokens.spacingVerticalM.replace(/var\([^,]+,\s*([^)]+)\)/, '$1')};
    `;

    // Trend
    const trend = document.createElement('div');
    trend.textContent = statsData.trend || '';
    trend.style.cssText = `
      font-size: ${fluentTokens.fontSizeBase200.replace(/var\([^,]+,\s*([^)]+)\)/, '$1')};
      opacity: 0.8;
    `;

    card.appendChild(header);
    card.appendChild(value);
    card.appendChild(trend);

    if (statsData.clickable && statsData.onClick) {
      card.addEventListener('click', statsData.onClick);
    }

    container.appendChild(card);
  }

  private renderNotificationCard(config: WidgetConfig, container: HTMLElement): void {
    const notificationData = config.data;
    const theme = this.getTheme(config.style?.theme);
    const fluentTokens = getFluentTokens(config.style?.theme === 'fluent-dark' ? 'dark' : 'light');

    const card = document.createElement('div');
    card.className = 'fluent-notification-card';
    card.style.cssText = `
      background: ${theme.surfaceBackground || theme.background};
      border: 1px solid ${theme.surfaceBorder || theme.border};
      border-radius: ${fluentTokens.borderRadiusLarge.replace(/var\([^,]+,\s*([^)]+)\)/, '$1')};
      padding: ${fluentTokens.spacingVerticalXL.replace(/var\([^,]+,\s*([^)]+)\)/, '$1')};
      font-family: ${fluentTokens.fontFamilyBase.replace(/var\([^,]+,\s*([^)]+)\)/, '$1')};
      box-shadow: ${fluentTokens.shadow4.replace(/var\([^,]+,\s*([^)]+)\)/, '$1')};
      display: flex;
      align-items: flex-start;
      gap: ${fluentTokens.spacingHorizontalM.replace(/var\([^,]+,\s*([^)]+)\)/, '$1')};
    `;

    // Icon container
    const iconContainer = document.createElement('div');
    const iconColor = notificationData.type === 'success' ? '#10b981' : 
                     notificationData.type === 'warning' ? '#f59e0b' :
                     notificationData.type === 'error' ? '#ef4444' : theme.primary;
    
    iconContainer.style.cssText = `
      background: ${iconColor}20;
      padding: ${fluentTokens.spacingVerticalM.replace(/var\([^,]+,\s*([^)]+)\)/, '$1')};
      border-radius: 50%;
      flex-shrink: 0;
      display: flex;
      align-items: center;
      justify-content: center;
    `;
    iconContainer.innerHTML = notificationData.icon || '✓';

    // Content container
    const content = document.createElement('div');
    content.style.cssText = `
      flex: 1;
    `;

    // Title
    const title = document.createElement('h4');
    title.textContent = notificationData.title || 'Notification';
    title.style.cssText = `
      margin: 0 0 ${fluentTokens.spacingVerticalS.replace(/var\([^,]+,\s*([^)]+)\)/, '$1')} 0;
      color: ${theme.text};
      font-size: ${fluentTokens.fontSizeBase400.replace(/var\([^,]+,\s*([^)]+)\)/, '$1')};
      font-weight: ${fluentTokens.fontWeightSemibold.replace(/var\([^,]+,\s*([^)]+)\)/, '$1')};
    `;

    // Message
    const message = document.createElement('p');
    message.textContent = notificationData.message || '';
    message.style.cssText = `
      margin: 0 0 ${fluentTokens.spacingVerticalM.replace(/var\([^,]+,\s*([^)]+)\)/, '$1')} 0;
      color: ${theme.text};
      opacity: 0.8;
      font-size: ${fluentTokens.fontSizeBase300.replace(/var\([^,]+,\s*([^)]+)\)/, '$1')};
      line-height: 1.4;
    `;

    // Action button
    if (notificationData.action) {
      const actionButton = document.createElement('button');
      actionButton.textContent = notificationData.action.text || 'View Details';
      actionButton.style.cssText = `
        background: none;
        border: none;
        color: ${theme.primary};
        font-size: ${fluentTokens.fontSizeBase300.replace(/var\([^,]+,\s*([^)]+)\)/, '$1')};
        font-weight: ${fluentTokens.fontWeightMedium.replace(/var\([^,]+,\s*([^)]+)\)/, '$1')};
        cursor: pointer;
        padding: 0;
        text-decoration: underline;
        transition: opacity ${fluentTokens.durationFast.replace(/var\([^,]+,\s*([^)]+)\)/, '$1')} ${fluentTokens.curveEasyEase.replace(/var\([^,]+,\s*([^)]+)\)/, '$1')};
      `;

      actionButton.addEventListener('mouseenter', () => {
        actionButton.style.opacity = '0.8';
      });
      actionButton.addEventListener('mouseleave', () => {
        actionButton.style.opacity = '1';
      });

      if (notificationData.action.onClick) {
        actionButton.addEventListener('click', notificationData.action.onClick);
      }

      content.appendChild(actionButton);
    }

    content.appendChild(title);
    content.appendChild(message);

    card.appendChild(iconContainer);
    card.appendChild(content);
    container.appendChild(card);
  }

  private renderProgressBar(config: WidgetConfig, container: HTMLElement): void {
    const progressData = config.data;
    const theme = this.getTheme(config.style?.theme);
    const fluentTokens = getFluentTokens(config.style?.theme === 'fluent-dark' ? 'dark' : 'light');

    const progressContainer = document.createElement('div');
    progressContainer.className = 'fluent-progress-bar';
    progressContainer.style.cssText = `
      font-family: ${fluentTokens.fontFamilyBase.replace(/var\([^,]+,\s*([^)]+)\)/, '$1')};
      margin-bottom: ${fluentTokens.spacingVerticalM.replace(/var\([^,]+,\s*([^)]+)\)/, '$1')};
    `;

    // Label
    if (progressData.label) {
      const labelContainer = document.createElement('div');
      labelContainer.style.cssText = `
        display: flex;
        justify-content: space-between;
        margin-bottom: ${fluentTokens.spacingVerticalS.replace(/var\([^,]+,\s*([^)]+)\)/, '$1')};
      `;

      const label = document.createElement('span');
      label.textContent = progressData.label;
      label.style.cssText = `
        font-size: ${fluentTokens.fontSizeBase300.replace(/var\([^,]+,\s*([^)]+)\)/, '$1')};
        font-weight: ${fluentTokens.fontWeightMedium.replace(/var\([^,]+,\s*([^)]+)\)/, '$1')};
        color: ${theme.text};
      `;

      const percentage = document.createElement('span');
      percentage.textContent = `${progressData.value || 0}%`;
      percentage.style.cssText = `
        font-size: ${fluentTokens.fontSizeBase300.replace(/var\([^,]+,\s*([^)]+)\)/, '$1')};
        font-weight: ${fluentTokens.fontWeightMedium.replace(/var\([^,]+,\s*([^)]+)\)/, '$1')};
        color: ${theme.text};
      `;

      labelContainer.appendChild(label);
      labelContainer.appendChild(percentage);
      progressContainer.appendChild(labelContainer);
    }

    // Progress track
    const progressTrack = document.createElement('div');
    progressTrack.style.cssText = `
      width: 100%;
      height: ${progressData.height || '8px'};
      background: ${theme.surfaceBorder || theme.border};
      border-radius: ${fluentTokens.borderRadiusCircular.replace(/var\([^,]+,\s*([^)]+)\)/, '$1')};
      overflow: hidden;
    `;

    // Progress fill
    const progressFill = document.createElement('div');
    const value = Math.min(Math.max(progressData.value || 0, 0), 100);
    progressFill.style.cssText = `
      height: 100%;
      background: ${progressData.color || theme.primary};
      width: ${value}%;
      border-radius: ${fluentTokens.borderRadiusCircular.replace(/var\([^,]+,\s*([^)]+)\)/, '$1')};
      transition: width ${fluentTokens.durationSlow.replace(/var\([^,]+,\s*([^)]+)\)/, '$1')} ${fluentTokens.curveEasyEase.replace(/var\([^,]+,\s*([^)]+)\)/, '$1')};
    `;

    if (progressData.animated) {
      progressFill.style.animation = 'progress-pulse 2s ease-in-out infinite';
    }

    progressTrack.appendChild(progressFill);
    progressContainer.appendChild(progressTrack);

    container.appendChild(progressContainer);
  }

  private renderKpiDonut(config: WidgetConfig, container: HTMLElement): void {
    const kpiData = config.data;
    const theme = this.getTheme(config.style?.theme);
    const fluentTokens = getFluentTokens(config.style?.theme === 'fluent-dark' ? 'dark' : 'light');

    const kpiContainer = document.createElement('div');
    kpiContainer.className = 'fluent-kpi-donut';
    kpiContainer.style.cssText = `
      display: flex;
      flex-direction: column;
      align-items: center;
      font-family: ${fluentTokens.fontFamilyBase.replace(/var\([^,]+,\s*([^)]+)\)/, '$1')};
    `;

    // SVG Donut Chart
    const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    svg.setAttribute('width', '200');
    svg.setAttribute('height', '200');
    svg.setAttribute('viewBox', '0 0 200 200');

    const radius = 80;
    const strokeWidth = 16;
    const centerX = 100;
    const centerY = 100;
    const circumference = 2 * Math.PI * radius;
    const value = Math.min(Math.max(kpiData.value || 0, 0), 100);
    const progress = (value / 100) * circumference;

    // Background circle
    const backgroundCircle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
    backgroundCircle.setAttribute('cx', centerX.toString());
    backgroundCircle.setAttribute('cy', centerY.toString());
    backgroundCircle.setAttribute('r', radius.toString());
    backgroundCircle.setAttribute('fill', 'none');
    backgroundCircle.setAttribute('stroke', theme.surfaceBorder || theme.border);
    backgroundCircle.setAttribute('stroke-width', strokeWidth.toString());

    // Progress circle
    const progressCircle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
    progressCircle.setAttribute('cx', centerX.toString());
    progressCircle.setAttribute('cy', centerY.toString());
    progressCircle.setAttribute('r', radius.toString());
    progressCircle.setAttribute('fill', 'none');
    progressCircle.setAttribute('stroke', kpiData.color || theme.primary);
    progressCircle.setAttribute('stroke-width', strokeWidth.toString());
    progressCircle.setAttribute('stroke-linecap', 'round');
    progressCircle.setAttribute('stroke-dasharray', circumference.toString());
    progressCircle.setAttribute('stroke-dashoffset', (circumference - progress).toString());
    progressCircle.setAttribute('transform', `rotate(-90 ${centerX} ${centerY})`);
    progressCircle.style.transition = 'stroke-dashoffset 1s ease-in-out';

    // Center text
    const centerText = document.createElementNS('http://www.w3.org/2000/svg', 'text');
    centerText.setAttribute('x', centerX.toString());
    centerText.setAttribute('y', centerY.toString());
    centerText.setAttribute('text-anchor', 'middle');
    centerText.setAttribute('dominant-baseline', 'middle');
    centerText.setAttribute('font-size', '36');
    centerText.setAttribute('font-weight', 'bold');
    centerText.setAttribute('fill', theme.text);
    centerText.textContent = `${value}%`;

    svg.appendChild(backgroundCircle);
    svg.appendChild(progressCircle);
    svg.appendChild(centerText);

    // Label
    if (kpiData.label) {
      const label = document.createElement('div');
      label.textContent = kpiData.label;
      label.style.cssText = `
        margin-top: ${fluentTokens.spacingVerticalM.replace(/var\([^,]+,\s*([^)]+)\)/, '$1')};
        font-size: ${fluentTokens.fontSizeBase400.replace(/var\([^,]+,\s*([^)]+)\)/, '$1')};
        font-weight: ${fluentTokens.fontWeightSemibold.replace(/var\([^,]+,\s*([^)]+)\)/, '$1')};
        color: ${theme.text};
        text-align: center;
      `;
      kpiContainer.appendChild(label);
    }

    kpiContainer.appendChild(svg);
    container.appendChild(kpiContainer);
  }

  private renderFunnel(config: WidgetConfig, container: HTMLElement): void {
    const funnelData = config.data;
    const theme = this.getTheme(config.style?.theme);
    const fluentTokens = getFluentTokens(config.style?.theme === 'fluent-dark' ? 'dark' : 'light');

    const funnelContainer = document.createElement('div');
    funnelContainer.className = 'fluent-funnel';
    funnelContainer.style.cssText = `
      font-family: ${fluentTokens.fontFamilyBase.replace(/var\([^,]+,\s*([^)]+)\)/, '$1')};
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: ${fluentTokens.spacingVerticalXS.replace(/var\([^,]+,\s*([^)]+)\)/, '$1')};
    `;

    // Title
    if (funnelData.title) {
      const title = document.createElement('h3');
      title.textContent = funnelData.title;
      title.style.cssText = `
        margin: 0 0 ${fluentTokens.spacingVerticalM.replace(/var\([^,]+,\s*([^)]+)\)/, '$1')} 0;
        color: ${theme.text};
        font-size: ${fluentTokens.fontSizeBase400.replace(/var\([^,]+,\s*([^)]+)\)/, '$1')};
        font-weight: ${fluentTokens.fontWeightSemibold.replace(/var\([^,]+,\s*([^)]+)\)/, '$1')};
        text-align: center;
      `;
      funnelContainer.appendChild(title);
    }

    // Funnel stages
    if (funnelData.stages && Array.isArray(funnelData.stages)) {
      funnelData.stages.forEach((stage: any, index: number) => {
        const stageElement = document.createElement('div');
        const width = 100 - (index * 15); // Decreasing width for funnel effect
        const colors = [theme.primary, theme.secondary, '#1e40af', '#1e3a8a'];
        const stageColor = stage.color || colors[index % colors.length];
        
        stageElement.style.cssText = `
          position: relative;
          width: ${width}%;
          background: ${stageColor};
          color: white;
          text-align: center;
          padding: ${fluentTokens.spacingVerticalM.replace(/var\([^,]+,\s*([^)]+)\)/, '$1')} ${fluentTokens.spacingHorizontalM.replace(/var\([^,]+,\s*([^)]+)\)/, '$1')};
          margin: 0 auto;
          clip-path: polygon(10% 0%, 90% 0%, 100% 100%, 0% 100%);
          font-size: ${fluentTokens.fontSizeBase300.replace(/var\([^,]+,\s*([^)]+)\)/, '$1')};
          font-weight: ${fluentTokens.fontWeightMedium.replace(/var\([^,]+,\s*([^)]+)\)/, '$1')};
          min-height: 40px;
          display: flex;
          align-items: center;
          justify-content: center;
        `;

        const stageText = `${stage.label || `Stage ${index + 1}`} (${stage.value || '0'}${stage.unit || '%'})`;
        stageElement.textContent = stageText;

        funnelContainer.appendChild(stageElement);
      });
    }

    container.appendChild(funnelContainer);
  }

  private renderScatterPlot(config: WidgetConfig, container: HTMLElement): void {
    const scatterData = config.data as ChartData;
    const theme = this.getTheme(config.style?.theme);

    const canvas = document.createElement('canvas');
    canvas.width = 400;
    canvas.height = 300;
    canvas.style.maxWidth = '100%';
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    this.drawScatterPlot(ctx, scatterData, canvas.width, canvas.height, theme);
    container.appendChild(canvas);
  }

  private drawScatterPlot(ctx: CanvasRenderingContext2D, data: ChartData, width: number, height: number, theme: any): void {
    const padding = 40;
    const chartWidth = width - 2 * padding;
    const chartHeight = height - 2 * padding;

    // Check if datasets exist and are valid
    if (!data.datasets || !Array.isArray(data.datasets) || data.datasets.length === 0) {
      // Draw a message indicating no data
      ctx.fillStyle = theme.text || '#323130';
      ctx.font = '16px system-ui';
      ctx.textAlign = 'center';
      ctx.fillText('No data available', width / 2, height / 2);
      return;
    }

    // Find data ranges
    let maxX = 0, maxY = 0;
    data.datasets.forEach(dataset => {
      if (dataset && dataset.data && Array.isArray(dataset.data)) {
        dataset.data.forEach((point: any) => {
          if (typeof point === 'object' && point.x !== undefined && point.y !== undefined) {
            maxX = Math.max(maxX, point.x);
            maxY = Math.max(maxY, point.y);
          }
        });
      }
    });

    // Ensure we have valid ranges
    if (maxX === 0 && maxY === 0) {
      maxX = 100;
      maxY = 100;
    }

    // Draw axes
    ctx.strokeStyle = theme.border;
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(padding, padding);
    ctx.lineTo(padding, height - padding);
    ctx.lineTo(width - padding, height - padding);
    ctx.stroke();

    // Draw scatter points
    data.datasets.forEach((dataset) => {
      if (!dataset || !dataset.data || !Array.isArray(dataset.data)) {
        return;
      }

      const color = Array.isArray(dataset.backgroundColor) 
        ? dataset.backgroundColor[0] 
        : dataset.backgroundColor || theme.primary;

      ctx.fillStyle = color;
      
      dataset.data.forEach((point: any) => {
        if (typeof point === 'object' && point.x !== undefined && point.y !== undefined) {
          const x = padding + (point.x / maxX) * chartWidth;
          const y = height - padding - (point.y / maxY) * chartHeight;
          
          ctx.beginPath();
          ctx.arc(x, y, 4, 0, 2 * Math.PI);
          ctx.fill();
        }
      });
    });

    // Draw legend
    if (data.datasets.length > 1) {
      this.drawLegend(ctx, data, width, height, 20);
    }
  }

  private renderBubbleChart(config: WidgetConfig, container: HTMLElement): void {
    const bubbleData = config.data;
    const theme = this.getTheme(config.style?.theme);
    const fluentTokens = getFluentTokens(config.style?.theme === 'fluent-dark' ? 'dark' : 'light');

    const bubbleContainer = document.createElement('div');
    bubbleContainer.className = 'fluent-bubble-chart';
    bubbleContainer.style.cssText = `
      font-family: ${fluentTokens.fontFamilyBase.replace(/var\([^,]+,\s*([^)]+)\)/, '$1')};
    `;

    // Title
    if (bubbleData.title) {
      const title = document.createElement('h3');
      title.textContent = bubbleData.title;
      title.style.cssText = `
        margin: 0 0 ${fluentTokens.spacingVerticalM.replace(/var\([^,]+,\s*([^)]+)\)/, '$1')} 0;
        color: ${theme.text};
        font-size: ${fluentTokens.fontSizeBase400.replace(/var\([^,]+,\s*([^)]+)\)/, '$1')};
        font-weight: ${fluentTokens.fontWeightSemibold.replace(/var\([^,]+,\s*([^)]+)\)/, '$1')};
        text-align: center;
      `;
      bubbleContainer.appendChild(title);
    }

    const canvas = document.createElement('canvas');
    canvas.width = 400;
    canvas.height = 300;
    canvas.style.maxWidth = '100%';
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    this.drawBubbleChart(ctx, bubbleData, canvas.width, canvas.height, theme);
    
    bubbleContainer.appendChild(canvas);
    container.appendChild(bubbleContainer);
  }

  private drawBubbleChart(ctx: CanvasRenderingContext2D, data: any, width: number, height: number, theme: any): void {
    const padding = 60;
    const chartWidth = width - 2 * padding;
    const chartHeight = height - 2 * padding;

    // Handle both direct data array and ChartData format
    let bubblePoints: any[] = [];
    if (data.datasets && Array.isArray(data.datasets)) {
      // ChartData format
      data.datasets.forEach((dataset: any) => {
        if (Array.isArray(dataset.data)) {
          bubblePoints.push(...dataset.data.map((point: any) => ({
            ...point,
            color: dataset.backgroundColor || theme.primary
          })));
        }
      });
    } else if (Array.isArray(data.data)) {
      // Direct data array format
      bubblePoints = data.data;
    }

    if (bubblePoints.length === 0) return;

    // Find data ranges
    const xValues = bubblePoints.map(p => p.x).filter(x => x !== undefined);
    const yValues = bubblePoints.map(p => p.y).filter(y => y !== undefined);
    const sizeValues = bubblePoints.map(p => p.size || p.r || 10).filter(s => s !== undefined);

    const xMin = data.xAxis?.min ?? Math.min(...xValues);
    const xMax = data.xAxis?.max ?? Math.max(...xValues);
    const yMin = data.yAxis?.min ?? Math.min(...yValues);
    const yMax = data.yAxis?.max ?? Math.max(...yValues);
    const maxSize = Math.max(...sizeValues);

    // Draw axes
    ctx.strokeStyle = theme.border;
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(padding, padding);
    ctx.lineTo(padding, height - padding);
    ctx.lineTo(width - padding, height - padding);
    ctx.stroke();

    // Draw axis labels
    ctx.fillStyle = theme.text;
    ctx.font = '12px sans-serif';
    ctx.textAlign = 'center';
    
    // X-axis label
    if (data.xAxis?.label) {
      ctx.fillText(data.xAxis.label, width / 2, height - 15);
    }
    
    // Y-axis label
    ctx.save();
    ctx.translate(15, height / 2);
    ctx.rotate(-Math.PI / 2);
    if (data.yAxis?.label) {
      ctx.fillText(data.yAxis.label, 0, 0);
    }
    ctx.restore();

    // Draw bubbles
    ctx.globalAlpha = 0.7;
    
    bubblePoints.forEach((point: any) => {
      if (point.x !== undefined && point.y !== undefined) {
        const x = padding + ((point.x - xMin) / (xMax - xMin)) * chartWidth;
        const y = height - padding - ((point.y - yMin) / (yMax - yMin)) * chartHeight;
        const radius = ((point.size || point.r || 10) / maxSize) * 20 + 5;
        
        ctx.fillStyle = point.color || theme.primary;
        ctx.beginPath();
        ctx.arc(x, y, radius, 0, 2 * Math.PI);
        ctx.fill();
        
        // Draw label if provided
        if (point.label) {
          ctx.fillStyle = theme.text;
          ctx.font = '10px sans-serif';
          ctx.textAlign = 'center';
          ctx.fillText(point.label, x, y - radius - 5);
        }
      }
    });

    ctx.globalAlpha = 1;
  }

  private renderGauge(config: WidgetConfig, container: HTMLElement): void {
    const gaugeData = config.data;
    const theme = this.getTheme(config.style?.theme);
    const fluentTokens = getFluentTokens(config.style?.theme === 'fluent-dark' ? 'dark' : 'light');

    const gaugeContainer = document.createElement('div');
    gaugeContainer.className = 'fluent-gauge';
    gaugeContainer.style.cssText = `
      display: flex;
      flex-direction: column;
      align-items: center;
      font-family: ${fluentTokens.fontFamilyBase.replace(/var\([^,]+,\s*([^)]+)\)/, '$1')};
    `;

    // Title
    if (gaugeData.title) {
      const title = document.createElement('h3');
      title.textContent = gaugeData.title;
      title.style.cssText = `
        margin: 0 0 ${fluentTokens.spacingVerticalM.replace(/var\([^,]+,\s*([^)]+)\)/, '$1')} 0;
        color: ${theme.text};
        font-size: ${fluentTokens.fontSizeBase400.replace(/var\([^,]+,\s*([^)]+)\)/, '$1')};
        font-weight: ${fluentTokens.fontWeightSemibold.replace(/var\([^,]+,\s*([^)]+)\)/, '$1')};
        text-align: center;
      `;
      gaugeContainer.appendChild(title);
    }

    // SVG Gauge
    const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    svg.setAttribute('width', '200');
    svg.setAttribute('height', '120');
    svg.setAttribute('viewBox', '0 0 200 120');

    const centerX = 100;
    const centerY = 100;
    const radius = 80;
    const startAngle = Math.PI;
    const endAngle = 2 * Math.PI;
    const value = Math.min(Math.max(gaugeData.value || 0, 0), 100);
    const valueAngle = startAngle + (value / 100) * (endAngle - startAngle);

    // Background arc
    const backgroundPath = this.createArcPath(centerX, centerY, radius, startAngle, endAngle);
    const backgroundArc = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    backgroundArc.setAttribute('d', backgroundPath);
    backgroundArc.setAttribute('fill', 'none');
    backgroundArc.setAttribute('stroke', theme.surfaceBorder || theme.border);
    backgroundArc.setAttribute('stroke-width', '12');
    backgroundArc.setAttribute('stroke-linecap', 'round');

    // Value arc
    const valuePath = this.createArcPath(centerX, centerY, radius, startAngle, valueAngle);
    const valueArc = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    valueArc.setAttribute('d', valuePath);
    valueArc.setAttribute('fill', 'none');
    valueArc.setAttribute('stroke', gaugeData.color || theme.primary);
    valueArc.setAttribute('stroke-width', '12');
    valueArc.setAttribute('stroke-linecap', 'round');

    // Needle
    const needleX = centerX + Math.cos(valueAngle) * (radius - 10);
    const needleY = centerY + Math.sin(valueAngle) * (radius - 10);
    const needle = document.createElementNS('http://www.w3.org/2000/svg', 'line');
    needle.setAttribute('x1', centerX.toString());
    needle.setAttribute('y1', centerY.toString());
    needle.setAttribute('x2', needleX.toString());
    needle.setAttribute('y2', needleY.toString());
    needle.setAttribute('stroke', theme.text);
    needle.setAttribute('stroke-width', '3');
    needle.setAttribute('stroke-linecap', 'round');

    // Center dot
    const centerDot = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
    centerDot.setAttribute('cx', centerX.toString());
    centerDot.setAttribute('cy', centerY.toString());
    centerDot.setAttribute('r', '6');
    centerDot.setAttribute('fill', theme.text);

    svg.appendChild(backgroundArc);
    svg.appendChild(valueArc);
    svg.appendChild(needle);
    svg.appendChild(centerDot);

    // Value text
    const valueText = document.createElement('div');
    valueText.textContent = `${value}%`;
    valueText.style.cssText = `
      margin-top: ${fluentTokens.spacingVerticalM.replace(/var\([^,]+,\s*([^)]+)\)/, '$1')};
      font-size: ${fluentTokens.fontSizeBase600.replace(/var\([^,]+,\s*([^)]+)\)/, '$1')};
      font-weight: ${fluentTokens.fontWeightBold.replace(/var\([^,]+,\s*([^)]+)\)/, '$1')};
      color: ${theme.text};
      text-align: center;
    `;

    gaugeContainer.appendChild(svg);
    gaugeContainer.appendChild(valueText);
    container.appendChild(gaugeContainer);
  }

  private createArcPath(centerX: number, centerY: number, radius: number, startAngle: number, endAngle: number): string {
    const startX = centerX + Math.cos(startAngle) * radius;
    const startY = centerY + Math.sin(startAngle) * radius;
    const endX = centerX + Math.cos(endAngle) * radius;
    const endY = centerY + Math.sin(endAngle) * radius;
    const largeArcFlag = endAngle - startAngle <= Math.PI ? '0' : '1';

    return `M ${startX} ${startY} A ${radius} ${radius} 0 ${largeArcFlag} 1 ${endX} ${endY}`;
  }

  private renderHeatmap(config: WidgetConfig, container: HTMLElement): void {
    const heatmapData = config.data;
    const theme = this.getTheme(config.style?.theme);
    const fluentTokens = getFluentTokens(config.style?.theme === 'fluent-dark' ? 'dark' : 'light');

    const heatmapContainer = document.createElement('div');
    heatmapContainer.className = 'fluent-heatmap';
    heatmapContainer.style.cssText = `
      font-family: ${fluentTokens.fontFamilyBase.replace(/var\([^,]+,\s*([^)]+)\)/, '$1')};
    `;

    // Title
    if (heatmapData.title) {
      const title = document.createElement('h3');
      title.textContent = heatmapData.title;
      title.style.cssText = `
        margin: 0 0 ${fluentTokens.spacingVerticalM.replace(/var\([^,]+,\s*([^)]+)\)/, '$1')} 0;
        color: ${theme.text};
        font-size: ${fluentTokens.fontSizeBase400.replace(/var\([^,]+,\s*([^)]+)\)/, '$1')};
        font-weight: ${fluentTokens.fontWeightSemibold.replace(/var\([^,]+,\s*([^)]+)\)/, '$1')};
      `;
      heatmapContainer.appendChild(title);
    }

    // Heatmap grid
    const grid = document.createElement('div');
    
    // Handle 2D array data format
    let flatData: number[];
    let columns: number;
    let rows: number;
    
    if (Array.isArray(heatmapData.data) && Array.isArray(heatmapData.data[0])) {
      // 2D array format
      rows = heatmapData.data.length;
      columns = heatmapData.data[0].length;
      flatData = heatmapData.data.flat();
    } else if (Array.isArray(heatmapData.data)) {
      // 1D array format
      columns = heatmapData.columns || 7;
      rows = Math.ceil(heatmapData.data.length / columns);
      flatData = heatmapData.data;
    } else {
      // Generate default data
      columns = heatmapData.columns || 7;
      rows = heatmapData.rows || 13;
      flatData = this.generateHeatmapData(rows, columns);
    }
    
    grid.style.cssText = `
      display: grid;
      grid-template-columns: repeat(${columns}, 1fr);
      gap: 4px;
      max-width: ${columns * (heatmapData.cellSize || 30) + (columns - 1) * 4}px;
    `;

    // Find min/max values for normalization
    const minValue = Math.min(...flatData);
    const maxValue = Math.max(...flatData);
    const range = maxValue - minValue;
    
    flatData.forEach((value: number) => {
      const cell = document.createElement('div');
      const normalizedValue = range > 0 ? (value - minValue) / range : 0;
      
      // Use color scale if provided
      let backgroundColor = theme.primary;
      let opacity = normalizedValue * 0.8 + 0.1;
      
      if (heatmapData.colorScale) {
        const minColor = heatmapData.colorScale.min || '#e1f5fe';
        const maxColor = heatmapData.colorScale.max || '#0277bd';
        backgroundColor = this.interpolateColor(minColor, maxColor, normalizedValue);
        opacity = 1; // Use full opacity when using color scale
      }
      
      cell.style.cssText = `
        aspect-ratio: 1;
        width: ${heatmapData.cellSize || 30}px;
        height: ${heatmapData.cellSize || 30}px;
        border-radius: ${fluentTokens.borderRadiusSmall.replace(/var\([^,]+,\s*([^)]+)\)/, '$1')};
        background-color: ${backgroundColor};
        opacity: ${opacity};
        cursor: pointer;
        transition: all ${fluentTokens.durationFast.replace(/var\([^,]+,\s*([^)]+)\)/, '$1')} ${fluentTokens.curveEasyEase.replace(/var\([^,]+,\s*([^)]+)\)/, '$1')};
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 10px;
        color: ${normalizedValue > 0.5 ? '#ffffff' : theme.text};
        font-weight: ${fluentTokens.fontWeightMedium.replace(/var\([^,]+,\s*([^)]+)\)/, '$1')};
      `;

      // Show values if requested
      if (heatmapData.showValues) {
        cell.textContent = value.toString();
      }

      cell.title = `Value: ${value}`;
      
      cell.addEventListener('mouseenter', () => {
        cell.style.transform = 'scale(1.1)';
        cell.style.zIndex = '10';
      });
      
      cell.addEventListener('mouseleave', () => {
        cell.style.transform = 'scale(1)';
        cell.style.zIndex = '1';
      });

      grid.appendChild(cell);
    });

    heatmapContainer.appendChild(grid);
    container.appendChild(heatmapContainer);
  }

  private generateHeatmapData(rows: number, columns: number): number[] {
    const data: number[] = [];
    for (let i = 0; i < rows * columns; i++) {
      data.push(Math.random());
    }
    return data;
  }

  private interpolateColor(color1: string, color2: string, factor: number): string {
    // Convert hex colors to RGB
    const hex1 = color1.replace('#', '');
    const hex2 = color2.replace('#', '');
    
    const r1 = parseInt(hex1.substring(0, 2), 16);
    const g1 = parseInt(hex1.substring(2, 4), 16);
    const b1 = parseInt(hex1.substring(4, 6), 16);
    
    const r2 = parseInt(hex2.substring(0, 2), 16);
    const g2 = parseInt(hex2.substring(2, 4), 16);
    const b2 = parseInt(hex2.substring(4, 6), 16);
    
    // Interpolate
    const r = Math.round(r1 + (r2 - r1) * factor);
    const g = Math.round(g1 + (g2 - g1) * factor);
    const b = Math.round(b1 + (b2 - b1) * factor);
    
    // Convert back to hex
    return `#${r.toString(16).padStart(2, '0')}${g.toString(16).padStart(2, '0')}${b.toString(16).padStart(2, '0')}`;
  }

  private renderSlider(config: WidgetConfig, container: HTMLElement): void {
    const sliderData = config.data;
    const theme = this.getTheme(config.style?.theme);
    const fluentTokens = getFluentTokens(config.style?.theme === 'fluent-dark' ? 'dark' : 'light');

    const sliderContainer = document.createElement('div');
    sliderContainer.className = 'fluent-slider';
    sliderContainer.style.cssText = `
      font-family: ${fluentTokens.fontFamilyBase.replace(/var\([^,]+,\s*([^)]+)\)/, '$1')};
    `;

    // Label
    if (sliderData.label) {
      const labelContainer = document.createElement('div');
      labelContainer.style.cssText = `
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: ${fluentTokens.spacingVerticalM.replace(/var\([^,]+,\s*([^)]+)\)/, '$1')};
      `;

      const label = document.createElement('label');
      label.textContent = sliderData.label;
      label.style.cssText = `
        font-size: ${fluentTokens.fontSizeBase300.replace(/var\([^,]+,\s*([^)]+)\)/, '$1')};
        font-weight: ${fluentTokens.fontWeightMedium.replace(/var\([^,]+,\s*([^)]+)\)/, '$1')};
        color: ${theme.text};
      `;

      const valueDisplay = document.createElement('span');
      const formatValue = (val: number) => {
        const unit = sliderData.unit || '';
        return unit === '$' ? `$${val.toLocaleString()}` : `${val}${unit}`;
      };
      
      valueDisplay.textContent = formatValue(sliderData.value || sliderData.min || 0);
      valueDisplay.style.cssText = `
        font-size: ${fluentTokens.fontSizeBase300.replace(/var\([^,]+,\s*([^)]+)\)/, '$1')};
        font-weight: ${fluentTokens.fontWeightBold.replace(/var\([^,]+,\s*([^)]+)\)/, '$1')};
        color: ${theme.primary};
      `;

      labelContainer.appendChild(label);
      labelContainer.appendChild(valueDisplay);
      sliderContainer.appendChild(labelContainer);

      // Slider input
      const slider = document.createElement('input');
      slider.type = 'range';
      slider.min = (sliderData.min || 0).toString();
      slider.max = (sliderData.max || 100).toString();
      slider.step = (sliderData.step || 1).toString();
      slider.value = (sliderData.value || sliderData.min || 0).toString();
      
      slider.style.cssText = `
        width: 100%;
        height: 8px;
        border-radius: ${fluentTokens.borderRadiusCircular.replace(/var\([^,]+,\s*([^)]+)\)/, '$1')};
        background: ${theme.surfaceBorder || theme.border};
        outline: none;
        appearance: none;
        cursor: pointer;
      `;

      // Add custom slider thumb styling
      const style = document.createElement('style');
      style.textContent = `
        .fluent-slider input[type="range"]::-webkit-slider-thumb {
          appearance: none;
          width: 20px;
          height: 20px;
          border-radius: 50%;
          background: ${theme.primary};
          cursor: pointer;
          box-shadow: ${fluentTokens.shadow4.replace(/var\([^,]+,\s*([^)]+)\)/, '$1')};
        }
        
        .fluent-slider input[type="range"]::-moz-range-thumb {
          width: 20px;
          height: 20px;
          border-radius: 50%;
          background: ${theme.primary};
          cursor: pointer;
          border: none;
          box-shadow: ${fluentTokens.shadow4.replace(/var\([^,]+,\s*([^)]+)\)/, '$1')};
        }
      `;
      document.head.appendChild(style);

      slider.addEventListener('input', (event) => {
        const target = event.target as HTMLInputElement;
        const value = parseInt(target.value);
        valueDisplay.textContent = formatValue(value);
        if (sliderData.onChange) {
          sliderData.onChange(value);
        }
      });

      sliderContainer.appendChild(slider);

      // Show range if requested
      if (sliderData.showRange) {
        const rangeContainer = document.createElement('div');
        rangeContainer.style.cssText = `
          display: flex;
          justify-content: space-between;
          margin-top: ${fluentTokens.spacingVerticalXS.replace(/var\([^,]+,\s*([^)]+)\)/, '$1')};
          font-size: ${fluentTokens.fontSizeBase200.replace(/var\([^,]+,\s*([^)]+)\)/, '$1')};
          color: ${theme.text};
          opacity: 0.8;
        `;

        const minSpan = document.createElement('span');
        minSpan.textContent = formatValue(sliderData.min || 0);
        
        const maxSpan = document.createElement('span');
        maxSpan.textContent = formatValue(sliderData.max || 100);

        rangeContainer.appendChild(minSpan);
        rangeContainer.appendChild(maxSpan);
        sliderContainer.appendChild(rangeContainer);
      }
    }

    // Description
    if (sliderData.description) {
      const description = document.createElement('p');
      description.textContent = sliderData.description;
      description.style.cssText = `
        margin: ${fluentTokens.spacingVerticalM.replace(/var\([^,]+,\s*([^)]+)\)/, '$1')} 0 0 0;
        font-size: ${fluentTokens.fontSizeBase200.replace(/var\([^,]+,\s*([^)]+)\)/, '$1')};
        color: ${theme.text};
        opacity: 0.8;
        line-height: 1.4;
      `;
      sliderContainer.appendChild(description);
    }

    container.appendChild(sliderContainer);
  }

  // Helper method to parse JSON from HTML
  public static parseConfigFromHTML(elementId: string): WidgetConfig | null {
    const element = document.getElementById(elementId);
    if (!element) return null;

    try {
      const jsonData = element.getAttribute('data-json');
      return jsonData ? JSON.parse(jsonData) : null;
    } catch (error) {
      console.error(`Error parsing JSON config from element ${elementId}:`, error);
      return null;
    }
  }

  // Method to auto-initialize widgets from HTML
  public static autoInitialize(): void {
    const widgets = document.querySelectorAll('[data-config-ref]');
    const widgetXFormer = WidgetXFormer.getInstance();

    widgets.forEach((widget) => {
      const configRef = widget.getAttribute('data-config-ref');
      if (configRef) {
        const config = WidgetXFormer.parseConfigFromHTML(configRef);
        if (config && widget.id) {
          widgetXFormer.render(config, widget.id);
        }
      }
    });
  }
}

// Export for use
export default WidgetXFormer;
