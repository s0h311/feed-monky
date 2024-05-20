<template>
  <h1 class="mb-10 text-xl">Feedback Summaries</h1>

  <table>
    <thead>
      <tr>
        <th>Id</th>
        <th>Summary</th>
        <th>Count</th>
        <th>Date</th>
      </tr>
    </thead>

    <tbody>
      <tr
        v-for="feedbackSummary in feedbackSummaries"
        :key="feedbackSummary.id"
      >
        <td>{{ feedbackSummary.id }}</td>
        <td>{{ feedbackSummary.summary }}</td>
        <td>{{ getCount(feedbackSummary.id) }}</td>
        <td>{{ formatDate(new Date(feedbackSummary.createdAt)) }}</td>
      </tr>
    </tbody>
  </table>
</template>

<script setup lang="ts">
import type { FeedbackSummary } from '~/types/types'

const feedbacks = await useFeedbacks()
const feedbackSummaries = await useFeedbackSummaries()

function getCount(feedbackSummaryId: FeedbackSummary['id']): number {
  let count = 0

  feedbacks.value.forEach((f) => {
    if (f.feedbackSummaryId === feedbackSummaryId) count++
  })

  return count
}
</script>
