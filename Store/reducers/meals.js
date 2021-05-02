import { MEALS } from '../../data/dummy-data.js';
import { SET_FILTERS, TOGGLE_FAVORITE } from '../actions/meals.js';

const initialState = {
  meals: MEALS,
  filteredMeals: MEALS,
  favoriteMeals: [],
};

const mealsReducer = (state = initialState, action) => {
  switch (action.type) {
    case TOGGLE_FAVORITE:
      const existingIndex = state.favoriteMeals.findIndex(meal => meal.id === action.mealId);
      if (existingIndex >= 0) {
        const updatedFavMeals = [...state.favoriteMeals];
        updatedFavMeals.splice(existingIndex, 1);
        return { ...state, favoriteMeals: updatedFavMeals };
      } else {
        const meal = state.meals.find(meal => meal.id === action.mealId);
        return { ...state, favoriteMeals: state.favoriteMeals.concat(meal) };
      }
    case SET_FILTERS:
      const appliedFilters = action.filters;
      const filteredMeals = state.meals.filter(meal => {
        if (appliedFilters.glutenFree && !meal.isGlutenFree) {
          return false;
        } else if (appliedFilters.lactoseFree && !meal.isLactoseFree) {
          return false;
        } else if (appliedFilters.vegan && !meal.isVegan) {
          return false;
        } else if (appliedFilters.vegatarian && !meal.isVegetarian) {
          return false;
        }
        return true;
      });
      return {...state, filteredMeals: filteredMeals};
    default:
      return state;
  }
};

export default mealsReducer;