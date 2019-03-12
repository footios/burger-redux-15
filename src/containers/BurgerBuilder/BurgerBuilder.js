import React, { Component } from "react";
import Eject from "../../hoc/Eject/Eject";
import Burger from "../../components/Burger/Burger";
import BuildControls from "../../components/Burger/BuildControls/BuildControls";
import Modal from "../../components/UI/Modal/Modal";
import OrderSummary from "../../components/Burger/OrderSummary/OrderSummary";
import Spinner from "../../components/UI/Spinner/Spinner";
import withErrorHandler from "../../hoc/withErrorHandler/withErrorHandler";
import axios from "../../axios-orders";

const INGREDIENT_PRICES = {
  salad: 0.5,
  cheese: 0.4,
  meat: 1.3,
  bacon: 0.7
};

class BurgerBuilder extends Component {
  state = {
    //object of ingredients
    ingredients: null,
    totalPrice: 4,
    purchasable: false,
    purchasing: false,
    loading: false,
    error: false
  };

  componentDidMount = () => {
    console.log('BurgerBuilder', this.props);
    
    axios
      .get("/ingredients.json")
      .then(response => this.setState({ ingredients: response.data }))
      .catch(error => {
        this.setState({ error: true });
      });
  };

  updatePurchaseState(ingredients) {
    // const sum = Object.values(ingredients).reduce((acc, elem) => {
    //   return acc + elem;
    // }, 0);

    const sum = Object.keys(ingredients)
      .map(ing => ingredients[ing])
      .reduce((acc, elem) => {
        return acc + elem;
      }, 0);

    // this.setState({ purchasable: sum === 0 ? false : true });
    this.setState({ purchasable: sum > 0 });
  }

  addIngredientHandler = type => {
    const oldCount = this.state.ingredients[type];
    const updatedCount = oldCount + 1;
    const updatedIngredients = {
      ...this.state.ingredients
    };
    updatedIngredients[type] = updatedCount;
    const priceAddition = INGREDIENT_PRICES[type];
    const oldPrice = this.state.totalPrice;
    const newPrice = oldPrice + priceAddition;
    this.setState({ totalPrice: newPrice, ingredients: updatedIngredients });
    this.updatePurchaseState(updatedIngredients);
  };

  removeIngredientHandler = type => {
    const oldCount = this.state.ingredients[type];
    if (oldCount <= 0) return;

    const updatedCount = oldCount - 1;
    const updatedIngredients = {
      ...this.state.ingredients
    };
    updatedIngredients[type] = updatedCount;
    const priceDiduction = INGREDIENT_PRICES[type];
    const oldPrice = this.state.totalPrice;
    const newPrice = oldPrice - priceDiduction;
    this.setState({ totalPrice: newPrice, ingredients: updatedIngredients });
    this.updatePurchaseState(updatedIngredients);
  };

  purchaseHandler = () => {
    this.setState({ purchasing: true });
  };

  purchaseCanselHandler = () => {
    this.setState({ purchasing: false });
  };

  purchaseContinueHandler = () => {
    // alert("You continue!");
    
    
    const queryParams = []
    // get the ingredients and store them in an array
    for (const i in this.state.ingredients) {
      if (this.state.ingredients.hasOwnProperty(i)) {
        queryParams.push(encodeURIComponent(i) + '=' + encodeURIComponent(this.state.ingredients[i]))
      }
    }
    // We need the price for the Checkout. So we push it here:
    queryParams.push('price=' + this.state.totalPrice)
    // save the ingredients as a string and pass assing it to the search query
    const queryString = queryParams.join('&')
    this.props.history.push({
      pathname: '/checkout',
      search: '?' + queryString 
    })
    console.log('BuirgerBuilder in purchase...' + this.props);
  };

  render() {
    const disabledInfo = {
      ...this.state.ingredients
    };
    // Here we assing to the value a boolean => true/false
    for (let key in disabledInfo) {
      disabledInfo[key] = disabledInfo[key] <= 0;
    }

    let burger = this.state.error ? (
      <p>Ingredients can't be loaded</p>
    ) : (
      <Spinner />
    );
    let orderSummary = null;

    if (this.state.ingredients) {
      burger = (
        <Eject>
          <Burger ingredients={this.state.ingredients} />
          <BuildControls
            ingredientAdded={this.addIngredientHandler}
            ingredientRemoved={this.removeIngredientHandler}
            disabled={disabledInfo}
            price={this.state.totalPrice}
            purchasable={this.state.purchasable}
            ordered={this.purchaseHandler}
          />
        </Eject>
      );

      orderSummary = (
        <OrderSummary
          price={this.state.totalPrice.toFixed(2)}
          purchaseCanselled={this.purchaseCanselHandler}
          purchaseContinued={this.purchaseContinueHandler}
          ingredients={this.state.ingredients}
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

export default withErrorHandler(BurgerBuilder, axios);
