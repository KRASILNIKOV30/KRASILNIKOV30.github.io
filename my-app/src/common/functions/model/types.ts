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
    isSelected?: boolean;
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
    strokeWidth: number;
    strokeColor: string;
    fillColor: string
}

export type { TextType, SlideElement, Slide, Presentation, History, Editor, FigureType, Size };