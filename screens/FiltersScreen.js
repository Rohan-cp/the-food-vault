import React, { useEffect, useState, useCallback } from 'react';
import { View, Text, StyleSheet, Switch } from 'react-native';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import { useDispatch } from 'react-redux';

import HeaderButton from '../components/HeaderButton';
import Colors from '../constants/Colors';
import { setFilters } from '../Store/actions/meals';

const FilterSwitch = props => {
  return (
    <View style={styles.filterContainer}>
      <Text style={styles.filterText}>{props.title}</Text>
      <Switch 
        value={props.state} 
        onValueChange={(newValue) => props.setState(newValue)}
        trackColor={{true: Colors.accentColor}}
      />
    </View>
  );
}

const FiltersScreen = props => {
  const { navigation } = props;

  const [isGlutenFree, setIsGlutenFree] = useState(false);
  const [isLactoseFree, setIsLactoseFree] = useState(false);
  const [isVegan, setIsVegan] = useState(false);
  const [isVegetarian, setIsVegetarian] = useState(false);

  const dispatch = useDispatch();

  const saveFilters = useCallback(() => {
    const appliedFilters = {
      glutenFree: isGlutenFree,
      lactoseFree: isLactoseFree,
      vegan: isVegan,
      vegetarian: isVegetarian,
    };

    dispatch(setFilters(appliedFilters));
  }, [isGlutenFree, isLactoseFree, isVegan, isVegetarian, dispatch]);

  useEffect(() => {
    navigation.setParams({save: saveFilters});
  }, [saveFilters]);

  return (
    <View style={styles.screen}>
      <Text style={styles.title}>Available Filters</Text>
      <FilterSwitch 
        title='Gluten-free'
        state={isGlutenFree}
        setState={setIsGlutenFree}
      />
      <FilterSwitch 
        title='Lactose-free'
        state={isLactoseFree}
        setState={setIsLactoseFree}
      />
      <FilterSwitch 
        title='Vegan'
        state={isVegan}
        setState={setIsVegan}
      />
      <FilterSwitch 
        title='Vegetarian'
        state={isVegetarian}
        setState={setIsVegetarian}
      />
    </View>
  );
};

FiltersScreen.navigationOptions = (navData) => {
  return({
    headerTitle: 'Filter Meals!',
    headerStyle: {
      backgroundColor: Platform.OS === 'ios' ? Colors.primaryColor : 'white'
    },
    headerTintColor: Platform.OS === 'ios' ? 'white' : Colors.primaryColor,
    headerLeft: (
      <HeaderButtons HeaderButtonComponent={HeaderButton}>
        <Item title="Menu" iconName='ios-menu' size={26} onPress={() => {
          navData.navigation.toggleDrawer();
        }}/>
      </HeaderButtons>
    ),
    headerRight: (
      <HeaderButtons HeaderButtonComponent={HeaderButton}>
        <Item 
          title="Save" 
          iconName='ios-save' 
          size={26} 
          onPress={navData.navigation.getParam('save')}
        />
      </HeaderButtons>
    )
  });
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    alignItems: 'center',
  },
  title: {
    fontSize: 20,
    marginVertical: 20,
  },
  filterContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '80%',
    marginTop: 10,
  },
  filterText: {
    fontSize: 16,
  }
});

export default FiltersScreen;
