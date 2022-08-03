const Wether = ({ data }) => {
	return (
		<div>
			<h1>
				{data.name}, {data.sys.country}
			</h1>
			<img
				src={`http://openweathermap.org/img/wn/${data.weather[0].icon}@4x.png`}
				alt='weather-condition'
			/>
			<h2>{data.weather[0].description}</h2>
			<ul>
				<li>Temperature: {data.main.temp}</li>
				<li>Minimum Temperature: {data.main.temp_min}</li>
				<li>Max Temperature: {data.main.temp_max}</li>
				<li>Pressure: {data.main.pressure}</li>
				<li>Humidity: {data.main.humidity}</li>
				<li>
					Wind: {data.wind.speed}, {data.wind.deg}
					&deg;
				</li>
				<li>Cloud: {data.clouds.all}</li>
			</ul>
		</div>
	);
};

export default Wether;
