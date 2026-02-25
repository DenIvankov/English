import {
  DndContext,
  PointerSensor,
  TouchSensor,
  closestCenter,
  type DragEndEvent,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import { useCallback, useEffect, useMemo, useState } from "react";
import { getMatchingRoundWords } from "../../../services/matchingGameService";
import MatchDraggableToken from "./MatchDraggableToken";
import MatchDropSlot from "./MatchDropSlot";
import type { MatchingGameConfig, MatchingRoundWord } from "./types";

type RoundOutcome = "success" | "failed" | "timeout" | null;
type CheckMap = Record<string, boolean>;

type MatchingGameBoardProps = {
  config: MatchingGameConfig;
  onExit: () => void;
};

function shuffle<T>(arr: T[]): T[] {
  return [...arr].sort(() => Math.random() - 0.5);
}

function normalizeText(value: string): string {
  return value.trim().toLowerCase().replace(/\s+/g, " ");
}

function formatTime(seconds: number): string {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${mins}:${String(secs).padStart(2, "0")}`;
}

function MatchingGameBoard({ config, onExit }: MatchingGameBoardProps) {
  const [round, setRound] = useState(1);
  const [score, setScore] = useState(0);
  const [roundWords, setRoundWords] = useState<MatchingRoundWord[]>([]);
  const [assignments, setAssignments] = useState<Record<string, string | null>>({});
  const [typedAnswers, setTypedAnswers] = useState<Record<string, string>>({});
  const [checkMap, setCheckMap] = useState<CheckMap | null>(null);
  const [validationError, setValidationError] = useState<string | null>(null);
  const [status, setStatus] = useState<"loading" | "active" | "checked">("loading");
  const [outcome, setOutcome] = useState<RoundOutcome>(null);
  const [message, setMessage] = useState<string>("");
  const [timeLeft, setTimeLeft] = useState<number | null>(config.roundTimeSeconds);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: { distance: 6 },
    }),
    useSensor(TouchSensor, {
      activationConstraint: { delay: 100, tolerance: 6 },
    }),
  );

  const tokenMap = useMemo(
    () => Object.fromEntries(roundWords.map((word) => [word.tokenId, word.translation])),
    [roundWords],
  );

  const loadRound = useCallback(async () => {
    setStatus("loading");
    setValidationError(null);
    setCheckMap(null);
    setOutcome(null);
    setMessage("");

    try {
      const words = await getMatchingRoundWords(config.bookIds, 6);
      const prepared: MatchingRoundWord[] = words.map((word, index) => ({
        slotId: `slot-${index + 1}`,
        tokenId: `token-${index + 1}-${word.id}`,
        english: word.english,
        translation: word.translation,
      }));

      setRoundWords(prepared);
      setAssignments(Object.fromEntries(prepared.map((word) => [word.slotId, null])));
      setTypedAnswers(Object.fromEntries(prepared.map((word) => [word.slotId, ""])));
      setTimeLeft(config.roundTimeSeconds);
      setStatus("active");
    } catch (error) {
      const fallback = "Не удалось загрузить слова для раунда.";
      const errorMessage = error instanceof Error ? error.message : fallback;
      setStatus("checked");
      setOutcome("failed");
      setMessage(errorMessage || fallback);
    }
  }, [config.bookIds, config.roundTimeSeconds]);

  const resetCurrentRound = useCallback(() => {
    if (!roundWords.length) {
      return;
    }

    setAssignments(Object.fromEntries(roundWords.map((word) => [word.slotId, null])));
    setTypedAnswers(Object.fromEntries(roundWords.map((word) => [word.slotId, ""])));
    setCheckMap(null);
    setValidationError(null);
    setOutcome(null);
    setMessage("");
    setTimeLeft(config.roundTimeSeconds);
    setStatus("active");
  }, [config.roundTimeSeconds, roundWords]);

  useEffect(() => {
    loadRound();
  }, [loadRound]);

  useEffect(() => {
    if (status !== "active" || timeLeft === null) {
      return;
    }

    if (timeLeft <= 0) {
      const timeoutMap = Object.fromEntries(roundWords.map((word) => [word.slotId, false]));
      setCheckMap(timeoutMap);
      setStatus("checked");
      setOutcome("timeout");
      setMessage("Время вышло. Попробуй раунд заново.");
      return;
    }

    const timerId = window.setTimeout(() => {
      setTimeLeft((prev) => (prev === null ? prev : prev - 1));
    }, 1000);

    return () => window.clearTimeout(timerId);
  }, [roundWords, status, timeLeft]);

  const usedTokenIds = useMemo(
    () => new Set(Object.values(assignments).filter((item): item is string => Boolean(item))),
    [assignments],
  );

  const availableTokens = useMemo(() => {
    if (!config.showTranslationsPool) {
      return [];
    }

    return shuffle(
      roundWords
        .map((word) => ({ id: word.tokenId, text: word.translation }))
        .filter((token) => !usedTokenIds.has(token.id)),
    );
  }, [config.showTranslationsPool, roundWords, usedTokenIds]);

  const applyCheckResult = (result: CheckMap, didPass: boolean, mode: RoundOutcome) => {
    setCheckMap(result);
    setStatus("checked");
    setOutcome(mode);

    if (didPass) {
      setScore((prev) => prev + roundWords.length);
      setMessage("Отлично! Раунд пройден без ошибок.");
      return;
    }

    if (mode === "timeout") {
      setMessage("Время вышло. Попробуй раунд заново.");
      return;
    }

    setMessage('Есть ошибки. Нажми "Начать заново" и попробуй еще раз.');
  };

  const handleCheck = () => {
    if (status !== "active") {
      return;
    }

    setValidationError(null);

    if (config.showTranslationsPool) {
      const hasEmpty = roundWords.some((word) => !assignments[word.slotId]);
      if (hasEmpty) {
        setValidationError("Пожалуйста, заполните все ответы перед проверкой.");
        return;
      }

      const result = Object.fromEntries(
        roundWords.map((word) => [word.slotId, assignments[word.slotId] === word.tokenId]),
      );

      const didPass = Object.values(result).every(Boolean);
      applyCheckResult(result, didPass, didPass ? "success" : "failed");
      return;
    }

    const hasEmpty = roundWords.some((word) => !typedAnswers[word.slotId]?.trim());
    if (hasEmpty) {
      setValidationError("Пожалуйста, введите перевод для каждого слова.");
      return;
    }

    const result = Object.fromEntries(
      roundWords.map((word) => [
        word.slotId,
        normalizeText(typedAnswers[word.slotId] ?? "") === normalizeText(word.translation),
      ]),
    );

    const didPass = Object.values(result).every(Boolean);
    applyCheckResult(result, didPass, didPass ? "success" : "failed");
  };

  const handleDragEnd = ({ active, over }: DragEndEvent) => {
    if (status !== "active" || !config.showTranslationsPool) {
      return;
    }

    const activeTokenId = String(active.id);
    const overId = over?.id ? String(over.id) : null;

    setAssignments((prev) => {
      const next = { ...prev };
      const currentSlot = Object.entries(next).find(([, tokenId]) => tokenId === activeTokenId)?.[0] ?? null;

      if (currentSlot) {
        next[currentSlot] = null;
      }

      if (!overId) {
        if (currentSlot) {
          next[currentSlot] = activeTokenId;
        }
        return next;
      }

      if (overId === "pool-dropzone") {
        return next;
      }

      if (!overId.startsWith("slot:")) {
        if (currentSlot) {
          next[currentSlot] = activeTokenId;
        }
        return next;
      }

      const targetSlot = overId.replace("slot:", "");
      if (!(targetSlot in next)) {
        if (currentSlot) {
          next[currentSlot] = activeTokenId;
        }
        return next;
      }

      const existing = next[targetSlot];
      if (existing && currentSlot) {
        next[currentSlot] = existing;
      }

      next[targetSlot] = activeTokenId;
      return next;
    });
  };

  const primaryActionLabel =
    status === "active"
      ? "Проверить"
      : outcome === "success"
        ? "Следующий раунд"
        : "Начать заново";

  const handlePrimaryAction = () => {
    if (status === "active") {
      handleCheck();
      return;
    }

    if (outcome === "success") {
      setRound((prev) => prev + 1);
      loadRound();
      return;
    }

    if (!roundWords.length) {
      loadRound();
      return;
    }

    resetCurrentRound();
  };

  return (
    <section className="matching-game" aria-label="Игра Word Matching">
      <header className="matching-game__topbar">
        <div className="matching-chip">Раунд: {round}</div>
        <div className="matching-chip">Счет: {score}</div>
        <div className="matching-chip">Режим: {config.difficultyLabel}</div>
        {timeLeft !== null ? <div className="matching-chip is-timer">Таймер: {formatTime(timeLeft)}</div> : null}
      </header>

      <div className="matching-game__body">
        <DndContext
          sensors={sensors}
          collisionDetection={closestCenter}
          onDragEnd={handleDragEnd}
        >
          <div className="matching-grid">
            <div className="matching-grid__col">
              {roundWords.map((word, index) => (
                <div key={word.slotId} className="matching-row matching-row--word">
                  <span className="matching-row__index">{index + 1}</span>
                  <span>{word.english}</span>
                </div>
              ))}
            </div>

            <div className="matching-grid__col">
              {roundWords.map((word) => {
                const cellState =
                  checkMap && checkMap[word.slotId] !== undefined
                    ? checkMap[word.slotId]
                      ? "correct"
                      : "wrong"
                    : "default";

                const assignedTokenId = assignments[word.slotId];
                return (
                  <div key={word.slotId} className="matching-row">
                    <MatchDropSlot id={`slot:${word.slotId}`} state={cellState}>
                      {config.showTranslationsPool ? (
                        assignedTokenId ? (
                          <MatchDraggableToken
                            id={assignedTokenId}
                            text={tokenMap[assignedTokenId]}
                            disabled={status !== "active"}
                          />
                        ) : (
                          <span className="match-drop-slot__placeholder">Перевод</span>
                        )
                      ) : (
                        <input
                          type="text"
                          value={typedAnswers[word.slotId] ?? ""}
                          onChange={(event) =>
                            setTypedAnswers((prev) => ({
                              ...prev,
                              [word.slotId]: event.target.value,
                            }))
                          }
                          disabled={status !== "active"}
                          placeholder="Введите перевод"
                          className={`matching-input${cellState !== "default" ? ` is-${cellState}` : ""}`}
                        />
                      )}
                    </MatchDropSlot>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="matching-translations-wrap">
            <p className="matching-translations__title">Переводы</p>

            {config.showTranslationsPool ? (
              <MatchDropSlot id="pool-dropzone">
                <div className="matching-translations">
                  {availableTokens.map((token) => (
                    <MatchDraggableToken
                      key={token.id}
                      id={token.id}
                      text={token.text}
                      disabled={status !== "active"}
                    />
                  ))}
                </div>
              </MatchDropSlot>
            ) : (
              <div className="matching-translations matching-translations--empty">
                {Array.from({ length: 6 }).map((_, index) => (
                  <span key={`empty-${index}`} className="matching-translations__ghost-cell" />
                ))}
              </div>
            )}
          </div>

        </DndContext>
      </div>

      {validationError ? <p className="matching-game__error">{validationError}</p> : null}
      {message ? <p className={`matching-game__message${outcome === "success" ? " is-success" : ""}`}>{message}</p> : null}

      <footer className="matching-game__actions">
        <button type="button" className="match-btn match-btn--danger" onClick={onExit}>
          Закончить игру
        </button>

        <button
          type="button"
          className="match-btn match-btn--primary"
          onClick={handlePrimaryAction}
          disabled={status === "loading"}
        >
          {status === "loading" ? "Загрузка..." : primaryActionLabel}
        </button>
      </footer>
    </section>
  );
}

export default MatchingGameBoard;
