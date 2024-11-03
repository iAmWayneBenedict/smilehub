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
	Textarea,
	Divider,
	Link,
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
import { Input } from "@/components/ui/input";
import { Label } from "@radix-ui/react-label";
import { Separator } from "@/components/ui/separator";
import PatientsAPIManager from "@/services/api/managers/patients/PatientsAPIManager";

export default function ProgressNoteModal() {
	const { isOpen, onOpen, onClose } = useDisclosure();
	const { addProgressNoteModal, setAddProgressNoteModal, setAlertDialogDetails } = useAppStore();
	const [timeDropdownList, setTimeDropdownList] = useState([]);
	const [file, setFile] = useState(null);
	const [signatureFile, setSignatureFile] = useState(null);
	const currentUser = location.pathname.includes("admin") ? "admin" : "staff";
	useEffect(() => {
		if (addProgressNoteModal.isOpen) {
			onOpen();
			if (addProgressNoteModal.data && addProgressNoteModal.data.DATE) {
				// handleGetSelectedTimes();
				reset({
					...addProgressNoteModal.data,
					SIGNATURE: "",
					X_RAY_FILE: "",
					DATE:
						parseDate(convertDateYYYYMMDD(addProgressNoteModal.data.DATE)) ||
						today(getLocalTimeZone()),
				});
				setFile(
					new File(
						[
							convertToBlob(
								`${import.meta.env.VITE_SERVER_URL}/uploads/${
									addProgressNoteModal.data.X_RAY_FILE
								}`
							),
						],
						addProgressNoteModal.data.X_RAY_FILE,
						{
							type: "image/png",
						}
					)
				);

				setSignatureFile(
					new File(
						[
							convertToBlob(
								`${import.meta.env.VITE_SERVER_URL}/uploads/${
									addProgressNoteModal.data.SIGNATURE
								}`
							),
						],
						addProgressNoteModal.data.SIGNATURE,
						{
							type: "image/png",
						}
					)
				);
			} else {
				reset({
					DATE: today(getLocalTimeZone()),
					PATIENT_ID: "",
					COMPLAINT: "",
					HISTORY_UPDATE: "",
					DIAGNOSIS: "",
					TREATMENT_PLAN: "",
					X_RAY_FILE: "",
					PROCEDURES: "",
					MATERIALS_USED: "",
					INSTRUCTION: "",
					RESPONSE: "",
					SIGNATURE: "",
				});
			}
		} else {
			onClose();
			reset();
		}
	}, [addProgressNoteModal]);
	const convertToBlob = async (url) => {
		// Fetch the file from the server
		const response = await fetch(url);
		const blob = await response.blob(); // Convert the response to a Blob

		return blob;
	};
	// Form hook
	const {
		handleSubmit,
		control,
		reset,
		formState: { errors },
	} = useForm({
		defaultValues: useMemo(() => {
			if (addProgressNoteModal?.data?.COMPLAINT) {
				return {
					...addProgressNoteModal.data,
					SIGNATURE: "",
					X_RAY_FILE: "",
					DATE:
						parseDate(convertDateYYYYMMDD(addProgressNoteModal.data.DATE)) ||
						today(getLocalTimeZone()),
				};
			} else {
				return {
					DATE: today(getLocalTimeZone()),
					PATIENT_ID: "",
					COMPLAINT: "",
					HISTORY_UPDATE: "",
					DIAGNOSIS: "",
					TREATMENT_PLAN: "",
					X_RAY_FILE: "",
					PROCEDURES: "",
					MATERIALS_USED: "",
					INSTRUCTION: "",
					RESPONSE: "",
					SIGNATURE: "",
				};
			}
		}, [addProgressNoteModal.isOpen]),
	});
	useEffect(() => {
		// handleGetDate(today(getLocalTimeZone()), false);
		return () => {
			reset();
		};
	}, [addProgressNoteModal]);

	const handleGetDate = async (date, isForm = true) => {
		if (isWeekEndDate(date)) return;
		try {
			const response = await AppointmentsAPIManager.getAppointmentDates({
				DATE: convertDateYYYYMMDD(date),
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
		mutationFn: PatientsAPIManager.postAddProgressNote,
		onSuccess: () => {
			// addProgressNoteModal.refetch();

			setAlertDialogDetails({
				isOpen: true,
				type: "success",
				title: "Success!",
				message: "Progress Note added successfully!",
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
	const updateMutation = useMutation({
		mutationFn: PatientsAPIManager.postUpdateProgressNotes,
		onSuccess: () => {
			// addProgressNoteModal.refetch();

			setAlertDialogDetails({
				isOpen: true,
				type: "success",
				title: "Success!",
				message: "Progress Note updated successfully!",
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
		if (!addProgressNoteModal?.data?.ID) {
			data.DATE = convertDateYYYYMMDD(data.DATE);
			data.PATIENT_ID = addProgressNoteModal?.data?.PATIENT_ID;
			data.X_RAY_FILE = file;
			data.SIGNATURE = signatureFile;

			const formData = new FormData();
			for (const key in data) {
				formData.append(key, data[key]);
			}
			mutation.mutate(formData);
		} else {
			data.DATE = convertDateYYYYMMDD(data.DATE);
			data.PATIENT_ID = addProgressNoteModal?.data?.PATIENT_ID;
			data.X_RAY_FILE = file;
			data.SIGNATURE = signatureFile;

			const formData = new FormData();
			for (const key in data) {
				formData.append(key, data[key]);
			}
			updateMutation.mutate(formData);
		}
	};
	return (
		<Modal
			isOpen={isOpen}
			onClose={() => {
				onClose();
				setAddProgressNoteModal({});
				reset();
			}}
			placement="top"
			backdrop="blur"
			size="5xl"
		>
			<ModalContent>
				{(onClose) => (
					<form encType="multipart/form-data" onSubmit={handleSubmit(onSubmit)}>
						<ModalHeader className="flex flex-col gap-1">
							{addProgressNoteModal.title}
						</ModalHeader>
						<ModalBody>
							<div className="flex flex-col gap-5 md:flex-row">
								<div style={{ flex: 1 }} className="flex flex-col gap-2">
									<Controller
										name="DATE"
										control={control}
										rules={{ required: "Date is required" }}
										render={({ field, formState: { errors } }) => (
											<CustomDatePicker
												value={field.value}
												isInvalid={!!errors.DATE}
												errorMessage={errors.DATE?.message}
												label="Date of Visit"
												setValue={(value) => {
													field.onChange(value);
												}}
												classNames={{
													innerWrapper: "h-12",
													label: "text-darkText font-semibold text-base",
												}}
												isDateUnavailable={isWeekEndDate}
												onChange={handleGetDate}
												isReadOnly={currentUser === "staff"}
											/>
										)}
									/>
									<Controller
										name="COMPLAINT"
										control={control}
										rules={{
											required: "Patient’s Chief Complaint (CC) is required",
										}}
										render={({ field, formState: { errors } }) => (
											<Textarea
												value={field.value}
												onValueChange={(value) => {
													field.onChange(value);
												}}
												isReadOnly={currentUser === "staff"}
												isInvalid={!!errors.COMPLAINT}
												errorMessage={errors.COMPLAINT?.message}
												variant={"bordered"}
												label="Patient’s Chief Complaint (CC)"
												radius="sm"
												size="lg"
												color="primary"
												labelPlacement="outside"
												classNames={{
													label: "text-darkText font-semibold text-base",
													inputWrapper: "rounded-lg h-full bg-white",
													// mainWrapper: "h-[4rem]",
												}}
												placeholder=" "
												className="col-span-12 mb-6 md:col-span-6 md:mb-0"
											/>
										)}
									/>
									<Controller
										name="HISTORY_UPDATE"
										control={control}
										rules={{
											required: "Medical History Update is required",
										}}
										render={({ field, formState: { errors } }) => (
											<Textarea
												value={field.value}
												onValueChange={(value) => {
													field.onChange(value);
												}}
												isReadOnly={currentUser === "staff"}
												isInvalid={!!errors.HISTORY_UPDATE}
												errorMessage={errors.HISTORY_UPDATE?.message}
												variant={"bordered"}
												label="Medical History Update"
												radius="sm"
												size="lg"
												color="primary"
												labelPlacement="outside"
												classNames={{
													label: "text-darkText font-semibold text-base",
													inputWrapper: "rounded-lg h-full bg-white",
													// mainWrapper: "h-[4rem]",
												}}
												placeholder=" "
												className="col-span-12 mb-6 md:col-span-6 md:mb-0"
											/>
										)}
									/>

									<Controller
										name="DIAGNOSIS"
										control={control}
										rules={{
											required: "Diagnosis is required",
										}}
										render={({ field, formState: { errors } }) => (
											<Textarea
												value={field.value}
												onValueChange={(value) => {
													field.onChange(value);
												}}
												isReadOnly={currentUser === "staff"}
												isInvalid={!!errors.DIAGNOSIS}
												errorMessage={errors.DIAGNOSIS?.message}
												variant={"bordered"}
												label="Diagnosis"
												radius="sm"
												size="lg"
												color="primary"
												labelPlacement="outside"
												classNames={{
													label: "text-darkText font-semibold text-base",
													inputWrapper: "rounded-lg h-full bg-white",
													// mainWrapper: "h-[4rem]",
												}}
												placeholder=" "
												className="col-span-12 mb-6 md:col-span-6 md:mb-0"
											/>
										)}
									/>
									<Controller
										name="TREATMENT_PLAN"
										control={control}
										rules={{
											required: "Treatment Plan is required",
										}}
										render={({ field, formState: { errors } }) => (
											<Textarea
												value={field.value}
												onValueChange={(value) => {
													field.onChange(value);
												}}
												isReadOnly={currentUser === "staff"}
												isInvalid={!!errors.TREATMENT_PLAN}
												errorMessage={errors.TREATMENT_PLAN?.message}
												variant={"bordered"}
												label="Treatment Plan"
												radius="sm"
												size="lg"
												color="primary"
												labelPlacement="outside"
												classNames={{
													label: "text-darkText font-semibold text-base",
													inputWrapper: "rounded-lg h-full bg-white",
													// mainWrapper: "h-[4rem]",
												}}
												placeholder=" "
												className="col-span-12 mb-6 md:col-span-6 md:mb-0"
											/>
										)}
									/>
								</div>
								<div style={{ flex: 1 }} className="flex flex-col gap-2">
									<div>
										<Controller
											name="X_RAY_FILE"
											control={control}
											rules={{
												required: addProgressNoteModal?.data?.X_RAY_FILE
													? false
													: "Radiographs (X-rays) is required",
											}}
											render={({ field, formState: { errors } }) => (
												<div className="grid items-center w-full gap-1">
													<Label htmlFor="picture" className="font-bold">
														Radiographs (X-rays)
													</Label>
													<Input
														value={field.value}
														onChange={(e) => {
															setFile(e.target.files[0]);
															field.onChange(e.target.value);
														}}
														isReadOnly={currentUser === "staff"}
														onClick={(e) => {
															if (currentUser === "staff") {
																e.preventDefault();
															}
														}}
														id="picture"
														type="file"
														accept="image/*"
														className="h-12 shadow-sm border-default-200 border-medium"
													/>
													{errors.X_RAY_FILE && (
														<small className="text-red-500">
															{errors.TREATMENT_PLAN?.message}
														</small>
													)}
												</div>
											)}
										/>
										{addProgressNoteModal?.data?.X_RAY_FILE && (
											<small>
												Current file:{" "}
												<p className="break-all">
													{addProgressNoteModal?.data?.X_RAY_FILE}{" "}
												</p>
												<Link
													href={
														import.meta.env.VITE_SERVER_URL +
														"/uploads/" +
														addProgressNoteModal?.data?.X_RAY_FILE
													}
													className="text-sm underline"
													target="_blank"
												>
													View
												</Link>
											</small>
										)}
									</div>
									<Controller
										name="PROCEDURES"
										control={control}
										rules={{
											required: "Procedures Performed is required",
										}}
										render={({ field, formState: { errors } }) => (
											<Textarea
												value={field.value}
												onValueChange={(value) => {
													field.onChange(value);
												}}
												isReadOnly={currentUser === "staff"}
												isInvalid={!!errors.PROCEDURES}
												errorMessage={errors.PROCEDURES?.message}
												variant={"bordered"}
												label="Procedures Performed"
												radius="sm"
												size="lg"
												color="primary"
												labelPlacement="outside"
												classNames={{
													label: "text-darkText font-semibold text-base",
													inputWrapper: "rounded-lg h-full bg-white",
													// mainWrapper: "h-[4rem]",
												}}
												placeholder=" "
												className="col-span-12 mb-6 md:col-span-6 md:mb-0"
											/>
										)}
									/>
									<Controller
										name="MATERIALS_USED"
										control={control}
										rules={{
											required: "Materials Used is required",
										}}
										render={({ field, formState: { errors } }) => (
											<Textarea
												value={field.value}
												onValueChange={(value) => {
													field.onChange(value);
												}}
												isReadOnly={currentUser === "staff"}
												isInvalid={!!errors.MATERIALS_USED}
												errorMessage={errors.MATERIALS_USED?.message}
												variant={"bordered"}
												label="Materials Used"
												radius="sm"
												size="lg"
												color="primary"
												labelPlacement="outside"
												classNames={{
													label: "text-darkText font-semibold text-base",
													inputWrapper: "rounded-lg h-full bg-white",
													// mainWrapper: "h-[4rem]",
												}}
												placeholder=" "
												className="col-span-12 mb-6 md:col-span-6 md:mb-0"
											/>
										)}
									/>
									<Controller
										name="INSTRUCTION"
										control={control}
										rules={{
											required: "Post-Op Instruction is required",
										}}
										render={({ field, formState: { errors } }) => (
											<Textarea
												value={field.value}
												onValueChange={(value) => {
													field.onChange(value);
												}}
												isReadOnly={currentUser === "staff"}
												isInvalid={!!errors.INSTRUCTION}
												errorMessage={errors.INSTRUCTION?.message}
												variant={"bordered"}
												label="Post-Op Instruction"
												radius="sm"
												size="lg"
												color="primary"
												labelPlacement="outside"
												classNames={{
													label: "text-darkText font-semibold text-base",
													inputWrapper: "rounded-lg h-full bg-white",
													// mainWrapper: "h-[4rem]",
												}}
												placeholder=" "
												className="col-span-12 mb-6 md:col-span-6 md:mb-0"
											/>
										)}
									/>
									<Controller
										name="RESPONSE"
										control={control}
										rules={{
											required: "Patient’s Response is required",
										}}
										render={({ field, formState: { errors } }) => (
											<Textarea
												value={field.value}
												onValueChange={(value) => {
													field.onChange(value);
												}}
												isReadOnly={currentUser === "staff"}
												isInvalid={!!errors.RESPONSE}
												errorMessage={errors.RESPONSE?.message}
												variant={"bordered"}
												label="Patient’s Response"
												radius="sm"
												size="lg"
												color="primary"
												labelPlacement="outside"
												classNames={{
													label: "text-darkText font-semibold text-base",
													inputWrapper: "rounded-lg h-full bg-white",
													// mainWrapper: "h-[4rem]",
												}}
												placeholder=" "
												className="col-span-12 mb-6 md:col-span-6 md:mb-0"
											/>
										)}
									/>
									<div>
										<Controller
											name="SIGNATURE"
											control={control}
											rules={{
												required: addProgressNoteModal?.data?.X_RAY_FILE
													? false
													: "Signature is required",
											}}
											render={({ field, formState: { errors } }) => (
												<div className="grid items-center w-full gap-1">
													<Label htmlFor="picture" className="font-bold">
														Signature
													</Label>
													<Input
														value={field.value}
														onChange={(e) => {
															setSignatureFile(e.target.files[0]);
															field.onChange(e.target.value);
														}}
														isReadOnly={currentUser === "staff"}
														onClick={(e) => {
															if (currentUser === "staff") {
																e.preventDefault();
															}
														}}
														id="picture"
														type="file"
														accept="image/*"
														className="h-12 shadow-sm border-default-200 border-medium"
													/>
													{errors.SIGNATURE && (
														<small className="text-red-500">
															{errors.TREATMENT_PLAN?.message}
														</small>
													)}
												</div>
											)}
										/>
										{addProgressNoteModal?.data?.SIGNATURE && (
											<small>
												Current file:{" "}
												<p className="break-all">
													{addProgressNoteModal?.data?.SIGNATURE}{" "}
												</p>
												<Link
													href={
														import.meta.env.VITE_SERVER_URL +
														"/uploads/" +
														addProgressNoteModal?.data?.SIGNATURE
													}
													className="text-sm underline"
													target="_blank"
												>
													View
												</Link>
											</small>
										)}
									</div>
								</div>
							</div>
						</ModalBody>
						<ModalFooter>
							<Button
								color="light"
								variant="flat"
								onPress={() => {
									onClose();
									reset();
									setAddProgressNoteModal({});
								}}
							>
								Close
							</Button>
							<Button
								color="primary"
								type="submit"
								isLoading={mutation.isPending}
								isDisabled={currentUser === "staff"}
							>
								{mutation.isPending ? "Loading..." : "Save"}
							</Button>
						</ModalFooter>
					</form>
				)}
			</ModalContent>
		</Modal>
	);
}
