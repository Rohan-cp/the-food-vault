import React from 'react';
import { View, StyleSheet, FlatList } from 'react-native';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';

import HeaderButton from '../components/HeaderButton';
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
    meal => (meal.id === 'm9' || meal.id === 'm10')
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

FavoritesScreen.navigationOptions = (navData) => {
  return({
    headerTitle: 'Your Favorites',
    headerLeft: 
      <HeaderButtons HeaderButtonComponent={HeaderButton}>
        <Item title="Menu" iconName='ios-menu' size={26} onPress={() => {
          navData.navigation.toggleDrawer();
        }}/>
      </HeaderButtons>
  });
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
