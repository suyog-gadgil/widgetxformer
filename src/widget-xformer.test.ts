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

  describe('New Widget Types from more-samples.html', () => {
    describe('Profile Card Widget', () => {
      it('should render profile card correctly', () => {
        const config: WidgetConfig = {
          type: 'profile-card',
          data: {
            name: 'Alex Vance',
            title: 'Lead Developer',
            avatar: 'https://example.com/avatar.jpg',
            socialLinks: [
              { icon: '📧', url: 'mailto:alex@example.com' },
              { icon: '💼', url: 'https://linkedin.com/in/alex' }
            ]
          }
        }

        widgetXFormer.render(config, 'test-container')

        const profileCard = container.querySelector('.fluent-profile-card')
        expect(profileCard).toBeTruthy()

        // Check avatar
        const avatar = profileCard?.querySelector('img')
        expect(avatar).toBeTruthy()
        expect(avatar?.src).toBe('https://example.com/avatar.jpg')
        expect(avatar?.alt).toBe('Alex Vance')

        // Check name
        const name = profileCard?.querySelector('h3')
        expect(name?.textContent).toBe('Alex Vance')

        // Check title
        const title = profileCard?.querySelector('p')
        expect(title?.textContent).toBe('Lead Developer')

        // Check social links
        const socialLinks = profileCard?.querySelectorAll('a')
        expect(socialLinks).toHaveLength(2)
        expect(socialLinks?.[0].innerHTML).toBe('📧')
        expect(socialLinks?.[0].href).toBe('mailto:alex@example.com')
      })

      it('should render profile card without optional fields', () => {
        const config: WidgetConfig = {
          type: 'profile-card',
          data: {
            name: 'John Doe'
          }
        }

        widgetXFormer.render(config, 'test-container')

        const profileCard = container.querySelector('.fluent-profile-card')
        expect(profileCard).toBeTruthy()

        const name = profileCard?.querySelector('h3')
        expect(name?.textContent).toBe('John Doe')

        const avatar = profileCard?.querySelector('img')
        expect(avatar).toBeFalsy()

        const socialLinks = profileCard?.querySelectorAll('a')
        expect(socialLinks).toHaveLength(0)
      })
    })

    describe('Stats Card Widget', () => {
      it('should render stats card correctly', () => {
        const config: WidgetConfig = {
          type: 'stats-card',
          data: {
            title: 'New Users',
            value: '1,257',
            trend: '+12% from last week',
            icon: '👥',
            accentColor: '#10b981'
          }
        }

        widgetXFormer.render(config, 'test-container')

        const statsCard = container.querySelector('.fluent-stats-card') as HTMLElement
        expect(statsCard).toBeTruthy()
        expect(statsCard?.style.background).toBe('rgb(16, 185, 129)')

        // Check title and icon
        const header = statsCard?.children[0]
        const title = header?.children[0] as HTMLElement
        const icon = header?.children[1] as HTMLElement
        expect(title?.textContent).toBe('New Users')
        expect(icon?.innerHTML).toBe('👥')

        // Check value
        const value = statsCard?.children[1] as HTMLElement
        expect(value?.textContent).toBe('1,257')

        // Check trend
        const trend = statsCard?.children[2] as HTMLElement
        expect(trend?.textContent).toBe('+12% from last week')
      })

      it('should handle clickable stats card', () => {
        const clickHandler = vi.fn()
        const config: WidgetConfig = {
          type: 'stats-card',
          data: {
            title: 'Clickable Stats',
            value: '100',
            clickable: true,
            onClick: clickHandler
          }
        }

        widgetXFormer.render(config, 'test-container')

        const statsCard = container.querySelector('.fluent-stats-card') as HTMLElement
        expect(statsCard.style.cursor).toBe('pointer')

        statsCard.click()
        expect(clickHandler).toHaveBeenCalled()
      })
    })

    describe('Notification Card Widget', () => {
      it('should render notification card correctly', () => {
        const config: WidgetConfig = {
          type: 'notification-card',
          data: {
            title: 'Deployment Successful',
            message: 'Your project has been deployed to production.',
            type: 'success',
            icon: '✅',
            action: {
              text: 'View Details',
              onClick: vi.fn()
            }
          }
        }

        widgetXFormer.render(config, 'test-container')

        const notificationCard = container.querySelector('.fluent-notification-card')
        expect(notificationCard).toBeTruthy()

        // Check icon container
        const iconContainer = notificationCard?.children[0]
        expect(iconContainer?.innerHTML).toBe('✅')

        // Check content
        const content = notificationCard?.children[1]
        const title = content?.querySelector('h4')
        const message = content?.querySelector('p')
        const button = content?.querySelector('button')

        expect(title?.textContent).toBe('Deployment Successful')
        expect(message?.textContent).toBe('Your project has been deployed to production.')
        expect(button?.textContent).toBe('View Details')
      })

      it('should handle action button click', () => {
        const actionHandler = vi.fn()
        const config: WidgetConfig = {
          type: 'notification-card',
          data: {
            title: 'Test Notification',
            message: 'Test message',
            action: {
              text: 'Click Me',
              onClick: actionHandler
            }
          }
        }

        widgetXFormer.render(config, 'test-container')

        const button = container.querySelector('button')
        button?.click()
        expect(actionHandler).toHaveBeenCalled()
      })
    })

    describe('Progress Bar Widget', () => {
      it('should render progress bar correctly', () => {
        const config: WidgetConfig = {
          type: 'progress-bar',
          data: {
            label: 'Task Completion',
            value: 75,
            color: '#3b82f6',
            animated: true
          }
        }

        widgetXFormer.render(config, 'test-container')

        const progressContainer = container.querySelector('.fluent-progress-bar')
        expect(progressContainer).toBeTruthy()

        // Check label container
        const labelContainer = progressContainer?.children[0]
        const label = labelContainer?.children[0] as HTMLElement
        const percentage = labelContainer?.children[1] as HTMLElement
        expect(label?.textContent).toBe('Task Completion')
        expect(percentage?.textContent).toBe('75%')

        // Check progress track and fill
        const progressTrack = progressContainer?.children[1]
        const progressFill = progressTrack?.children[0] as HTMLElement
        expect(progressFill?.style.width).toBe('75%')
        expect(progressFill?.style.background).toBe('rgb(59, 130, 246)')
      })

      it('should handle progress bar without label', () => {
        const config: WidgetConfig = {
          type: 'progress-bar',
          data: {
            value: 50
          }
        }

        widgetXFormer.render(config, 'test-container')

        const progressContainer = container.querySelector('.fluent-progress-bar')
        expect(progressContainer?.children).toHaveLength(1) // Only progress track, no label
      })
    })

    describe('KPI Donut Widget', () => {
      it('should render KPI donut correctly', () => {
        const config: WidgetConfig = {
          type: 'kpi-donut',
          data: {
            value: 82,
            label: 'Project Completion',
            color: '#10b981'
          }
        }

        widgetXFormer.render(config, 'test-container')

        const kpiContainer = container.querySelector('.fluent-kpi-donut')
        expect(kpiContainer).toBeTruthy()

        // Check SVG
        const svg = kpiContainer?.querySelector('svg')
        expect(svg).toBeTruthy()
        expect(svg?.getAttribute('width')).toBe('200')
        expect(svg?.getAttribute('height')).toBe('200')

        // Check circles
        const circles = svg?.querySelectorAll('circle')
        expect(circles).toHaveLength(2) // Background and progress circles

        // Check center text
        const centerText = svg?.querySelector('text')
        expect(centerText?.textContent).toBe('82%')

        // Check label
        const label = kpiContainer?.querySelector('div')
        expect(label?.textContent).toBe('Project Completion')
      })
    })

    describe('Funnel Widget', () => {
      it('should render funnel chart correctly', () => {
        const config: WidgetConfig = {
          type: 'funnel',
          data: {
            title: 'Sales Funnel',
            stages: [
              { label: 'Visitors', value: 100, unit: '%' },
              { label: 'Sign Ups', value: 45, unit: '%' },
              { label: 'Purchases', value: 15, unit: '%' }
            ]
          }
        }

        widgetXFormer.render(config, 'test-container')

        const funnelContainer = container.querySelector('.fluent-funnel')
        expect(funnelContainer).toBeTruthy()

        // Check title
        const title = funnelContainer?.querySelector('h3')
        expect(title?.textContent).toBe('Sales Funnel')

        // Check stages (title + 3 stages = 4 children)
        expect(funnelContainer?.children).toHaveLength(4)

        // Check first stage
        const firstStage = funnelContainer?.children[1] as HTMLElement
        expect(firstStage?.textContent).toBe('Visitors (100%)')
        expect(firstStage?.style.width).toBe('100%')

        // Check second stage (should be narrower)
        const secondStage = funnelContainer?.children[2] as HTMLElement
        expect(secondStage?.textContent).toBe('Sign Ups (45%)')
        expect(secondStage?.style.width).toBe('85%')
      })
    })

    describe('Scatter Plot Widget', () => {
      it('should render scatter plot correctly', () => {
        const config: WidgetConfig = {
          type: 'scatter',
          data: {
            labels: ['Campaign Performance'],
            datasets: [{
              label: 'Ad Spend vs Conversions',
              data: [
                { x: 20, y: 30 },
                { x: 40, y: 15 },
                { x: 60, y: 80 }
              ],
              backgroundColor: '#3b82f6'
            }]
          }
        }

        widgetXFormer.render(config, 'test-container')

        const canvas = container.querySelector('canvas')
        expect(canvas).toBeTruthy()
        expect(canvas?.width).toBe(400)
        expect(canvas?.height).toBe(300)
      })
    })

    describe('Bubble Chart Widget', () => {
      it('should render bubble chart correctly', () => {
        const config: WidgetConfig = {
          type: 'bubble',
          data: {
            labels: ['Market Analysis'],
            datasets: [
              {
                label: 'Product A',
                data: [{ x: 20, y: 30, r: 15 }],
                backgroundColor: '#ff6384'
              },
              {
                label: 'Product B',
                data: [{ x: 40, y: 15, r: 25 }],
                backgroundColor: '#36a2eb'
              }
            ]
          }
        }

        widgetXFormer.render(config, 'test-container')

        const canvas = container.querySelector('canvas')
        expect(canvas).toBeTruthy()
        expect(canvas?.width).toBe(400)
        expect(canvas?.height).toBe(300)
      })
    })

    describe('Gauge Widget', () => {
      it('should render gauge correctly', () => {
        const config: WidgetConfig = {
          type: 'gauge',
          data: {
            title: 'System Load',
            value: 65,
            color: '#f59e0b'
          }
        }

        widgetXFormer.render(config, 'test-container')

        const gaugeContainer = container.querySelector('.fluent-gauge')
        expect(gaugeContainer).toBeTruthy()

        // Check title
        const title = gaugeContainer?.querySelector('h3')
        expect(title?.textContent).toBe('System Load')

        // Check SVG
        const svg = gaugeContainer?.querySelector('svg')
        expect(svg).toBeTruthy()
        expect(svg?.getAttribute('width')).toBe('200')
        expect(svg?.getAttribute('height')).toBe('120')

        // Check paths (background and value arcs)
        const paths = svg?.querySelectorAll('path')
        expect(paths).toHaveLength(2)

        // Check needle
        const needle = svg?.querySelector('line')
        expect(needle).toBeTruthy()

        // Check center dot
        const centerDot = svg?.querySelector('circle')
        expect(centerDot).toBeTruthy()

        // Check value text
        const valueText = gaugeContainer?.querySelector('div')
        expect(valueText?.textContent).toBe('65%')
      })
    })

    describe('Heatmap Widget', () => {
      it('should render heatmap correctly', () => {
        const config: WidgetConfig = {
          type: 'heatmap',
          data: {
            title: 'Activity Heatmap',
            columns: 7,
            rows: 5
          }
        }

        widgetXFormer.render(config, 'test-container')

        const heatmapContainer = container.querySelector('.fluent-heatmap')
        expect(heatmapContainer).toBeTruthy()

        // Check title
        const title = heatmapContainer?.querySelector('h3')
        expect(title?.textContent).toBe('Activity Heatmap')

        // Check grid
        const grid = heatmapContainer?.children[1] as HTMLElement
        expect(grid?.style.gridTemplateColumns).toBe('repeat(7, 1fr)')

        // Check cells (7 columns * 5 rows = 35 cells)
        const cells = grid?.children
        expect(cells).toHaveLength(35)

        // Check first cell has required styles
        const firstCell = cells?.[0] as HTMLElement
        expect(firstCell?.style.aspectRatio).toBe('1')
        expect(firstCell?.style.cursor).toBe('pointer')
      })

      it('should use provided data', () => {
        const testData = [0.1, 0.5, 0.9, 0.3]
        const config: WidgetConfig = {
          type: 'heatmap',
          data: {
            columns: 2,
            rows: 2,
            data: testData
          }
        }

        widgetXFormer.render(config, 'test-container')

        const heatmapContainer = container.querySelector('.fluent-heatmap')
        expect(heatmapContainer).toBeTruthy()
        
        // Find the grid element (it should be the div after the title if there's a title, or the first div)
        const grid = heatmapContainer?.querySelector('div[style*="grid-template-columns"]') as HTMLElement
        expect(grid).toBeTruthy()
        
        const cells = grid?.children
        expect(cells).toHaveLength(4)
      })
    })

    describe('Slider Widget', () => {
      it('should render slider correctly', () => {
        const onChange = vi.fn()
        const config: WidgetConfig = {
          type: 'slider',
          data: {
            label: 'Adjust Threshold',
            min: 0,
            max: 100,
            value: 50,
            description: 'Controls sensitivity level',
            onChange
          }
        }

        widgetXFormer.render(config, 'test-container')

        const sliderContainer = container.querySelector('.fluent-slider')
        expect(sliderContainer).toBeTruthy()

        // Check label container
        const labelContainer = sliderContainer?.children[0]
        const label = labelContainer?.children[0] as HTMLElement
        const valueDisplay = labelContainer?.children[1] as HTMLElement
        expect(label?.textContent).toBe('Adjust Threshold')
        expect(valueDisplay?.textContent).toBe('50')

        // Check slider input
        const slider = sliderContainer?.children[1] as HTMLInputElement
        expect(slider?.type).toBe('range')
        expect(slider?.min).toBe('0')
        expect(slider?.max).toBe('100')
        expect(slider?.value).toBe('50')

        // Check description
        const description = sliderContainer?.children[2] as HTMLElement
        expect(description?.textContent).toBe('Controls sensitivity level')
      })

      it('should handle slider value change', () => {
        const onChange = vi.fn()
        const config: WidgetConfig = {
          type: 'slider',
          data: {
            label: 'Test Slider',
            value: 30,
            onChange
          }
        }

        widgetXFormer.render(config, 'test-container')

        const slider = container.querySelector('input[type="range"]') as HTMLInputElement
        const valueDisplay = container.querySelector('.fluent-slider span:last-child') as HTMLElement

        // Simulate input change
        slider.value = '75'
        slider.dispatchEvent(new Event('input'))

        expect(valueDisplay?.textContent).toBe('75')
        expect(onChange).toHaveBeenCalledWith(75)
      })

      it('should render slider without description', () => {
        const config: WidgetConfig = {
          type: 'slider',
          data: {
            label: 'Simple Slider',
            value: 25
          }
        }

        widgetXFormer.render(config, 'test-container')

        const sliderContainer = container.querySelector('.fluent-slider')
        expect(sliderContainer?.children).toHaveLength(2) // Label container + slider, no description
      })
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
