<template>
  <div class="relative">
    <v-card class="modal__container max-w-xs mx-auto">
      <v-card-title> Congratulations </v-card-title>

      <v-card-text>
        <b>You have won {{ data?.name }}</b>
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

<style lang="scss" scoped>
.modal__container {
  @apply pt-20 text-center bg-primary-color text-white rounded-3xl relative overflow-visible pb-8;

  &::after {
    content: "";
    width: 266px;
    height: 237px;
    background: url("/congrats.png");
    background-repeat: no-repeat;
    background-position: center center;
    background-size: cover;
    @apply absolute -top-36 left-1/2 -translate-x-1/2;
  }
}
</style>
