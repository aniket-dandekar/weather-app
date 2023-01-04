import React from 'react'

const DayWeather = ({ weathercode, temp_min, temp_max, sunrise, sunset }) => {
    // console.log(temp_min)
    return (

        <div className="weather my-6 w-full bg-gray-600">
            <p>{weathercode}</p>
            <p>{temp_min}</p>
            <p>{temp_max}</p>
            <p>{sunrise}</p>
            <p>{sunset}</p>
        </div>
    )
}




export default DayWeather