import { FC, ReactNode } from "react";
import { ScrollView } from "react-native";

type LayoutProps = {
	children: ReactNode;
};
export const Layout: FC<LayoutProps> = ({ children }) => {
	return (
		<ScrollView style={{ padding: 24, backgroundColor: "#fff" }}>
			{children}
		</ScrollView>
	);
};
