import React, { useEffect, useRef, useState } from "react";
import Editor, { Monaco } from "@monaco-editor/react";
import { registerCompletion } from "monacopilot";

export default function CodeEditor({
  value,
  onChange,
  lang,
}: {
  value: string;
  onChange: any;
  lang: string;
}) {
  const editorRef = useRef<any>(null);
  const monacoRef = useRef<Monaco | null>(null);

  function handleEditorDidMount(editor: any, monaco: Monaco) {
    editorRef.current = editor;
    monacoRef.current = monaco;

    const completion = registerCompletion(monaco, editor, {
      endpoint: `${process.env.NEXT_PUBLIC_API_URI}/complete`,
      language: lang,
      trigger: "onDemand",
    });

    monaco.editor.addEditorAction({
      id: "monacopilot.triggerCompletion",
      label: "Complete Code",
      contextMenuGroupId: "navigation",
      keybindings: [
        monaco.KeyMod.CtrlCmd | monaco.KeyMod.Shift | monaco.KeyCode.Space,
      ],
      run: () => {
        completion.trigger();
      },
    });

    registerCompletion(monaco, editor, {
      endpoint: `${process.env.NEXT_PUBLIC_API_URI}/complete`,
      language: lang,
    });
  }

  useEffect(() => {
    if (editorRef.current && monacoRef.current) {
      console.log("Sending Request for lang" + lang);
      registerCompletion(monacoRef.current, editorRef.current, {
        endpoint: `${process.env.NEXT_PUBLIC_API_URI}/complete`,
        language: lang,
      });
    }
  }, [lang]);

  return (
    <div className="md:h-[90vh] md:w-[98%] h-[60vh] border-2">
      <Editor
        language={lang}
        theme="vs-dark"
        value={value}
        onChange={onChange}
        onMount={handleEditorDidMount}
        options={{
          fontSize: 14,
          fontFamily: "Jetbrains-Mono",
          fontLigatures: true,
          wordWrap: "on",
          minimap: {
            enabled: false,
          },
          bracketPairColorization: {
            enabled: true,
          },
          cursorBlinking: "expand",
          formatOnPaste: true,
          suggest: {
            showFields: false,
            showFunctions: false,
          },
        }}
      />
    </div>
  );
}
