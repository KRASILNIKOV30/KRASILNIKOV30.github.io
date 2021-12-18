import React, { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";
import type { Position } from '../../core/types/types'

interface useDragAndDropProps {
    elementRef: React.RefObject<HTMLDivElement>, 
    startObjectPosition: Position,
    onMouseUpFunction: Function
}

export function useDragAndDrop({
        elementRef,
        startObjectPosition, 
        onMouseUpFunction: onMouseUpFunction
}: useDragAndDropProps) {
    const [elementPosition, setElementPosition] = useState({
        x: startObjectPosition.x,
        y: startObjectPosition.y
    })
    const startClientX = useRef(0);
    const startClientY = useRef(0);    

    const onMouseMove = useCallback((e: MouseEvent) => {
        const newX = startObjectPosition.x + e.clientX - startClientX.current;
        const newY = startObjectPosition.y + e.clientY - startClientY.current;
        setElementPosition({
            x: newX,
            y: newY
        })
    }, [])
    
    const onMouseUp = useCallback((e: MouseEvent) => {
        const newX = startObjectPosition.x + e.clientX - startClientX.current;
        const newY = startObjectPosition.y + e.clientY - startClientY.current;
        window.removeEventListener('mousemove', onMouseMove)
        window.removeEventListener('mouseup', onMouseUp)
        setElementPosition({
            x: newX,
            y: newY
        })
        onMouseUpFunction({newX, newY})
    }, [])

    const onMouseDown = useCallback((e: MouseEvent) => {
        if (elementRef.current) 
        {
            window.addEventListener('mouseup', onMouseUp);
            window.addEventListener('mousemove', onMouseMove);
            window.removeEventListener('mousedown', onMouseDown)
            startClientX.current = e.clientX;
            startClientY.current = e.clientY;
        }    
    }, [elementRef, onMouseMove, onMouseUp])
    
    useEffect(() => {
        if (elementRef.current) {
            elementRef.current.style.left = `${elementPosition.x}px`;
            elementRef.current.style.top = `${elementPosition.y}px`
        } 
    }, [elementPosition])

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