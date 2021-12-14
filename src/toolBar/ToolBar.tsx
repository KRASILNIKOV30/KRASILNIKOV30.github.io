import { useState } from "react";

import { Button } from "../common/Button/Button"
import { DropDown } from "../common/DropDown/DropDown"
import { Knob } from "../common/Knob/Knob"
import { Input } from "../common/Input/input" 

import { Editor } from "../model/types"
import { dispatch } from '../model/editor';

import { changeTitle, saveDoc, uploadDoc, exportDoc, switchPreview, undo, redo } from "../model/pres";
import { addSlide, removeSlides } from "../model/slide";


import "./ToolBar.css"
import { EditColorWindow } from "./editColorWindow/EditColorWindow";

type ToolBarProps = {
    editor: Editor
}

function ToolBar({ editor }: ToolBarProps) {
    const [rename, setRename] = useState(false);
    const [drawBlock, setDrawBlock] = useState('absent')
    const indexSlide: number = editor.presentation.slides.findIndex(slide => slide.slideId === editor.currentSlideIds[0]);
    console.log('slide = ' + JSON.stringify(editor.presentation.slides[indexSlide].elements[1]))

    return (
        <div className='toolbar'>
            <div className='top_block'>
                <img className='logo'

                />
                <div className='top_block_second'>
                    {
                        rename ?
                            <div className="rename_container">
                                <Input 
                                    onKeyUp = {(value) => {
                                        if (value !== '') {
                                            dispatch(changeTitle, { title: value });
                                        }
                                        setRename(false)
                                    }}
                                    placeholder = 'Название презентации'
                                />
                            </div>
                            : <p className='name'>{ editor.presentation.title }</p>

                    }
                    <div className='top_buttons_block'>
                        <div className='outline_button'>
                            <Button 
                                style='outline' 
                                text='Сохранить' 
                                onClick={() => dispatch(saveDoc, {})}
                            />
                        </div>
                        <div className='outline_button'>
                            <Button 
                                style='outline' 
                                text='Загрузить' 
                                onClick={() => dispatch(uploadDoc, {})}
                            />
                        </div>
                        <div className='outline_button'>
                            <Button 
                                style='outline' 
                                text='Переименовать' 
                                onClick={() => setRename(!rename)}
                            />
                        </div>
                    </div>
                </div>
            </div>
            <div className='bottom_buttons_block'>
                <div className='slidebar_buttons_block'>
                    <div className='icon_button'>
                        <Button
                            style='sign'
                            text='+'
                            onClick={() => dispatch(addSlide, {})}
                        />
                    </div>
                    <div className='icon_button'>
                        <Button
                            style='delete'
                            text=''
                            onClick={() => dispatch(removeSlides, {})}
                        />
                    </div>
                    <div className='icon_button'>
                        <Button
                            style='undo'
                            text=''
                            onClick={() => dispatch(undo, {})}
                        />
                    </div>
                    <div className='icon_button'>
                        <Button
                            style='redo'
                            text=''
                            onClick={() => dispatch(redo, {})}
                        />
                    </div>
                </div>
                <div className='slide_editor_buttons_block'>
                    <div className='dropdown'>
                        <DropDown />
                    </div>
                    <div className='outline_button'>
                        <Button
                            style='outline'
                            text='Фон'
                            onClick={() => setDrawBlock('fone')}
                        />
                    </div>
                    {
                        //Вот тут делаем условный рендеринг в зависимости от того
                        //что именно у нас лежит в выбранных элементах
                        //Если все одного типа — выводим соотвествующие кнопки
                        //P.S.следующие два дива тоже сюда сунуть под условный рендеринг
                    }
                        <div className='outline_button'>
                            <Button
                                style='outline'
                                text='Заливка фигуры'
                                onClick={() => setDrawBlock('fillFigure')}
                            />
                        </div>
                        <div className='outline_button'>
                            <Button
                                style='outline'
                                text='Контур фигуры'
                                onClick={() => setDrawBlock('strokeFigure')}
                            />
                        </div>
                    
                </div>
                <div className='result_buttons_block'>
                    <div className='outline_button'>
                        <Button
                            style='outline'
                            text='Просмотр'
                            onClick={() => dispatch(switchPreview, {})}
                        />
                    </div>
                    <div className='outline_button'>
                        <Button
                            style='outline'
                            text='Экспорт'
                            onClick={() => dispatch(exportDoc, {})}
                        />
                    </div>
                </div>
            </div>
            <Knob
                value='1'
                onClick={console.log}
            />
            {drawBlock !== 'absent' &&
                <EditColorWindow
                    mode = {drawBlock}
                    onClick={() => setDrawBlock('absent')}
                />
            }
        </div>
        
    )}

export { ToolBar }