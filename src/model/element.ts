import type { Editor, SlideElement, Slide, History } from './types';
import { addActionToHistory } from './presentation';
import { deepClone } from '../core/functions/deepClone';
import { v4 } from 'uuid';

type AddObjectArgs = {
    element: string;
}

function addObject(editor: Editor, { element }: AddObjectArgs): Editor {
    const newHistory: History = addActionToHistory(editor);
    const newSlides = deepClone(editor.presentation.slides) as Array<Slide>;
    const indexSlide: number = newSlides.findIndex(slide => slide.slideId === editor.presentation.currentSlideIds[0]);
    const newEl: SlideElement = {
        elementId: v4(),
        elementType: 'figure',
        position: {
            x: 400,
            y: 400
        },
        size: {
            width: 100,
            height: 100
        }
    }
    switch(element) {
        case 'rectangle': {
            newEl.figure = {
                form: 'rectangle',
                strokeWidth: 1,
                strokeColor: 'black',
                fillColor: 'white'
            }
            break;
        }
        case 'triangle': {
            newEl.figure = {
                form: 'triangle',
                strokeWidth: 1,
                strokeColor: 'black',
                fillColor: 'white'
            }
            break;
        }
        case 'circle': {
            newEl.figure = {
                form: 'circle',
                strokeWidth: 1,
                strokeColor: 'black',
                fillColor: 'white'
            }
            break;
        }
        case 'text': {
            newEl.elementType = 'text';
            newEl.textProps = {
                font: 'Arial',
                textColor: 'black',
                bgColor: null,
                textValue: 'Hello Kerim',
                fontSize: 15,
                fontWeight: 'regular'
            }
            break;
        }
    }
    newSlides[indexSlide].elements.push(newEl);
    return {
        ...editor,
        history: newHistory,
        presentation: {
            ...editor.presentation,
            slides: newSlides
        }
    }
}

type addImageArgs = {
    urlImage: string
}

function addImage(editor: Editor, { urlImage }: addImageArgs): Editor {
    const newHistory: History = addActionToHistory(editor);
    const newSlides = deepClone(editor.presentation.slides) as Array<Slide>;
    const indexSlide: number = newSlides.findIndex(slide => slide.slideId === editor.presentation.currentSlideIds[0]);
    const newEl: SlideElement = {
        elementId: v4(),
        elementType: 'image',
        position: {
            x: 400,
            y: 400
        },
        size: {
            width: 100,
            height: 100
        },
        image: urlImage
    } 
    newSlides[indexSlide].elements.push(newEl);
    return {
        ...editor,
        history: newHistory,
        presentation: {
            ...editor.presentation,
            slides: newSlides
        }
    }
}

type selectedElementsArgs = {
    elementId: string;
}


function selectElement(editor: Editor, { elementId }: selectedElementsArgs): Editor {
    const newHistory: History = addActionToHistory(editor);
    const newSlides = deepClone(editor.presentation.slides) as Array<Slide>;
    const indexSlide: number = newSlides.findIndex(slide => slide.slideId === editor.presentation.currentSlideIds[0]);
    newSlides[indexSlide].selectedElementsIds = [elementId];
    return {
        ...editor,
        history: newHistory,
        presentation: {
            ...editor.presentation,
            slides: newSlides
        }
    }
}

function selectManyElements(editor: Editor, { elementId }: selectedElementsArgs): Editor {
    const newHistory: History = addActionToHistory(editor);
    const newSlides = deepClone(editor.presentation.slides) as Array<Slide>;
    const indexSlide: number = newSlides.findIndex(slide => slide.slideId === editor.presentation.currentSlideIds[0]);
    newSlides[indexSlide].selectedElementsIds.push(elementId);
    return {
        ...editor,
        history: newHistory,
        presentation: {
            ...editor.presentation,
            slides: newSlides
        }
    }
} 

export type ChangePositionArgs = {
    newX: number,
    newY: number
}

export function changePosition(editor: Editor, { newX, newY}: ChangePositionArgs): Editor {
    const newHistory: History = addActionToHistory(editor);
    const newSlides = deepClone(editor.presentation.slides) as Array<Slide>;
    const indexSlide: number = newSlides.findIndex(slide => slide.slideId === editor.presentation.currentSlideIds[0]);
    const selectedElementsId: Array<string> = editor.presentation.slides[indexSlide].selectedElementsIds.concat();
    for(let i = 0; i < newSlides[indexSlide].elements.length; i++) {
        if(selectedElementsId.includes(newSlides[indexSlide].elements[i].elementId)) {
            const newElement: SlideElement = {
                ...newSlides[indexSlide].elements[i],
                position: {
                    x: newX,
                    y: newY
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

type ChangeSizeArgs = {
    widthShift: number,
    heightShift: number
}

function changeSize(editor: Editor, { widthShift, heightShift }: ChangeSizeArgs): Editor {
    const newHistory: History = addActionToHistory(editor);
    const newSlides = deepClone(editor.presentation.slides) as Array<Slide>;
    const indexSlide: number = newSlides.findIndex(slide => slide.slideId === editor.presentation.currentSlideIds[0]);
    const selectedElementsId: Array<string> = editor.presentation.slides[indexSlide].selectedElementsIds.concat();
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

type ChangeTextArgs = {
    font: string
    textColor: string,
    bgColor: string,
    textValue: string,
    fontSize: number,
    fontWeight: "light" | "regular" | "bold"
}

function changeTextProps(editor: Editor, { font, textColor, bgColor, textValue, fontSize, fontWeight }: ChangeTextArgs): Editor {
    const newHistory: History = addActionToHistory(editor);
    const newSlides = deepClone(editor.presentation.slides) as Array<Slide>;
    const indexSlide: number = newSlides.findIndex(slide => slide.slideId === editor.presentation.currentSlideIds[0]);
    const selectedElementsId: Array<string> = editor.presentation.slides[indexSlide].selectedElementsIds.concat();
    for (let i = 0; i < newSlides[indexSlide].elements.length; i++) {
        if (selectedElementsId.includes(newSlides[indexSlide].elements[i].elementId) && newSlides[indexSlide].elements[i].elementType == "text") {
            const newElement: SlideElement = {
                ...newSlides[indexSlide].elements[i],
                textProps: {
                    font: font != undefined ? font : newSlides[indexSlide].elements[i].textProps!.font, 
                    textColor: textColor != undefined ? textColor : newSlides[indexSlide].elements[i].textProps!.textColor,
                    bgColor: bgColor != undefined ? bgColor : newSlides[indexSlide].elements[i].textProps!.bgColor,
                    textValue: textValue != undefined ? textValue : newSlides[indexSlide].elements[i].textProps!.textValue,
                    fontSize: fontSize != undefined ? fontSize : newSlides[indexSlide].elements[i].textProps!.fontSize,
                    fontWeight: fontWeight != undefined ? fontWeight : newSlides[indexSlide].elements[i].textProps!.fontWeight,
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

type ChangeStrokeWidthArgs = {
    newWidth: number
}

function changeStrokeWidth(editor: Editor, { newWidth }: ChangeStrokeWidthArgs): Editor {
    const newHistory: History = addActionToHistory(editor);
    const newSlides = deepClone(editor.presentation.slides) as Array<Slide>;
    const indexSlide: number = newSlides.findIndex(slide => slide.slideId === editor.presentation.currentSlideIds[0]);
    const selectedElementsId: Array<string> = editor.presentation.slides[indexSlide].selectedElementsIds.concat();
    for (let i = 0; i < newSlides[indexSlide].elements.length; i++) {
        if (selectedElementsId.includes(newSlides[indexSlide].elements[i].elementId) && (newSlides[indexSlide].elements[i].elementType == "figure") && (newSlides[indexSlide].elements[i].figure != undefined)) {
            const newElement: SlideElement = {
                ...newSlides[indexSlide].elements[i],
                figure: {
                    form: newSlides[indexSlide].elements[i].figure!.form,
                    strokeColor: newSlides[indexSlide].elements[i].figure!.strokeColor,
                    strokeWidth: newWidth,
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

type ChangeColorArgs = {
    newColor: string
}

function changeStrokeColor(editor: Editor, { newColor }: ChangeColorArgs): Editor {
    if (newColor) {
        const newHistory: History = addActionToHistory(editor);
        const newSlides = deepClone(editor.presentation.slides) as Array<Slide>;
        const indexSlide: number = newSlides.findIndex(slide => slide.slideId === editor.presentation.currentSlideIds[0]);
        const selectedElementsId: Array<string> = editor.presentation.slides[indexSlide].selectedElementsIds.concat();
        for (let i = 0; i < newSlides[indexSlide].elements.length; i++) {
            if (selectedElementsId.includes(newSlides[indexSlide].elements[i].elementId) && (newSlides[indexSlide].elements[i].elementType == "figure") && (newSlides[indexSlide].elements[i].figure != undefined)) {
                const newElement: SlideElement = {
                    ...newSlides[indexSlide].elements[i],
                    figure: {
                        form: newSlides[indexSlide].elements[i].figure!.form,
                        strokeColor: newColor,
                        strokeWidth: newSlides[indexSlide].elements[i].figure!.strokeWidth,
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
    else {return editor}
}

function changeFillColor(editor: Editor, { newColor }: ChangeColorArgs): Editor {
    if (newColor) {
        const newHistory: History = addActionToHistory(editor);
        const newSlides = deepClone(editor.presentation.slides) as Array<Slide>;
        const indexSlide: number = newSlides.findIndex(slide => slide.slideId === editor.presentation.currentSlideIds[0]);
        const selectedElementsId: Array<string> = editor.presentation.slides[indexSlide].selectedElementsIds.concat();
        for (let i = 0; i < newSlides[indexSlide].elements.length; i++) {
            if (selectedElementsId.includes(newSlides[indexSlide].elements[i].elementId) && (newSlides[indexSlide].elements[i].elementType == "figure") && (newSlides[indexSlide].elements[i].figure != undefined)) {
                const newElement: SlideElement = {
                    ...newSlides[indexSlide].elements[i],
                    figure: {
                        form: newSlides[indexSlide].elements[i].figure!.form,
                        strokeColor: newSlides[indexSlide].elements[i].figure!.strokeColor,
                        strokeWidth: newSlides[indexSlide].elements[i].figure!.strokeWidth,
                        fillColor: newColor
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
    else {return editor}
}


type DeleteSelectedArgs = {
    selectedElementsId: Array<string>
}

function deleteSelected(editor: Editor ): Editor {
    const newHistory: History = addActionToHistory(editor);
    const newSlides = deepClone(editor.presentation.slides) as Array<Slide>;
    const indexSlide: number = newSlides.findIndex(slide => slide.slideId === editor.presentation.currentSlideIds[0]);
    const selectedElementsId: Array<string> = editor.presentation.slides[indexSlide].selectedElementsIds.concat();
    newSlides[indexSlide].elements.forEach(element => {
        if(selectedElementsId.includes(element.elementId)) {
            newSlides[indexSlide].elements.splice(newSlides[indexSlide].elements.indexOf(element), 1)
        }
    })
    newSlides[indexSlide].selectedElementsIds = [];
    return {
        ...editor,
        history: newHistory,
        presentation: {
            ...editor.presentation,
            slides: newSlides
        }
    }
}

export { addImage, addObject, selectElement, selectManyElements, changeFillColor, changeStrokeColor, changeTextProps, changeStrokeWidth }
