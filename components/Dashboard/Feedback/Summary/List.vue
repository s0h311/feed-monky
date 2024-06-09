<template>
  <h1 class="mb-10 text-xl">TODOs</h1>

  <table>
    <thead>
      <tr>
        <th>TODO</th>
        <th>Count</th>
        <th>First occurred at</th>
        <th>Last occurred at</th>
      </tr>
    </thead>

    <tbody>
      <tr
        v-for="feedbackSummary in feedbackSummaries"
        :key="feedbackSummary.id"
      >
        <td>{{ feedbackSummary.summary }}</td>
        <td>{{ getCount(feedbackSummary.id) }}</td>
        <td>{{ formatDate(new Date(feedbackSummary.createdAt)) }}</td>
        <td>{{ formatDate(getLastOccurrence(feedbackSummary.id)) }}</td>
      </tr>
    </tbody>
  </table>
</template>

<script setup lang="ts">
import { differenceInBusinessDays } from 'date-fns'
import type { FeedbackSummary } from '~/server/dataLayer/types'

const feedbacks = await useFeedbacks()
const feedbackSummaries = await useFeedbackSummaries()

function getCount(feedbackSummaryId: FeedbackSummary['id']): number {
  let count = 0

  feedbacks.value.forEach((f) => {
    if (f.feedbackSummaryId === feedbackSummaryId) count++
  })

  return count
}

function getLastOccurrence(feedbackSummaryId: FeedbackSummary['id']): Date {
  const lastFeedback = feedbacks.value
    .filter((f) => f.feedbackSummaryId === feedbackSummaryId)
    .sort((a, b) => differenceInBusinessDays(a.createdAt, b.createdAt))
    .pop()

  if (!lastFeedback) {
    throw logger.error('No feedback found', 'DashboardFeedbackSummaryList - getLastOccurence', true, {
      feedbackSummaryId,
    })
  }

  return new Date(lastFeedback.createdAt)
}
</script>
