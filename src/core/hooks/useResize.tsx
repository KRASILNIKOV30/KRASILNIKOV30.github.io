import { useCallback, useEffect } from "react"

interface useResizeProps {
    elementRef: React.RefObject<HTMLDivElement>,
    edgeRef: React.RefObject<HTMLDivElement>,
    onMouseUpFunction: Function 
}

export const useResize = ({
    elementRef,
    edgeRef
}: useResizeProps) => {

    const onMouseMove = useCallback((e: MouseEvent) => {

    }, [])

    const onMouseUp = useCallback((e: MouseEvent) => {

    }, [])

    const onMouseDown = useCallback((e: MouseEvent) => {
        if (elementRef.current) {
            window.addEventListener('mousemove', onMouseUp);
            window.addEventListener('mouseup', onMouseUp);
        }
    }, [elementRef]);

    useEffect(() => {
        if (elementRef.current) {
            elementRef.current.addEventListener('mousedown', onMouseDown)
        }
    }, [onMouseDown])
}