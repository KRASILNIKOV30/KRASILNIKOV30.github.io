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
                            textColor: "#000000",
                            bgColor: "#ff0000",
                            textValue: "Hello Kerim!",
                            fontSize: "16px",
                            fontWeight: "regular"
                        }
                    },
                    {
                        elementId: "1",
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
                            form: "rectangle",
                            strokeColor: "#d0ff00",
                            strokeWidth: 2,
                            fillColor: "#00ff2a"
                        }
                    },
                    {
                        elementId: "2",
                        elementType: "figure",
                        position: {
                            x: 564,
                            y: 455
                        },
                        size: {
                            width: 50,
                            height: 50
                        },
                        figure: {
                            form: "triangle",
                            strokeColor: "#00ff2a",
                            strokeWidth: 0,
                            fillColor: "#d0ff00"
                        }
                    }
                ],
                background: "#FFF2AF",
                backgroundType: 'Base64',
                selectedElementsIds: []
            }, 
            {
                slideId: "1",
                elements: [
                    {
                        elementId: "0",
                        elementType: "image",
                        position: {
                            x: 54,
                            y: 405
                        },
                        size: {
                            width: 450,
                            height: 59
                        },
                        image: {
                            urlImage: "./assets/image",
                            imageType: "url",
                            ext: 'svg'
                        }
                    }
                ],
                background: "#000FFF",
                backgroundType: 'Base64',
                selectedElementsIds: ['0']
            }
        ]
    },
    history: {
        undoStack: [],
        redoStack: []
    },
    statePreview: false,
    currentSlideIds: ['0']
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

export { dispatch, getEditor, addEditorChangeHandler };