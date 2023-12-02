<template>
  <v-app id="app">
    <main class="md:flex flex-wrap justify-center overflow-y-scroll">
      <slot />
    </main>
  </v-app>
</template>

<style scoped>
#app {
  background-color: var(--bg-color);
}

main {
  background-color: var(--bg-color);
  max-width: 1024px;

  @apply w-full relative mx-auto p-2 pt-0;
}
</style>
