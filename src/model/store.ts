import { createStore } from 'redux';
import { Editor } from "./types"
import { addActionToHistory, editorReducer } from './editor'
import { presentationReducer } from './presentation';
import { slideReducer } from './slide'
import { deepClone } from '../core/functions/deepClone';
import { uploadDoc } from './actionCreators';

let initialState: Editor = {
    presentation: {
        title: "Braviypresentation",
        slides: [
            {
                slideId: "0",
                elements: [
                    {
                        elementId: "0",
                        elementType: "figure",
                        position: {
                            x: 32,
                            y: 64
                        },
                        size: {
                            width: 356,
                            height: 93
                        },
                        figure: {
                            form: "triangle",
                            strokeColor: "#d0ff00",
                            strokeWidth: 5,
                            fillColor: "#ff00ff"
                        }
                    },
                    {
                        elementId: "1",
                        elementType: "figure",
                        position: {
                            x: 70,
                            y: 150
                        },
                        size: {
                            width: 400,
                            height: 400
                        },
                        figure: {
                            form: "circle",
                            strokeColor: "#d0ffff",
                            strokeWidth: 5,
                            fillColor: "#0000ff"
                        }
                    },
                    {
                        elementId: '2',
                        elementType: "text",
                        position: {
                            x: 234,
                            y: 111
                        },
                        size: {
                            width: 50,
                            height: 50
                        },
                        textProps: {
                            font: 'Montserrat',
                            textColor: "#000000",
                            bgColor: "#FFFFFF",
                            textValue: "Hello Kerim!",
                            fontSize: 16,
                            fontWeight: "bold"
                        }
                    },
                    {
                        elementId: "3",
                        elementType: "image",
                        position: {
                            x: 530,
                            y: 50
                        },
                        size: {
                            width: 100,
                            height: 100
                        },
                        image: 'https://www.institutps.ru/upload/images/teachers_photo/arnaberdiev_wide_v2.jpg',
                    }
                ],
                background: "#FFF2AF",
                selectedElementsIds: ['1']
            }, 
            {
                slideId: "1",
                elements: [
                    {
                        elementId: "0",
                        elementType: "image",
                        position: {
                            x: 54,
                            y: 30
                        },
                        size: {
                            width: 450,
                            height: 59
                        },
                        image: "https://www.institutps.ru/upload/images/teachers_photo/arnaberdiev_wide_v2.jpg",
                    }
                ],
                background: "#532232",
                selectedElementsIds: ['0']
            }
        ],
        currentSlideIds: ['0']
    },
    history: {
        undoStack: [],
        redoStack: []
    },
    statePreview: false
};

export type ActionType = {
    type: string,
    newTitle?: string,
    slideId?: string,
    orderShift?: number,
    background?: string,
    element?: string,
    urlImage?: string,
    elementId?: string,
    changePositionCoordinates?: {
        newX: number,
        newY: number
    },
    ChangeSizeArgs?: {
        widthShift: number,
        heightShift: number
    },
    ChangeTextArgs?: {
        font?: string
        textColor?: string,
        bgColor?: string,
        textValue?: string,
        fontSize?: number,
        fontWeight?: "light" | "regular" | "bold"
    },
    newWidth?: number,
    newColor?: string,
    newEditor?: Editor
}

export function uploadDocFunction() {
    const inputFile = document.createElement('input')
    inputFile.type = 'file';
    inputFile.style.display = 'none';
    inputFile.accept = 'application/json';
    inputFile.onchange = () => {
        if (inputFile.files) {
            const fileEditor = inputFile.files[0];
            const reader = new FileReader();
            reader.readAsText(fileEditor);
            reader.onload = () => {
                if (typeof reader.result === 'string') {
                    const newEditor = deepClone(JSON.parse(reader.result)) as Editor;
                    store.dispatch(uploadDoc(newEditor));
                }
            };
        }
    }
    inputFile.click();
    inputFile.remove();
}

function mainReducer(state = initialState, action: ActionType): Editor {
    const addInHistory: boolean = (action.type !== 'SAVE_DOCUMENT')
                                && (action.type !== 'EXPORT_DOCUMENT')
                                && (action.type !== 'SWITCH_PREVIEW');
    const indexCurrentSlide: number = state.presentation.slides.findIndex(slide => slide.slideId == state.presentation.currentSlideIds[0]);
    return { 
        ...editorReducer(state, action),
        history: addInHistory? addActionToHistory(state): state.history,
        presentation: {
            ...presentationReducer(state.presentation, action),
            slides: state.presentation.slides.splice(indexCurrentSlide, 1, slideReducer(state.presentation.slides[indexCurrentSlide], action))
        }
    }
}

export let store = createStore(mainReducer, initialState)

export type AppDispatch = typeof store.dispatch