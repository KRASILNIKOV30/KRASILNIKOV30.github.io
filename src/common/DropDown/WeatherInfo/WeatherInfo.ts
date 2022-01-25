import React, { useCallback, useEffect, useState } from 'react';

interface GettingWeatherProps {
    buttonRef: React.RefObject<HTMLElement|null>,
    city: string,
    addWeatherFunction: Function
}

const useGettingWeather = ({
    buttonRef,
    city,
    addWeatherFunction
}: GettingWeatherProps) => {

    const [weatherTemp, setWeatherTemp] = useState('');
    const [weatherFeels, setWeatherFeels] = useState('');

    const onMouseDown = useCallback(() => {
      try {
        fetch('https://api.openweathermap.org/data/2.5/weather?q=' + city + '&appid=98e5bfeb477c9bec9f5ee8de192eaed8')
          .then(res => res.json())
          .then(weather => {
            setWeatherTemp(weather.main.temp);
            setWeatherFeels(weather.main.feels_like)
          });
      } catch (e) {}
      if (weatherTemp && weatherFeels) {
          addWeatherFunction('text',
            city + `:
    temperature: ${Math.round(Number(weatherTemp) - 273)}
    feels like: ${Math.round(Number(weatherFeels) - 273)}`
          )
          setWeatherTemp('')
          setWeatherFeels('')
      }
    }, [city, weatherTemp, setWeatherTemp, weatherFeels, setWeatherFeels])

    useEffect(() => {  
        if (buttonRef.current) {
            buttonRef.current.addEventListener('mousedown', onMouseDown)
        }
        return () => {
          if (buttonRef.current) {
            buttonRef.current.removeEventListener('mousedown', onMouseDown)  
          }
        }
        
    }, [buttonRef, buttonRef.current, onMouseDown, city])
};
export { useGettingWeather };