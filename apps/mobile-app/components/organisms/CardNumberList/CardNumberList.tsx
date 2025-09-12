import { useCallback } from "react";
import { FlatList, Text, View } from "react-native";
import { CardNumberBox } from "../CardNumberBox";
import { mockCardNumbers } from "./mock";

export const CardNumberList = () => {
	const renderBankItem = useCallback(
		({ item, index }: { item: Record<string, string>; index: number }) => {
			const isActive = index === 1;

			return (
				<CardNumberBox
					id={item.id}
					key={item.id}
					title={item.title}
					icon={item.icon}
					number={item.number}
					isActive={isActive}
				/>
			);
		},
		[],
	);

	return (
		<View>
			<Text
				style={{
					marginBottom: 24,
					textAlign: "right",
					fontFamily: "bold",
					fontSize: 18,
				}}
			>
				انتخاب کارت
			</Text>
			<FlatList
				contentContainerStyle={{
					gap: 16,
				}}
				data={mockCardNumbers}
				renderItem={({ item, index }) => renderBankItem({ item, index })}
			/>
		</View>
	);
};
