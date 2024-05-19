<template>
  <div>
    <div class="mb-20 grid gap-20 px-5 pt-5 tablet:gap-10 tablet:px-[7%] desktop:px-[10dvw]">
      <HomeNavbarDecider />

      <main>
        <slot />
      </main>
    </div>

    <HomeFooter />
  </div>
</template>
