import type { Editor, SlideElement, Slide, History, TextType } from './types';
import { addActionToHistory } from './pres';

function addObject(editor: Editor, element: SlideElement): Editor {
    const newHistory: History = addActionToHistory(editor);
    const newSlides: Array<Slide> = editor.presentation.slides.concat();
    const indexSlide: number = newSlides.findIndex(slide => slide.slideId == editor.currentSlideIds[0]);
    newSlides[indexSlide].elements.push(element);
    return {
        ...editor,
        history: newHistory,
        presentation: {
            ...editor.presentation,
            slides: newSlides
        }
    }
}

function changePosition(editor: Editor, xShift: number, yShift: number, selectedElementsId: Array<string>): Editor {
    const newHistory: History = addActionToHistory(editor);
    const newSlides: Array<Slide> = editor.presentation.slides.concat();
    const indexSlide: number = newSlides.findIndex(slide => slide.slideId == editor.currentSlideIds[0]);
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
        history: newHistory,
        presentation: {
            ...editor.presentation,
            slides: newSlides
        }
    }
}

function changeSize(editor: Editor, selectedElementsId: Array<string>, widthShift: number, heightShift: number): Editor {
    const newHistory: History = addActionToHistory(editor);
    const newSlides: Array<Slide> = editor.presentation.slides.concat();
    const indexSlide: number = newSlides.findIndex(slide => slide.slideId == editor.currentSlideIds[0]);
    for(let i = 0; i < newSlides[indexSlide].elements.length; i++) {
        if(selectedElementsId.includes(newSlides[indexSlide].elements[i].elementId)) {
            const newElement: SlideElement = {
                ...newSlides[indexSlide].elements[i],
                size: {
                    width: newSlides[indexSlide].elements[i].size.width + widthShift,
                    height: newSlides[indexSlide].elements[i].size.height + heightShift
                }
            };
            newSlides[indexSlide].elements.splice(i, 1, newElement)
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

function changeTextProps(editor: Editor, selectedElementsId: Array<string>, textPropsValue: TextType): Editor {
    const newHistory: History = addActionToHistory(editor);
    const newSlides: Array<Slide> = editor.presentation.slides.concat();
    const indexSlide: number = newSlides.findIndex(slide => slide.slideId == editor.currentSlideIds[0]);
    for (let i = 0; i < newSlides[indexSlide].elements.length; i++) {
        if (selectedElementsId.includes(newSlides[indexSlide].elements[i].elementId) && newSlides[indexSlide].elements[i].elementType == "text") {
            const newElement: SlideElement = {
                ...newSlides[indexSlide].elements[i],
                textProps: {
                    textColor: textPropsValue.textColor != null ? textPropsValue.textColor : newSlides[indexSlide].elements[i].textProps.textColor,
                    bgColor: textPropsValue.bgColor != null ? textPropsValue.bgColor : newSlides[indexSlide].elements[i].textProps.bgColor,
                    textValue: textPropsValue.textValue != null ? textPropsValue.textValue : newSlides[indexSlide].elements[i].textProps.textValue,
                    fontSize: textPropsValue.fontSize != null ? textPropsValue.fontSize : newSlides[indexSlide].elements[i].textProps.fontSize,
                    fontWeight: textPropsValue.fontWeight != null ? textPropsValue.fontWeight : newSlides[indexSlide].elements[i].textProps.fontWeight,
                }
            };
            newSlides[indexSlide].elements.splice(i, 1, newElement)
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

function changeStrokeColor(editor: Editor, selectedElementsId: Array<string>, newStrokeColor: string): Editor {
    const newHistory: History = addActionToHistory(editor);
    const newSlides: Array<Slide> = editor.presentation.slides.concat();
    const indexSlide: number = newSlides.findIndex(slide => slide.slideId == editor.currentSlideIds[0]);
    for (let i = 0; i < newSlides[indexSlide].elements.length; i++) {
        if (selectedElementsId.includes(newSlides[indexSlide].elements[i].elementId) && (newSlides[indexSlide].elements[i].elementType == "figure") && (newSlides[indexSlide].elements[i].figure != undefined)) {
            const newElement: SlideElement = {
                ...newSlides[indexSlide].elements[i],
                figure: {
                    form: newSlides[indexSlide].elements[i].figure!.form,
                    strokeColor: newStrokeColor,
                    fillColor: newSlides[indexSlide].elements[i].figure!.fillColor
                }
            }
            newSlides[indexSlide].elements.splice(i, 1, newElement)
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

function changeFillColor(editor: Editor, selectedElementsId: Array<string>, newFillColor: string): Editor {
    const newHistory: History = addActionToHistory(editor);
    const newSlides: Array<Slide> = editor.presentation.slides.concat();
    const indexSlide: number = newSlides.findIndex(slide => slide.slideId == editor.currentSlideIds[0]);
    for (let i = 0; i < newSlides[indexSlide].elements.length; i++) {
        if (selectedElementsId.includes(newSlides[indexSlide].elements[i].elementId) && (newSlides[indexSlide].elements[i].elementType == "figure") && (newSlides[indexSlide].elements[i].figure != undefined)) {
            const newElement: SlideElement = {
                ...newSlides[indexSlide].elements[i],
                figure: {
                    form: newSlides[indexSlide].elements[i].figure!.form,
                    strokeColor: newSlides[indexSlide].elements[i].figure!.strokeColor,
                    fillColor: newFillColor
                }
            }
            newSlides[indexSlide].elements.splice(i, 1, newElement)
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


function deleteSelected(editor: Editor, selectedElementsId: Array<string>): Editor {
    const newHistory: History = addActionToHistory(editor);
    const newSlides: Array<Slide> = editor.presentation.slides.concat();
    const indexSlide: number = newSlides.findIndex(slide => slide.slideId == editor.currentSlideIds[0]);
    newSlides[indexSlide].elements.forEach(element => {
        if(selectedElementsId.includes(element.elementId)) {
            newSlides[indexSlide].elements.splice(newSlides[indexSlide].elements.indexOf(element), 1)
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