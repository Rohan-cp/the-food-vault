import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';

import HeaderButton from '../components/HeaderButton';
import Colors from '../constants/Colors';

const FiltersScreen = props => {
  return (
    <View style={styles.screen}>
      <Text>The Filters Screen!</Text>
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
  )});
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'cyan',
  }
});

export default FiltersScreen;
