import * as React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import ProfileScreen from '../screens/ProfileScreen';
import HomeScreen from '../screens/HomeScreen';
import DonationScreen from '../screens/DonationScreen';
import CalendarScreen from '../screens/CalendarScreen';

const Tab = createBottomTabNavigator();

function BottomTab() {

    return (
        <Tab.Navigator
          initialRouteName="Feed"
          screenOptions={{
            tabBarActiveTintColor: '#114232',
            headerShown: false,
          }}
        >
          <Tab.Screen
            name="Home"
            component={HomeScreen}
            options={{
              tabBarIcon: ({ color, size }) => (
                <MaterialCommunityIcons name="home" color={color} size={size} />
              ),
            }}
          />
          <Tab.Screen
            name="Donations"
            component={DonationScreen}
            options={{
              tabBarIcon: ({ color, size }) => (
                <MaterialCommunityIcons name="cash-multiple" color={color} size={size} />
              ),
            }}
          />
          <Tab.Screen
            name="Calendar"
            component={CalendarScreen}
            options={{
              tabBarIcon: ({ color, size }) => (
                <MaterialCommunityIcons name="calendar" color={color} size={size} />
              ),
            }}
          />
          <Tab.Screen
            name="Profile"
            component={ProfileScreen}
            options={{
              tabBarIcon: ({ color, size }) => (
                <MaterialCommunityIcons name="account" color={color} size={size} />
              ),
            }}
          />
        </Tab.Navigator>
      );
}

export default BottomTab;