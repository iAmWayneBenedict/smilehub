import {
    Modal,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalFooter,
    Button,
    useDisclosure,
    Select,
    SelectItem, Textarea,
} from "@nextui-org/react";
import { useAppStore } from "@/store/zustand.js";
import { useEffect, useState } from "react";
import { getLocalTimeZone, today } from "@internationalized/date";
import { Controller, useForm } from "react-hook-form";
import { convertDateYYYYMMDD, isWeekEndDate } from "@/services/api/utils";
import AppointmentsAPIManager from "@/services/api/managers/appointments/AppointmentsAPIManager";
import { useMutation } from "@tanstack/react-query";
import CustomDatePicker from "@/components/ui/DatePicker";
import { useMemo } from "react";
import { parseDate } from "@internationalized/date";
import { sortTime } from "@/lib/utils";

export default function ProgressNoteModal() {
	const { isOpen, onOpen, onClose } = useDisclosure();
	const { addProgressNoteModal, setAddProgressNoteModal, setAlertDialogDetails } = useAppStore();
	const [timeDropdownList, setTimeDropdownList] = useState([]);
	useEffect(() => {
		if (addProgressNoteModal.isOpen) {
			onOpen();

			if (addProgressNoteModal.data) {
				handleGetSelectedTimes();
			}
		} else {
			onClose();
		}

		async function handleGetSelectedTimes() {
			(await handleGetDate(
				parseDate(convertDateYYYYMMDD(addProgressNoteModal.data.PROGRESS_DATE))
			)) || today(getLocalTimeZone(), false);
			setTimeDropdownList((prev) => {
				sortTime(prev, addProgressNoteModal.data.PROGRESS_DETAILS);
				return sortTime(prev, addProgressNoteModal.data.PROGRESS_DETAILS);
			});
			reset({
				PROGRESS_DATE:
					parseDate(convertDateYYYYMMDD(addProgressNoteModal.data.PROGRESS_DATE)) ||
					today(getLocalTimeZone()),
				PROGRESS_DETAILS: addProgressNoteModal.data.PROGRESS_DETAILS,
			});
		}
	}, [addProgressNoteModal]);

	// Form hook
	const { handleSubmit, control, reset } = useForm({
		defaultValues: useMemo(() => {
			if (addProgressNoteModal.data) {
				return {
					PROGRESS_DATE:
						parseDate(convertDateYYYYMMDD(addProgressNoteModal.data.PROGRESS_DATE)) ||
						today(getLocalTimeZone()),
					PROGRESS_DETAILS: "",
				};
			}
		}, [addProgressNoteModal.isOpen]),
	});
	// useEffect(() => {
	// 	handleGetDate(today(getLocalTimeZone()), false);
	// }, []);

	const handleGetDate = async (date, isForm = true) => {
		if (isWeekEndDate(date)) return;
		try {
			const response = await AppointmentsAPIManager.getAppointmentDates({
				PROGRESS_DATE: convertDateYYYYMMDD(date),
			});
			setTimeDropdownList(response.available_times || []);
		} catch (error) {
			if (!isForm)
				setAlertDialogDetails({
					isOpen: true,
					type: "danger",
					title: "Error!",
					message: error.message,
				});
		}
	};
	const mutation = useMutation({
		mutationFn: AppointmentsAPIManager.postRescheduleAppointment,
		onSuccess: () => {
			addProgressNoteModal.refetch();

			setAlertDialogDetails({
				isOpen: true,
				type: "success",
				title: "Success!",
				message: "Appointment schedule changed successfully!",
			});

			onClose();
		},
		onError: (error) => {
			setAlertDialogDetails({
				isOpen: true,
				type: "danger",
				title: "Error!",
				message: error.message,
			});
		},
	});
	const onSubmit = (data) => {
//		data.PROGRESS_DATE = convertDateYYYYMMDD(data.PROGRESS_DATE);
//		data.ID = addProgressNoteModal?.data?.ID;
//		mutation.mutate(data);
	};
	return (
		<>
			<Modal
				isOpen={isOpen}
				onClose={() => {
					onClose();
					setAddProgressNoteModal({ isOpen: false });
					reset()
				}}
				placement="top-center"
				backdrop="blur"
			>
				<ModalContent>
					{(onClose) => (
						<form onSubmit={handleSubmit(onSubmit)}>
							<ModalHeader className="flex flex-col gap-1">
								{addProgressNoteModal.title}
							</ModalHeader>
							<ModalBody>
								<Controller
									name="PROGRESS_DATE"
									control={control}
									rules={{ required: "Date is required" }}
									render={({ field, formState: { errors } }) => (
										<CustomDatePicker
											value={field.value}
											isInvalid={!!errors.PROGRESS_DATE}
											errorMessage={errors.PROGRESS_DATE?.message}
											setValue={(value) => {
												field.onChange(value);
											}}
											classNames={{
												innerWrapper: "h-12",
											}}
											isDateUnavailable={isWeekEndDate}
											onChange={handleGetDate}
										/>
									)}
								/>
								<Controller
									name="PROGRESS_DETAILS"
									control={control}
									rules={{ required: "Progress details is required" }}
									render={({ field, formState: { errors } }) => (
										<Textarea
											value={field.value}
											onValueChange={(value) => {
												field.onChange(value);
											}}
											isInvalid={!!errors.PROGRESS_DETAILS}
											errorMessage={errors.PROGRESS_DETAILS?.message}
											variant={"bordered"}
											label="Progress Details"
											radius="sm"
											size="lg"
											color="primary"
											labelPlacement="outside"
											classNames={{
												label: "text-darkText font-semibold text-base",
												inputWrapper:
													"rounded-lg h-full bg-white",
												// mainWrapper: "h-[4rem]",
											}}
											minRows={6}
											placeholder=" "
											className="col-span-12 mb-6 md:col-span-6 md:mb-0"
										/>
									)}
								/>
							</ModalBody>
							<ModalFooter>
								<Button color="light" variant="flat" onPress={() => {
									onClose()
									reset()
									setAddProgressNoteModal({})
								}}>
									Close
								</Button>
								<Button
									color="primary"
									type="submit"
									isLoading={mutation.isPending}
								>
									{mutation.isPending ? "Loading..." : "Save"}
								</Button>
							</ModalFooter>
						</form>
					)}
				</ModalContent>
			</Modal>
		</>
	);
}
