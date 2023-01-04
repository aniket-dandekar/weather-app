import { WiDaySunny, WiCloud, WiDayCloudy, WiRain, WiStormShowers, WiDayFog, WiSnowflakeCold } from "react-icons/wi";


const HourlyWeather = ({  hourly }) => {
    // console.log(hourly.weathercode)
    
  const HOUR_FORMATTER = new Intl.DateTimeFormat(undefined, { timeStyle: 'short' })
//   const DAY_FORMATTER = new Intl.DateTimeFormat(undefined, { weekday: 'long' })
    return (
        <div className="flex items-center justify-around border-gray-400 border-b last:border-b-0">
            <div className="basis-2">
            <IconManager weatherCode={hourly.weathercode} />
            </div>
            <div className="text-center text-sm sm:text-xl basis-1/4">{HOUR_FORMATTER.format(hourly.time * 1000)} </div>
            
            <div className="text-center text-sm sm:text-xl basis-1/4">{hourly.temperature} &deg;C</div>
            <div className="text-center text-sm sm:text-xl basis-1/4">{hourly.temperature_fl} &deg;C</div>
            {/* <div className="text-center text-sm sm:text-xl basis-1/4">{visibility/1000} Km </div> */}
            <div className="text-center text-sm sm:text-xl basis-1/4">{hourly.windspeed} Km/h</div>
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
    addMapping([0, 1], <WiDaySunny className="text-4xl mx-auto sm:text-6xl  basis-1/5" />);
    addMapping([2], <WiDayCloudy className="text-4xl mx-auto sm:text-6xl  basis-1/5" />);
    addMapping([3], <WiCloud className="text-4xl mx-auto sm:text-6xl  basis-1/5" />);
    addMapping([45, 48], <WiDayFog className="text-4xl mx-auto sm:text-6xl  basis-1/5" />);
    addMapping([51, 53, 55, 56, 57, 61, 63, 65, 66, 67, 80, 81, 82], <WiRain className="text-4xl mx-auto sm:text-6xl  basis-1/5" />);
    addMapping([71, 73, 75, 77, 85, 86], <WiSnowflakeCold className="text-4xl mx-auto sm:text-6xl  basis-1/5" />);
    addMapping([95, 96, 99], <WiStormShowers className="text-4xl mx-auto sm:text-6xl  basis-1/5" />);

    return (
        ICON_MAP.get(weatherCode)
    )
}

export default HourlyWeather