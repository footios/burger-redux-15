import * as actionTypes from '../actions/actionTypes';

const initialState = {
	ingredients: null,
	totalPrice: 4,
	error: false,
	loading: false
};

const INGREDIENT_PRICES = {
    salad: 0.5,
    cheese: 0.4,
    meat: 1.3,
    bacon: 0.7
  };

export const burgerBuilderReducer = (state = initialState, action) => {
	switch (action.type) {
		case actionTypes.ADD_INGREDIENT:
			return {
				...state,
				ingredients: {
					...state.ingredients,
					[action.ingredientName]: state.ingredients[action.ingredientName] + 1
                }, 
                totalPrice: state.totalPrice + INGREDIENT_PRICES[action.ingredientName]
			};
		case actionTypes.REMOVE_INGREDIENT:
			return {
				...state,
				ingredients: {
					...state.ingredients,
					[action.ingredientName]: state.ingredients[action.ingredientName] - 1
                },
                totalPrice: state.totalPrice - INGREDIENT_PRICES[action.ingredientName]
			};
		case actionTypes.INIT_BURGER:
			return {
					...state,
					ingredients: action.ingredients,
					error: false,
					loading: false
			}
		case actionTypes.START_BURGER:
			return {
					...state,
					ingredients: {
						salad: action.ingredients.salad,
						bacon: action.ingredients.bacon,
						cheese: action.ingredients.cheese,
						meat: action.ingredients.meat
					},
					totalPrice: 4,
					error: false,
					loading: false
			}
		case actionTypes.BURGER_FAILED:
			return {
					...state,
					error: true,
					loading: false
			}
		case actionTypes.LOADING:
			return {
					...state,
					loading: true
			}
		default:
			return state;
	}
};

