<template>
  <h1 class="mb-10 text-xl">Feedbacks</h1>

  <table>
    <thead>
      <tr>
        <th>Feeback</th>
        <th>TODO</th>
        <th>Customer E-Mail</th>
        <th>From</th>
      </tr>
    </thead>

    <tbody>
      <tr
        v-for="feedback in feedbacks"
        :key="feedback.id"
      >
        <td class="max-w-md">{{ feedback.feedbackText }}</td>
        <td>{{ feedback.feedbackSummaryId ? getFeedbackSummaryText(feedback.feedbackSummaryId) : '-' }}</td>
        <td>{{ feedback.customerEmail ?? '-' }}</td>
        <td>{{ formatDate(new Date(feedback.createdAt)) }}</td>
      </tr>
    </tbody>
  </table>
</template>

<script setup lang="ts">
import type { FeedbackSummary } from '~/server/dataLayer/types'

const feedbacks = await useFeedbacks()
const feedbackSummaries = await useFeedbackSummaries()

function getFeedbackSummaryText(feedbackSummaryId: FeedbackSummary['id']): FeedbackSummary['summary'] {
  const feedbackSummary = feedbackSummaries.value.find((fs) => fs.id === feedbackSummaryId)

  if (!feedbackSummary) {
    logger.error('Cannot find feedbackSummary', 'DashboardFeedbackList', false, { feedbackSummaryId })
    return '-'
  }

  return feedbackSummary.summary
}
</script>
