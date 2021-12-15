import React, { useCallback, useEffect, useRef, useState } from "react";
import type { Editor, Position } from '../../model/types'

export function useDragAndDrop(
        elementRef: React.RefObject<HTMLElement|null>, 
        position: Position, 
        changePosition: Function
    ) {
    let startX = 0;
    let startY = 0;
    console.log(elementRef.current)    
    const [elementPosition, setElementPosition] = useState({
        x: position.x,
        y: position.y
    })

    const onMouseDown = useCallback((e: MouseEvent) => {
        console.log('onMouseDown')
        if (elementRef.current) 
        {
            window.addEventListener('mouseup', onMouseUp)
            window.addEventListener('mousemove', onMouseMove)
            startX = e.clientX;
            startY = e.clientY;
        } else {
            console.log('error')
        }    
    }, [elementRef])

    const onMouseMove = (e: MouseEvent) => {
        console.log('onMouseMove')
        const newX = e.clientX - startX + position.x;
        const newY = e.clientY - startY + position.y;
        setElementPosition({
            x: newX,
            y: newY
        })
    }

    const onMouseUp = (e: MouseEvent) => {
        console.log('onMouseUp')
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
        console.log('moving')
        if (elementRef.current) {
            elementRef.current.style.left = `${elementPosition.x}px`;
            elementRef.current.style.top = `${elementPosition.y}px`
        } 
    }, [elementPosition])

    useEffect(() => {
        //window.addEventListener('mouseup', onMouseUp)
        if (elementRef.current) {
            elementRef.current.addEventListener('mousedown', onMouseDown)
        } else {
            console.log('error');
            console.log(position)
        }
      
    }, [onMouseDown])

    return () => {
        if (elementRef.current) {
            elementRef.current.removeEventListener('mousedown', onMouseDown)
        }
    }
}