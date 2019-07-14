
import {createStackNavigator, createAppContainer} from 'react-navigation';
import getSlideFromRightTransition from 'react-navigation-slide-from-right-transition';

import {
	InitScreen,
	LoginScreen,
	CodeLoginScreen,
	CredLoginScreen,
	LoginLanding,
	StatusScreen,
} from './src/screens';

const MainNavigator = createStackNavigator(
	{
		Init: {screen: InitScreen},
		Login: {screen: LoginScreen},
		CredLogin: {screen: CredLoginScreen},
		CodeLogin: {screen: CodeLoginScreen},
		LoginLanding: {screen: LoginLanding},
		StatusScreen: {screen: StatusScreen},
	},
	{
		headerMode: 'none',
		initialRouteName: 'Init',
		transitionConfig: getSlideFromRightTransition,
	}
);

const App = createAppContainer(MainNavigator);

export default App;
