import { Editor } from './model/types';
import ToolBar from './toolBar/ToolBar';
import SlideEditor from './slideEditor/slideEditor';
import SideBar from './sideBar/SideBar';  
import styles from './App.module.css';
import SlideView from './common/Slide/Slide';
import SlidesElement from './common/SlidesElement/SlidesElement'
import { AppDispatch } from './model/store';
import { switchPreview } from './model/actionCreators';
import { connect } from 'react-redux';

type AppProps = {
    editor: Editor,
    switchPreview: () => void
}

function App({
    editor,
    switchPreview
}: AppProps) {
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
                                        slideId = {slide.slideId}
                                        elementId= {slideElement.elementId}
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
                            switchPreview()
                        }
                    }}
                > 
                    <div>
                        {slidesList[indexSlide]}
                    </div>    
                </div>
                :
                <div className={styles.app_content}>
                    <ToolBar />
                    <div className={styles.pres_view}>
                        <SideBar />
                        <SlideEditor />
                    </div>
                </div>
            }
        </div>
    )
}

function mapStateToProps(state: Editor) {
    return {
        editor: state
    }
}

const mapDispatchToProps = (dispatch: AppDispatch) => {
    return {
        switchPreview: () => dispatch(switchPreview())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(App)