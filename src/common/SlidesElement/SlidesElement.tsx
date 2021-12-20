import styles from './SlidesElement.module.css'
import { Figure } from "./Figure/Figure"
import { Text } from "./Text/Text"
import type { SlideElement } from "../../model/types"
import { useRef } from 'react';
import { dispatch } from '../../model/editor'
import { changeTextProps, changePosition, selectElement, selectManyElements } from '../../model/element'
import { useDragAndDrop } from '../../core/hooks/useDragAndDrop';
import type { Position } from '../../core/types/types'

interface SlidesElementProps {
    slideElement: SlideElement,
    active: boolean,
}

const SlidesElement = ({
    slideElement,
    active
}: SlidesElementProps) => {
    const slideElementRef = useRef<HTMLDivElement>(null);

    useDragAndDrop({
        elementRef: slideElementRef, 
        onMouseUpFunction: (Coordinates: Position) => dispatch(changePosition, Coordinates)
    })

    switch (slideElement.elementType) {
        case "text": 
            return (
                <div
                    ref = {active ? slideElementRef : null}
                    className = {`${active ? styles.element_active : styles.element}`}
                    style = {{
                        'top': slideElement.position.y,
                        'left': slideElement.position.x,
                    }}
                    onClick = {(e) => {
                        if (!active) {
                            if (e.ctrlKey || e.shiftKey) {
                                dispatch(selectManyElements, { elementId: slideElement.elementId })
                            }
                            else {
                                dispatch(selectElement, { elementId: slideElement.elementId })
                            }
                        }
                    }}
                >
                    {
                        active &&
                        <div className = {styles.points_container}>
                            <div className={`${styles.point} ${styles.point_top_left}`}></div>
                            <div className={`${styles.point} ${styles.point_top_right}`}></div>
                            <div className={`${styles.point} ${styles.point_bottom_left}`}></div>
                            <div className={`${styles.point} ${styles.point_bottom_right}`}></div>
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
                    className = {`${active ? styles.element_active : styles.element}`}
                    style = {{
                        'top': slideElement.position.y,
                        'left': slideElement.position.x
                    }}
                    onClick = {(e) => {
                        if (!active) {
                            if (e.ctrlKey || e.shiftKey) {
                                dispatch(selectManyElements, { elementId: slideElement.elementId })
                            }
                            else {
                                dispatch(selectElement, { elementId: slideElement.elementId })
                            }
                        }
                    }}
                >
                    {
                        active &&
                        <div className = {styles.points_container}>
                            <div className={`${styles.point} ${styles.point_top_left}`}></div>
                            <div className={`${styles.point} ${styles.point_top_right}`}></div>
                            <div className={`${styles.point} ${styles.point_bottom_left}`}></div>
                            <div className={`${styles.point} ${styles.point_bottom_right}`}></div>
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
                    ref = {active ? slideElementRef : null}
                    className = {`${active ? styles.element_active : styles.element}`}
                    style = {{
                        'top': slideElement.position.y,
                        'left': slideElement.position.x,
                        'width': slideElement.size.width,
                        'height': slideElement.size.height
                    }}
                    onClick = {(e) => {
                        if (!active) {
                            if (e.ctrlKey || e.shiftKey) {
                                dispatch(selectManyElements, { elementId: slideElement.elementId })
                            }
                            else {
                                dispatch(selectElement, { elementId: slideElement.elementId })
                            }
                        }
                    }}
                >
                    {
                        active &&
                        <div className = {styles.points_container}>
                            <div className={`${styles.point} ${styles.point_top_left}`}></div>
                            <div className={`${styles.point} ${styles.point_top_right}`}></div>
                            <div className={`${styles.point} ${styles.point_bottom_left}`}></div>
                            <div className={`${styles.point} ${styles.point_bottom_right}`}></div>
                        </div>
                    }
                    <img
                        src = {slideElement.image}
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