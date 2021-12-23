import styles from './SideBar.module.css'
import type { Editor } from '../model/types'
import { SlideView } from '../common/Slide/Slide'
import { SlidesElement } from '../common/SlidesElement/SlidesElement'
import { dispatch } from '../model/editor_state'
import { switchSlide, selectOneSlide, selectManySlide } from '../model/presentation'

interface SideBarProps {
    editor: Editor
}

const SideBar = ({
    editor
}: SideBarProps) => {
    const slidesList = editor.presentation.slides.map((slide) => (
        <div className = {styles.sidebar_element}>
            <li
                key = {slide.slideId}
                className = {styles.scaled_slide_container}
            >
                <div
                    className = {`${styles.scaled_slide} ${editor.presentation.currentSlideIds.includes(slide.slideId, 0)? styles.scaled_slide_selected: ''}`}
                    onClick = {(e) => {
                        if (e.ctrlKey) {
                            dispatch(selectOneSlide, {slideId: slide.slideId})
                        }
                        else if (e.shiftKey) {
                            dispatch(selectManySlide, {slideId: slide.slideId})
                        }   
                        else {
                            dispatch(switchSlide, {slideId: slide.slideId})
                        }
                    }}
                >
                    <SlideView
                        slideElements = {
                            slide.elements.map((slideElement) =>
                                <li
                                    key = {slideElement.elementId} 
                                    className = {styles.slide_element}
                                > 
                                    <SlidesElement
                                        slideElement = {slideElement}
                                        active = {false}
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
        <div className = {styles.sidebar_container} >
            <ol className = {styles.slide_list}>{slidesList}</ol>
        </div>
    )
}
export { SideBar }