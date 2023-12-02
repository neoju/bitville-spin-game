<template>
  <div>
    <h3 class="text-center text-xl text-white font-bold">Leaderboard</h3>

    <ul class="w-full flex flex-col items-center mx-auto">
      <LeaderBoardListItem
        v-for="(item, index) in leaderboard"
        :key="item.userId"
        :data="item"
        :rank="index + 1"
      />
    </ul>
  </div>
</template>

<script setup lang="ts">
const { leaderboard } = storeToRefs(useGameStore());
</script>
