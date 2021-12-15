import './SideBar.css'
import type { Editor } from '../model/types'
import { SlideView } from '../common/Slide/Slide'
import { SlidesElement } from '../common/SlidesElement/SlidesElement'
import { makeClassName } from '../core/functions/makeClassName'
import { dispatch } from '../model/editor'
import { switchSlide } from '../model/slide'

interface SideBarProps {
    editor: Editor
}

const SideBar = ({
    editor
}: SideBarProps) => {
    const slidesList = editor.presentation.slides.map((slide) => (
        <div className = {makeClassName('sidebar-element', {
            'selected': editor.currentSlideIds.includes(slide.slideId, 0)
        })}>
            <li
                key = {slide.slideId}
                className = 'scaled-slide-container'
            >
                <div className = {makeClassName('scaled-slide', {
                        'selected': editor.currentSlideIds.includes(slide.slideId, 0)
                    })}
                    onClick = {() => dispatch(switchSlide, {slideId: slide.slideId})}
                >
                    <SlideView
                        slideElements = {
                            slide.elements.map((slideElement) =>
                                <li
                                    key = {slideElement.elementId} 
                                    className = 'slideElement'
                                >    
                                    <SlidesElement
                                        slideElement = {slideElement}
                                    />
                                </li> 
                            )}
                        background = {slide.background}   
                    />
                </div>
            </li>    
        </div>
    ))
    return (
        <div
            className = 'sidebar-container'
        >
            <ol className = 'slide-list'>{slidesList}</ol>
        </div>
    )
}
export {SideBar}