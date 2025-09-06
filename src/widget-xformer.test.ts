import { describe, it, expect, beforeEach, vi } from 'vitest'
import WidgetXFormer from './widget-xformer'
import type { WidgetConfig, TabItem, ChartData, AccordionItem, TimelineEvent } from './widget-xformer'

describe('WidgetXFormer', () => {
  let widgetXFormer: WidgetXFormer
  let container: HTMLElement

  beforeEach(() => {
    // Create a fresh instance and container for each test
    widgetXFormer = WidgetXFormer.getInstance()
    container = document.createElement('div')
    container.id = 'test-container'
    document.body.appendChild(container)
  })

  describe('Singleton Pattern', () => {
    it('should return the same instance', () => {
      const instance1 = WidgetXFormer.getInstance()
      const instance2 = WidgetXFormer.getInstance()
      expect(instance1).toBe(instance2)
    })
  })

  describe('Widget Rendering', () => {
    it('should handle invalid container ID gracefully', () => {
      const config: WidgetConfig = {
        type: 'card',
        data: { title: 'Test Card', content: 'Test content' }
      }

      // Spy on console.error to check if error is logged
      const consoleErrorSpy = vi.spyOn(console, 'error').mockImplementation(() => {})
      
      widgetXFormer.render(config, 'non-existent-container')
      
      expect(consoleErrorSpy).toHaveBeenCalledWith('Container with id "non-existent-container" not found')
      consoleErrorSpy.mockRestore()
    })

    it('should handle invalid widget type gracefully', () => {
      const config: WidgetConfig = {
        type: 'invalid-type',
        data: {}
      }

      const consoleErrorSpy = vi.spyOn(console, 'error').mockImplementation(() => {})
      
      widgetXFormer.render(config, 'test-container')
      
      expect(consoleErrorSpy).toHaveBeenCalledWith('No renderer found for widget type "invalid-type"')
      consoleErrorSpy.mockRestore()
    })
  })

  describe('Tabs Widget', () => {
    it('should render tabs widget correctly', () => {
      const config: WidgetConfig = {
        type: 'tabs',
        data: {
          items: [
            { id: 'tab1', label: 'Tab 1', content: 'Content 1' },
            { id: 'tab2', label: 'Tab 2', content: 'Content 2' },
            { id: 'tab3', label: 'Tab 3', content: 'Content 3' }
          ] as TabItem[]
        },
        style: { theme: 'default' }
      }

      widgetXFormer.render(config, 'test-container')

      // Check if tabs container is created
      const tabsContainer = container.querySelector('.fluent-tabs')
      expect(tabsContainer).toBeTruthy()

      // Check if tab headers are created
      const tabHeaders = container.querySelectorAll('.tab-header')
      expect(tabHeaders).toHaveLength(3)
      expect(tabHeaders[0].textContent).toBe('Tab 1')
      expect(tabHeaders[1].textContent).toBe('Tab 2')
      expect(tabHeaders[2].textContent).toBe('Tab 3')

      // Check if tab panels are created
      const tabPanels = container.querySelectorAll('.tab-panel')
      expect(tabPanels).toHaveLength(3)
      expect(tabPanels[0].textContent).toBe('Content 1')

      // Check if first tab is active
      const firstPanel = tabPanels[0] as HTMLElement
      expect(firstPanel.style.display).toBe('block')
    })

    it('should handle tab switching correctly', () => {
      const config: WidgetConfig = {
        type: 'tabs',
        data: {
          items: [
            { id: 'tab1', label: 'Tab 1', content: 'Content 1' },
            { id: 'tab2', label: 'Tab 2', content: 'Content 2' }
          ] as TabItem[]
        }
      }

      widgetXFormer.render(config, 'test-container')

      const tabHeaders = container.querySelectorAll('.tab-header') as NodeListOf<HTMLButtonElement>
      const tabPanels = container.querySelectorAll('.tab-panel') as NodeListOf<HTMLElement>

      // Click second tab
      tabHeaders[1].click()

      // Check if second tab is now active
      expect(tabPanels[0].style.display).toBe('none')
      expect(tabPanels[1].style.display).toBe('block')
    })
  })

  describe('Chart Widgets', () => {
    const chartData: ChartData = {
      labels: ['Red', 'Blue', 'Yellow', 'Green'],
      datasets: [{
        label: 'Test Dataset',
        data: [12, 19, 3, 5],
        backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0']
      }]
    }

    it('should render doughnut chart correctly', () => {
      const config: WidgetConfig = {
        type: 'doughnut',
        data: chartData
      }

      widgetXFormer.render(config, 'test-container')

      const canvas = container.querySelector('canvas')
      expect(canvas).toBeTruthy()
      expect(canvas?.width).toBe(400)
      expect(canvas?.height).toBe(300)
    })

    it('should render bar chart correctly', () => {
      const config: WidgetConfig = {
        type: 'bar',
        data: chartData
      }

      widgetXFormer.render(config, 'test-container')

      const canvas = container.querySelector('canvas')
      expect(canvas).toBeTruthy()
      expect(canvas?.width).toBe(400)
      expect(canvas?.height).toBe(300)
    })

    it('should render line chart correctly', () => {
      const config: WidgetConfig = {
        type: 'line',
        data: chartData
      }

      widgetXFormer.render(config, 'test-container')

      const canvas = container.querySelector('canvas')
      expect(canvas).toBeTruthy()
      expect(canvas?.width).toBe(400)
      expect(canvas?.height).toBe(300)
    })
  })

  describe('Accordion Widget', () => {
    it('should render accordion widget correctly', () => {
      const config: WidgetConfig = {
        type: 'accordion',
        data: {
          items: [
            { id: 'acc1', title: 'Section 1', content: 'Content 1', expanded: true },
            { id: 'acc2', title: 'Section 2', content: 'Content 2', expanded: false },
            { id: 'acc3', title: 'Section 3', content: 'Content 3', expanded: false }
          ] as AccordionItem[]
        }
      }

      widgetXFormer.render(config, 'test-container')

      // Check if accordion container is created
      const accordionContainer = container.querySelector('.fluent-accordion')
      expect(accordionContainer).toBeTruthy()

      // Check if accordion items are created
      const accordionItems = container.querySelectorAll('.accordion-item')
      expect(accordionItems).toHaveLength(3)

      // Check if headers are created
      const headers = container.querySelectorAll('.accordion-header')
      expect(headers).toHaveLength(3)
      expect(headers[0].textContent).toBe('Section 1')

      // Check if content panels are created
      const contents = container.querySelectorAll('.accordion-content')
      expect(contents).toHaveLength(3)
      expect(contents[0].textContent).toBe('Content 1')
    })

    it('should handle accordion toggle correctly', () => {
      const config: WidgetConfig = {
        type: 'accordion',
        data: {
          items: [
            { id: 'acc1', title: 'Section 1', content: 'Content 1', expanded: false }
          ] as AccordionItem[]
        }
      }

      widgetXFormer.render(config, 'test-container')

      const header = container.querySelector('.accordion-header') as HTMLButtonElement
      const content = container.querySelector('.accordion-content') as HTMLElement

      // Initially should be collapsed
      expect(content.style.maxHeight).toBe('0')

      // Mock scrollHeight to simulate content size
      Object.defineProperty(content, 'scrollHeight', {
        configurable: true,
        value: 100
      })

      // Click to expand
      header.click()
      expect(content.style.maxHeight).toBe('100px')

      // Click to collapse
      header.click()
      expect(['0', '0px']).toContain(content.style.maxHeight)
    })
  })

  describe('Card Widget', () => {
    it('should render card widget correctly', () => {
      const config: WidgetConfig = {
        type: 'card',
        data: {
          title: 'Test Card Title',
          content: 'This is test card content'
        }
      }

      widgetXFormer.render(config, 'test-container')

      // Check if card is created
      const card = container.querySelector('.fluent-card-traditional')
      expect(card).toBeTruthy()

      // Check if title is rendered
      const title = card?.querySelector('h3')
      expect(title?.textContent).toBe('Test Card Title')

      // Check if content is rendered
      const content = card?.querySelector('p')
      expect(content?.textContent).toBe('This is test card content')
    })

    it('should render card without title', () => {
      const config: WidgetConfig = {
        type: 'card',
        data: {
          content: 'Content only card'
        }
      }

      widgetXFormer.render(config, 'test-container')

      const card = container.querySelector('.fluent-card-traditional')
      const title = card?.querySelector('h3')
      const content = card?.querySelector('p')

      expect(title).toBeFalsy()
      expect(content?.textContent).toBe('Content only card')
    })
  })

  describe('Metric Widget', () => {
    it('should render metric widget correctly', () => {
      const config: WidgetConfig = {
        type: 'metric',
        data: {
          value: '1,234',
          label: 'Total Users'
        }
      }

      widgetXFormer.render(config, 'test-container')

      // Check if metric container is created
      const metric = container.querySelector('.fluent-metric')
      expect(metric).toBeTruthy()

      // Check if value and label are rendered
      const valueElement = metric?.children[0] as HTMLElement
      const labelElement = metric?.children[1] as HTMLElement

      expect(valueElement.textContent).toBe('1,234')
      expect(labelElement.textContent).toBe('Total Users')
    })
  })

  describe('Table Widget', () => {
    it('should render table widget correctly', () => {
      const config: WidgetConfig = {
        type: 'table',
        data: {
          headers: ['Name', 'Age', 'City'],
          rows: [
            ['John Doe', '30', 'New York'],
            ['Jane Smith', '25', 'Los Angeles'],
            ['Bob Johnson', '35', 'Chicago']
          ]
        }
      }

      widgetXFormer.render(config, 'test-container')

      // Check if table is created
      const table = container.querySelector('table')
      expect(table).toBeTruthy()

      // Check headers
      const headers = table?.querySelectorAll('th')
      expect(headers).toHaveLength(3)
      expect(headers?.[0].textContent).toBe('Name')
      expect(headers?.[1].textContent).toBe('Age')
      expect(headers?.[2].textContent).toBe('City')

      // Check rows
      const rows = table?.querySelectorAll('tbody tr')
      expect(rows).toHaveLength(3)

      const firstRowCells = rows?.[0].querySelectorAll('td')
      expect(firstRowCells?.[0].textContent).toBe('John Doe')
      expect(firstRowCells?.[1].textContent).toBe('30')
      expect(firstRowCells?.[2].textContent).toBe('New York')
    })

    it('should render table without headers', () => {
      const config: WidgetConfig = {
        type: 'table',
        data: {
          rows: [
            ['Data 1', 'Data 2'],
            ['Data 3', 'Data 4']
          ]
        }
      }

      widgetXFormer.render(config, 'test-container')

      const table = container.querySelector('table')
      const thead = table?.querySelector('thead')
      const tbody = table?.querySelector('tbody')

      expect(thead).toBeFalsy()
      expect(tbody?.querySelectorAll('tr')).toHaveLength(2)
    })
  })

  describe('World Map Widget', () => {
    it('should render world map widget correctly', () => {
      const config: WidgetConfig = {
        type: 'worldmap',
        data: {
          countries: [
            { code: 'US', value: 100 },
            { code: 'CA', value: 50 }
          ]
        }
      }

      widgetXFormer.render(config, 'test-container')

      // Check if SVG is created
      const svg = container.querySelector('svg')
      expect(svg).toBeTruthy()
      expect(svg?.getAttribute('viewBox')).toBe('0 0 800 400')

      // Check if placeholder text is rendered
      const text = svg?.querySelector('text')
      expect(text?.textContent?.trim()).toBe('World Map Visualization')
    })
  })

  describe('Timeline Widget', () => {
    const timelineEvents: TimelineEvent[] = [
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
        title: 'User Testing',
        description: 'Conducting user acceptance testing',
        status: 'current',
        category: 'Testing'
      },
      {
        id: '4',
        date: '2024-04-01',
        title: 'Full Launch',
        description: 'Complete product launch',
        status: 'upcoming',
        category: 'Release'
      }
    ]

    it('should render vertical timeline correctly', () => {
      const config: WidgetConfig = {
        type: 'timeline',
        data: {
          events: timelineEvents,
          config: {
            orientation: 'vertical',
            layout: 'left',
            showDates: true,
            showIcons: true
          }
        }
      }

      widgetXFormer.render(config, 'test-container')

      // Check if timeline container is created
      const timeline = container.querySelector('.widget-timeline')
      expect(timeline).toBeTruthy()

      // Check if timeline track is created
      const track = timeline?.querySelector('.timeline-track')
      expect(track).toBeTruthy()

      // Check if timeline line is created
      const line = track?.querySelector('.timeline-line')
      expect(line).toBeTruthy()

      // Check if events are rendered
      const events = track?.querySelectorAll('.timeline-event')
      expect(events).toHaveLength(4)

      // Check if markers are created
      const markers = track?.querySelectorAll('.timeline-marker')
      expect(markers).toHaveLength(4)

      // Check if content is created
      const contents = track?.querySelectorAll('.timeline-content')
      expect(contents).toHaveLength(4)

      // Check first event content
      const firstContent = contents?.[0]
      const title = firstContent?.querySelector('h4')
      expect(title?.textContent).toBe('Project Started')
    })

    it('should render horizontal timeline correctly', () => {
      const config: WidgetConfig = {
        type: 'timeline',
        data: {
          events: timelineEvents,
          config: {
            orientation: 'horizontal',
            showDates: true
          }
        }
      }

      widgetXFormer.render(config, 'test-container')

      // Check if horizontal timeline track is created
      const track = container.querySelector('.timeline-track-horizontal')
      expect(track).toBeTruthy()

      // Check if horizontal timeline line is created
      const line = track?.querySelector('.timeline-line-horizontal')
      expect(line).toBeTruthy()

      // Check if events are rendered
      const events = track?.querySelectorAll('.timeline-event')
      expect(events).toHaveLength(4)
    })

    it('should show progress when enabled', () => {
      const config: WidgetConfig = {
        type: 'timeline',
        data: {
          events: timelineEvents,
          config: {
            showProgress: true
          }
        }
      }

      widgetXFormer.render(config, 'test-container')

      const timeline = container.querySelector('.widget-timeline')
      
      // Progress should be the first child
      const progressContainer = timeline?.firstElementChild
      expect(progressContainer).toBeTruthy()

      // Check progress elements
      const progressLabel = progressContainer?.querySelector('div')
      expect(progressLabel?.textContent).toContain('Progress')
      expect(progressLabel?.textContent).toContain('2/4') // 2 completed out of 4
    })

    it('should group events by category', () => {
      const config: WidgetConfig = {
        type: 'timeline',
        data: {
          events: timelineEvents,
          config: {
            groupBy: 'category'
          }
        }
      }

      widgetXFormer.render(config, 'test-container')

      const track = container.querySelector('.timeline-track')
      const groupHeaders = track?.querySelectorAll('.timeline-group-header')
      
      // Should have group headers for Development, Release, Testing
      expect(groupHeaders?.length).toBeGreaterThan(0)
    })

    it('should handle interactive timeline events', () => {
      const eventsWithLinks = timelineEvents.map(event => ({
        ...event,
        link: 'https://example.com'
      }))

      const config: WidgetConfig = {
        type: 'timeline',
        data: {
          events: eventsWithLinks,
          config: {
            interactive: true
          }
        }
      }

      // Mock window.open
      const openSpy = vi.spyOn(window, 'open').mockImplementation(() => null)

      widgetXFormer.render(config, 'test-container')

      const firstEvent = container.querySelector('.timeline-event') as HTMLElement
      expect(firstEvent.style.cursor).toBe('pointer')

      // Click the event
      firstEvent.click()
      expect(openSpy).toHaveBeenCalledWith('https://example.com', '_blank')

      openSpy.mockRestore()
    })
  })

  describe('Theme System', () => {
    it('should apply default theme correctly', () => {
      const config: WidgetConfig = {
        type: 'card',
        data: { title: 'Test', content: 'Test content' },
        style: { theme: 'default' }
      }

      widgetXFormer.render(config, 'test-container')

      expect(container.style.backgroundColor).toBe('rgb(255, 255, 255)') // #ffffff
      expect(container.style.color).toBe('rgb(50, 49, 48)') // #323130
    })

    it('should apply brand theme correctly', () => {
      const config: WidgetConfig = {
        type: 'card',
        data: { title: 'Test', content: 'Test content' },
        style: { theme: 'brand' }
      }

      widgetXFormer.render(config, 'test-container')

      expect(container.style.backgroundColor).toBe('rgb(255, 255, 255)') // #ffffff
      expect(container.style.color).toBe('rgb(50, 49, 48)') // #323130
    })

    it('should apply dark theme correctly', () => {
      const config: WidgetConfig = {
        type: 'card',
        data: { title: 'Test', content: 'Test content' },
        style: { theme: 'dark' }
      }

      widgetXFormer.render(config, 'test-container')

      expect(container.style.backgroundColor).toBe('rgb(45, 45, 45)') // #2d2d2d
      expect(container.style.color).toBe('rgb(255, 255, 255)') // #ffffff
    })

    it('should fallback to default theme for invalid theme', () => {
      const config: WidgetConfig = {
        type: 'card',
        data: { title: 'Test', content: 'Test content' },
        style: { theme: 'invalid-theme' }
      }

      widgetXFormer.render(config, 'test-container')

      expect(container.style.backgroundColor).toBe('rgb(255, 255, 255)') // default theme
    })
  })

  describe('Static Methods', () => {
    it('should parse config from HTML correctly', () => {
      // Create element with JSON data
      const element = document.createElement('div')
      element.id = 'config-element'
      element.setAttribute('data-json', JSON.stringify({
        type: 'card',
        data: { title: 'Test Card' }
      }))
      document.body.appendChild(element)

      const config = WidgetXFormer.parseConfigFromHTML('config-element')
      
      expect(config).toBeTruthy()
      expect(config?.type).toBe('card')
      expect(config?.data.title).toBe('Test Card')
    })

    it('should handle invalid JSON gracefully', () => {
      const element = document.createElement('div')
      element.id = 'invalid-config'
      element.setAttribute('data-json', 'invalid-json')
      document.body.appendChild(element)

      const consoleErrorSpy = vi.spyOn(console, 'error').mockImplementation(() => {})
      
      const config = WidgetXFormer.parseConfigFromHTML('invalid-config')
      
      expect(config).toBeNull()
      expect(consoleErrorSpy).toHaveBeenCalled()
      consoleErrorSpy.mockRestore()
    })

    it('should handle missing element gracefully', () => {
      const config = WidgetXFormer.parseConfigFromHTML('non-existent')
      expect(config).toBeNull()
    })

    it('should auto-initialize widgets from HTML', () => {
      // Create config element
      const configElement = document.createElement('div')
      configElement.id = 'auto-config'
      configElement.setAttribute('data-json', JSON.stringify({
        type: 'card',
        data: { title: 'Auto Card' }
      }))
      document.body.appendChild(configElement)

      // Create widget element
      const widgetElement = document.createElement('div')
      widgetElement.id = 'auto-widget'
      widgetElement.setAttribute('data-config-ref', 'auto-config')
      document.body.appendChild(widgetElement)

      WidgetXFormer.autoInitialize()

      // Check if widget was rendered
      const card = widgetElement.querySelector('.fluent-card-traditional')
      expect(card).toBeTruthy()
      
      const title = card?.querySelector('h3')
      expect(title?.textContent).toBe('Auto Card')
    })
  })
})
