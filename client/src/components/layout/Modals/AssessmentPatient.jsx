import {
	Modal,
	ModalContent,
	ModalHeader,
	ModalBody,
	ModalFooter,
	Button,
	useDisclosure,
	Checkbox,
	Input,
	Link,
	Select,
	SelectItem,
	Image,
	CheckboxGroup,
} from "@nextui-org/react";
import { useAppStore } from "@/store/zustand.js";
import { useEffect, useState } from "react";
import { getLocalTimeZone, today } from "@internationalized/date";
import { Controller, useForm } from "react-hook-form";
import AssessmentSample from "../../../assets/images/assessment-sample.png";
import { useMutation } from "@tanstack/react-query";
import PatientsAPIManager from "@/services/api/managers/patients/PatientsAPIManager";
import { useMemo } from "react";
import { checkboxSetterSingleItem } from "@/lib/utils";

export default function AssessmentPatient() {
	const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();
	const [assessmentData, setAssessmentData] = useState({});
	const currentUser = location.pathname.includes("admin") ? "admin" : "staff";
	const { assessmentPatientModal, setAssessmentPatientModal, setAlertDialogDetails } =
		useAppStore();

	// Form hook
	const {
		handleSubmit,
		control,
		watch,
		reset,
		formState: { errors },
	} = useForm({
		defaultValues: useMemo(() => {
			if (assessmentData?.message) {
				return {
					TOOTH_NO: "",
					COLOR: "",
					TEXTURE: [],
					GUM_HEALTH: [],
					PRESENCE_OF_DECAY: "",
					CAVITIES: "",
					SENSITIVITY: "",
					MOBILITY: [],
					PREVIOUS_TREATMENT: [],
				};
			}

			assessmentData.PRESENCE_OF_DECAY =
				assessmentData.PRESENCE_OF_DECAY === "yes" ? true : false;
			assessmentData.CAVITIES = assessmentData.CAVITIES === "yes" ? true : false;
			assessmentData.SENSITIVITY = assessmentData.SENSITIVITY === "yes" ? true : false;
			assessmentData.GUM_HEALTH = [assessmentData.GUM_HEALTH];
			assessmentData.PREVIOUS_TREATMENT = [assessmentData.PREVIOUS_TREATMENT];
			assessmentData.TEXTURE = [assessmentData.TEXTURE];
			assessmentData.MOBILITY = [assessmentData.MOBILITY];
			return assessmentData;
		}, [assessmentData]),
	});

	const [timeDropdownList, setTimeDropdownList] = useState([]);
	useEffect(() => {
		if (assessmentPatientModal.isOpen) {
			onOpen();
		} else {
			onClose();
			reset();
		}
	}, [assessmentPatientModal]);

	const toothNum = watch("TOOTH_NO");
	useEffect(() => {
		if (!assessmentPatientModal.isOpen) return;
		getMutation.mutate({
			PATIENT_ID: assessmentPatientModal.data?.id,
			TOOTH_NO: toothNum || "",
		});
	}, [toothNum, assessmentPatientModal]);

	const getMutation = useMutation({
		mutationFn: PatientsAPIManager.getAssessment,
		onSuccess: (data) => {
			setAssessmentData(data);

			data.PRESENCE_OF_DECAY = data.PRESENCE_OF_DECAY === "yes" ? true : false;
			data.CAVITIES = data.CAVITIES === "yes" ? true : false;
			data.SENSITIVITY = data.SENSITIVITY === "yes" ? true : false;
			data.GUM_HEALTH = [data.GUM_HEALTH];
			data.PREVIOUS_TREATMENT = [data.PREVIOUS_TREATMENT];
			data.TEXTURE = [data.TEXTURE];
			data.MOBILITY = [data.MOBILITY];

			reset(data);
		},

		onError: (error) => {
			reset({
				TOOTH_NO: toothNum || "",
				COLOR: "",
				TEXTURE: [],
				GUM_HEALTH: [],
				PRESENCE_OF_DECAY: "",
				CAVITIES: "",
				SENSITIVITY: "",
				MOBILITY: [],
				PREVIOUS_TREATMENT: [],
			});
		},
	});

	const addMutation = useMutation({
		mutationFn: PatientsAPIManager.postAddAssessment,
		onSuccess: (data) => {
			setAlertDialogDetails({
				isOpen: true,
				type: "success",
				title: "Success",
				message: "Assessment added successfully",
			});
		},
		onError: (error) => {
			console.log(error);
			setAlertDialogDetails({
				isOpen: true,
				type: "danger",
				title: "Error",
				message: error.message,
			});
		},
	});

	const onSubmit = (data) => {
		data.PATIENT_ID = assessmentPatientModal.data?.id;

		data.PRESENCE_OF_DECAY = data.PRESENCE_OF_DECAY ? "yes" : "no";
		data.CAVITIES = data.CAVITIES ? "yes" : "no";
		data.SENSITIVITY = data.SENSITIVITY ? "yes" : "no";
		data.DATETIME = new Date().toISOString();
		data.GUM_HEALTH = data.GUM_HEALTH[0];
		data.PREVIOUS_TREATMENT = data.PREVIOUS_TREATMENT[0];
		data.TEXTURE = data.TEXTURE[0];
		data.MOBILITY = data.MOBILITY[0];

		if (!assessmentPatientModal?.data?.TOOTH_NO) {
			addMutation.mutate(data);
		}
	};
	return (
		<Modal
			isOpen={isOpen}
			aria-label="Assessment Patient Modal"
			size="5xl"
			onClose={() => {
				onClose();
				setAssessmentPatientModal({ isOpen: false });
			}}
			placement="top-center"
			backdrop="blur"
		>
			<ModalContent>
				{(onClose) => (
					<form onSubmit={handleSubmit(onSubmit)}>
						<ModalHeader className="flex flex-col gap-1">
							{assessmentPatientModal.title || "Assessment"}
						</ModalHeader>
						<ModalBody>
							<div className="flex flex-col md:flex-row gap-6 md:gap-24 ~mx-4/10">
								<div style={{ flex: 1 }} className="flex flex-col gap-6">
									<Controller
										name="TOOTH_NO"
										control={control}
										rules={{ required: "Tooth number is required" }}
										render={({ field, formState: { errors } }) => (
											<Select
												{...field}
												aria-label="Tooth Number Select"
												selectedKeys={[field.value]}
												onChange={(selectedKeys) => {
													field.onChange(selectedKeys);
												}}
												isDisabled={currentUser === "staff"}
												disallowEmptySelection
												textValue="tooth number"
												isInvalid={!!errors.TOOTH_NO}
												errorMessage={errors.TOOTH_NO?.message}
												labelPlacement={"outside"}
												placeholder="Select Tooth number"
												label="Tooth number"
												size="lg"
												variant="bordered"
												color="primary"
												className="w-full bg-white"
												radius="sm"
												classNames={{
													label: "text-darkText font-semibold text-sm pb-1",
													inputWrapper: "h-full",
												}}
											>
												{Array.from({ length: 32 }).map((_, number) => (
													<SelectItem
														key={number + 1}
														value={number + 1}
														textValue={"#" + (number + 1)}
													>
														#{number + 1}
													</SelectItem>
												))}
											</Select>
										)}
									/>
									<Controller
										name="COLOR"
										control={control}
										rules={{ required: "Treatment is required" }}
										render={({ field, formState: { errors } }) => (
											<Select
												{...field}
												aria-label="Color Select"
												selectedKeys={[field.value]}
												onChange={(selectedKeys) => {
													field.onChange(selectedKeys);
												}}
												textValue="color"
												isDisabled={
													!colors?.length || currentUser === "staff"
												}
												isInvalid={!!errors.COLOR}
												errorMessage={errors.COLOR?.message}
												labelPlacement={"outside"}
												placeholder="Select treatment"
												label="Treatment"
												size="lg"
												variant="bordered"
												color="primary"
												className="w-full bg-white"
												radius="sm"
												classNames={{
													label: "text-darkText font-semibold text-sm pb-1",
													inputWrapper: "h-full",
												}}
											>
												{colors.map((color) => (
													<SelectItem
														key={color}
														value={color}
														textValue={color}
													>
														{color}
													</SelectItem>
												))}
											</Select>
										)}
									/>
									<div className="flex flex-col justify-between gap-6 md:gap-0 md:flex-row">
										<div className="flex flex-col gap-5">
											<div>
												<Controller
													name="TEXTURE"
													control={control}
													rules={{ required: "Texture is required" }}
													render={({ field, formState: { errors } }) => (
														<CheckboxGroup
															aria-label="Texture Checkboxes"
															label="Texture"
															color="primary"
															value={field.value}
															isDisabled={currentUser === "staff"}
															onValueChange={(value) =>
																field.onChange(
																	checkboxSetterSingleItem(value)
																)
															}
															isInvalid={!!errors.TEXTURE}
															errorMessage={errors.TEXTURE?.message}
														>
															<Checkbox value="Smooth">
																Smooth
															</Checkbox>
															<Checkbox value="Rough">Rough</Checkbox>
															<Checkbox value="Pitted">
																Pitted
															</Checkbox>
															<Checkbox value="Cracked">
																Cracked
															</Checkbox>
														</CheckboxGroup>
													)}
												/>
											</div>
											<div className="flex flex-col gap-5">
												<Controller
													name="PRESENCE_OF_DECAY"
													control={control}
													render={({ field, formState: { errors } }) => (
														<div className="flex gap-5">
															<h5>Presence of Decay</h5>
															<Checkbox
																isSelected={field.value}
																onValueChange={(value) =>
																	field.onChange(value)
																}
																isDisabled={currentUser === "staff"}
															>
																Yes
															</Checkbox>
														</div>
													)}
												/>
												<Controller
													name="CAVITIES"
													control={control}
													render={({ field, formState: { errors } }) => (
														<div className="flex gap-5">
															<h5>Cavities</h5>
															<Checkbox
																isSelected={field.value}
																onValueChange={(value) =>
																	field.onChange(value)
																}
																isDisabled={currentUser === "staff"}
															>
																Yes
															</Checkbox>
														</div>
													)}
												/>
												<Controller
													name="SENSITIVITY"
													control={control}
													render={({ field, formState: { errors } }) => (
														<div className="flex gap-5">
															<h5>Sensitivity</h5>
															<Checkbox
																isSelected={field.value}
																onValueChange={(value) =>
																	field.onChange(value)
																}
																isDisabled={currentUser === "staff"}
															>
																Yes
															</Checkbox>
														</div>
													)}
												/>
											</div>
										</div>
										<div className="flex flex-col gap-5">
											<Controller
												name="GUM_HEALTH"
												control={control}
												rules={{ required: "Gum Health is required" }}
												render={({ field, formState: { errors } }) => (
													<CheckboxGroup
														aria-label="Gum Health Checkboxes"
														label="Gum Health"
														color="primary"
														value={field.value}
														isDisabled={currentUser === "staff"}
														onValueChange={(value) =>
															field.onChange(
																checkboxSetterSingleItem(value)
															)
														}
														isInvalid={!!errors.GUM_HEALTH}
														errorMessage={errors.GUM_HEALTH?.message}
													>
														<Checkbox value="Healthy">Healthy</Checkbox>
														<Checkbox value="Inflamed">
															Inflamed
														</Checkbox>
														<Checkbox value="Bleeding">
															Bleeding
														</Checkbox>
														<Checkbox value="Receding">
															Receding
														</Checkbox>
													</CheckboxGroup>
												)}
											/>
											<Controller
												name="MOBILITY"
												control={control}
												rules={{ required: "Mobility is required" }}
												render={({ field, formState: { errors } }) => (
													<CheckboxGroup
														aria-label="Mobility Checkboxes"
														label="Mobility"
														color="primary"
														value={field.value}
														isDisabled={currentUser === "staff"}
														onValueChange={(value) =>
															field.onChange(
																checkboxSetterSingleItem(value)
															)
														}
														isInvalid={!!errors.MOBILITY}
														errorMessage={errors.MOBILITY?.message}
													>
														<Checkbox value="Stable">Stable</Checkbox>
														<Checkbox value="Slightly Loose">
															Slightly Loose
														</Checkbox>
														<Checkbox value="Moderately Loose">
															Moderately Loose
														</Checkbox>
													</CheckboxGroup>
												)}
											/>
										</div>
									</div>
								</div>
								<div style={{ flex: 1 }} className="flex flex-col gap-0 md:gap-16">
									<div style={{ flex: 1 }}></div>
									<div style={{ flex: 2 }}>
										<Controller
											name="PREVIOUS_TREATMENT"
											control={control}
											rules={{
												required: "Previous treatment is required",
											}}
											render={({ field, formState: { errors } }) => (
												<CheckboxGroup
													aria-label="Previous treatment Checkboxes"
													label="Previous treatment"
													color="primary"
													value={field.value}
													isDisabled={currentUser === "staff"}
													onValueChange={(value) =>
														field.onChange(
															checkboxSetterSingleItem(value)
														)
													}
													isInvalid={!!errors.PREVIOUS_TREATMENT}
													errorMessage={
														errors.PREVIOUS_TREATMENT?.message
													}
												>
													<Checkbox value="None">None</Checkbox>
													<Checkbox value="Filing">Filing</Checkbox>
													<Checkbox value="Crown">Crown</Checkbox>
													<Checkbox value="Root Canal">
														Root Canal
													</Checkbox>
													<Checkbox value="Extraction">
														Extraction
													</Checkbox>
												</CheckboxGroup>
											)}
										/>
									</div>
								</div>
							</div>
						</ModalBody>
						<ModalFooter>
							<Button color="light" variant="flat" onPress={onClose}>
								Close
							</Button>
							<Button
								type="submit"
								color="primary"
								isDisabled={currentUser === "staff"}
							>
								Save
							</Button>
						</ModalFooter>
					</form>
				)}
			</ModalContent>
		</Modal>
	);
}

const colors = [
	"Prophylaxis",
	"Fluoride Application",
	"Dental Sealants",
	"Composite Filling",
	"Amalgam Filling",
	"Inlay Restoration",
	"Onlay Restoration",
	"Filling Replacement",
	"Marginal Repair",
	"Restoration Resealing",
	"Pulpectomy",
	"Canal Debridement",
	"Apical Seal Placement",
	"Dental Implant Placement",
	"Fixed Bridge Placement",
	"Removable Partial Denture",
	"Surgical Extraction",
	"Orthodontic Exposure and Alignment",
	"Operculectomy",
	"Crown Cementation",
	"Crown Replacement",
	"Crown Adjustment",
	"Dental Bonding",
	"Root Canal with Post and Core",
	"Simple Extraction",
	"Alveolar Ridge Preservation",
	"Implant Placement Surgery",
	"Abutment Connection",
	"Prosthetic Crown Placement",
];
