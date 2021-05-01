import React, { useState } from 'react';
import AppLoading from 'expo-app-loading';
import { useFonts } from 'expo-font';
import { createStore, combineReducers } from 'redux';
import { Provider } from 'react-redux';

import MealsNavigator from './navigator/MealsNavigator';
import mealsReducer from './Store/reducers/meals';

const rootReducer = combineReducers({
  meals: mealsReducer,
});

const store = createStore(rootReducer);

export default function App() {
  let [fontsLoaded] = useFonts({
    'open-sans': require('./assets/fonts/OpenSans-Regular.ttf'),
    'open-sans-bold': require('./assets/fonts/OpenSans-Bold.ttf'),
    'Inter-Black': require('./assets/fonts/Inter-Black.otf'),
  });
 
  if (!fontsLoaded) {
    return <AppLoading />;
  } else {
    return (
      <Provider store={store}>
        <MealsNavigator/>
      </Provider>
    );
  }
}
