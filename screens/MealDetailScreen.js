import React from 'react';
import { View, Text, Image, StyleSheet, ScrollView } from 'react-native';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import { useSelector } from 'react-redux';

import HeaderButton from '../components/HeaderButton';
import { MEALS } from '../data/dummy-data';

const MealDetailScreen = props => {
  const mealId = props.navigation.getParam('mealId');
  const availableMeals = useSelector(state => state.meals.meals)
  const selectedMeal = availableMeals.find(meal => meal.id === mealId);

  return (
    <ScrollView>
      <Image source={{uri: selectedMeal.imageUrl}} style={styles.image}/>
      <View style={styles.details}>
            <Text>{selectedMeal.duration}m</Text>
            <Text>{selectedMeal.complexity}</Text>
            <Text>{selectedMeal.affordability}</Text>
      </View>
      <Text style={styles.title}>Ingredients:</Text>
      <View style={styles.display}>
        {selectedMeal.ingredients.map(ingredient => {
          return (<Text key={ingredient} style ={styles.item}>{ingredient}</Text>);
        })}
      </View>
      <Text style={styles.title}>Steps:</Text>
      <View style={styles.display}>
        {selectedMeal.steps.map(step => {
          return (<Text key={step} style ={styles.item}>{step}</Text>);
        })}
      </View>
    </ScrollView>
  );
};

MealDetailScreen.navigationOptions = navigationData => {
  const mealTitle = navigationData.navigation.getParam('mealTitle');
  return {
    headerTitle: mealTitle,
    headerRight:
      <HeaderButtons HeaderButtonComponent={HeaderButton}>
        <Item
          title="Favorite"
          iconName="ios-star-outline"
          size={23}
          onPress={() => {
            console.log('Mark as favorite!');
          }}
        />
      </HeaderButtons>
  };
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: 'violet',
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 10
  },
  image: {
    width: '100%',
    height: 200,
  },
  details: {
    flexDirection: 'row',
    padding: 15,
    justifyContent: 'space-around',
  },
  item: {
    fontSize: 15,
    marginVertical: 10,
    marginHorizontal: 20,
    borderColor: '#ccc',
    borderWidth: 1,
    padding: 10,
  },
  display: {
    paddingHorizontal: '2%',
  }
});

export default MealDetailScreen;
