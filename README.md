# 🎯 WidgetXFormer

<div align="center">

**Transform JSON data into beautiful, interactive widgets**

[![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vitejs.dev/)
[![MIT License](https://img.shields.io/badge/License-MIT-green.svg?style=for-the-badge)](https://choosealicense.com/licenses/mit/)

*Replace arbitrary JavaScript with specific library code + JSON configurations*

[📖 Documentation](#-documentation) • [🚀 Quick Start](#-quick-start) • [🎮 Live Demo](#-live-demo) • [📊 Examples](#-examples)

</div>

---

## ✨ Features

- 🎨 **9 Widget Types**: Charts, Tabs, Accordions, Tables, Cards, Metrics, Maps
- � **Built-in Themes**: Default, Brand, and Dark mode with instant switching
- ⚡ **TypeScript First**: Fully typed interfaces for better DX
- 📱 **Responsive Design**: Mobile-friendly out of the box
- 🔧 **Zero Dependencies**: Pure TypeScript/JavaScript implementation
- � **Canvas Charts**: Custom chart rendering with smooth animations
- 🎯 **JSON-Driven**: Replace complex JavaScript with simple configurations
- 🔄 **Auto-Initialize**: Parse widgets directly from HTML

## 🚀 Quick Start

### Installation

```bash
# Clone and install
git clone <repository-url>
cd widgetxformer
npm install
npm run dev
```

### Basic Usage

```typescript
import WidgetXFormer from './src/widget-xformer';

const widget = WidgetXFormer.getInstance();

// Render a chart with one line
widget.render({
  type: 'doughnut',
  data: {
    labels: ['Coffee', 'Tea', 'Water'],
    datasets: [{
      data: [40, 30, 30],
      backgroundColor: ['#8B4513', '#228B22', '#4169E1']
    }]
  },
  style: { theme: 'default' }
}, 'my-container');
```

## 🎮 Live Demo

| Demo | Description | URL |
|------|-------------|-----|
| 🏠 **Main App** | Library showcase | `http://localhost:5173/` |
| 🎯 **Full Demo** | All widgets interactive | `http://localhost:5173/demo.html` |
| 🔄 **Conversion** | Before/after comparison | `http://localhost:5173/conversion-demo.html` |
| 📄 **Original** | Espresso sample | `http://localhost:5173/examples/espresso-sample.html` |

## 📊 Supported Widgets

### 📈 Charts
```typescript
// Doughnut Chart
{ type: 'doughnut', data: { labels: [...], datasets: [...] } }

// Bar Chart  
{ type: 'bar', data: { labels: [...], datasets: [...] } }

// Line Chart
{ type: 'line', data: { labels: [...], datasets: [...] } }
```

### 🗂️ Interactive Components
```typescript
// Tabs
{ type: 'tabs', data: { items: [{ id, label, content }] } }

// Accordion
{ type: 'accordion', data: { items: [{ id, title, content, expanded }] } }
```

### 📋 Data Display
```typescript
// Table
{ type: 'table', data: { headers: [...], rows: [[...]] } }

// Card
{ type: 'card', data: { title: '...', content: '...' } }

// Metric
{ type: 'metric', data: { value: '42K', label: 'Users' } }

// World Map (placeholder)
{ type: 'worldmap', data: { regions: [...] } }
```

## 🎨 Theming System

Switch themes instantly across all widgets:

```typescript
// Light theme (default)
widget.render({...config, style: { theme: 'default' }}, 'container');

// Brand theme (coffee colors)
widget.render({...config, style: { theme: 'brand' }}, 'container');

// Dark theme
widget.render({...config, style: { theme: 'dark' }}, 'container');
```

### Available Themes

| Theme | Primary | Secondary | Use Case |
|-------|---------|-----------|----------|
| `default` | ![#0078d4](https://via.placeholder.com/15/0078d4/000000?text=+) `#0078d4` | ![#106ebe](https://via.placeholder.com/15/106ebe/000000?text=+) `#106ebe` | Professional dashboards |
| `brand` | ![#8B4513](https://via.placeholder.com/15/8B4513/000000?text=+) `#8B4513` | ![#D2691E](https://via.placeholder.com/15/D2691E/000000?text=+) `#D2691E` | Coffee/warm themes |
| `dark` | ![#0078d4](https://via.placeholder.com/15/0078d4/000000?text=+) `#0078d4` | ![#106ebe](https://via.placeholder.com/15/106ebe/000000?text=+) `#106ebe` | Dark mode UIs |

## 📖 Documentation

### Core API

#### `WidgetXFormer.getInstance(): WidgetXFormer`
Get the singleton instance.

#### `render(config: WidgetConfig, containerId: string): void`
Render any widget type to a container.

#### `parseConfigFromHTML(elementId: string): WidgetConfig | null`
Parse configuration from HTML JSON islands.

#### `autoInitialize(): void`
Auto-render all widgets with `data-config-ref` attributes.

### Configuration Interface

```typescript
interface WidgetConfig {
  type: string;           // Widget type identifier
  data: any;             // Widget-specific data
  style?: {              // Optional styling
    theme?: string;      // 'default' | 'brand' | 'dark'
    palette?: string;    // Color palette override
    density?: string;    // 'compact' | 'comfortable'
  };
}
```

## 📊 Examples

### 🍩 Interactive Doughnut Chart

```typescript
const coffeeChart = {
  type: 'doughnut',
  data: {
    labels: ['Arabica', 'Robusta', 'Liberica', 'Excelsa'],
    datasets: [{
      label: 'Coffee Bean Types',
      data: [75, 24, 0.8, 0.2],
      backgroundColor: ['#8B4513', '#D2691E', '#CD853F', '#DEB887']
    }]
  },
  style: { theme: 'brand' }
};

widget.render(coffeeChart, 'coffee-chart');
```

### 📋 Interactive Tabs

```typescript
const productTabs = {
  type: 'tabs',
  data: {
    items: [
      {
        id: 'overview',
        label: 'Overview',
        content: 'Product overview and key features...'
      },
      {
        id: 'specs',
        label: 'Specifications', 
        content: 'Technical specifications and requirements...'
      },
      {
        id: 'reviews',
        label: 'Reviews',
        content: 'Customer reviews and ratings...'
      }
    ]
  },
  style: { theme: 'default' }
};

widget.render(productTabs, 'product-tabs');
```

### 📊 Responsive Data Table

```typescript
const salesTable = {
  type: 'table',
  data: {
    headers: ['Product', 'Revenue', 'Growth', 'Status'],
    rows: [
      ['Coffee Beans', '$45,230', '+12%', 'Growing'],
      ['Brewing Equipment', '$32,100', '+8%', 'Stable'],
      ['Accessories', '$18,950', '+15%', 'Growing']
    ]
  },
  style: { theme: 'default' }
};

widget.render(salesTable, 'sales-table');
```

### 🎛️ KPI Metrics

```typescript
const metrics = [
  {
    type: 'metric',
    data: { value: '2.4M', label: 'Daily Users' },
    style: { theme: 'default' }
  },
  {
    type: 'metric', 
    data: { value: '$24.5K', label: 'Monthly Revenue' },
    style: { theme: 'default' }
  }
];

metrics.forEach((config, i) => {
  widget.render(config, `metric-${i + 1}`);
});
```

## � Migration from Legacy Code

### Before: Complex JavaScript Implementation

```html
<!-- Old approach: scattered configuration -->
<section id="chart-container" data-config-ref="chart-config">
  <h2>Sales Chart</h2>
</section>

<script type="application/json" id="chart-config">
{
  "type": "doughnut",
  "data": {"labels": [...], "datasets": [...]}
}
</script>

<script>
// Custom implementation for each widget type
function initializeChart() {
  // 50+ lines of custom chart code
}
function setupInteractions() {
  // 30+ lines of event handling
}
// Repeat for each widget type...
</script>
```

### After: WidgetXFormer Simplicity

```typescript
// New approach: clean and consistent
import WidgetXFormer from './widget-xformer';

const config = {
  type: 'doughnut',
  data: { labels: [...], datasets: [...] },
  style: { theme: 'default' }
};

// One line replaces 100+ lines of custom code
WidgetXFormer.getInstance().render(config, 'chart-container');
```

### Auto-Migration

```typescript
// Automatically parse existing HTML configurations
WidgetXFormer.autoInitialize();

// Or manually convert specific widgets
const config = WidgetXFormer.parseConfigFromHTML('chart-config');
widget.render(config, 'chart-container');
```

## 🏗️ Project Structure

```
src/
├── widget-xformer.ts      # 📦 Core library (600+ lines)
├── main.ts                # 🏠 Main application
├── espresso-converter.ts  # 🔄 Migration utility
└── style.css             # 🎨 Application styles

demos/
├── index.html             # 🏠 Main showcase  
├── demo.html             # 🎯 Full widget demo
├── conversion-demo.html   # 🔄 Before/after comparison
└── examples/
    └── espresso-sample.html # 📄 Original sample

dist/                      # 📦 Built files
README.md                  # 📖 This file
package.json              # 📋 Dependencies
```

## 🔧 Development

### Commands

```bash
npm run dev        # Start development server
npm run build      # Build for production  
npm run preview    # Preview production build
npm run type-check # TypeScript type checking
```

### Adding New Widget Types

1. **Define the interface:**
```typescript
interface MyWidgetData {
  title: string;
  items: Array<{id: string, value: number}>;
}
```

2. **Add the renderer:**
```typescript
private initializeRenderers(): void {
  // ... existing renderers
  this.renderers.set('mywidget', this.renderMyWidget.bind(this));
}

private renderMyWidget(config: WidgetConfig, container: HTMLElement): void {
  const data = config.data as MyWidgetData;
  // Implementation here
}
```

3. **Use it:**
```typescript
widget.render({
  type: 'mywidget',
  data: { title: 'Custom Widget', items: [...] }
}, 'container');
```

## 🚀 Production Ready

### Performance
- ⚡ **Fast Rendering**: Canvas-based charts with optimal drawing
- 📦 **Small Bundle**: Zero external dependencies 
- 🔄 **Efficient Updates**: Smart re-rendering only when needed
- 📱 **Mobile Optimized**: Touch-friendly interactions

### Browser Support
- ✅ Chrome 60+
- ✅ Firefox 55+  
- ✅ Safari 12+
- ✅ Edge 79+

### Build Output
```bash
dist/index.html                  0.47 kB │ gzip: 0.30 kB
dist/assets/index-[hash].css     3.32 kB │ gzip: 1.17 kB  
dist/assets/index-[hash].js     14.00 kB │ gzip: 4.27 kB
```

## 🤝 Contributing

We welcome contributions! Please see our [Contributing Guide](CONTRIBUTING.md) for details.

### Development Workflow
1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-widget`
3. Make your changes and add tests
4. Run `npm run build` to ensure everything works
5. Submit a pull request

## 📈 Roadmap

- [ ] 🎯 **Chart.js Integration** - Replace custom charts with Chart.js
- [ ] 🗺️ **Real Map Support** - Integrate with Leaflet/MapBox
- [ ] 🎨 **Theme Editor** - Visual theme customization
- [ ] 📊 **More Chart Types** - Pie, Scatter, Radar charts
- [ ] 🔧 **Widget Builder** - Visual widget configuration tool
- [ ] 📱 **React/Vue Components** - Framework-specific wrappers
- [ ] 🌐 **CDN Distribution** - NPM package and CDN links

## 📄 License

MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Inspired by the original `espresso-sample.html` dashboard
- Built with modern web standards and best practices
- Thanks to the TypeScript and Vite communities

---

<div align="center">

**[⭐ Star this repo](https://github.com/your-username/widgetxformer)** • **[� Report Bug](https://github.com/your-username/widgetxformer/issues)** • **[💡 Request Feature](https://github.com/your-username/widgetxformer/issues)**

Made with ❤️ and ☕ by the WidgetXFormer team

</div>
