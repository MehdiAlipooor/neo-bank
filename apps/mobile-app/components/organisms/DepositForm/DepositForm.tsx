import { CustomButton } from "@/components/atoms/CustomButton";
import { themeColors } from "@/constants/theme";
import { globalStyles } from "@/styles/global";
import { BottomSheetTextInput, BottomSheetView } from "@gorhom/bottom-sheet";
import Slider from "@react-native-community/slider";
import { useCallback, useMemo, useState } from "react";
import { Text, View } from "react-native";
import { CardNumberBox } from "../CardNumberBox";
import { mockCardNumbers } from "../CardNumberList/mock";

export const DepositForm = ({
	bottomSheetHeight,
}: {
	bottomSheetHeight: number;
}) => {
	return (
		<BottomSheetView>
			<View
				style={{
					position: "relative",
					flex: 1,
					height: bottomSheetHeight - 48 - 48,
					padding: 24,
				}}
			>
				<CardNumberBox
					isActive={false}
					{...(mockCardNumbers[0] as any)}
					hideSelect
					activeOpacity={1}
				/>
				<View style={{ marginTop: 24 }}>
					<Text
						style={{
							marginBottom: 24,
							textAlign: "right",
							fontFamily: "bold",
							fontSize: 18,
						}}
					>
						مبلغ
					</Text>
					<InputBox />
				</View>
				<View
					style={{
						width: "100%",
						marginLeft: 24,
						position: "absolute",
						bottom: 0,
					}}
				>
					<CustomButton varient="dark" size="lg" title="تایید" />
				</View>
			</View>
		</BottomSheetView>
	);
};

const InputBox = () => {
	const DEFAULT_VALUE_WIDTH = useMemo(() => "10,000,000".length * 26, []);
	const DEFAULT_NUMERIC_VALUE = useMemo(() => "10000000", []);

	const [inputWidth, setInputWidth] = useState(DEFAULT_VALUE_WIDTH);
	const [numericValue, setNumericValue] = useState(
		parseInt(DEFAULT_NUMERIC_VALUE),
	);
	const [value, setValue] = useState("10,000,000");

	const handleChange = useCallback((text: string) => {
		setInputWidth(text.length * 26);
		setNumericValue(Number(text));

		const numeric = text.replace(/\D/g, "");

		const formatted = numeric.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
		setValue(formatted);
	}, []);

	const renderSlider = useMemo(() => {
		return (
			<Slider
				style={{ width: "100%", direction: "rtl", marginTop: 24, height: 40 }}
				minimumValue={0}
				onValueChange={(e) => {
					handleChange(e.toString());
				}}
				maximumValue={100000000}
				value={numericValue}
				step={500}
				minimumTrackTintColor={themeColors.Primary}
				maximumTrackTintColor="#eee"
				thumbTintColor={themeColors.Primary}
			/>
		);
	}, [numericValue]);

	return (
		<>
			<View style={[globalStyles.row, globalStyles.center, { gap: 4 }]}>
				<Text style={{ color: "#6f737f", fontSize: 32, fontFamily: "bold" }}>
					تومان
				</Text>
				<BottomSheetTextInput
					// defaultValue="1,000,000"
					onChangeText={(e) => handleChange(e)}
					keyboardType="numeric"
					value={value}
					style={[
						{
							width: 100,
							height: 62,
							textAlign: "center",
							fontSize: 40,
							padding: 0,
							minWidth: 100,
							maxWidth: 260,
						},
						{ width: inputWidth },
					]}
				/>
			</View>
			{renderSlider}
		</>
	);
};
