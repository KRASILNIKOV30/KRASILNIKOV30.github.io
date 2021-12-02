import { Button } from "../common/Button/Button"
import { DropDown } from "../common/DropDown/DropDown"
import { Knob } from "../common/Knob/Knob"
import "./ToolBar.css"

const ToolBar = () => {
    return (
        <div className='ToolBar'>
            <div className='Top_Buttons_Block'>
                <div className='Outline_Button'>
                    <Button 
                        style='outline' 
                        text='Сохранить' 
                        onClick={console.log}
                    />
                </div>
                <div className='Outline_Button'>
                    <Button 
                        style='outline' 
                        text='Загрузить' 
                        onClick={console.log}
                    />
                </div>
                <div className='Outline_Button'>
                    <Button 
                        style='outline' 
                        text='Переименовать' 
                        onClick={console.log}
                    />
                </div>
            </div>
            <div className='Bottom_Buttons_Block'>
                <div className='Slidebar_Buttons_Block'>
                    <div className='Icon_Button'>
                        <Button
                            style='default'
                            text='+'
                            onClick={console.log}
                        />
                    </div>
                    <div className='Icon_Button'>
                        <Button
                            style='delete'
                            text=''
                            onClick={console.log}
                        />
                    </div>
                    <div className='Icon_Button'>
                        <Button
                            style='undo'
                            text=''
                            onClick={console.log}
                        />
                    </div>
                    <div className='Icon_Button'>
                        <Button
                            style='redo'
                            text=''
                            onClick={console.log}
                        />
                    </div>
                </div>
                <div className='SlideEditor_Buttons_Block'>
                    <div className='DropDown'>
                        <DropDown
                            onClick={console.log}
                        />
                    </div>
                    <div className='Outline_Button'>
                        <Button
                            style='outline'
                            text='Фон'
                            onClick={console.log}
                        />
                    </div>
                    <div className='Outline_Button'>
                        <Button
                            style='outline'
                            text='Заливка фигуры'
                            onClick={console.log}
                        />
                    </div>
                    <div className='Outline_Button'>
                        <Button
                            style='outline'
                            text='Контур фигуры'
                            onClick={console.log}
                        />
                    </div>

                </div>
                <div className='Result_Buttons_Block'>
                    <div className='Outline_Button'>
                        <Button
                            style='outline'
                            text='Просмотр'
                            onClick={console.log}
                        />
                    </div>
                    <div className='Outline_Button'>
                        <Button
                            style='outline'
                            text='Экспорт'
                            onClick={console.log}
                        />
                    </div>
                </div>
            </div>
            <Knob
                text='0'
                onClick={console.log}
            />
        </div>
    )}

export {ToolBar}