<template>
  <div>
    <AppBar class="md:w-screen" />
    <p class="text-center mb-6 md:w-screen">
      <b>Feeling lucky?</b>
      Try out our spin and win game to win one of our exciting prizes.
    </p>

    <Wheel class="mb-4 md:order-1 md:ml-10" />

    <LeaderBoard class="md:mt-4" />
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  middleware: "auth",
});
</script>
