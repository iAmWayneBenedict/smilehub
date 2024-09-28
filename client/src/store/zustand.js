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
		 	* @property {function} refetch - The function to refetch the data.
		*/
		newAppointmentModal: {},
		setNewAppointmentModal: (details) => set({ newAppointmentModal: details }),

		/**
			* The details of the new schedule modal.

			* @typedef {Object} NewScheduleModal
			* @property {string} title - The title of the new schedule modal.
			* @property {object} data - The data of the new schedule modal.
			* @property {boolean} isOpen - Whether the new schedule modal is open.
			* @property {string} actionLink - The link to redirect to when the action button is clicked.
			* @property {function} refetch - The function to refetch the data.
		 */
		newScheduleModal: {},
		setNewScheduleModal: (details) => set({ newScheduleModal: details }),

		/**
			* The details of the assessment patient modal.

			* @typedef {Object} AssessmentPatientModal
			* @property {string} title - The title of the assessment patient modal.
			* @property {object} data - The data of the assessment patient modal.
			* @property {boolean} isOpen - Whether the assessment patient modal is open.
			* @property {string} actionLink - The link to redirect to when the action button is clicked.
			* @property {function} refetch - The function to refetch the data.
		 */
		assessmentPatientModal: {},
		setAssessmentPatientModal: (details) => set({ assessmentPatientModal: details }),

		/**
			* The details of the teeth diagram.

			* @typedef {Object} TeethDiagramDetails
			* @property {string} title - The title of the teeth diagram.
			* @property {object} data - The data of the teeth diagram.
			* @property {boolean} isOpen - Whether the teeth diagram is open.
			* @property {string} actionLink - The link to redirect to when the action button is clicked.
			* @property {function} refetch - The function to refetch the data.
		 */
		teethDiagramModalDetails: {},
		setTeethDiagramModalDetails: (details) => set({ teethDiagramModalDetails: details }),

		/**
			* The details of the Add item group.

			* @typedef {Object} AddGroupItemModal
			* @property {string} title - The title of the teeth diagram.
			* @property {object} data - The data of the teeth diagram.
			* @property {boolean} isOpen - Whether the teeth diagram is open.
			* @property {string} actionLink - The link to redirect to when the action button is clicked.
			* @property {function} refetch - The function to refetch the data.
		 */
		addGroupItemModal: {},
		setAddGroupItemModal: (value) => set({ addGroupItemModal: value }),
		/**
			* The details of the Add group.

			* @typedef {Object} AddGroupModal
			* @property {string} title - The title of the teeth diagram.
			* @property {object} data - The data of the teeth diagram.
			* @property {boolean} isOpen - Whether the teeth diagram is open.
			* @property {string} actionLink - The link to redirect to when the action button is clicked.
			* @property {function} refetch - The function to refetch the data.
		 */
		addGroupModal: {},
		setAddGroupModal: (value) => set({ addGroupModal: value }),

		/**
			* The details of the Progressnote modal.

			* @typedef {Object} AddProgressNoteModal
			* @property {string} title - The title of the modal.
			* @property {object} data - The data of the modal.
			* @property {boolean} isOpen - Whether the modal is open.
			* @property {string} actionLink - The link to redirect to when the action button is clicked.
			* @property {function} refetch - The function to refetch the data.
		 */
		addProgressNoteModal: {},
		setAddProgressNoteModal: (value) => set({ addProgressNoteModal: value }),

		/**
			* The details of the Progressnote modal.

			* @typedef {Object} AddProgressNoteModal
			* @property {string} title - The title of the modal.
			* @property {object} data - The data of the modal.
			* @property {boolean} isOpen - Whether the modal is open.
			* @property {string} actionLink - The link to redirect to when the action button is clicked.
			* @property {function} refetch - The function to refetch the data.
		 */
		taskModal: {},
		setTaskModal: (value) => set({ taskModal: value }),

		refetchArr: [],
		setRefetchArr: (value) => set({ refetchArr: value }),
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

export const useRealTimeAppointmentsPersisted = create(
	persist(
		(set) => ({
			realTimeAppointments: {
				selectedChapter: "",
				upcomingActiveIndex: undefined,
			},
			setRealTimeAppointments: (value) => set({ realTimeAppointments: value }),
		}),
		{
			name: "realTimeAppointments",
			storage: createJSONStorage(() => localStorage),
		}
	)
);
