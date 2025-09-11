import { CustomButton } from "@/components/atoms/CustomButton";
import { InputItem } from "@/components/molecules/InputItem";
import { View } from "react-native";

export const LoginForm = () => {
	return (
		<View
			style={{
				gap: 16,
				marginTop: 24,
			}}
		>
			<InputItem label="تلفن" parent="bottomSheet" />
			<InputItem label="نام کاربری" parent="bottomSheet" />

			<View style={{ marginTop: 34 }} />
			<CustomButton size="lg" varient="Primary" title="ورود" raduis={50} />
		</View>
	);
};
