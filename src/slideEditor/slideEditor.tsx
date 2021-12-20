import styles from './SlideEditor.module.css';
import { SlidesElement } from "../common/SlidesElement/SlidesElement";
import type { Slide } from '../model/types'
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
            className = {styles.slide_element}
            onClick = {console.log}
        >
            <SlidesElement
                slideElement = {slideElement}
                active = {slide.selectedElementsIds.includes(slideElement.elementId)}
            />
        </li>
    )
    return (
        <div 
            className={styles.slide_container}
        >
            <SlideView
                slideElements = {slideElements}
                background = {slide.background} 
            />
        </div>
    )
}

export { SlideEditor, SlidesElement}