import React from 'react';
import { Platform } from 'react-native';
import { createStackNavigator, createBottomTabNavigator } from 'react-navigation';

import TabBarIcon from '../components/TabBarIcon';
import HomeScreen from '../screens/HomeScreen';
import PublishScreen from '../screens/PublishScreen';
import SettingsScreen from '../screens/SettingsScreen';
import TestScreen from '../screens/TestScreen'
import Profile from '../screens/ProfileScreen';

const HomeStack = createStackNavigator({
  Home: HomeScreen,
});

HomeStack.navigationOptions = {
  tabBarLabel: 'Rechercher',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={Platform.OS === 'ios' ? 'ios-search' : 'md-search'}
    // name={
    //   Platform.OS === 'ios'
    //     ? `ios-information-circle${focused ? '' : '-outline'}`
    //     : 'md-information-circle'
    // }
    />
  ),
};

const PublishStack = createStackNavigator({
  Publish: PublishScreen,
});

PublishStack.navigationOptions = {
  tabBarLabel: 'Publier',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={Platform.OS === 'ios' ? 'ios-cloud-upload' : 'md-cloud-upload'}
    />
  ),
};

const SettingsStack = createStackNavigator({
  Profile: Profile,
});

SettingsStack.navigationOptions = {
  tabBarLabel: 'Profil',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={Platform.OS === 'ios' ? 'ios-person' : 'md-person'}
    />
  ),
};

const TestStack = createStackNavigator({
  Test: TestScreen,
});

TestStack.navigationOptions = {
  tabBarLabel: 'Notifications',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={Platform.OS === 'ios' ? 'ios-notifications' : 'md-notifications'}
    />
  ),
};

export default createBottomTabNavigator({
  HomeStack,
  PublishStack,
  SettingsStack,
  TestStack,
});
