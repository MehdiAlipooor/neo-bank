import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { AuthScreen } from "./Auth";
import { DepositScreen } from "./Deposit";
import { MainScreen } from "./Main/Main.screen";
import { TransferScreen } from "./Transfer/Transfer.screen";

const Stack = createNativeStackNavigator();

const screens = {
	Auth: {
		component: AuthScreen,
		options: {
			lazy: true,
			// Better performance in case of deep navigations
			gestureEnabled: true,
		},
	},
	Main: {
		component: MainScreen,
		options: {
			lazy: true,
			// Better performance in case of deep navigations
			gestureEnabled: true,
		},
	},
	Deposit: {
		component: DepositScreen,
		options: {
			lazy: true,
			// Better performance in case of deep navigations
			gestureEnabled: true,
		},
	},
	Transfer: {
		component: TransferScreen,
		options: {
			lazy: true,
			gestureEnabled: true,
		},
	},
};

export const Nav = () => {
	return (
		<Stack.Navigator
			initialRouteName="Transfer"
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
