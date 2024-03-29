import { useState, useEffect } from 'react';
import './App.css';
import CurrentWeather from './components/CurrentWeather';
import DailyWeather from './components/DailyWeather';
import HourlyWeather from './components/HourlyWeather';
import Navbar from './components/Navbar';

function App() {
  // let latitude = '19.216';
  // let longitude = '73.1034';
  // let timezone = 'auto';
  

  const [data, setData] = useState();
  const [loading, setLoading] = useState(false);
  const [currentData, setCurrentData] = useState();
  const [dailyData, setDailyData] = useState();
  const [hourlyData, setHourlyData] = useState();
  const [city, setCity] = useState();
  const [darkMode, setDarkMode] = useState(null);

  const toggleMode = (input) => {
    const bodyClasses = window.document.body.classList;

    if (input === true) {
      bodyClasses.add('dark', 'text-white', 'bg-gray-800');
      setDarkMode(true);
      localStorage.setItem('darkMode', true)
    } else if (input === false) {
      bodyClasses.remove('dark', 'text-white', 'bg-gray-800');
      setDarkMode(false);
      localStorage.setItem('darkMode', false)
    }
  }

  const getCurrentData = (Data) => {
    setCurrentData({
      weathercode: Data.current_weather.weathercode,
      temperature: Data.current_weather.temperature,
      windspeed: Data.current_weather.windspeed,
      max_temp: Data.daily.temperature_2m_max[0],
      min_temp: Data.daily.temperature_2m_min[0],
      sunrise: Data.daily.sunrise[0] * 1000,
      sunset: Data.daily.sunset[0] * 1000,
      visibility: Data.hourly.visibility[0] / 1000,
    })
  }

  const getDailyData = (dailyData, hourlyData) => {
    setDailyData(dailyData)
    setHourlyData(hourlyData)
  }

  const getWeatherReport = async (position) => {
    setLoading(true)

    let url = `https://api.open-meteo.com/v1/forecast?latitude=${position.coords.latitude}&longitude=${position.coords.longitude}&hourly=temperature_2m,relativehumidity_2m,apparent_temperature,precipitation,rain,weathercode,visibility,windspeed_10m&daily=weathercode,temperature_2m_max,temperature_2m_min,apparent_temperature_max,apparent_temperature_min,sunrise,sunset&current_weather=true&timeformat=unixtime&timezone=auto`;
    let Data = await fetch(url);
    let parsedData = await Data.json();
    if (parsedData) {
      setLoading(false)
    }
    setData(parsedData);
    getCurrentData(parsedData)
    // console.log(parsedData.hourly.weathercode)

    let dailyObj = [];
    for (let i = 0; i < parsedData.daily.weathercode.length; i++) {
      dailyObj.push({
        weathercode: parsedData.daily.weathercode[i],
        temp_min: parsedData.daily.temperature_2m_min[i],
        temp_max: parsedData.daily.temperature_2m_max[i],
        sunrise: parsedData.daily.sunrise[i],
        sunset: parsedData.daily.sunset[i],
        day: parsedData.daily.time[i],
      })
    }
    let hourlyObj = [];
    for (let i = 0; i < 24; i++) {
      hourlyObj.push({
        weathercode: parsedData.hourly.weathercode[i],
        temperature: parsedData.hourly.apparent_temperature[i],
        temperature_fl: parsedData.hourly.temperature_2m[i],
        visibility: parsedData.hourly.visibility[i],
        windspeed: parsedData.hourly.windspeed_10m[i],
        time: parsedData.hourly.time[i],
      })
    }

    getDailyData(dailyObj, hourlyObj)

    try {
      let revGeoUrl = `https://api.openweathermap.org/geo/1.0/reverse?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=b72bc254d40bed513d258f632628faa8`;
      let MycityData = await fetch(revGeoUrl);
      if (MycityData.status !== 200) {
        setCity("API exhausted!")
      }
      let Mycity = await MycityData.json();
      setCity(Mycity[0].name)
    } catch (error) {
      // console.log(error)
    }
  }

  const cannotGetWeatherReport = () => {
    setLoading(false)
    // console.log("Failed to get coordinates")
  }

  async function checkAndSetDarkmode() {
    let localDarkMode = localStorage.getItem('darkMode')
    if (localDarkMode === null) {
      localStorage.setItem('darkMode', false);
      toggleMode(false)
    }
    else {
      let parsedDarkMode = await JSON.parse(localDarkMode)
      if (parsedDarkMode === true) {
        toggleMode(true)
      } else if (parsedDarkMode === false) {
        console.log("Light mode set to", parsedDarkMode)
        toggleMode(false)
      } else {
        localStorage.setItem('darkMode', false);
        toggleMode(false)
      }
    }
  }

  useEffect(() => {
    document.body.classList.add("min-h-screen")
    checkAndSetDarkmode()

    if (navigator.geolocation) {
      setLoading(true)
      navigator.geolocation.getCurrentPosition(getWeatherReport, cannotGetWeatherReport);
    } else {
      console.log("Geolocation is not supported by this browser.")
    }
    // eslint-disable-next-line
  }, [])

  return (
    <>
      <Navbar city={city} mode={darkMode} toggleMode={toggleMode} />

      {
        data ?
          <main className="p-2 sm:p-6 flex flex-col justify-center darkmode-class color-transit">
            <div className="wrapper max-w-5xl mx-auto">
              <CurrentWeather weather={currentData} city={undefined} />
              <div className="flex flex-wrap justify-center my-6 gap-1">
                {dailyData.map((element) => {
                  return <DailyWeather key={element.day}
                    daily={element}
                  />
                })}
              </div>
              <div className="rounded-md border border-gray-400">
                <div className="flex items-center justify-around border-gray-400 border-b last:border-b-0 py-2">
                  <div className="text-center text-sm sm:text-xl basis-5"></div>
                  <div className="text-center text-sm sm:text-xl basis-1/5">Time</div>
                  <div className="text-center text-sm sm:text-xl basis-1/5">Temperature</div>
                  <div className="text-center text-sm sm:text-xl basis-1/5">Feels like</div>
                  <div className="text-center text-sm sm:text-xl basis-1/5">Wind</div>
                </div>

                {hourlyData.map((element) => {
                  return <HourlyWeather key={element.time}
                    hourly={element}
                  />
                })}
              </div>
            </div>
          </main> : (loading ? <main className="darkmode-class"><h1 className="text-center text-2xl mt-8 font-semibold">Getting weather data...</h1>
          </main> : <main className="darkmode-class"><h1 className="text-center text-2xl mt-8 font-semibold">Failed to get Co-ordinates!</h1>
            <h1 className="text-center text-2xl my-2 font-semibold">Please reload the page with loaction access.</h1><p className="text-center mx-auto underline"><a className="text-center mx-auto" href="/">Click here to reload</a></p></main>)
      }
    </>
  );
}


export default App;
