import { useEffect, useRef, useState } from "react";
import { IconPlayerPlayFilled, IconRepeat } from "@tabler/icons-react";

type WordAudioProps = {
  audio: string;
  audioMeaning: string;
  audioExample: string;
  resolveMediaUrl: (path: string) => string;
};

function WordAudio({
  audio,
  audioMeaning,
  audioExample,
  resolveMediaUrl,
}: WordAudioProps) {
  const [active, setActive] = useState<string | null>(null);
  const [playedMain, setPlayedMain] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.currentTime = 0;
      }
    };
  }, []);

  const playAudio = (path: string) => {
    if (!path) return;
    if (!audioRef.current) {
      audioRef.current = new Audio();
    }

    const audioPlayer = audioRef.current;
    audioPlayer.pause();
    audioPlayer.currentTime = 0;
    audioPlayer.src = resolveMediaUrl(path);
    audioPlayer.onended = () => {
      setActive(null);
      if (path === audio) {
        setPlayedMain(true);
      }
    };

    setActive(path);
    void audioPlayer.play().catch(() => {
      setActive(null);
    });

    if (path !== audio) {
      setPlayedMain(false);
    }
  };

  return (
    <div className="word-audio">
      <button
        type="button"
        onClick={() => playAudio(audio)}
        className={`word-audio__primary ${active === audio ? "is-playing" : ""}`}
        disabled={!audio}
      >
        <span className="word-audio__icon" aria-hidden="true">
          {playedMain ? (
            <IconRepeat size={14} stroke={2.2} />
          ) : (
            <IconPlayerPlayFilled size={12} />
          )}
        </span>
        <span className="word-audio__label">
          {playedMain ? "Repeat audio" : "Play audio"}
        </span>
      </button>

      <div className="word-audio__secondary">
        <button
          type="button"
          onClick={() => playAudio(audioMeaning)}
          className={active === audioMeaning ? "is-playing" : undefined}
          disabled={!audioMeaning}
        >
          Meaning
        </button>
        <button
          type="button"
          onClick={() => playAudio(audioExample)}
          className={active === audioExample ? "is-playing" : undefined}
          disabled={!audioExample}
        >
          Example
        </button>
      </div>
    </div>
  );
}

export default WordAudio;
