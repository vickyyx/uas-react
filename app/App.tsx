import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Provider } from 'react-redux';
import store from '../store'; // Menggunakan default export
import NextScreen from './(tabs)/NextScreen'; // Pastikan path ini benar
import RegisterScreen from './(tabs)/RegisterScreen'; // Pastikan path ini benar
import HomeScreen from './(tabs)/HomeScreen'; // Pastikan path ini benar
import { RootStackParamList } from '../navigation/types'; // Pastikan path ini benar

const Stack = createNativeStackNavigator<RootStackParamList>();

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="HomeScreen"
          screenOptions={{
            headerShown: false, // Atur apakah header perlu ditampilkan
          }}
        >
          <Stack.Screen name="HomeScreen" component={HomeScreen} />
          <Stack.Screen name="NextScreen" component={NextScreen} />
          <Stack.Screen name="RegisterScreen" component={RegisterScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
};

export default App;
