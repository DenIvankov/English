import axios from "axios";

type ApiWord = {
  id: number;
  bookId: number;
  word: string;
  wordTranslate: string;
};

type WordsResponse = {
  data?: ApiWord[];
};

type RoundWordSeed = {
  id: string;
  english: string;
  translation: string;
};

function shuffle<T>(arr: T[]): T[] {
  return [...arr].sort(() => Math.random() - 0.5);
}

async function fetchBookWords(bookId: number): Promise<ApiWord[]> {
  const apiBase = (import.meta.env.VITE_API_URL as string) || "/api";
  const response = await axios.get<WordsResponse>(`${apiBase}/words`, {
    params: {
      book: bookId,
      limit: 100,
      page: 1,
    },
  });

  return response.data.data ?? [];
}

export async function getMatchingRoundWords(bookIds: number[], count = 6): Promise<RoundWordSeed[]> {
  const uniqueBooks = Array.from(new Set(bookIds));
  const collections = await Promise.all(uniqueBooks.map((bookId) => fetchBookWords(bookId)));

  const normalized = collections
    .flat()
    .filter((item) => item.word && item.wordTranslate)
    .map((item) => ({
      id: `${item.bookId}:${item.id}`,
      english: item.word.trim(),
      translation: item.wordTranslate.trim(),
    }));

  const uniqueWords = Array.from(new Map(normalized.map((item) => [item.id, item])).values());
  const pool = shuffle(uniqueWords);

  if (pool.length < count) {
    throw new Error("На сервере недостаточно слов для выбранного режима.");
  }

  return pool.slice(0, count);
}
