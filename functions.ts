import { Editor, SlideElement, Slide, Presentation, History, TextType } from "./types";
//Создать textStyle и менять его
import { uuid } from "uuidv4";

function addActionToHistory(editor: Editor): History {
    const newHistory: History = editor.history;
    if(newHistory.undoStack.length = 100) {
        newHistory.undoStack.shift();
    }
    while(newHistory.redoStack.length !== 0) {
        newHistory.redoStack.pop();
    }
    newHistory.undoStack.push(editor.presentation);
    return (newHistory)
}

function changeTitle(editor: Editor, title: string): Editor {
    const newHistory: History = addActionToHistory(editor);
    return {
        ...editor,
        history: newHistory,
        presentation: {
            ...editor.presentation,
            title: title,
        } 
    }
}

function saveDoc(editor: Editor): Editor {
    return(editor)
}

function uploadDoc(editor: Editor): Editor {
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
    if (editor.history.undoStack.length !== 0) {
        const newHistory: History = editor.history;
        const newPresentation: Presentation = newHistory.undoStack.pop()!;
        newHistory.redoStack.push(editor.presentation);
        return {
            ...editor,
            history: newHistory,
            presentation: newPresentation
        }
    }
    return(editor)
}

function redo(editor: Editor): Editor {
    if (editor.history.redoStack.length !== 0) {
        const newHistory: History = editor.history;
        const newPresentation: Presentation = newHistory.redoStack.pop()!;
        newHistory.undoStack.push(editor.presentation);
        return {
            ...editor, 
            history: newHistory,
            presentation: newPresentation
        }
    }
    return(editor)
}

function addSlide(editor: Editor): Editor {
    const newHistory: History = addActionToHistory(editor);
    const newSlides: Array<Slide> = editor.presentation.slides.concat();
    newSlides.push({
        slideId: uuid(),
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