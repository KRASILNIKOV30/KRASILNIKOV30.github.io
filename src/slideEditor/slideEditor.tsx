import './SlideEditor.css';
import { SlidesElement } from "../common/SlidesElement/SlidesElement";
import type { Slide, SlideElement } from '../model/types'
import { SlideView } from '../common/Slide/Slide'

type SlideBarProps = {
        slide: Slide
}

function SlideEditor({
        slide 
    }: SlideBarProps) {
    const slideElements = slide.elements.map((slideElement) =>
        <li
            key = {slideElement.elementId}
            className = 'slideElement'
            onClick = {console.log}
        >
            <SlidesElement
                slideElement = {slideElement}
            />
        </li>
    )    
    return (
        <div className="slide-container">
            <SlideView
                slideElements = {slideElements}
                background = {slide.background}
            />
        </div>
    )
}

export { SlideEditor, SlidesElement }