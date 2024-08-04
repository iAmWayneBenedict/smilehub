import SectionHeader from "@/components/layout/patient/components/SectionHeader";
import ContainerWrapper from "@/components/layout/wrappers/ContainerWrapper";
import officeTimings from "../../assets/icons/time 1.png";
import emailAddress from "../../assets/icons/pin 1.png";
import phoneNumber from "../../assets/icons/telephone 1.png";
import "../style/main.css";
import { Image, Input, Select, SelectItem, Button } from "@nextui-org/react";
import CustomDatePicker from "@/components/ui/DatePicker";
import FAQ from "@/components/layout/patient/FAQ";
import { useForm, Controller } from "react-hook-form";
import { getLocalTimeZone, today } from "@internationalized/date";

const contactAddressCard = [
	{
		icon: officeTimings,
		title: "Address",
		description: "Monday - Saturday (9:00am to 5pm) Sunday (Closed)",
	},
	{
		icon: emailAddress,
		title: "Email Address",
		description: "bajardentalclinic@gmail.com",
	},
	{
		icon: phoneNumber,
		title: "Phone Number",
		description: "0900-786-9701",
	},
];
const purpose = [
	"Dental Bonding",
	"Teeth Whitening",
	"Dental Crowns",
	"Bridgework",
	"Invisalign",
	"Dentures",
	"Dental Sealants",
	"Tooth Extractions",
];
const timeDropdownList = [
	"8:00 AM - 9:00 AM",
	"9:00 AM - 10:00 AM",
	"10:00 AM - 11:00 AM",
	"11:00 AM - 12:00 PM",
	"1:00 PM - 2:00 PM",
	"2:00 PM - 3:00 PM",
	"3:00 PM - 4:00 PM",
	"4:00 PM - 5:00 PM",
];

const Contact = () => {
	// Form hook
	const {
		register,
		handleSubmit,
		control,
		formState: { errors },
	} = useForm({
		defaultValues: {
			first_name: "",
			last_name: "",
			email: "",
			phone_number: "",
			date: today(getLocalTimeZone()), // default date (today)
			time: "",
			purpose: "",
		},
	});
	const onSubmit = (data) => console.log(data);
	return (
		<>
			<div id="banner-pages">
				<ContainerWrapper>
					<div className="flex flex-col items-center justify-center mt-36">
						<SectionHeader
							textUnderlined="Get in touch"
							description="Book an Appointment to treat your teeth right now."
							customUnderlineOptions={{
								isLarge: true,
								classes: "w-[105%]",
							}}
						/>
					</div>
					<div className="flex flex-col lg:flex-row ~gap-12/24 ~mx-2/12 mt-24">
						<div style={{ flex: 5 }} className="flex flex-col gap-4">
							<div className="overflow-hidden border-2 w-full rounded-lg border-[#25b4f8]">
								<iframe
									src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3856.854912889698!2d120.86322007617271!3d14.833398771332538!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3396531ddf41a599%3A0xdae91f79b3364056!2sDental%20Cafe%20by%20Bajar%20Dental%20Clinic%20and%20One%20Scoop%20Cookies!5e0!3m2!1sen!2sph!4v1721551841017!5m2!1sen!2sph"
									className="w-full h-96"
									style={{ border: 0 }}
									allowFullScreen=""
									loading="lazy"
									referrerPolicy="no-referrer-when-downgrade"
								/>
							</div>
							<div className="flex flex-col gap-4">
								{contactAddressCard.map((card, index) => (
									<div
										key={index}
										id="address-card"
										className="flex items-center gap-4 px-8 bg-white shadow-lg h-28 rounded-xl"
									>
										<div className="p-3 rounded-full bg-primary w-fit h-fit">
											<Image
												src={card.icon}
												className="w-6"
												alt="Office Timings"
											/>
										</div>
										<div className="flex flex-col">
											<h4 className="~text-lg/xl font-semibold text-[--dark-text]">
												{card.title}
											</h4>
											<span className="text-secondaryText max-w-64 ~text-sm/base">
												{card.description}
											</span>
										</div>
									</div>
								))}
							</div>
						</div>
						<div style={{ flex: 7 }}>
							<div className="border-2 rounded-lg border-[#25b4f8] p-10">
								<form
									onSubmit={handleSubmit(onSubmit)}
									className="flex flex-col gap-6"
								>
									<div className="flex flex-row gap-5">
										<Input
											{...register("first_name", {
												required: "First Name is required",
											})}
											isInvalid={!!errors.first_name}
											errorMessage={errors.first_name?.message}
											key={"f_name"}
											type="text"
											label="First Name"
											size="lg"
											variant="bordered"
											color="primary"
											className="w-full"
											classNames={{
												label: "text-darkText font-semibold ",
												inputWrapper: "rounded-lg h-full bg-white",
												mainWrapper: "h-[4rem]",
											}}
											placeholder="First Name"
											labelPlacement={"outside"}
										/>
										<Input
											{...register("last_name", {
												required: "Last Name is required",
											})}
											isInvalid={!!errors.last_name}
											errorMessage={errors.last_name?.message}
											key={"l_name"}
											type="text"
											label="Last Name"
											size="lg"
											variant="bordered"
											color="primary"
											className="w-full"
											classNames={{
												label: "text-darkText font-semibold ",
												inputWrapper: "rounded-lg h-full bg-white",
												mainWrapper: "h-[4rem]",
											}}
											placeholder="Last Name"
											labelPlacement={"outside"}
										/>
									</div>
									<Input
										{...register("email", {
											required: "Email is required",
											pattern: {
												value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
												message: "Invalid email address",
											},
										})}
										isInvalid={!!errors.email}
										errorMessage={errors.email?.message}
										key={"email"}
										type="text"
										label="Email"
										size="lg"
										variant="bordered"
										color="primary"
										className="w-full"
										classNames={{
											label: "text-darkText font-semibold ",
											inputWrapper: "rounded-lg h-full bg-white",
											mainWrapper: "h-[4rem]",
										}}
										placeholder="you@gmail.com"
										labelPlacement={"outside"}
									/>
									<Input
										{...register("phone_number", {
											required: "Phone Number is required",
										})}
										isInvalid={!!errors.phone_number}
										errorMessage={errors.phone_number?.message}
										label="Phone Number"
										placeholder="+63 900-000-0000"
										labelPlacement="outside"
										type="number"
										size="lg"
										variant="bordered"
										color="primary"
										className="w-full"
										classNames={{
											label: "text-darkText font-semibold ",
											inputWrapper: "rounded-lg h-full bg-white",
											mainWrapper: "max-h-[4rem]",
										}}
										startContent={"+63"}
									/>
									<Controller
										name="date"
										control={control}
										rules={{ required: "Date is required" }}
										render={({ field, formState: { errors } }) => (
											<CustomDatePicker
												value={field.value}
												isInvalid={!!errors.date}
												errorMessage={errors.date?.message}
												setValue={(value) => {
													field.onChange(value);
												}}
											/>
										)}
									/>
									<Controller
										name="time"
										control={control}
										rules={{ required: "Time is required" }}
										render={({ field, formState: { errors } }) => (
											<Select
												{...field}
												selectedKeys={[field.value]}
												onChange={(selectedKeys) => {
													field.onChange(selectedKeys);
												}}
												isInvalid={!!errors.time}
												errorMessage={errors.time?.message}
												labelPlacement={"outside"}
												placeholder="Select Time"
												label="Time of Visit"
												size="lg"
												variant="bordered"
												color="primary"
												className="w-full bg-white"
												classNames={{
													label: "text-darkText font-semibold ",
													inputWrapper: "rounded-lg h-full",
													trigger: "h-[4rem]",
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
									<Controller
										name="purpose"
										control={control}
										rules={{ required: "Time is required" }}
										render={({ field, formState: { errors } }) => (
											<Select
												{...field}
												selectedKeys={[field.value]}
												onChange={(selectedKeys) => {
													field.onChange(selectedKeys);
												}}
												isInvalid={!!errors.purpose}
												errorMessage={errors.purpose?.message}
												labelPlacement={"outside"}
												placeholder="Select Purpose"
												label="Purpose of Visit"
												size="lg"
												variant="bordered"
												color="primary"
												className="w-full bg-white"
												classNames={{
													label: "text-darkText font-semibold ",
													inputWrapper: "rounded-lg h-full",
													trigger: "h-[4rem]",
												}}
											>
												{purpose.map((time) => (
													<SelectItem key={time} value={time}>
														{time}
													</SelectItem>
												))}
											</Select>
										)}
									/>

									<div className="flex justify-center mt-16">
										<Button
											color="primary"
											type="submit"
											className="font-semibold p-7 w-fit"
										>
											Book an appointment
										</Button>
									</div>
								</form>
							</div>
						</div>
					</div>
				</ContainerWrapper>
			</div>
			<FAQ />
		</>
	);
};

export default Contact;
