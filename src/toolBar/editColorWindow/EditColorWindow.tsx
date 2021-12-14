import { useState } from "react";

import { Editor } from "../../model/types"
import { Button } from "../../common/Button/Button";
import { Knob } from "../../common/Knob/Knob";
import { Palette } from "../../common/Palette/Palette";
import "./EditColorWindow.css";
import { changeStrokeColor, changeFillColor } from "../../model/element";
import { dispatch } from '../../model/editor';

interface EditColorWindowProps {
    mode: string,
    onClick: () => void
}

function EditColorWindow({ mode, onClick }: EditColorWindowProps) {
    const [selectedColor, setSelectedColor] = useState('')
    return (
        <div className='edit_color_window'>
            <div className="frame">
                {mode === 'fone' &&
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
                            value="1"
                            onClick={console.log}
                        />
                    </div>
                }
                <hr className="hr"/>
                <div className="ready_button">
                    <Button
                        style="default"
                        text="Готово"
                        onClick={() => {
                            dispatch(changeFillColor, { 
                                newColor: selectedColor,
                                selectedElementsId: ['1']
                            });
                            onClick()
                        }}
                    />
                </div>
            </div>
        </div>
    )}

export { EditColorWindow }