import './SlidesElement.css'
import { Figure } from "./Figure/Figure"
import { Text } from "./Text/Text"
import type { SlideElement } from "../../model/types"
import { useRef } from 'react';
import { dispatch } from '../../model/editor'
import { changeTextProps, changePosition } from '../../model/element'
import { useDragAndDrop } from '../../core/hooks/useDragAndDrop';
import type { Position } from '../../core/types/types'

interface SlidesElementProps {
    slideElement: SlideElement 
}

const SlidesElement = ({
    slideElement,
}: SlidesElementProps) => {
    const slideElementRef = useRef<HTMLDivElement>(null);
    
    const startObjectPosition: Position = {
        x: slideElement.position.x,
        y: slideElement.position.y
    }

    useDragAndDrop({
        elementRef: slideElementRef, 
        startObjectPosition,
        onMouseUpFunction: (Coordinates: Position) => dispatch(changePosition, Coordinates)
    })

    switch (slideElement.elementType) {
        case "text": 
            return (
                <div
                    className = 'slide-element'
                    style = {{
                        'top': slideElement.position.y,
                        'left': slideElement.position.x,
                    }}
                >
                    <Text
                        text = {slideElement.textProps!}
                        onKeyUp = {(value) => {
                            if (value !== '') {
                                dispatch(changeTextProps, {
                                    textPropsValue: {
                                        textColor: slideElement.textProps?.textColor,
                                        bgColor: slideElement.textProps?.bgColor,
                                        textValue: value,
                                        fontSize: slideElement.textProps?.fontSize,
                                        fontWeight: slideElement.textProps?.fontWeight
                                    },
                                    SelectedElementIds: [slideElement.elementId]
                                });
                            }
                        }}
                    />
                </div>
            )
        case "figure":
            return (
                <div
                    ref = {slideElementRef}
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
                    ref = {slideElementRef}
                    className = 'slide-element'
                    style = {{
                        'top': slideElement.position.y,
                        'left': slideElement.position.x,
                        'width': slideElement.size.width,
                        'height': slideElement.size.height
                    }}
                >
                    <img src = {slideElement.image?.urlImage}/>
                </div>
            )    
    }
    
}

export { SlidesElement }