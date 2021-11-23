import ReactDOM from 'react-dom';
import './index.css'

import { Button } from "./common/Button/Button";
import { Input } from "./common/Input/input";

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
        <Button
            style = 'drop_down'
            text = 'Список тут'
            onClick = {() => {}}
        />
        <Button
            style = 'drop_down'
            text = 'Список там'
            active = {true}
            onClick = {() => {}}
        />
        <Button
            style = 'outline'
            text = 'Переименовать'
            onClick = {() => {}}
        />
        <Input
            type = 'text'
            value = ''
            placeholder = 'Введите название'
            style = 'default'
            size = 'default'
            onChange = {() => {}}
        />
    </div>,
    document.getElementById('root')
)