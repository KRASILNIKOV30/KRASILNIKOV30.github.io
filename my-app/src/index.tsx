import ReactDOM from 'react-dom';
import './index.css'

import { Button } from "./common/Button/Button";

ReactDOM.render(
    <div className = 'test'>
        <Button
            style = 'default'
            text = 'Сохранить'
            onClick = {() => {}}
        />
        <Button
            style = 'outline'
            text = 'Сохранить, нет блин загрузить'
            onClick = {() => {}}
        />
        <Button
            style = 'delete'
            text = 'Сохранить'
            onClick = {() => {}}
        />
        <Button
            style = 'redo'
            text = ''
            onClick = {() => {}}
        />
        <Button
            style = 'undo'
            text = 'спокойно'
            onClick = {() => {}}
        />
    </div>,
    document.getElementById('root')
)