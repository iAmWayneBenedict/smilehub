import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

export const useAppStore = create((set) => {
	return {
		/**
            * The details of the alert dialog.

            * @typedef {Object} AlertDialog
            * @property {string} type - The type of the alert dialog. Can be 'success', 'danger', 'warning', or 'info'.
            * @property {string} title - The title of the alert dialog.
            * @property {string} message - The message of the alert dialog.
            * @property {boolean} isOpen - Whether the alert dialog is open.
            * @property {string} actionLink - The link to redirect to when the action button is clicked.
			* @property {string} dialogType - The type in which chooses between confirm and close
			* @property {function} confirmCallback - The callback when the user clicks the confirm button
			* @property {function} cancelCallback - The callback when the user clicks the cancel button
         */
		alertDialogDetails: {},
		setAlertDialogDetails: (details) => set({ alertDialogDetails: details }),

		/**
			* The details of the new appointment modal.

			* @typedef {Object} NewAppointmentModal
			* @property {string} title - The title of the new appointment modal.
			* @property {object} data - The data of the new appointment modal.
			* @property {boolean} isOpen - Whether the new appointment modal is open.
			* @property {string} actionLink - The link to redirect to when the action button is clicked.
		 */
		newAppointmentModal: {},
		setNewAppointmentModal: (details) => set({ newAppointmentModal: details }),
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
