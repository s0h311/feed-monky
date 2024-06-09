<template>
  <canvas ref="chartMostPopularFeedbackSummaries" />
</template>

<script setup lang="ts">
import type { FeedbackSummary } from '~/server/dataLayer/types'

const chartMostPopularFeedbackSummaries = ref<HTMLCanvasElement>()
const feedbackSummaries = await useFeedbackSummaries()
const feedbacks = await useFeedbacks()

onMounted(() => initChart())

function initChart(): void {
  if (!chartMostPopularFeedbackSummaries.value) {
    return
  }

  initBarChart(chartMostPopularFeedbackSummaries.value, {
    title: 'Most wanted TODOs',
    data: getMostPopularFeedbackSummaries().map((fs) => fs.count),
    xAxisLabels: getMostPopularFeedbackSummaries().map((fs) => fs.feedbackSummaryText),
  })
}

function getMostPopularFeedbackSummaries(): { feedbackSummaryText: string; count: number }[] {
  const mostPopularFeedbackSummaries: { feedbackSummaryId: FeedbackSummary['id']; count: number }[] = []

  feedbacks.value.forEach((feedback) => {
    if (feedback.feedbackSummaryId === null) {
      return
    }

    const currentFeedbackSummary = mostPopularFeedbackSummaries.find(
      (fs) => fs.feedbackSummaryId === feedback.feedbackSummaryId
    )

    if (currentFeedbackSummary) {
      currentFeedbackSummary.count++
      return
    }

    mostPopularFeedbackSummaries.push({ feedbackSummaryId: feedback.feedbackSummaryId, count: 1 })
  })

  return mostPopularFeedbackSummaries
    .sort((a, b) => a.count - b.count)
    .splice(Math.max(mostPopularFeedbackSummaries.length - 10, 0)) // get last 10 elements
    .map((fs) => {
      const feedbackSummary = feedbackSummaries.value.find(({ id }) => fs.feedbackSummaryId === id)!

      return {
        feedbackSummaryText: feedbackSummary.summary,
        count: fs.count,
      }
    })
}
</script>
