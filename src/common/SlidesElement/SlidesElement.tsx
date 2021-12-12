import './SlidesElement.css'
import { Figure } from "./Figure/Figure";
import type { SlideElement } from "../../model/types"

interface SlidesElementProps {
    slideElement: SlideElement 
}

const SlidesElement = ({
    slideElement,
}: SlidesElementProps) => {
    slideElement.elementId = '';
    switch (slideElement.elementType) {
        case "text": 
            return (
                <div
                    className = 'slide-element'
                >
                </div>
            )
        case "figure":
            return (
                <div
                    className = 'slide-element'
                    style = {{
                        'top': slideElement.position.y,
                        'left': slideElement.position.x
                    }}
                >
                    <Figure
                        figure = {slideElement.figure!}
                        size = {slideElement.size}
                    />
                </div>
            )    
        case "image":
            return (
                <div
                    className = 'slide-element'
                >
                </div>
            )    
    }
    
}

export { SlidesElement }