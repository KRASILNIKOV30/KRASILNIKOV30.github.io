import React, { useCallback, useEffect, useRef, useState } from "react";

interface useDragAndDropProps {
    elementRef: React.RefObject<HTMLDivElement>,
    onMouseUpFunction: Function,
}

export function useDragAndDrop({
        elementRef,
        onMouseUpFunction: onMouseUpFunction
}: useDragAndDropProps) {
    const isStartPosDeclared = useRef(false);
    const startObjectPositionX = useRef<number>(0);
    const startObjectPositionY = useRef<number>(0);

    const [elementPosition, setElementPosition] = useState({
        x: startObjectPositionX.current,
        y: startObjectPositionY.current
    })

    const startClientX = useRef(0);
    const startClientY = useRef(0); 

    const onMouseMove = useCallback((e: MouseEvent) => {
        if (isStartPosDeclared.current) {
            let newX = startObjectPositionX.current + e.clientX - startClientX.current;
            let newY = startObjectPositionY.current + e.clientY - startClientY.current;
            setElementPosition({
                x: newX,
                y: newY
            })
        }
    }, [setElementPosition])
    
    const onMouseUp = useCallback((e: MouseEvent) => {
        if (isStartPosDeclared.current) {
            const shiftX = e.clientX - startClientX.current;
            const shiftY = e.clientY - startClientY.current
            let newX = startObjectPositionX.current + e.clientX - startClientX.current;
            let newY = startObjectPositionY.current + e.clientY - startClientY.current;
            window.removeEventListener('mousemove', onMouseMove)
            window.removeEventListener('mouseup', onMouseUp)
            setElementPosition({
                x: newX,
                y: newY
            })
           onMouseUpFunction({shiftX, shiftY})   
        }
    }, [onMouseUpFunction])

    const onMouseDown = useCallback((e: MouseEvent) => {
        if (elementRef.current) {
            window.addEventListener('mouseup', onMouseUp);
            window.addEventListener('mousemove', onMouseMove);
            window.removeEventListener('mousedown', onMouseDown);
            const strX = elementRef.current?.style.left;
            const strY = elementRef.current?.style.top;
            startObjectPositionX.current = Number(strX?.substring(0, strX.length - 2));
            startObjectPositionY.current = Number(strY?.substring(0, strY.length - 2));
            isStartPosDeclared.current = true
            startClientX.current = e.clientX;
            startClientY.current = e.clientY;
        }    
    }, [elementRef, onMouseMove, onMouseUp])
    
    useEffect(() => {
        if (elementRef.current && isStartPosDeclared.current) {
            elementRef.current.style.left = `${elementPosition.x}px`;
            elementRef.current.style.top = `${elementPosition.y}px`
        } 
    }, [elementPosition, setElementPosition])

    useEffect(() => {
        if (elementRef.current) {
            elementRef.current.addEventListener('mousedown', onMouseDown)
        } 
    }, [onMouseDown])

    return () => {
        if (elementRef.current) {
            elementRef.current.removeEventListener('mousedown', onMouseDown)
        }
    }
}