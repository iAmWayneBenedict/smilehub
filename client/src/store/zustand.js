import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

export const useAppStore = create((set) => {
	return {
		/**
            * The details of the alert dialog.

            * @typedef {Object} AlertDialog
            * @property {string} type - The type of the alert dialog. Can be 'success', 'error', 'warning', or 'info'.
            * @property {string} title - The title of the alert dialog.
            * @property {string} message - The message of the alert dialog.
            * @property {boolean} isOpen - Whether the alert dialog is open.
            * @property {string} actionLink - The link to redirect to when the action button is clicked.
         */
		alertDialogDetails: {},
		setAlertDialogDetails: (details) => set({ alertDialogDetails: details }),
	};
});

export const useAuthTokenPersisted = create(
	persist(
		(set) => ({
			authToken: false,
			setAuthToken: (value) => set({ authToken: value }),
		}),
		{
			name: "authToken",
			storage: createJSONStorage(() => localStorage),
		}
	)
);
