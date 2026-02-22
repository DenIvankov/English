import { useState } from "react";
import Words from "../Words";
import { wordsStore } from "../../store/wordsStore";

export type LevelCardType = {
  level: string;
  title: string;
  items: string[];
  color: string;
};

type LevelCardsProps = {
  cards: LevelCardType[];
};

function LevelCards({ cards }: LevelCardsProps) {
  const { currentLevel, setCurrentLevel } = wordsStore();

  return (
    <>
      {!currentLevel ? (
        <div className="levels-grid">
          {cards.map((e, index) => (
            <div
              onClick={() => {
                const levelButton = index + 1;
                setCurrentLevel(levelButton);
              }}
              key={index}
              className={`level-card ${index === 5 ? "level-card--light" : ""}`}
              style={{ background: e.color }}
            >
              <div className="level-card__header">
                <span className="level-card__level">{e.level}</span>
                <span className="level-card__title">{e.title}</span>
              </div>

              <ul className="level-card__list">
                {e.items.map((item, i) => (
                  <li key={i}>{item}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      ) : (
        <div className="words-page__words">
          <Words />
        </div>
      )}
    </>
  );
}

export default LevelCards;
