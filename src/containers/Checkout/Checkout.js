import React, { Component } from 'react';
import { Route } from 'react-router-dom';

import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary'
import ContactData from './ContactData/ContactData'


class Checkout extends Component {

    state = { 
        // dummy data
        // we will pass the real from BurgerBuilder with Routing...
        ingredients: null,
        totalPrice: 0
     }

     // After passing the ingredients to the search query in BurgerBuilder
     // now we need to parse them in the Checkout
    // 251. We need to change the life cycle hook to ...WillMount because we
    // get an error. We need to parse the ingredients before it mounts,
    // because otherwise the component will try to render with null ingredients...
    componentWillMount() {
        console.log('Checkout cwm: ', this.props);
        
        const query = new URLSearchParams(this.props.location.search)
        const ingredients = {}
        let price = 0
        for (const param of query.entries()) {
            // ['salad', '1']
            // This is a workaround to get the price, i.e. temporary...
            if (param[0] === 'price') {
                price = param[1]
            } else {
                ingredients[param[0]] = +param[1]
            }
        }
        // Because we save the ingredients to state. They will not change if we change the address
        // (if the query params get lost)
        // by going to 'chekout/contact-data'
        console.log('Checkout cwm: ', ingredients, ' ', price);
        
        this.setState({ingredients: ingredients, totalPrice: price})
    }

    checkoutCancelledHandler = () => {
        this.props.history.goBack();
    }

    checkoutContinuedHandler = () => {
        this.props.history.replace( '/checkout/contact-data' );
        
    }

    render() { 
        return ( 
            <div>
            <CheckoutSummary
                ingredients={this.state.ingredients}
                checkoutCancelled={this.checkoutCancelledHandler}
                checkoutContinued={this.checkoutContinuedHandler} />
            <Route 
                path={this.props.match.path + '/contact-data'} 
                render={(props) => 
                <ContactData 
                ingredients={this.state.ingredients} 
                price={this.state.totalPrice}
                {...props}/>} />
                
        </div>
         );
    }
}
 
export default Checkout;