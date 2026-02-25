import type { ReactNode } from "react";
import MatchingGlyph from "./MatchingGlyph";

type GameAccent = "matching" | "aqua" | "amber" | "mint" | "rose" | "violet";

type GameCardType = {
  id: string;
  title: string;
  description: string;
  accent: GameAccent;
  isAvailable: boolean;
  icon: ReactNode;
};

type GamesGridProps = {
  games: GameCardType[];
  onSelect: (gameId: string, isAvailable: boolean) => void;
};

function GamesGrid({ games, onSelect }: GamesGridProps) {
  return (
    <section className="games-grid" aria-label="Game selection">
      {games.map((game) => (
        <article
          key={game.id}
          className={`game-card game-card--${game.accent}${game.isAvailable ? "" : " is-locked"}`}
          onClick={() => onSelect(game.id, game.isAvailable)}
          aria-disabled={!game.isAvailable}
        >
          <div className="game-card__header">
            {game.id === "matching" ? (
              <MatchingGlyph />
            ) : (
              <div className="game-card__icon">{game.icon}</div>
            )}
            <span className={`game-card__badge${game.isAvailable ? " is-live" : ""}`}>
              {game.isAvailable ? "Play" : "Soon"}
            </span>
          </div>

          <h2>{game.title}</h2>
          <p>{game.description}</p>

          <button type="button" className="game-card__button" disabled={!game.isAvailable}>
            {game.isAvailable ? "Open" : "Coming Soon"}
          </button>
        </article>
      ))}
    </section>
  );
}

export default GamesGrid;