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
				tabBarIcon: ({ color, size }) => {
					let iconName: string = "ellipse";
					if (route.name === "Home") iconName = "home-outline";
					if (route.name === "Profile") iconName = "person-outline";
					if (route.name === "Settings") iconName = "settings-outline";
					return <></>;
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
