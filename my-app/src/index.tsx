import ReactDOM from 'react-dom';
import './index.css'

import { Button } from "./common/Button/Button";

ReactDOM.render(
    <Button
        style = 'outline'
        active = { false }
        text = 'Сохранить'
        onClick = {() => {}}
    />,
    document.getElementById('root')
)