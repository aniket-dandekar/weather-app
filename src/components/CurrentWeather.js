import React from 'react'
// import sun from './icons/sun.svg'
import { WiDaySunny, WiCloud, WiDayCloudy, WiRain, WiStormShowers, WiDayFog, WiSnowflakeCold } from "react-icons/wi";

const CurrentWeather = ({ weather }) => {
  // console.log(weather)
  const HOUR_FORMATTER = new Intl.DateTimeFormat(undefined, {timeStyle: 'short'})
  // const HOUR_FORMATTER = new Intl.DateTimeFormat(undefined, {timeStyle: 'short'})
  return (
    <div className="flex items-center flex-wrap text-gray-800 w-full text-base sm:text-lg darkmode-class color-transit">

      <div className="left flex flex-row  basis-full justify-center items-center gap-4 lg:basis-1/2">
        <IconManager weatherCode={weather.weathercode} /> 
        <div className="text-6xl font-medium tracking-tight"> {weather.temperature} &deg;C</div>
      </div>
      <div className="right mt-2 basis-full text-center grid grid-cols-3 gap-y-2 font-normal max-w-xl mx-auto md:w-full lg:mt-0 lg:basis-1/2">
        <div className="current-items"><span className="font-bold">High</span> <br/>{weather.max_temp} &deg;C</div>
        <div className="current-items"><span className="font-bold">Sunrise</span> <br/>{HOUR_FORMATTER.format(weather.sunrise)}</div>
        <div className="current-items"><span className="font-bold">Wind</span> <br/>{weather.windspeed} Km/h</div>
        <div className="current-items"><span className="font-bold">Low</span> <br/>{weather.min_temp} &deg;C</div>
        <div className="current-items"><span className="font-bold">Sunset</span> <br/>{HOUR_FORMATTER.format(weather.sunset)}</div>
        <div className="current-items"><span className="font-bold">Visibility</span> <br/>{weather.visibility} Km</div>
      </div>
    </div>
  )
}

const IconManager = ({ weatherCode }) => {
  const ICON_MAP = new Map();
  const addMapping = (values, icon) => {
    values.forEach(element => {
      ICON_MAP.set(element, icon)
    });
  }
  addMapping([0, 1], <WiDaySunny className="weather-icons" />);
  addMapping([2], <WiDayCloudy className="weather-icons" />);
  addMapping([3], <WiCloud className="weather-icons" />);
  addMapping([45, 48], <WiDayFog className="weather-icons" />);
  addMapping([51, 53, 55, 56, 57, 61, 63, 65, 66, 67, 80, 81, 82], <WiRain className="weather-icons" />);
  addMapping([71, 73, 75, 77, 85, 86], <WiSnowflakeCold className="weather-icons" />);
  addMapping([95, 96, 99], <WiStormShowers className="weather-icons" />);

  return (
    ICON_MAP.get(weatherCode)
  )
}

export default CurrentWeather