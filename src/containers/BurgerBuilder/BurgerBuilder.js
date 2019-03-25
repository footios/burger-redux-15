import React, { Component } from "react";
import axios from "../../axios-orders";
import { connect } from 'react-redux';

import Eject from "../../hoc/Eject/Eject";
import Burger from "../../components/Burger/Burger";
import BuildControls from "../../components/Burger/BuildControls/BuildControls";
import Modal from "../../components/UI/Modal/Modal";
import OrderSummary from "../../components/Burger/OrderSummary/OrderSummary";
import Spinner from "../../components/UI/Spinner/Spinner";
import withErrorHandler from "../../hoc/withErrorHandler/withErrorHandler";
import * as actions from '../../store/actions/'


class BurgerBuilder extends Component {
  state = {
    purchasing: false,
    loading: false,
  };

  updatePurchaseState(ingredients) {
    const sum = Object.keys(ingredients)
      .map(ing => ingredients[ing])
      .reduce((acc, elem) => {
        return acc + elem;
      }, 0);
    return sum > 0;
  }

  componentDidMount = () => {
    console.log('BurgerBuilder', this.props);

    this.props.onInitBurger()
    // axios
    //   .get("/ingredients.json")
    //   .then(response => this.setState({ ingredients: response.data }))
    //   .catch(error => {
    //     this.setState({ error: true });
    //   });
  };

  purchaseHandler = () => {
    this.setState({ purchasing: true });
  };

  purchaseCanselHandler = () => {
    this.setState({ purchasing: false });
  };

  purchaseContinueHandler = () => {
    this.props.onInitPurchase()
    if (!this.props.isAuthenticated) {
      this.props.history.push('/auth')
    } else {
      this.props.history.push('/checkout')
    }
  };

  render() {
    const disabledInfo = {
      ...this.props.ings
    };
    // Here we assing to the value a boolean => true/false
    for (let key in disabledInfo) {
      disabledInfo[key] = disabledInfo[key] <= 0;
    }

    

    let burger = this.props.error ? (
      <p>Ingredients can't be loaded</p>
    ) : (
      <Spinner />
    );
    let orderSummary = null;

    if (this.props.ings) {
      burger = (
        <Eject>
          <Burger ingredients={this.props.ings} />
          <BuildControls
            ingredientAdded={this.props.onAddIngredient}
            ingredientRemoved={this.props.onRemoveIngredient}
            disabled={disabledInfo}
            price={this.props.price}
            purchasable={this.updatePurchaseState(this.props.ings)}
            ordered={this.purchaseHandler}
          />
        </Eject>
      );

      orderSummary = (
        <OrderSummary
          price={this.props.price.toFixed(2)}
          purchaseCanselled={this.purchaseCanselHandler}
          purchaseContinued={this.purchaseContinueHandler}
          ingredients={this.props.ings}
        />
      );
    }

    if (this.state.loading) {
      orderSummary = <Spinner />;
    }

    return (
      <Eject>
        <Modal
          show={this.state.purchasing}
          modalClosed={this.purchaseCanselHandler}
        >
          {orderSummary}
        </Modal>
          {burger}
      </Eject>
    );
  }
}

const mapStateToProps = state => {
 return {
    ings: state.burgerBuilder.ingredients,
   price: state.burgerBuilder.totalPrice,
   error: state.burgerBuilder.error,
   isAuthenticated: state.auth.token !== null
}
} 

const mapDispatchToProps = dispatch => {
  return {
    onAddIngredient: (ingName) => dispatch(actions.addIngredient(ingName)), 
    onRemoveIngredient: (ingName) => dispatch(actions.removeIngredient(ingName)),
    onInitBurger: () => dispatch(actions.initBurger()),
    onInitPurchase: () => dispatch(actions.purchaseInit())
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(BurgerBuilder, axios));
