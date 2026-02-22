import ButtonsNavigation from "../components/buttons/ButtunsNavigation";
import "../styles/audioPage.css";

function AudioPage() {
  return (
    <div className="audio-page">
      <div className="audio-page__shell">
        <header className="audio-page__hero">
          <p className="audio-page__eyebrow">Audio</p>
          <h1>Listening practice</h1>
          <p>Place playlists, episodes and player widgets here.</p>
        </header>

        <main className="audio-page__main">
          <section className="audio-panel audio-panel--wide" />
          <section className="audio-grid">
            <article className="audio-panel" />
            <article className="audio-panel" />
          </section>
          <section className="audio-panel" />
        </main>
      </div>

      <ButtonsNavigation />
    </div>
  );
}

export default AudioPage;
