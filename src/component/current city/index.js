import axios from 'axios';
import { useEffect, useState } from 'react';
import Wether from '../../pages/wether/index';
import { getUrl } from '../../utils/api';

const CurrentCity = () => {
	const [data, setData] = useState(null);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState(false);

	const getWether = async () => {
		try {
			setLoading(true);
			if (navigator.geolocation) {
				navigator.geolocation.getCurrentPosition(async (position) => {
					const lon = position.coords.longitude;
					const lat = position.coords.latitude;
					const { data } = await axios.get(getUrl({ lat, lon }));
					setData(data);
					setLoading(false);
				});
			}
		} catch (error) {
			setError(false);
			setLoading(false);
			console.log(error);
		}
	};

	useEffect(() => {
		getWether();
	}, []);
	const hasData = !loading && !error && data;
	return (
		<div className='container'>
			{loading && <h1>Loading....</h1>}
			{error && <h1>Error....</h1>}
			{hasData && <Wether data={data} />}
		</div>
	);
};

export default CurrentCity;
