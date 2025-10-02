import type { FC, ReactNode } from "react";
import { View } from "react-native";
import { styles } from "./styles";

export type LayoutProps = {
	children: ReactNode;
};
export const Layout: FC<LayoutProps> = ({ children }) => {
	return <View style={styles.layout}>{children}</View>;
};
