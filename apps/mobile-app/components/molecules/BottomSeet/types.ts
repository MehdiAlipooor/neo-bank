import { StyleProp, ViewStyle } from "react-native";

export type BottomSheetProps = {
	snapPoints?: Array<string | number>;
	children: React.ReactNode;
	backgroundStyle?: StyleProp<ViewStyle>;
	backdropOpacity?: number;
};

export type BottomSheetRef = {
	expand: () => void;
	collapse: () => void;
	close: () => void;
};
