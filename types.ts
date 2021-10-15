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
    textProps: TextType;
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
    ImageType: "url" | "Base64";
    ext: string
}

type TextType = {
    textColor: string;
    bgColor: string;
    textValue: string;
    fontSize: string;
    textWeight: "light" | "regular" | "bold"
}

type FigureType = {
    form: "text" | "figure" | "image";
    strokeColor: string;
    fillcolor: string
}

export { Editor, SlideElement, Slide, Presentation, History }  