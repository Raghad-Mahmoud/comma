function monthsFromNow(months) {
  const now = new Date()
  const currentMonthIndex = now.getMonth()
  const reversedMonths = [
    ...months.slice(currentMonthIndex),
    ...months.slice(0, currentMonthIndex)
  ].reverse()
  return reversedMonths
}
var months_list_short = [
  'Jan',
  'Feb',
  'Mar',
  'Apr',
  'May',
  'Jun',
  'Jul',
  'Aug',
  'Sep',
  'Oct',
  'Nov',
  'Dec'
]
const mothsfromcurrent = monthsFromNow(months_list_short).reverse()
const courses_dashboardLineChart = document.getElementById('courses-line-chart-dashboard-months')
var coursesCounts_data = coursesCounts
var datasetLabel = 'Number of Courses'
new Chart(courses_dashboardLineChart, {
  type: 'line',
  data: {
    labels: mothsfromcurrent,
    datasets: [
      {
        label: datasetLabel,
        data: coursesCounts_data,
        borderWidth: 3,
        borderColor: '#8c61ff'
      }
    ]
  },
  options: {
    tension: 0.2,
    borderCapStyle: 'round',
    pointStyle: false,
    hoverRadius: 32,
    transitions: {
      show: {
        animations: {
          x: {
            from: 0
          },
          y: {
            from: 0
          }
        }
      },
      hide: {
        animations: {
          x: {
            to: 0
          },
          y: {
            to: 0
          }
        }
      }
    },
    scales: {
      x: {
        grid: {
          display: false
        }
      },
      y: {
        beginAtZero: false,
        grid: {
          display: false
        }
      }
    },
    plugins: {
      legend: {
        display: false
      },
      tooltip: {
        callbacks: {
          label: function (context) {
            let label = ''

            if (label) {
              label += ': '
            }
            if (context.parsed.y !== null) {
              label += new Intl.NumberFormat('en-US', {}).format(context.parsed.y)
            }
            return label
          }
        }
      }
    }
  }
})
