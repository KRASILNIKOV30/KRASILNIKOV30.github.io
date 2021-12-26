import type { Slide, Presentation } from './types';
import { deepClone } from '../core/functions/deepClone';
import { v4 } from 'uuid';
import { ActionType } from './store';

function changeTitleReducer(presentation: Presentation, title: string): Presentation {
    return {
        ...presentation,
        title: title,
    }
}

function addSlideReducer(presentation: Presentation): Presentation {
    const newSlides = deepClone(presentation.slides) as Array<Slide>;
    newSlides.push({
        slideId: v4(),
        elements: [],
        background: "white",
        selectedElementsIds: []
    });
    return {
        ...presentation,
        slides: newSlides
    }
}

function deleteSlidesReducer(presentation: Presentation): Presentation {
    const newSlides = deepClone(presentation.slides) as Array<Slide>;
    presentation.currentSlideIds.forEach(idToDelete => {
        if (newSlides.length >= 2) {
            newSlides.splice(newSlides.findIndex(slide => slide.slideId === idToDelete), 1)
        }
    })
    return {
        ...presentation,
        slides: newSlides,
        currentSlideIds: [newSlides[0].slideId]
    }
}

function switchSlideReducer(presentation: Presentation, slideId: string): Presentation {
    return {
        ...presentation,
        currentSlideIds: [slideId]
    }
}


function selectOneSlideReducer(presentation: Presentation, slideId: string): Presentation {
    const newCurrentSlideIds = presentation.currentSlideIds.concat();
    newCurrentSlideIds.push(slideId);
    return {
        ...presentation,
        currentSlideIds: newCurrentSlideIds
    }
}

function selectManySlideReducer(presentation: Presentation, slideId: string): Presentation {
    const newCurrentSlideIds = presentation.currentSlideIds.concat();
    const firstIndex = presentation.slides.findIndex(slide => slide.slideId === newCurrentSlideIds[newCurrentSlideIds.length - 1])
    const indexSelected = presentation.slides.findIndex(slide => slide.slideId === slideId)
    for (let i = firstIndex + 1; i <= indexSelected; i++) {
        newCurrentSlideIds.push(presentation.slides[i].slideId)
    }
    return {
        ...presentation,
        currentSlideIds: newCurrentSlideIds
    }
}

function switchSlidePositionsReducer(presentation: Presentation, orderShift: number): Presentation {
    const newSlides = deepClone(presentation.slides) as Array<Slide>;
    if(orderShift > 0) {
        for (let i = presentation.currentSlideIds.length - 1; i >= 0; i--) {
            const indexSlide: number = newSlides.findIndex(slide => slide.slideId === presentation.currentSlideIds[i]);
            if (indexSlide + orderShift >= 0 && indexSlide + orderShift < newSlides.length) {
                const tempSlide: Slide = newSlides[indexSlide + orderShift];
                newSlides.splice(indexSlide + orderShift, 1, newSlides[indexSlide]);
                newSlides.splice(indexSlide, 1, tempSlide);
            }
            else {
                return presentation
            }
        }
    }
    else {
        for (let i = 0; i < presentation.currentSlideIds.length; i++) {
            const indexSlide: number = newSlides.findIndex(slide => slide.slideId === presentation.currentSlideIds[i]);
            if (indexSlide + orderShift >= 0 && indexSlide + orderShift < newSlides.length) {
                const tempSlide: Slide = newSlides[indexSlide + orderShift];
                newSlides.splice(indexSlide + orderShift, 1, newSlides[indexSlide]);
                newSlides.splice(indexSlide, 1, tempSlide);
            }
            else {
                return presentation
            }
        }
    }
    return {
        ...presentation,
         slides: newSlides
    }   
}

function presentationReducer(state: Presentation, action: ActionType): Presentation {
    switch (action.type) {
        case 'CHANGE_TITLE': 
            return action.newTitle !== undefined? changeTitleReducer(state, action.newTitle): state
        case 'ADD_SLIDE':
            return addSlideReducer(state);
        case 'DELETE_SLIDE':
            return deleteSlidesReducer(state);
        case 'SWITCH_SLIDE':
            return action.slideId !== undefined? switchSlideReducer(state, action.slideId): state
        case 'SELECT_ONE_SLIDE': 
            return action.slideId !== undefined? selectOneSlideReducer(state, action.slideId): state;
        case 'SELECT_MANY_SLIDE': 
            return action.slideId !== undefined? selectManySlideReducer(state, action.slideId): state
        case 'SWITCH_SLIDE_POSITIONS':
            return action.orderShift !== undefined? switchSlidePositionsReducer(state, action.orderShift): state;
        default:
            return state;
    }
}

export { presentationReducer }