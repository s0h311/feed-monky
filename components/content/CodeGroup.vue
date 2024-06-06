<template>
  <div class="rounded-lg border-2 bg-[#0e1116] px-4 py-3">
    <div class="flex items-center gap-5">
      <button @click="visibleTab = 0">
        <IconJavaScript
          fill-color="fill-white"
          md
        />
      </button>

      <button @click="visibleTab = 1">
        <IconVue
          fill-color="fill-white"
          md
        />
      </button>

      <button @click="visibleTab = 2">
        <IconReact
          fill-color="fill-white"
          md
        />
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

onMounted(() => updateVisibility())
watch(visibleTab, () => updateVisibility())

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
  const children = document.getElementById('codeGroup')!.children
  const tabs = [...children] as HTMLPreElement[]
  const currentTab = tabs[visibleTab.value]

  const codeElement = currentTab.children.item(0)
  codeElement!.innerHTML = codeElement!.innerHTML.replace('--SITEID--', site.id)
}
</script>
