// WidgetXFormer Library Entry Point
export { default as WidgetXFormer } from './widget-xformer';
export * from './fluent-tokens';

// Import CSS for bundling
import './widgets.css';

// Re-export types
export type {
  WidgetConfig,
  TabItem,
  ChartData,
  ChartDataset,
  AccordionItem,
  TimelineEvent,
  TimelineConfig
} from './widget-xformer';
