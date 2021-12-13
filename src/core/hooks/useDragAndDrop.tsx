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
        if (elementRef.current) 
        {
            window.addEventListener('mouseup', onMouseUp)
           window.addEventListener('mousemove', onMouseMove)

            if ( elementRef.current.contains(e.target as Node)) {
                setElementPosition({
                    x: e.clientX,
                    y: e.clientY
                })  
            }
                
        }
      
        
    }, [elementRef])

    const onMouseMove = (e: MouseEvent) => {
        console.log('onMouseMove')
        const newX = e.clientX;
        const newY = e.clientY;
        console.log(newX, newY)
        setElementPosition({
            x: newX,
            y: newY
        })
        if (elementRef.current) {
            elementRef.current.style.left = `${newX}px` 
            elementRef.current.style.top = `${newY}px`
        }
    }

    const onMouseUp = (e: MouseEvent) => {
        console.log('onMouseUp')
        const newX = e.clientX;
        const newY = e.clientY;
        {
            window.removeEventListener('mousemove', onMouseMove)
        }
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
        console.log('addEventListener onMouseDown')
        console.log('addEventListener onMouseMove')
        
        
        //window.addEventListener('mouseup', onMouseUp)
        if (elementRef.current) {
            elementRef.current.addEventListener('mousedown', onMouseDown)

            elementRef.current.style.left = `${elementPosition.x}px` 
            elementRef.current.style.top = `${elementPosition.y}px`
        }
      
    }, [onMouseDown])

    return () => {
        if (elementRef.current) {
            elementRef.current.removeEventListener('mousedown', onMouseDown)
        }
    }
}