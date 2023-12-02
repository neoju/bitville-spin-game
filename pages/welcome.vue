<template>
  <div class="w-screen h-screen flex justify-center items-center">
    <v-sheet width="300" class="mx-auto">
      <v-form v-model="isFormValid" fast-fail @submit.prevent="createUser">
        <v-text-field
          v-model="username"
          label="User name"
          :rules="rules"
        ></v-text-field>

        <v-btn
          :disabled="!isFormValid"
          type="submit"
          block
          class="mt-2"
          text="Submit"
        ></v-btn>
      </v-form>
    </v-sheet>
  </div>
</template>

<script setup lang="ts">
const username = ref("");
const isFormValid = ref();
const { create } = useAuthStore();

const rules = [
  (v: string) => v.length > 2 || "Username must be at least 3 characters",
];

function createUser() {
  try {
    create(username.value);
    navigateTo("/");
  } catch (error) {
    alert(error);
  }
}
</script>
