import React from 'react';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';

import MainTabNavigator from './MainTabNavigator';
import Login from '../screens/LoginScreen';
import SignUp from '../screens/SignUpScreen';
import Loading from '../screens/LoadingScreen';
import CompleteProfile from '../screens/ProfileCompleteScreen';

export default createAppContainer(createSwitchNavigator({
  Loading: Loading,
  Auth: Login,
  SignUp: SignUp,
  CompleteProfile: CompleteProfile,
  Main: MainTabNavigator
}));