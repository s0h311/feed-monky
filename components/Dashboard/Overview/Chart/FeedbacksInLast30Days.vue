<template>
  <canvas ref="chartFeedbacksLast30Days" />
</template>

<script setup lang="ts">
const chartFeedbacksLast30Days = ref<HTMLCanvasElement>()
const feedbacks = await useFeedbacks()

onMounted(() => initChart())

function initChart(): void {
  if (!chartFeedbacksLast30Days.value) {
    return
  }

  const last30Days = getLastNDates(30, 'asc')
  const data = getFeedbacksData(last30Days)

  initLineChart(chartFeedbacksLast30Days.value, {
    title: 'Feedbacks in last 30 days',
    xAxisLabels: last30Days.map(formatDateToDateAndMonth),
    data,
  })
}

function getFeedbacksData(dates: Date[]): number[] {
  const feedbacksLastNDays = new Map<string, number>()

  dates.forEach((date) => feedbacksLastNDays.set(date.toDateString(), 0))

  feedbacks.value.forEach((feedback) => {
    const feedbackDate = new Date(feedback.createdAt)
    const feedbackDateString = feedbackDate.toDateString()

    if (!feedbacksLastNDays.has(feedbackDateString)) {
      return
    }

    const currentFeedbackForDate = feedbacksLastNDays.get(feedbackDateString) ?? 0

    feedbacksLastNDays.set(feedbackDateString, currentFeedbackForDate + 1)
  })

  return [...feedbacksLastNDays.values()]
}
</script>
