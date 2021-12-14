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
    mode: string,
    onClick: () => void
}

function EditColorWindow({ mode, onClick, firstSelectedElement }: EditColorWindowProps) {
    const [selectedColor, setSelectedColor] = useState('')
    return (
        <div className='edit_color_window'>
            <div className="frame">
                {mode === 'backgroundSlide' &&
                    <div className="head_text">
                        Фон
                    </div>
                }
                {mode === 'fillFigure' &&
                    <div className="head_text">
                        Заливка
                    </div>
                }
                {mode === 'strokeFigure' &&
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
                {mode === 'fone' &&
                    <div className="change_value">
                        <div className="secondary_text">
                            Изображение
                        </div>

                        <Button
                            style="outline"
                            text="Выбрать изображение"
                            onClick={console.log}
                        />
                    </div>
                }
                {mode === 'strokeFigure' &&
                    <div className="change_value">
                        <div className="secondary_text">
                            Толщина
                        </div>

                        <Knob
                            value = {firstSelectedElement.figure.strokeWidth}
                            onClick={(value) => dispatch(changeStrokeWidth, {value})}
                        />
                    </div>
                }
                <hr className="hr"/>
                <div className="ready_button">
                    <Button
                        style="default"
                        text="Готово"
                        onClick={() => {
                            switch(mode) {
                            case 'backgroundSlide':
                                dispatch(setBackground, { newColor: selectedColor });
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