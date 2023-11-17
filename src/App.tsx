import { useState, FormEvent } from 'react';
import styles from './styles/App.module.css';
import { WeatherProps } from './types';

const App = () => {
  const [city, setCity] = useState('');
  const [weatherData, setWeatherData] = useState<WeatherProps>();

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    const url = `https://weatherapi-com.p.rapidapi.com/forecast.json?q=${city}&days=3`;
    const options = {
      method: 'GET',
      headers: {
        'X-RapidAPI-Key': '01badbd639msh49fdb1f0b0172c7p124438jsna6c5428d7c00',
        'X-RapidAPI-Host': 'weatherapi-com.p.rapidapi.com',
      },
    };

    fetch(url, options)
      .then(async (res) => {
        const data = await res.json();
        setWeatherData(data);
        setCity('');
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className={styles.container}>
      <div className={styles.weatherCard}>
        <h1>Sanatic</h1>
        <p>Wherever you go, our weather knows.</p>

        <form className={styles.form} onSubmit={handleSubmit}>
          <div>
            {/* <label className={styles.label}>City</label> */}
            <input
              type='text'
              value={city}
              onChange={(e) => setCity(e.target.value)}
              placeholder='Search for city weather....'
              className={styles.input}
            />
          </div>
        </form>

        {weatherData == null ? null : (
          <div className={styles.weatherDetails}>
            <h4 className={styles.locationDetails}>
              {weatherData?.location.name}, {weatherData?.location.region},{' '}
              {weatherData?.location.country}
            </h4>

            <h4
              style={{
                marginTop: '1rem',
              }}>
              Current Conditions
            </h4>
            <div className={styles.weatherConditionContainer}>
              <img
                src={weatherData?.current.condition.icon}
                alt={weatherData?.current.condition.text}
              />
              <div>
                <p>Temperature: {weatherData?.current.temp_c} °C</p>
                <p>Condition: {weatherData?.current.condition.text}</p>
                <p>Wind: {weatherData.current.wind_kph} km/h</p>
                <p>Humidity: {weatherData.current.humidity}%</p>
              </div>
            </div>

            <h4
              style={{
                marginTop: '1rem',
              }}>
              Average Day Conditions
            </h4>
            <div className={styles.avgDayConditions}>
              <img
                src={weatherData?.forecast.forecastday[0].day.condition.icon}
                alt={weatherData?.forecast.forecastday[0].day.condition.text}
              />
              <div>
                <p>
                  Temperature:
                  {weatherData?.forecast.forecastday[0].day.avgtemp_c} °C
                </p>
                <p>
                  Condition:
                  {weatherData?.forecast.forecastday[0].day.condition.text}
                </p>
                <p>
                  Max Wind:
                  {weatherData.forecast.forecastday[0].day.maxwind_mph} km/h
                </p>
                <p>
                  Humidity:
                  {weatherData.forecast.forecastday[0].day.avghumidity}%
                </p>
              </div>
            </div>
          </div>
        )}

        <p
          style={{
            marginTop: '2rem',
          }}>
          Sanatic 3203 <br /> All rights resereved &copy;
        </p>
      </div>
    </div>
  );
};

export default App;
