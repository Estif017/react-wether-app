export const getUrl = (config) => {
	const base = process.env.REACT_APP_END_POINT;
	const query = Object.entries(config).reduce((acc, cur, idx, arr) => {
		if (idx === arr.length - 1) {
			return acc + `${cur[0]}=${cur[1]}`;
		}
		return acc + `${cur[0]}=${cur[1]}&`;
	}, '');
	const API_key = process.env.REACT_APP_API_KEY;
	return `${base}?${query}&appid=${API_key}`;
};
