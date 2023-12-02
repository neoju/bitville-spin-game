<template>
  <li :class="{ 'order-1': rank != 2 }" class="leaderboard__list__item">
    <div
      :class="{ 'text-white': rank == 1 }"
      class="flex items-center grow gap-x-2 p-2"
    >
      <span>{{ rank }}.</span>

      <img class="w-9 h-9 rounded-full" :src="data.userAtavar" />

      <span class="grow truncate md:overflow-visible">{{ data.username }}</span>

      <div class="text-lg text-yellow-400">
        <span class="mdi mdi-star"></span>
        <span class="mdi mdi-star text-2xl -mx-1.5"></span>
        <span class="mdi mdi-star"></span>
      </div>
    </div>
    <div
      class="uppercase bg-secondary-color p-2 text-xs font-bold text-right w-1/3"
    >
      <p class="px-1 bg-white rounded-xl mb-1">{{ data.numOfWin }} wins</p>
      <p class="px-1 bg-white rounded-xl">{{ data.numOfGame }} games</p>
    </div>
  </li>
</template>

<script setup lang="ts">
import type { LeaderboardItem } from "~/stores/game";

defineProps({
  data: {
    type: Object as PropType<LeaderboardItem>,
    required: true,
  },
  rank: Number,
});
</script>

<style lang="scss" scoped>
.leaderboard__list__item {
  @apply flex justify-between items-center overflow-hidden bg-white w-full whitespace-nowrap;

  &:last-of-type {
    @apply rounded-b-lg;
  }

  &:first-of-type {
    width: calc(100% + 0.7rem);
    background-color: var(--primary-color);
    @apply rounded-lg px-[0.35rem];
  }

  &:first-of-type > div:last-of-type {
    background-color: var(--primary-color);
  }

  &:nth-of-type(2) {
    @apply rounded-t-lg;
  }
}
</style>
