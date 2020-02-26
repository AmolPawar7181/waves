import React, {Component, useState} from 'react';
import FormField from '../utils/Form/formField';
import {update, generateData, isFormValid} from '../utils/Form/formActions';
import {withRouter} from 'react-router-dom';

import {connect} from 'react-redux';
import {useDispatch} from 'react-redux';
import {loginUser} from '../../actions/user_actions';

import { Redirect } from 'react-router-dom';

function Login() {
	const [toResetPass, settoResetPass] = useState(false);
	const [toDashboard, settoDashboard] = useState(false);
	const [formError, setformError] = useState(false);
	const [formSuccess, setformSuccess] = useState('');
	const [formdata, setFormdata] = useState({
		email: {
			element: 'input',
			value: '',
			config: {
				name: 'email_input',
				type: 'email',
				placeholder: 'Enter your email'
			},
			validation: {
				required: true,
				email: true
			},
			valid: false,
			touched: false,
			validationMessage: ''
		},
		password: {
			element: 'input',
			value: '',
			config: {
				name: 'password_input',
				type: 'password',
				placeholder: 'Enter your password'
			},
			validation: {
				required: true
			},
			valid: false,
			touched: false,
			validationMessage: ''
		}
	});

	const dispatch = useDispatch();

	const updateForm = element => {
		const newFormdata = update(element, formdata, 'login');
		setformError(false);
		setFormdata(newFormdata);
	};

	const submitForm = event => {
		event.preventDefault();
		let dataToSubmit = generateData(formdata, 'login');
		let formIsValid = isFormValid(formdata, 'login');

		if (formIsValid) {
			dispatch(loginUser(dataToSubmit)).then(response=>{
				if(response.payload.loginSuccess){
					console.log(response.payload);
					//history.push('/user/dashboard');
					settoDashboard(true);
				}else{
					setformError(true);
				}
				
			});
		} else {
			setformError(true);
		}
	};

	return (
		<div className='signin_wrapper'>
			<form
				onSubmit={event => {
					submitForm(event);
				}}
			>
				<FormField
					id={'email'}
					formdata={formdata.email}
					change={element => {
						updateForm(element);
					}}
				/>
				<FormField
					id={'password'}
					formdata={formdata.password}
					change={element => {
						updateForm(element);
					}}
				/>
				{formError ? (
					<div className='error_label'>Please check your data</div>
				) : null}
				<button
					onClick={event => {
						submitForm(event);
					}}
				>
					Log in
				</button>

				<button style={{marginLeft:'10px'}}
					onClick={() =>  settoResetPass(true)} >
					Forgot password
				</button>
			</form>
			{toDashboard ? <Redirect to="/user/dashboard" /> : <></>}
			{toResetPass ? <Redirect to="/reset_user" /> : <></>}
		</div>
	);
}

export default connect()(withRouter(Login));
