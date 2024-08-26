import 'react-native-gesture-handler';

import React  from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import WelcomeScreen from './src/screens/WelcomeScreen';

const Stack = createStackNavigator();

const App = () => {
    return (
        <>
        <NavigationContainer>
            <Stack.Navigator initialRouteName="welcome">
                <Stack.Screen name="welcome" component={WelcomeScreen} options={{headerShown: false}} />
            </Stack.Navigator>
        </NavigationContainer>
        </>
    );
};

export default App;