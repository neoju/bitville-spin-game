export interface User {
  username: string;
  avatar?: string;
}

export interface GameData {
  wins: number;
  duration: string;
}

export interface DataItem {
  user: User;
  gameData: GameData;
}
