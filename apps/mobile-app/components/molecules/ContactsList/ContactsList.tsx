import type { FC } from "react";
import { FlatList, Image, Text, TouchableOpacity, View } from "react-native";
import { SpaceTop } from "@/components/atoms/SpaceTop";
import { CheckIcon } from "@/components/icons/Chcek";
import { sizes, themeColors } from "@/constants/theme";
import { globalStyles } from "@/styles/global";
import { SearchInput } from "../SearchInput";
import { contractsMockList } from "./mock";
import { styles } from "./styles";

export type ContractListProps = {
	activeUserId: string | undefined;
	onSelectUser: (user: Record<string, string>) => void;
};
export const ContactsList: FC<ContractListProps> = ({
	activeUserId,
	onSelectUser,
}) => {
	const contractRow = ({ item }: { item: Record<string, string> }) => {
		const isActive = item.id === activeUserId;
		return (
			<TouchableOpacity
				key={item.id}
				style={[
					styles.rowItem,
					globalStyles.center,
					isActive && styles.activeRow,
				]}
				onPress={() => onSelectUser(item)}
			>
				{isActive ? (
					<View style={styles.checkIcon}>
						<CheckIcon size={22} color={themeColors.Primary} />
					</View>
				) : null}
				<View>
					<Image
						source={{
							uri: item.icon,
						}}
						width={62}
						height={62}
					/>
				</View>
				<View>
					<Text style={styles.name}>{item.firstName}</Text>
					<Text style={styles.name}>{item.lastName}</Text>
				</View>
			</TouchableOpacity>
		);
	};

	return (
		<View>
			<Text style={styles.title}>انتخاب مخاطب</Text>
			<SpaceTop margin={sizes.sm} />
			<SearchInput />
			<SpaceTop margin={sizes.xlg} />

			<FlatList
				horizontal
				data={contractsMockList}
				keyExtractor={(item) => item.id}
				initialNumToRender={5}
				inverted
				contentContainerStyle={{
					gap: 16,
				}}
				renderItem={({ item }) => contractRow({ item })}
			/>
		</View>
	);
};
