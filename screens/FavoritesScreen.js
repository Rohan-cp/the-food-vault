import React from 'react';
import { View, StyleSheet, FlatList, Text } from 'react-native';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import { useSelector } from 'react-redux';

import HeaderButton from '../components/HeaderButton';
import MealItem from '../components/MealItem';

const FavoritesScreen = props => {

  const FavMeals = useSelector(state => state.meals.favoriteMeals);

  if (FavMeals.length === 0 || !FavMeals) {
    return (
      <View style={styles.emptyScren}>
        <Text style={{fontSize: 18, textAlign: 'center'}}>Head to the meals page to find and favorite meals!</Text>
      </View>
    );
  }

  const renderMealItem = (itemData) => {
    return (
    <MealItem 
      title={itemData.item.title} 
      onSelect={() => props.navigation.navigate(
        {routeName: 'MealDetail', 
        params: {
          mealId: itemData.item.id,
          mealTitle: itemData.item.title,
          isFav: true,
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
        data={FavMeals} 
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
  },
  emptyScren: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: '14%',
  }
});

export default FavoritesScreen;
