type Editor = {
    presentation: Presentation;
    history: History;
    statePreview: boolean;
    selectedSlideId: string;
}

type Presentation = {
    title: string;
    slides: Array<Slide>;
}

type Slide = {
    slideId: string;
    elements: Array<SlideElement>;
    background: string;
    selectedElementId: string;
}

type SlideElement = {
    elementId: string;
    elementType: "text" | "figure" | "image";
    position: Position;  
    bgColor: string;
    size: Size;
    image: ImageType;
    text: TextType;
    figure: FigureType
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
    strokeColor: string;
    fillcolor: string;
    form: string
}

export { Editor, SlideElement, Slide, Presentation }  