import ButtonsNavigation from "../components/buttons/ButtunsNavigation";
import "../styles/coursesPage.css";

function CoursesPage() {
  return (
    <div className="courses-page">
      <div className="courses-page__shell">
        <header className="courses-page__hero">
          <p className="courses-page__eyebrow">Courses</p>
          <h1>Learning tracks</h1>
          <p>Place your course categories and progress blocks here.</p>
        </header>

        <main className="courses-page__main">
          <section className="courses-panel courses-panel--wide" />
          <section className="courses-grid">
            <article className="courses-panel" />
            <article className="courses-panel" />
            <article className="courses-panel" />
          </section>
        </main>
      </div>

      <ButtonsNavigation />
    </div>
  );
}

export default CoursesPage;
