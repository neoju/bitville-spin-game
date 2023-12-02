import { ref } from "vue";
import { defineStore } from "pinia";

import { useUserStore, type User } from "./user";

export const useAuthStore = defineStore(
  "auth",
  () => {
    const { addUser, getExistedUser } = useUserStore();
    const currentUser = ref<User | null>(null);

    function create(username: string) {
      const existed = getExistedUser(username);

      if (existed) {
        // NOTE: comment this code to continue the game with used username
        // throw Error("Sorry, that username already exists!");

        currentUser.value = existed;
      } else {
        currentUser.value = {
          username,
          id: Date.now(),
          avatar:
            "https://www.shutterstock.com/image-vector/default-avatar-profile-icon-social-600nw-1677509740.jpg",
        };
      }

      addUser(currentUser.value);
    }

    return {
      currentUser,
      create,
    };
  },
  {
    persist: false,
  },
);
