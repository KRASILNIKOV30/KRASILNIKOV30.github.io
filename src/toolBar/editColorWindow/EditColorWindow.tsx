import { useState } from "react";

import { SlideElement } from "../../model/types"
import { Button } from "../../common/Button/Button";
import { Knob } from "../../common/Knob/Knob";
import { Palette } from "../../common/Palette/Palette";
import styles from "./EditColorWindow.module.css";
import { changeStrokeColor, changeFillColor, changeStrokeWidth } from "../../model/element";
import { setBackground } from '../../model/presentation';
import { dispatch } from '../../model/editor_state';

interface EditColorWindowProps {
    firstSelectedElement: SlideElement
    drawMode: string,
    onClick: () => void
}

function EditColorWindow({ drawMode, firstSelectedElement, onClick }: EditColorWindowProps) {
    const [selectedColor, setSelectedColor] = useState('')
    return (
        <div className={styles.edit_color_window}>
            <div className={styles.frame}>
                {drawMode === 'backgroundSlide' &&
                    <div className={styles.head_text}>
                        Фон
                    </div>
                }
                {drawMode === 'fillFigure' &&
                    <div className={styles.head_text}>
                        Заливка
                    </div>
                }
                {drawMode === 'strokeFigure' &&
                    <div className={styles.head_text}>
                        Контур
                    </div>
                }
                <hr className={styles.hr} />
                <div className={styles.palette_block}>
                    <div className={styles.secondary_text}>
                        Цвет
                    </div>
                    <div>
                        <Palette 
                            sendValue = {(colorValue) => setSelectedColor(colorValue)}
                        />
                    </div>
                </div>
                {drawMode === 'backgroundSlide' &&
                    <div className={styles.change_value}>
                        <div className={styles.secondary_text}>
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
                    <div className={styles.change_value}>
                        <div className={styles.secondary_text}>
                            Толщина
                        </div>

                        <Knob
                            value = {firstSelectedElement.figure !== undefined ? firstSelectedElement.figure.strokeWidth: 0}
                            onClick={(value) => dispatch(changeStrokeWidth, { newWidth: value })}
                        />
                    </div>
                }
                <hr className={styles.hr} />
                <div className={styles.ready_button}>
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