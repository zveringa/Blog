import { useEffect, useState } from 'react';
import { useDispatch, useSelector, useStore } from 'react-redux';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { server } from '../../bff/server';
import { Link, Navigate } from 'react-router-dom';
import { Button, H2, Input } from '../../components';
import { setUser } from '../../actions';
import { selectUserRole } from '../../selectors';
import styled from 'styled-components';
import { ROLE } from '../../constants/role';

const authFormSchema = yup.object().shape({
	login: yup
		.string()
		.required('Please login')
		.matches(/^\w+$/, 'Wrong symbol! - only letters and numbers allowed.')
		.min(3, 'Wrong login! Minimal length is 3 digits.')
		.max(15, 'Wrong login! Max. length is 15 digits.'),
	password: yup
		.string()
		.required('Enter the password')
		.matches(
			/^[\w#%]+$/,
			'Wrong symbol! - only allowed letters, numbers, symbols # %',
		)
		.min(6, 'Wrong login! Minimal length is 6 digits.')
		.max(30, 'Wrong login! Max. length is 30 digits.'),
});

const StyledLink = styled(Link)`
	text-align: center;
	text-decoration: underline;
	margin: 20px 0;
	font-size: 18px;
`;

const ErrorMessage = styled.div`
	font-size: 18px;
	margin: 10px 0 0;
	padding: 10px;
	background-color: #fcadad;
`;

const AuthorisationContainer = ({ className }) => {
	const {
		register,
		reset,
		handleSubmit,
		formState: { errors },
	} = useForm({
		defaultValues: {
			login: '',
			password: '',
		},
		resolver: yupResolver(authFormSchema),
	});

	const [serverError, setServerError] = useState(null);

	//
	const dispatch = useDispatch();
	const store = useStore();

	const roleId = useSelector(selectUserRole);

	useEffect(() => {
		let currentWasLogout = store.getState().app.wasLogout;
		return store.subscribe(() => {
			let previousWasLogout = currentWasLogout;
			currentWasLogout = store.getState().app.wasLogout;

			if (currentWasLogout !== previousWasLogout) {
				reset();
			}
		});
	}, [reset, store]);

	const onSubmit = ({ login, password }) => {
		server
			.authorise(login, password)
			.then(({ res, error }) => {
				console.log('Response:', res, error); //DEBUG

				// Check for errors in the response
				if (error) {
					setServerError(error);
					return;
				}
				// Handle successful login
				dispatch(setUser(res));
				// NEAISKU KUR SITA PADETI, BANDAU CIA...
			})

			.catch((error) => {
				// Handle network or unexpected errors
				setServerError(`Request error: ${error.message || error}`);
			});
	};

	const formError = errors?.login?.message || errors?.password?.message;
	const errorMessage = formError || serverError;

	if (roleId !== ROLE.GUEST) {
		return <Navigate to="/" />;
	}

	return (
		<div className={className}>
			<H2>Authorisation</H2>
			<form onSubmit={handleSubmit(onSubmit)}>
				<Input
					type="text"
					placeholder="Login..."
					{...register('login', { onChange: () => setServerError(null) })}
				/>
				<Input
					type="password"
					placeholder="password..."
					{...register('password', { onChange: () => setServerError(null) })}
				/>
				<Button type="submit" disabled={!!formError || !!serverError}>
					Authorise
				</Button>
				{errorMessage && <ErrorMessage>{errorMessage}</ErrorMessage>}
				<StyledLink to="/register">Register</StyledLink>
			</form>
		</div>
	);
};

export const Authorisation = styled(AuthorisationContainer)`
	margin: 0 auto;
	display: flex;
	flex-direction: column;
	align-items: center;

	& > form {
		display: flex;
		flex-direction: column;
		width: 260px;
	}
`;