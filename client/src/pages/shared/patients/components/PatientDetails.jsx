import CustomDatePicker from "@/components/ui/DatePicker";
import { checkboxSetterSingleItem, decrypt } from "@/lib/utils";
import PatientsAPIManager from "@/services/api/managers/patients/PatientsAPIManager";
import { convertDateYYYYMMDD } from "@/services/api/utils";
import { useAppStore, useAuthTokenPersisted } from "@/store/zustand";
import { parseDate } from "@internationalized/date";
import { getLocalTimeZone } from "@internationalized/date";
import { today } from "@internationalized/date";
import { BreadcrumbItem, Breadcrumbs } from "@nextui-org/breadcrumbs";
import { Checkbox, CheckboxGroup, Input, Divider, Button } from "@nextui-org/react";
import { useMutation } from "@tanstack/react-query";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useMemo } from "react";
import { Controller, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";

const PatientDetails = () => {
	const currentUser = location.pathname.includes("admin") ? "admin" : "staff";
	const { setAlertDialogDetails } = useAppStore();
	const { authToken } = useAuthTokenPersisted();
	const user = decrypt(authToken);
	const params = useParams();
	const navigate = useNavigate();
	const [getRequestData, setGetRequestData] = useState(null);
	const [formData, setFormData] = useState({
		OTHER_TITLE: "",
		OTHER_CONDITIONS: "",
		OTHER_DENTAL_CONCERN_PROBLEMS: "",
		FRIEND_FAMILY: "",
	});
	const [errorForm, setErrorForm] = useState({
		OTHER_TITLE: "",
		OTHER_CONDITIONS: "",
		OTHER_DENTAL_CONCERN_PROBLEMS: "",
		FRIEND_FAMILY: "",
	});

	const getMutation = useMutation({
		mutationFn: PatientsAPIManager.getPatientForm,
		onSuccess: (data) => {
			const res = handleStructureDefaultValues(data);
			setFormData(res.newFormData);
			reset(res.newData);
			setGetRequestData(res.newData);
		},
	});

	useEffect(() => {
		getMutation.mutate({ PATIENT_ID: params.id });
	}, []);

	const handleStructureDefaultValues = (data) => {
		let newData = {};
		let newFormData = {};
		newData.SUFFERING = JSON.parse(data.SUFFERING);
		newData.DENTAL_CONCERN_PROBLEMS = JSON.parse(data.DENTAL_CONCERN_PROBLEMS);
		newData.DENTAL_TREATMENT_REQUIREMENT = JSON.parse(data.DENTAL_TREATMENT_REQUIREMENT);
		// newData.CONSENT = JSON.parse(data.CONSENT);
		// console.log(1233);

		if (data.TITLE.includes("Other")) {
			const temp = data.TITLE.split(", ");
			newData.TITLE = temp[0];
			newFormData.OTHER_TITLE = temp[1];
		} else {
			newData.TITLE = data.TITLE;
		}

		if (data.REFFERAL.includes("Other")) {
			const temp = data.REFFERAL.split(", ");
			newData.REFFERAL = temp[0];
			newFormData.OTHER_REFERRAL = temp[1];
		} else if (
			data.REFFERAL.includes("Friend/Family (Please provide name so we can thank them)")
		) {
			const temp = data.REFFERAL.split(", ");
			newFormData.FRIEND_FAMILY = temp[1];
		} else {
			newData.REFFERAL = data.REFFERAL;
		}
		if (!conditions.includes(newData.SUFFERING[0])) {
			newFormData.OTHER_CONDITIONS = newData.SUFFERING[0];
			newData.SUFFERING = [];
		}

		Object.entries(data).forEach(([key, value]) => {
			if (value === "N/A") {
				newData[key] = "";
			}
		});

		newData.TITLE = data.TITLE.includes("Other") ? data.TITLE.split(",")[0] : data.TITLE;
		newData.BIRTHDAY = data.BIRTHDAY
			? parseDate(convertDateYYYYMMDD(data.BIRTHDAY))
			: today(getLocalTimeZone());
		newData.LAST_DENTAL = data.LAST_DENTAL
			? parseDate(convertDateYYYYMMDD(data.LAST_DENTAL))
			: today(getLocalTimeZone());
		return {
			newData: { ...data, ...newData },
			newFormData,
		};
	};
	const {
		register,
		handleSubmit,
		control,
		setValue,
		reset,
		setError,
		formState: { errors },
		watch,
	} = useForm({
		defaultValues: useMemo(() => {
			// if (getRequestData && getMutation.isSuccess) {
			// 	return handleStructureDefaultValues(getRequestData).newData;
			// }
			// if (!data)
			return {
				PATIENT_ID: "",
				TITLE: "",
				FIRST_NAME: "",
				LAST_NAME: "",
				OCCUPATION: "",
				BIRTHDAY: today(getLocalTimeZone()), // default date (today)
				HOME_ADDRESS: "",
				CONTACT_NUMBER: "",
				EMAIL_ADDRESS: user.email,
				HEALTH_FUND: "",
				MEMBER_NUMBER: "",
				EMERGENCY_CONTACT_NAME: "",
				EMERGENCY_CONTACT_NUMBER: "",
				EMERGENCY_CONTACT_RELATIONSHIP: "",
				FAMILY_DOCTOR: "",
				DOCTOR_CONTACT: "",
				SUFFERING: [],
				PREGNANT_DURATION: "",
				HOSPITAL_PAST_2_DURATION: "",
				MEDICATION: "",
				SMOKE_PER_DAY: "",
				DENTAL_CONCERN_PROBLEMS: [],
				VISIT_PURPOSE: "",
				LAST_DENTAL: today(getLocalTimeZone()), // default date (today),
				MAKE_YOU_NERVOUS: "",
				DENTAL_TREATMENT_REQUIREMENT: "",
				REFFERAL: "",
				CONSENT: [],
			};
		}, [getRequestData, getMutation]),
	});

	// useEffect(() => {
	// 	const data = handleStructureDefaultValues(sampleResponse);
	// 	console.log(data);
	// 	setFormData(data.newFormData);
	// 	reset(data.newData);
	// }, []);

	let now = today(getLocalTimeZone());
	const sixMonthsAgo = now.add({ months: -6 });

	const addMutation = useMutation({
		mutationFn: PatientsAPIManager.postAddPatientForm,
		onSuccess: (data) => {
			setAlertDialogDetails({
				isOpen: true,
				type: "success",
				title: "Success!",
				message: "Patient form added successfully!",
				confirmCallback: () => {
					// navigate(`/${currentUser}/patients`);
				},
			});
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
	const editMutation = useMutation({
		mutationFn: PatientsAPIManager.postEditPatientForm,
		onSuccess: (data) => {
			setAlertDialogDetails({
				isOpen: true,
				type: "success",
				title: "Success!",
				message: "Patient form updated successfully!",
				confirmCallback: () => {
					// navigate(`/${currentUser}/patients`);
				},
			});
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

	const autoOtherParent = (property, parentProperty, parentPropertyValue, value) => {
		if (parentPropertyValue === "empty") {
			if (value?.length) {
				setFormData((prev) => ({
					...prev,
					[property]: "",
				}));
				setErrorForm((prev) => ({
					...prev,
					[property]: "",
				}));
			}

			return;
		}

		if (value?.length) {
			setFormData((prev) => ({
				...prev,
				[property]: "",
			}));
			setErrorForm((prev) => ({
				...prev,
				[property]: "",
			}));
		}
	};
	const checkerInvalidValue = (parentPropertyValues, value) => {
		let strippedValue = value;
		parentPropertyValues.forEach((parentPropertyValue) => {
			if (
				value[0].includes(parentPropertyValue) &&
				value[0].length !== parentPropertyValue.length
			) {
				const val = value[0].slice(parentPropertyValue.length);
				strippedValue = val;
			}
		});

		return strippedValue;
	};
	const autoOther = (property, parentProperty, parentPropertyValue, value) => {
		if (parentPropertyValue === "empty") {
			if (value) {
				setValue(parentProperty, []);
			} else if (watch(parentProperty).length) {
				setFormData((prev) => ({
					...prev,
					[property]: "",
				}));
				setErrorForm((prev) => ({
					...prev,
					[property]: "",
				}));
			}

			return;
		}
		if (!watch(parentProperty).includes(parentPropertyValue) && value) {
			setValue(parentProperty, parentPropertyValue);
		}
		if (watch(parentProperty).includes(parentPropertyValue) && !value) {
			setValue(parentProperty, "");
			setFormData((prev) => ({
				...prev,
				[property]: "",
			}));
			setErrorForm((prev) => ({
				...prev,
				[property]: "",
			}));
		}
	};
	const onSubmit = (data) => {
		data.PATIENT_ID = params.id;
		if (data.ID) {
			data.TITLE = data.TITLE.includes("Other")
				? data.TITLE + ", " + formData.OTHER_TITLE
				: data.TITLE;
			switch (data.REFFERAL) {
				case "Other":
					data.REFFERAL = data.REFFERAL + ", " + formData.OTHER_REFERRAL;
					break;
				case "Friend/Family (Please provide name so we can thank them)":
					data.REFFERAL = data.REFFERAL + ", " + formData.FRIEND_FAMILY;
					break;
				default:
					data.REFFERAL = data.REFFERAL[0];
			}

			data.SUFFERING = data?.SUFFERING[0]
				? JSON.stringify(data?.SUFFERING)
				: JSON.stringify([formData?.OTHER_CONDITIONS]);
		} else {
			data.TITLE = data.TITLE.includes("Other")
				? data.TITLE + ", " + formData.OTHER_TITLE
				: data.TITLE[0];
			switch (data.REFFERAL) {
				case "Other":
					data.REFFERAL = data.REFFERAL + ", " + formData.OTHER_REFERRAL;
					break;
				case "Friend/Family (Please provide name so we can thank them)":
					data.REFFERAL = data.REFFERAL + ", " + formData.FRIEND_FAMILY;
					break;
				default:
					data.REFFERAL = data.REFFERAL[0];
			}
			data.MAKE_YOU_NERVOUS = data?.MAKE_YOU_NERVOUS[0];
			data.SUFFERING = data?.SUFFERING[0]
				? JSON.stringify([data?.SUFFERING[0]])
				: JSON.stringify([formData?.OTHER_CONDITIONS]);
		}

		data.DENTAL_CONCERN_PROBLEMS = JSON.stringify(data.DENTAL_CONCERN_PROBLEMS);
		data.DENTAL_TREATMENT_REQUIREMENT = JSON.stringify(data.DENTAL_TREATMENT_REQUIREMENT);
		data.CONSENT = JSON.stringify(data.CONSENT);

		data.BIRTHDAY = convertDateYYYYMMDD(data.BIRTHDAY);
		data.LAST_DENTAL = convertDateYYYYMMDD(data.LAST_DENTAL);

		let newData = data;
		Object.entries(data).forEach(([key, value]) => {
			if (!value) {
				newData[key] = "N/A";
			}
		});
		if (data?.ID) editMutation.mutate(newData);
		else addMutation.mutate(newData);
	};

	return (
		<div style={{ flex: 1 }}>
			<div className="w-full h-full">
				<h3 className="p-5 text-lg font-darkText">
					<Breadcrumbs>
						<BreadcrumbItem href={`/${currentUser}/patients`}>Patients</BreadcrumbItem>
						<BreadcrumbItem>Patient Details</BreadcrumbItem>
					</Breadcrumbs>
				</h3>
				<form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-8">
					<div className="flex flex-col gap-3">
						<div
							style={{ flex: 1 }}
							className="flex items-center justify-between p-4 mt-5 "
						>
							<h3 className="text-2xl font-medium" style={{ flex: 1 }}>
								Patient Details
							</h3>
						</div>
					</div>
					<div className="flex flex-col gap-5 px-5">
						<div className="flex flex-row gap-5">
							<div style={{ flex: 1 }}>
								<Controller
									name="TITLE"
									control={control}
									rules={{ required: "Title is required" }}
									render={({ field, formState: { errors } }) => (
										<CheckboxGroup
											label="Title"
											orientation="horizontal"
											value={field.value}
											onValueChange={(value) => {
												const val = checkerInvalidValue(
													["Other"],
													checkboxSetterSingleItem(value)
												);
												field.onChange(val);
												autoOtherParent(
													"OTHER_TITLE",
													"TITLE",
													"Other",
													val
												);
											}}
											isInvalid={!!errors.TITLE}
											errorMessage={errors.TITLE?.message}
										>
											<Checkbox value="Mr.">Mr.</Checkbox>
											<Checkbox value="Mrs.">Mrs.</Checkbox>
											<Checkbox value="Miss">Miss</Checkbox>
											<Checkbox value="Ms.">Ms.</Checkbox>
											<Checkbox value="Master">Master</Checkbox>
											<div className="flex flex-row max-w-sm gap-5">
												<Checkbox
													value="Other"
													classNames={{
														label: "flex flex-row items-center",
													}}
												>
													Other
												</Checkbox>
												<Input
													value={formData["OTHER_TITLE"]}
													onValueChange={(value) => {
														setFormData({
															...formData,
															OTHER_TITLE: value,
														});

														autoOther(
															"OTHER_TITLE",
															"TITLE",
															"Other",
															value
														);
													}}
													isReadOnly={location.pathname.includes("info")}
													isInvalid={!!errorForm["OTHER_TITLE"]}
													errorMessage={errorForm["OTHER_TITLE"]}
													aria-label="other referral"
													type="text"
													variant="bordered"
													color="primary"
													radius="sm"
													size="lg"
													className="w-full"
													placeholder=" "
													classNames={{
														label: "text-darkText font-semibold ",
														inputWrapper: "h-full bg-white",
													}}
													labelPlacement={"outside"}
												/>
											</div>
										</CheckboxGroup>
									)}
								/>
							</div>
							<div style={{ flex: 1 }}>
								<Controller
									name="FIRST_NAME"
									control={control}
									rules={{ required: "First name is required" }}
									render={({ field, formState: { errors } }) => (
										<Input
											value={field.value}
											onValueChange={(value) => {
												field.onChange(value);
											}}
											isReadOnly={location.pathname.includes("info")}
											isInvalid={!!errors.FIRST_NAME}
											errorMessage={errors.FIRST_NAME?.message}
											aria-label="First name"
											label="First Name"
											type="text"
											variant="bordered"
											color="primary"
											radius="sm"
											size="lg"
											className="w-full"
											placeholder=" "
											classNames={{
												label: "text-darkText font-semibold ",
												inputWrapper: "h-full bg-white",
											}}
											labelPlacement={"outside"}
										/>
									)}
								/>
							</div>
						</div>
						<div className="flex flex-row gap-5">
							<div style={{ flex: 1 }}>
								<Controller
									name="LAST_NAME"
									control={control}
									rules={{ required: "Last name is required" }}
									render={({ field, formState: { errors } }) => (
										<Input
											value={field.value}
											onValueChange={(value) => {
												field.onChange(value);
											}}
											isReadOnly={location.pathname.includes("info")}
											isInvalid={!!errors.LAST_NAME}
											errorMessage={errors.LAST_NAME?.message}
											aria-label="Last name"
											label="Last name"
											type="text"
											variant="bordered"
											color="primary"
											radius="sm"
											size="lg"
											className="w-full"
											placeholder=" "
											classNames={{
												label: "text-darkText font-semibold ",
												inputWrapper: "h-full bg-white",
											}}
											labelPlacement={"outside"}
										/>
									)}
								/>
							</div>
							<div style={{ flex: 1 }}>
								<Controller
									name="OCCUPATION"
									control={control}
									rules={{ required: "Last name is required" }}
									render={({ field, formState: { errors } }) => (
										<Input
											value={field.value}
											onValueChange={(value) => {
												field.onChange(value);
											}}
											isReadOnly={location.pathname.includes("info")}
											isInvalid={!!errors.OCCUPATION}
											errorMessage={errors.OCCUPATION?.message}
											aria-label="Occupation"
											label="Occupation"
											type="text"
											variant="bordered"
											color="primary"
											radius="sm"
											size="lg"
											className="w-full"
											placeholder=" "
											classNames={{
												label: "text-darkText font-semibold ",
												inputWrapper: "h-full bg-white",
											}}
											labelPlacement={"outside"}
										/>
									)}
								/>
							</div>
						</div>
						<div className="flex flex-row gap-5">
							<div style={{ flex: 1 }}>
								<Controller
									name="BIRTHDAY"
									control={control}
									rules={{ required: "Date is required" }}
									render={({ field, formState: { errors } }) => (
										<CustomDatePicker
											value={field.value}
											isInvalid={!!errors.BIRTHDAY}
											errorMessage={errors.BIRTHDAY?.message}
											setValue={(value) => {
												field.onChange(value);
											}}
											label={"Date of Birth"}
											showTimeSelect={false}
											classNames={{
												label: "text-darkText font-semibold",
												innerWrapper: "h-full",
											}}
											aria-label="Birthdate"
											maxValue={sixMonthsAgo}
										/>
									)}
								/>
							</div>
							<div style={{ flex: 1 }}>
								<Controller
									name="HOME_ADDRESS"
									control={control}
									rules={{ required: "Home address is required" }}
									render={({ field, formState: { errors } }) => (
										<Input
											value={field.value}
											onValueChange={(value) => {
												field.onChange(value);
											}}
											isReadOnly={location.pathname.includes("info")}
											isInvalid={!!errors.HOME_ADDRESS}
											errorMessage={errors.HOME_ADDRESS?.message}
											aria-label="home address"
											label="Home Address"
											type="text"
											variant="bordered"
											color="primary"
											radius="sm"
											size="lg"
											className="w-full"
											placeholder=" "
											classNames={{
												label: "text-darkText font-semibold ",
												inputWrapper: "h-full bg-white",
											}}
											labelPlacement={"outside"}
										/>
									)}
								/>
							</div>
						</div>
						<div className="flex flex-row gap-5">
							<div style={{ flex: 1 }}>
								<Controller
									name="CONTACT_NUMBER"
									control={control}
									rules={{
										required: "Contact number is required",
										pattern: {
											value: /^[+069](\d{9}|\d{10}|\d{11}|\d{12})$/,
											message: "Invalid phone number",
										},
									}}
									render={({ field, formState: { errors } }) => (
										<Input
											value={field.value}
											onValueChange={(value) => {
												field.onChange(value);
											}}
											isReadOnly={location.pathname.includes("info")}
											isInvalid={!!errors.CONTACT_NUMBER}
											errorMessage={errors.CONTACT_NUMBERr?.message}
											aria-label="contact_number"
											label="Contact Number"
											type="text"
											variant="bordered"
											color="primary"
											radius="sm"
											size="lg"
											className="w-full"
											placeholder=" "
											classNames={{
												label: "text-darkText font-semibold ",
												inputWrapper: "h-full bg-white",
											}}
											labelPlacement={"outside"}
										/>
									)}
								/>
							</div>
							<div style={{ flex: 1 }}>
								<Controller
									name="EMAIL_ADDRESS"
									control={control}
									rules={{
										required: "Email is required",
										pattern: {
											value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, // regex for email validation
											message: "Invalid email address", // custom error message for pattern
										},
									}}
									render={({ field, formState: { errors } }) => (
										<Input
											value={field.value}
											onValueChange={(value) => {
												field.onChange(value);
											}}
											isReadOnly={location.pathname.includes("info")}
											isInvalid={!!errors.EMAIL_ADDRESS}
											errorMessage={errors.EMAIL_ADDRESS?.message}
											aria-label="email"
											label="Email"
											type="text"
											variant="bordered"
											color="primary"
											radius="sm"
											size="lg"
											className="w-full"
											placeholder=" "
											classNames={{
												label: "text-darkText font-semibold ",
												inputWrapper: "h-full bg-white",
											}}
											labelPlacement={"outside"}
										/>
									)}
								/>
							</div>
						</div>
						<div className="flex flex-row gap-5">
							<div style={{ flex: 1 }}>
								<Controller
									name="HEALTH_FUND"
									control={control}
									render={({ field, formState: { errors } }) => (
										<Input
											value={field.value}
											onValueChange={(value) => {
												field.onChange(value);
											}}
											isReadOnly={location.pathname.includes("info")}
											isInvalid={!!errors.HEALTH_FUND}
											errorMessage={errors.HEALTH_FUND?.message}
											aria-label="health fund"
											label="Health Fund (if applicable)"
											type="text"
											variant="bordered"
											color="primary"
											radius="sm"
											size="lg"
											className="w-full"
											placeholder=" "
											classNames={{
												label: "text-darkText font-semibold ",
												inputWrapper: "h-full bg-white",
											}}
											labelPlacement={"outside"}
										/>
									)}
								/>
							</div>
							<div style={{ flex: 1 }}>
								<Controller
									name="MEMBER_NUMBER"
									control={control}
									render={({ field, formState: { errors } }) => (
										<Input
											value={field.value}
											onValueChange={(value) => {
												field.onChange(value);
											}}
											isReadOnly={location.pathname.includes("info")}
											isInvalid={!!errors.MEMBER_NUMBER}
											errorMessage={errors.MEMBER_NUMBER?.message}
											aria-label="member number"
											label="Member Number (if applicable)"
											type="text"
											variant="bordered"
											color="primary"
											radius="sm"
											size="lg"
											className="w-full"
											placeholder=" "
											classNames={{
												label: "text-darkText font-semibold ",
												inputWrapper: "h-full bg-white",
											}}
											labelPlacement={"outside"}
										/>
									)}
								/>
							</div>
						</div>
						<Divider />
						<span>Emergency Contact</span>
						<div className="flex flex-row gap-5">
							<div style={{ flex: 1 }}>
								<Controller
									name="EMERGENCY_CONTACT_NAME"
									control={control}
									rules={{ required: "Name is required" }}
									render={({ field, formState: { errors } }) => (
										<Input
											value={field.value}
											onValueChange={(value) => {
												field.onChange(value);
											}}
											isReadOnly={location.pathname.includes("info")}
											isInvalid={!!errors.EMERGENCY_CONTACT_NAME}
											errorMessage={errors.EMERGENCY_CONTACT_NAME?.message}
											aria-label="name"
											label="Name"
											type="text"
											variant="bordered"
											color="primary"
											radius="sm"
											size="lg"
											className="w-full"
											placeholder=" "
											classNames={{
												label: "text-darkText font-semibold ",
												inputWrapper: "h-full bg-white",
											}}
											labelPlacement={"outside"}
										/>
									)}
								/>
							</div>
							<div style={{ flex: 1 }}>
								<Controller
									name="EMERGENCY_CONTACT_NUMBER"
									control={control}
									rules={{
										required: "Phone number is required",
										pattern: {
											value: /^[+069](\d{9}|\d{10}|\d{11}|\d{12})$/,
											message: "Invalid phone number",
										},
									}}
									render={({ field, formState: { errors } }) => (
										<Input
											value={field.value}
											onValueChange={(value) => {
												field.onChange(value);
											}}
											isReadOnly={location.pathname.includes("info")}
											isInvalid={!!errors.EMERGENCY_CONTACT_NUMBER}
											errorMessage={errors.EMERGENCY_CONTACT_NUMBER?.message}
											aria-label="phone number"
											label="Phone Number"
											type="text"
											variant="bordered"
											color="primary"
											radius="sm"
											size="lg"
											className="w-full"
											placeholder=" "
											classNames={{
												label: "text-darkText font-semibold ",
												inputWrapper: "h-full bg-white",
											}}
											labelPlacement={"outside"}
										/>
									)}
								/>
							</div>
						</div>
						<div className="flex flex-row gap-5">
							<div style={{ flex: 1 }}>
								<Controller
									name="EMERGENCY_CONTACT_RELATIONSHIP"
									control={control}
									rules={{ required: "Relationship is required" }}
									render={({ field, formState: { errors } }) => (
										<Input
											value={field.value}
											onValueChange={(value) => {
												field.onChange(value);
											}}
											isReadOnly={location.pathname.includes("info")}
											isInvalid={!!errors.EMERGENCY_CONTACT_RELATIONSHIP}
											errorMessage={
												errors.EMERGENCY_CONTACT_RELATIONSHIP?.message
											}
											aria-label="relationship"
											label="Relationship"
											type="text"
											variant="bordered"
											color="primary"
											radius="sm"
											size="lg"
											className="w-full"
											placeholder=" "
											classNames={{
												label: "text-darkText font-semibold ",
												inputWrapper: "h-full bg-white",
											}}
											labelPlacement={"outside"}
										/>
									)}
								/>
							</div>
							<div style={{ flex: 1 }}></div>
						</div>
					</div>
					<Divider />
					<div className="flex flex-col gap-5 px-5">
						<span>Medical History</span>
						<div className="flex flex-row gap-5">
							<div style={{ flex: 1 }}>
								<Controller
									name="FAMILY_DOCTOR"
									control={control}
									render={({ field, formState: { errors } }) => (
										<Input
											value={field.value}
											onValueChange={(value) => {
												field.onChange(value);
											}}
											isReadOnly={location.pathname.includes("info")}
											isInvalid={!!errors.FAMILY_DOCTOR}
											errorMessage={errors.FAMILY_DOCTOR?.message}
											aria-label="family_doctor"
											label="Family Doctor"
											type="text"
											variant="bordered"
											color="primary"
											radius="sm"
											size="lg"
											className="w-full"
											placeholder=" "
											classNames={{
												label: "text-darkText font-semibold ",
												inputWrapper: "h-full bg-white",
											}}
											labelPlacement={"outside"}
										/>
									)}
								/>
							</div>
							<div style={{ flex: 1 }}>
								<Controller
									name="DOCTOR_CONTACT"
									control={control}
									rules={{
										pattern: {
											value: /^[+069](\d{9}|\d{10}|\d{11}|\d{12})$/,
											message: "Invalid phone number",
										},
									}}
									render={({ field, formState: { errors } }) => (
										<Input
											value={field.value}
											onValueChange={(value) => {
												field.onChange(value);
											}}
											isReadOnly={location.pathname.includes("info")}
											isInvalid={!!errors.DOCTOR_CONTACT}
											errorMessage={errors.DOCTOR_CONTACT?.message}
											aria-label="phone number"
											label="Doctor's Phone Number"
											type="text"
											variant="bordered"
											color="primary"
											radius="sm"
											size="lg"
											className="w-full"
											placeholder=" "
											classNames={{
												label: "text-darkText font-semibold ",
												inputWrapper: "h-full bg-white",
											}}
											labelPlacement={"outside"}
										/>
									)}
								/>
							</div>
						</div>
						<div className="flex flex-row gap-5">
							<div style={{ flex: 1 }}>
								<Controller
									name="SUFFERING"
									control={control}
									render={({ field, formState: { errors } }) => (
										<CheckboxGroup
											label="Have you ever had or are you suffering from any of the following? (Please tick that apply)"
											orientation="vertical"
											value={field.value}
											onValueChange={(value) => {
												field.onChange(value);
												autoOtherParent(
													"OTHER_CONDITIONS",
													"SUFFERING",
													"empty",
													value
												);
											}}
											isInvalid={!!errors.SUFFERING}
											errorMessage={errors.SUFFERING?.message}
											classNames={{
												label: "text-darkText font-semibold",
												wrapper: "~pl-2/5 grid grid-cols-2 gap-3",
											}}
										>
											{conditions.map((condition) => (
												<Checkbox key={condition} value={condition}>
													{condition}
												</Checkbox>
											))}
										</CheckboxGroup>
									)}
								/>
							</div>
							<div style={{ flex: 1 }} className="flex flex-col gap-5">
								<Input
									value={formData["OTHER_CONDITIONS"]}
									onValueChange={(value) => {
										setFormData({
											...formData,
											OTHER_CONDITIONS: value,
										});
										autoOther("OTHER_CONDITIONS", "SUFFERING", "empty", value);
									}}
									isReadOnly={location.pathname.includes("info")}
									isInvalid={!!errorForm["OTHER_CONDITIONS"]}
									errorMessage={errorForm["OTHER_CONDITIONS"]}
									aria-label="Any other condition(s) not mentioned (Please list):"
									label="Any other condition(s) not mentioned (Please list):"
									type="text"
									variant="bordered"
									color="primary"
									radius="sm"
									size="lg"
									className="w-full"
									placeholder=" "
									classNames={{
										label: "text-darkText font-semibold ",
										inputWrapper: "h-full bg-white",
									}}
									labelPlacement={"outside"}
								/>
								<Controller
									name="PREGNANT_DURATION"
									control={control}
									render={({ field, formState: { errors } }) => (
										<Input
											value={field.value}
											onValueChange={(value) => {
												field.onChange(value);
											}}
											isReadOnly={location.pathname.includes("info")}
											isInvalid={!!errors.PREGNANT_DURATION}
											errorMessage={errors.PREGNANT_DURATION?.message}
											aria-label="For Women: Are you pregnant? If yes, how many months?"
											label="For Women: Are you pregnant? If yes, how many months?"
											type="text"
											variant="bordered"
											color="primary"
											radius="sm"
											size="lg"
											className="w-full"
											placeholder=" "
											classNames={{
												label: "text-darkText font-semibold ",
												inputWrapper: "h-full bg-white",
											}}
											labelPlacement={"outside"}
										/>
									)}
								/>
								<Controller
									name="HOSPITAL_PAST_2_DURATION"
									control={control}
									render={({ field, formState: { errors } }) => (
										<Input
											value={field.value}
											onValueChange={(value) => {
												field.onChange(value);
											}}
											isReadOnly={location.pathname.includes("info")}
											isInvalid={!!errors.HOSPITAL_PAST_2_DURATION}
											errorMessage={errors.HOSPITAL_PAST_2_DURATION?.message}
											aria-label="Have you been a patient in a hospital during the past 2 years? If yes, please provide more information"
											label="Have you been a patient in a hospital during the past 2 years? If yes, please provide more information"
											type="text"
											variant="bordered"
											color="primary"
											radius="sm"
											size="lg"
											className="w-full"
											placeholder=" "
											classNames={{
												label: "text-darkText font-semibold ",
												inputWrapper: "h-full bg-white",
											}}
											labelPlacement={"outside"}
										/>
									)}
								/>
								<Controller
									name="MEDICATION"
									control={control}
									render={({ field, formState: { errors } }) => (
										<Input
											value={field.value}
											onValueChange={(value) => {
												field.onChange(value);
											}}
											isReadOnly={location.pathname.includes("info")}
											isInvalid={!!errors.MEDICATION}
											errorMessage={errors.MEDICATION?.message}
											aria-label="Are you taking any medication? If yes, please provide more information"
											label="Are you taking any medication? If yes, please provide more information"
											type="text"
											variant="bordered"
											color="primary"
											radius="sm"
											size="lg"
											className="w-full"
											placeholder=" "
											classNames={{
												label: "text-darkText font-semibold ",
												inputWrapper: "h-full bg-white",
											}}
											labelPlacement={"outside"}
										/>
									)}
								/>
								<Controller
									name="SMOKE_PER_DAY"
									control={control}
									render={({ field, formState: { errors } }) => (
										<Input
											value={field.value}
											onValueChange={(value) => {
												field.onChange(value);
											}}
											isReadOnly={location.pathname.includes("info")}
											isInvalid={!!errors.SMOKE_PER_DAY}
											errorMessage={errors.SMOKE_PER_DAY?.message}
											aria-label="Do you smoke? If so, how many per day?"
											label="Do you smoke? If so, how many per day?"
											type="text"
											variant="bordered"
											color="primary"
											radius="sm"
											size="lg"
											className="w-full"
											placeholder=" "
											classNames={{
												label: "text-darkText font-semibold ",
												inputWrapper: "h-full bg-white",
											}}
											labelPlacement={"outside"}
										/>
									)}
								/>
							</div>
						</div>
					</div>
					<Divider />
					<div className="flex flex-col gap-5 px-5">
						<span>Dental History</span>

						<div className="flex flex-row gap-5">
							<div style={{ flex: 1 }}>
								<Controller
									name="DENTAL_CONCERN_PROBLEMS"
									control={control}
									render={({ field, formState: { errors } }) => (
										<CheckboxGroup
											label="Are you concerned about or experiencing any of the following dental problems? (Please tick as many as it applies)"
											orientation="vertical"
											value={field.value}
											onValueChange={(value) => field.onChange(value)}
											isInvalid={!!errors.DENTAL_CONCERN_PROBLEMS}
											errorMessage={errors.DENTAL_CONCERN_PROBLEMS?.message}
											classNames={{
												label: "text-darkText font-semibold",
												wrapper: "~pl-2/5 grid grid-cols-2 gap-3",
											}}
										>
											<Checkbox value="Sensitivity to hot or cold">
												Sensitivity to hot or cold
											</Checkbox>
											<Checkbox value="Clicking/Pain in the jaw joints">
												Clicking/Pain in the jaw joints
											</Checkbox>
											<Checkbox value="Staining of your teeth">
												Staining of your teeth
											</Checkbox>
											<Checkbox value="Roughness of existing filings">
												Roughness of existing filings
											</Checkbox>
											<Checkbox value="Bleeding Gums">Bleeding Gums</Checkbox>
											<Checkbox value="Bad Breath">Bad Breath</Checkbox>
											<Checkbox value="Sensitivity when eating">
												Sensitivity when eating
											</Checkbox>
											<Checkbox value="Head/Neck ache">
												Head/Neck ache
											</Checkbox>
											<Checkbox value="Grinding/Clenching of your teeth">
												Grinding/Clenching of your teeth
											</Checkbox>
											<Checkbox value="Existing crowns/bridges/dentures">
												Existing crowns/bridges/dentures
											</Checkbox>
										</CheckboxGroup>
									)}
								/>
							</div>
							<div style={{ flex: 1 }} className="flex flex-col gap-5">
								<Controller
									name="VISIT_PURPOSE"
									control={control}
									rules={{
										required: "Visit purpose is required",
									}}
									render={({ field, formState: { errors } }) => (
										<Input
											value={field.value}
											onValueChange={(value) => {
												field.onChange(value);
											}}
											isReadOnly={location.pathname.includes("info")}
											isInvalid={!!errors.VISIT_PURPOSE}
											errorMessage={errors.VISIT_PURPOSE?.message}
											aria-label="What is the main purpose of your visit today?"
											label="What is the main purpose of your visit today?"
											type="text"
											variant="bordered"
											color="primary"
											radius="sm"
											size="lg"
											className="w-full"
											placeholder=" "
											classNames={{
												label: "text-darkText font-semibold ",
												inputWrapper: "h-full bg-white",
											}}
											labelPlacement={"outside"}
										/>
									)}
								/>
								<Controller
									name="LAST_DENTAL"
									control={control}
									rules={{ required: "Date is required" }}
									render={({ field, formState: { errors } }) => (
										<CustomDatePicker
											value={field.value}
											isInvalid={!!errors.LAST_DENTAL}
											errorMessage={errors.LAST_DENTAL?.message}
											setValue={(value) => {
												field.onChange(value);
											}}
											aria-label="How long since your last dental visit?"
											label="How long since your last dental visit?"
											showTimeSelect={false}
											classNames={{
												label: "text-darkText font-semibold",
												innerWrapper: "h-full",
											}}
										/>
									)}
								/>
								{/* <Controller
									name="LAST_DENTAL"
									control={control}
									render={({ field, formState: { errors } }) => (
										<Input
											value={field.value}
											onValueChange={(value) => {
												field.onChange(value);
											}}
											isReadOnly={location.pathname.includes("info")}
											isInvalid={!!errors.LAST_DENTAL}
											errorMessage={errors.LAST_DENTAL?.message}
											aria-label="How long since your last dental visit?"
											label="How long since your last dental visit?"
											type="text"
											variant="bordered"
											color="primary"
											radius="sm"
											size="lg"
											className="w-full"
											placeholder=" "
											classNames={{
												label: "text-darkText font-semibold ",
												inputWrapper: "h-full bg-white",
											}}
											labelPlacement={"outside"}
										/>
									)}
								/> */}
							</div>
						</div>
						<div className="flex flex-row gap-5">
							<div style={{ flex: 1 }}>
								<Controller
									name="DENTAL_TREATMENT_REQUIREMENT"
									control={control}
									render={({ field, formState: { errors } }) => (
										<CheckboxGroup
											label="Have you ever had or are you suffering from any of the following? (Please tick that apply)"
											orientation="vertical"
											value={field.value}
											onValueChange={(value) => field.onChange(value)}
											isInvalid={!!errors.DENTAL_TREATMENT_REQUIREMENT}
											errorMessage={
												errors.DENTAL_TREATMENT_REQUIREMENT?.message
											}
											classNames={{
												label: "text-darkText font-semibold",
												wrapper: "~pl-2/5 grid grid-cols-2 gap-3",
											}}
										>
											<Checkbox value="Gas (Nitrous oxide-laughing gas)">
												Gas (Nitrous oxide-laughing gas)
											</Checkbox>
											<Checkbox value="Intravenous sedation">
												Intravenous sedation
											</Checkbox>
											<Checkbox value="General anesthesia">
												General anesthesia
											</Checkbox>
										</CheckboxGroup>
									)}
								/>
							</div>
							<div style={{ flex: 1 }}>
								<Controller
									name="MAKE_YOU_NERVOUS"
									control={control}
									rules={{
										required: "This field is required",
									}}
									render={({ field, formState: { errors } }) => (
										<CheckboxGroup
											label="Does dental treatment make you nervous?"
											orientation="horizontal"
											value={field.value}
											onValueChange={(value) =>
												field.onChange(checkboxSetterSingleItem(value))
											}
											isInvalid={!!errors.MAKE_YOU_NERVOUS}
											errorMessage={errors.MAKE_YOU_NERVOUS?.message}
											classNames={{
												label: "text-darkText font-semibold",
												wrapper: "~pl-2/5 flex flex-row gap-6",
											}}
										>
											<Checkbox value="Yes">Yes</Checkbox>
											<Checkbox value="No">No</Checkbox>
										</CheckboxGroup>
									)}
								/>
							</div>
						</div>
					</div>
					<Divider />
					<div className="flex flex-col gap-5 px-5">
						<span>Referral Information</span>

						<div className="flex flex-row gap-5">
							<div style={{ flex: 1 }}>
								<Controller
									name="REFFERAL"
									control={control}
									rules={{
										required: "Referral is required",
									}}
									render={({ field, formState: { errors } }) => (
										<CheckboxGroup
											label="How did you hear about us?"
											orientation="vertical"
											value={field.value}
											onValueChange={(value) => {
												const val = checkerInvalidValue(
													[
														"Other",
														"Friend/Family (Please provide name so we can thank them)",
													],
													checkboxSetterSingleItem(value)
												);
												field.onChange(val);
												autoOtherParent(
													"OTHER_REFERRAL",
													"REFFERAL",
													"Other",
													val
												);
												autoOtherParent(
													"FRIEND_FAMILY",
													"REFFERAL",
													"Friend/Family (Please provide name so we can thank them)",
													val
												);
											}}
											isInvalid={!!errors.REFFERAL}
											errorMessage={errors.REFFERAL?.message}
											classNames={{
												label: "text-darkText font-semibold",
												wrapper: "~pl-2/5",
											}}
										>
											<Checkbox value="Internet/Website">
												Internet/Website
											</Checkbox>
											<Checkbox value="Walk-by">Walk-by</Checkbox>
											<Checkbox value="Brochure">Brochure</Checkbox>
											<div className="flex flex-row max-w-sm gap-5">
												<Checkbox
													value="Other"
													classNames={{
														label: "flex flex-row items-center gap-2",
													}}
												>
													Other
												</Checkbox>
												<Input
													value={formData["OTHER_REFERRAL"]}
													onValueChange={(value) => {
														setFormData({
															...formData,
															OTHER_REFERRAL: value,
														});
														autoOther(
															"OTHER_REFERRAL",
															"REFFERAL",
															"Other",
															value
														);
													}}
													isReadOnly={location.pathname.includes("info")}
													isInvalid={!!errorForm["OTHER_REFERRAL"]}
													errorMessage={errorForm["OTHER_REFERRAL"]}
													aria-label="other referral"
													type="text"
													variant="bordered"
													color="primary"
													radius="sm"
													size="lg"
													className="w-full"
													placeholder=" "
													classNames={{
														label: "text-darkText font-semibold ",
														inputWrapper: "h-full bg-white",
													}}
													labelPlacement={"outside"}
												/>
											</div>
											<div className="flex flex-col max-w-lg gap-5">
												<Checkbox
													value="Friend/Family (Please provide name so we can thank them)"
													classNames={{
														label: "flex flex-row items-center gap-2",
													}}
												>
													Friend/Family (Please provide name so we can
													thank them)
												</Checkbox>
												<Input
													value={formData["FRIEND_FAMILY"]}
													onValueChange={(value) => {
														setFormData({
															...formData,
															FRIEND_FAMILY: value,
														});
														autoOther(
															"FRIEND_FAMILY",
															"REFFERAL",
															"Friend/Family (Please provide name so we can thank them)",
															value
														);
													}}
													isReadOnly={location.pathname.includes("info")}
													isInvalid={!!errorForm["FRIEND_FAMILY"]}
													errorMessage={errorForm["FRIEND_FAMILY"]}
													aria-label="friend/family"
													type="text"
													variant="bordered"
													color="primary"
													radius="sm"
													size="lg"
													className="w-full"
													placeholder=" "
													classNames={{
														label: "text-darkText font-semibold ",
														inputWrapper: "h-full bg-white",
													}}
													labelPlacement={"outside"}
												/>
											</div>
										</CheckboxGroup>
									)}
								/>
							</div>
						</div>
					</div>
					<Divider />
					<div className="flex flex-col gap-5 px-5">
						<div className="flex flex-row gap-5">
							<div style={{ flex: 1 }}>
								<Controller
									name="CONSENT"
									control={control}
									rules={{
										required: "Consent is required",
									}}
									render={({ field, formState: { errors } }) => (
										<CheckboxGroup
											label="Consent for Services"
											orientation="vertical"
											value={field.value}
											onValueChange={(value) => field.onChange(value)}
											isInvalid={!!errors.CONSENT}
											errorMessage={errors.CONSENT?.message}
											classNames={{
												label: "text-darkText font-semibold",
												wrapper: "~pl-2/5",
											}}
										>
											<Checkbox value="I consent to the dental and oral surgery procedures agreed to be necessary or advisable, including the use of local anesthetic and other medication as indicated.">
												I consent to the dental and oral surgery procedures
												agreed to be necessary or advisable, including the
												use of local anesthetic and other medication as
												indicated.
											</Checkbox>
											<Checkbox value="I understand that the practice requires at least 24 hours notice if I need to cancel my scheduled appointment and that a cancellation fee may be incurred if I fail to do so.">
												I understand that the practice requires at least 24
												hours notice if I need to cancel my scheduled
												appointment and that a cancellation fee may be
												incurred if I fail to do so.
											</Checkbox>
											<Checkbox value="I authorize the dentist or the designated team to take x-rays, study models, photographs, and other diagnostic aids deemed appropriate by the dentist to make a thorough diagnosis.">
												I authorize the dentist or the designated team to
												take x-rays, study models, photographs, and other
												diagnostic aids deemed appropriate by the dentist to
												make a thorough diagnosis.
											</Checkbox>
											<Checkbox value="I am aware that payment is required on the day of treatment.">
												I am aware that payment is required on the day of
												treatment.
											</Checkbox>
											<Checkbox value="We provide a courtesy to our patients a preventative recall program that offers a call service if you have not been to the practice in 6 months.">
												We provide a courtesy to our patients a preventative
												recall program that offers a call service if you
												have not been to the practice in 6 months.
											</Checkbox>
										</CheckboxGroup>
									)}
								/>
							</div>
						</div>
					</div>
					<Button color="primary" type="submit" className="px-8 mb-24 w-fit">
						Submit
					</Button>
				</form>
			</div>
		</div>
	);
};

export default PatientDetails;

// const sampleResponse = {
// 	ID: "16",
// 	PATIENT_ID: "11",
// 	TITLE: "Other, asd",
// 	FIRST_NAME: "asd",
// 	LAST_NAME: "asd",
// 	OCCUPATION: "asd",
// 	BIRTHDAY: "2024-10-03",
// 	HOME_ADDRESS: "asd",
// 	CONTACT_NUMBER: "09123456789",
// 	EMAIL_ADDRESS: "test@staff.com",
// 	HEALTH_FUND: "N/A",
// 	MEMBER_NUMBER: "N/A",
// 	EMERGENCY_CONTACT_NAME: "asd",
// 	EMERGENCY_CONTACT_NUMBER: "09123456789",
// 	EMERGENCY_CONTACT_RELATIONSHIP: "asd",
// 	FAMILY_DOCTOR: "N/A",
// 	DOCTOR_CONTACT: "N/A",
// 	SUFFERING: ["Stroke"],
// 	PREGNANT_DURATION: "N/A",
// 	HOSPITAL_PAST_2_DURATION: "N/A",
// 	MEDICATION: "N/A",
// 	SMOKE_PER_DAY: "N/A",
// 	DENTAL_CONCERN_PROBLEMS: ["Sensitivity to hot or cold", "Clicking/Pain in the jaw joints"],
// 	VISIT_PURPOSE: "asd",
// 	LAST_DENTAL: "2024-10-03",
// 	MAKE_YOU_NERVOUS: "Yes",
// 	DENTAL_TREATMENT_REQUIREMENT: ["Gas (Nitrous oxide-laughing gas)", "Intravenous sedation"],
// 	REFFERAL: "Other, asdasd",
// 	CONSENT: ["I am aware that payment is required on the day of treatment."],
// };

const conditions = [
	"Diabetes",
	"Asthma",
	"Heart Disorder/Complaint",
	"Steroid Therapy",
	"Radiation Therapy",
	"Stroke",
	"Excessive Bleeding",
	"Kidney Disease",
	"Cancer",
	"Tuberculosis",
	"Rheumatic Fever",
	"Bone Disease (Osteoporosis)",
	"Epilepsy",
	"Fainting Disorder",
	"Cardiac Pacemaker",
	"Stomach or Digestive Disorder",
	"Prosthetic Implant",
	"Lung Disease (eg. Bronchitis)",
	"Hepatitis or Other Liver Disease",
	"Blood Disease (eg. Anemia)",
	"Thyroid Disease",
	"Nervous or Psychiatric Condition",
	"Low or High Blood Pressure",
	"Sleep Apnoea",
	"Allergy to Penicillin",
	"Allergy to Medications",
	"Allergy to Latex",
];
