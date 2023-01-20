export const keys = {
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

export type KeyType =
  | "Escape"
  | "Space"
  | "Enter"
  | "Backspace"
  | "Delete"
  | "ArrowLeft"
  | "ArrowUp"
  | "ArrowRight"
  | "ArrowDown"
  | "Home"
  | "End"
  | "PageUp"
  | "PageDown"
  | "Tab";
