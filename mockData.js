let editor = {
    presentation: {},
    history: {},
    state: "editor"
};

editor.history = {

};

editor.presentation = {
    title: "Braviypresentation",
    slides: [slide={}, slide={}]
};

editor.presentation.slides[0] = {
    slideId: "1",
    elements: [element={}, element={}, element={}],
    background: "URL"
};

editor.presentation.slides[0].elements[0] = {
    elementId: "1",
    elementType: "image",
    x: 234,
    y: 111,
    width: 50,
    height: 50,
    bgColor: "red",
    specialProps(elementType)
};

urlImage = "../../assets/image1";
ext = "jpg";
textColor = "black";
text = "Hello Kerim";
fontSize = "16px";
textWeight = "regular";
stroke = true;
strokeColor = "green";
fill = true;
fillColor = "blue";
form = "circle";

let specialProps = (elementType) => {
    switch(elementType) {
        case "image": return(urlImage, ext);
        case "text": return(textColor, text, fontSize, textWeight);
        case "figure": return(stroke, strokeColor, fill, fillColor, form) 
    } 
}
console.log(editor.presentation.slides[0].elements[0]);