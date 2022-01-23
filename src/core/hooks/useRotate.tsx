import { useCallback, useEffect, useRef, useState } from "react";

interface useRotateProps {
    elementRef: React.RefObject<HTMLDivElement>,
    rotateButtonRef: React.RefObject<HTMLDivElement>,
    onMouseUpFunction: Function,
    startAngle: number
}

const useRotate = ({
    elementRef,
    onMouseUpFunction,
    rotateButtonRef,
    startAngle
}: useRotateProps) => {
    const shiftAngle = useRef(0);
    const [angle, setAngle] = useState(startAngle);
    const startClientX = useRef(0);

    const onMouseMove = useCallback((e: MouseEvent) => {
        const newAngle = startAngle + e.clientX - startClientX.current
        setAngle(newAngle)
    }, [])

    const onMouseUp = useCallback((e: MouseEvent) => {
        window.removeEventListener('mousemove', onMouseMove);
        window.removeEventListener('mouseup', onMouseUp);
        onMouseUpFunction(shiftAngle.current)
    }, [onMouseUpFunction])

    const onMouseDown = useCallback((e: MouseEvent) => {
        e.preventDefault();
        if (elementRef.current) {
           window.addEventListener('mousemove', onMouseMove);
           window.addEventListener('mouseup', onMouseUp);
           startClientX.current = e.clientX
        }
    }, [elementRef, onMouseMove, onMouseUp])

    useEffect(() => {
        if (elementRef.current) {
            elementRef.current.style.transform = `rotate(${angle}deg)`
        }
    }, [angle, setAngle])
    
    useEffect(() => {
        console.log('useRotate')
        let elementRefValue: HTMLDivElement;
        if (rotateButtonRef.current) {
            rotateButtonRef.current.addEventListener('mousedown', onMouseDown)
            elementRefValue = rotateButtonRef.current;
        } 
        return () => {
            if (elementRefValue) {
                elementRefValue.removeEventListener('mousedown', onMouseDown)
            }
        }
    }, [onMouseDown, rotateButtonRef.current])
}

export { useRotate }