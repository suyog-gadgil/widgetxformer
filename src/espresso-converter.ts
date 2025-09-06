/**
 * Utility to parse and convert espresso-sample.html widgets to WidgetXFormer format
 * This demonstrates how to migrate from the original format to the new library
 */

import WidgetXFormer from './widget-xformer';

class EspressoConverter {
  private widgetXFormer: WidgetXFormer;

  constructor() {
    this.widgetXFormer = WidgetXFormer.getInstance();
  }

  /**
   * Parse the original espresso-sample.html and convert all widgets
   */
  public async convertEspressoSample(): Promise<void> {
    try {
      // In a real implementation, you would fetch and parse the HTML
      // For this demo, we'll recreate the configurations from the sample
      
      const originalConfigs = this.extractOriginalConfigs();
      
      console.log('🔄 Converting Espresso Sample widgets...');
      console.log('📋 Found', Object.keys(originalConfigs).length, 'widgets to convert');
      
      // Convert each widget
      Object.entries(originalConfigs).forEach(([widgetId, config]) => {
        this.convertAndRender(widgetId, config);
      });
      
      console.log('✅ All widgets converted successfully!');
      
    } catch (error) {
      console.error('❌ Error converting widgets:', error);
    }
  }

  /**
   * Extract original configurations (simulated from the actual HTML)
   */
  private extractOriginalConfigs(): Record<string, any> {
    // These are the actual configurations from espresso-sample.html
    return {
      'safe-tabs-overview': {
        type: 'tabs',
        data: {
          items: [
            {
              id: 'overview',
              label: 'Overview',
              content: 'Coffee is one of the most traded commodities globally, with over 2 billion cups consumed daily.'
            },
            {
              id: 'production',
              label: 'Production',
              content: 'The top coffee-producing countries include Brazil, Vietnam, Colombia, and Indonesia.'
            },
            {
              id: 'consumption',
              label: 'Consumption',
              content: 'Nordic countries lead in per-capita coffee consumption, with Finland consuming over 12kg per person annually.'
            }
          ]
        },
        style: {
          theme: 'default',
          density: 'comfortable'
        }
      },

      'safe-chart-types': {
        type: 'doughnut',
        data: {
          labels: ['Arabica', 'Robusta', 'Liberica', 'Excelsa'],
          datasets: [{
            label: 'Coffee Bean Types',
            data: [75, 24, 0.8, 0.2],
            backgroundColor: ['#8B4513', '#D2691E', '#CD853F', '#DEB887']
          }]
        },
        style: {
          theme: 'default',
          palette: 'neutral'
        }
      },

      'safe-chart-regions': {
        type: 'bar',
        data: {
          labels: ['South America', 'Asia', 'Africa', 'Central America', 'Oceania'],
          datasets: [{
            label: 'Annual Production (Million bags)',
            data: [45.2, 32.8, 18.5, 15.3, 1.2],
            backgroundColor: ['#0078d4', '#106ebe', '#005a9e', '#004578', '#003966']
          }]
        },
        style: {
          theme: 'brand',
          density: 'compact'
        }
      },

      'safe-accordion-producers': {
        type: 'accordion',
        data: {
          items: [
            {
              id: 'brazil',
              title: 'Brazil - 37% of Global Production',
              content: 'Brazil produces approximately 2.6 million metric tons of coffee annually, primarily Arabica beans.',
              expanded: true
            },
            {
              id: 'vietnam',
              title: 'Vietnam - 16% of Global Production',
              content: 'Vietnam is the largest producer of Robusta beans, contributing significantly to instant coffee production.',
              expanded: false
            },
            {
              id: 'colombia',
              title: 'Colombia - 8% of Global Production',
              content: 'Colombian coffee is renowned for its quality, with strict geographic and quality certifications.',
              expanded: false
            }
          ]
        }
      }
    };
  }

  /**
   * Convert and render a single widget
   */
  private convertAndRender(widgetId: string, config: any): void {
    try {
      // Create container if it doesn't exist
      let container = document.getElementById(widgetId);
      if (!container) {
        container = this.createWidgetContainer(widgetId, config);
      }

      // Render the widget
      this.widgetXFormer.render(config, widgetId);
      
      console.log(`✅ Converted ${config.type} widget: ${widgetId}`);
      
    } catch (error) {
      console.error(`❌ Failed to convert widget ${widgetId}:`, error);
    }
  }

  /**
   * Create a container for the widget
   */
  private createWidgetContainer(widgetId: string, config: any): HTMLElement {
    const container = document.createElement('div');
    container.id = widgetId;
    container.className = 'converted-widget';
    
    // Add a title
    const title = document.createElement('h3');
    title.textContent = this.getWidgetTitle(widgetId, config);
    title.style.cssText = `
      margin: 0 0 1rem 0;
      color: #323130;
      font-size: 1.25rem;
      font-weight: 600;
    `;
    
    const wrapper = document.createElement('div');
    wrapper.className = 'widget-wrapper';
    wrapper.style.cssText = `
      background: white;
      border-radius: 8px;
      padding: 1.5rem;
      margin-bottom: 2rem;
      box-shadow: 0 2px 8px rgba(0,0,0,0.1);
    `;
    
    wrapper.appendChild(title);
    wrapper.appendChild(container);
    
    // Append to body or a main container
    const targetContainer = document.getElementById('converted-widgets') || document.body;
    targetContainer.appendChild(wrapper);
    
    return container;
  }

  /**
   * Generate a user-friendly title for the widget
   */
  private getWidgetTitle(widgetId: string, config: any): string {
    const titleMap: Record<string, string> = {
      'safe-tabs-overview': 'Coffee Overview Tabs',
      'safe-chart-types': 'Coffee Bean Types Distribution',
      'safe-chart-regions': 'Production by Region',
      'safe-accordion-producers': 'Top Coffee Producers'
    };
    
    return titleMap[widgetId] || `${config.type.toUpperCase()} Widget`;
  }

  /**
   * Demonstrate the conversion process
   */
  public static async demonstrateConversion(): Promise<void> {
    console.log('🚀 Starting Espresso Sample Conversion Demo...');
    console.log('📄 Original format: HTML with JSON islands');
    console.log('🎯 Target format: WidgetXFormer library + JSON configs');
    console.log('');
    
    // Create a demo container
    const demoContainer = document.createElement('div');
    demoContainer.id = 'converted-widgets';
    demoContainer.innerHTML = `
      <div style="text-align: center; margin: 2rem 0; padding: 2rem; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; border-radius: 12px;">
        <h2>Converted Espresso Sample Widgets</h2>
        <p>Original widgets from espresso-sample.html converted to WidgetXFormer format</p>
      </div>
    `;
    
    document.body.appendChild(demoContainer);
    
    // Perform conversion
    const converter = new EspressoConverter();
    await converter.convertEspressoSample();
    
    console.log('');
    console.log('✨ Conversion complete! Benefits:');
    console.log('  • Reduced JavaScript complexity');
    console.log('  • Consistent widget behavior');
    console.log('  • Easy theme switching');
    console.log('  • JSON-driven configuration');
    console.log('  • Type safety with TypeScript');
  }

  /**
   * Show code comparison between old and new approaches
   */
  public static showCodeComparison(): void {
    console.log('\n📊 CODE COMPARISON:');
    console.log('\n🔴 BEFORE (Original espresso-sample.html):');
    console.log(`
<!-- Complex HTML structure -->
<section id="safe-tabs-overview" class="safe-tabs" data-config-ref="tabs-config">
    <h2>Coffee Overview</h2>
</section>

<!-- Separate JSON configuration -->
<script type="application/json" id="tabs-config" data-json='{ ... }'>
</script>

<!-- Custom JavaScript needed for each widget type -->
<script>
    // Custom tab implementation
    // Custom chart implementation  
    // Custom accordion implementation
</script>
    `);

    console.log('\n🟢 AFTER (WidgetXFormer):');
    console.log(`
// Single library import
import WidgetXFormer from './widget-xformer';
const widget = WidgetXFormer.getInstance();

// Simple configuration
const config = {
    type: 'tabs',
    data: { items: [...] },
    style: { theme: 'default' }
};

// One line to render
widget.render(config, 'container-id');
    `);
  }
}

// Export for use
export default EspressoConverter;
