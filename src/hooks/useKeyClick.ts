import { useEffect } from "react";

type KeyType = "Escape" | "Space";

interface KeyEvent {
  key: KeyType;
  keyEvent: (event: KeyboardEvent) => void;
}

interface KeyboardHandlerProps {
  events: KeyEvent[];
}

const keyMapper: { [key in KeyType]: string } = {
  Escape: "Escape",
  Space: " ",
};

const useKeyClick = ({ events }: KeyboardHandlerProps) => {
  useEffect(() => {
    const keyEvent = (e: KeyboardEvent) => {
      events.forEach(({ key, keyEvent }) => {
        if (e.key === keyMapper[key]) keyEvent(e);
      });
    };

    window.addEventListener("keydown", keyEvent);
    return () => window.removeEventListener("keydown", keyEvent);
  }, [events]);
};

export default useKeyClick;
