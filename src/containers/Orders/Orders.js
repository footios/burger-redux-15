import React, { Component } from 'react';

import Order from '../../components/Order/Order';
import Spinner from '../../components/UI/Spinner/Spinner'
import axios from '../../axios-orders';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';

import { connect } from 'react-redux'
import * as actions from '../../store/actions'

class Orders extends Component {

	componentDidMount() {
		this.props.onGetOrders()
	}

	render() {
		// I obviously want to output multiple orders,
		// actually as many orders as needed and the orders I need to output
		// of course should be fetched from the backend.
		return (
			<div>
				{this.props.orders.map((orders) => (
					// Do this: price={+order.price} so the toFixed(2) will work in Order.js
					<Order key={orders.id} ingredients={orders.ingredients} price={orders.price} />
				))}
			</div>
		);
	}
}

const mapStateToProps = state => {
	return {
		orders: state.fetchOrders.orders
	}
}

const mapDispatchToProps = dispatch => {
	return {
		onGetOrders: () => dispatch(actions.getOrders())
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(Orders, axios));
