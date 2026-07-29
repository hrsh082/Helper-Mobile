import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { ThemeProvider } from './src/contexts/ThemeContext';
import { LocationProvider } from './src/contexts/LocationContext';
import { BookingProvider } from './src/contexts/BookingContext';

import HomeScreen from './src/screens/HomeScreen';
import ServiceDetailScreen from './src/screens/ServiceDetailScreen';
import BookingScreen from './src/screens/BookingScreen';
import SignInScreen from './src/screens/SignInScreen';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <ThemeProvider>
      <LocationProvider>
        <BookingProvider>
          <NavigationContainer>
            <Stack.Navigator
              initialRouteName="Home"
              screenOptions={{
                headerShown: false,
                animation: 'slide_from_right'
              }}
            >
              <Stack.Screen name="Home" component={HomeScreen} />
              <Stack.Screen name="ServiceDetail" component={ServiceDetailScreen} />
              <Stack.Screen name="Booking" component={BookingScreen} />
              <Stack.Screen name="SignIn" component={SignInScreen} />
            </Stack.Navigator>
          </NavigationContainer>
        </BookingProvider>
      </LocationProvider>
    </ThemeProvider>
  );
}
