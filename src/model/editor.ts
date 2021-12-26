import type { Editor, History, Presentation } from './types';
import { deepClone } from '../core/functions/deepClone'
import { ActionType } from './store';

function addActionToHistory(editor: Editor): History {
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
    const stringEditor = JSON.stringify(editor);
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
    return (editor)
}

function uploadDocReducer(editor: Editor, newEditor: Editor): Editor {
    return (newEditor)
}

function exportDocReducer(editor: Editor): Editor {
    return(editor)
}

function switchPreviewReducer(editor: Editor): Editor {
    return {
        ...editor,
        statePreview: !editor.statePreview
    }
}

function undoReducer(editor: Editor): Editor {
    if (editor.history.undoStack.length !== 0) {
        const newHistory = deepClone(editor.history) as History;
        const newPresentation: Presentation = newHistory.undoStack.pop()!;
        newHistory.redoStack.push(editor.presentation);
        return {
            ...editor,
            history: newHistory,
            presentation: newPresentation
        }
    }
    return(editor)
}

function redoReducer(editor: Editor): Editor {
    if (editor.history.redoStack.length !== 0) {
        const newHistory = deepClone(editor.history) as History;
        const newPresentation: Presentation = newHistory.redoStack.pop()!;
        newHistory.undoStack.push(editor.presentation);
        return {
            ...editor, 
            history: newHistory,
            presentation: newPresentation
        }
    }
    return(editor)
}

function editorReducer(state: Editor, action: ActionType): Editor {
    switch (action.type) {
        case 'SAVE_DOCUMENT':
            return saveDocReducer(state)
        case 'EXPORT_DOCUMENT':
            return exportDocReducer(state)
        case 'SWITCH_PREVIEW':
            return switchPreviewReducer(state)
        case 'UNDO': 
            return undoReducer(state)
        case 'REDO':
            return redoReducer(state);
        case 'UPLOAD_DOCUMENT':
            return action.newEditor? uploadDocReducer(state, action.newEditor): state
        default:
            return state
    }
}

export { editorReducer, addActionToHistory }