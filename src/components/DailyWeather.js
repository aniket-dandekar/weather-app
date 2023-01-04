// import DayWeather from '../DayWeather'
import { WiDaySunny, WiCloud, WiDayCloudy, WiRain, WiStormShowers, WiDayFog, WiSnowflakeCold, WiSunrise, WiSunset } from "react-icons/wi";

const DailyWeather = ({ daily }) => {
  const HOUR_FORMATTER = new Intl.DateTimeFormat(undefined, { timeStyle: 'short' })
  const DAY_FORMATTER = new Intl.DateTimeFormat(undefined, { weekday: 'long' })

  return (
    <div className="sm:daily-card daily-card-mob transition-transform ease-in-out duration-100 darkmode-class color-transit">
      <IconManager weatherCode={daily.weathercode} />
      <div className="text-center my-1">{daily.temp_max} &deg;C</div>
      <div className="text-center my-1">{daily.temp_min} &deg;C</div>
      <div className="text-center my-1 flex justify-center items-center flex-row sm:gap-1">
        <WiSunrise className="sm:text-2xl text-xl tracking-tighter" /> {HOUR_FORMATTER.format(daily.sunrise * 1000)}
      </div>
      <div className="text-center my-1 flex justify-center items-center flex-row sm:gap-1">
        <WiSunset className="sm:text-2xl text-xl tracking-tighter" /> {HOUR_FORMATTER.format(daily.sunset * 1000)}
      </div>
      <div className="text-center my-1"> {DAY_FORMATTER.format(daily.day * 1000)}</div>
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
  addMapping([0, 1], <WiDaySunny className="text-5xl sm:text-6xl mx-auto" />);
  addMapping([2], <WiDayCloudy className="text-5xl sm:text-6xl mx-auto" />);
  addMapping([3], <WiCloud className="text-5xl sm:text-6xl mx-auto" />);
  addMapping([45, 48], <WiDayFog className="text-5xl sm:text-6xl mx-auto" />);
  addMapping([51, 53, 55, 56, 57, 61, 63, 65, 66, 67, 80, 81, 82], <WiRain className="text-5xl sm:text-6xl mx-auto" />);
  addMapping([71, 73, 75, 77, 85, 86], <WiSnowflakeCold className="text-5xl sm:text-6xl mx-auto" />);
  addMapping([95, 96, 99], <WiStormShowers className="text-5xl sm:text-6xl mx-auto" />);

  return (
    ICON_MAP.get(weatherCode)
  )
}


export default DailyWeather