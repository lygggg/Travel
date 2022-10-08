import { useState, useEffect, MouseEvent } from "react";

export const useDetectOutsideClick = (
  el: { current: HTMLElement | null },
  initialState: boolean,
) => {
  const [isOpen, setIsOpen] = useState(initialState);

  useEffect(() => {
    const onClick = (e: TouchEvent | MouseEvent): void => {
      if (isOpen && el.current && !el.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    if (isOpen) {
      document.addEventListener("touchstart", onClick);
      document.addEventListener("mousedown", onClick as EventListener);
    }
    return () => {
      document.removeEventListener("touchstart", onClick);
      document.removeEventListener("mousedown", onClick as EventListener);
    };
  }, [isOpen, el]);

  return [isOpen, setIsOpen] as const;
};
