import styles from './DropDown.module.css';
import { useState, useRef } from 'react';
import Button from '../Button/Button';
import TextField from '../TextField/textField';
import { useClickOutside } from '../../core/hooks/useClickOutside';
import { AppDispatch } from '../../model/store';
import { addImage, addObject, } from '../../model/actionCreators';
import { connect } from 'react-redux';
import { getBase64FromPicture } from '../../model/export';
import { useGettingWeather } from './WeatherInfo/WeatherInfo';

interface DropDownProps {
    addObject: (element: string) => void,
    addImage: (urlImage: string) => void,
}

const DropDown = ({addObject, addImage}: DropDownProps) => {
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
                        addImage={addImage}
                        addObject={addObject}
                    /> 
                    :  null
            }
        </div>
    )
}

interface DropDownOptionsProps {
    onClick: () => void,
    addObject: (element: string, textValue?: string) => void,
    addImage: (urlImage: string) => void,
}

const DropDownOptions = ({onClick, addObject, addImage}: DropDownOptionsProps) => {
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
                    addObject('text')
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
                addObject={addObject}
                addImage={addImage}
            />
        </div>
    )
}

interface DropDownOptionsToAddProps {
    activeFigure: boolean,
    activeImage: boolean,
    onClick: () => void,
    addObject: (element: string, textValue?: string) => void,
    addImage: (urlImage: string) => void,
    activeWeather: boolean
}

const DropDownOptionsToAdd = ({ activeFigure, activeImage, activeWeather, onClick, addObject, addImage }: DropDownOptionsToAddProps) => {
    const [inputImageUrl, setInputImageUrl] = useState(false);
    const [cityName, setCityName] = useState('Yoshkar-Ola')
    const buttonRef = useRef(null)
    useGettingWeather({buttonRef, city: cityName, addWeatherFunction: (element: string, textValue: string) => addObject(element, textValue)})
    return (
        <div className={styles.options_to_add_container}>
            {
            activeFigure 
                ?
                    <div className = {styles.figure_types}>
                        <div 
                            className={styles.rectangle}
                            onClick = {() => {
                                addObject('rectangle')
                                onClick()
                            }}>
                        </div>
                        <div 
                            className={styles.triangle}
                            onClick = {() => {
                                addObject('triangle')
                                onClick()
                            }}>
                        </div>
                        <div 
                            className={styles.circle}
                            onClick = {() => {
                                addObject('circle')
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
                            viewStyle = 'default'
                            text = 'С компьютера'
                            onClick = {() => {
                                const inputFile = document.createElement('input');
                                inputFile.type = 'file';
                                inputFile.style.display = 'none';
                                inputFile.accept = 'image/*';
                                inputFile.onchange = () => {
                                    if (inputFile.files) {
                                        const urlImage = URL.createObjectURL(inputFile.files[0])
                                        getBase64FromPicture(urlImage, {width: 400, height: 400}).then((newUrl) => {
                                            addImage(newUrl)
                                        })
                                    }
                                }
                                inputFile.click();
                                inputFile.remove();
                                onClick()
                            }}
                        />
                        <Button 
                            viewStyle = 'default'
                            text = 'С интернета'
                            onClick = {() => {
                                setInputImageUrl(!inputImageUrl)
                            }}
                        />
                        {
                            inputImageUrl
                                ?
                                    <TextField 
                                        size="small"
                                        onKeyUp = {(value) => {
                                            addImage(value)
                                            setInputImageUrl(false)
                                            onClick()
                                        }}
                                        placeholder = 'URL'
                                    />
                                : null
                        }
                    </div>
                : null
        }
        {
            activeWeather
                ?
                    <div className = {styles.weather_types}>
                        <TextField
                            size = 'small'
                            placeholder = 'Город'
                            onKeyUp = {(value) => {
                                setCityName(value)
                            }}
                        />
                        <div
                            ref = {buttonRef}
                        >
                            <Button
                                viewStyle = 'outline'
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

const mapDispatchToProps = (dispatch: AppDispatch) => {
    return {
        addObject: (element: string, textValue?: string) => dispatch(addObject(element, textValue)),
        addImage: (urlImage: string) => dispatch(addImage(urlImage)),
    }
}

export default connect(null, mapDispatchToProps)(DropDown)