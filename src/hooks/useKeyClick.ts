import { useEffect } from "react";

type KeyType = "Escape" | "Space";

interface KeyEvent {
  key: KeyType;
  keyEvent: (event: KeyboardEvent) => void;
}

interface KeyboardHandlerProps {
  events: KeyEvent[];
}

const keys = {
  Space: " ",
  Enter: "Enter",
  Escape: "Escape",
  Backspace: "Backspace",
  Delete: "Delete",

  ArrowLeft: "ArrowLeft",
  ArrowUp: "ArrowUp",
  ArrowRight: "ArrowRight",
  ArrowDown: "ArrowDown",

  Home: "Home",
  End: "End",

  PageUp: "PageUp",
  PageDown: "PageDown",

  Tab: "Tab",
} as const;

const useKeyClick = ({ events }: KeyboardHandlerProps) => {
  useEffect(() => {
    const keyEvent = (e: KeyboardEvent) => {
      events.forEach(({ key, keyEvent }) => {
        if (e.key === keys[key]) keyEvent(e);
      });
    };

    window.addEventListener("keydown", keyEvent);
    return () => window.removeEventListener("keydown", keyEvent);
  }, [events]);
};

export default useKeyClick;
