import {
	Modal,
	ModalContent,
	ModalHeader,
	ModalBody,
	ModalFooter,
	Button,
	useDisclosure,
	Input,
	Select,
	SelectItem,
} from "@nextui-org/react";
import { useMutation } from "@tanstack/react-query";
import { useForm, Controller } from "react-hook-form";
import { UserRound, Clock4, MapPin, Bell } from "lucide-react";
import { useState } from "react";
import { useAppStore } from "@/store/zustand";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { useEffect } from "react";

const purposes = [
	"Dental Bonding",
	"Teeth Whitening",
	"Dental Crowns",
	"Bridgework",
	"Invisalign",
	"Dentures",
	"Dental Sealants",
	"Tooth Extractions",
];

export default function AppointmentModal() {
	const { isOpen, onOpenChange, onOpen, onClose } = useDisclosure();
	const { setAlertDialogDetails, newAppointmentModal, setNewAppointmentModal } = useAppStore();
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
	const {
		register,
		handleSubmit,
		control,
		formState: { errors },
	} = useForm({
		defaultValues: {
			PATIENT: "",
			PURPOSE: "",
			APPOINTMENT_STATUS: "",
			APPOINTMENT_TYPE: "",
		},
	});

	// mutation function
	const mutation = useMutation({
		mutationFn: () => {},
		onSuccess: (data) => {
			setAlertDialogDetails({
				isOpen: true,
				type: "success",
				title: "Success!",
				message: data.message,
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
		mutation.mutate(data);
	};
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
				classNames={{
					closeButton: "text-white hover:bg-white/5 active:bg-white/10 text-xl",
				}}
			>
				<ModalContent>
					{(onClose) => (
						<>
							<ModalHeader className="flex flex-col gap-1 text-white bg-primary">
								New Appointment
							</ModalHeader>
							<ModalBody>
								<form onSubmit={handleSubmit(onSubmit)}>
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
													Practitioner
												</h3>
												<h4>John Doe</h4>
												<h4 className="font-bold">Dentist</h4>
												<Button variant="light" className="text-primary">
													Change
												</Button>
											</div>
											<div
												style={{ flex: 1 }}
												className="flex flex-col items-center gap-1"
											>
												<div>
													<MapPin className="text-[#2F80ED]" />
												</div>
												<h3 className="text-[#2F80ED] uppercase font-medium mt-2 text-lg">
													Practitioner
												</h3>
												<h4>John Doe</h4>
												<h4 className="font-bold">Dentist</h4>
												<Button variant="light" className="text-primary">
													Change
												</Button>
											</div>
										</div>
										<div className="flex flex-col gap-6 mt-10">
											<div className="flex items-center">
												<div style={{ flex: 1 }}>Patient</div>
												<div style={{ flex: 2 }}>
													<Input
														{...register("PATIENT", {
															required: "Patient is required",
														})}
														isInvalid={!!errors.PATIENT?.message}
														errorMessage={errors.PATIENT?.message}
														variant="bordered"
														color="primary"
														type="text"
														radius="sm"
														placeholder="Enter patient name"
														classNames={{
															inputWrapper: "h-full p-2",
															mainWrapper: "h-full",
															input: "ml-3",
														}}
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
														render={({
															field,
															formState: { errors },
														}) => (
															<Select
																{...field}
																selectedKeys={[field.value]}
																onChange={(selectedKeys) => {
																	field.onChange(selectedKeys);
																}}
																isInvalid={!!errors.PURPOSE}
																errorMessage={
																	errors.PURPOSE?.message
																}
																labelPlacement={"outside"}
																placeholder="Select Purpose"
																variant="bordered"
																color="primary"
																radius="sm"
																className="w-full bg-white"
																classNames={{
																	label: "text-darkText font-semibold ",
																	inputWrapper:
																		"rounded-lg h-full",
																	trigger: "h-[2rem]",
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
											<div className="flex items-center">
												<div style={{ flex: 1 }}>Appointment Status</div>
												<div style={{ flex: 2 }} className="w-full">
													<Controller
														name="APPOINTMENT_STATUS"
														control={control}
														rules={{
															required:
																"Appointment Status is required",
														}}
														render={({
															field,
															formState: { errors },
														}) => (
															<ToggleGroup
																{...field}
																onValueChange={(value) =>
																	field.onChange(value)
																}
																type="single"
																className="items-start justify-start gap-4"
															>
																<ToggleGroupItem
																	value="confirmation required"
																	className={`${
																		field.value ===
																		"confirmation required"
																			? "data-[state=on]:bg-primary data-[state=on]:text-white"
																			: "bg-gray-100"
																	}`}
																	aria-label="Toggle bold"
																>
																	Confirmation Required
																</ToggleGroupItem>
																<ToggleGroupItem
																	value="confirmed"
																	className={`${
																		field.value === "confirmed"
																			? "data-[state=on]:bg-primary data-[state=on]:text-white"
																			: "bg-gray-100"
																	}`}
																	aria-label="Toggle italic"
																>
																	Confirmed
																</ToggleGroupItem>
															</ToggleGroup>
														)}
													/>
												</div>
											</div>
											<div className="flex items-center">
												<div style={{ flex: 1 }}>Appointment Type</div>
												<div style={{ flex: 2 }} className="w-full">
													<Controller
														name="APPOINTMENT_TYPE"
														control={control}
														rules={{
															required:
																"Appointment Type is required",
														}}
														render={({
															field,
															formState: { errors },
														}) => (
															<ToggleGroup
																{...field}
																onValueChange={(value) =>
																	field.onChange(value)
																}
																type="single"
																className="items-start justify-start gap-4"
															>
																<ToggleGroupItem
																	value="first time"
																	className={`${
																		field.value === "first time"
																			? "data-[state=on]:bg-primary data-[state=on]:text-white"
																			: "bg-gray-100"
																	}`}
																	aria-label="Toggle bold"
																>
																	First time
																</ToggleGroupItem>
																<ToggleGroupItem
																	value="follow up visit"
																	className={`${
																		field.value ===
																		"follow up visit"
																			? "data-[state=on]:bg-primary data-[state=on]:text-white"
																			: "bg-gray-100"
																	}`}
																	aria-label="Toggle italic"
																>
																	Follow up visit
																</ToggleGroupItem>
															</ToggleGroup>
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
														Appointment confirmation and reminder
														messages will be automatically sent to
														clinic SMS notification settings.
													</p>
												</div>
											</div>
										</div>
									</div>
								</form>
							</ModalBody>
							<ModalFooter>
								<Button
									variant="light"
									onPress={(e) => {
										onClose();
										setNewAppointmentModal({});
									}}
								>
									Close
								</Button>
								<Button
									color="primary"
									onPress={(e) => {
										onClose();
										setNewAppointmentModal({});
									}}
								>
									Begin Appointment
								</Button>
								<Button
									variant="bordered"
									color="primary"
									onPress={(e) => {
										onClose();
										setNewAppointmentModal({});
									}}
								>
									Save
								</Button>
							</ModalFooter>
						</>
					)}
				</ModalContent>
			</Modal>
		</>
	);
}
