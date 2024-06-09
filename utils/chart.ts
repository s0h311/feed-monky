import { Chart } from 'chart.js/auto'

type LineChartConfig = {
  id?: string
  title: string
  xAxisLabels: string[]
  data: number[]
}

const charts = new Map<string, Chart>()

export function destoryChart(id: string): void {
  const chart = charts.get(id)

  if (chart) {
    chart.destroy()
  }
}

export function initLineChart(canvas: HTMLCanvasElement, { id, title, xAxisLabels, data }: LineChartConfig): void {
  const chart = new Chart(canvas, {
    type: 'line',
    data: {
      labels: xAxisLabels,
      datasets: [
        {
          label: title,
          data,
          borderColor: '#50C683',
        },
      ],
    },
    options: {
      scales: {
        y: {
          min: 0,
          max: Math.ceil(getMax(data) * 1.1),
          ticks: {
            precision: 0,
          },
        },
      },
    },
  })

  if (id) {
    charts.set(id, chart)
  }
}

export function initBarChart(canvas: HTMLCanvasElement, { title, xAxisLabels, data }: LineChartConfig): void {
  new Chart(canvas, {
    type: 'bar',
    data: {
      labels: xAxisLabels,
      datasets: [
        {
          label: title,
          data,
          backgroundColor: [
            'rgba(255, 99, 132, 0.2)',
            'rgba(255, 159, 64, 0.2)',
            'rgba(255, 205, 86, 0.2)',
            'rgba(75, 192, 192, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(153, 102, 255, 0.2)',
            'rgba(201, 203, 207, 0.2)',
          ],
          borderColor: [
            'rgb(255, 99, 132)',
            'rgb(255, 159, 64)',
            'rgb(255, 205, 86)',
            'rgb(75, 192, 192)',
            'rgb(54, 162, 235)',
            'rgb(153, 102, 255)',
            'rgb(201, 203, 207)',
          ],
          borderWidth: 1,
        },
      ],
    },
    options: {
      scales: {
        y: {
          min: 0,
          max: Math.ceil(getMax(data) * 1.1),
          ticks: {
            precision: 0,
          },
        },
      },
    },
  })
}
