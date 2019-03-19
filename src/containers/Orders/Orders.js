import React, { Component } from 'react';

import Order from '../../components/Order/Order';
import Spinner from '../../components/UI/Spinner/Spinner'
import axios from '../../axios-orders';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import * as actions from '../../store/actions'
import { connect } from 'react-redux'

class Orders extends Component {
	state = {
		orders: [],
		loading: true
	};

	componentDidMount() {
		// From orders we fetch an object.
		this.props.onFetchOrders()
		
	}

	render() {
	let orders = <Spinner />;
	if (!this.props.loading) {
		orders = this.props.orders.map((orders) => (
			// Do this: price={+order.price} so the toFixed(2) will work in Order.js
			<Order key={orders.id} ingredients={orders.ingredients} price={orders.price} />
		))
	}
		return orders;
	}
}

const mapStateToProps = state => {
	return {
		orders: state.order.orders,
		loading: state.order.loading
	}
}

const mapDispatchToProps = dispatch => {
	return {
		onFetchOrders: () => dispatch(actions.fetchOrders())
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(Orders, axios));
