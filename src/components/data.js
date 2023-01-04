// let latitude = '19.16';
// let longitude = '73.27';
// let timezone = 'auto';
const getWeatherReport = async (latitude, longitude, timezone) => {
    const url = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&hourly=temperature_2m,apparent_temperature,weathercode,visibility,windspeed_10m&daily=weathercode,temperature_2m_max,temperature_2m_min,apparent_temperature_max,apparent_temperature_min&current_weather=true&timeformat=unixtime&timezone=${timezone}`;
    let data = await fetch(url);
    let parsedData = await data.json();
    return parsedData;
}


export default getWeatherReport;