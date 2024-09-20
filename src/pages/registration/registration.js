import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { server } from '../../bff/server';
import { Navigate } from 'react-router-dom';
import { AuthFormError, Button, H2, Input } from '../../components';
import { useResetForm } from '../../hooks';
import { setUser } from '../../actions';
import { selectUserRole } from '../../selectors';
import styled from 'styled-components';
import { ROLE } from '../../constants/role';

const regFormSchema = yup.object().shape({
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
	passcheck: yup
		.string()
		.required('Please, repeat the password')
		.oneOf([yup.ref('password'), null], 'Passcheck does not match!'),
});

const RegistrationContainer = ({ className }) => {
	const {
		register,
		reset,
		handleSubmit,
		formState: { errors },
	} = useForm({
		defaultValues: {
			login: '',
			password: '',
			passcheck: '',
		},
		resolver: yupResolver(regFormSchema),
	});

	const [serverError, setServerError] = useState(null);

	//
	const dispatch = useDispatch();

	const roleId = useSelector(selectUserRole);

	useResetForm(reset);

	const onSubmit = ({ login, password }) => {
		server
			.register(login, password)
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

	const formError =
		errors?.login?.message || errors?.password?.message || errors?.passcheck?.message;
	const errorMessage = formError || serverError;

	if (roleId !== ROLE.GUEST) {
		return <Navigate to="/" />;
	}

	return (
		<div className={className}>
			<H2>Registration</H2>
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
				<Input
					type="password"
					placeholder="password check..."
					{...register('passcheck', { onChange: () => setServerError(null) })}
				/>
				<Button type="submit" disabled={!!formError || !!serverError}>
					Register
				</Button>
				{errorMessage && <AuthFormError>{errorMessage}</AuthFormError>}
			</form>
		</div>
	);
};

export const Registration = styled(RegistrationContainer)`
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
