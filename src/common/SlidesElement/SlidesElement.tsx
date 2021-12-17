import './SlidesElement.css'
import { Figure } from "./Figure/Figure"
import { Text } from "./Text/Text"
import type { SlideElement } from "../../model/types"
import { useRef } from 'react';
import { dispatch } from '../../model/editor'
import { changeTextProps } from '../../model/element'
import { useDragAndDrop } from '../../core/hooks/useDragAndDrop';

interface SlidesElementProps {
    slideElement: SlideElement,
    active: boolean
}

const SlidesElement = ({
    slideElement,
    active
}: SlidesElementProps) => {
    const slideElementRef = useRef<HTMLDivElement>(null)

     useDragAndDrop(
        slideElementRef, 
        {
            x: Number(slideElementRef.current?.style.left),
            y: Number(slideElementRef.current?.style.top)   
        },
        console.log
    )

    switch (slideElement.elementType) {
        case "text": 
            return (
                <div
                    ref = {slideElementRef}
                    className = {active ? 'slide_element-active' : 'slide_element'}
                    style = {{
                        'top': slideElement.position.y,
                        'left': slideElement.position.x,
                    }}
                >
                    {
                        active &&
                        <div className = 'points_container'>
                            <div className="point point-top_left"></div>
                            <div className="point point-top_right"></div>
                            <div className="point point-bottom_left"></div>
                            <div className="point point-bottom_right"></div>
                        </div>
                    }
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
                    className = {active ? 'slide_element-active' : 'slide_element'}
                    style = {{
                        'top': slideElement.position.y,
                        'left': slideElement.position.x
                    }}
                >
                    {
                        active &&
                        <div className = 'points_container'>
                            <div className="point point-top_left"></div>
                            <div className="point point-top_right"></div>
                            <div className="point point-bottom_left"></div>
                            <div className="point point-bottom_right"></div>
                        </div>
                    }
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
                    className = {active ? 'slide_element-active' : 'slide_element'}
                    style = {{
                        'top': slideElement.position.y,
                        'left': slideElement.position.x,
                        'width': slideElement.size.width,
                        'height': slideElement.size.height
                    }}
                >
                    {
                        active &&
                        <div className = 'points_container'>
                            <div className="point point-top_left"></div>
                            <div className="point point-top_right"></div>
                            <div className="point point-bottom_left"></div>
                            <div className="point point-bottom_right"></div>
                        </div>
                    }
                    <img src = {slideElement.image?.urlImage}/>
                </div>
            )    
    }
    
}

export { SlidesElement }