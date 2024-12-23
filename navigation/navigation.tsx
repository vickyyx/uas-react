import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from '../app/(tabs)/index'; // Correct path
import NextScreen from '../app/(tabs)/NextScreen'; // Correct path

const Stack = createStackNavigator();

const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={HomeScreen} options={{ headerShown: false }} />
        <Stack.Screen name="NextScreen" component={NextScreen} options={{ title: 'Next Screen' }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
