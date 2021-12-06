import './SlideEditor.css';
import { SlidesElement } from "../common/SlidesElement/SlidesElement";
import type { Slide } from '../common/functions/model/types'

type SlideBarProps = {
        slide: Slide
}

function SlideEditor({
        slide 
    }: SlideBarProps) {
    const width = 100;
    return (
        <div className="slide-container">
            <div 
                className="slide"
                style = {{"background": slide.background}}
            >
                <SlidesElement
                    slideElement = {slide.elements[0]} 
                />                
            </div>
        </div>
    )
}

export { SlideEditor }