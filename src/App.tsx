import "./App.css";
import ButtunsNavigation from "./components/buttons/ButtunsNavigation";

function App() {
  return (
    <div className="main-page">
      <div className="main-page__shell">
        <header className="main-page__hero">
          <p className="main-page__eyebrow">Daily English</p>
          <h1>Build fluency with consistent practice</h1>
          <p>
            Short lessons, words and listening sessions in one place. Start with
            what matters today.
          </p>
        </header>

        <section className="main-page__grid" aria-label="Progress overview">
          <article className="main-widget">
            <p className="main-widget__label">Current streak</p>
            <p className="main-widget__value">9 days</p>
          </article>

          <article className="main-widget">
            <p className="main-widget__label">Words learned</p>
            <p className="main-widget__value">427</p>
          </article>

          <article className="main-widget">
            <p className="main-widget__label">Listening score</p>
            <p className="main-widget__value">82%</p>
          </article>
        </section>

        <section className="main-panel">
          <h2>Today plan</h2>
          <ul>
            <li>Repeat 20 words from B1 deck</li>
            <li>Listen to one 10-minute dialog</li>
            <li>Write 5 sentences with new phrases</li>
          </ul>
        </section>
      </div>

      <ButtunsNavigation />
    </div>
  );
}

export default App;
