/**
 * 
 * @param {string} elementType 
 */
 let specialProps = (elementType) => {
    switch(elementType) {
        case "image": return({urlImage: "../../assets/image1", ext: "jpg"});
        case "text": return({textColor: "black", text: "Hello Kerim", fontSize: "16px", textWeight: "regular"});
        case "figure": return({stroke: true, strokeColor: "green", fill: true, fillColor: "blue", form: "circle"}) 
    } 
}

editor = {
    presentation: {},
    history: {},
    state: "editor",
    selectedSlideId: "0"
};

editor.history = {

};

editor.presentation = {
    title: "Braviypresentation",
    slides: [slide={}, slide={}]
};

editor.presentation.slides[0] = {
    slideId: "0",
    elements: [element={}, element={}, element={}],
    background: "URL"
};

editor.presentation.slides[0].elements[0] = {
    elementId: "0",
    elementType: "text",
    x: 234,
    y: 111,
    width: 50,
    height: 50,
    bgColor: "red",
    specialProps: specialProps("text")
};

editor.presentation.slides[0].elements[1] = {
    elementId: "1",
    elementType: "figure",
    x: 32,
    y: 64,
    width:356,
    height: 93,
    bgColor: "green",
    specialProps: specialProps("figure")
}

editor.presentation.slides[0].elements[2] = {
    elementId: "2",
    elementType: "figure",
    x: 564,
    y: 455,
    width: 50,
    height: 50,
    bgColor: "red",
    specialProps: specialProps("figure")
}

editor.presentation.slides[1] = {
    slideId: "1",
    elements: [element={}, element={}, element={}],
    background: "URL"
}

editor.presentation.slides[1].elements[0] = {
    elementId: "0",
    elementType: "text",
    x: 564,
    y: 455,
    width: 50,
    height: 50,
    bgColor: "white",
    specialProps: specialProps("text")
}

editor.presentation.slides[1].elements[1] = {
    elementId: "1",
    elementType: "image",
    x: 54,
    y: 405,
    width: 450,
    height: 59,
    bgColor: "white",
    specialProps: specialProps("image")
}

editor.presentation.slides[1].elements[2] = {
    elementId: "2",
    elementType: "image",
    x: 54,
    y: 405,
    width: 450,
    height: 59,
    bgColor: "red",
    specialProps: specialProps("image")
}
