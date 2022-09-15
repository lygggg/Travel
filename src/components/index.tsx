import dynamic from "next/dynamic";
export const Editor = dynamic(() => import("./EditorUi"), {
  ssr: false,
});
