import React from 'react';
import ReactDOM from 'react-dom';

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