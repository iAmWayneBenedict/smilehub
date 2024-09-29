import CustomDatePicker from "@/components/ui/DatePicker";
import { checkboxSetterSingleItem } from "@/lib/utils";
import { getLocalTimeZone } from "@internationalized/date";
import { today } from "@internationalized/date";
import { BreadcrumbItem, Breadcrumbs } from "@nextui-org/breadcrumbs";
import { Checkbox, CheckboxGroup, Input, Divider, Button } from "@nextui-org/react";
import React from "react";
import { useMemo } from "react";
import { Controller, useForm } from "react-hook-form";

const PatientDetails = () => {
	const currentUser = location.pathname.includes("admin") ? "admin" : "staff";
	const {
		register,
		handleSubmit,
		control,
		setValue,
		reset,
		setError,
		formState: { errors },
	} = useForm({
		defaultValues: useMemo(() => {
			// if (!data)
			return {
				ID: "",
				FIRSTNAME: "",
				LASTNAME: "",
				EMAIL: "",
				PHONE: "",
				BIRTHDATE: today(getLocalTimeZone()), // default date (today)
				GENDER: "",
				FILES: [],
			};
			// return {
			// 	ID: data?.ID,
			// 	FIRSTNAME: data?.FIRSTNAME,
			// 	LASTNAME: data?.LASTNAME,
			// 	EMAIL: data?.EMAIL,
			// 	PHONE: data?.PHONE,
			// 	BIRTHDATE:
			// 		parseDate(convertDateYYYYMMDD(data?.BIRTHDATE)) || today(getLocalTimeZone()),
			// 	GENDER: data?.GENDER,
			// 	FILES: [],
			// };
		}, []),
	});

	let now = today(getLocalTimeZone());
	const sixMonthsAgo = now.add({ months: -6 });
	return (
		<div style={{ flex: 1 }}>
			<div className="w-full h-full">
				<h3 className="p-5 text-lg font-darkText">
					<Breadcrumbs>
						<BreadcrumbItem href={`/${currentUser}/patients`}>Patients</BreadcrumbItem>
						<BreadcrumbItem>Patient Details</BreadcrumbItem>
					</Breadcrumbs>
				</h3>
				<form className="flex flex-col gap-8">
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
											// value={field.value}
											// onValueChange={(value) =>
											//     field.onChange(
											//         checkboxSetterSingleItem(value)
											//     )
											// }
											// isInvalid={!!errors.TITLE}
											// errorMessage={
											//     errors.TITLE?.message
											// }
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
													// value={field.value}
													// onValueChange={(value) => {
													// 	field.onChange(value);
													// }}
													// isReadOnly={location.pathname.includes("info")}
													// isInvalid={!!errors.OTHER_CONDITIONS}
													// errorMessage={errors.OTHER_CONDITIONS?.message}
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
									name="GIVEN_NAME"
									control={control}
									rules={{ required: "Given name is required" }}
									render={({ field, formState: { errors } }) => (
										<Input
											// value={field.value}
											// onValueChange={(value) => {
											// 	field.onChange(value);
											// }}
											// isReadOnly={location.pathname.includes("info")}
											// isInvalid={!!errors.GIVEN_NAME}
											// errorMessage={errors.GIVEN_NAME?.message}
											aria-label="given name"
											label="Given Name"
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
									name="SURNAME"
									control={control}
									rules={{ required: "Last name is required" }}
									render={({ field, formState: { errors } }) => (
										<Input
											// value={field.value}
											// onValueChange={(value) => {
											// 	field.onChange(value);
											// }}
											// isReadOnly={location.pathname.includes("info")}
											// isInvalid={!!errors.SURNAME}
											// errorMessage={errors.SURNAME?.message}
											aria-label="Surname"
											label="Surname"
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
											// value={field.value}
											// onValueChange={(value) => {
											// 	field.onChange(value);
											// }}
											// isReadOnly={location.pathname.includes("info")}
											// isInvalid={!!errors.OCCUPATION}
											// errorMessage={errors.OCCUPATION?.message}
											aria-label="Surname"
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
									name="BIRTHDATE"
									control={control}
									rules={{ required: "Date is required" }}
									render={({ field, formState: { errors } }) => (
										<CustomDatePicker
											value={field.value}
											isInvalid={!!errors.BIRTHDATE}
											errorMessage={errors.BIRTHDATE?.message}
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
											// value={field.value}
											// onValueChange={(value) => {
											// 	field.onChange(value);
											// }}
											// isReadOnly={location.pathname.includes("info")}
											// isInvalid={!!errors.HOME_ADDRESS}
											// errorMessage={errors.HOME_ADDRESS?.message}
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
											// value={field.value}
											// onValueChange={(value) => {
											// 	field.onChange(value);
											// }}
											// isReadOnly={location.pathname.includes("info")}
											// isInvalid={!!errors.CONTACT_NUMBER}
											// errorMessage={errors.CONTACT_NUMBERr?.message}
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
									name="EMAIL"
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
											// value={field.value}
											// onValueChange={(value) => {
											// 	field.onChange(value);
											// }}
											// isReadOnly={location.pathname.includes("info")}
											// isInvalid={!!errors.EMAIL}
											// errorMessage={errors.EMAIL?.message}
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
											// value={field.value}
											// onValueChange={(value) => {
											// 	field.onChange(value);
											// }}
											// isReadOnly={location.pathname.includes("info")}
											// isInvalid={!!errors.HEALTH_FUND}
											// errorMessage={errors.HEALTH_FUND?.message}
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
											// value={field.value}
											// onValueChange={(value) => {
											// 	field.onChange(value);
											// }}
											// isReadOnly={location.pathname.includes("info")}
											// isInvalid={!!errors.MEMBER_NUMBER}
											// errorMessage={errors.MEMBER_NUMBER?.message}
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
									name="E_NAME"
									control={control}
									rules={{ required: "Name is required" }}
									render={({ field, formState: { errors } }) => (
										<Input
											// value={field.value}
											// onValueChange={(value) => {
											// 	field.onChange(value);
											// }}
											// isReadOnly={location.pathname.includes("info")}
											// isInvalid={!!errors.E_NAME}
											// errorMessage={errors.E_NAME?.message}
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
									name="E_PHONE_NUMBER"
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
											// value={field.value}
											// onValueChange={(value) => {
											// 	field.onChange(value);
											// }}
											// isReadOnly={location.pathname.includes("info")}
											// isInvalid={!!errors.E_PHONE_NUMBER}
											// errorMessage={errors.E_PHONE_NUMBER?.message}
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
									name="RELATIONSHIP"
									control={control}
									rules={{ required: "Name is required" }}
									render={({ field, formState: { errors } }) => (
										<Input
											// value={field.value}
											// onValueChange={(value) => {
											// 	field.onChange(value);
											// }}
											// isReadOnly={location.pathname.includes("info")}
											// isInvalid={!!errors.RELATIONSHIP}
											// errorMessage={errors.RELATIONSHIP?.message}
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
											// value={field.value}
											// onValueChange={(value) => {
											// 	field.onChange(value);
											// }}
											// isReadOnly={location.pathname.includes("info")}
											// isInvalid={!!errors.FAMILY_DOCTOR}
											// errorMessage={errors.FAMILY_DOCTOR?.message}
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
									name="D_PHONE_NUMBER"
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
											// value={field.value}
											// onValueChange={(value) => {
											// 	field.onChange(value);
											// }}
											// isReadOnly={location.pathname.includes("info")}
											// isInvalid={!!errors.D_PHONE_NUMBER}
											// errorMessage={errors.D_PHONE_NUMBER?.message}
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
									name="PREV_ILLNESS"
									control={control}
									render={({ field, formState: { errors } }) => (
										<CheckboxGroup
											label="Have you ever had or are you suffering from any of the following? (Please tick that apply)"
											orientation="vertical"
											// value={field.value}
											// onValueChange={(value) =>
											//     field.onChange(
											//         checkboxSetterSingleItem(value)
											//     )
											// }
											// isInvalid={!!errors.PREV_ILLNESS}
											// errorMessage={
											//     errors.PREV_ILLNESS?.message
											// }
											classNames={{
												label: "text-darkText font-semibold",
												wrapper: "~pl-2/5 grid grid-cols-2 gap-3",
											}}
										>
											<Checkbox value="Diabetes">Diabetes</Checkbox>
											<Checkbox value="Asthma">Asthma</Checkbox>
											<Checkbox value="Heart Disorder/Complaint">
												Heart Disorder/Complaint
											</Checkbox>
											<Checkbox value="Sterold Theraphy">
												Sterold Theraphy
											</Checkbox>
											<Checkbox value="Radiation Theraphy">
												Radiation Theraphy
											</Checkbox>
											<Checkbox value="Stroke">Stroke</Checkbox>
											<Checkbox value="Excessive Bleeding">
												Excessive Bleeding
											</Checkbox>
											<Checkbox value="Kidney Disease">
												Kidney Disease
											</Checkbox>
											<Checkbox value="Cancer">Cancer</Checkbox>
											<Checkbox value="Tuberculosis">Tuberculosis</Checkbox>
											<Checkbox value="Rheumatic Fever">
												Rheumatic Fever
											</Checkbox>
											<Checkbox value="Bone Disease (Osteoporosis)">
												Bone Disease (Osteoporosis)
											</Checkbox>
											<Checkbox value="Epilepsy">Epilepsy</Checkbox>
											<Checkbox value="Fainting Disorder">
												Fainting Disorder
											</Checkbox>
											<Checkbox value="Cardiac Pacemaker">
												Cardiac Pacemaker
											</Checkbox>
											<Checkbox value="Stomach or Digestive Disorder">
												Stomach or Digestive Disorder
											</Checkbox>
											<Checkbox value="Prosthetic Implant">
												Prosthetic Implant
											</Checkbox>
											<Checkbox value="Lung Disease (eg. Bronchitis)">
												Lung Disease (eg. Bronchitis)
											</Checkbox>
											<Checkbox value="Hepatitis or Other Liver Disease">
												Hepatitis or Other Liver Disease
											</Checkbox>
											<Checkbox value="Blood Disease (eg. Anemia)">
												Blood Disease (eg. Anemia)
											</Checkbox>
											<Checkbox value="Thyroid Disease">
												Thyroid Disease
											</Checkbox>
											<Checkbox value="Nervous or Psychiatric Condition">
												Nervous or Psychiatric Condition
											</Checkbox>
											<Checkbox value="Low or High Blood Pressure">
												Low or High Blood Pressure
											</Checkbox>
											<Checkbox value="Sleep Apnoea">Sleep Apnoea</Checkbox>
											<Checkbox value="Allergy to Penicillin">
												Allergy to Penicillin
											</Checkbox>
											<Checkbox value="Allergy to Medications">
												Allergy to Medications
											</Checkbox>
											<Checkbox value="Allergy to Latex">
												Allergy to Latex
											</Checkbox>
										</CheckboxGroup>
									)}
								/>
							</div>
							<div style={{ flex: 1 }} className="flex flex-col gap-5">
								<Controller
									name="OTHER_CONDITIONS"
									control={control}
									render={({ field, formState: { errors } }) => (
										<Input
											// value={field.value}
											// onValueChange={(value) => {
											// 	field.onChange(value);
											// }}
											// isReadOnly={location.pathname.includes("info")}
											// isInvalid={!!errors.OTHER_CONDITIONS}
											// errorMessage={errors.OTHER_CONDITIONS?.message}
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
									)}
								/>
								<Controller
									name="PREGNANT"
									control={control}
									render={({ field, formState: { errors } }) => (
										<Input
											// value={field.value}
											// onValueChange={(value) => {
											// 	field.onChange(value);
											// }}
											// isReadOnly={location.pathname.includes("info")}
											// isInvalid={!!errors.PREGNANT}
											// errorMessage={errors.PREGNANT?.message}
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
									name="BEEN_A_PATIENT"
									control={control}
									render={({ field, formState: { errors } }) => (
										<Input
											// value={field.value}
											// onValueChange={(value) => {
											// 	field.onChange(value);
											// }}
											// isReadOnly={location.pathname.includes("info")}
											// isInvalid={!!errors.BEEN_A_PATIENT}
											// errorMessage={errors.BEEN_A_PATIENT?.message}
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
											// value={field.value}
											// onValueChange={(value) => {
											// 	field.onChange(value);
											// }}
											// isReadOnly={location.pathname.includes("info")}
											// isInvalid={!!errors.MEDICATION}
											// errorMessage={errors.MEDICATION?.message}
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
									name="SMOKE"
									control={control}
									render={({ field, formState: { errors } }) => (
										<Input
											// value={field.value}
											// onValueChange={(value) => {
											// 	field.onChange(value);
											// }}
											// isReadOnly={location.pathname.includes("info")}
											// isInvalid={!!errors.SMOKE}
											// errorMessage={errors.SMOKE?.message}
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
									name="PREV_ILLNESS"
									control={control}
									render={({ field, formState: { errors } }) => (
										<CheckboxGroup
											label="Are you concerned about or experiencing any of the following dental problems? (Please tick as many as it applies)"
											orientation="vertical"
											// value={field.value}
											// onValueChange={(value) =>
											//     field.onChange(
											//         checkboxSetterSingleItem(value)
											//     )
											// }
											// isInvalid={!!errors.PREV_ILLNESS}
											// errorMessage={
											//     errors.PREV_ILLNESS?.message
											// }
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
									name="OTHER_CONDITIONS"
									control={control}
									render={({ field, formState: { errors } }) => (
										<Input
											// value={field.value}
											// onValueChange={(value) => {
											// 	field.onChange(value);
											// }}
											// isReadOnly={location.pathname.includes("info")}
											// isInvalid={!!errors.OTHER_CONDITIONS}
											// errorMessage={errors.OTHER_CONDITIONS?.message}
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
									name="OTHER_CONDITIONS"
									control={control}
									render={({ field, formState: { errors } }) => (
										<Input
											// value={field.value}
											// onValueChange={(value) => {
											// 	field.onChange(value);
											// }}
											// isReadOnly={location.pathname.includes("info")}
											// isInvalid={!!errors.OTHER_CONDITIONS}
											// errorMessage={errors.OTHER_CONDITIONS?.message}
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
								/>
							</div>
						</div>
						<div className="flex flex-row gap-5">
							<div style={{ flex: 1 }}>
								<Controller
									name="PREV_ILLNESS"
									control={control}
									render={({ field, formState: { errors } }) => (
										<CheckboxGroup
											label="Have you ever had or are you suffering from any of the following? (Please tick that apply)"
											orientation="vertical"
											// value={field.value}
											// onValueChange={(value) =>
											//     field.onChange(
											//         checkboxSetterSingleItem(value)
											//     )
											// }
											// isInvalid={!!errors.PREV_ILLNESS}
											// errorMessage={
											//     errors.PREV_ILLNESS?.message
											// }
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
									name="PREV_ILLNESS"
									control={control}
									render={({ field, formState: { errors } }) => (
										<CheckboxGroup
											label="Does dental treatment make you nervous?"
											orientation="horizontal"
											// value={field.value}
											// onValueChange={(value) =>
											//     field.onChange(
											//         checkboxSetterSingleItem(value)
											//     )
											// }
											// isInvalid={!!errors.PREV_ILLNESS}
											// errorMessage={
											//     errors.PREV_ILLNESS?.message
											// }
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
									name="PREV_ILLNESS"
									control={control}
									render={({ field, formState: { errors } }) => (
										<CheckboxGroup
											label="How did you hear about us?"
											orientation="vertical"
											// value={field.value}
											// onValueChange={(value) =>
											//     field.onChange(
											//         checkboxSetterSingleItem(value)
											//     )
											// }
											// isInvalid={!!errors.PREV_ILLNESS}
											// errorMessage={
											//     errors.PREV_ILLNESS?.message
											// }
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
													// value={field.value}
													// onValueChange={(value) => {
													// 	field.onChange(value);
													// }}
													// isReadOnly={location.pathname.includes("info")}
													// isInvalid={!!errors.OTHER_CONDITIONS}
													// errorMessage={errors.OTHER_CONDITIONS?.message}
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
													value="Friend/Family (Please provide name so we can
													thank them)"
													classNames={{
														label: "flex flex-row items-center gap-2",
													}}
												>
													Friend/Family (Please provide name so we can
													thank them)
												</Checkbox>
												<Input
													// value={field.value}
													// onValueChange={(value) => {
													// 	field.onChange(value);
													// }}
													// isReadOnly={location.pathname.includes("info")}
													// isInvalid={!!errors.OTHER_CONDITIONS}
													// errorMessage={errors.OTHER_CONDITIONS?.message}
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
									name="PREV_ILLNESS"
									control={control}
									render={({ field, formState: { errors } }) => (
										<CheckboxGroup
											label="Consent for Services"
											orientation="vertical"
											// value={field.value}
											// onValueChange={(value) =>
											//     field.onChange(
											//         checkboxSetterSingleItem(value)
											//     )
											// }
											// isInvalid={!!errors.PREV_ILLNESS}
											// errorMessage={
											//     errors.PREV_ILLNESS?.message
											// }
											classNames={{
												label: "text-darkText font-semibold",
												wrapper: "~pl-2/5",
											}}
										>
											<Checkbox value="I consent to the dental and oral surgery procedures agreed to be necessary or advisable, including the use of local anesthetic and other medication as indicated.  ">
												I consent to the dental and oral surgery procedures
												agreed to be necessary or advisable, including the
												use of local anesthetic and other medication as
												indicated.
											</Checkbox>
											<Checkbox value="I understand that the practice requires at least 24 hours notice if I need to cancel my scheduled appointment and that a cancellation fee may be incurred if I fail to do so.   ">
												I understand that the practice requires at least 24
												hours notice if I need to cancel my scheduled
												appointment and that a cancellation fee may be
												incurred if I fail to do so.
											</Checkbox>
											<Checkbox value="I authorize the dentist or the designated team to take x-rays, study models, photographs, and other diagnostic aids deemed appropriate by the dentist to make a thorough diagnosis.   ">
												I authorize the dentist or the designated team to
												take x-rays, study models, photographs, and other
												diagnostic aids deemed appropriate by the dentist to
												make a thorough diagnosis.
											</Checkbox>
											<Checkbox value="I am aware that payment is required on the day of treatment.">
												I am aware that payment is required on the day of
												treatment.
											</Checkbox>
											<Checkbox value="We provide a courtesy to our patients a preventative recall program that offers a call service if you have not been to the practice in 6 months.   ">
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
					<Button color="primary" className="px-8 w-fit">
						Submit
					</Button>
				</form>
			</div>
		</div>
	);
};

export default PatientDetails;
