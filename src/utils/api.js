import { DateTime } from 'luxon';

export const getUrl = (infoType, config) => {
	const base = process.env.REACT_APP_END_POINT;
	const apiKey = process.env.REACT_APP_API_KEY;
	const query = Object.entries(config).reduce((acc, current) => {
		return acc + `${current[0]}=${current[1]}&`;
	}, '');
	return `${base}/${infoType}?${query}APPID=${apiKey}`;
};

export const formatToLocalTime = (
	secs,
	zone,
	format = "cccc, dd, LLL, yyyy' | Local time: 'hh:mm a"
) => DateTime.fromSeconds(secs).setZone(zone).toFormat(format);

export const iconUrlFormCode = (code) =>
	`http://openweathermap.org/img/wn/${code}@2x.png`;

export const formatCurrentWeather = (data) => {
	const {
		main: { temp, feels_like, temp_min, temp_max, humidity },
		name,
		dt,
		weather,
		sys: { country, sunrise, sunset },
		wind: { speed },
	} = data;
	const { main: details, icon } = weather[0];
	return {
		temp,
		feels_like,
		temp_min,
		temp_max,
		humidity,
		name,
		dt,
		country,
		sunrise,
		sunset,
		details,
		icon,
		speed,
	};
};

export const formatForecastWeather = (data) => {
	let { timezone, daily, hourly } = data;
	daily = daily.slice(1, 6).map((d) => ({
		title: formatToLocalTime(d.dt, timezone, 'ccc'),
		temp: d.temp.day,
		icon: d.weather[0].icon,
	}));
	hourly = hourly.slice(1, 6).map((h) => ({
		title: formatToLocalTime(h.dt, timezone, 'ccc'),
		temp: h.temp,
		icon: h.weather[0].icon,
	}));
	return { timezone, daily, hourly };
};

export const getCurrentLocation = () => {
	const currentLocation = {};
	if (navigator.geolocation) {
		navigator.geolocation.getCurrentPosition(async (position) => {
			const lon = position.coords.longitude;
			const lat = position.coords.latitude;
			currentLocation.lon = lon;
			currentLocation.lat = lat;
		});
	}

	return { currentLocation };
};

export const formatBackground = (weather, units) => {
	if (!weather) return 'from-cyan-700 to-blue-700';
	const threshold = units === 'metric' ? 20 : 60;
	if (weather.temp <= threshold) return 'from-cyan-700 to-blue-700';
	return 'from-yellow-700 to-orange-700';
};
