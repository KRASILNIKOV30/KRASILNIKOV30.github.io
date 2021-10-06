import { Editor, SlideElement, Slide, Presentation } from "./types";

import uuidv4 from 'uuid4';

function changeTitle(editor: Editor, title: string): Editor {
    return {
        ...editor,
        presentation: {
            ...editor.presentation,
            title: title,
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
    return {
        ...editor,
        statePreview: !editor.statePreview
    }
}

function undo(editor: Editor): Editor {
    return(editor)
}

function redo(editor: Editor): Editor {
    return(editor)
}

function addSlide(editor: Editor): Editor {
    const newSlides: Array<Slide> = editor.presentation.slides;
    newSlides.push({
        slideId: uuidv4(),
        elements: [],
        background: "url",
        selectedElementsId: []
    });

    return {
        ...editor,
        presentation: {
            ...editor.presentation,
            slides: newSlides
        }
    }
}

function removeSlide(editor: Editor, slideId: string): Editor {
    const newSlides: Array<Slide> = editor.presentation.slides;
    const indexSlide: number = newSlides.findIndex(slide => slide.slideId == slideId);
    newSlides.splice(indexSlide, 1);
    return {
        ...editor,
        presentation: {
            ...editor.presentation,
            slides: newSlides
        }
    }
}

function switchSlide(editor: Editor, slideId: string): Editor {
    return {
        ...editor,
        currentSlideId: slideId
    }
}

function setBackground(editor: Editor, background: string): Editor {
    const newSlides: Array<Slide> = editor.presentation.slides;
    const indexSlide: number = newSlides.findIndex(slide => slide.slideId == editor.currentSlideId);
    newSlides[indexSlide].background = background;
    return {
        ...editor,
        presentation: {
            ...editor.presentation,
            slides: newSlides
        }
    }
}

function addObject(editor: Editor, element: SlideElement): Editor {
    const newSlides: Array<Slide> = editor.presentation.slides;
    const indexSlide: number = newSlides.findIndex(slide => slide.slideId == editor.currentSlideId);
    newSlides[indexSlide].elements.push(element);
    return {
        ...editor,
        presentation: {
            ...editor.presentation,
            slides: newSlides
        }
    }
}

//find - first found
function changePosition(editor: Editor, xShift: number, yShift: number, selectedElementsId: Array<string>): Editor {
    const newSlides: Array<Slide> = editor.presentation.slides;
    const indexSlide: number = newSlides.findIndex(slide => slide.slideId == editor.currentSlideId);
    for(let i = 0; i < newSlides[indexSlide].elements.length; i++) {
        if(selectedElementsId.includes(newSlides[indexSlide].elements[i].elementId)) {
            const newElement: SlideElement = {
                ...newSlides[indexSlide].elements[i],
                position: {
                    x: newSlides[indexSlide].elements[i].position.x + xShift,
                    y: newSlides[indexSlide].elements[i].position.y + yShift
                }
            };
            newSlides[indexSlide].elements.splice(i, 1, newElement)
        }
    }
    return {
        ...editor,
        presentation: {
            ...editor.presentation,
            slides: newSlides
        }
    }
}

function deleteSelected(editor: Editor, selectedElementsId: Array<string>): Editor {
    const newSlides: Array<Slide> = editor.presentation.slides;
    const indexSlide: number = newSlides.findIndex(slide => slide.slideId == editor.currentSlideId);
    newSlides[indexSlide].elements.forEach(element => {
        if(selectedElementsId.includes(element.elementId)) {
            newSlides[indexSlide].elements.splice(newSlides[indexSlide].elements.indexOf(element), 1)
        }
    })
    return {
        ...editor,
        presentation: {
            ...editor.presentation,
            slides: newSlides
        }
    }
}