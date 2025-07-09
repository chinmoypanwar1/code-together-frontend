import "../../monaco-workers"
import { useEffect, useRef } from "react"
import * as monaco from 'monaco-editor'
import { useAppSelector } from "../../hooks/reduxHooks";
import { yDoc } from "../../context/yjsSlice";
import * as Y from 'yjs';
import { MonacoBinding } from 'y-monaco';

function MonacoEditor() {

  // Editor setup
  const editorRef = useRef<HTMLDivElement>(null);
  const instanceRef = useRef<monaco.editor.IStandaloneEditorConstructionOptions>(null);

  // File setup
  const activeFileId = useAppSelector(state => state.playground.activeFile);
  const yfs = yDoc?.getMap('filesystem').get('filesystem');

  const getFileById: Y.Map<any> = (yfs: Y.Map<any>, targetId: string) => {
    if (yfs.get('id') === targetId) return yfs;
    const children = yfs.get('children');
    if (children instanceof Y.Array) {
      for (const child of children.toArray()) {
        const found = getFileById(child, targetId);
        if (found) return found;
      }
    }
  }

  useEffect(() => {
    if (editorRef.current) {
      instanceRef.current = monaco.editor.create(editorRef.current, {
        value: "// LOADING THE CODE...",
        language: "javascript",
        theme: "vs-dark",
        automaticLayout: true,
      })
    }
    return () => {
      instanceRef.current?.dispose();
      instanceRef.current = null;
    }
  }, [])

  useEffect(() => {
    if (!instanceRef.current || !activeFileId) return;
    const activeFile = getFileById(yfs, activeFileId);

    // Check if an editor model already exists or not
    const uri = monaco.Uri.parse(`file:///${activeFileId}`);
    let model = monaco.editor.getModel(uri);

    if (!model) {
      model = monaco.editor.createModel(activeFile.content || "", "javascript", uri);
    }
    instanceRef.current.setModel(model);

    let yText = activeFile.get('content');
    if (!yText) {
      yText.insert(0, activeFile.content || "");
    }

    const binding = new MonacoBinding(
      yText,
      model,
      new Set([instanceRef.current]),
      null
    )

    return () => {
      binding.destroy();
    }
  }, [activeFileId])

  return (
    <div ref={editorRef} className="w-full h-full" />
  )
}

export default MonacoEditor
