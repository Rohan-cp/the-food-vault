import React from 'react';
import { useSelector } from 'react-redux';
import { View, StyleSheet, FlatList } from 'react-native';
import MealItem from '../components/MealItem';
import Colors from '../constants/Colors';

import { CATEGORIES } from '../data/dummy-data';

const CategoryMealsScreen = props => {
  const catId = props.navigation.getParam('categoryId');
  const favoriteMeals = useSelector(state => state.meals.favoriteMeals);
  const availableMeals = useSelector(state => state.meals.filteredMeals);

  const displayedMeals = availableMeals.filter(
    meal => meal.categoryIds.indexOf(catId) >= 0
  );

  const renderMealItem = (itemData) => {
    const isFavorite = favoriteMeals.some(meal => meal.id === itemData.item.id);
    return (
    <MealItem 
      title={itemData.item.title} 
      onSelect={() => props.navigation.navigate(
        {routeName: 'MealDetail', 
        params: {
          mealId: itemData.item.id,
          mealTitle: itemData.item.title,
          isFav: isFavorite,
        }
      })}
      duration={itemData.item.duration}
      complexity={itemData.item.complexity}
      affordability={itemData.item.affordability}
      image={itemData.item.imageUrl}
    />);
  }

  return (
    <View style={styles.screen}>
      <FlatList 
        data={displayedMeals} 
        keyExtractor={(item, index) => item.id}
        renderItem={renderMealItem}
        style={{width: '100%'}}
      />
    </View>
  );
};

CategoryMealsScreen.navigationOptions = (navigationData) => {
  const catId = navigationData.navigation.getParam('categoryId');

  const selectedCategory = CATEGORIES.find(cat => cat.id === catId);

  return ({
    headerTitle: selectedCategory.title,
    headerStyle: {
      backgroundColor: Colors.primaryColor,
    },
    headerTintColor: 'white',
  });
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    padding: 12,
  }
});

export default CategoryMealsScreen;
