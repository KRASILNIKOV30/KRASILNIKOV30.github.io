import ReactDOM from 'react-dom';
import './index.css'
import { Palette } from './common/Palette/Palette';
import { Button } from "./common/Button/Button";

ReactDOM.render(
    <div className = 'test'>
        <Button // eslint-disable-next-line
            style = 'default'
            text = 'Сохранить'
            onClick = {() => {}}
        />
        <Button // eslint-disable-next-line
            style = 'outline'
            text = 'Сохранить, нет блин загрузить'
            onClick = {() => {}}
        />
        <Button // eslint-disable-next-line
            style = 'delete'
            onClick = {() => {}}
        />
        <Button // eslint-disable-next-line
            style = 'redo'
            onClick = {() => {}}
        />
        <Button // eslint-disable-next-line
            style = 'undo'
            text = 'спокойно'
            onClick = {() => {}}
        />
        <Button // eslint-disable-next-line
            style = 'drop_down'
            text = 'Список тут'
            onClick = {() => {}}
        />
        <Button // eslint-disable-next-line
            style = 'drop_down'
            text = 'Список там'
            active = {true}
            onClick = {() => {}}
        />
        <Palette
            selectedPaletteElementId = ''
        />
    </div>,
    document.getElementById('root')
)