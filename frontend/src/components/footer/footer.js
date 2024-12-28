import { useEffect, useState } from 'react';
import styled from 'styled-components';

const FooterContainer = ({ className }) => {
	const [city, setCity] = useState('');
	const [temperature, setTemperature] = useState('');
	const [weather, setWeather] = useState('');

	useEffect(() => {
		// 	fetch()
		// 		.then((res) => res.json())
		// 		.then(({ name, main, weather }) => {
		// 			setCity(name);
		// 			setTemperature(Math.round(main.temp));
		// 			setWeather(weather[0].description);
		// 		});
	}, []);

	return (
		<div className={className}>
			<div>
				<div>WEB-developer's BLOG</div>
				<div>web@developer.com</div>
			</div>
			<div>
				<div>
					{city}{' '}
					{new Date().toLocaleString('en', { day: 'numeric', month: 'long' })}
				</div>
				<div>{temperature}</div>
			</div>
		</div>
	);
};

export const Footer = styled(FooterContainer)`
	display: flex;
	justify-content: space-between;
	align-items: center;
	width: 1000px;
	height: 120px;
	padding: 20px 40px;
	font-weeight: bold;
	box-shadow: 0px 2px 17px #000;
	background-color: #fff;
`;
