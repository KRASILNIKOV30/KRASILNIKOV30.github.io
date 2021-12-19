import './Slide.css'
import { useRef } from 'react'


interface SlideViewProps {
    slideElements: Array<JSX.Element>,
    background: string
}

export const SlideView = ({
    slideElements,
    background,
}: SlideViewProps) => {
    return (
        <div 
            className = "slide"
            style = {{"background": background}}
        >
            <ul>{slideElements}</ul>                
        </div>
    )
}