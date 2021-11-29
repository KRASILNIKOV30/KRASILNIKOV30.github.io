import { Console } from "console";
import { Button } from "../Button/Button";
import type {SlideElement} from "../functions/model/types"

interface SlideElementProps {
    slideElement: SlideElement 
}

const SlideElement = ({
    slideElement,
}: SlideElementProps) => {
    slideElement.elementId = '';
    switch (slideElement.elementType) {
        case "text": 

        break;
        case "figure":

        break;
        case "image":

        break;
    }
    return (
       <div>
       </div>
    )
}

export { SlideElement }