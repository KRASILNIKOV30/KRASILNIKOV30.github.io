import React, { useCallback, useEffect, useState } from "react";
import type { Editor, Position } from '../../model/types'

export function useDragAndDrop(
        elementRef: React.RefObject<HTMLElement|null>, 
        position: Position, 
        changePosition: Function
    ) {
    const [elementPosition, setElementPosition] = useState({
        x: position.x,
        y: position.y
    })

    const onMouseDown = useCallback((e: MouseEvent) => {
        console.log('mouseDown')
        if (elementRef.current && elementRef.current.contains(e.target as Node)) {
            setElementPosition({
                x: e.clientX,
                y: e.clientY
            })        
        }
    }, [elementRef])

    const onMouseMove = (e: MouseEvent) => {
        console.log('onMouseMove')
        const newX = e.clientX;
        const newY = e.clientY;
        setElementPosition({
            x: newX,
            y: newY
        })
    }

    const onMouseUp = (e: MouseEvent) => {
        const newX = e.clientX;
        const newY = e.clientY;
        window.removeEventListener('mousemove', onMouseMove)
        setElementPosition({
            x: newX,
            y: newY
        })
        changePosition({
            newX: newX,
            newY: newY
        })
    }

    useEffect(() => {
        //window.addEventListener('mousedown', onMouseDown)
        window.addEventListener('mousemove', onMouseMove)
        if (elementRef.current) {
            elementRef.current.style.left = `${elementPosition.x}px` 
            elementRef.current.style.top = `${elementPosition.y}px`
        }
        window.removeEventListener('mouseup', onMouseUp)
    }, [onMouseDown])

    return () => {
        if (elementRef.current) {
            window.removeEventListener('mousedown', onMouseDown)
        }
    }
}