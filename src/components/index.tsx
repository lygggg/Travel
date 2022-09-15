import dynamic from "next/dynamic";
export const EditorBox = dynamic(() => import("./EditorBox"), {
  ssr: false,
});
