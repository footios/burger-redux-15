import React, { Component } from 'react';

import axios from '../../../axios-orders';

import Button from '../../../components/UI/Button/Button';
import Spinner from '../../../components/UI/Spinner/Spinner';
import Input from '../../../components/UI/Input/Input';

import classes from './ContactData.module.css';

//child of Checkout
class ContactData extends Component {
	state = {
		orderForm: {
			name: {
				elementType: 'input',
				elementConfig: {
					type: 'text',
					placeholder: 'name'
				},
				value: '',
				validation: {
					required: true
				},
				touched: false,
				valid: false,
			},
			street: {
				elementType: 'input',
				elementConfig: {
					type: 'text',
					placeholder: 'street'
				},
				value: '',
				validation: {
					required: true
				},
				touched: false,
				valid: false,
			},
			zipCode: {
				elementType: 'input',
				elementConfig: {
					type: 'text',
					placeholder: 'zip code'
				},
				value: '',
				validation: {
					required: true,
					minLength: 5,
					maxLength: 5
				},
				touched: false,
				valid: false,
			},
			country: {
				elementType: 'input',
				elementConfig: {
					type: 'text',
					placeholder: 'country'
				},
				value: '',
				validation: {
					required: true
				},
				touched: false,
				valid: false,
			},
			email: {
				elementType: 'input',
				elementConfig: {
					type: 'email',
					placeholder: 'e-mail'
				},
				value: '',
				validation: {
					required: true
				},
				touched: false,
				valid: false,
			},
			deliveryMethod: {
                elementType: 'select',
                elementConfig: {
                    options: [
                        {value: 'fastest', displayValue: 'fastest'},
                        {value: 'cheapest', displayValue: 'cheapest'}
                    ]
                },
				value: 'fastest', // we fix this later
				valid: true, // needed for formIsValid...
				validation: {} // no need validation
            }
		},
		formIsValid: false,
		loading: false
	};

	orderHandler = (event) => {
		event.preventDefault();
		console.log('in orderHandler: ', this.props);
		const formData = {};
		for (const orderFormIdentifier in this.state.orderForm) {
			if (this.state.orderForm.hasOwnProperty(orderFormIdentifier)) {
				 formData[orderFormIdentifier] = this.state.orderForm[orderFormIdentifier].value;
			}
		}
		this.setState({ loading: true });
		const order = {
			ingredients: this.props.ingredients,
			price: this.props.price,
			orderData: formData
		};

		axios
			.post('/orders.json', order)
			.then((response) => this.setState({ loading: false }))
			.then((error) => this.setState({ loading: false }));

		this.props.history.push('/');
	};

	checkValidity(value, rules) {
		let isValid = true;
		
		// alternative option for validation select...
		// not needed!
		// if(!rules) {
		// 	return true;
		// }

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
	
	inputchangeHandler = (event, inputIdentifier) => {
		const updatedOrderForm = {
			...this.state.orderForm
		}
		const updatedFormElement = {
			...updatedOrderForm[inputIdentifier] 
		}
		updatedFormElement.value = event.target.value 
		const rules = updatedFormElement.validation
		updatedFormElement.valid = this.checkValidity(updatedFormElement.value, rules);
		updatedOrderForm[inputIdentifier] = updatedFormElement
		updatedFormElement.touched = true;
		
		let formIsValid = true;
		for (let inputIdentifier in updatedOrderForm) {
			if (updatedOrderForm.hasOwnProperty(inputIdentifier)) {
				 formIsValid = updatedOrderForm[inputIdentifier].valid && formIsValid;
			}
		}
		console.log(formIsValid);
		
		this.setState({orderForm: updatedOrderForm, formIsValid: formIsValid})
	}

	render() {
		const formElementsArray = [];
		for (const key in this.state.orderForm) {
			if (this.state.orderForm.hasOwnProperty(key)) {
				formElementsArray.push({
					id: key,
					config: this.state.orderForm[key]
				});
			}
		}
		let form = (
			<form onSubmit={this.orderHandler}>
				{formElementsArray.map((formElement) => (
					<Input
                        key={formElement.id}
						elementType={formElement.config.elementType}
						elementConfig={formElement.config.elementConfig}
						value={formElement.config.value}
						inValid={!formElement.config.valid}
						touched={formElement.config.touched}
						changed={(event) => this.inputchangeHandler(event, formElement.id)}
					/>
				))}
				<Button btnType="Success" disabled={!this.state.formIsValid}>
					ORDER
				</Button>
			</form>
		);
		if (this.state.loading) {
			form = <Spinner />;
		}
		return (
			<div className={classes.ContactData}>
				<h4>Enter your Contact Data</h4>
				{form}
			</div>
		);
	}
}

export default ContactData;
