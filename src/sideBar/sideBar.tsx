import './SideBar.css'
import type { Editor } from '../model/types'
import { SlideView } from '../common/Slide/Slide'
import { SlidesElement } from '../common/SlidesElement/SlidesElement'

interface SideBarProps {
    editor: Editor
}

const SideBar = ({
    editor
}: SideBarProps) => {
    const slidesList = editor.presentation.slides.map((slide) => (
        <li
            key = {slide.slideId}
            className = 'scaled-slide'
        >
            <SlideView
                slideElements = {
                    slide.elements.map((slideElement) =>
                        <li
                            key = {slideElement.elementId} 
                            className = 'slideElement'
                            onClick = {console.log}
                        >    
                            <SlidesElement
                                slideElement = {slideElement}
                            />
                        </li> 
                    )}
                background = {slide.background}   
            />
        </li>
    ))
    console.log(slidesList)
    return (
        <div
            className = 'sidebar-container'
        >
            <ol className = 'slide-list'>{slidesList}</ol>
        </div>
    )
}
export {SideBar}