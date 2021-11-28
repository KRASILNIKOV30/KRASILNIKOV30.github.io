import ReactDOM from 'react-dom';
import './index.css'

import { Button } from "./common/Button/Button";
import { DropDown } from './common/DropDown/DropDown';

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
            onClick = {() => {}}
        />
        <Button
            style = 'redo'
            onClick = {() => {}}
        />
        <Button
            style = 'undo'
            text = 'спокойно'
            onClick = {() => {}}
        />
        <DropDown 
            onClick = {() => {}}
        />
    </div>,
    document.getElementById('root')
)