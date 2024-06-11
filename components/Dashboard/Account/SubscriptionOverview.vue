<template>
  <div>
    <h1 class="text-xl">Subscription Overview</h1>

    <table class="table w-fit">
      <tr>
        <th>type</th>
        <td>{{ subscription.type.toUpperCase() }}</td>
      </tr>

      <tr>
        <th>since</th>
        <td>
          {{ formatDate(new Date(subscription.createdAt)) }}
        </td>
      </tr>

      <tr>
        <th>payment period</th>
        <td>{{ subscription.paymentPeriod }}</td>
      </tr>

      <tr>
        <th>last payment</th>
        <td>
          {{ subscription.lastPayment ? formatDate(new Date(subscription.lastPayment)) : 'non yet' }}
        </td>
      </tr>

      <tr v-if="subscription.type === 'trial'">
        <th>trial ends at</th>
        <td>{{ formatDate(addDays(new Date(subscription.createdAt), 14)) }}</td>
      </tr>
    </table>

    <p class="max-w-md text-xs text-gray-500">
      In case you want to change your subscription please contact us via
      <a
        class="text-secondary"
        href="mailto:support@reffect.org"
      >
        support@reffect.org
      </a>
    </p>
  </div>
</template>

<script setup lang="ts">
import { addDays } from 'date-fns'

const subscription = (await useSubscription()).value!
</script>

<style scoped>
th {
  @apply pl-0 pt-0;
}

td {
  @apply pr-0 pt-0;
}

table tr:last-child {
  th,
  td {
    @apply pb-0;
  }
}
</style>
