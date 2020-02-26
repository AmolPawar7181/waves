import React, {useState} from 'react';
import FormField from '../utils/Form/formField';
import {update, generateData, isFormValid} from '../utils/Form/formActions';

import {connect} from 'react-redux';
import {useDispatch} from 'react-redux';
import {registerUser} from '../../actions/user_actions';
import { Redirect } from 'react-router-dom';

function Register() {
	const [toLogin, settoLogin] = useState(false);
	const [formError, setformError] = useState(false);
	const [formSuccess, setformSuccess] = useState(false);
	const [formdata, setFormdata] = useState({
		name: {
			element: 'input',
			value: '',
			config: {
				name: 'name_input',
				type: 'text',
				placeholder: 'Enter your name'
			},
			validation: {
				required: true
			},
			valid: false,
			touched: false,
			validationMessage: ''
		},
		lastname: {
			element: 'input',
			value: '',
			config: {
				name: 'lastname_input',
				type: 'text',
				placeholder: 'Enter your lastname'
			},
			validation: {
				required: true
			},
			valid: false,
			touched: false,
			validationMessage: ''
		},
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
		},
		confirmPassword: {
			element: 'input',
			value: '',
			config: {
				name: 'confirm_password_input',
				type: 'password',
				placeholder: 'Confirm your password'
			},
			validation: {
				required: true,
				confirm: 'password'
			},
			valid: false,
			touched: false,
			validationMessage: ''
		}
	});
    const dispatch = useDispatch();

	const updateForm = element => {
		const newFormdata = update(element, formdata, 'register');
		setformError(false);
		setFormdata(newFormdata);
	};

	const submitForm = event => {
		event.preventDefault();
		let dataToSubmit = generateData(formdata, 'register');
		let formIsValid = isFormValid(formdata, 'register');

		if (formIsValid) {
            dispatch(registerUser(dataToSubmit)).
            then(response =>{
                if(response.payload.success){   
                    setformError(false);
                    setformSuccess(true);
                    setTimeout(()=>{
						//history.push('/register_login')
						settoLogin(true);
                    },3000)
                }else{
                    setformError(true)
                }
            }).catch(e =>{
                setformError(true)
            })
		} else {
			setformError(true);
		}
	};

	return (
		<div className='page_wrapper'>
			<div className='container'>
				<div className='register_login_container'>
					<div className='left'>
						<form onSubmit={event => this.submitForm(event)}>
							<h2>Personal Information</h2>
							<div className='form_block_two'>
								<div className='block'>
									<FormField
										id={'name'}
										formdata={formdata.name}
										change={element => {
											updateForm(element);
										}}
									/>
								</div>
								<div className='block'>
									<FormField
										id={'lastname'}
										formdata={formdata.lastname}
										change={element => {
											updateForm(element);
										}}
									/>
								</div>
							</div>
							<div>
								<FormField
									id={'email'}
									formdata={formdata.email}
									change={element => {
										updateForm(element);
									}}
								/>
							</div>
							<h2>Verify Password</h2>
							<div className='form_block_two'>
								<div className='block'>
									<FormField
										id={'password'}
										formdata={formdata.password}
										change={element => {
											updateForm(element);
										}}
									/>
								</div>
								<div className='block'>
									<FormField
										id={'confirmPassword'}
										formdata={formdata.confirmPassword}
										change={element => {
											updateForm(element);
										}}
									/>
								</div>
							</div>
							{formError ? (
								<div className='error_label'>Please check your data</div>
							) : null}
							<button
								onClick={event => {
									submitForm(event);
								}}
							>
								Create an account
							</button>
						</form>
					</div>
				</div>
			</div>			
             {formSuccess? (<div open={formSuccess}>
                <div className="dialog_alert">
                    <div>Congratulations !! </div>
                    <div>
                        You will be redirected to the LOGIN in a couple seconds...
                    </div>
                </div>
            </div> ) : null}
			{/* This is to redirect to login page if user registration is successful */}
			{toLogin ? <Redirect to="/register_login" /> : <></>}
		</div>
	);
}

export default connect()(Register);
