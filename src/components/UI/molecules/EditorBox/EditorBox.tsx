import { Editor, EditorProps } from "@toast-ui/react-editor";
import colorSyntax from "@toast-ui/editor-plugin-color-syntax";
import "tui-color-picker/dist/tui-color-picker.css";
import "@toast-ui/editor-plugin-color-syntax/dist/toastui-editor-plugin-color-syntax.css";
import "@toast-ui/editor/dist/toastui-editor.css";
import "@toast-ui/editor/dist/theme/toastui-editor-dark.css";
import React, { useRef, Dispatch, SetStateAction } from "react";
import { useS3Upload } from "next-s3-upload";

interface EditorUiProps extends EditorProps {
  theme: string;
  height: string;
  onChange: Dispatch<SetStateAction<string>>;
}
const EditorBox = ({ height, theme, onChange }: EditorUiProps) => {
  const editorRef = useRef<Editor>(null);
  let { uploadToS3 } = useS3Upload();
  const onChangeText = () => {
    if (!editorRef.current) return;
    const data = editorRef.current.getInstance().getMarkdown();
    onChange(data);
  };

  const uploadImage = async (file: any) => {
    let { url } = await uploadToS3(file);
    return url;
  };

  return (
    <>
      <Editor
        height={height}
        theme={theme}
        plugins={[colorSyntax]}
        onChange={onChangeText}
        hooks={{
          addImageBlobHook: async (blob, callback) => {
            const uploadedImageURL = await uploadImage(blob);
            callback(uploadedImageURL, "alt text");
            return false;
          },
        }}
        ref={editorRef}
      />
    </>
  );
};

export default EditorBox;