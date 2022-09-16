import { Editor, EditorProps } from "@toast-ui/react-editor";
import colorSyntax from "@toast-ui/editor-plugin-color-syntax";
import "tui-color-picker/dist/tui-color-picker.css";
import "@toast-ui/editor-plugin-color-syntax/dist/toastui-editor-plugin-color-syntax.css";
import "@toast-ui/editor/dist/toastui-editor.css";
import "@toast-ui/editor/dist/theme/toastui-editor-dark.css";
import React, { useRef } from "react";

interface EditorUiProps extends EditorProps {
  theme: string;
  height: string;
  getEditorContent: (x: string) => void;
}
const EditorBox = ({ height, theme, getEditorContent }: EditorUiProps) => {
  const editorRef = useRef<Editor>(null);
  const onChangeText = () => {
    if (!editorRef.current) return;
    const data = editorRef.current.getInstance().getMarkdown();
    getEditorContent(data);
  };

  return (
    <>
      <Editor
        height={height}
        theme={theme}
        plugins={[colorSyntax]}
        onChange={onChangeText}
        ref={editorRef}
      />
    </>
  );
};

export default EditorBox;
