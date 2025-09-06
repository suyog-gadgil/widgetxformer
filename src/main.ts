import './style.css'
import WidgetXFormer from './widget-xformer'

// Initialize WidgetXFormer
const widgetXFormer = WidgetXFormer.getInstance();

// Demo widget configurations
const widgetConfigs = {
  welcome: {
    type: 'card',
    data: {
      title: 'Welcome to WidgetXFormer!',
      content: 'Transform your JSON data into beautiful, interactive widgets with ease. This library supports charts, tabs, accordions, tables, and more!'
    },
    style: { theme: 'default' }
  },

  sampleChart: {
    type: 'doughnut',
    data: {
      labels: ['TypeScript', 'JavaScript', 'CSS', 'HTML'],
      datasets: [{
        label: 'Technology Stack',
        data: [40, 30, 20, 10],
        backgroundColor: ['#3178c6', '#f7df1e', '#1572b6', '#e34f26']
      }]
    },
    style: { theme: 'default' }
  },

  features: {
    type: 'accordion',
    data: {
      items: [
        {
          id: 'charts',
          title: '📊 Charts & Graphs',
          content: 'Support for doughnut, bar, and line charts with customizable themes and colors.',
          expanded: true
        },
        {
          id: 'interactive',
          title: '🎯 Interactive Components',
          content: 'Tabs, accordions, and interactive elements that respond to user input.',
          expanded: false
        },
        {
          id: 'timeline',
          title: '⏰ Timeline Widget',
          content: 'Advanced timeline visualization with vertical/horizontal layouts, grouping, progress tracking, and animations.',
          expanded: false
        },
        {
          id: 'themes',
          title: '🎨 Multiple Themes',
          content: 'Built-in themes including default, brand, and dark mode support.',
          expanded: false
        },
        {
          id: 'data',
          title: '📋 Data Display',
          content: 'Tables, cards, metrics, and other data visualization components.',
          expanded: false
        }
      ]
    },
    style: { theme: 'default' }
  },

  sampleTimeline: {
    type: 'timeline',
    data: {
      events: [
        {
          id: '1',
          date: '2024-01-15',
          title: 'Project Started',
          description: 'Initial project setup and planning',
          status: 'completed',
          category: 'Development'
        },
        {
          id: '2',
          date: '2024-02-20',
          title: 'MVP Release',
          description: 'Released minimum viable product',
          status: 'completed',
          category: 'Release'
        },
        {
          id: '3',
          date: '2024-03-15',
          title: 'Fluent UI Integration',
          description: 'Added Microsoft Fluent Design System',
          status: 'current',
          category: 'Enhancement'
        }
      ],
      config: {
        orientation: 'vertical',
        showProgress: true,
        animate: true
      }
    },
    style: { theme: 'light', fluentDesign: true }
  },

  // New Fluent UI widgets
  fluentCard: {
    type: 'fluent-card',
    data: {
      title: 'Enhanced Fluent Card',
      content: 'This card uses Microsoft Fluent Design System with proper typography, spacing, and elevation.',
      interactive: true,
      actions: [
        { text: 'Primary Action', appearance: 'primary', onClick: () => alert('Primary clicked!') },
        { text: 'Secondary', appearance: 'secondary' }
      ]
    },
    style: { theme: 'light', fluentDesign: true }
  },

  fluentProgress: {
    type: 'fluent-progressbar',
    data: {
      label: 'Download Progress',
      value: 65,
      description: '65% complete - 2.3 MB of 3.5 MB'
    },
    style: { theme: 'light', fluentDesign: true }
  }
};

// Create the application layout
class WidgetXFormerApp {
  private container: HTMLElement;
  private currentTheme: string = 'default';

  constructor(container: HTMLElement) {
    this.container = container;
    this.render();
  }

  private render(): void {
    this.container.innerHTML = `
      <div class="app-container">
        <header class="app-header">
          <h1>WidgetXFormer</h1>
          <p>Transform JSON data into beautiful widgets</p>
          <div class="header-buttons">
            <button id="theme-toggle">Toggle Theme</button>
            <button id="view-demo">View Full Demo</button>
          </div>
        </header>

        <main class="app-main">
          <div class="widget-grid">
            <div class="widget-item">
              <div id="welcome-widget"></div>
            </div>
            
            <div class="widget-item">
              <h3>Technology Stack</h3>
              <div id="chart-widget"></div>
            </div>
            
            <div class="widget-item full-width">
              <h3>Features Overview</h3>
              <div id="features-widget"></div>
            </div>

            <div class="widget-item full-width">
              <h3>Development Timeline</h3>
              <div id="timeline-widget"></div>
            </div>

            <div class="widget-item">
              <h3>🎨 Fluent Design Card</h3>
              <div id="fluent-card-widget"></div>
            </div>

            <div class="widget-item">
              <h3>📊 Fluent Progress Bar</h3>
              <div id="fluent-progress-widget"></div>
            </div>
          </div>
        </main>

        <footer class="app-footer">
          <p>Built with TypeScript, Vite, and ❤️</p>
          <p>Check out the <a href="./demo.html" target="_blank">full demo</a> to see all widget types!</p>
        </footer>
      </div>
    `;

    this.setupEventListeners();
    this.renderWidgets();
  }

  private setupEventListeners(): void {
    const themeToggle = this.container.querySelector('#theme-toggle') as HTMLButtonElement;
    const viewDemo = this.container.querySelector('#view-demo') as HTMLButtonElement;

    if (themeToggle) {
      themeToggle.addEventListener('click', () => {
        this.toggleTheme();
      });
    }

    if (viewDemo) {
      viewDemo.addEventListener('click', () => {
        window.open('./demo.html', '_blank');
      });
    }
  }

  private renderWidgets(): void {
    // Update theme for all widgets (except Fluent ones which have their own theme)
    Object.values(widgetConfigs).forEach(config => {
      if (!config.style || !(config.style as any).fluentDesign) {
        config.style = { ...config.style, theme: this.currentTheme };
      }
    });

    // Render widgets
    widgetXFormer.render(widgetConfigs.welcome, 'welcome-widget');
    widgetXFormer.render(widgetConfigs.sampleChart, 'chart-widget');
    widgetXFormer.render(widgetConfigs.features, 'features-widget');
    widgetXFormer.render(widgetConfigs.sampleTimeline, 'timeline-widget');
    
    // Render new Fluent UI widgets
    widgetXFormer.render(widgetConfigs.fluentCard, 'fluent-card-widget');
    widgetXFormer.render(widgetConfigs.fluentProgress, 'fluent-progress-widget');
  }

  private toggleTheme(): void {
    this.currentTheme = this.currentTheme === 'default' ? 'dark' : 'default';
    
    // Update body theme
    document.body.className = this.currentTheme === 'dark' ? 'dark-theme' : '';
    
    // Re-render widgets with new theme
    this.renderWidgets();
  }
}

// Initialize the application
const app = document.querySelector<HTMLDivElement>('#app')!;
new WidgetXFormerApp(app);
