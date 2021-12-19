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
    editor.presentation.currentSlideIds.forEach(idToDelete => {
        if (newSlides.length >= 2) {
            newSlides.splice(newSlides.findIndex(slide => slide.slideId === idToDelete), 1)
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

type SelectSlideArgs = {
    slideId: string;
}

function switchSlide(editor: Editor, { slideId }: SelectSlideArgs): Editor {
    return {
        ...editor,
        presentation: {
            ...editor.presentation,
            currentSlideIds: [slideId]
        }
    }
}


function selectOneSlide(editor: Editor, { slideId }: SelectSlideArgs): Editor {
    const newCurrentSlideIds = editor.presentation.currentSlideIds.concat();
    newCurrentSlideIds.push(slideId);
    return {
        ...editor,
        presentation: {
            ...editor.presentation,
            currentSlideIds: newCurrentSlideIds
        }
    }
}

function selectManySlide(editor: Editor, { slideId }: SelectSlideArgs): Editor {
    const newCurrentSlideIds = editor.presentation.currentSlideIds.concat();
    const firstIndex = editor.presentation.slides.findIndex(slide => slide.slideId === newCurrentSlideIds[newCurrentSlideIds.length - 1])
    const indexSelected = editor.presentation.slides.findIndex(slide => slide.slideId === slideId)
    for (let i = firstIndex + 1; i <= indexSelected; i++) {
        newCurrentSlideIds.push(editor.presentation.slides[i].slideId)
    }
    return {
        ...editor,
        presentation: {
            ...editor.presentation,
            currentSlideIds: newCurrentSlideIds
        }
    }
}

type SwitchSlideOrderArgs = {
    orderShift: number
}

function switchSlidePositions(editor: Editor, { orderShift }: SwitchSlideOrderArgs): Editor {
    const newHistory: History = addActionToHistory(editor);
    const newSlides = deepClone(editor.presentation.slides) as Array<Slide>;
    if(orderShift > 0) {
        for (let i = editor.presentation.currentSlideIds.length - 1; i >= 0; i--) {
            const indexSlide: number = newSlides.findIndex(slide => slide.slideId === editor.presentation.currentSlideIds[i]);
            if (indexSlide + orderShift >= 0 && indexSlide + orderShift < newSlides.length) {
                const tempSlide: Slide = newSlides[indexSlide + orderShift];
                newSlides.splice(indexSlide + orderShift, 1, newSlides[indexSlide]);
                newSlides.splice(indexSlide, 1, tempSlide);
            }
            else {
                return editor
            }
        }
    }
    else {
        for (let i = 0; i < editor.presentation.currentSlideIds.length; i++) {
            const indexSlide: number = newSlides.findIndex(slide => slide.slideId === editor.presentation.currentSlideIds[i]);
            if (indexSlide + orderShift >= 0 && indexSlide + orderShift < newSlides.length) {
                const tempSlide: Slide = newSlides[indexSlide + orderShift];
                newSlides.splice(indexSlide + orderShift, 1, newSlides[indexSlide]);
                newSlides.splice(indexSlide, 1, tempSlide);
            }
            else {
                return editor
            }
        }
    }
    return {
         ...editor,
        history: newHistory,
        presentation: {
            ...editor.presentation,
            slides: newSlides
        }
    }   
}


type SetBackgroundArgs = {
    background: string;
}

function setBackground(editor: Editor, { background }: SetBackgroundArgs): Editor {
    if (background !== '') {
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
    else { return editor }
}

export { addSlide, removeSlides, switchSlide, setBackground, selectOneSlide, selectManySlide, switchSlidePositions }