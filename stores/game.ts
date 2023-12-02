import { ref, computed } from "vue";
import { defineStore } from "pinia";

import { useUserStore, type User } from "./user";
import { useAuthStore } from "./auth";

interface GameRecord {
  userId: User["id"];
  prize: number;
  at: Date;
}

export interface LeaderboardItem {
  username: User["username"];
  userId: User["id"];
  userAtavar: User["avatar"];
  numOfWin: number;
  numOfGame: number;
}

export const useGameStore = defineStore(
  "game",
  () => {
    const { users } = useUserStore();
    const { currentUser } = useAuthStore();
    const gameRecords = ref<GameRecord[]>([]);

    const leaderboard = computed<LeaderboardItem[]>(() => {
      const obj: Record<User["id"], LeaderboardItem> = {};

      users.forEach((u) => {
        obj[u.id] = {
          numOfWin: 0,
          numOfGame: 0,
          username: u.username,
          userId: u.id,
          userAtavar: u.avatar,
        };
      });

      gameRecords.value.forEach((r) => {
        if (typeof r.prize == "number") {
          obj[r.userId].numOfWin += 1;
        }

        obj[r.userId].numOfGame += 1;
      });

      return Object.values(obj)
        .sort((a, b) => b.numOfWin - a.numOfWin)
        .splice(0, 5);
    });

    function saveGameRecord(prize: number) {
      if (!currentUser) {
        throw Error(
          "Don't know why you can spin the wheel, your game record will not be saved!",
        );
      }

      gameRecords.value.push({
        userId: currentUser.id,
        prize,
        at: new Date(),
      });
    }

    return {
      gameRecords,
      leaderboard,
      saveGameRecord,
    };
  },
  {
    persist: true,
  },
);
