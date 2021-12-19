import type { Editor, History, Presentation } from './types';
import { deepClone } from '../core/functions/deepClone'

export function addActionToHistory(editor: Editor): History {
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

type ChangeTitleArgs = {
    title: string;
}

function changeTitle(editor: Editor, { title }: ChangeTitleArgs): Editor {
    const newHistory: History = addActionToHistory(editor);
    return {
        ...editor,
        history: newHistory,
        presentation: {
            ...editor.presentation,
            title: title,
        } 
    }
}

function saveDoc(editor: Editor): Editor {
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

function exportDoc(editor: Editor): Editor {
    return(editor)
}

function switchPreview(editor: Editor): Editor {
    return {
        ...editor,
        statePreview: !editor.statePreview
    }
}

function undo(editor: Editor): Editor {
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

function redo(editor: Editor): Editor {
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

export { changeTitle, saveDoc, exportDoc, switchPreview, undo, redo };