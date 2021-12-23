import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

import './index.css';
import { getEditor, addEditorChangeHandler } from './model/editor_state';
import App from './App';

const rootElement = document.getElementById('root')
function render() {
    ReactDOM.render(
        <Provider store={store}>
            <App editor={getEditor()} />
        </Provider>,
        rootElement
    )
}

addEditorChangeHandler(render)
render()