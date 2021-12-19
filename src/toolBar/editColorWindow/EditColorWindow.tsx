import { useState } from "react";

import { SlideElement } from "../../model/types"
import { Button } from "../../common/Button/Button";
import { Knob } from "../../common/Knob/Knob";
import { Palette } from "../../common/Palette/Palette";
import "./EditColorWindow.css";
import { changeStrokeColor, changeFillColor, changeStrokeWidth } from "../../model/element";
import { setBackground } from '../../model/slide';
import { dispatch } from '../../model/editor';

interface EditColorWindowProps {
    firstSelectedElement: SlideElement
    drawMode: string,
    onClick: () => void
}

function EditColorWindow({ drawMode, onClick, firstSelectedElement }: EditColorWindowProps) {
    const [selectedColor, setSelectedColor] = useState('')
    return (
        <div className='edit_color_window'>
            <div className="frame">
                {drawMode === 'backgroundSlide' &&
                    <div className="head_text">
                        Фон
                    </div>
                }
                {drawMode === 'fillFigure' &&
                    <div className="head_text">
                        Заливка
                    </div>
                }
                {drawMode === 'strokeFigure' &&
                    <div className="head_text">
                        Контур
                    </div>
                }
                <hr className="hr"/>
                <div className="palette_block">
                    <div className="secondary_text">
                        Цвет
                    </div>
                    <div>
                        <Palette 
                            sendValue = {(colorValue) => setSelectedColor(colorValue)}
                        />
                    </div>
                </div>
                {drawMode === 'backgroundSlide' &&
                    <div className="change_value">
                        <div className="secondary_text">
                            Изображение
                        </div>

                        <Button
                            style="outline"
                            text="Выбрать изображение"
                            onClick={() => {
                                const inputFile = document.createElement('input');
                                inputFile.type = 'file';
                                inputFile.style.display = 'none';
                                inputFile.accept = 'image/*';
                                inputFile.onchange = () => {
                                    if (inputFile.files) {
                                        const urlImage = URL.createObjectURL(inputFile.files[0])
                                        dispatch(setBackground, { background: urlImage });
                                    }
                                   
                                }
                                inputFile.click();
                                inputFile.remove();
                                onClick()
                            }}
                        />
                    </div>
                }
                {drawMode === 'strokeFigure' &&
                    <div className="change_value">
                        <div className="secondary_text">
                            Толщина
                        </div>

                        <Knob
                            value = {firstSelectedElement.figure !== undefined ? firstSelectedElement.figure.strokeWidth: 0}
                            onClick={(value) => dispatch(changeStrokeWidth, { newWidth: value })}
                        />
                    </div>
                }
                <hr className="hr"/>
                <div className="ready_button">
                    <Button
                        style="default"
                        text="Готово"
                        onClick={() => {
                            switch(drawMode) {
                            case 'backgroundSlide':
                                dispatch(setBackground, { background: selectedColor });
                                break
                            case 'fillFigure':
                                dispatch(changeFillColor, { newColor: selectedColor });
                                break
                            case 'strokeFigure':
                                dispatch(changeStrokeColor, { newColor: selectedColor });
                                break
                            }
                            onClick()
                        }}
                    />
                </div>
            </div>
        </div>
    )}

export { EditColorWindow }