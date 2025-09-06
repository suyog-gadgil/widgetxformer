/**
 * WidgetXFormer - A JavaScript library for rendering interactive widgets from JSON data
 * Supports: Tabs, Charts (Doughnut, Bar, Line), Accordions, Cards, Maps, and more
 * Enhanced with Microsoft Fluent UI Design System
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
  data: number[];
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

    const tabsContainer = document.createElement('div');
    tabsContainer.className = 'widget-tabs';

    // Create tab headers
    const tabHeaders = document.createElement('div');
    tabHeaders.className = 'tab-headers';
    tabHeaders.style.cssText = `
      display: flex;
      border-bottom: 2px solid ${theme.border};
      margin-bottom: 1rem;
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
        padding: 0.75rem 1.5rem;
        border: none;
        background: ${index === 0 ? theme.primary : 'transparent'};
        color: ${index === 0 ? '#ffffff' : theme.text};
        cursor: pointer;
        border-radius: 4px 4px 0 0;
        font-weight: 500;
        transition: all 0.3s ease;
      `;

      // Create tab content panel
      const tabPanel = document.createElement('div');
      tabPanel.className = 'tab-panel';
      tabPanel.style.cssText = `
        display: ${index === 0 ? 'block' : 'none'};
        padding: 1rem 0;
        line-height: 1.6;
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

    const total = data.datasets[0].data.reduce((sum, value) => sum + value, 0);
    let currentAngle = -Math.PI / 2;

    data.datasets[0].data.forEach((value, index) => {
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
    const maxValue = Math.max(...data.datasets[0].data);
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
    data.datasets[0].data.forEach((value, index) => {
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
    const maxValue = Math.max(...data.datasets[0].data);
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

    data.datasets[0].data.forEach((value, index) => {
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

    const accordionContainer = document.createElement('div');
    accordionContainer.className = 'widget-accordion';

    accordionData.items.forEach((item) => {
      const itemContainer = document.createElement('div');
      itemContainer.className = 'accordion-item';
      itemContainer.style.cssText = `
        border: 1px solid ${theme.border};
        border-radius: 4px;
        margin-bottom: 0.5rem;
        overflow: hidden;
      `;

      // Create header
      const header = document.createElement('button');
      header.className = 'accordion-header';
      header.textContent = item.title;
      header.style.cssText = `
        width: 100%;
        padding: 1rem;
        background: ${theme.background};
        border: none;
        text-align: left;
        cursor: pointer;
        font-weight: 500;
        color: ${theme.text};
        transition: background-color 0.3s ease;
      `;

      // Create content panel
      const content = document.createElement('div');
      content.className = 'accordion-content';
      content.style.cssText = `
        padding: ${item.expanded ? '1rem' : '0'};
        max-height: ${item.expanded ? 'none' : '0'};
        overflow: hidden;
        background: ${theme.background};
        transition: all 0.3s ease;
        border-top: ${item.expanded ? `1px solid ${theme.border}` : 'none'};
      `;
      content.textContent = item.content;

      // Add click handler
      header.addEventListener('click', () => {
        const isExpanded = content.style.maxHeight !== '0' && content.style.maxHeight !== '0px' && content.style.maxHeight !== '';
        
        if (isExpanded) {
          content.style.maxHeight = '0';
          content.style.padding = '0 1rem';
          content.style.borderTop = 'none';
        } else {
          content.style.maxHeight = content.scrollHeight + 'px';
          content.style.padding = '1rem';
          content.style.borderTop = `1px solid ${theme.border}`;
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

    const card = document.createElement('div');
    card.className = 'widget-card';
    card.style.cssText = `
      background: ${theme.background};
      border: 1px solid ${theme.border};
      border-radius: 8px;
      padding: 1.5rem;
      box-shadow: 0 2px 8px rgba(0,0,0,0.1);
    `;

    if (cardData.title) {
      const title = document.createElement('h3');
      title.textContent = cardData.title;
      title.style.cssText = `
        margin: 0 0 1rem 0;
        color: ${theme.text};
        font-size: 1.25rem;
      `;
      card.appendChild(title);
    }

    if (cardData.content) {
      const content = document.createElement('p');
      content.textContent = cardData.content;
      content.style.cssText = `
        margin: 0;
        line-height: 1.6;
        color: ${theme.text};
      `;
      card.appendChild(content);
    }

    container.appendChild(card);
  }

  private renderMetric(config: WidgetConfig, container: HTMLElement): void {
    const metricData = config.data;
    const theme = this.getTheme(config.style?.theme);

    const metric = document.createElement('div');
    metric.className = 'widget-metric';
    metric.style.cssText = `
      text-align: center;
      padding: 2rem;
    `;

    const value = document.createElement('div');
    value.textContent = metricData.value;
    value.style.cssText = `
      font-size: 3rem;
      font-weight: bold;
      color: ${theme.primary};
      margin-bottom: 0.5rem;
    `;

    const label = document.createElement('div');
    label.textContent = metricData.label;
    label.style.cssText = `
      font-size: 1rem;
      color: ${theme.text};
      opacity: 0.8;
    `;

    metric.appendChild(value);
    metric.appendChild(label);
    container.appendChild(metric);
  }

  private renderTable(config: WidgetConfig, container: HTMLElement): void {
    const tableData = config.data;
    const theme = this.getTheme(config.style?.theme);

    const table = document.createElement('table');
    table.style.cssText = `
      width: 100%;
      border-collapse: collapse;
      margin: 1rem 0;
    `;

    // Create header
    if (tableData.headers) {
      const thead = document.createElement('thead');
      const headerRow = document.createElement('tr');
      
      tableData.headers.forEach((header: string) => {
        const th = document.createElement('th');
        th.textContent = header;
        th.style.cssText = `
          padding: 0.75rem;
          text-align: left;
          background: ${theme.primary};
          color: white;
          font-weight: 500;
        `;
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
        tr.style.backgroundColor = index % 2 === 0 ? theme.background : '#f8f9fa';
        
        row.forEach((cell: string) => {
          const td = document.createElement('td');
          td.textContent = cell;
          td.style.cssText = `
            padding: 0.75rem;
            border-bottom: 1px solid ${theme.border};
          `;
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

    // Create a simple SVG world map representation
    const svgContainer = document.createElement('div');
    svgContainer.innerHTML = `
      <svg width="100%" height="300" viewBox="0 0 800 400" style="background: #f0f8ff;">
        <text x="400" y="200" text-anchor="middle" fill="${theme.text}" font-size="16">
          World Map Visualization
        </text>
        <text x="400" y="220" text-anchor="middle" fill="${theme.text}" font-size="12" opacity="0.7">
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
    timelineContainer.className = 'widget-timeline';
    timelineContainer.style.cssText = `
      position: relative;
      ${settings.orientation === 'horizontal' ? 'overflow-x: auto; padding: 2rem 0;' : 'padding: 1rem 0;'}
      ${settings.animate ? 'animation: fadeIn 0.6s ease-in;' : ''}
    `;

    if (settings.orientation === 'vertical') {
      this.renderVerticalTimeline(timelineContainer, groupedEvents, settings, theme);
    } else {
      this.renderHorizontalTimeline(timelineContainer, groupedEvents, settings, theme);
    }

    // Add progress indicator if enabled
    if (settings.showProgress) {
      this.addTimelineProgress(timelineContainer, events, theme);
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

  private renderVerticalTimeline(container: HTMLElement, groupedEvents: Array<{group: string, events: TimelineEvent[]}>, settings: any, theme: any): void {
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
          margin: 2rem 0 1rem 0;
          padding: 0.5rem 1rem;
          background: ${theme.primary};
          color: white;
          border-radius: 20px;
          font-weight: 600;
          text-align: center;
          ${settings.layout === 'center' ? 'max-width: 200px; margin-left: auto; margin-right: auto;' : ''}
        `;
        groupHeader.textContent = group;
        timelineTrack.appendChild(groupHeader);
      }

      events.forEach((event) => {
        const eventElement = this.createTimelineEvent(event, eventIndex, settings, theme, 'vertical');
        timelineTrack.appendChild(eventElement);
        eventIndex++;
      });
    });

    container.appendChild(timelineTrack);
  }

  private renderHorizontalTimeline(container: HTMLElement, groupedEvents: Array<{group: string, events: TimelineEvent[]}>, settings: any, theme: any): void {
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
        const eventElement = this.createTimelineEvent(event, eventIndex, settings, theme, 'horizontal');
        timelineTrack.appendChild(eventElement);
        eventIndex++;
      });
    });

    container.appendChild(timelineTrack);
  }

  private createTimelineEvent(event: TimelineEvent, index: number, settings: any, theme: any, orientation: string): HTMLElement {
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
      background: white;
      padding: ${settings.compactMode ? '0.75rem' : '1rem'};
      border-radius: 8px;
      box-shadow: 0 2px 8px rgba(0,0,0,0.1);
      border-left: 4px solid ${this.getStatusColor(event.status, theme)};
    `;

    // Event date
    if (settings.showDates) {
      const dateElement = document.createElement('div');
      dateElement.className = 'timeline-date';
      dateElement.style.cssText = `
        font-size: ${settings.compactMode ? '0.75rem' : '0.85rem'};
        color: ${theme.primary};
        font-weight: 600;
        margin-bottom: 0.5rem;
      `;
      dateElement.textContent = this.formatDate(event.date, settings.dateFormat);
      content.appendChild(dateElement);
    }

    // Event title
    const title = document.createElement('h4');
    title.style.cssText = `
      margin: 0 0 0.5rem 0;
      color: ${theme.text};
      font-size: ${settings.compactMode ? '1rem' : '1.1rem'};
      font-weight: 600;
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
        font-size: ${settings.compactMode ? '0.85rem' : '0.9rem'};
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
        padding: 0.25rem 0.5rem;
        background: ${theme.primary}20;
        color: ${theme.primary};
        font-size: 0.75rem;
        border-radius: 12px;
        margin-top: 0.5rem;
        font-weight: 500;
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

  private addTimelineProgress(container: HTMLElement, events: TimelineEvent[], theme: any): void {
    const completedEvents = events.filter(e => e.status === 'completed').length;
    const totalEvents = events.length;
    const progressPercent = (completedEvents / totalEvents) * 100;

    const progressContainer = document.createElement('div');
    progressContainer.style.cssText = `
      margin-bottom: 1rem;
      padding: 1rem;
      background: white;
      border-radius: 8px;
      box-shadow: 0 2px 8px rgba(0,0,0,0.1);
    `;

    const progressLabel = document.createElement('div');
    progressLabel.style.cssText = `
      display: flex;
      justify-content: space-between;
      margin-bottom: 0.5rem;
      font-weight: 600;
      color: ${theme.text};
    `;
    progressLabel.innerHTML = `
      <span>Progress</span>
      <span>${completedEvents}/${totalEvents} (${Math.round(progressPercent)}%)</span>
    `;

    const progressBar = document.createElement('div');
    progressBar.style.cssText = `
      width: 100%;
      height: 8px;
      background: #e0e0e0;
      border-radius: 4px;
      overflow: hidden;
    `;

    const progressFill = document.createElement('div');
    progressFill.style.cssText = `
      height: 100%;
      background: linear-gradient(to right, ${theme.primary}, ${theme.secondary});
      width: ${progressPercent}%;
      transition: width 1s ease-out;
      border-radius: 4px;
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
