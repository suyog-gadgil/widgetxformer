/**
 * WidgetXFormer - A JavaScript library for rendering interactive widgets from JSON data
 * Supports: Tabs, Charts (Doughnut, Bar, Line), Accordions, Cards, Maps, and more
 */

interface WidgetConfig {
  type: string;
  data: any;
  style?: {
    theme?: string;
    palette?: string;
    density?: string;
  };
}

interface TabItem {
  id: string;
  label: string;
  content: string;
}

interface ChartDataset {
  label: string;
  data: number[];
  backgroundColor?: string | string[];
  borderColor?: string | string[];
  borderWidth?: number;
}

interface ChartData {
  labels: string[];
  datasets: ChartDataset[];
}

interface AccordionItem {
  id: string;
  title: string;
  content: string;
  expanded?: boolean;
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
    container.style.borderRadius = '8px';
    container.style.padding = '1rem';
    container.style.boxShadow = '0 2px 8px rgba(0,0,0,0.1)';
  }

  private renderTabs(config: WidgetConfig, container: HTMLElement): void {
    const tabsData = config.data as { items: TabItem[] };
    const theme = this.themes.get(config.style?.theme || 'default');

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
    const theme = this.themes.get(config.style?.theme || 'default');

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
    const theme = this.themes.get(config.style?.theme || 'default');

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
        const isExpanded = content.style.maxHeight !== '0px' && content.style.maxHeight !== '';
        
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
    const theme = this.themes.get(config.style?.theme || 'default');

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
    const theme = this.themes.get(config.style?.theme || 'default');

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
    const theme = this.themes.get(config.style?.theme || 'default');

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
    const theme = this.themes.get(config.style?.theme || 'default');

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
