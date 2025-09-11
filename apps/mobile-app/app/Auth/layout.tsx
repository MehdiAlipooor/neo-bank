import { useFonts } from "expo-font";
import { FC, ReactNode } from "react";
import { View } from "react-native";
import { styles } from "./styles";

type LayoutProps = {
	children: ReactNode;
};
export const Layout: FC<LayoutProps> = ({ children }) => {
	return <View style={styles.layoutWrapper}>{children}</View>;
};

export const useDanaFonts = () => {
	return useFonts({
		light: require("./../../assets/fonts/danaPro/ttf/vertopal.com_DanaFaNum-Light.ttf"),
		regular: require("./../../assets/fonts/danaPro/ttf/vertopal.com_DanaFaNum-Regular.ttf"),
		medium: require("./../../assets/fonts/danaPro/ttf/vertopal.com_DanaFaNum-Medium.ttf"),
		DemiBold: require("./../../assets/fonts/danaPro/ttf/vertopal.com_DanaFaNum-DemiBold.ttf"),
		bold: require("./../../assets/fonts/danaPro/ttf/vertopal.com_DanaFaNum-Bold.ttf"),
	});
};
