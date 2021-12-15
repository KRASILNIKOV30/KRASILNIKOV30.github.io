import './SlideEditor.css';
import { SlidesElement } from "../common/SlidesElement/SlidesElement";
import type { Slide } from '../model/types'
import { SlideView } from '../common/Slide/Slide'
import { useRef } from 'react'
import { useDragAndDrop } from '../core/hooks/useDragAndDrop'

type SlideBarProps = {
    slide: Slide
}

function SlideEditor({
        slide 
    }: SlideBarProps) {
    const slideRef = useRef<HTMLDivElement>(null)    
    const slideElementRef = useRef<HTMLElement>(null)
    useDragAndDrop(
        slideElementRef, 
        {
            x: Number(slideRef.current?.style.left),
            y: Number(slideRef.current?.style.top)   
        },
        console.log
    )
    console.log(slideElementRef.current)       
    const slideElements = slide.elements.map((slideElement) =>
        <li
                    
            key = {slideElement.elementId}
            className = 'slideElement'
            onClick = {console.log}
        >
            <SlidesElement
                ref = {slideElementRef}
                slideElement = {slideElement}
            />
        </li>
    )    
    return (
        <div 
            className="slide-container"
            ref = {slideRef}
        >
            <SlideView
                slideElements = {slideElements}
                background = {slide.background}
            />
        </div>
    )
}

export { SlideEditor, SlidesElement }