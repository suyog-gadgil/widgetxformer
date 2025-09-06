
# widgetxformer

WidgetXFormer is a TypeScript library and demo suite that renders a variety of UI widgets and visualizations purely from JSON configuration. It was created to enable quick conversions of custom, hard-coded widgets into JSON-driven, reusable components. The library emphasizes predictability, defensive rendering, and lightweight runtime behavior (vanilla DOM + canvas where needed).

This README documents the library purpose, how to use it, the supported widget types and expected JSON shapes, the developer workflow (build/test/lint), and troubleshooting tips.

## Table of contents
- Introduction
- Supported widgets
- Public API and JSON contract
- Quick start (install, dev server, build)
- Examples (full snippets)
- Development workflow (build, test, lint, typecheck)
- Troubleshooting & common fixes
- Contributing guidelines
- Publishing


## Introduction

WidgetXFormer converts declarative JSON into fully interactive UI widgets. Key design goals:

- Single-render entrypoint: call `render(config, target)` to mount a widget.
- Defensive mapping: library logs and gracefully handles missing/incorrect data.
- Lightweight runtime: minimal dependencies, vanilla DOM + canvas for charts.
- Theming via Fluent UI tokens for a consistent visual language.

The repo includes demo pages (root HTML files) that show how original custom widgets were converted to WidgetXFormer calls (see `transformed-more-samples.html`).

## Supported widgets (short reference)

The library supports many widget types. Each type expects a `config.data` shape; examples are below.

- Profile card (`profile-card`)
- Stats card (`stats-card`)
- Notification card (`notification-card`)
- Progress bar (`progress-bar`)
- KPI donut (`kpi-donut`)
- Gauge (`gauge`)
- Bar chart (`bar`)
- Line chart (`line`)
- Scatter plot (`scatter`)
- Bubble chart (`bubble`)
- Doughnut / Pie (`doughnut`)
- Heatmap calendar (`heatmap`)
- Funnel chart (`funnel`)
- Table (`table`)
- Timeline (`timeline`)
- Slider (`slider`)

If you need a new widget type, follow the patterns in `src/widget-xformer.ts`: add a `renderX` helper, defensive checks, and local styles or tokens as needed.

## Public API and JSON contract

Primary surface:

- WidgetXFormer.getInstance(): WidgetXFormer — singleton accessor.
- render(config: WidgetConfig, target: string | HTMLElement): void

WidgetConfig (summary):

- type: string — widget type (required).
- data: any — widget-specific payload (required).
- options: object — per-widget options (optional). For charts this includes axis titles, min/max, grid toggles, etc.
- style: { theme?: string, fluentDesign?: boolean } — optional rendering hints.

General rules:

- Charts expect `data.datasets` arrays similar to Chart.js (label, data, backgroundColor, borderColor, etc.).
- When `data.labels` exists, many widgets map those to axis or legend entries.
- Missing or malformed fields are logged and will render a fallback or empty state.

Example type signatures (TypeScript-like):

```ts
interface WidgetConfig {
  type: string;
  data: any;
  options?: Record<string, any>;
  style?: { theme?: string; fluentDesign?: boolean };
}

interface ChartDataset {
  label?: string;
  data: number[] | {x:number,y:number,r?:number,label?:string}[];
  backgroundColor?: string | string[];
  borderColor?: string;
}
```

## Quick start

Install dependencies:

```bash
npm install
```

Run the dev server (Vite):

```bash
npm run dev
```

Build the library (production):

```bash
npm run build
```

Run tests (Vitest):

```bash
npm test
```

Run typecheck and lint (if configured):

```bash
npm run typecheck
npm run lint
```

## Examples

Line chart example:

```js
import WidgetXFormer from './src/widget-xformer.js';
const w = WidgetXFormer.getInstance();
w.render({
  type: 'line',
  data: {
    labels: ['Jan','Feb','Mar','Apr'],
    datasets: [{
      label: 'Active Users',
      data: [40, 45, 60, 80],
      borderColor: 'rgb(59,130,246)',
      backgroundColor: 'rgba(59,130,246,0.12)',
      tension: 0.3
    }]
  },
  options: { xAxis: { title: 'Month' }, yAxis: { title: 'Users' } },
  style: { theme: 'light' }
}, 'line-chart-demo');
```

Scatter chart example:

```js
w.render({
  type: 'scatter',
  data: {
    datasets: [{
      label: 'Campaign',
      data: [{x:10,y:20},{x:35,y:70},{x:80,y:55}],
      backgroundColor: 'rgba(59,130,246,0.6)'
    }]
  },
  options: { xAxis: { title: 'Ad Spend' }, yAxis: { title: 'Conversions' } },
}, 'scatter-demo');
```

Profile card example:

```js
w.render({
  type: 'profile-card',
  data: { avatar:'https://placehold.co/100', name:'Jane Doe', title:'Designer' },
  style: { theme: 'light' }
}, 'profile-demo');
```

## Development workflow

Recommended steps for contributing or iterating locally:

1. Fork and branch from `main`.
2. Run the dev server: `npm run dev`.
3. Make changes in `src/` and verify demo pages in the browser.
4. Run the build: `npm run build` and run tests: `npm test`.
5. Keep commits small and focused; follow commit message style described below.

Commit message convention (suggested):

- `feat(widget): add <widget-name>`
- `fix(chart): correct hover detection for bubble chart`
- `chore(deps): update vite`

### Debug pages & tools

The repo includes several self-contained HTML pages used for manual verification and debugging. Open these in the browser (via the dev server or file://) to reproduce problems or validate behavior quickly:

- `hover-test.html` — focused hover/tooltip tests for line and scatter charts; includes helpers to attach debug listeners that log cached canvas points.
- `simple-hover-test.html` — a compact hover smoke test that mounts a single chart and verifies tooltip rendering.
- `all-charts-hover-test.html` — mounts many chart types in one page to exercise hover behavior across the chart renderer implementations.
- `legend-grid-test.html` — checks legend rendering and grid/axis toggles for charts.
- `heatmap-debug.html` — targeted page to verify heatmap coloring and data mapping across calendar-like layouts.
- `debug-widgets.html` / `verify-widgets.html` — general debug pages that render a selection of widgets with verbose console logging enabled.
- `conversion-demo.html` — shows how original custom widgets were converted into WidgetXFormer JSON calls; useful when validating conversion fidelity.
- `transformed-more-samples.html` — the full conversion of the espresso sample; used to smoke-test layout density and mapping parity with the original samples.
- `new-widgets-demo.html` / `package-test.html` — convenience pages to exercise new widgets and package entrypoints.
- `examples/` — contains additional sample HTML files (for example, `more-samples.html`) and fixtures that are useful when building conversion scripts.

Notes:
- These pages intentionally log mapping issues and defensive fallbacks — examine the browser console when something looks off.
- Use the dev server (`npm run dev`) to avoid CORS/file:// limitations when loading local modules.

### Testing (Vitest)

Automated tests use Vitest. The test harness focuses on parsing, data-mapping, and DOM-output assertions rather than full visual rendering. Key points:

- Test config: `vitest.config.ts` with `src/test-setup.ts` loaded via `setupFiles` to prepare the DOM and mocks.
- Canvas mocking: `src/test-setup.ts` provides lightweight mocks for the 2D canvas context so chart-drawing code can run in the test environment without a real browser canvas.
- Primary test file: `src/widget-xformer.test.ts` — a comprehensive suite that covers:
  - Singleton behavior and instance retrieval
  - Graceful handling of invalid widget types and missing target containers
  - Rendering output structure for many widget types (tabs, cards, metrics, tables, timeline, maps)
  - Chart widget data mapping for bar/line/scatter/bubble/heatmap and ensuring dataset/label handling is correct
  - New widgets implemented from `more-samples.html` (profile card, stats card, notification card, KPI donut, funnel, progress bar, etc.)
  - Parsing helpers: `parseConfigFromHTML` and `autoInitialize` are tested with DOM fixtures

- How to run tests locally:

```bash
npm test
```

- Test guidance when adding coverage:
  - Prefer small, focused unit tests for parsing and mapping logic.
  - For widget DOM structure assertions, query the generated container and assert the presence/text of key elements (titles, metric values, table rows).
  - When adding chart behavior tests, extend the canvas mock as needed to validate that points are computed and stored on the canvas (the library stores hover points on the canvas element for detection).

If you want CI-ready coverage or visual regression testing later, we can add headless browser tests (Playwright / Puppeteer) to snapshot actual canvas output — this is left as an optional follow-up.

## Troubleshooting & common fixes

- Blank or invisible widgets:
  - Confirm the target container exists and is visible when `render` is called. If you render into a hidden container, canvas size may be zero.
  - Check console logs — WidgetXFormer logs mapping errors and defensive fallbacks.

- Hover tooltips not appearing for charts:
  - Ensure the canvas has chart points stored: the library caches points onto the canvas element for hover detection.
  - If behavior is flaky after hot-reload, refresh the page to reset tooltips and listeners.

- Legend or labels missing:
  - Verify `data.labels` or dataset labels are present. The library builds legends defensively but relies on available labels/colors.

- TypeScript warnings about unused variables during build:
  - Edit the source to remove or rename unused parameters (a quick fix is prefixing with an underscore).

If you encounter an issue not documented here, open an issue with a minimal reproducible example (HTML + JSON config).

## Contributing

1. Fork and create a branch with a descriptive name.
2. Implement changes and add tests for parsing/logic changes.
3. Run `npm run build` and `npm test` locally.
4. Open a PR with a clear description and include screenshots for UI changes.

Coding style

- Prefer small, focused functions. Chart drawing logic should compute points first, store a points array on the canvas for hover logic, then draw.
- Use the Fluent design tokens utilities already present when adding Fluent-styled UI elements.

## Publishing

1. Bump `package.json` version.
2. Run `npm run build` and verify `dist/` artifacts.
3. Publish to npm (if applicable):

```bash
npm publish --access public
```

## Changelog template (for PRs)

- Summary of change
- Files touched
- Testing performed (commands/URLs)
- Backwards-compatibility notes

---

If you'd like, I can also:

- Add an `examples/` folder with a few JSON fixtures and a smoke-test HTML that mounts widgets automatically.
- Add a short `CONTRIBUTING.md` with a PR checklist and local dev commands.

Tell me which of those you'd like next and I will add it.
