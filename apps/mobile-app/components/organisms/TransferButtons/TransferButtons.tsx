import { CashMinusIcon } from "@/components/icons/CashMines";
import { CashPlusIcon } from "@/components/icons/CashPlus";
import { CategoryPlusIcon } from "@/components/icons/CategoryList";
import { TransferIcon } from "@/components/icons/Transfer";
import { themeColors, themRadius } from "@/constants/theme";
import { globalStyles } from "@/styles/global";
import { Pressable, StyleSheet, Text, View } from "react-native";

export const TransferButtons = () => {
	return (
		<View style={styles.wrapper}>
			<View
				style={[
					styles.card,
					globalStyles.row,
					globalStyles.justifyBetween,
					globalStyles.alignCenter,
				]}
			>
				<TransferButtonItem />
				<TransferItem />
				<WithdrawItem />
				<DepositItem />
			</View>
		</View>
	);
};

const TransferItem = () => {
	return (
		<Pressable
			style={{
				width: 48,
				height: 48,
				alignItems: "center",
				justifyContent: "center",
			}}
		>
			<TransferIcon strokeWidth={1.5} size={28} />
			<IconText text="انتقال" />
		</Pressable>
	);
};

const DepositItem = () => {
	return (
		<Pressable
			style={{
				width: 48,
				height: 48,
				alignItems: "center",
				justifyContent: "center",
			}}
		>
			<CashPlusIcon strokeWidth={1.5} size={28} />
			<IconText text="واریز" />
		</Pressable>
	);
};

const WithdrawItem = () => {
	return (
		<Pressable
			style={{
				width: 48,
				height: 48,
				alignItems: "center",
				justifyContent: "center",
			}}
		>
			<CashMinusIcon size={28} strokeWidth={1.5} />
			<IconText text="برداشت" />
		</Pressable>
	);
};

const TransferButtonItem = () => {
	return (
		<Pressable
			style={{
				width: 48,
				height: 48,
				alignItems: "center",
				justifyContent: "center",
			}}
		>
			<CategoryPlusIcon strokeWidth={1.5} size={28} />
			<IconText text="بیشتر" />
		</Pressable>
	);
};

const IconText = ({ text }: { text: string }) => (
	<Text
		style={{
			fontFamily: "medium",
			color: themeColors.dark,
			fontSize: 15,
			marginTop: 12,
		}}
	>
		{text}
	</Text>
);

export const styles = StyleSheet.create({
	wrapper: {
		width: "100%",
		height: 82,
		marginTop: 36,
		paddingHorizontal: 24,
	},
	card: {
		width: "100%",
		backgroundColor: "#f9f9fb",
		borderRadius: themRadius.lg,
		paddingHorizontal: 24,
		paddingVertical: 24,
	},
});
