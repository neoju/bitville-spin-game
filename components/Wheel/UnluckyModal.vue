<template>
  <div class="relative">
    <v-card class="modal__container max-w-xs mx-auto">
      <v-card-title>
        <span class="mdi mdi-emoticon-sad-outline text-8xl"></span>
        <p>Oh no</p></v-card-title
      >

      <v-card-text>
        <b>Try again.....</b>
        Try out our spin and win game to win one of our exciting prizes.
      </v-card-text>

      <v-card-actions class="flex justify-center">
        <WheelTryAgainButton @click="$emit(`update:visible`)" />
      </v-card-actions>
    </v-card>
  </div>
</template>

<script setup lang="ts">
import type { PieData } from "./types";

defineProps({
  data: Object as PropType<PieData>,
});

defineEmits(["update:visible"]);
</script>

<style scoped>
.modal__container {
  @apply text-center bg-primary-color text-white rounded-3xl py-8;
}
</style>
