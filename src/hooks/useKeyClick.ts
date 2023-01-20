import { useEffect } from "react";
import { keys, KeyType } from "src/constant/keyboard";

interface KeyEvent {
  key: KeyType;
  keyEvent: (event: KeyboardEvent) => void;
}

interface Props {
  events: KeyEvent[];
}

const useKeyClick = ({ events }: Props) => {
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
