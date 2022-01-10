import type { Editor, History, Presentation } from './types';
import { deepClone } from '../core/functions/deepClone'
import { ActionType } from './store';
import { jsPDF } from 'jspdf'
import { addSlides } from './export';

function addActionToHistoryReducer(editor: Editor): History {
    const newHistory = deepClone(editor.history) as History;
    const presentation = deepClone(editor.presentation) as Presentation;
    if(newHistory.undoStack.length === 100) {
        newHistory.undoStack.shift();
    }
    while(newHistory.redoStack.length !== 0) {
        newHistory.redoStack.pop();
    }
    newHistory.undoStack.push(presentation);
    return (newHistory)
}

function saveDocReducer(editor: Editor): Editor {
    const newEditor = deepClone(editor) as Editor;
    const stringEditor = JSON.stringify(newEditor);
    const fileEditor = new Blob(
        [stringEditor], {
            type: 'application/json'
        }
    )
    const link = document.createElement('a')
    link.href = URL.createObjectURL(fileEditor)
    link.download = 'Presentation.json';
    link.style.display = 'none';
    link.click();
    link.remove();
    return (newEditor)
}

function uploadDocReducer(editor: Editor, newEditor: Editor): Editor {
    return (newEditor)
}

async function exportDocReducer(state: Editor) {
    const slides = state.presentation.slides;
    const title = state.presentation.title;
    const slideSize = [818, 582];
    const doc = new jsPDF({
        unit: "px",
        orientation: 'l',
        format: slideSize,
    });
    await addSlides(doc, slides);
    doc.deletePage(doc.getNumberOfPages());
    doc.save(title);
}

function switchPreviewReducer(editor: Editor): Editor {
    const newEditor = deepClone(editor) as Editor;
    return {
        ...newEditor,
        statePreview: !editor.statePreview
    }
}

function undoReducer(editor: Editor): Editor {
    const newEditor = deepClone(editor) as Editor;
    if (newEditor.history.undoStack.length !== 0) {
        const newHistory = deepClone(newEditor.history) as History;
        const newPresentation: Presentation = newHistory.undoStack.pop()!;
        newHistory.redoStack.push(newEditor.presentation);
        return {
            ...newEditor,
            history: newHistory,
            presentation: newPresentation
        }
    }
    return(newEditor)
}

function redoReducer(editor: Editor): Editor {
    const newEditor = deepClone(editor) as Editor;
    if (newEditor.history.redoStack.length !== 0) {
        const newHistory = deepClone(newEditor.history) as History;
        const newPresentation: Presentation = newHistory.redoStack.pop()!;
        newHistory.undoStack.push(newEditor.presentation);
        return {
            ...newEditor, 
            history: newHistory,
            presentation: newPresentation
        }
    }
    return(newEditor)
}

function editorReducer(state: Editor, action: ActionType): Editor {
    switch (action.type) {
        case 'SAVE_DOCUMENT':
            return saveDocReducer(state)
        case 'EXPORT_DOCUMENT':
            {
                exportDocReducer(state);
                return deepClone(state) as Editor
            }
        case 'SWITCH_PREVIEW':
            return switchPreviewReducer(state)
        case 'UNDO': 
            return undoReducer(state)
        case 'REDO':
            return redoReducer(state);
        case 'UPLOAD_DOCUMENT':
            return action.newEditor? uploadDocReducer(state, action.newEditor): deepClone(state) as Editor
        default:
            return deepClone(state) as Editor
    }
}

export { editorReducer, addActionToHistoryReducer }