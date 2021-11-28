import './DropDown.css';
import { makeClassName } from '../functions/utils/makeClassName';
import { useState } from 'react';
import { Button } from '../Button/Button';

interface DropDownProps {
    onClick: () => void
}

export const DropDown = ({
    onClick
}: DropDownProps) => {
    const [opened, setOpened] = useState(false);
    return (
        <div className = 'drop_down_container'>
            <div
                className = {makeClassName('drop_down', {
                    'active': opened
                })}
                onClick={() => setOpened(!opened)}
            >
                <div
                    className = {makeClassName('drop_down--text_container', {
                        'active': opened
                    })}
                >
                    Вставка
                </div>
            </div>
            {
                opened
                    ?  <DropDownOptions /> 
                    :  null
            }
        </div>
    )
}

const DropDownOptions = () => {
    const [activeFigure, setActiveFigure] = useState(false);
    const [activeImage, setActiveImage] = useState(false);
    return (
        <div className='drop_down_options_container'>
            <div className = {makeClassName('option--figure', {
                    'active': activeFigure
                })}
                onClick = {() => {
                    setActiveFigure(!activeFigure);
                    setActiveImage(false);
                }}
            >
                Фигура
            </div>
            <div className = {makeClassName('option--image', {
                    'active': activeImage
                })}
                onClick = {() => {
                    setActiveImage(!activeImage);
                    setActiveFigure(false);
                }}
            >
                Изображение
            </div>
            <div className = 'option--text'
                onClick = {() => {
                    setActiveImage(false);
                    setActiveFigure(false);
                }}  
            >
                Текст
            </div>
            {
                activeFigure 
                    ?
                        <div className = 'option--figure--types'>
                            <div className='option--figure--types--rectangle'></div>
                            <div className='option--figure--types--triangle'></div>
                            <div className='option--figure--types--circle'></div>
                        </div>
                    : null
            }
            {
                activeImage
                    ?
                        <div className = 'option--image--types'>
                            <Button 
                                style = 'default'
                                text = 'С компьютера'
                                onClick = {() => {}}
                            />
                            <Button 
                                style = 'default'
                                text = 'С интернета'
                                onClick = {() => {}}
                            />
                        </div>
                    : null
            }
        </div>
    )
}