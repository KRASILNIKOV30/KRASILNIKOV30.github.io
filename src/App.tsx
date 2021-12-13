import { Editor } from './model/types';
import { dispatch } from './model/editor';
import { changeTitle } from './model/pres';
import { ToolBar } from './toolBar/ToolBar';
import { SlideEditor } from './slideEditor/slideEditor';
import './App.css';

type AppProps = {
    editor: Editor;
}
let isDrawEditColorWindow: boolean = false; 
function App({ editor }: AppProps) {
    return (
        <div className="app">
            <div className="toolbar">
                <ToolBar
                    editor = { editor }
                />   
            </div>      
            <div className="slide_editor"> 
                <SlideEditor
                slide = {editor.presentation.slides[Number(editor.currentSlideIds[0])]}
                />
            </div>
        </div>
    )
}

export default App;