import { themeColors } from "@/constants/theme";
import GorHomBottomSheet, {
	BottomSheetBackdrop as GorHomBottomSheetBackdrop,
	BottomSheetBackdropProps as GorHomBottomSheetBackdropProps,
	BottomSheetProps as GorHomBottomSheetProps,
	BottomSheetView as GorHomBottomSheetView,
} from "@gorhom/bottom-sheet";

import React, {
	forwardRef,
	useCallback,
	useImperativeHandle,
	useMemo,
	useRef,
} from "react";
import { StyleSheet } from "react-native";
import { BottomSheetRef } from "./types";

export const BottomSheet = forwardRef<BottomSheetRef, GorHomBottomSheetProps>(
	(props, ref) => {
		const bottomSheetRef = useRef<GorHomBottomSheet>(null);

		const { snapPoints, backgroundStyle, children, ...rest } = props;

		// expose imperative methods to parent
		useImperativeHandle(ref, () => ({
			expand: () => bottomSheetRef.current?.expand(),
			collapse: () => bottomSheetRef.current?.collapse(),
			close: () => bottomSheetRef.current?.close(),
		}));

		const snapPointsMemo = useMemo(() => snapPoints, [snapPoints]);

		const renderBackdrop = useCallback(
			(props: GorHomBottomSheetBackdropProps) => (
				<GorHomBottomSheetBackdrop
					{...props}
					disappearsOnIndex={0}
					appearsOnIndex={1}
					// opacity={}
				/>
			),
			[],
		);

		return (
			<GorHomBottomSheet
				ref={bottomSheetRef}
				index={-1}
				snapPoints={snapPointsMemo}
				enablePanDownToClose
				enableOverDrag={false}
				detached
				enableBlurKeyboardOnGesture
				bottomInset={0}
				backgroundStyle={[styles.background, backgroundStyle]}
				handleIndicatorStyle={styles.handleIndicator}
				backdropComponent={renderBackdrop}
				{...rest}
			>
				<GorHomBottomSheetView style={styles.contentContainer}>
					{children}
				</GorHomBottomSheetView>
			</GorHomBottomSheet>
		);
	},
);

const styles = StyleSheet.create({
	background: {
		backgroundColor: themeColors.dark,
		borderRadius: 16,
	},
	handleIndicator: {
		display: "none",
	},
	contentContainer: {
		flex: 1,
		padding: 16,
	},
});
