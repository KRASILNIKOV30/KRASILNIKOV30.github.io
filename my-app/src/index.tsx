import React from 'react';
import ReactDOM from 'react-dom';
<<<<<<< HEAD
import './index.css'
import { Palette } from './common/Palette/Palette';
import { Button } from "./common/Button/Button";
import { DropDown } from "./common/DropDown/DropDown";
import { Input } from "./common/Input/input";
import { ToolBar } from './toolBar/ToolBar';
import { SlideEditor } from './slideEditor/slideEditor';
import { SideBar } from './sideBar/sideBar';

ReactDOM.render(
    <div className = 'main-container'>
        <div className = 'tool-bar-container'>
            <ToolBar/>
        </div>
        <div className = 'pres-viewer'>
            <div className = 'side-bar-container'>
                <SideBar/>
            </div>
            <div className = 'slide-editor-container'>
                <SlideEditor/>
            </div>
        </div>
    </div>,
    document.getElementById('root')
)
=======

import './index.css';
import { getEditor, addEditorChangeHandler } from './common/functions/model/editor';
import App from './app';

function render() {
    ReactDOM.render(
        <React.StrictMode>
            <App editor={getEditor()} />
        </React.StrictMode>,
        document.getElementById('root')
    )
}

addEditorChangeHandler(render)
render()
>>>>>>> React-start
