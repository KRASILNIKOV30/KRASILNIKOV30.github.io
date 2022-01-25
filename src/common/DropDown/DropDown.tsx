import styles from './DropDown.module.css';
import { useState, useRef, useEffect } from 'react';
import { Button } from '../Button/Button';
import { addObject, addImage } from '../../model/element';
import { dispatch } from '../../model/editor';
import { useClickOutside } from '../../core/hooks/useClickOutside';
import { Input } from '../Input/input';
import { useGettingWeather } from './WeatherInfo/WeatherInfo';

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
    const [activeWeather, setActiveWeather] = useState(false);
    return (
        <div className={styles.options_container}>
            <div
                className = {`${styles.figure} ${activeFigure && styles.figure_active}`}
                onClick = {() => {
                    setActiveFigure(!activeFigure);
                    setActiveWeather(false)
                    setActiveImage(false);
                }}
            >
                Фигура
            </div>
            <div 
                className = {`${styles.image} ${activeImage && styles.image}`}
                onClick = {() => {
                    setActiveImage(!activeImage);
                    setActiveWeather(false)
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
            <div
                className = {`${styles.weather} ${activeWeather && styles.weather_active}`}
                onClick = {() => {
                    setActiveFigure(false);
                    setActiveFigure(false);
                    setActiveWeather(!activeWeather)
                }}
            >
                Погода
            </div>
            <DropDownOptionsToAdd 
                activeFigure = {activeFigure}
                activeImage = {activeImage}
                activeWeather = {activeWeather}
                onClick = {onClick}
            />
        </div>
    )
}

interface DropDownOptionsToAddProps {
    activeFigure: boolean,
    activeImage: boolean,
    activeWeather: boolean
    onClick: () => void
}
const DropDownOptionsToAdd = ({ activeFigure, activeImage, activeWeather, onClick }: DropDownOptionsToAddProps) => {
    const buttonRef = useRef(null)
    const [cityName, setCityName] = useState('Yoshkar-Ola')
    useGettingWeather({buttonRef, city:cityName, addWeatherFunction: addObject}) 
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
        {
            activeWeather
                ?
                    <div className = {styles.weather_types}>
                        <Input
                            style = 'small'
                            placeholder = 'Введите название города...'
                            onKeyUp = {(value) => {
                                setCityName(value);
                                console.log('city name is ' + cityName)
                            }}
                        />
                        <div
                            ref = {buttonRef}
                        >
                            <Button
                                style = 'outline'
                                text = 'Найти'
                                onClick={() => {}}
                            />
                        </div>
                    </div>
                : null
        }
        </div>
        
    )
}