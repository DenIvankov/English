import ButtonsNavigation from "../components/buttons/ButtunsNavigation";
import "../styles/wordsPage.css";
import "../styles/levelCard.css";
import LevelCards from "../components/cards/LevelCards";
import { wordsStore } from "../store/wordsStore";

function WordsPage() {
  const { currentLevel } = wordsStore();

  const levels = [
    {
      level: "A1",
      title: "Elementary",
      items: ["100 words", "Basic grammar", "Simple phrases"],
      color: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
    },
    {
      level: "A2",
      title: "Pre-Intermediate",
      items: ["300 words", "Verb tenses", "Dialogs"],
      color: "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)",
    },
    {
      level: "B1",
      title: "Intermediate",
      items: ["600 words", "Complex structures", "Listening"],
      color: "linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)",
    },
    {
      level: "B2",
      title: "Upper-Intermediate",
      items: ["1000 words", "Business English", "Essays"],
      color: "linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)",
    },
    {
      level: "C1",
      title: "Advanced",
      items: ["1500 words", "Academic language", "Debates"],
      color: "linear-gradient(135deg, #fa709a 0%, #fee140 100%)",
    },
    {
      level: "C2",
      title: "Proficiency",
      items: ["2000+ words", "Native-level fluency", "Professional speech"],
      color: "linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)",
    },
  ];

  return (
    <div className="words-page">
      <div className="words-page__shell">
        <header className="words-page__header">
          <div className="words-page__headline">
            <p className="words-page__eyebrow">Daily English</p>
            <h1>Wordspace</h1>
            <p>
              {currentLevel
                ? "Deep dive into curated vocabulary with examples, audio and quick actions."
                : "Pick a level to unlock the full word library and start practicing today."}
            </p>
          </div>
        </header>

        <main className="words-page__main">
          <div className="content-block">
            <LevelCards cards={levels} />
          </div>
        </main>
      </div>

      <ButtonsNavigation />
    </div>
  );
}

export default WordsPage;
