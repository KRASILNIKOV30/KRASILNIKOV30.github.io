type Editor = {
    presentation: Presentation;
    history: History;
    state: string;
    selectedSlideId: string;
}

type Presentation = {
    title: string;
    slides: Array<Slide>;
}

type Slide = {
    slideId: string;
    Elements: Array<SlideElement>;
    background: string;
    selectedElementId: string;
}

type SlideElement = {
    elementId: string;
    elementType: "text" | "figure" | "image";
    x: number;
    y: number;
    width: number;
    height: number;
    bgColor: string;
    urlImage?: string;
    ext?: string;
    textcolor?: string;
    text?: string;
    fontSize?: string;
    textWeight?: "light" | "regular" | "bold";
    strokeColor?: string;
    fillcolor?: string;
    form?: string;
}

export { Editor, SlideElement }  