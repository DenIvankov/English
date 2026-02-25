export type MatchingDifficulty = "starter" | "sprint" | "expert" | "custom";

export type MatchingGameConfig = {
  difficulty: MatchingDifficulty;
  difficultyLabel: string;
  bookIds: number[];
  roundTimeSeconds: number | null;
  showTranslationsPool: boolean;
};

export type MatchingRoundWord = {
  slotId: string;
  tokenId: string;
  english: string;
  translation: string;
};