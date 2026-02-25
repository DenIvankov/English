import { useDroppable } from "@dnd-kit/core";
import type { ReactNode } from "react";

type MatchDropSlotProps = {
  id: string;
  children?: ReactNode;
  state?: "default" | "correct" | "wrong";
};

function MatchDropSlot({ id, children, state = "default" }: MatchDropSlotProps) {
  const { isOver, setNodeRef } = useDroppable({ id });

  return (
    <div
      ref={setNodeRef}
      className={`match-drop-slot${isOver ? " is-over" : ""}${state !== "default" ? ` is-${state}` : ""}`}
    >
      {children}
    </div>
  );
}

export default MatchDropSlot;
