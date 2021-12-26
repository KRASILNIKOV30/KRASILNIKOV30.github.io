import styles from './SlidesElement.module.css'
import { Figure } from "./Figure/Figure"
import { Text } from "./Text/Text"
import type { SlideElement } from "../../model/types"
import { useCallback, useRef } from 'react';
import { dispatch } from '../../model/editor'
import { changeTextProps, changePosition, selectElement, selectManyElements, removeSelection, changeSize } from '../../model/element';
import { useResize } from '../../core/hooks/useResize';
import { useDragAndDrop } from '../../core/hooks/useDragAndDrop';
import type { Position, Size } from '../../core/types/types';
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
        onMouseUpFunction: onMouseUpFunction,
    })

    let edgeRef = useRef<HTMLDivElement>(null);

    type CornersType = {
        topLeft: React.RefObject<HTMLDivElement>,
        topRight: React.RefObject<HTMLDivElement>,
        bottomLeft: React.RefObject<HTMLDivElement>,
        bottomRight: React.RefObject<HTMLDivElement>
    }

    const topLeftRef = useRef<HTMLDivElement>(null);
    const topRightRef = useRef<HTMLDivElement>(null);
    const bottomLeftRef = useRef<HTMLDivElement>(null);
    const bottomRightRef = useRef<HTMLDivElement>(null);

    const corners: CornersType = {
        topLeft: topLeftRef,
        topRight: topRightRef,
        bottomLeft: bottomLeftRef,
        bottomRight: bottomRightRef
    }

    useResize({
        elementRef: slideElementRef,
        edgeRef,
        corners,
        onMouseUpFunctions: [
            (size: Size) => dispatch(changeSize, size),
            (coordinates: Position) => dispatch(changePosition, coordinates)
        ]
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
                            <div className={`${styles.point} ${styles.point_top_left}`} ref = {topLeftRef} id = 'top-left'></div>
                            <div className={`${styles.point} ${styles.point_top_right}`} ref = {topRightRef} id = 'top-right'></div>
                            <div className={`${styles.point} ${styles.point_bottom_left}`} ref = {bottomLeftRef} id = 'bottom-left'></div>
                            <div className={`${styles.point} ${styles.point_bottom_right}`} ref = {bottomRightRef} id = 'bottom-right'></div>
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
                            <div className={`${styles.point} ${styles.point_top_left}`} ref = {topLeftRef} id = 'top-left'></div>
                            <div className={`${styles.point} ${styles.point_top_right}`} ref = {topRightRef} id = 'top-right'></div>
                            <div className={`${styles.point} ${styles.point_bottom_left}`} ref = {bottomLeftRef} id = 'bottom-left'></div>
                            <div className={`${styles.point} ${styles.point_bottom_right}`} ref = {bottomRightRef} id = 'bottom-right'></div>
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
                            <div className={`${styles.point} ${styles.point_top_left}`} ref = {topLeftRef} id = 'top-left'></div>
                            <div className={`${styles.point} ${styles.point_top_right}`} ref = {topRightRef} id = 'top-right'></div>
                            <div className={`${styles.point} ${styles.point_bottom_left}`} ref = {bottomLeftRef} id = 'bottom-left'></div>
                            <div className={`${styles.point} ${styles.point_bottom_right}`} ref = {bottomRightRef} id = 'bottom-right'></div>
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