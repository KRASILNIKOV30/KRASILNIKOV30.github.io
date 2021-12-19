import './SlidesElement.css'
import { Figure } from "./Figure/Figure"
import { Text } from "./Text/Text"
import type { SlideElement } from "../../model/types"
import { useRef } from 'react';
import { dispatch } from '../../model/editor'
import { changeTextProps, changePosition, changeSize } from '../../model/element'
import { useDragAndDrop } from '../../core/hooks/useDragAndDrop';
import type { Position, Size } from '../../core/types/types'
import { useResize } from '../../core/hooks/useResize';

interface SlidesElementProps {
    slideElement: SlideElement,
    active: boolean
}

const SlidesElement = ({
    slideElement,
    active
}: SlidesElementProps) => {
    const slideElementRef = useRef<HTMLDivElement>(null);
    const edgeRef = useRef<HTMLDivElement>(null)

    useDragAndDrop({
        elementRef: slideElementRef, 
        onMouseUpFunction: (coordinates: Position) => dispatch(changePosition, coordinates)
    })

    const edgeType = useRef('')

    useResize({
        elementRef: slideElementRef,
        edgeType,
        onMouseUpFunction: (size: Size) => dispatch(changeSize, size)
    }) 
     

    switch (slideElement.elementType) {
        case "text": 
            return (
                <div
                    ref = {active ? slideElementRef : null}
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
                            <div className="point point-top_left" ></div>
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
                ref = {active ? slideElementRef : null}
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
                            <div className="point point-top_left" onMouseDown={(e) => {edgeType.current = 'top-left'; e.preventDefault()}}></div>
                            <div className="point point-top_right" onMouseDown={(e) => {edgeType.current = 'top-right'; e.preventDefault()}}></div>
                            <div className="point point-bottom_left" onMouseDown={(e) => {edgeType.current = 'bottom-left'; e.preventDefault()}}></div>
                            <div className="point point-bottom_right" onMouseDown={(e) => {edgeType.current = 'bottom-right'; e.preventDefault()}}></div>
                        </div>
                    }
                    <Figure
                        figure = {slideElement.figure!}
                        size = {{
                            width: slideElementRef.current ? Number(slideElementRef.current?.style.width.substring(0, slideElementRef.current?.style.width.length - 2)) : slideElement.size.width,
                            height: slideElementRef.current ? Number(slideElementRef.current?.style.height.substring(0, slideElementRef.current?.style.height.length - 2)) : slideElement.size.height
                        }}
                    />
                </div>
            )    
        case "image":
            return (
                <div
                ref = {active ? slideElementRef : null}
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
                    <img 
                        src = {slideElement.image?.urlImage}
                        style={{
                            'width': slideElement.size.width,
                            'height': slideElement.size.height
                        }}
                    />
                </div>
            )    
    }
    
}

export { SlidesElement }