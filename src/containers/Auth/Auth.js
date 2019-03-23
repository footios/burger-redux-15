import React, { Component } from 'react';
import Input from '../../components/UI/Input/Input'
import Button from '../../components/UI/Button/Button'
import classes from './Auth.module.css';

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

    inputChangeHandler = (event, inputIdentifier) => {
		const updatedControl = {
			...this.state.controls
		}
		const updatedControlElement = {
			...updatedControl[inputIdentifier] 
		}
		updatedControlElement.value = event.target.value 
		const rules = updatedControlElement.validation
		updatedControlElement.valid = this.checkValidity(updatedControlElement.value, rules);
		updatedControl[inputIdentifier] = updatedControlElement
		updatedControlElement.touched = true;
		
		
		this.setState({controls: updatedControl})
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
			<form>
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
				<Button btnType="Success" onClick={this.orderHandler}>
					ORDER
				</Button>
			</form>
		);
		// if (this.props.loading) {
		// 	form = <Spinner />;
		// }
		return <div className={classes.Auth}>{form}</div>;
	}
}

export default Auth;
