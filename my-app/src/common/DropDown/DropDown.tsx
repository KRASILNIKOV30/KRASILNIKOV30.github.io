import './DropDown.css';
import { makeClassName } from '../functions/utils/makeClassName';
import { useState } from 'react';
import { Button } from '../Button/Button';
import { addObject } from '../functions/model/element';
import { dispatch } from '../../common/functions/model/editor';


export const DropDown = () => {
    const [opened, setOpened] = useState(false);
    return (
        <div className = 'drop_down_container'>
            <div
                className = {makeClassName('drop_down', {
                    'active': opened
                })}
                onClick = {() => setOpened(!opened)}
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
                    dispatch(addObject, { element: 'text' })
                    setActiveImage(false);
                    setActiveFigure(false);
                    onClick();
                }}  
            >
                Текст
            </div>
            {
                activeFigure 
                    ?
                        <div className = 'option--figure--types'>
                            <div 
                                className='option--figure--types--rectangle'
                                onClick = {() => {
                                    dispatch(addObject, { element: 'rectangle' })
                                    onClick()
                                }}>
                            </div>
                            <div 
                                className='option--figure--types--triangle'
                                onClick = {() => {
                                    dispatch(addObject, { element: 'triangle' })
                                    onClick()
                                }}>
                            </div>
                            <div 
                                className='option--figure--types--circle'
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
                        <div className = 'option--image--types'>
                            <Button 
                                style = 'default'
                                text = 'С компьютера'
                                onClick = {() => {
                                    dispatch(addObject, { element: 'image' })
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
                        </div>
                    : null
            }
        </div>
    )
}