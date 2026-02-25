import {
  DndContext,
  useDraggable,
  useDroppable,
  PointerSensor,
  useSensor,
  useSensors,
  closestCenter,
} from "@dnd-kit/core";
import { CSS } from "@dnd-kit/utilities";
import { useMemo, useState } from "react";

type Word = {
  id: string;
  text: string;
  translate: string;
};

const WORDS: Word[] = [
  { id: "1", text: "Apple", translate: "Яблоко" },
  { id: "2", text: "Dog", translate: "Собака" },
  { id: "3", text: "Sun", translate: "Солнце" },
];

function shuffle<T>(arr: T[]) {
  return [...arr].sort(() => Math.random() - 0.5);
}

/* ================= DRAGGABLE ================= */

function Translation({ id, text }: { id: string; text: string }) {
  const { setNodeRef, listeners, attributes, transform } = useDraggable({ id });

  const style: React.CSSProperties = {
    padding: 8,
    border: "1px solid black",
    borderRadius: 4,
    background: "white",
    cursor: "grab",
    transform: CSS.Translate.toString(transform),
  };

  return (
    <div ref={setNodeRef} {...listeners} {...attributes} style={style}>
      {text}
    </div>
  );
}

/* ================= DROP ZONE ================= */

function DropCell({
  id,
  children,
}: {
  id: string;
  children?: React.ReactNode;
}) {
  const { setNodeRef, isOver } = useDroppable({ id });

  const style: React.CSSProperties = {
    width: 160,
    height: 40,
    border: "2px solid black",
    borderRadius: 6,
    background: isOver ? "#eee" : "white",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  };

  return (
    <div ref={setNodeRef} style={style}>
      {children}
    </div>
  );
}

/* ================= APP ================= */

export default function App() {
  const shuffled = useMemo(() => shuffle(WORDS), []);

  // wordId → translationId | null
  const [answers, setAnswers] = useState<Record<string, string | null>>(
    Object.fromEntries(WORDS.map((w) => [w.id, null])),
  );

  const sensors = useSensors(useSensor(PointerSensor));

  function handleDragEnd(event: any) {
    const overId = event.over?.id;
    const activeId = event.active.id;

    setAnswers((prev) => {
      const updated = { ...prev };

      // Удаляем элемент из всех ячеек
      Object.keys(updated).forEach((key) => {
        if (updated[key] === activeId) {
          updated[key] = null;
        }
      });

      // Если бросили в ячейку слова
      if (overId && updated.hasOwnProperty(overId)) {
        updated[overId] = activeId;
      }

      // Если бросили в pool — он просто остаётся внизу

      return updated;
    });
  }

  const usedIds = Object.values(answers).filter(Boolean) as string[];

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "linear-gradient(135deg, #0f172a, #1e293b)",
        padding: 40,
        color: "white",
        fontFamily: "Arial",
      }}
    >
      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragEnd={handleDragEnd}
      >
        {/* ВЕРХ */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: 40,
            maxWidth: 600,
            margin: "0 auto 60px auto",
          }}
        >
          {/* СЛОВА */}
          <div>
            {WORDS.map((word) => (
              <div
                key={word.id}
                style={{
                  height: 50,
                  display: "flex",
                  alignItems: "center",
                  marginBottom: 25,
                  fontSize: 18,
                }}
              >
                {word.text}
              </div>
            ))}
          </div>

          {/* ЯЧЕЙКИ */}
          <div>
            {WORDS.map((word) => (
              <div key={word.id} style={{ marginBottom: 25 }}>
                <DropCell id={word.id}>
                  {answers[word.id] && (
                    <Translation id={answers[word.id]!} text={word.translate} />
                  )}
                </DropCell>
              </div>
            ))}
          </div>
        </div>

        {/* НИЗ */}
        <div
          style={{
            maxWidth: 600,
            margin: "0 auto",
            padding: 20,
            background: "#1e293b",
            borderRadius: 12,
            display: "flex",
            justifyContent: "center",
            gap: 15,
            flexWrap: "wrap",
          }}
        >
          {shuffled
            .filter((w) => !usedIds.includes(w.id))
            .map((word) => (
              <Translation key={word.id} id={word.id} text={word.translate} />
            ))}
        </div>
      </DndContext>
    </div>
  );
}
