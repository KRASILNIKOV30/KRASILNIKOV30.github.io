import styles from './DropDown.module.css';
import { useState, useRef } from 'react';
import { Button } from '../Button/Button';
import { addObject, addImage } from '../../model/element';
import { dispatch } from '../../model/editor';
import { useClickOutside } from '../../core/hooks/useClickOutside';

export const DropDown = () => {
    const [opened, setOpened] = useState(false);
    const dropDownRef = useRef<HTMLDivElement>(null)

    useClickOutside(dropDownRef, () => setOpened(false));
    
    return (
        <div className = {styles.container}
            ref={dropDownRef}
        >
            <div
                className = {`${styles.drop_down} ${opened && styles.drop_down_active}`}
                onClick = {() => setOpened(!opened)}
            >
                <div
                    className = {`${styles.text_container} ${opened && styles.text_container_active}`}
                >
                    Вставка
                </div>
            </div>
            {
                opened
                    ?  <DropDownOptions 
                        onClick = {() => setOpened(false)}
                    /> 
                    :  null
            }
        </div>
    )
}

interface DropDownOptionsProps {
    onClick: () => void
}

const DropDownOptions = ({onClick}: DropDownOptionsProps) => {
    const [activeFigure, setActiveFigure] = useState(false);
    const [activeImage, setActiveImage] = useState(false);
    return (
        <div className={styles.options_container}>
            <div
                className = {`${styles.figure} ${activeFigure && styles.figure_active}`}
                onClick = {() => {
                    setActiveFigure(!activeFigure);
                    setActiveImage(false);
                }}
            >
                Фигура
            </div>
            <div 
                className = {`${styles.image} ${activeImage && styles.image}`}
                onClick = {() => {
                    setActiveImage(!activeImage);
                    setActiveFigure(false);
                }}
            >
                Изображение
            </div>
            <div
                className = {styles.text}
                onClick = {() => {
                    dispatch(addObject, { element: 'text' })
                    setActiveImage(false);
                    setActiveFigure(false);
                    onClick();
                }}  
            >
                Текст
            </div>
            <DropDownOptionsToAdd 
                activeFigure = {activeFigure}
                activeImage = {activeImage}
                onClick = {onClick}
            />
        </div>
    )
}

interface DropDownOptionsToAddProps {
    activeFigure: boolean,
    activeImage: boolean,
    onClick: () => void
}

const DropDownOptionsToAdd = ({ activeFigure, activeImage, onClick }: DropDownOptionsToAddProps) => {
    return (
        <div className={styles.options_to_add_container}>
            {
            activeFigure 
                ?
                    <div className = {styles.figure_types}>
                        <div 
                            className={styles.rectangle}
                            onClick = {() => {
                                dispatch(addObject, { element: 'rectangle' })
                                onClick()
                            }}>
                        </div>
                        <div 
                            className={styles.triangle}
                            onClick = {() => {
                                dispatch(addObject, { element: 'triangle' })
                                onClick()
                            }}>
                        </div>
                        <div 
                            className={styles.circle}
                            onClick = {() => {
                                dispatch(addObject, { element: 'circle' })
                                onClick()
                            }}>
                        </div>
                    </div>
                : null
        }
        {
            activeImage
                ?
                    <div className = {styles.image_types}>
                        <Button 
                            style = 'default'
                            text = 'С компьютера'
                            onClick = {() => {
                                const inputFile = document.createElement('input');
                                inputFile.type = 'file';
                                inputFile.style.display = 'none';
                                inputFile.accept = 'image/*';
                                inputFile.onchange = () => {
                                    if (inputFile.files) {
                                        const urlImage = URL.createObjectURL(inputFile.files[0])
                                        dispatch(addImage, { urlImage: urlImage })
                                    }
                                   
                                }
                                inputFile.click();
                                inputFile.remove();
                                onClick()
                            }}
                        />
                        <Button 
                            style = 'default'
                            text = 'С интернета'
                            onClick = {() => {
                                onClick()
                            }}
                        />
                        <Button 
                            style = 'default'
                            text = 'С Анапы 2007'
                            onClick = {() => {
                                dispatch(addImage, { urlImage: 'https://cdn.photosight.ru/sight/2007/08/27/2270629.jpg' })
                            }}
                        />
                    </div>
                : null
        }
        </div>
        
    )
}