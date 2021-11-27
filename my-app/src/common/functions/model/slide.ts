import type { Editor, Slide, History } from './types';
import { addActionToHistory } from './pres';
//import { uuid } from "uuidv4";

function addSlide(editor: Editor): Editor {
    const newHistory: History = addActionToHistory(editor);
    const newSlides: Array<Slide> = editor.presentation.slides.concat();
    newSlides.push({
        slideId: '',
        elements: [],
        background: "white",
        backgroundType: "Base64",
        selectedElementsIds: []
    });

    return {
        ...editor,
        history: newHistory,
        presentation: {
            ...editor.presentation,
            slides: newSlides
        }
    }
}

function removeSlides(editor: Editor): Editor {
    const newHistory: History = addActionToHistory(editor);
    const newSlides: Array<Slide> = editor.presentation.slides.concat();
    newSlides.forEach(slide => {
        if(editor.currentSlideIds.includes(slide.slideId)) {
            newSlides.splice(newSlides.indexOf(slide), 1)
        }
    })
    return {
        ...editor,
        history: newHistory,
        presentation: {
            ...editor.presentation,
            slides: newSlides
        }
    }
}

function switchSlide(editor: Editor, slideId: string): Editor {
    return {
        ...editor,
        currentSlideIds: [slideId]
    }
}

function setBackground(editor: Editor, background: string): Editor {
    const newHistory: History = addActionToHistory(editor);
    const newSlides: Array<Slide> = editor.presentation.slides.concat();
    const indexSlide: number = newSlides.findIndex(slide => slide.slideId == editor.currentSlideIds[0]);
    newSlides[indexSlide].background = background;
    return {
        ...editor,
        history: newHistory,
        presentation: {
            ...editor.presentation,
            slides: newSlides
        }
    }
}