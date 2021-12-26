import { Editor } from "./types"

//editor
function saveDoc() {
    return {
        type: 'SAVE_DOCUMENT',
    }
}

function uploadDoc(newEditor: Editor) {
    return {
        type: 'UPLOAD_DOC',
        newEditor
    }
}

function exportDoc() {
    return {
        type: 'EXPORT_DOCUMENT',
    }
}

function switchPreview() {
    return {
        type: 'SWITCH_PREVIEW'
    }
}

function undo() {
    return {
        type: 'UNDO'
    }
}

function redo() {
    return {
        type: 'REDO'
    }
}

//presentation
function changeTitle(newTitle: string) {
    return {
        type: 'CHANGE_TITLE',
        newTitle
    }
}

function addSlide() {
    return {
        type: 'ADD_SLIDE'
    }
}

function removeSlides() {
    return {
        type: 'DELETE_SLIDE'
    }
}

function switchSlide(slideId: string) {
    return {
        type: 'SWITCH_SLIDE',
        slideId: slideId
    }
}

function selectOneSlide(slideId: string) {
    return {
        type: 'SELECT_ONE_SLIDE',
        slideId: slideId
    }
}

function selectManySlides(slideId: string) {
    return {
        type: 'SELECT_MANY_SLIDE',
        slideId: slideId
    }
}

function switchSlidePositions(orderShift: number) {
    return {
        type: 'SWITCH_SLIDE_POSITIONS',
        orderShift: orderShift
    }
}

//slide
function setBackground(background: string) {
    return {
        type: 'SET_BACKGROUND',
        background: background
    }
}

function addObject(element: string) {
    return {
        type: 'ADD_OBJECT',
        element: element
    }
}

function addImage(urlImage: string) {
    return {
        type: 'ADD_IMAGE',
        urlImage: urlImage
    }
}

function selectElement(elementId: string) {
    return {
        type: 'SELECT_ELEMENT',
        elementId: elementId
    }
}

function selectManyElements(elementId: string) {
    return {
        type: 'SELECT_MANY_ELEMENTS',
        elementId: elementId
    }
}

function changePosition(newX: number, newY: number) {
    return {
        type: 'CHANGE_POSITION',
        changePositionCoordinates: {
            newX: newX,
            newY: newY
        }
    }
}

function changeSize(widthShift: number, heightShift: number) {
    return {
        type: 'CHANGE_SIZE',
        ChangeSizeArgs: {
            widthShift: widthShift,
            heightShift: heightShift
        }
    }
}

function changeTextProps(
    font?: string,
    textColor?: string,
    bgColor?: string,
    textValue?: string,
    fontSize?: number,
    fontWeight?: "light" | "regular" | "bold"
) {
    return {
        type: 'CHANGE_TEXT_PROPS',
        ChangeTextArgs: {
            font: font,
            textColor: textColor,
            bgColor: bgColor,
            textValue: textValue,
            fontSize: fontSize,
            fontWeight: fontWeight
        }
    }
}

function changeStrokeWidth(newWidth: number) {
    return {
        type: 'CHANGE_STROKE_WIDTH',
        newWidth: newWidth
    }
}

function changeStrokeColor(newColor: string) {
    return {
        type: 'CHANGE_STROKE_COLOR',
        newColor: newColor
    }
}

function changeFillColor(newColor: string) {
    return {
        type: 'CHANGE_FILL_COLOR',
        newColor: newColor
    }
}

function deleteSelected() {
    return {
        type: 'DELETE_SELECTED'
    }
}

export { uploadDoc, redo, undo, switchPreview, exportDoc, saveDoc, changeTitle, addSlide, removeSlides,
         switchSlide, selectOneSlide, selectManySlides, switchSlidePositions, setBackground,
         addObject, addImage, selectElement, selectManyElements, changePosition, changeSize,
         changeTextProps, changeStrokeWidth, changeStrokeColor, changeFillColor, deleteSelected
}