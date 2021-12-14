import type { Editor, Slide, History } from './types';
import { addActionToHistory } from './presentation';
import { deepClone } from '../core/functions/deepClone';
import { v4 } from 'uuid';

function addSlide(editor: Editor): Editor {
    const newHistory: History = addActionToHistory(editor);
    const newSlides = deepClone(editor.presentation.slides) as Array<Slide>;
    newSlides.push({
        slideId: v4(),
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
    const newSlides = deepClone(editor.presentation.slides) as Array<Slide>;
    newSlides.forEach(slide => {
        if(editor.presentation.currentSlideIds.includes(slide.slideId) && newSlides.length >= 2) {
            newSlides.splice(newSlides.indexOf(slide), 1)
        }
    })
    return {
        ...editor,
        history: newHistory,
        presentation: {
            ...editor.presentation,
            slides: newSlides,
            currentSlideIds: [newSlides[0].slideId]
        }
    }
}

type SwitchSlideArgs = {
    slideId: string;
}

function switchSlide(editor: Editor, { slideId }: SwitchSlideArgs): Editor {
    return {
        ...editor,
        presentation: {
            ...editor.presentation,
            currentSlideIds: [slideId]
        }
    }
}


function selectSlide(editor: Editor, { slideId }: SwitchSlideArgs): Editor {
    const newCurrentSlideIds = editor.presentation.currentSlideIds.concat();
    newCurrentSlideIds.push(slideId);
    return {
        ...editor,
        presentation: {
            ...editor.presentation,
            currentSlideIds: [slideId]
        }
    }
}

type SetBackgroundArgs = {
    background: string;
}

function setBackground(editor: Editor, { background }: SetBackgroundArgs): Editor {
    const newHistory: History = addActionToHistory(editor);
    const newSlides = deepClone(editor.presentation.slides) as Array<Slide>;
    const indexSlide: number = newSlides.findIndex(slide => slide.slideId == editor.presentation.currentSlideIds[0]);
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