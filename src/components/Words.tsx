import { useEffect, useMemo, useState } from "react";
import { wordsStore } from "../store/wordsStore";
import WordCard from "./words/WordCard";
import WordsFilters from "./words/WordsFilters";
import WordsPagination from "./words/WordsPagination";
import { IconTrash } from "@tabler/icons-react";

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

function Words() {
  const apiBase = (import.meta.env.VITE_API_URL as string) || "/api";
  const assetsBase = (import.meta.env.VITE_ASSETS_URL as string) || apiBase;
  const {
    words,
    currentPage,
    prevPage,
    nextPage,
    setCurrentPage,
    totalPages,
    currentLevel,
    errors,
    clearCurrentLevel,
    filterMode,
    setFilterMode,
    searchValue,
    setSearchValue,
    favoritesMap,
    learnedMap,
    toggleFavorite,
    toggleLearned,
    clearFavorites,
    clearLearned,
    getWords,
  } = wordsStore();

  useEffect(() => {
    getWords();
  }, [currentLevel, currentPage, getWords]);

  const [hiddenIds, setHiddenIds] = useState<Record<number, boolean>>({});
  const [showTopPagination, setShowTopPagination] = useState(false);

  useEffect(() => {
    setHiddenIds({});
  }, [currentLevel, filterMode]);

  useEffect(() => {
    const handleScroll = () => {
      setShowTopPagination(window.scrollY > 260);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const filteredWords = useMemo(() => {
    const query = searchValue.trim().toLowerCase();
    const matchQuery = (word: WordType) => {
      if (!query) return true;
      const fields = [
        word.word,
        word.wordTranslate,
        word.transcription,
        word.textMeaning,
        word.textMeaningTranslate,
        word.textExample,
        word.textExampleTranslate,
      ];

      return fields.some((field) =>
        (field || "").toLowerCase().includes(query),
      );
    };

    if (filterMode === "favorites") {
      return Object.values(favoritesMap).filter(matchQuery);
    }

    if (filterMode === "learned") {
      return Object.values(learnedMap).filter(matchQuery);
    }

    return words.filter(matchQuery);
  }, [searchValue, words, filterMode, favoritesMap, learnedMap]);

  const favoritesCount = useMemo(
    () => Object.keys(favoritesMap).length,
    [favoritesMap],
  );

  const learnedCount = useMemo(
    () => Object.keys(learnedMap).length,
    [learnedMap],
  );

  const groupedWords = useMemo(() => {
    if (filterMode === "all") return [];
    const groups = new Map<number, WordType[]>();
    for (const word of filteredWords) {
      const level = word.bookId ?? 0;
      if (!groups.has(level)) {
        groups.set(level, []);
      }
      groups.get(level)!.push(word);
    }

    return Array.from(groups.entries())
      .sort(([a], [b]) => a - b)
      .map(([level, items]) => ({
        level,
        items,
      }));
  }, [filterMode, filteredWords]);

  const handleClearFavorites = () => {
    const confirmed = window.confirm(
      "Clear all favorites? This action cannot be undone.",
    );
    if (confirmed) {
      clearFavorites();
    }
  };

  const handleClearLearned = () => {
    const confirmed = window.confirm(
      "Clear all learned words? This action cannot be undone.",
    );
    if (confirmed) {
      clearLearned();
    }
  };

  const getLevelLabel = (level: number) => {
    const labels = ["A1", "A2", "B1", "B2", "C1", "C2"];
    return labels[level - 1] ?? `Level ${level}`;
  };

  const pages = useMemo(() => {
    if (totalPages <= 7) {
      return Array.from({ length: totalPages }, (_, index) => index + 1);
    }

    const result: Array<number | string> = [1];
    const left = Math.max(2, currentPage - 1);
    const right = Math.min(totalPages - 1, currentPage + 1);

    if (left > 2) {
      result.push("ellipsis-left");
    }

    for (let page = left; page <= right; page += 1) {
      result.push(page);
    }

    if (right < totalPages - 1) {
      result.push("ellipsis-right");
    }

    result.push(totalPages);

    return result;
  }, [currentPage, totalPages]);

  const resolveMediaUrl = (path: string) => {
    if (!path) return "";
    if (path.startsWith("http")) return path;
    const normalizedBase = assetsBase.replace(/\/$/, "");
    let normalizedPath = path.replace(/^\//, "");
    if (normalizedBase.includes("english-files")) {
      normalizedPath = normalizedPath.replace(/^files\//, "");
    }
    return `${normalizedBase}/${normalizedPath}`;
  };

  if (!currentLevel) {
    return null;
  }

  return (
    <section className="words">
      <div className="words-toolbar">
        <div className="words-toolbar__intro">
          <p className="words-toolbar__eyebrow">Wordspace</p>
          <h2 className="words-toolbar__title">Level {currentLevel}</h2>
          <p className="words-toolbar__subtitle">
            {filteredWords.length} words on this page
          </p>
        </div>

        <div className="words-toolbar__search">
          <input
            className="words-search__input"
            type="text"
            value={searchValue}
            onChange={(event) => {
              setSearchValue(event.target.value);
              setCurrentPage(1);
            }}
            placeholder="Search word, translation, or example"
          />
          {searchValue ? (
            <button
              type="button"
              className="words-search__clear"
              onClick={() => setSearchValue("")}
              aria-label="Clear search"
            >
              Clear
            </button>
          ) : null}
        </div>

        <div className="words-toolbar__actions">
          {filterMode === "favorites" ? (
            <button
              type="button"
              className="words-toolbar__trash"
              onClick={handleClearFavorites}
              title="Clear favorites"
              aria-label="Clear favorites"
            >
              <IconTrash size={18} stroke={2} aria-hidden="true" />
            </button>
          ) : null}
          {filterMode === "learned" ? (
            <button
              type="button"
              className="words-toolbar__trash"
              onClick={handleClearLearned}
              title="Clear learned"
              aria-label="Clear learned"
            >
              <IconTrash size={18} stroke={2} aria-hidden="true" />
            </button>
          ) : null}
          <WordsFilters
            mode={filterMode}
            onChange={setFilterMode}
            favoritesCount={favoritesCount}
            learnedCount={learnedCount}
          />
          <button
            type="button"
            className="words-toolbar__ghost"
            onClick={clearCurrentLevel}
          >
            Change level
          </button>
        </div>
      </div>

      <div
        className={`words-pagination__top-float ${
          showTopPagination && totalPages > 1 ? "is-visible" : ""
        }`}
        aria-hidden={!showTopPagination || totalPages <= 1}
      >
        <WordsPagination
          currentPage={currentPage}
          totalPages={totalPages}
          pages={pages}
          onPrev={prevPage}
          onNext={nextPage}
          onSelect={setCurrentPage}
          showMeta={false}
        />
      </div>

      {errors ? <p className="words__error">{errors}</p> : null}

      {filteredWords.length === 0 ? (
        <div className="words-empty">
          <p className="words-empty__title">No matches found</p>
          <p className="words-empty__subtitle">
            Try a different keyword or check another level.
          </p>
        </div>
      ) : filterMode === "all" ? (
        <div className="words-list">
          {filteredWords
            .filter((word) => !hiddenIds[word.id])
            .map((word: WordType) => (
              <WordCard
                key={word.id}
                word={word}
                isFavorite={!!favoritesMap[word.id]}
                isLearned={!!learnedMap[word.id]}
                onToggleFavorite={toggleFavorite}
                onToggleLearned={toggleLearned}
                onVanish={(id) =>
                  setHiddenIds((prev) => ({ ...prev, [id]: true }))
                }
                canVanish={!learnedMap[word.id] && filterMode === "all"}
                resolveMediaUrl={resolveMediaUrl}
              />
            ))}
        </div>
      ) : (
        <div className="words-list">
          {groupedWords.map((group) => (
            <div key={group.level} className="words-group">
              <div className="words-group__title">
                {getLevelLabel(group.level)}
              </div>
              <hr className="words-group__divider" />
              <div className="words-group__items">
                {group.items.map((word) => (
                  <WordCard
                    key={word.id}
                    word={word}
                    isFavorite={!!favoritesMap[word.id]}
                    isLearned={!!learnedMap[word.id]}
                    onToggleFavorite={toggleFavorite}
                    onToggleLearned={toggleLearned}
                    resolveMediaUrl={resolveMediaUrl}
                  />
                ))}
              </div>
            </div>
          ))}
        </div>
      )}

      <div className="words-pagination__sticky">
        <WordsPagination
          currentPage={currentPage}
          totalPages={totalPages}
          pages={pages}
          onPrev={prevPage}
          onNext={nextPage}
          onSelect={setCurrentPage}
        />
      </div>
    </section>
  );
}

export default Words;
