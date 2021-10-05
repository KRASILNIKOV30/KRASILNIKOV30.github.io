type Editor = {
    presentation: Presentation;
    history: History;
    statePreview: boolean;
    currentSlideId: string;
}

type Presentation = {
    title: string;
    slides: Array<Slide>;
}

type Slide = {
    slideId: string;
    elements: Array<SlideElement>;
    background: string;
    selectedElementsId: Array<string>;
}

type SlideElement = {
    elementId: string;
    elementType: "text" | "figure" | "image";
    position: Position; 
    size: Size; 
    bgColor?: string;
    image?: ImageType;
    text?: TextType;
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
    ext: string
}

type TextType = {
    textcolor: string;
    text: string;
    fontSize: string;
    textWeight: "light" | "regular" | "bold"
}

type FigureType = {
    form: "text" | "figure" | "image";
    strokeColor: string;
    fillcolor: string
}

export { Editor, SlideElement, Slide, Presentation }  