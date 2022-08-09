import { useEffect, useState } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Forecasts from './components/Forecasts';
import Inputs from './components/Inputs';
import TemperatureAndDetails from './components/TemperatureAndDetails';
import TimeAndLocation from './components/TimeAndLocation';
import TopButtons from './components/TopButtons';
import {
	formatBackground,
	formatCurrentWeather,
	formatForecastWeather,
	getCurrentLocation,
	getUrl,
} from './utils/api';
import './App.css';

const App = () => {
	const [weather, setWeather] = useState(null);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState(false);
	const [city, setCity] = useState(getCurrentLocation().currentLocation);
	const [units, setUnits] = useState('metric');
	const current = getCurrentLocation().currentLocation;

	const searchCities = (value) => {
		setCity(value);
	};

	const changeUnits = (value) => {
		setUnits(value);
	};

	const currentCityPosition = () => {
		setCity(current);
	};

	const getWetherData = async () => {
		try {
			setLoading(true);

			const wetherUrl = getUrl('weather', { ...city, units });
			const { data: weatherData } = await axios.get(wetherUrl);
			toast.success(
				`Successfully fetched weather for ${weatherData.name},${weatherData.sys.country}`
			);
			const forecastUrl = getUrl('onecall', { ...weatherData.coord, units });
			const { data: forecastData } = await axios.get(forecastUrl);
			const formattedWeatherData = formatCurrentWeather(weatherData);
			const formattedForecastData = formatForecastWeather(forecastData);
			const data = { ...formattedWeatherData, ...formattedForecastData };
			setWeather(data);
			setLoading(false);
		} catch (error) {
			console.log(error);
			setError(true);
			setLoading(false);
			toast.error(`Can't find the city ${city.q} please try again`);
		}
	};
	useEffect(() => {
		if (city.q) {
			toast.info('Fetching wether for ' + city.q);
		} else {
			toast.info('Fetching wether for current location');
		}
		getWetherData();
		// eslint-disable-next-line
	}, [city, units]);

	return (
		<div
			className={`mx-auto max-w-screen-md mt-4 py-5 px-32 bg-gradient-to-br h-fit shadow-xl shadow-gray-400 ${formatBackground(
				weather,
				units
			)}`}>
			<TopButtons searchCities={searchCities} />
			<Inputs
				searchCities={searchCities}
				changeUnits={changeUnits}
				units={units}
				currentCityPosition={currentCityPosition}
			/>
			{error && !weather && (
				<h1 className='text-5xl text-white py-2'>
					Error occurred! can't find the city try again
				</h1>
			)}
			{loading && <h1 className='text-5xl text-white py-2'>Loading....</h1>}
			{weather && (
				<>
					<TimeAndLocation weather={weather} />
					<TemperatureAndDetails weather={weather} units={units} />
					<Forecasts title={'hourly forecast'} forecast={weather.hourly} />
					<Forecasts title={'daily forecast'} forecast={weather.daily} />
				</>
			)}
			<ToastContainer autoClose={5000} theme='colored' newestOnTop={true} />
		</div>
	);
};

export default App;
