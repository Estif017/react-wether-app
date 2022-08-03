import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const NavBar = () => {
	const [input, setInput] = useState('');
	let navigate = useNavigate();
	const handleChange = (e) => {
		setInput(e.target.value);
	};
	const handleSubmit = (e) => {
		navigate(`/cities/${input}`);
		e.preventDefault();
	};
	return (
		<nav>
			<div className='left'>
				<li>
					<Link to='/'>
						<strong>current Location</strong>
					</Link>
				</li>
				<li>
					<Link to='cities/Los+Angeles'>Los Angeles</Link>
				</li>
				<li>
					<Link to='cities/Paris'>Paris</Link>
				</li>
				<li>
					<Link to='cities/London'>London</Link>
				</li>
				<li>
					<Link to='cities/Tokio'>Tokio</Link>
				</li>
			</div>
			<div className='right'>
				<form onSubmit={handleSubmit}>
					<input value={input} onChange={handleChange} />
				</form>
			</div>
		</nav>
	);
};

export default NavBar;
