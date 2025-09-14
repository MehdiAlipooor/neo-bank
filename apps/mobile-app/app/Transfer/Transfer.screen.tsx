import { CustomButton } from "@/components/atoms/CustomButton";
import { SpaceTop } from "@/components/atoms/SpaceTop/SpaceTop";
import { ContactsList } from "@/components/molecules/ContactsList";
import { ChooseCard } from "@/components/organisms/ChooseCard";
import { PageTitle } from "@/components/organisms/PageTitle";
import { sizes } from "@/constants/theme";
import { useState } from "react";
import { Layout } from "./layout";

export const TransferScreen = () => {
	const [destinationUser, setDestinationUser] = useState<Record<
		string,
		string
	> | null>(null);

	const selectDestinationUserHandler = (user: Record<string, string>) => {
		if (destinationUser?.id === user.id) {
			setDestinationUser(null);
			return;
		}

		setDestinationUser(user);
	};

	return (
		<Layout>
			<PageTitle title="انتقال  داخلی" />
			<SpaceTop margin={sizes.xlg} />
			<ChooseCard />
			<SpaceTop margin={32} />
			<ContactsList
				activeUserId={destinationUser?.id}
				onSelectUser={selectDestinationUserHandler}
			/>

			<SpaceTop margin={32} />
			<CustomButton
				varient="dark"
				size="lg"
				title={destinationUser?.id ? "ادامه" : "ادامه با مخاطب جدید"}
			/>
			<SpaceTop margin={32} />
		</Layout>
	);
};
