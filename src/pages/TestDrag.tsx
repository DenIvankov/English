import { useState } from "react";

type WordsType = {
  id: string;
  text: string;
  translate: string;
  bgColor: string;
};
type AnswerType = {
  [wordID: string]: string;
};
const words: WordsType[] = [
  { id: "1", text: "one", translate: "один", bgColor: "#dd1aa3" },
  { id: "2", text: "two", translate: "два", bgColor: "#17cc2c" },
  { id: "3", text: "three", translate: "три", bgColor: "#07a5e8" },
  { id: "4", text: "four", translate: "четыре", bgColor: "#fe126d" },
  { id: "5", text: "five", translate: "пять", bgColor: "#e87807" },
];

function TestDrag() {
  const [shuffledTranslations] = useState(() =>
    [...words].sort(() => Math.random() - 0.5),
  );

  const [selectedTranslations, setSelectedTranslations] = useState<AnswerType>(
    {},
  );

  const usedTranslationIds = Object.values(selectedTranslations);

  const [showIncompleteError, setShowIncompleteError] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isAllCorrect, setIsAllCorrect] = useState(false);

  return (
    <div style={{ display: "block" }}>
      <div style={{ display: "flex", gap: "100px", marginBottom: "100px" }}>
        {/* Левая колонка — слова */}
        <div style={{ border: "1px solid red" }}>
          {words.map((word) => (
            <div
              key={word.id}
              style={{
                background: word.bgColor,
                textAlign: "center",
                marginBottom: "10px",
                border: "1px solid white",
                width: "20vw",
                height: "30px",
              }}
            >
              {word.text}
            </div>
          ))}
        </div>

        {/* Правая колонка — drop зоны */}
        <div>
          {words.map((word) => {
            const selectedTranslationId = selectedTranslations[word.id];

            let background = "white";

            if (isSubmitted && selectedTranslationId) {
              background = word.id === selectedTranslationId ? "green" : "red";
            }

            return (
              <div
                key={word.id}
                onDragOver={(e) => e.preventDefault()}
                onDrop={(event) => {
                  const droppedTranslationId =
                    event.dataTransfer.getData("text/plain");

                  setSelectedTranslations((prev) => {
                    const updated = { ...prev };

                    // удаляем перевод из других зон (переезд)
                    Object.keys(updated).forEach((key) => {
                      if (updated[key] === droppedTranslationId) {
                        delete updated[key];
                      }
                    });

                    updated[word.id] = droppedTranslationId;
                    return updated;
                  });

                  setIsSubmitted(false);
                  setIsAllCorrect(false);
                }}
                style={{
                  textAlign: "center",
                  border: "1px solid white",
                  marginBottom: "10px",
                  width: "20vw",
                  height: "30px",
                  background,
                  color: "black",
                }}
              >
                {selectedTranslationId && (
                  <div
                    draggable
                    onDragStart={(event) => {
                      event.dataTransfer.setData(
                        "text/plain",
                        selectedTranslationId,
                      );
                    }}
                    style={{ cursor: "grab" }}
                  >
                    {
                      words.find((w) => w.id === selectedTranslationId)
                        ?.translate
                    }
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Кнопка проверки */}
        <button
          onClick={() => {
            if (usedTranslationIds.length === words.length) {
              setShowIncompleteError(false);
              setIsSubmitted(true);

              const allCorrect = Object.entries(selectedTranslations).every(
                ([wordId, translationId]) => wordId === translationId,
              );

              setIsAllCorrect(allCorrect);
            } else {
              setShowIncompleteError(true);
            }
          }}
          style={{
            background: "rgb(103, 208, 234)",
            width: "40px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          Проверить
        </button>

        {showIncompleteError && <div>Заполните все ответы</div>}
        {isAllCorrect && <strong>ПОЗДРАВЛЯЕМ!</strong>}
      </div>

      {/* Нижний блок — переводы */}
      <div
        style={{
          border: "1px solid red",
          display: "flex",
          gap: "20px",
          width: "80vw",
        }}
      >
        {shuffledTranslations
          .filter((translation) => !usedTranslationIds.includes(translation.id))
          .map((translation) => (
            <div
              key={translation.id}
              draggable
              onDragStart={(event) => {
                event.dataTransfer.setData("text/plain", translation.id);
              }}
              style={{
                background: translation.bgColor,
                marginBottom: "10px",
                border: "1px solid white",
                width: "20vw",
                height: "30px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                cursor: "grab",
              }}
            >
              {translation.translate}
            </div>
          ))}
      </div>
    </div>
  );
}
export default TestDrag;
