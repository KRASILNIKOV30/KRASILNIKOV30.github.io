import { useState } from "react";

import { Editor } from "../../model/types"
import { Button } from "../../common/Button/Button";
import { Knob } from "../../common/Knob/Knob";
import { Palette } from "../../common/Palette/Palette";
import "./EditColorWindow.css";
import { changeStrokeColor, changeFillColor } from "../../model/element";
{//import { dispatch } from '.../model/editor';

//import { changeTitle, saveDoc, uploadDoc, exportDoc, switchPreview, undo, redo } from ".../model/pres";
//import { addSlide, removeSlides } from ".../model/slide";
}

type EditColorWindowProps = {
    editor: Editor
}

function EditColorWindow({ editor }: EditColorWindowProps) {
    const [visible, setVisible] = useState(true);
    const [whichBlock, setWhichBlock] = useState(0);

    if (!visible) return null

    return (
        <div className='edit_color_window'>
            <div className="frame">
                <div className="head_text">
                     Фон
                </div>
                <hr className="hr"/>
                <div className="palette_block">
                    <div className="secondary_text">
                        Цвет
                    </div>
                    <div>
                        <Palette
                            selectedPaletteElementId=""
                        />
                    </div>
                </div>
                {whichBlock === 1 &&
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
                {whichBlock === 0 &&
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
                        onClick={() => setVisible(!visible)}
                    />
                </div>
            </div>
        </div>
    )}

export { EditColorWindow }