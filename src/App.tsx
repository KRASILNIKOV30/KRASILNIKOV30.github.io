import { Editor } from './model/types';
import { ToolBar } from './toolBar/ToolBar';
import { SlideEditor } from './slideEditor/slideEditor';
import { SideBar } from './sideBar/SideBar';  
import './App.css';
import { dispatch } from './model/editor';
import { switchPreview } from './model/presentation';
import { SlideView } from './common/Slide/Slide';
import { SlidesElement } from './common/SlidesElement/SlidesElement'

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
        <div className="app">
            {
                editor.statePreview ?
                <div 
                    className='preview-container'
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
                <div className='app-content'>
                    <ToolBar
                        editor = { editor }
                    />
                    <div className='pres-view'>
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