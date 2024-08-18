import { decrypt } from "@/lib/utils";
import { useAppStore, useAuthTokenPersisted } from "@/store/zustand";
import { useEffect } from "react";

/**
 * Custom hook that validates if the logged-in user's token is expired.
 * If the token is expired, it logs out the user and displays a success message.
 *
 * @returns {void}
 */
const useValidateLoggedUser = () => {
	const { authToken, setAuthToken } = useAuthTokenPersisted();
	const { setAlertDialogDetails } = useAppStore();

	useEffect(() => {
		try {
			const { expiry } = decrypt(authToken);
			const expiryDate = new Date(expiry);
			const now = new Date();

			if (expiryDate <= now) {
				// log out user
				setAuthToken(false);
				setAlertDialogDetails({
					isOpen: true,
					type: "success",
					title: "Success!",
					message: "You have been successfully logged out.",
					actionLink: "/",
				});
			}
		} catch (error) {
			console.log(error);
		}
	}, []);
};

export default useValidateLoggedUser;
