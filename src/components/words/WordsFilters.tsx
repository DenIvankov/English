import { IconCheck, IconStar } from "@tabler/icons-react";

type WordsFiltersProps = {
  mode: "all" | "favorites" | "learned";
  onChange: (mode: "all" | "favorites" | "learned") => void;
  favoritesCount: number;
  learnedCount: number;
};

function WordsFilters({
  mode,
  onChange,
  favoritesCount,
  learnedCount,
}: WordsFiltersProps) {
  const handleToggle = (next: "favorites" | "learned") => {
    onChange(mode === next ? "all" : next);
  };

  return (
    <div className="words-filters" aria-label="Word filters">
      <button
        type="button"
        className={`words-filters__btn ${mode === "favorites" ? "is-active" : ""}`}
        onClick={() => handleToggle("favorites")}
        title={mode === "favorites" ? "Show all words" : "Show favorites"}
        aria-pressed={mode === "favorites"}
      >
        <IconStar size={18} stroke={2} aria-hidden="true" />
        <span>Favorites</span>
        <span className="words-filters__count">{favoritesCount}</span>
      </button>
      <button
        type="button"
        className={`words-filters__btn ${mode === "learned" ? "is-active" : ""}`}
        onClick={() => handleToggle("learned")}
        title={mode === "learned" ? "Show all words" : "Show learned"}
        aria-pressed={mode === "learned"}
      >
        <IconCheck size={18} stroke={2} aria-hidden="true" />
        <span>Learned</span>
        <span className="words-filters__count">{learnedCount}</span>
      </button>
    </div>
  );
}

export default WordsFilters;
