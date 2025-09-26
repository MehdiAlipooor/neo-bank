import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Text, View } from "react-native";
import { HomeScreen } from "./Home/Home.screen";

const Tab = createBottomTabNavigator();

function ProfileScreen() {
	return (
		<View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
			<Text style={{ fontSize: 20 }}>👤 Profile Screen</Text>
		</View>
	);
}

function SettingsScreen() {
	return (
		<View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
			<Text style={{ fontSize: 20 }}>⚙️ Settings Screen</Text>
		</View>
	);
}

export const Nav = () => {
	return (
		<Tab.Navigator
			screenOptions={({ route }) => ({
				headerShown: false,
				tabBarActiveTintColor: "#007AFF",
				tabBarInactiveTintColor: "gray",
				tabBarIcon: ({ color: _color, size: _size }) => {
					let _iconName: string = "ellipse";
					if (route.name === "Home") _iconName = "home-outline";
					if (route.name === "Profile") _iconName = "person-outline";
					// eslint-disable-next-line @typescript-eslint/no-unused-vars
					if (route.name === "Settings") _iconName = "settings-outline";
					return null;
				},
			})}
		>
			<Tab.Screen name="Home" component={HomeScreen} />
			<Tab.Screen name="My Cards" component={ProfileScreen} />
			<Tab.Screen name="Scann" component={SettingsScreen} />
			<Tab.Screen name="Activities" component={SettingsScreen} />
			<Tab.Screen name="Profile" component={SettingsScreen} />
		</Tab.Navigator>
	);
};
