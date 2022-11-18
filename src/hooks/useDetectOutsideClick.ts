import { useState, useEffect } from "react";

export const useDetectOutsideClick = (
  el: { current: HTMLElement | null },
  initialState: boolean,
) => {
  const [isActive, setIsActive] = useState(initialState);

  const handleOpen = () => setIsActive((isActive) => !isActive);

  useEffect(() => {
    const onClick = (e: TouchEvent) => {
      if (!el.current?.contains(e.target as Node)) {
        setIsActive((isActive) => !isActive);
      }
    };

    if (isActive) {
      window.addEventListener("click", onClick as EventListener);
    }

    return () => {
      window.removeEventListener("click", onClick as EventListener);
    };
  }, [isActive, el]);

  return [isActive, handleOpen] as const;
};
