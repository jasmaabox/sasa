
import {createStackNavigator, createAppContainer} from 'react-navigation';

import {
	InitScreen,
	LoginScreen,
	CodeLoginScreen,
	CredLoginScreen,
	LoginLanding,
} from './src/screens';

const MainNavigator = createStackNavigator(
	{
		Init: {screen: InitScreen},
		Login: {screen: LoginScreen},
		CredLogin: {screen: CredLoginScreen},
		CodeLogin: {screen: CodeLoginScreen},
		LoginLanding: {screen: LoginLanding},
	},
	{
		headerMode: 'none',
	}
);

const App = createAppContainer(MainNavigator);

export default App;
