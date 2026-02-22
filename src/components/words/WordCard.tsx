import { useEffect, useRef, useState } from "react";
import { IconCheck, IconStar } from "@tabler/icons-react";
import WordAudio from "./WordAudio";

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

type WordCardProps = {
  word: WordType;
  isFavorite: boolean;
  isLearned: boolean;
  onToggleFavorite: (word: WordType) => void;
  onToggleLearned: (word: WordType) => void;
  onVanish?: (id: number) => void;
  canVanish?: boolean;
  resolveMediaUrl: (path: string) => string;
};

function WordCard({
  word,
  isFavorite,
  isLearned,
  onToggleFavorite,
  onToggleLearned,
  onVanish,
  canVanish = false,
  resolveMediaUrl,
}: WordCardProps) {
  const [imageFailed, setImageFailed] = useState(false);
  const [isVanishing, setIsVanishing] = useState(false);
  const vanishTimer = useRef<number | null>(null);

  useEffect(() => {
    return () => {
      if (vanishTimer.current) {
        window.clearTimeout(vanishTimer.current);
      }
    };
  }, []);

  return (
    <article className={`word-card ${isVanishing ? "is-vanishing" : ""}`}>
      <div className="word-card__media">
        <img
          src={resolveMediaUrl(word.image)}
          alt={`${word.word} illustration`}
          loading="lazy"
          onError={() => setImageFailed(true)}
          className={imageFailed || !word.image ? "is-hidden" : undefined}
        />
        {imageFailed || !word.image ? (
          <div className="word-card__fallback">
            <span>{word.word}</span>
            <span>{word.wordTranslate}</span>
          </div>
        ) : null}
        <div className="word-card__labels">
          <button
            type="button"
            className={`word-chip word-chip--icon ${isFavorite ? "is-active" : ""}`}
            onClick={() => onToggleFavorite(word)}
            aria-label={
              isFavorite ? "Remove from favorites" : "Add to favorites"
            }
            title={isFavorite ? "Remove from favorites" : "Add to favorites"}
          >
            <IconStar size={18} stroke={2} aria-hidden="true" />
          </button>
          <button
            type="button"
            className={`word-chip word-chip--icon ${isLearned ? "is-active" : ""}`}
            onClick={() => {
              if (canVanish) {
                setIsVanishing(true);
                vanishTimer.current = window.setTimeout(() => {
                  onToggleLearned(word);
                  onVanish?.(word.id);
                }, 520);
              } else {
                onToggleLearned(word);
              }
            }}
            aria-label={isLearned ? "Remove from learned" : "Mark as learned"}
            title={isLearned ? "Remove from learned" : "Mark as learned"}
          >
            <IconCheck size={22} stroke={2} aria-hidden="true" />
          </button>
        </div>
      </div>

      <div className="word-card__body">
        <div className="word-card__header">
          <div>
            <h3 className="word-card__word">{word.word}</h3>
            <p className="word-card__translation">{word.wordTranslate}</p>
          </div>
          <span className="word-card__transcription">{word.transcription}</span>
        </div>

        <WordAudio
          audio={word.audio}
          audioMeaning={word.audioMeaning}
          audioExample={word.audioExample}
          resolveMediaUrl={resolveMediaUrl}
        />

        <div className="word-card__section">
          <p className="word-card__label">Meaning</p>
          <p className="word-card__text">{word.textMeaning}</p>
          <p className="word-card__translation">{word.textMeaningTranslate}</p>
        </div>

        <div className="word-card__section">
          <p className="word-card__label">Example</p>
          <p className="word-card__text">{word.textExample}</p>
          <p className="word-card__translation">{word.textExampleTranslate}</p>
        </div>
      </div>
    </article>
  );
}

export default WordCard;
