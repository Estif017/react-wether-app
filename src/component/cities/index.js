import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Wether from '../../pages/wether/index';
import { getUrl } from '../../utils/api';

const Cities = () => {
	const [data, setData] = useState(null);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState(false);
	const { cityName } = useParams();

	const getCitiesWether = async (cityName) => {
		try {
			setLoading(true);
			const { data } = await axios.get(getUrl({ q: cityName }));
			setLoading(false);
			setData(data);
		} catch (error) {
			setError(false);
			setLoading(false);
			console.log(error);
		}
	};

	useEffect(() => {
		getCitiesWether(cityName);
		// eslint-disable-next-line
	}, []);

	useEffect(() => {
		getCitiesWether(cityName);
		// eslint-disable-next-line
	}, [cityName]);

	const hasData = !loading && !error && data;
	return (
		<div className='container'>
			{loading && <h1>Loading....</h1>}
			{error && <h1>Error....</h1>}
			{hasData && <Wether data={data} />}
		</div>
	);
};

export default Cities;
