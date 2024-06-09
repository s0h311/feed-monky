<template>
  <div class="grid gap-5">
    <select
      class="select select-accent w-full max-w-xs"
      v-model="selectedFeedbackSummaryId"
    >
      <option
        disabled
        selected
        value="0"
      >
        Select a TODO
      </option>
      <option
        v-for="feedbackSummary in feedbackSummaries"
        :key="feedbackSummary.id"
        :value="feedbackSummary.id"
      >
        {{ feedbackSummary.summary }}
      </option>
    </select>

    <canvas ref="chartSingleFeedbackSummaryLast30Days" />
  </div>
</template>

<script setup lang="ts">
import type { FeedbackSummary } from '~/server/dataLayer/types'

const chartSingleFeedbackSummaryLast30Days = ref<HTMLCanvasElement>()
const feedbacks = await useFeedbacks()
const feedbackSummaries = await useFeedbackSummaries()

const selectedFeedbackSummaryId = ref<FeedbackSummary['id']>(0)

watch(selectedFeedbackSummaryId, initChart)

onMounted(() => initChart())

function initChart(): void {
  const canvas = chartSingleFeedbackSummaryLast30Days.value

  if (!canvas) return

  destoryChart('chartSingleFeedbackSummaryLast30Days')

  const last30Days = getLastNDates(30, 'asc')
  const data = getFeedbacksData(last30Days)

  initLineChart(canvas, {
    id: 'chartSingleFeedbackSummaryLast30Days',
    title: 'Last 30 days',
    xAxisLabels: last30Days.map(formatDateToDateAndMonth),
    data,
  })
}

function getFeedbacksData(dates: Date[]): number[] {
  const feedbacksLastNDays = new Map<string, number>()

  dates.forEach((date) => feedbacksLastNDays.set(date.toDateString(), 0))

  const affectedFeedbacks = feedbacks.value.filter((f) => f.feedbackSummaryId === selectedFeedbackSummaryId.value)

  affectedFeedbacks.forEach((feedback) => {
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
