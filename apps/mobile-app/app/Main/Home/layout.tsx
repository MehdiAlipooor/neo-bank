import type { FC, ReactNode } from "react";
import { ScrollView } from "react-native";
import { styles } from "./styles";

type LayoutProps = {
	children: ReactNode;
};
export const Layout: FC<LayoutProps> = ({ children }) => {
	return <ScrollView style={styles.layout}>{children}</ScrollView>;
};
