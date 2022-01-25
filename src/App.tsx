import { Editor } from './model/types';
import { ToolBar } from './toolBar/ToolBar';  
import styles from './App.module.css';
import { dispatch } from './model/editor';
import { switchPreview } from './model/presentation';
import { SlideView } from './common/Slide/Slide';
import { SlidesElement } from './common/SlidesElement/SlidesElement'
import './hotKeys';
import { SlideEditor } from './slideEditor/slideEditor';
import { SideBar } from './sideBar/sideBar';

type AppProps = {
    editor: Editor;
}

function App({ editor }: AppProps) {
    const indexSlide: number = editor.presentation.slides.findIndex(slide => slide.slideId === editor.presentation.currentSlideIds[0]);
    const slidesList = editor.presentation.slides.map((slide) => (
        <div>
            <li
                key = {slide.slideId}
            >
                <div>
                    <SlideView
                        slideElements = {
                            slide.elements.map((slideElement) =>
                                <li
                                    key = {slideElement.elementId} 
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
        <div className={styles.app}>
            {
                editor.statePreview ?
                <div 
                    className={styles.preview_container}
                    onKeyDown = {(e) => {
                        if (e.key === 'Escape') {
                            dispatch(switchPreview, {})
                        }
                    }}
                > 
                    <div>
                        {slidesList[indexSlide]}
                    </div>    
                </div>
                :
                <div className={styles.app_content}>
                    <ToolBar
                        editor = { editor }
                    />
                    <div className={styles.pres_view}>
                        <SideBar
                            editor = {editor}           
                        />
                        <SlideEditor 
                            slide = {editor.presentation.slides[indexSlide]}
                        />
                    </div>
                </div>
            }
        </div>
    )
}

export default App;