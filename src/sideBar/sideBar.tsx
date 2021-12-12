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
    const slidesList = editor.presentation.slides.map((slide) => {
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
    })
    console.log(slidesList)
    const slide1 = editor.presentation.slides[0]
    const slide2 = editor.presentation.slides[1]
    return (
        <div
            className = 'sidebar-container'
        >
            <ol className = 'slide-list'>
                <li
                    key = {slide1.slideId}
                    className = 'scaled-slide'
                >
                    <SlideView
                        slideElements = {
                            slide1.elements.map((slideElement) =>
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
                        background = {slide1.background}   
                    />
                </li>
                <li
                    key = {slide2.slideId}
                    className = 'scaled-slide'
                >
                    <SlideView
                        slideElements = {
                            slide2.elements.map((slideElement) =>
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
                        background = {slide2.background}   
                    />
                </li>
            </ol>
        </div>
    )
}
export {SideBar}