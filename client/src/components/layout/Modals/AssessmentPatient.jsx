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
import { getLocalTimeZone, today, isWeekend, CalendarDate } from "@internationalized/date";
import { Controller, useForm } from "react-hook-form";
import { convertDateYYYYMMDD, isWeekEndDate } from "@/services/api/utils";
import AppointmentsAPIManager from "@/services/api/managers/appointments/AppointmentsAPIManager";
import { useMutation } from "@tanstack/react-query";
import CustomDatePicker from "@/components/ui/DatePicker";
import AssessmentSample from "../../../assets/images/assessment-sample.png";

export default function AssessmentPatient() {
	const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();
	const { assessmentPatientModal, setAssessmentPatientModal, setAlertDialogDetails } =
		useAppStore();

	const [timeDropdownList, setTimeDropdownList] = useState([]);
	useEffect(() => {
		if (assessmentPatientModal.isOpen) {
			onOpen();
		} else {
			onClose();
		}
	}, [assessmentPatientModal]);

	const checkboxSetterSingleItem = (value) => {
		return [value[value.length - 1]];
	};

	// Form hook
	const {
		register,
		handleSubmit,
		control,
		formState: { errors },
	} = useForm({
		defaultValues: {
			APPOINTMENT_DATE: today(getLocalTimeZone()), // default date (today)
			APPOINTMENT_TIME: "",
			TEXTURE: [],
			PRESENCE_OF_DECAY: false,
			CAVITIES: false,
			SENSITIVITY: false,
			GUM_HEALTH: [],
			MOBILITY: [],
			PREVIOUS_TREATMENT: [],
		},
	});
	return (
		<>
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
						<>
							<ModalHeader className="flex flex-col gap-1">
								{assessmentPatientModal.title || "Assessment"}
							</ModalHeader>
							<ModalBody>
								<div className="flex flex-row gap-24 ~mx-4/10">
									<div style={{ flex: 1 }} className="flex flex-col gap-6">
										<Controller
											name="TOOTH_NUMBER"
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
													isDisabled={!toothNumbers?.length}
													isInvalid={!!errors.TOOTH_NUMBER}
													errorMessage={errors.TOOTH_NUMBER?.message}
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
													{toothNumbers.map((number) => (
														<SelectItem key={number} value={number}>
															{number}
														</SelectItem>
													))}
												</Select>
											)}
										/>
										<Controller
											name="COLOR"
											control={control}
											rules={{ required: "Color is required" }}
											render={({ field, formState: { errors } }) => (
												<Select
													{...field}
													aria-label="Color Select"
													selectedKeys={[field.value]}
													onChange={(selectedKeys) => {
														field.onChange(selectedKeys);
													}}
													isDisabled={!toothNumbers?.length}
													isInvalid={!!errors.COLOR}
													errorMessage={errors.COLOR?.message}
													labelPlacement={"outside"}
													placeholder="Select Color"
													label="Color"
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
													{toothNumbers.map((number) => (
														<SelectItem key={number} value={number}>
															{number}
														</SelectItem>
													))}
												</Select>
											)}
										/>
										<div className="flex justify-between">
											<div className="flex flex-col gap-5">
												<div>
													<Controller
														name="TEXTURE"
														control={control}
														rules={{ required: "Texture is required" }}
														render={({
															field,
															formState: { errors },
														}) => (
															<CheckboxGroup
																aria-label="Texture Checkboxes"
																label="Texture"
																color="primary"
																value={field.value}
																onValueChange={(value) =>
																	field.onChange(
																		checkboxSetterSingleItem(
																			value
																		)
																	)
																}
																isInvalid={!!errors.TEXTURE}
																errorMessage={
																	errors.TEXTURE?.message
																}
															>
																<Checkbox value="Smooth">
																	Smooth
																</Checkbox>
																<Checkbox value="Rough">
																	Rough
																</Checkbox>
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
														rules={{ required: "Color is required" }}
														render={({
															field,
															formState: { errors },
														}) => (
															<div className="flex gap-5">
																<h5>Presence of Decay</h5>
																<Checkbox
																	isSelected={field.value}
																	onValueChange={(value) =>
																		field.onChange(value)
																	}
																>
																	Yes
																</Checkbox>
															</div>
														)}
													/>
													<Controller
														name="CAVITIES"
														control={control}
														rules={{ required: "Color is required" }}
														render={({
															field,
															formState: { errors },
														}) => (
															<div className="flex gap-5">
																<h5>Cavities</h5>
																<Checkbox
																	isSelected={field.value}
																	onValueChange={(value) =>
																		field.onChange(value)
																	}
																>
																	Yes
																</Checkbox>
															</div>
														)}
													/>
													<Controller
														name="SENSITIVITY"
														control={control}
														rules={{ required: "Color is required" }}
														render={({
															field,
															formState: { errors },
														}) => (
															<div className="flex gap-5">
																<h5>Sensitivity</h5>
																<Checkbox
																	isSelected={field.value}
																	onValueChange={(value) =>
																		field.onChange(value)
																	}
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
															onValueChange={(value) =>
																field.onChange(
																	checkboxSetterSingleItem(value)
																)
															}
															isInvalid={!!errors.GUM_HEALTH}
															errorMessage={
																errors.GUM_HEALTH?.message
															}
														>
															<Checkbox value="Healthy">
																Healthy
															</Checkbox>
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
															onValueChange={(value) =>
																field.onChange(
																	checkboxSetterSingleItem(value)
																)
															}
															isInvalid={!!errors.MOBILITY}
															errorMessage={errors.MOBILITY?.message}
														>
															<Checkbox value="Stable">
																Stable
															</Checkbox>
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
									<div style={{ flex: 1 }} className="flex flex-col gap-16">
										<div>
											<Image
												src={AssessmentSample}
												aria-label="image-assessmnet"
											/>
										</div>
										<Controller
											name="PREVIOUS_TREATMENT"
											control={control}
											rules={{ required: "Previous treatment is required" }}
											render={({ field, formState: { errors } }) => (
												<CheckboxGroup
													aria-label="Previous treatment Checkboxes"
													label="Previous treatment"
													color="primary"
													value={field.value}
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
							</ModalBody>
							<ModalFooter>
								<Button color="light" variant="flat" onPress={onClose}>
									Close
								</Button>
								<Button color="primary" onPress={onClose}>
									Change
								</Button>
							</ModalFooter>
						</>
					)}
				</ModalContent>
			</Modal>
		</>
	);
}

const toothNumbers = [
	"#1",
	"#2",
	"#3",
	"#4",
	"#5",
	"#6",
	"#7",
	"#8",
	"#9",
	"#10",
	"#11",
	"#12",
	"#13",
	"#14",
	"#15",
	"#16",
	"#17",
	"#18",
	"#19",
	"#20",
	"#21",
	"#22",
	"#23",
	"#24",
	"#25",
	"#26",
	"#27",
	"#28",
	"#29",
	"#30",
	"#31",
	"#32",
];

const colors = ["Yellow", "Brown", "Black", "White"];
