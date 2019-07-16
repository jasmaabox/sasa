
import { Animated, Easing } from 'react-native';
import { createStackNavigator, createAppContainer } from 'react-navigation';

import {
	InitScreen,
	LoginScreen,
	CodeLoginScreen,
	CredLoginScreen,
	LoginLanding,
	StatusScreen,
} from './src/screens';

const transitionConfig = () => {
	return {
		transitionSpec: {
			duration: 500,
			easing: Easing.bezier(0.2833, 0.99, 0.31833, 0.99),
			timing: Animated.timing,
			useNativeDriver: true,
		},
		screenInterpolator: sceneProps => {
			const { layout, position, scene } = sceneProps

			const thisSceneIndex = scene.index
			const width = layout.initWidth

			const translateX = position.interpolate({
				inputRange: [thisSceneIndex - 1, thisSceneIndex],
				outputRange: [width, 0],
			})

			return { transform: [{ translateX }] }
		},
	}
}

const MainNavigator = createStackNavigator(
	{
		Init: { screen: InitScreen },
		Login: { screen: LoginScreen },
		CredLogin: { screen: CredLoginScreen },
		CodeLogin: { screen: CodeLoginScreen },
		LoginLanding: { screen: LoginLanding },
		StatusScreen: { screen: StatusScreen },
	},
	{
		headerMode: 'none',
		initialRouteName: 'Init',
		transitionConfig: transitionConfig,
	}
);

const App = createAppContainer(MainNavigator);

export default App;
