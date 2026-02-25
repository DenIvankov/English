function MatchingGlyph() {
  return (
    <div className="matching-glyph" aria-hidden="true">
      <div className="matching-glyph__column">
        <span className="matching-glyph__shape matching-glyph__shape--triangle" />
        <span className="matching-glyph__shape matching-glyph__shape--circle" />
        <span className="matching-glyph__shape matching-glyph__shape--star" />
      </div>
      <div className="matching-glyph__path" />
      <div className="matching-glyph__column">
        <span className="matching-glyph__shape matching-glyph__shape--star" />
        <span className="matching-glyph__shape matching-glyph__shape--diamond" />
        <span className="matching-glyph__shape matching-glyph__shape--hex" />
      </div>
    </div>
  );
}

export default MatchingGlyph;