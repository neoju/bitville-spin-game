<template>
  <button class="text-2xl" @click="allowedMusic = !allowedMusic">
    <span v-if="allowedMusic" class="mdi mdi-volume-medium"></span>
    <span v-else class="mdi mdi-volume-mute"></span>
  </button>
</template>

<script setup lang="ts">
const allowedMusic = ref(true);

watch(allowedMusic, (val) => {
  music.spinning.mute(!val);
  music.winning.mute(!val);
});
</script>
