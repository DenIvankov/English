import axios from "axios";
import { create } from "zustand";
import { persist } from "zustand/middleware";
type WordType = {
  id: number;
  bookId: number;

  word: string;
  wordTranslate: string;
  transcription: string;

  image: string;

  audio: string;
  audioMeaning: string;
  audioExample: string;

  textMeaning: string;
  textMeaningTranslate: string;

  textExample: string;
  textExampleTranslate: string;
};
type wordsStoreType = {
  words: WordType[];
  currentLevel: number | null;
  totalPages: number;
  setCurrentLevel: (level: number) => void;
  clearCurrentLevel: () => void;
  setWords: (words: WordType[]) => void;
  currentPage: number;
  errors: string | null;
  filterMode: "all" | "favorites" | "learned";
  setFilterMode: (mode: "all" | "favorites" | "learned") => void;
  searchValue: string;
  setSearchValue: (value: string) => void;
  favoritesMap: Record<number, WordType>;
  learnedMap: Record<number, WordType>;
  toggleFavorite: (word: WordType) => void;
  toggleLearned: (word: WordType) => void;
  clearFavorites: () => void;
  clearLearned: () => void;
  getWords: () => void;
  setErrors: (err: string) => void;
  setCurrentPage: (page: number) => void;
  setTotalPages: (page: number) => void;
  prevPage: () => void;
  nextPage: () => void;
};
const API_BASE = (import.meta.env.VITE_API_URL as string) || "/api";

export const wordsStore = create<wordsStoreType>()(
  persist(
    (set, get) => ({
      words: [],
      currentLevel: null,
      totalPages: 0,
      currentPage: 1,
      errors: null,
      filterMode: "all",
      searchValue: "",
      favoritesMap: {},
      learnedMap: {},

      getWords: async () => {
        const { currentLevel, currentPage } = get();

        if (!currentLevel) return;

        try {
          const resp = await axios.get(
            `${API_BASE}/words?book=${currentLevel}&limit=20&page=${currentPage}`,
          );

          set({
            words: resp.data.data,
            totalPages: Math.ceil(resp.data.total / 20),
          });
        } catch (err: any) {
          set({ errors: err.message });
        }
      },
      setErrors: (err: string) => set(() => ({ errors: err })),
      setWords: (words) => set(() => ({ words: words })),
      setFilterMode: (mode) => set(() => ({ filterMode: mode })),
      setSearchValue: (value: string) => set(() => ({ searchValue: value })),
      toggleFavorite: (word) =>
        set((state) => {
          const next = { ...state.favoritesMap };
          if (next[word.id]) {
            delete next[word.id];
          } else {
            next[word.id] = word;
          }
          return { favoritesMap: next };
        }),
      toggleLearned: (word) =>
        set((state) => {
          const next = { ...state.learnedMap };
          if (next[word.id]) {
            delete next[word.id];
          } else {
            next[word.id] = word;
          }
          return { learnedMap: next };
        }),
      clearFavorites: () => set(() => ({ favoritesMap: {} })),
      clearLearned: () => set(() => ({ learnedMap: {} })),
      setCurrentLevel: (level: number) =>
        set(() => ({
          currentLevel: level,
          currentPage: 1,
          errors: null,
        })),
      clearCurrentLevel: () =>
        set(() => ({
          currentLevel: null,
          currentPage: 1,
          words: [],
          totalPages: 0,
          errors: null,
          searchValue: "",
          filterMode: "all",
        })),
      setCurrentPage: (page: number) => set(() => ({ currentPage: page })),
      setTotalPages: (total: number) =>
        set(() => ({ totalPages: Math.ceil(total / 20) })),
      prevPage: () =>
        set((state) => ({
          currentPage:
            state.currentPage !== 1 ? state.currentPage - 1 : state.currentPage,
        })),
      nextPage: () =>
        set((state) => ({
          currentPage:
            state.currentPage !== state.totalPages
              ? state.currentPage + 1
              : state.currentPage,
        })),
    }),
    {
      name: "words-store",
      partialize: (state) => ({
        favoritesMap: state.favoritesMap,
        learnedMap: state.learnedMap,
        filterMode: state.filterMode,
        currentLevel: state.currentLevel,
      }),
    },
  ),
);
