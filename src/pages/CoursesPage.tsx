import { IconBrain, IconCards, IconChess, IconMathSymbols, IconPuzzle, IconSparkles } from "@tabler/icons-react";
import { useMemo, useState } from "react";
import ButtonsNavigation from "../components/buttons/ButtunsNavigation";
import GamesGrid from "../components/games/catalog/GamesGrid";
import MatchingGameBoard from "../components/games/matching/MatchingGameBoard";
import MatchingGameSetup from "../components/games/matching/MatchingGameSetup";
import type { MatchingGameConfig } from "../components/games/matching/types";
import "../styles/coursesPage.css";
import "../styles/matchingGame.css";

const gameCatalog = [
  {
    id: "matching",
    title: "Word Matching",
    description: "Match each English word with the correct translation.",
    accent: "matching",
    isAvailable: true,
  },
  {
    id: "sentence-builder",
    title: "Sentence Builder",
    description: "Build complete sentences from shuffled parts.",
    accent: "aqua",
    isAvailable: false,
  },
  {
    id: "memory-flip",
    title: "Memory Flip",
    description: "Find matching card pairs from memory.",
    accent: "amber",
    isAvailable: false,
  },
  {
    id: "listening-duel",
    title: "Listening Duel",
    description: "Quick listening rounds for fast comprehension.",
    accent: "mint",
    isAvailable: false,
  },
  {
    id: "grammar-quest",
    title: "Grammar Quest",
    description: "Grammar missions with level-based challenges.",
    accent: "rose",
    isAvailable: false,
  },
  {
    id: "rapid-fire",
    title: "Rapid Fire",
    description: "Fast rounds to sharpen your response speed.",
    accent: "violet",
    isAvailable: false,
  },
] as const;

type GameId = (typeof gameCatalog)[number]["id"];
type ScreenMode = "catalog" | "setup" | "playing";

function CoursesPage() {
  const [mode, setMode] = useState<ScreenMode>("catalog");
  const [selectedGame, setSelectedGame] = useState<GameId | null>(null);
  const [activeConfig, setActiveConfig] = useState<MatchingGameConfig | null>(null);

  const gameIcons = useMemo(
    () => ({
      matching: <IconPuzzle stroke={1.8} />,
      "sentence-builder": <IconCards stroke={1.8} />,
      "memory-flip": <IconChess stroke={1.8} />,
      "listening-duel": <IconSparkles stroke={1.8} />,
      "grammar-quest": <IconMathSymbols stroke={1.8} />,
      "rapid-fire": <IconBrain stroke={1.8} />,
    }),
    [],
  );

  const handleSelectGame = (gameId: string, isAvailable: boolean) => {
    if (!isAvailable) {
      return;
    }

    const nextGameId = gameId as GameId;
    setSelectedGame(nextGameId);
    if (nextGameId === "matching") {
      setMode("setup");
    }
  };

  const handleStartMatching = (config: MatchingGameConfig) => {
    setActiveConfig(config);
    setMode("playing");
  };

  const handleExitGame = () => {
    setMode("catalog");
    setSelectedGame(null);
    setActiveConfig(null);
  };

  return (
    <div className="courses-page">
      <div className="courses-page__shell">
        <header className="courses-page__hero">
          <p className="courses-page__eyebrow">Learning Arcade</p>
          <h1>Game-Based English Practice</h1>
          <p>
            Choose a mode, train vocabulary in rounds, and track score live.
          </p>
        </header>

        <main className="courses-page__main">
          {mode === "catalog" ? (
            <GamesGrid
              games={gameCatalog.map((game) => ({ ...game, icon: gameIcons[game.id] }))}
              onSelect={handleSelectGame}
            />
          ) : null}

          {mode === "setup" && selectedGame === "matching" ? (
            <MatchingGameSetup
              onBack={() => {
                setMode("catalog");
                setSelectedGame(null);
              }}
              onStart={handleStartMatching}
            />
          ) : null}

          {mode === "playing" && selectedGame === "matching" && activeConfig ? (
            <MatchingGameBoard config={activeConfig} onExit={handleExitGame} />
          ) : null}
        </main>
      </div>

      <ButtonsNavigation />
    </div>
  );
}

export default CoursesPage;