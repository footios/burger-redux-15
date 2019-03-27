import React, { Component } from 'react';
import { Route, Switch, withRouter, Redirect } from 'react-router-dom';

import Layout from './hoc/Layout/Layout';
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder';
import Checkout from './containers/Checkout/Checkout';
import Orders from './containers/Orders/Orders';
import Auth from './containers/Auth/Auth';
import Logout from './containers/Logout/Logout';
import { connect } from 'react-redux';
import * as actions from './store/actions';
import Spinner from './components/UI/Spinner/Spinner'

class App extends Component {
	componentDidMount() {
		this.props.onTryAutoSignup();
	}

	render() {
		let routes = (
			<Switch>
				<Route path="/auth" exact component={Auth} />
				<Route path="/" exact component={BurgerBuilder} />
        {/* <Redirect to='/'/>  this is now reduntant because of  isAuthInitialized */}
			</Switch>
		);
		if (this.props.isAuthenticated) {
			routes = (
				<Switch>
					{/* With just 'exact' the order doesn't matter, but with Switch it does! */}
					{/* The 'exact' in the Route with path='/checkout' was preventing the ContactData to render */}
					<Route path="/checkout" component={Checkout} />
					<Route path="/orders" exact component={Orders} />
          <Route path="/auth" exact component={Auth} />
					<Route path="/logout" exact component={Logout} />
					<Route path="/" exact component={BurgerBuilder} />
				</Switch>
			);
		}
		return (
			<div>
				<Layout>{this.props.isAuthInitialized ? routes : <Spinner /> }</Layout>
			</div>
		);
	}
}

const mapStateToProps = (state) => {
	return {
    isAuthenticated: state.auth.token !== null,
    isAuthInitialized: state.auth.authInitialized
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		onTryAutoSignup: () => dispatch(actions.authCheckState())
	};
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
