import { FC, ReactNode } from "react";
import { View } from "react-native";
import { styles } from "./styles";

type HomeWalletTemplateProps = {
	infoComponent: ReactNode;
	walletCardComponent: ReactNode;
};
export const HomeWalletTemplate: FC<HomeWalletTemplateProps> = ({
	infoComponent,
	walletCardComponent,
}) => {
	return (
		<View style={styles.wrapper}>
			<View style={styles.cardBody}>{walletCardComponent}</View>
			<View style={styles.cardWrapper}>{infoComponent}</View>
		</View>
	);
};
