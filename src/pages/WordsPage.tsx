import React from "react";
import ButtonsNavigation from "../components/buttons/ButtunsNavigation";
import "../styles/wordsPage.css";
import "../styles/levelCard.css";
import LevelCards from "../components/cards/LevelCards";

function WordsPage() {
  const levels = [
    {
      level: "A1",
      title: "Elementary",
      items: ["100 слов", "Базовая грамматика", "Простые фразы"],
      color: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
    },
    {
      level: "A2",
      title: "Pre-Intermediate",
      items: ["300 слов", "Времена глаголов", "Диалоги"],
      color: "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)",
    },
    {
      level: "B1",
      title: "Intermediate",
      items: ["600 слов", "Сложные конструкции", "Аудирование"],
      color: "linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)",
    },
    {
      level: "B2",
      title: "Upper-Intermediate",
      items: ["1000 слов", "Бизнес-английский", "Эссе"],
      color: "linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)",
    },
    {
      level: "C1",
      title: "Advanced",
      items: ["1500 слов", "Академический язык", "Дебаты"],
      color: "linear-gradient(135deg, #fa709a 0%, #fee140 100%)",
    },
    {
      level: "C2",
      title: "Proficiency",
      items: ["2000+ слов", "Носитель языка", "Профессионал"],
      color: "linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)",
    },
  ];
  return (
    <div className="words-page">
      <header className="app-shell-header">
        <div className="search-wrapper">
          <input
            className="search-input"
            type="text"
            placeholder="Введите слово"
          />
        </div>
      </header>

      <main className="app-shell-main">
        <div className="content-block">
          <LevelCards cards={levels} />
        </div>
      </main>

      <footer className="app-shell-footer">
        <ButtonsNavigation />
      </footer>
    </div>
  );
}

export default WordsPage;
