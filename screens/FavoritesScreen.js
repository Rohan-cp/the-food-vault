import React from 'react';
import { View, StyleSheet, FlatList } from 'react-native';
import MealItem from '../components/MealItem';
import { MEALS } from '../data/dummy-data';


const FavoritesScreen = props => {
  const renderMealItem = (itemData) => {
    return (
    <MealItem 
      title={itemData.item.title} 
      onSelect={() => props.navigation.navigate(
        {routeName: 'MealDetail', 
        params: {
          mealId: itemData.item.id,
        }
      })}
      duration={itemData.item.duration}
      complexity={itemData.item.complexity}
      affordability={itemData.item.affordability}
      image={itemData.item.imageUrl}
    />);
  }
  
  const displayedMeals = MEALS.filter(
    meal => (meal.id === 'm1' || meal.id === 'm2')
  );

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

FavoritesScreen.navigationOptions = {
  headerTitle: 'Your Favorites'
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 12,
  }
});

export default FavoritesScreen;
