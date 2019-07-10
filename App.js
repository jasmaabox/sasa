
import {createStackNavigator, createAppContainer} from 'react-navigation';

import {
	InitScreen,
	LoginScreen,
	CodeLoginScreen,
	CredLoginScreen,
	HomeScreen,
} from './src/screens';

const MainNavigator = createStackNavigator(
	{
		Init: {screen: InitScreen},
		Login: {screen: LoginScreen},
		CredLogin: {screen: CredLoginScreen},
		CodeLogin: {screen: CodeLoginScreen},
		Home: {screen: HomeScreen},
	},
	{
		headerMode: 'none',
	}
);

const App = createAppContainer(MainNavigator);

export default App;
