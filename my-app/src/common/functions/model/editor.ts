import { Editor } from "./types"

let editor = {} as Editor;
let editorChangeHandler: Function;

function getEditor() {
    return editor
}

function setEditor(newEditor: Editor) {
    editor = newEditor
}

function addEditorChangeHandler(handler: Function) {
    editorChangeHandler = handler;
}

function dispatch(modifyFn: Function, payload: object) {
    const newEditor = modifyFn(editor, payload)
    setEditor(newEditor)

    if (editorChangeHandler)
    {
        editorChangeHandler()
    }
}

export { dispatch, getEditor, addEditorChangeHandler };