import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Text } from "react-native";
import { AuthScreen } from "./Auth";

const Stack = createNativeStackNavigator();

function HomeScreen() {
	return <Text>HomeScreen</Text>;
}

const screens = {
	Auth: {
		component: AuthScreen,
		options: {
			lazy: true,
			// Better performance in case of deep navigations
			gestureEnabled: true,
		},
	},
	Home: {
		component: HomeScreen,
		options: {
			lazy: true,
			// Better performance in case of deep navigations
			gestureEnabled: true,
		},
	},
};

export const Nav = () => {
	return (
		<Stack.Navigator
			initialRouteName="Auth"
			screenOptions={{
				headerShown: false,
				contentStyle: { flex: 1 },
			}}
		>
			{Object.entries(screens).map(([name, { component, options }]) => (
				<Stack.Screen
					key={name}
					name={name}
					component={component}
					options={options}
				/>
			))}
		</Stack.Navigator>
	);
};
