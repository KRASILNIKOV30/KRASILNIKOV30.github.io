import { Editor, SlideElement, Slide, Presentation } from "./types";

import uuidv4 from 'uuid4';

function changeTitle(editor: Editor, title: string): Editor {
    const newTitle: string = prompt('Enter new title');
    return {
        ...editor,
        presentation: {
            title: newTitle,
            slides: editor.presentation.slides
        } 
    }
}

function saveDoc(editor: Editor): Editor {
    return(editor)
}

function uploadDoc(editor: Editor, editorFile: File): Editor {
    return(editor)
}

function exportDoc(editor: Editor): Editor {
    return(editor)
}

function switchPreview(editor: Editor): Editor {
    editor.statePreview = !editor.statePreview;
    return(editor)
}

function undo(editor: Editor): Editor {
    return(editor)
}

function redo(editor: Editor): Editor {
    return(editor)
}

function addSlide(editor: Editor): Editor {
    const slide: Slide = {
        slideId: "id",
        elements: [],
        background: "url",
        selectedElementId: "id"
    };
    editor.presentation.slides.push(slide)
    return(editor)
}

function removeSlide(editor: Editor): Editor {
    editor.presentation.slides.pop();
    return(editor)
}

function switchSlide(editor: Editor, slideId: string, selectedSlideId: string): Editor {
    return(editor)
}

function setBackground(editor: Editor, background: string): Editor {
    background = prompt("enter url");
    return(editor)
}

function addObject(editor: Editor, element: SlideElement, slideId: string): Editor {
    let currentSlideId = uuidv4();
    editor.presentation.slides[currentSlideId].elements.push(element);
    return(editor)
}

function changeObject(editor: Editor, paramName: string, value: string | number, slideId: string, elementId: string): Editor {
    paramName = prompt("What do u want to change");
    value = prompt("new value");
    editor.presentation.slides[slideId].elements[elementId].paramName = value;
    return(editor)
}
