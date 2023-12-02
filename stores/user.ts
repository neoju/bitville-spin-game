import { ref } from "vue";
import { defineStore } from "pinia";

export interface User {
  id: number;
  username: string;
  avatar: string;
}

export const useUserStore = defineStore(
  "user",
  () => {
    const users = ref<User[]>([]);

    function getExistedUser(username: string) {
      return users.value.find((u) => u.username === username);
    }

    function addUser(user: User) {
      users.value.push(user);
    }

    return {
      users,
      getExistedUser,
      addUser,
    };
  },
  {
    persist: true,
  },
);
