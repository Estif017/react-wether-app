import { Routes, Route } from 'react-router-dom';
import NavBar from './component/navbar';
import './App.css';
import CurrentCity from './component/current city';
import Cities from './component/cities';

const App = () => {
	return (
		<div className='App'>
			<NavBar />
			<Routes>
				<Route path='/' element={<CurrentCity />} />
				<Route path={`cities/:cityName`} element={<Cities />} />
			</Routes>
		</div>
	);
};

export default App;
