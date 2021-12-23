import { deepClone } from "../core/functions/deepClone";
import { Editor } from "./types"

let editor: Editor = {
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

let editorChangeHandler: Function;

function getEditor() {
    return editor
}

function setEditor(newEditor: Editor) {
    editor = newEditor
}

function addEditorChangeHandler(handler: Function) {
    editorChangeHandler = handler;
}

function dispatch(modifyFn: Function, payload: object) {
    const newEditor = modifyFn(editor, payload)
    setEditor(newEditor)

    if (editorChangeHandler)
    {
        editorChangeHandler()
    }
}

function uploadDoc() {
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
                    setEditor(newEditor);
                    editorChangeHandler()
                }
            };
        }
    }
    inputFile.click();
    inputFile.remove();
}

export { dispatch, getEditor, addEditorChangeHandler, uploadDoc };