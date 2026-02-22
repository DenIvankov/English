import React, { useEffect, useRef, useState } from "react";

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
    void audioPlayer.play();
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
      >
        <span className="word-audio__icon" aria-hidden="true">
          {playedMain ? "↻" : "▶"}
        </span>
        {playedMain ? "Repeat audio" : "Play audio"}
      </button>
      <div className="word-audio__secondary">
        <button
          type="button"
          onClick={() => playAudio(audioMeaning)}
          className={active === audioMeaning ? "is-playing" : undefined}
        >
          Meaning
        </button>
        <button
          type="button"
          onClick={() => playAudio(audioExample)}
          className={active === audioExample ? "is-playing" : undefined}
        >
          Example
        </button>
      </div>
    </div>
  );
}

export default WordAudio;
