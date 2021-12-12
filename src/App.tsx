import { Editor } from './model/types';
import { dispatch } from './model/editor';
import { changeTitle } from './model/pres';
import { ToolBar } from './toolBar/ToolBar';
import { SlideEditor } from './slideEditor/slideEditor';
import { SideBar } from './sideBar/SideBar'
import './App.css';

type AppProps = {
    editor: Editor;
}

function App({ editor }: AppProps) {
    return (
        <div className="App">
            <ToolBar
                editor = { editor }
            />
            <div className='pres-view'>
                <SideBar
                    editor = {editor}           
                />
                <SlideEditor 
                    slide = {editor.presentation.slides[Number(editor.currentSlideIds[0])]}
                />
            </div>
            
        </div>
    )
}

export default App;