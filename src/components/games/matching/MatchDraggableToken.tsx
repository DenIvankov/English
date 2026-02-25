import { useDraggable } from "@dnd-kit/core";
import { CSS } from "@dnd-kit/utilities";
import type { CSSProperties } from "react";

type MatchDraggableTokenProps = {
  id: string;
  text: string;
  disabled?: boolean;
};

function MatchDraggableToken({ id, text, disabled }: MatchDraggableTokenProps) {
  const { attributes, listeners, setNodeRef, transform, isDragging } = useDraggable({
    id,
    disabled,
  });

  const style: CSSProperties = {
    transform: CSS.Translate.toString(transform),
  };

  return (
    <div
      className={`match-token${isDragging ? " is-dragging" : ""}${disabled ? " is-disabled" : ""}`}
      ref={setNodeRef}
      style={style}
      {...(disabled ? {} : listeners)}
      {...(disabled ? {} : attributes)}
      role="button"
      tabIndex={disabled ? -1 : 0}
      aria-disabled={disabled}
    >
      {text}
    </div>
  );
}

export default MatchDraggableToken;
