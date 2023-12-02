<template>
  <v-app>
    <main class="app md:flex flex-wrap justify-center overflow-y-scroll">
      <slot />
    </main>
  </v-app>
</template>

<style scoped>
main.app {
  background-color: var(--bg-color);
  max-width: 1024px;

  @apply h-screen w-full relative mx-auto p-2 pt-0;
}
</style>
