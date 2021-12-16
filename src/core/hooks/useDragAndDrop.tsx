import React, { useCallback, useEffect, useLayoutEffect, useState } from "react";
import { changePosition } from "../../model/element";
import type { Editor, Position } from '../../model/types'

interface useDragAndDropProps {
    elementRef: React.RefObject<HTMLDivElement>, 
    position: Position,
    setElementPosition: React.Dispatch<React.SetStateAction<{ x: number; y: number; }>>,
    elementPosition: Position,
    changeModel: Function/* (func: Function, object: object) => void */
}

export function useDragAndDrop({
        elementRef,
        position, 
        setElementPosition,
        elementPosition,
        changeModel
}: useDragAndDropProps) {
    let startX = 0;
    let startY = 0;    

    const onMouseDown = useCallback((e: MouseEvent) => {
        if (elementRef.current) 
        {
            window.addEventListener('mouseup', onMouseUp);
            window.addEventListener('mousemove', onMouseMove);
            window.removeEventListener('mousedown', onMouseDown)
            startX = e.clientX;
            startY = e.clientY;
        }    
    }, [elementRef])

    const onMouseMove = (e: MouseEvent) => {
        const newX = position.x + e.clientX - startX;
        const newY = position.y + e.clientY - startY;
        setElementPosition({
            x: newX,
            y: newY
        })
    }

    const onMouseUp = (e: MouseEvent) => {
        const newX = position.x + e.clientX - startX;
        const newY = position.y + e.clientY - startY;
        window.removeEventListener('mousemove', onMouseMove)
        window.removeEventListener('mouseup', onMouseUp)
        setElementPosition({
            x: newX,
            y: newY
        })
        changeModel(changePosition, {newX, newY})
    }

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