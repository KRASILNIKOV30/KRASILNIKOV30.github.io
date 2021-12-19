import { useCallback, useEffect, useRef, useState } from "react"

interface useResizeProps {
    elementRef: React.RefObject<HTMLDivElement>,
    edgeType: React.MutableRefObject<string>,
    onMouseUpFunction: Function 
}

export const useResize = ({
    elementRef,
    edgeType,
    onMouseUpFunction
}: useResizeProps) => {
    const startObjectSize = {
        width: useRef(0),
        height: useRef(0)
    }
    const isStartSizeDeclared = useRef(false)
    const newWidth = useRef(0); 
    const newHeight = useRef(0);

    const [elementSize, setElementSize] = useState({
        width: startObjectSize.width.current,
        height: startObjectSize.height.current
    })

    const startObjectPositionX = useRef<number>(0);
    const startObjectPositionY = useRef<number>(0);

    const startClientX = useRef(0);
    const startClientY = useRef(0);

    const onMouseMove = useCallback((e: MouseEvent) => {
        if (isStartSizeDeclared.current) {
            newWidth.current = startObjectSize.width.current;
            newHeight.current = startObjectSize.height.current;
            switch (edgeType.current) {
                case 'top-left': {

                } break;
                case 'top-right': {

                } break;
                case 'bottom-right': {
                    newWidth.current += e.clientX - startClientX.current;
                    newHeight.current += e.clientX - startClientX.current 
                } break;
                case 'bottom-left': {

                } break;
            }
            
            setElementSize({
                width: newWidth.current,
                height: newHeight.current
            })
        }
    }, [])

    const onMouseUp = useCallback((e: MouseEvent) => {
        if (isStartSizeDeclared.current) {
            window.removeEventListener('mousemove', onMouseMove);
            window.removeEventListener('mouseup', onMouseUp);
            edgeType.current = ''
            setElementSize({
                width: newWidth.current,
                height: newHeight.current
            });
            onMouseUpFunction({
                newWidth: newWidth.current, 
                newHeight: newHeight.current
            })
        }
    }, [])

    const onMouseDown = useCallback((e: MouseEvent) => {
        if (elementRef.current && edgeType.current != '') {
            window.addEventListener('mousemove', onMouseMove);
            window.addEventListener('mouseup', onMouseUp);
            const width = elementRef.current?.style.width;
            const height = elementRef.current?.style.height
            startObjectSize.width.current = Number(width.substring(0, width.length - 2));
            startObjectSize.height.current = Number(height.substring(0, height.length - 2));
            const strX = elementRef.current?.style.left;
            const strY = elementRef.current?.style.top;
            startObjectPositionX.current = Number(strX?.substring(0, strX.length - 2));
            startObjectPositionY.current = Number(strY?.substring(0, strY.length - 2));
            isStartSizeDeclared.current = true;
            startClientX.current = e.clientX;
            startClientY.current = e.clientY;
        }
    }, [edgeType, elementRef, onMouseMove, onMouseUp]);

    useEffect(() => {
        if (elementRef.current && isStartSizeDeclared.current) {
            elementRef.current.style.width = `${elementSize.width}px`
            elementRef.current.style.height = `${elementSize.height}px`
        }
    }, [elementSize, setElementSize])

    useEffect(() => {
        if (elementRef.current) {
            elementRef.current.addEventListener('mousedown', onMouseDown)
        }
        return () => {
            if (elementRef.current) {
                elementRef.current.removeEventListener('mousedown', onMouseDown)
                console.log('return')
                edgeType.current = ''
            }
        }
    }, [onMouseDown])

    
}