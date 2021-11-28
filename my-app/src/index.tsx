import ReactDOM from 'react-dom';
import './index.css'
import { Palette } from './common/Palette/Palette';
import { Button } from "./common/Button/Button";
import { DropDown } from "./common/DropDown/DropDown"

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
        <Palette
            selectedPaletteElementId = ''
        />
        <DropDown
            onClick = {() => {}}
        />

    </div>,
    document.getElementById('root')
)