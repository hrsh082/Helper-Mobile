import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { ThemeProvider } from './src/contexts/ThemeContext';
import { LocationProvider } from './src/contexts/LocationContext';
import { BookingProvider } from './src/contexts/BookingContext';

import HomeScreen from './src/screens/HomeScreen';
import ServiceDetailScreen from './src/screens/ServiceDetailScreen';
import BookingScreen from './src/screens/BookingScreen';
import SignInScreen from './src/screens/SignInScreen';

export type RootStackParamList = {
  Home: undefined;
  ServiceDetail: { serviceId: string };
  Booking: undefined;
  SignIn: undefined;
};

const Stack = createStackNavigator<RootStackParamList>();

export default function App() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <ThemeProvider>
        <LocationProvider>
          <BookingProvider>
            <NavigationContainer>
              <Stack.Navigator
                initialRouteName="Home"
                screenOptions={{ headerShown: false }}
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
    </GestureHandlerRootView>
  );
}
