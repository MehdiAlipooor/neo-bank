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
import { Dimensions, StyleSheet } from "react-native";
import { BottomSheetRef } from "./types";

export const BottomSheet = forwardRef<BottomSheetRef, GorHomBottomSheetProps>(
	(props, ref) => {
		const bottomSheetRef = useRef<GorHomBottomSheet>(null);

		const { snapPoints, backgroundStyle, children, ...rest } = props;

		const snapPointsMemo = useMemo(() => snapPoints, [snapPoints]);

		const sheeViewHeight = useMemo(() => {
			let heightPercentage = "0";
			if (
				Array.isArray(snapPointsMemo) &&
				typeof snapPointsMemo[1] === "string"
			) {
				const snapPoint = snapPointsMemo[1] as string;
				heightPercentage = snapPoint.endsWith("%")
					? snapPoint.slice(0, -1)
					: snapPoint;
			}

			return (
				(Dimensions.get("window").height * parseFloat(heightPercentage)) / 100
			);
		}, [snapPoints]);

		useImperativeHandle(ref, () => ({
			expand: () => bottomSheetRef.current?.expand(),
			collapse: () => bottomSheetRef.current?.collapse(),
			close: () => bottomSheetRef.current?.close(),
			getHeight: () => sheeViewHeight,
		}));

		const renderBackdrop = useCallback(
			(props: GorHomBottomSheetBackdropProps) => (
				<GorHomBottomSheetBackdrop
					disappearsOnIndex={0}
					appearsOnIndex={1}
					{...props}
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
