
import React from 'react';
import { createBottomTabNavigator, createDrawerNavigator, createAppContainer } from 'react-navigation';
import Icon from 'react-native-vector-icons/FontAwesome';

import DummyScreen from './DummyScreen.js';
import HomeScreen from './HomeScreen.js'

const TabNavigator = createBottomTabNavigator({
    Feed: {
        screen: HomeScreen,
        navigationOptions: {
            tabBarLabel: "Feed",
            tabBarIcon: ({ tintColor }) => (
              <Icon name="home" size={25} />
            )
          },
    },
    Tab2: {screen: DummyScreen},
    Tab3: {screen: DummyScreen},
});

const DrawerNavigator = createDrawerNavigator({
    Home: {screen: TabNavigator},
    Drawer2: {screen: DummyScreen},
    Drawer3: {screen: DummyScreen},
});

export default LoginLanding = createAppContainer(DrawerNavigator);