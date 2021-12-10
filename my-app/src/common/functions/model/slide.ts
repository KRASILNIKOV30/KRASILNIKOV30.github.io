import type { Editor, Slide, History } from './types';
import { addActionToHistory } from './pres';
//import { uuid } from "uuidv4";

function addSlide(editor: Editor): Editor {
    const newHistory: History = addActionToHistory(editor);
    const newSlides: Array<Slide> = editor.presentation.slides.concat();
    newSlides.push({
        slideId: ''/* uuid() */,
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

type SwitchSlideArgs = {
    slideId: string;
}

function switchSlide(editor: Editor, { slideId }: SwitchSlideArgs): Editor {
    return {
        ...editor,
        currentSlideIds: [slideId]
    }
}

type SelectSlideArgs = {
    slideId: string;
}

function selectSlide(editor: Editor, { slideId }: SwitchSlideArgs): Editor {
    const newCurrentSlideIds = editor.currentSlideIds.concat();
    newCurrentSlideIds.push(slideId);
    return {
        ...editor,
        currentSlideIds: newCurrentSlideIds
    }
}

type SetBackgroundArgs = {
    background: string;
}

function setBackground(editor: Editor, { background }: SetBackgroundArgs): Editor {
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

export { addSlide, removeSlides, switchSlide, setBackground }