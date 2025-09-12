import { useDanaFonts } from "@/hooks/useDataFonts";
import * as SplashScreen from "expo-splash-screen";
import { createContext, useEffect } from "react";
import { I18nManager } from "react-native";
import { RootLayout } from "./layout";
import { Nav } from "./nav";

I18nManager.allowRTL(true);
I18nManager.forceRTL(true);

SplashScreen.preventAutoHideAsync();

const lightFont = require("./../assets/fonts/danaPro/ttf/vertopal.com_DanaFaNum-Light.ttf");

export const AppContext = createContext<{ fonts: { light: string } }>({
	fonts: { light: "" },
});

export default function Index() {
	const [loaded, error] = useDanaFonts();

	useEffect(() => {
		if (loaded || error) {
			SplashScreen.hideAsync();
		}
	}, [loaded, error]);

	return (
		<AppContext.Provider
			value={{
				fonts: {
					light: lightFont,
				},
			}}
		>
			<RootLayout>
				<Nav />
			</RootLayout>
		</AppContext.Provider>
	);
}
