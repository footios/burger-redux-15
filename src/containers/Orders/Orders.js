import React, { Component } from 'react';

import Order from '../../components/Order/Order';
import Spinner from '../../components/UI/Spinner/Spinner';
import axios from '../../axios-orders';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import * as actions from '../../store/actions';
import { connect } from 'react-redux';

class Orders extends Component {
	state = {
		orders: [],
		loading: true
	};

	componentDidMount() {
		localStorage.setItem('visitingPath', '/orders') // addition from Q&A
		// From orders we fetch an object.
		this.props.onFetchOrders(this.props.token);
	}

	componentWillUnmount() {
		localStorage.removeItem('visitingPath') // addition from Q&A
	}

	render() {
		let orders = <Spinner />;
		if (!this.props.loading) {
			orders = this.props.orders.map((orders) => {
				// Do this: price={+order.price} so the toFixed(2) will work in Order.js
				const ingredients = {
					salad: orders.ingredients.salad,
					bacon: orders.ingredients.bacon,
					cheese: orders.ingredients.cheese,
					meat: orders.ingredients.meat
				};
				return <Order key={orders.id} ingredients={ingredients} price={orders.price} />;
			});
		}
		return orders;
	}
}

const mapStateToProps = (state) => {
	return {
		orders: state.order.orders,
		loading: state.order.loading,
		token: state.auth.token
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		onFetchOrders: (token) => dispatch(actions.fetchOrders(token))
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(Orders, axios));
