import React from 'react';
import { Editor } from './common/functions/model/types';
import { dispatch } from './common/functions/model/editor';
import { changeTitle } from './common/functions/model/pres';
import { ToolBar } from './toolBar/ToolBar';
import { SlideEditor } from './slideEditor/slideEditor';
import './App.css';

type AppProps = {
    editor: Editor;
}

function App({ editor }: AppProps) {
    function onTextClick() {
        dispatch(changeTitle, { title: "New title" })
    }
    return (
        <div className="App">
            <ToolBar
                editor = { editor }
            />
            <header className="App-header">
                <p onClick={onTextClick}>
                    Edit <code>src/App.js</code> and save to reload
                </p>
                <p>
                    PresName = {editor.presentation.title}
                </p>
            </header>
            <SlideEditor 
                slide = {editor.presentation.slides[Number(editor.currentSlideIds[0])]}
            />
        </div>
    )
}

export default App;