import { Button } from "../common/Button/Button"
import { DropDown } from "../common/DropDown/DropDown"
import { Knob } from "../common/Knob/Knob"
import "./ToolBar.css"

const ToolBar = () => {
    return (
        
        <div className='toolbar'>
            <div className='top_block'>
                <img className='logo'

                />
                <div className='top_block_second'>
                    <p className='name'>Название презентации</p>
                    <div className='top_buttons_block'>
                        <div className='outline_button'>
                            <Button 
                                style='outline' 
                                text='Сохранить' 
                                onClick={console.log}
                            />
                        </div>
                        <div className='outline_button'>
                            <Button 
                                style='outline' 
                                text='Загрузить' 
                                onClick={console.log}
                            />
                        </div>
                        <div className='outline_button'>
                            <Button 
                                style='outline' 
                                text='Переименовать' 
                                onClick={console.log}
                            />
                        </div>
                    </div>
                </div>
            </div>
            <div className='bottom_buttons_block'>
                <div className='slidebar_buttons_block'>
                    <div className='icon_button'>
                        <Button
                            style='add'
                            onClick={console.log}
                        />
                    </div>
                    <div className='icon_button'>
                        <Button
                            style='delete'
                            text=''
                            onClick={console.log}
                        />
                    </div>
                    <div className='icon_button'>
                        <Button
                            style='undo'
                            text=''
                            onClick={console.log}
                        />
                    </div>
                    <div className='icon_button'>
                        <Button
                            style='redo'
                            text=''
                            onClick={console.log}
                        />
                    </div>
                </div>
                <div className='slide_editor_buttons_block'>
                    <div className='dropdown'>
                        <DropDown
                            onClick={console.log}
                        />
                    </div>
                    <div className='outline_button'>
                        <Button
                            style='outline'
                            text='Фон'
                            onClick={console.log}
                        />
                    </div>
                    --
                        <div className='outline_button'>
                            <Button
                                style='outline'
                                text='Заливка фигуры'
                                onClick={console.log}
                            />
                        </div>
                        <div className='outline_button'>
                            <Button
                                style='outline'
                                text='Контур фигуры'
                                onClick={console.log}
                            />
                        </div>
                    
                </div>
                <div className='result_buttons_block'>
                    <div className='outline_button'>
                        <Button
                            style='outline'
                            text='Просмотр'
                            onClick={console.log}
                        />
                    </div>
                    <div className='outline_button'>
                        <Button
                            style='outline'
                            text='Экспорт'
                            onClick={console.log}
                        />
                    </div>
                </div>
            </div>
            <Knob
                value='1'
                onClick={console.log}
            />
        </div>
    )}

export {ToolBar}