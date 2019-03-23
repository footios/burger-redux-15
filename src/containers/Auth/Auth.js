import React, { Component } from 'react';
import { connect } from 'react-redux'

import Input from '../../components/UI/Input/Input'
import Button from '../../components/UI/Button/Button'

import classes from './Auth.module.css';

import * as actions from '../../store/actions'

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
                    minLength: 1,
				},
				touched: false,
				valid: false
			}
		}
    };
    
    checkValidity(value, rules) {
		let isValid = true;
	
		if (rules.required) {
			isValid = value.trim() !== '' && isValid;
		}
		
		if (rules.minLength) {
			isValid = value.length >= rules.minLength && isValid
		}

		if (rules.maxLength) {
			isValid = value.length <= rules.maxLength && isValid
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
			}
		
		this.setState({controls: updatedControls})
	}

	submitHandler = (event) => {
		event.preventDefault();
		const email = this.state.controls.email.value;
		const password = this.state.controls.password.value;
		this.props.onAuth(email, password)
	}
    
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
		let form = (
			<form onSubmit={this.submitHandler} >
				{controlsArray.map((control) => (
					<Input
            key={control.id}
						elementType={control.config.elementType}
						elementConfig={control.config.elementConfig}
						value={control.config.value}
						inValid={!control.config.valid}
						touched={control.config.touched}
						changed={(event) => this.inputChangeHandler(event, control.id)}
					/>
				))}
				<Button btnType="Success">SUBMIT</Button>
			</form>
		);
		// if (this.props.loading) {
		// 	form = <Spinner />;
		// }
		return <div className={classes.Auth}>{form}</div>;
	}
}

const mapStateToProps = state => {
	return {
		loading: state.auth.loading
	}
}

const mapDispatchToProps = dispatch => {
	return {
		onAuth: (email, password) => dispatch(actions.auth(email, password))
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(Auth);
