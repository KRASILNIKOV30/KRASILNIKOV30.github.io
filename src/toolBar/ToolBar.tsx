import { useState } from "react";

import { Button } from "../common/Button/Button"
import { DropDown } from "../common/DropDown/DropDown"
import { Knob } from "../common/Knob/Knob"
import { Input } from "../common/Input/input" 

import { Editor, SlideElement } from "../model/types"
import { dispatch } from '../model/editor';

import { changeTitle, saveDoc, uploadDoc, exportDoc, switchPreview, undo, redo } from "../model/presentation";
import { addSlide, removeSlides } from "../model/slide";
import { changeTextProps } from "../model/element"


import "./ToolBar.css"

type ToolBarProps = {
    editor: Editor
}

function ToolBar({ editor }: ToolBarProps) {
    const [rename, setRename] = useState(false);

    const indexSlide: number = editor.presentation.slides.findIndex(slide => slide.slideId === editor.currentSlideIds[0]);
    let textSelected = true;
    let figureSelected = true;
    editor.presentation.slides[indexSlide].selectedElementsIds.forEach(id => 
        {
            if(editor.presentation.slides[indexSlide].elements.
                find(element => element.elementId === id)?.elementType === 'figure')
            {
                textSelected = false;
            }
            else if (editor.presentation.slides[indexSlide].elements.
                find(element => element.elementId === id)?.elementType === 'text')
            {
                figureSelected = false;
            }
        }   
    )

    return (
        <div className='toolbar'>
            <div className='top_block'>
                <img className='logo'

                />
                <div className='top_block_second'>
                    <div className="rename_container">
                    {
                        rename ?
                            <Input 
                                style="big"
                                onKeyUp = {(value) => {
                                    if (value !== '') {
                                        dispatch(changeTitle, { title: value });
                                    }
                                    setRename(false)
                                }}
                                placeholder = 'Название презентации'
                             />
                            : <p className='name'>{ editor.presentation.title }</p>

                    }
                    </div>
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
                            onClick={console.log}
                        />
                    </div>
                    <OptionalTools 
                        textSelected = {textSelected}
                        figureSelected = {figureSelected}
                        editor = {editor}
                        indexSlide = {indexSlide}
                    />
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
        </div>
    )}

interface OptionalTools {
    textSelected: boolean,
    figureSelected: boolean,
    editor: Editor,
    indexSlide: number
}

function OptionalTools({ textSelected, figureSelected, editor, indexSlide }: OptionalTools) {
    if (!textSelected && figureSelected){
        return (
            <div className="optional_tools_container">
                <div className = 'outline_button'>
                    <Button
                        style = 'outline'
                        text = 'Заливка фигуры'
                        onClick = {console.log}
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
        )
    }
    else if (textSelected && !figureSelected) {
        const textElement: SlideElement = editor.presentation.slides[indexSlide].elements.
        find(element => element.elementId === 
            editor.presentation.slides[indexSlide].selectedElementsIds[0])!;
        return (
            <div className="optional_tools_container">
                <p>Шрифт</p>
                <Input
                    style="small"
                    placeholder={textElement.textProps!.font}
                    onKeyUp={(value) => dispatch(changeTextProps, { font: value })}
                /> 
                <p>Размер шрифта</p>
                <Knob 
                    value={textElement.textProps!.fontSize}    
                    onClick={(value) => dispatch(changeTextProps, { fontSize: value })}
                />
            </div>
        )
    }
    else {
        return (<div className="optional_tools_container"></div>)
    }
}

export { ToolBar }