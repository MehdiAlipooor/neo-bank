import { initDeposit } from "@/services/deposit.service";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useCreateDepositRequest = () => {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: () => initDeposit(),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["users"] });
		},
		onError: (err: any) => {
			console.error("Failed to create deposit:", err);
		},
	});
};
