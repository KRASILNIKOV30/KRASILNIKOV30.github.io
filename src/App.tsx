import { Editor } from './model/types';
import { ToolBar } from './toolBar/ToolBar';
import { SlideEditor } from './slideEditor/slideEditor';
import { SideBar } from './sideBar/sideBar';    
import './App.css';
import { dispatch } from './model/editor';
import { switchPreview } from './model/presentation';

type AppProps = {
    editor: Editor;
}

function App({ editor }: AppProps) {
    const indexSlide: number = editor.presentation.slides.findIndex(slide => slide.slideId === editor.presentation.currentSlideIds[0]);
    return (
        <div className="app">
            {
                editor.statePreview ?
                <div 
                    className='preview-container'
                    onKeyUp = {(e) => {
                        if (e.key === 'Escape') {
                            dispatch(switchPreview, {})
                        }
                    }}
                > 
                    <SlideEditor 
                        slide = {editor.presentation.slides[indexSlide]}
                    />
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