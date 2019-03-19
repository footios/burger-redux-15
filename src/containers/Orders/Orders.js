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
		const orders = this.props.orders.map((orders) => (
					// Do this: price={+order.price} so the toFixed(2) will work in Order.js
					<Order key={orders.id} ingredients={orders.ingredients} price={orders.price} 
					deleteOrder={() => this.props.onDeleteOrder(orders.id)}/>
				))
		return (
			<div>
			{this.props.loading ? <Spinner /> : orders }
			</div>
		);
	}
}

const mapStateToProps = state => {
	return {
		orders: state.fetchOrders.orders,
		loading: state.fetchOrders.loading
	}
}

const mapDispatchToProps = dispatch => {
	return {
		onGetOrders: () => dispatch(actions.getOrders()),
		onDeleteOrder: (id) => dispatch(actions.deleteOrder(id))
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(Orders, axios));
