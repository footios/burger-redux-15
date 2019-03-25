import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom'

import Input from '../../components/UI/Input/Input';
import Button from '../../components/UI/Button/Button';
import Spinner from '../../components/UI/Spinner/Spinner';

import classes from './Auth.module.css';

import * as actions from '../../store/actions';

class Auth extends Component {
	state = {
		controls: {
			email: {
				elementType: 'input',
				elementConfig: {
					type: 'email',
					placeholder: 'e-mail'
				},
				value: '',
				validation: {
					required: true,
					isEmail: true
				},
				touched: false,
				valid: false
			},
			password: {
				elementType: 'input',
				elementConfig: {
					type: 'password',
					placeholder: 'password'
				},
				value: '',
				validation: {
					required: true,
					minLength: 6
				},
				touched: false,
				valid: false
			}
		},
		isSignup: true
	};

	checkValidity(value, rules) {
		let isValid = true;

		if (rules.required) {
			isValid = value.trim() !== '' && isValid;
		}

		if (rules.minLength) {
			isValid = value.length >= rules.minLength && isValid;
		}

		if (rules.maxLength) {
			isValid = value.length <= rules.maxLength && isValid;
		}

		return isValid;
	}

	inputChangeHandler = (event, controlName) => {
		const updatedControls = {
			...this.state.controls,
			[controlName]: {
				...this.state.controls[controlName],
				value: event.target.value,
				valid: this.checkValidity(event.target.value, this.state.controls[controlName].validation),
				touched: true
			}
		};

		this.setState({ controls: updatedControls });
	};

	submitHandler = (event) => {
		event.preventDefault();
		const email = this.state.controls.email.value;
		const password = this.state.controls.password.value;
		const isSignup = this.state.isSignup;
		this.props.onAuth(email, password, isSignup);
	};

	switchAuthModeHandler = () => {
		this.setState((prevState) => {
			return {
				isSignup: !prevState.isSignup
			};
		});
	};
	render() {
		const controlsArray = [];
		for (const key in this.state.controls) {
			if (this.state.controls.hasOwnProperty(key)) {
				controlsArray.push({
					id: key,
					config: this.state.controls[key]
				});
			}
		}
		let form = controlsArray.map((control) => (
			<Input
				key={control.id}
				elementType={control.config.elementType}
				elementConfig={control.config.elementConfig}
				value={control.config.value}
				inValid={!control.config.valid}
				touched={control.config.touched}
				changed={(event) => this.inputChangeHandler(event, control.id)}
			/>
		));
		if (this.props.loading) {
			form = <Spinner />;
		}
		let errorMessage = null;
		if (this.props.error) {
			console.log(this.props.error.message);
			errorMessage = this.props.error.message;
		}
		switch (errorMessage) {
			case 'EMAIL_EXISTS':
				errorMessage = 'This e-mail address allready exists. Please switch to sign in.';
				break;
			case 'OPERATION_NOT_ALLOWED':
				errorMessage = 'Please do not insert a password';
				break;
			case 'TOO_MANY_ATTEMPTS_TRY_LATER':
				errorMessage =
					'You have tried to many times to log in without success.' +
					'For security reasons we have blocked all requests for now. Please try again later';
				break;
			case 'INVALID_EMAIL':
				errorMessage = 'Please insert a valid e-mail address.';
				break;
			case 'INVALID_PASSWORD':
				errorMessage = 'The password was not correct. Please try again.';
				break;
			case 'USER_DISABLED':
				errorMessage = 'This user is disabled. Please contact the administratorÍ';
				break;
			default:
				errorMessage = 'Something went wrong!';
		}

		let authRedirect = null;
		if (this.props.isAuthenticated) {
			if (this.props.ings) {
				authRedirect = <Redirect to='/checkout' />
			} else {
				authRedirect = <Redirect to='/' />
			}
		}
		return (
			<div className={classes.Auth}>
			{authRedirect}
				<div>
					<span style={{ color: '#944317' }}>
						{this.props.ings ? (
							'Your order is almost ready! So please sign in/up to continue.'
						) : (
							null
						)}
					</span>
				</div>
				<Button btnType="Danger" clicked={this.switchAuthModeHandler}>
					SWITCH TO {this.state.isSignup ? 'SIGN IN' : 'SIGN UP'}
				</Button>
				<div>
					{this.props.error ? (
						<div style={{ color: 'red' }}>{errorMessage}</div>
					) : (
						<label>{this.state.isSignup ? 'Please sign up!' : 'Please sign in!'}</label>
					)}
				</div>
				<form onSubmit={this.submitHandler}>
					{form}
					<Button btnType="Success">{this.state.isSignup ? 'SUBMIT' : 'SIGN IN'}</Button>
				</form>
			</div>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		ings: state.burgerBuilder.ingredients !== null,
		loading: state.auth.loading,
		error: state.auth.error,
		isAuthenticated: state.auth.token !== null
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		onAuth: (email, password, isSignup) => dispatch(actions.auth(email, password, isSignup))
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(Auth);
