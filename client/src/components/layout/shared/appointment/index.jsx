import {
	Modal,
	ModalContent,
	ModalHeader,
	ModalBody,
	ModalFooter,
	Button,
	useDisclosure,
	Select,
	SelectItem,
	Autocomplete,
	AutocompleteItem,
} from "@nextui-org/react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useForm, Controller } from "react-hook-form";
import { UserRound, Clock4, MapPin, Bell } from "lucide-react";
import { useState } from "react";
import { useAppStore } from "@/store/zustand";
import { useEffect } from "react";
import CustomDatePicker from "@/components/ui/DatePicker";
import { getLocalTimeZone, today, CalendarDate } from "@internationalized/date";
import { convertDateYYYYMMDD, extractTime, isWeekEndDate } from "@/services/api/utils";
import AppointmentsAPIManager from "@/services/api/managers/appointments/AppointmentsAPIManager";
import PatientsAPIManager from "@/services/api/managers/patients/PatientsAPIManager";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";
import { cn, days, formatDate, months } from "@/lib/utils";
import { sendEmail } from "@/services/email";

const purposes = [
	"Extraction",
	"Oral Prophylaxis",
	"Temporary Filling",
	"Pit & Fissure Sealant",
	"Flouride Treatment",
	"Root Canal Therapy",
	"Impaction/Surgery",
	"Inlay",
	"Stainless Steel Crown",
	"Retainer",
	"Retainer w/ pontics",
	"Denture Repair",
	"Rebase",
	"Reline",
	"X-Rax",
	"Laminates",
	"Jacket Crown/Bridge",
	"Bleaching",
	"Otho-Braces",
	"Mayobrace/Trainer for kids",
	"Veneer",
	"Denture",
	"Fixed Bridge"
];

export default function AppointmentModal() {
	const [timeDropdownList, setTimeDropdownList] = useState([]);
	const [patients, setPatients] = useState([]);
	const { isOpen, onOpenChange, onOpen, onClose } = useDisclosure();
	const {
		setAlertDialogDetails,
		newAppointmentModal,
		setNewAppointmentModal,
		refetchArr,
		setRefetchArr,
	} = useAppStore();
	const [selectedDate, setSelectedDate] = useState({});

	// stores error
	const [isErrorDetails, setIsErrorDetails] = useState({
		isError: false,
		message: "",
	});
	useEffect(() => {
		if (newAppointmentModal?.isOpen) {
			onOpen();
		} else {
			onClose();
		}
	}, [newAppointmentModal]);
	// form hook
	const { handleSubmit, setError, reset, control, clearErrors, getValues } = useForm({
		defaultValues: {
			PATIENT_ID: "",

			APPOINTMENT_DATE: today(getLocalTimeZone()), // default date (today)
			APPOINTMENT_TIME: "",
			PURPOSE: "",
		},
	});

	useEffect(() => {
		if (isOpen) {
			reset();
			handleInvalidDate();
			setAlertDialogDetails({});
			setIsErrorDetails({});
		}

		return () => {
			setAlertDialogDetails({}); // clear alert dialog
		};
	}, [isOpen]);

	const handleInvalidDate = (date) => {
		if (isWeekEndDate(date || today(getLocalTimeZone()))) {
			setError("APPOINTMENT_DATE", {
				type: "manual",
				message: "The date must not fall on a weekend.",
			});
		} else {
			clearErrors("APPOINTMENT_DATE");
		}
	};

	useEffect(() => {
		handleGetDate(today(getLocalTimeZone()), false);
		handleGetPatients();
	}, [isOpen]);
	const handleGetDate = async (date, isForm = true) => {
		if (isWeekEndDate(date)) return;

		try {
			const response = await AppointmentsAPIManager.getAppointmentDates({
				APPOINTMENT_DATE: convertDateYYYYMMDD(date),
			});
			const selectedFormDate = new Date(date.year, date.month, date.day);

			setSelectedDate({
				month: months[selectedFormDate.getMonth()],
				day: selectedFormDate.getDate(),
				dayOfTheWeek: days[selectedFormDate.getDay()],
				time: "",
			});
			setTimeDropdownList(response.available_times);
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

	// get patients
	const handleGetPatients = async () => {
		try {
			const response = await PatientsAPIManager.getAllPatients();
			setPatients(response);
		} catch (error) {
			setAlertDialogDetails({
				isOpen: true,
				type: "danger",
				title: "Error!",
				message: error.message,
			});
		}
	};
	// mutation function
	const mutation = useMutation({
		mutationFn: AppointmentsAPIManager.postSharedAppointment,
		onMutate: () => {
			setIsErrorDetails({
				isError: false,
				message: "",
			});
		},
		onSuccess: async (data) => {
			if (newAppointmentModal?.refetch) newAppointmentModal?.refetch();
			if (refetchArr.length) {
				refetchArr.map((item) => item.refetch());
				setRefetchArr([]);
			}
			const date = formatDate(new Date(convertDateYYYYMMDD(getValues("APPOINTMENT_DATE"))));
			const time = getValues("APPOINTMENT_TIME")?.split("-")[0];
			sendEmail({
				type: "notification",
				name: patients.find((patient) => patient.FULLNAME === getValues("PATIENT_ID"))
					.FULLNAME,
				email: patients.find((patient) => patient.FULLNAME === getValues("PATIENT_ID"))
					.EMAIL,

				title: "Appointment Confirmation",
				content: `Your appointment has been set on ${date} at ${time}. Please be at the clinic on or before the given time. `,
			});
			setAlertDialogDetails({
				dialogType: "",
				isOpen: true,
				type: "success",
				title: "Success!",
				message: data.message,

				confirmCallback: () => {
					onClose();
					setNewAppointmentModal({});
				},
			});
			setIsErrorDetails({
				isError: false,
				message: "",
			});
		},
		onError: (error) => {
			setIsErrorDetails({
				isError: true,
				message: error.message,
			});
		},
	});

	// on submit function
	const onSubmit = (data) => {
		data.PATIENT_ID = patients.find((patient) => patient.FULLNAME === data.PATIENT_ID).ID;
		data.APPOINTMENT_DATE = convertDateYYYYMMDD(data.APPOINTMENT_DATE);
		mutation.mutate(data);
	};

	const selectedDateTime = extractTime(selectedDate?.time)?.startTime;
	return (
		<>
			<Modal
				isOpen={isOpen}
				onOpenChange={(e) => {
					onOpenChange(e);
					setNewAppointmentModal({});
				}}
				size="2xl"
				backdrop="blur"
				placement="center"
				classNames={{
					closeButton: "text-white hover:bg-white/5 active:bg-white/10 text-xl",
				}}
			>
				<ModalContent>
					{(onClose) => (
						<form onSubmit={handleSubmit(onSubmit)}>
							<ModalHeader className="flex flex-col gap-1 text-white bg-primary">
								New Appointment
							</ModalHeader>
							<ModalBody>
								<div className="flex flex-col">
									<div className="flex flex-row gap-3 mt-5">
										<div
											style={{ flex: 1 }}
											className="flex flex-col items-center gap-1"
										>
											<div>
												<UserRound className="text-[#2F80ED]" />
											</div>
											<h3 className="text-[#2F80ED] uppercase font-medium mt-2 text-lg">
												Practitioner
											</h3>
											<h4>John Doe</h4>
											<h4 className="font-bold">Dentist</h4>
										</div>
										<div
											style={{ flex: 1 }}
											className="flex flex-col items-center gap-1"
										>
											<div>
												<Clock4 className="text-[#2F80ED]" />
											</div>
											<h3 className="text-[#2F80ED] uppercase font-medium mt-2 text-lg">
												DATE AND TIME
											</h3>
											<h4>
												{selectedDate?.dayOfTheWeek
													? selectedDate.dayOfTheWeek + ","
													: ""}{" "}
												{selectedDate?.day} {selectedDate?.month}
											</h4>
											<h4 className="font-bold">
												{selectedDateTime?.hour
													? selectedDateTime?.hour + ":"
													: ""}
												{selectedDateTime?.minute < 10
													? "0" + selectedDateTime?.minute
													: selectedDateTime?.minute}{" "}
												{selectedDateTime?.meridian}
											</h4>
										</div>
										<div
											style={{ flex: 1 }}
											className="flex flex-col items-center gap-1"
										>
											<div>
												<MapPin className="text-[#2F80ED]" />
											</div>
											<h3 className="text-[#2F80ED] uppercase font-medium mt-2 text-lg">
												LOCATION
											</h3>
											<h4>Mololos, Bulacan</h4>
										</div>
									</div>
									{isErrorDetails.isError && (
										<Alert
											variant="destructive"
											className="flex items-center mb-5 bg-red-50"
										>
											<AlertCircle className="w-4 h-4" />
											<AlertDescription>
												{isErrorDetails.message}
											</AlertDescription>
										</Alert>
									)}
									<div
										className={cn(
											"flex flex-col gap-4 mt-10",
											isErrorDetails.isError && "mt-0"
										)}
									>
										<div className="flex items-center">
											<div style={{ flex: 1 }}>Patient</div>
											<div style={{ flex: 2 }}>
												<Controller
													name="PATIENT_ID"
													control={control}
													rules={{ required: "Patient ID required" }}
													render={({ field, formState: { errors } }) => (
														<Autocomplete
															variant="bordered"
															color="primary"
															radius="sm"
															aria-label="Patient"
															className="w-full bg-white"
															defaultItems={patients}
															placeholder="Search a patient"
															size="lg"
															isInvalid={!!errors.PATIENT_ID}
															errorMessage={
																errors.PATIENT_ID?.message
															}
															selectedKey={field.value}
															onSelectionChange={(value) => {
																field.onChange(value);
															}}
														>
															{(patient) => (
																<AutocompleteItem
																	key={patient.FULLNAME}
																>
																	{patient.FULLNAME}
																</AutocompleteItem>
															)}
														</Autocomplete>
													)}
												/>
											</div>
										</div>
										<div className="flex items-center">
											<div style={{ flex: 1 }}>Date of Appointment</div>
											<div style={{ flex: 2 }}>
												<Controller
													name="APPOINTMENT_DATE"
													control={control}
													rules={{ required: "Date is required" }}
													render={({ field, formState: { errors } }) => (
														<CustomDatePicker
															classNames={{
																label: "text-darkText font-semibold ",
																inputWrapper: "rounded-lg h-full",
																innerWrapper: "h-fit",
															}}
															aria-label="Appointment Date"
															className="max-w-full"
															label={""}
															value={field.value}
															isInvalid={!!errors.APPOINTMENT_DATE}
															errorMessage={
																errors.APPOINTMENT_DATE?.message
															}
															setValue={(value) => {
																field.onChange(value);
															}}
															onChange={(date) => {
																handleGetDate(date);
																handleInvalidDate(date);
															}}
															minValue={today(getLocalTimeZone())}
															isDateUnavailable={isWeekEndDate}
														/>
													)}
												/>
											</div>
										</div>
										<div className="flex items-center">
											<div style={{ flex: 1 }}>Date of Appointment</div>
											<div style={{ flex: 2 }}>
												<Controller
													name="APPOINTMENT_TIME"
													control={control}
													rules={{ required: "Time is required" }}
													render={({ field, formState: { errors } }) => (
														<Select
															{...field}
															aria-label="Appointment Time"
															selectedKeys={[field.value]}
															onChange={(selectedKeys) => {
																setSelectedDate({
																	...selectedDate,
																	time: selectedKeys.target.value,
																});
																field.onChange(selectedKeys);
															}}
															isInvalid={!!errors.APPOINTMENT_TIME}
															errorMessage={
																errors.APPOINTMENT_TIME?.message
															}
															labelPlacement={"outside"}
															placeholder="Select Time"
															size="md"
															variant="bordered"
															color="primary"
															radius="sm"
															className="w-full bg-white"
															classNames={{
																label: "text-darkText font-semibold ",
																inputWrapper: "rounded-lg h-full",
																trigger: "h-[2.75rem]",
															}}
														>
															{timeDropdownList.map((time) => (
																<SelectItem key={time} value={time}>
																	{time}
																</SelectItem>
															))}
														</Select>
													)}
												/>
											</div>
										</div>
										<div className="flex items-center">
											<div style={{ flex: 1 }}>Purpose of Visit</div>
											<div style={{ flex: 2 }}>
												<Controller
													name="PURPOSE"
													control={control}
													rules={{ required: "Purpose is required" }}
													render={({ field, formState: { errors } }) => (
														<Select
															{...field}
															aria-label="Purpose"
															selectedKeys={[field.value]}
															onChange={(selectedKeys) => {
																field.onChange(selectedKeys);
															}}
															isInvalid={!!errors.PURPOSE}
															errorMessage={errors.PURPOSE?.message}
															labelPlacement={"outside"}
															placeholder="Select Purpose"
															variant="bordered"
															color="primary"
															radius="sm"
															className="w-full bg-white"
															classNames={{
																label: "text-darkText font-semibold ",
																inputWrapper: "rounded-lg h-full",
																trigger: "h-[2.75rem]",
															}}
														>
															{purposes.map((purpose) => (
																<SelectItem
																	key={purpose}
																	value={purpose}
																>
																	{purpose}
																</SelectItem>
															))}
														</Select>
													)}
												/>
											</div>
										</div>
										<div className="mt-10">
											<div className="flex gap-4">
												<Bell className="text-gray-500" />
												<div>
													<h5 className="font-bold">
														Send notifications
													</h5>
												</div>
											</div>
											<div>
												<p className="mt-2 text-base">
													Appointment confirmation and reminder messages
													will be automatically sent to clinic Email
													notification settings.
												</p>
											</div>
										</div>
									</div>
								</div>
							</ModalBody>
							<ModalFooter>
								<Button
									variant="light"
									onPress={() => {
										onClose();
										setNewAppointmentModal({});
									}}
								>
									Close
								</Button>
								<Button
									color="primary"
									type="submit"
									// onPress={(e) => {
									// 	onClose();
									// 	setNewAppointmentModal({});
									// }}
								>
									Save
								</Button>
							</ModalFooter>
						</form>
					)}
				</ModalContent>
			</Modal>
		</>
	);
}
