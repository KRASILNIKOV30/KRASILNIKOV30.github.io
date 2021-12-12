import type { Editor, SlideElement, Slide, History, TextType } from './types';
import { addActionToHistory } from './pres';
import { uuid } from 'uuidv4';

type AddObjectArgs = {
    element: string;
}

function addObject(editor: Editor, { element }: AddObjectArgs): Editor {
    const newHistory: History = addActionToHistory(editor);
    const newSlides: Array<Slide> = editor.presentation.slides.concat();
    const indexSlide: number = newSlides.findIndex(slide => slide.slideId === editor.currentSlideIds[0]);
    const NewEl: SlideElement = {
        elementId: uuid(),
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
            NewEl.figure = {
                form: 'rectangle',
                strokeWidth: 1,
                strokeColor: 'black',
                fillColor: 'white'
            }
            break;
        }
        case 'triangle': {
            NewEl.figure = {
                form: 'triangle',
                strokeWidth: 1,
                strokeColor: 'black',
                fillColor: 'white'
            }
            break;
        }
        case 'circle': {
            NewEl.figure = {
                form: 'circle',
                strokeWidth: 1,
                strokeColor: 'black',
                fillColor: 'white'
            }
            break;
        }
        case 'image': {
            NewEl.elementType = 'image';
            NewEl.image = {
                urlImage: 'ToDo',
                imageType: 'Base64',
                ext: 'png'
            }
            break;
        }
        case 'text': {
            NewEl.elementType = 'text';
            NewEl.textProps = {
                textColor: 'black',
                bgColor: null,
                textValue: 'Hello Kerim',
                fontSize: 15,
                fontWeight: 'regular'
            }
            break;
        }
    }
    newSlides[indexSlide].elements.push(NewEl);
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
    const newSlides: Array<Slide> = editor.presentation.slides.concat();
    const indexSlide: number = newSlides.findIndex(slide => slide.slideId === editor.currentSlideIds[0]);
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

type ChangePositionArgs = {
    xShift: number,
    yShift: number,
    selectedElementsId: Array<string>
}

function changePosition(editor: Editor, { xShift, yShift, selectedElementsId }: ChangePositionArgs): Editor {
    const newHistory: History = addActionToHistory(editor);
    const newSlides: Array<Slide> = editor.presentation.slides.concat();
    const indexSlide: number = newSlides.findIndex(slide => slide.slideId === editor.currentSlideIds[0]);
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

type ChangeSizeArgs = {
    widthShift: number,
    heightShift: number,
    selectedElementsId: Array<string>
}

function changeSize(editor: Editor, { selectedElementsId, widthShift, heightShift }: ChangeSizeArgs): Editor {
    const newHistory: History = addActionToHistory(editor);
    const newSlides: Array<Slide> = editor.presentation.slides.concat();
    const indexSlide: number = newSlides.findIndex(slide => slide.slideId === editor.currentSlideIds[0]);
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
    textPropsValue: TextType,
    selectedElementsId: Array<string>
}

function changeTextProps(editor: Editor, { textPropsValue, selectedElementsId }: ChangeTextArgs): Editor {
    const newHistory: History = addActionToHistory(editor);
    const newSlides: Array<Slide> = editor.presentation.slides.concat();
    const indexSlide: number = newSlides.findIndex(slide => slide.slideId === editor.currentSlideIds[0]);
    for (let i = 0; i < newSlides[indexSlide].elements.length; i++) {
        if (selectedElementsId.includes(newSlides[indexSlide].elements[i].elementId) && newSlides[indexSlide].elements[i].elementType == "text") {
            const newElement: SlideElement = {
                ...newSlides[indexSlide].elements[i],
                textProps: {
                    textColor: textPropsValue.textColor != null ? textPropsValue.textColor : newSlides[indexSlide].elements[i].textProps!.textColor,
                    bgColor: textPropsValue.bgColor != null ? textPropsValue.bgColor : newSlides[indexSlide].elements[i].textProps!.bgColor,
                    textValue: textPropsValue.textValue != null ? textPropsValue.textValue : newSlides[indexSlide].elements[i].textProps!.textValue,
                    fontSize: textPropsValue.fontSize != null ? textPropsValue.fontSize : newSlides[indexSlide].elements[i].textProps!.fontSize,
                    fontWeight: textPropsValue.fontWeight != null ? textPropsValue.fontWeight : newSlides[indexSlide].elements[i].textProps!.fontWeight,
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

type ChangeColorArgs = {
    newColor: string,
    selectedElementsId: Array<string>
}

function changeStrokeColor(editor: Editor, { newColor, selectedElementsId}: ChangeColorArgs): Editor {
    const newHistory: History = addActionToHistory(editor);
    const newSlides: Array<Slide> = editor.presentation.slides.concat();
    const indexSlide: number = newSlides.findIndex(slide => slide.slideId === editor.currentSlideIds[0]);
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

function changeFillColor(editor: Editor, { newColor, selectedElementsId }: ChangeColorArgs): Editor {
    const newHistory: History = addActionToHistory(editor);
    const newSlides: Array<Slide> = editor.presentation.slides.concat();
    const indexSlide: number = newSlides.findIndex(slide => slide.slideId === editor.currentSlideIds[0]);
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


type DeleteSelectedArgs = {
    selectedElementsId: Array<string>
}

function deleteSelected(editor: Editor, { selectedElementsId }: DeleteSelectedArgs): Editor {
    const newHistory: History = addActionToHistory(editor);
    const newSlides: Array<Slide> = editor.presentation.slides.concat();
    const indexSlide: number = newSlides.findIndex(slide => slide.slideId === editor.currentSlideIds[0]);
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

export { addObject }