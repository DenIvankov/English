import { useMemo, useState } from "react";
import type { MatchingDifficulty, MatchingGameConfig } from "./types";

const levelLabels = ["A1", "A2", "B1", "B2", "C1", "C2"];

type MatchingGameSetupProps = {
  onBack: () => void;
  onStart: (config: MatchingGameConfig) => void;
};

function MatchingGameSetup({ onBack, onStart }: MatchingGameSetupProps) {
  const [difficulty, setDifficulty] = useState<MatchingDifficulty>("starter");
  const [customBooks, setCustomBooks] = useState<number[]>([1, 2, 3, 4, 5, 6]);
  const [customTime, setCustomTime] = useState<number>(30);
  const [customShowTranslations, setCustomShowTranslations] = useState(true);

  const configPreview = useMemo(() => {
    if (difficulty === "starter") {
      return {
        difficulty,
        difficultyLabel: "Уровень 1 - Базовый",
        bookIds: [1, 2, 3, 4, 5, 6],
        roundTimeSeconds: null,
        showTranslationsPool: true,
      } satisfies MatchingGameConfig;
    }

    if (difficulty === "sprint") {
      return {
        difficulty,
        difficultyLabel: "Уровень 2 - Скорость",
        bookIds: [3, 4, 5, 6],
        roundTimeSeconds: 30,
        showTranslationsPool: true,
      } satisfies MatchingGameConfig;
    }

    if (difficulty === "expert") {
      return {
        difficulty,
        difficultyLabel: "Уровень 3 - Эксперт",
        bookIds: [5, 6],
        roundTimeSeconds: 30,
        showTranslationsPool: false,
      } satisfies MatchingGameConfig;
    }

    return {
      difficulty,
      difficultyLabel: "Уровень 4 - Пользовательский",
      bookIds: customBooks,
      roundTimeSeconds: customTime,
      showTranslationsPool: customShowTranslations,
    } satisfies MatchingGameConfig;
  }, [customBooks, customShowTranslations, customTime, difficulty]);

  const canStart = configPreview.bookIds.length > 0;

  return (
    <section className="match-setup" aria-label="Настройка игры Matching">
      <div className="match-setup__head">
        <p className="match-setup__eyebrow">Word Matching</p>
        <h2>Выбор сложности</h2>
        <p>Выбери режим и нажми "Начать игру". В раунде всегда 6 слов.</p>
      </div>

      <div className="match-setup__controls">
        <label className="match-field">
          <span>Сложность</span>
          <select
            value={difficulty}
            onChange={(event) =>
              setDifficulty(event.target.value as MatchingDifficulty)
            }
          >
            <option value="starter">
              Уровень 1 - без таймера, с переводами
            </option>
            <option value="sprint">Уровень 2 - 30 сек, книги B1-C2</option>
            <option value="expert">
              Уровень 3 - 30 сек, C1-C2, ввод вручную
            </option>
            <option value="custom">Уровень 4 - пользовательский</option>
          </select>
        </label>

        {difficulty === "custom" ? (
          <div className="match-custom-panel">
            <div className="match-custom-panel__group">
              <p>Книги (A1-C2)</p>
              <div className="match-levels-grid">
                {levelLabels.map((label, index) => {
                  const bookId = index + 1;
                  const checked = customBooks.includes(bookId);
                  return (
                    <label key={label}>
                      <input
                        type="checkbox"
                        checked={checked}
                        onChange={() => {
                          setCustomBooks((prev) => {
                            if (prev.includes(bookId)) {
                              return prev.filter((item) => item !== bookId);
                            }
                            return [...prev, bookId].sort((a, b) => a - b);
                          });
                        }}
                      />
                      <span>{label}</span>
                    </label>
                  );
                })}
              </div>
            </div>

            <div className="match-custom-panel__group">
              <p>Таймер раунда</p>
              <select
                value={customTime}
                onChange={(event) => setCustomTime(Number(event.target.value))}
              >
                <option value={10}>10 сек</option>
                <option value={15}>15 сек</option>
                <option value={20}>20 сек</option>
                <option value={30}>30 сек</option>
                <option value={45}>45 сек</option>
                <option value={60}>1 мин</option>
                <option value={90}>1 мин 30 сек</option>
                <option value={120}>2 мин</option>
              </select>
            </div>

            <div className="match-custom-panel__group">
              <p>Переводы снизу</p>
              <div className="match-toggle-row">
                <button
                  type="button"
                  className={customShowTranslations ? "is-active" : ""}
                  onClick={() => setCustomShowTranslations(true)}
                >
                  Включены
                </button>
                <button
                  type="button"
                  className={!customShowTranslations ? "is-active" : ""}
                  onClick={() => setCustomShowTranslations(false)}
                >
                  Выключены
                </button>
              </div>
            </div>
          </div>
        ) : null}
      </div>

      <div className="match-setup__preview">
        <p>
          <strong>Книги:</strong>{" "}
          {configPreview.bookIds
            .map((bookId) => levelLabels[bookId - 1])
            .join(", ") || "Не выбраны"}
        </p>
        <p>
          <strong>Таймер:</strong>{" "}
          {configPreview.roundTimeSeconds
            ? `${configPreview.roundTimeSeconds} сек`
            : "Выключен"}
        </p>
        <p>
          <strong>Режим ответов:</strong>{" "}
          {configPreview.showTranslationsPool
            ? "Перетаскивание"
            : "Ввод вручную"}
        </p>
      </div>

      <div className="match-setup__actions">
        <button
          type="button"
          className="match-btn match-btn--ghost"
          onClick={onBack}
        >
          К выбору игр
        </button>
        <button
          type="button"
          className="match-btn match-btn--primary"
          onClick={() => onStart(configPreview)}
          disabled={!canStart}
        >
          Начать игру
        </button>
      </div>
    </section>
  );
}

export default MatchingGameSetup;
