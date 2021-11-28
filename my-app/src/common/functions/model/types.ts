import { url } from "inspector"

type Editor = {
    presentation: Presentation;
    history: History;
    statePreview: boolean;
    currentSlideIds: Array<string>
} 

type History = {
    undoStack: Array<Presentation>;
    redoStack: Array<Presentation>
}

type Presentation = {
    title: string;
    slides: Array<Slide>
}

type Slide = {
    slideId: string;
    elements: Array<SlideElement>;
    background: string;
    backgroundType: "url" | "Base64";
    selectedElementsIds: Array<string>
}

type SlideElement = {
    elementId: string;
    elementType: "text" | "figure" | "image";
    position: Position; 
    size: Size; 
    image?: ImageType;
    textProps?: TextType;
    figure?: FigureType
}

type Position = {
    x: number;
    y: number
}

type Size = {
    width: number;
    height: number
}

type ImageType = {
    urlImage: string;
    imageType: "url" | "Base64";
    ext: string
}

type TextType = {
    textColor: string | null;
    bgColor: string | null;
    textValue: string | null;
    fontSize: string | null;
    fontWeight: "light" | "regular" | "bold" | null
}

type FigureType = {
    form: "rectangle" | "circle" | "triangle";
    strokeColor: string;
    fillColor: string
}

const editor: Editor = {
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
                            fillColor: "#d0ff00"
                        }
                    }
                ],
                background: "#FFFFFF",
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

export type { TextType, SlideElement, Slide, Presentation, History, Editor, editor };