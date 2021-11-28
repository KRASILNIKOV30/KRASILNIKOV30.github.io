import React from 'react';

import { Editor } from './common/functions/model/types';
import { dispatch } from './common/functions/model/editor';

import { changeTitle } from './common/functions/model/pres';

type AppProps = {
    editor: Editor;
}

function App({ editor }: AppProps) {
    function onTextClick() {
        dispatch(changeTitle, { title: "New title" })
    }
    return (
        <div className="App">
            <header className="App-header">
                <p onClick={onTextClick}>
                    Edit <code>src/App.js</code> and save to reload
                </p>
            </header>
        </div>
    )
}

export default App;