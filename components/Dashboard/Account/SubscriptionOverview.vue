<template>
  <div>
    <h1 class="text-xl">Subscription Overview</h1>

    <table class="table w-fit">
      <tr>
        <!--TODO save subscription type into database-->
        <th>type</th>
        <td>PRO</td>
      </tr>

      <tr>
        <th>since</th>
        <td>
          {{ formatDate(new Date(subscription.createdAt)) }}
        </td>
      </tr>

      <tr>
        <th>payment period</th>
        <td>{{ subscriptionType }}</td>
      </tr>

      <tr>
        <th>last payment</th>
        <td>
          {{ subscription.lastPayment ? formatDate(new Date(subscription.lastPayment)) : 'non yet' }}
        </td>
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
const subscription = (await useSubscription()).value!

const subscriptionType = computed(() =>
  subscription.type === 'monthly'
    ? 'monthly'
    : subscription.type === 'yearly'
      ? 'yearly'
      : subscription.type === 'lifetime'
        ? 'lifetime'
        : 'error'
)
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
