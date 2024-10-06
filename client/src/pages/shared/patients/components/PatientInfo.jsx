import {
	Input,
	Select,
	SelectItem,
	Button,
	Breadcrumbs,
	BreadcrumbItem,
	Link,
	Image,
	Skeleton,
} from "@nextui-org/react";
import { useForm, Controller } from "react-hook-form";
import { getLocalTimeZone, parseDate, today } from "@internationalized/date";
import CustomDatePicker from "@/components/ui/DatePicker";
import noteImg from "../../../../assets/icons/notes.png";
import teethImg from "../../../../assets/icons/teeth.png";
import DropFileInput from "./DropFileInput";
import AssessmentPatient from "@/components/layout/Modals/AssessmentPatient";
import TeethDiagram from "@/components/layout/Modals/TeethDiagram";
import { useAppStore, useAuthTokenPersisted } from "@/store/zustand";
import { HeartPulse } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import PatientsAPIManager from "@/services/api/managers/patients/PatientsAPIManager";
import { useParams, useLocation } from "react-router-dom";
import PropTypes from "prop-types";
import { useEffect, useMemo } from "react";
import { convertDateYYYYMMDD } from "@/services/api/utils";
import { useMutation } from "@tanstack/react-query";
import { decrypt } from "@/lib/utils";

const PatientInfo = () => {
	const { setTeethDiagramModalDetails, setAssessmentPatientModal } = useAppStore();
	const params = useParams();

	const { data, isLoading, isSuccess, refetch } = useQuery({
		queryKey: ["patients", "info", params?.id],
		queryFn: () => PatientsAPIManager.getDetailPatient({ ID: params?.id }),
	});

	const currentUser = location.pathname.includes("admin") ? "admin" : "staff";
	return (
		<div style={{ flex: 1 }} className="bg-[#f9f9f9]">
			<div className="w-full h-full">
				<h3 className="p-5 text-lg font-darkText">
					<Breadcrumbs>
						<BreadcrumbItem href={`/${currentUser}/patients`}>Patients</BreadcrumbItem>
						<BreadcrumbItem href={`/${currentUser}/patients/info`}>
							Patient Information
						</BreadcrumbItem>
					</Breadcrumbs>
				</h3>
				<div className="flex flex-col gap-3">
					<div className="w-full p-6 pt-10 mt-5 bg-white">
						<div className="mb-10">
							<h2 className="text-2xl font-semibold">
								{(data?.FIRSTNAME || "") + " " + (data?.LASTNAME || "")}
							</h2>
						</div>
						<div className="flex">
							<div style={{ flex: 3 }}>
								{!isLoading && (
									<Form data={data} params={params} refetch={refetch} />
								)}
								{isLoading && (
									<div className="max-w-4xl space-y-8">
										<Skeleton className="mb-20 rounded-lg w-96">
											<div className="w-full h-16 rounded-lg bg-default-200"></div>
										</Skeleton>
										<div className="flex gap-10">
											<Skeleton style={{ flex: 1 }} className="rounded-lg">
												<div className="w-full h-10 rounded-lg bg-default-200"></div>
											</Skeleton>
											<Skeleton style={{ flex: 4 }} className="rounded-lg">
												<div className="w-full h-10 rounded-lg bg-default-200"></div>
											</Skeleton>
										</div>
										<div className="flex gap-10">
											<Skeleton style={{ flex: 1 }} className="rounded-lg">
												<div className="w-full h-10 rounded-lg bg-default-200"></div>
											</Skeleton>
											<Skeleton style={{ flex: 4 }} className="rounded-lg">
												<div className="w-full h-10 rounded-lg bg-default-200"></div>
											</Skeleton>
										</div>
										<div className="flex gap-10">
											<Skeleton style={{ flex: 1 }} className="rounded-lg">
												<div className="w-full h-10 rounded-lg bg-default-200"></div>
											</Skeleton>
											<Skeleton style={{ flex: 4 }} className="rounded-lg">
												<div className="w-full h-10 rounded-lg bg-default-200"></div>
											</Skeleton>
										</div>
										<div className="flex gap-10">
											<Skeleton style={{ flex: 1 }} className="rounded-lg">
												<div className="w-full h-10 rounded-lg bg-default-200"></div>
											</Skeleton>
											<Skeleton style={{ flex: 4 }} className="rounded-lg">
												<div className="w-full h-10 rounded-lg bg-default-200"></div>
											</Skeleton>
										</div>
										<div className="flex gap-10">
											<Skeleton style={{ flex: 1 }} className="rounded-lg">
												<div className="w-full h-10 rounded-lg bg-default-200"></div>
											</Skeleton>
											<Skeleton style={{ flex: 4 }} className="rounded-lg">
												<div className="w-full h-10 rounded-lg bg-default-200"></div>
											</Skeleton>
										</div>
										<div className="flex gap-10">
											<Skeleton style={{ flex: 1 }} className="rounded-lg">
												<div className="w-full h-10 rounded-lg bg-default-200"></div>
											</Skeleton>
											<Skeleton style={{ flex: 4 }} className="rounded-lg">
												<div className="w-full h-10 rounded-lg bg-default-200"></div>
											</Skeleton>
										</div>
										<div className="flex gap-10">
											<Skeleton style={{ flex: 1 }} className="rounded-lg">
												<div className="w-full h-10 rounded-lg bg-default-200"></div>
											</Skeleton>
											<Skeleton style={{ flex: 4 }} className="rounded-lg">
												<div className="w-full h-10 rounded-lg bg-default-200"></div>
											</Skeleton>
										</div>
										<br />
									</div>
								)}
							</div>
							<div
								style={{ flex: 1 }}
								className="flex flex-col items-end gap-5 mr-10"
							>
								<Button
									as={Link}
									href={`/${currentUser}/patients/progress-notes/` + params?.id}
									variant="bordered"
									className="~w-32/56 py-2 pr-6 text-base font-bold text-primary h-fit"
									startContent={<Image src={noteImg} removeWrapper alt="notes" />}
								>
									Progress Notes
								</Button>
								<Button
									variant="bordered"
									className="~w-32/56 py-2 pr-6 text-base font-bold text-primary h-fit"
									startContent={
										<Image src={teethImg} removeWrapper alt="notes" />
									}
									onClick={() => {
										setTeethDiagramModalDetails({
											isOpen: true,
											title: "Teeth Diagram",
											data: { id: params?.id },
										});
									}}
								>
									Teeth Diagram
								</Button>
								<Button
									variant="bordered"
									className="~w-32/56 py-3 pr-6 text-base font-bold text-primary h-fit"
									startContent={
										<div className="rounded-xl bg-[#c8dfff] p-1 mr-3">
											<HeartPulse className="w-[40px] h-[40px] text-[#549bff]" />
										</div>
									}
									onClick={() => {
										setAssessmentPatientModal({
											isOpen: true,
											title: "Assessment",
											data: { id: params?.id },
										});
									}}
								>
									Assessment
								</Button>
							</div>
						</div>
					</div>
				</div>
			</div>
			<AssessmentPatient />
			<TeethDiagram />
		</div>
	);
};

export default PatientInfo;

const Form = ({ data, params, refetch }) => {
	const location = useLocation();
	const { setAlertDialogDetails } = useAppStore();
	const { authToken } = useAuthTokenPersisted();
	const userDetails = decrypt(authToken);
	const currentUserType = userDetails?.role?.toLowerCase();
	// Form hook
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
			if (!data)
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
			return {
				ID: data?.ID,
				FIRSTNAME: data?.FIRSTNAME,
				LASTNAME: data?.LASTNAME,
				EMAIL: data?.EMAIL,
				PHONE: data?.PHONE,
				BIRTHDATE:
					parseDate(convertDateYYYYMMDD(data?.BIRTHDATE)) || today(getLocalTimeZone()),
				GENDER: data?.GENDER,
				FILES: [],
			};
		}, [data]),
	});

	const mutation = useMutation({
		mutationFn: PatientsAPIManager.editAppointmentPatient,
		onSuccess: () => {
			reset();
			refetch();
			setAlertDialogDetails({
				isOpen: true,
				type: "success",
				title: "Success!",
				message: "Patient updated successfully",
				actionLink: `/${currentUserType}/patients/info/${params?.id}`,
			});
		},
		onError: (error) => {
			console.error(error);
			if (error.message === "Email already exists.") {
				setError("EMAIL", {
					type: "manual",
					message: "Email already exists",
				});
			} else
				setAlertDialogDetails({
					isOpen: true,
					type: "danger",
					title: "Error!",
					message: error.message,
				});
		},
	});

	useEffect(() => {
		if (!data) return;
		reset({
			ID: data?.ID,
			FIRSTNAME: data?.FIRSTNAME,
			LASTNAME: data?.LASTNAME,
			EMAIL: data?.EMAIL,
			PHONE: data?.PHONE,
			BIRTHDATE: parseDate(convertDateYYYYMMDD(data?.BIRTHDATE)) || today(getLocalTimeZone()),
			GENDER: data?.GENDER,
			FILES: [],
		});
	}, [data]);
	const onSubmit = (data) => {
		data["ID"] = params?.id ? parseInt(params?.id) : null;
		data["BIRTHDATE"] = convertDateYYYYMMDD(data["BIRTHDATE"]);
		mutation.mutate(data);
	};

	// prepare date ranges
	let now = today(getLocalTimeZone());
	const sixMonthsAgo = now.add({ months: -6 });

	const onFileChange = (e) => {
		setValue("FILES", e);
	};
	return (
		<form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-6">
			<div className="flex items-center max-w-4xl ">
				<div style={{ flex: 1 }} className="text-darkText">
					Record Number
				</div>
				<div style={{ flex: 3 }}>
					<Input
						{...register("ID")}
						aria-label="Record Number"
						isInvalid={!!errors.ID}
						errorMessage={errors.ID?.message}
						key={"f_name"}
						type="text"
						variant="bordered"
						color="primary"
						radius="sm"
						size="lg"
						isDisabled={true}
						className="w-full"
						classNames={{
							label: "text-darkText font-semibold ",
							inputWrapper: "h-full bg-white",
						}}
						labelPlacement={"outside"}
					/>
				</div>
			</div>
			<div className="flex items-center max-w-4xl ">
				<div style={{ flex: 1 }} className="text-darkText">
					First Name
				</div>
				<div style={{ flex: 3 }}>
					<Controller
						name="FIRSTNAME"
						control={control}
						rules={{ required: "First name is required" }}
						render={({ field, formState: { errors } }) => (
							<Input
								value={field.value}
								onValueChange={(value) => {
									field.onChange(value);
								}}
								isReadOnly={location.pathname.includes("info")}
								aria-label="Forename"
								isInvalid={!!errors.FIRSTNAME}
								errorMessage={errors.FIRSTNAME?.message}
								key={"f_name"}
								type="text"
								variant="bordered"
								color="primary"
								radius="sm"
								size="lg"
								className="w-full"
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
			<div className="flex items-center max-w-4xl">
				<div style={{ flex: 1 }} className="text-darkText">
					Last Name
				</div>
				<div style={{ flex: 3 }}>
					<Controller
						name="LASTNAME"
						control={control}
						rules={{ required: "Last name is required" }}
						render={({ field, formState: { errors } }) => (
							<Input
								value={field.value}
								onValueChange={(value) => {
									field.onChange(value);
								}}
								isReadOnly={location.pathname.includes("info")}
								aria-label="Surname"
								isInvalid={!!errors.LASTNAME}
								errorMessage={errors.LASTNAME?.message}
								type="text"
								variant="bordered"
								color="primary"
								radius="sm"
								size="lg"
								className="w-full"
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
			<div className="flex items-center max-w-4xl">
				<div style={{ flex: 1 }} className="text-darkText">
					Date of Birth
				</div>
				<div style={{ flex: 3 }}>
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
								isReadOnly={location.pathname.includes("info")}
								label={""}
								showTimeSelect={false}
								classNames={{
									innerWrapper: "h-full",
								}}
								aria-label="Birthdate"
								maxValue={sixMonthsAgo}
							/>
						)}
					/>
				</div>
			</div>
			<div className="flex items-center max-w-4xl">
				<div style={{ flex: 1 }} className="text-darkText">
					Gender
				</div>
				<div style={{ flex: 3 }}>
					<Controller
						name="GENDER"
						control={control}
						rules={{ required: "Gender is required" }}
						render={({ field, formState: { errors } }) => (
							<Select
								{...field}
								aria-label="Gender"
								selectedKeys={[field.value]}
								onChange={(selectedKeys) => {
									field.onChange(selectedKeys);
								}}
								textValue={"gender"}
								isInvalid={!!errors.GENDER}
								errorMessage={errors.GENDER?.message}
								labelPlacement={"outside"}
								size="lg"
								variant="bordered"
								color="primary"
								radius={"sm"}
								className="w-full bg-white max-w-48"
								classNames={{
									label: "text-darkText font-semibold ",
									inputWrapper: "h-full",
								}}
							>
								{["Male", "Female"].map((gender) => (
									<SelectItem
										key={gender}
										isReadOnly={location.pathname.includes("info")}
										value={gender}
										textValue={gender}
									>
										{gender}
									</SelectItem>
								))}
							</Select>
						)}
					/>
				</div>
			</div>
			<div className="flex items-center max-w-4xl">
				<div style={{ flex: 1 }} className="text-darkText">
					Email
				</div>
				<div style={{ flex: 3 }}>
					<Controller
						name="EMAIL"
						control={control}
						rules={{
							required: "Email is required",
							pattern: {
								value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
								message: "Invalid email address",
							},
						}}
						render={({ field, formState: { errors } }) => (
							<Input
								value={field.value}
								onValueChange={(value) => {
									field.onChange(value);
								}}
								isReadOnly={location.pathname.includes("info")}
								aria-label="Email"
								isInvalid={!!errors.EMAIL}
								errorMessage={errors.EMAIL?.message}
								type="text"
								variant="bordered"
								color="primary"
								radius="sm"
								size="lg"
								className="w-full"
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
			<div className="flex items-center max-w-4xl">
				<div style={{ flex: 1 }} className="text-darkText">
					Phone Number
				</div>
				<div style={{ flex: 3 }}>
					<Controller
						name="PHONE"
						control={control}
						rules={{
							required: "Phone is required",
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
								aria-label="Phone Number"
								isInvalid={!!errors.PHONE}
								errorMessage={errors.PHONE?.message}
								type="text"
								variant="bordered"
								color="primary"
								radius="sm"
								size="lg"
								className="w-full"
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

			<br />
			{!location.pathname.includes("info") && (
				<div className="flex items-center max-w-4xl">
					<div style={{ flex: 1 }} className="text-darkText"></div>
					<div style={{ flex: 3 }} className="flex justify-end">
						<Button
							type="submit"
							color="primary"
							size="lg"
							className="self-center w-fit"
						>
							Submit
						</Button>
					</div>
				</div>
			)}
		</form>
	);
};
Form.propTypes = {
	data: PropTypes.object,
	params: PropTypes.object,
	refetch: PropTypes.func,
};
