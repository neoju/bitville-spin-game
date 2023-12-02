<template>
  <v-btn class="wheel__button" variant="text" @click="$emit(`click`)">
    Try Again
  </v-btn>
</template>

<script setup lang="ts">
defineEmits(["click"]);
</script>

<style scoped>
.wheel__button {
  @apply uppercase text-primary-color bg-yellow-500 font-bold rounded-2xl px-6;
}
</style>
