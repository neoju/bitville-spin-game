<template>
  <div
    class="sticky pt-1 top-0 flex justify-between text-white z-50"
    style="background-color: var(--bg-color)"
  >
    <AppBarMenuButton />
    <h1 class="text-2xl font-extrabold">{{ title }}</h1>
    <AppBarToggleButton />
  </div>
</template>

<script setup lang="ts">
export interface AppBarProps {
  title?: string;
}

withDefaults(defineProps<AppBarProps>(), {
  title: "Spin & Win",
});
</script>
