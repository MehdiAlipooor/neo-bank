import { FC, ReactNode } from "react";
import { StatusBar } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { SafeAreaProvider } from "react-native-safe-area-context";

type RootLayoutProps = {
	children: ReactNode;
};
export const RootLayout: FC<RootLayoutProps> = ({ children }) => {
	return (
		<GestureHandlerRootView style={{ flex: 1 }}>
			<StatusBar barStyle="light-content" />
			<SafeAreaProvider>{children}</SafeAreaProvider>
		</GestureHandlerRootView>
	);
};
