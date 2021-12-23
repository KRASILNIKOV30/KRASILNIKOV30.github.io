import styles from './SlidesElement.module.css'
import { Figure } from "./Figure/Figure"
import { Text } from "./Text/Text"
import type { SlideElement } from "../../model/types"
import { useCallback, useRef } from 'react';
import { dispatch } from '../../model/editor'
import { changeTextProps, changePosition, selectElement, selectManyElements, removeSelection } from '../../model/element'
import { useDragAndDrop } from '../../core/hooks/useDragAndDrop';
import type { Position } from '../../core/types/types';
import { useClickOutside } from '../../core/hooks/useClickOutside'

interface SlidesElementProps {
    slideElement: SlideElement,
    active: boolean,
}

const SlidesElement = ({
    slideElement,
    active
}: SlidesElementProps) => {
    const slideElementRef = useRef<HTMLDivElement>(null);

    const isOnShift = useRef<boolean>(false)
    const clickOutsideFunction = () => {
        window.onmousedown = (e) => {
            isOnShift.current = e.shiftKey;
        }
        if (active && !isOnShift.current) {
            dispatch(removeSelection, { elementId: slideElement.elementId })
        } else {
            return(null)
        }
    }

    useClickOutside(slideElementRef, clickOutsideFunction);
    
    const onMouseUpFunction = useCallback((coordinates: Position) => {
        dispatch(changePosition, coordinates)
    }, [])
    useDragAndDrop({
        elementRef: slideElementRef, 
        onMouseUpFunction,
    })

    switch (slideElement.elementType) {
        case "text": 
            return (
                <div
                    ref = {slideElementRef}
                    className = {`${active ? styles.element_active : styles.element}`}
                    style = {{
                        'top': slideElement.position.y,
                        'left': slideElement.position.x,
                    }}
                    onMouseDown = {(e) => {
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
                                dispatch(changeTextProps, {textValue: value});
                            }
                        }}
                    />
                </div>
            )
        case "figure":
            return (
                <div
                    ref = {slideElementRef}
                    id = {slideElement.elementId}
                    className = {`${active ? styles.element_active : styles.element}`}
                    style = {{
                        'top': slideElement.position.y,
                        'left': slideElement.position.x,
                        'width': slideElement.size.width,
                        'height': slideElement.size.height
                    }}
                    onMouseDown = {(e) => {
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
                    ref = {slideElementRef}
                    className = {`${active ? styles.element_active : styles.element}`}
                    style = {{
                        'top': slideElement.position.y,
                        'left': slideElement.position.x,
                        'width': slideElement.size.width,
                        'height': slideElement.size.height
                    }}
                    onMouseDown = {(e) => {
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