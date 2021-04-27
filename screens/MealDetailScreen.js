import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { MEALS } from '../data/dummy-data';
import Colors from '../constants/Colors';

const MealDetailScreen = props => {
  const mealId = props.navigation.getParam('mealId');

  const displayMeal = MEALS.find(meal => meal.id === mealId);
  return (
    <View style={styles.screen}>
      <Text>{displayMeal.title}</Text>
      <Text>{displayMeal.steps}</Text>
      <Text>{displayMeal.complexity}</Text>
      <Text>{displayMeal.affordability}</Text>
    </View>
  );
};

MealDetailScreen.navigationOptions = (navigationData) => {
  const mealId = navigationData.navigation.getParam('mealId');
  const displayMeal = MEALS.find(meal => meal.id === mealId);

  return ({
    headerTitle: displayMeal.title,
    headerStyle: {
      backgroundColor: Colors.primaryColor,
    },
    headerTintColor: 'white',
  });
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: 'violet'
  }
});

export default MealDetailScreen;
