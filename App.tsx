import 'react-native-gesture-handler';

import React  from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import WelcomeScreen from './src/screens/WelcomeScreen';
import LoginScreen from './src/screens/LoginScreen';
import BottomTab from './src/components/BottomTab';
import SignupScreen from './src/screens/SignupScreen';

const Stack = createStackNavigator();

const App = () => {
    return (
        <>
        <NavigationContainer>
            <Stack.Navigator initialRouteName="welcome">
                <Stack.Screen name="welcome" component={WelcomeScreen} options={{headerShown: false}} />
                <Stack.Screen name="Login" component={LoginScreen} />
                <Stack.Screen name="Signup" component={SignupScreen} />
                <Stack.Screen name="Hometab" component={BottomTab} options={{headerShown: false}} />
            </Stack.Navigator>
        </NavigationContainer>
        </>
    );
};

export default App;