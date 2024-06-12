<template>
  <div class="rounded-lg bg-[#0e1116] px-3 py-2 shadow-lg">
    <div class="flex items-center gap-2 text-sm text-white *:flex *:items-center *:gap-1 *:rounded *:px-1 *:py-0.5">
      <button
        :class="visibleTab === 0 ? 'bg-secondary' : 'hover:bg-secondary'"
        @click="visibleTab = 0"
      >
        <IconJavaScript />

        Vanilla
      </button>

      <button
        :class="visibleTab === 1 ? 'bg-secondary' : 'hover:bg-secondary'"
        @click="visibleTab = 1"
      >
        <IconVue />

        Vue
      </button>

      <button
        :class="visibleTab === 2 ? 'bg-secondary' : 'hover:bg-secondary'"
        @click="visibleTab = 2"
      >
        <IconReact />

        React
      </button>

      <!--
        <button @click="visibleTab = 3">
          <IconAngular md />
        </button>
      -->
    </div>

    <hr class="my-3" />

    <div
      id="codeGroup"
      class="text-sm *:hidden"
    >
      <ContentSlot :use="$slots.default" />
    </div>
  </div>
</template>

<script setup lang="ts">
const site = (await useSite()).value!
const visibleTab = ref<number>(0)

onMounted(updateVisibility)
watch(visibleTab, updateVisibility)

function updateVisibility(): void {
  const children = document.getElementById('codeGroup')!.children

  const tabs = [...children] as HTMLPreElement[]

  tabs.forEach((tab, index) => {
    if (index === visibleTab.value) {
      setSiteId()
      tab.style.display = 'block'
      tab.style.borderRadius = '8px'
      return
    }

    tab.style.display = 'none'
  })
}

function setSiteId(): void {
  const currentTab = getCurrentTab()

  const codeElement = currentTab.children.item(0)
  codeElement!.innerHTML = codeElement!.innerHTML.replace('--SITEID--', site.id)
}

function getCurrentTab(): HTMLPreElement {
  const children = document.getElementById('codeGroup')!.children
  const tabs = [...children] as HTMLPreElement[]
  const currentTab = tabs[visibleTab.value]

  return currentTab
}
</script>
