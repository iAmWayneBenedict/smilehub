import SectionHeader from "@/components/layout/patient/components/SectionHeader";
import ContainerWrapper from "@/components/layout/wrappers/ContainerWrapper";
import { Button, Input } from "@nextui-org/react";

const RequestAppointment = () => {
	return (
		<div className="bg-[--dark-bg] p-16 mt-36">
			<ContainerWrapper className="flex flex-col lg:flex-row">
				<div id="request-appointment-left" style={{ flex: 5 }}>
					<SectionHeader
						firstSeriesText="Leave your worries at the door and enjoy a healthier, more "
						textUnderlined="Precise Smile"
						description="We use only the best quality materials on the market in order to provide the best products to our patients."
						customUnderlineOptions={{
							color: "white",
							isLarge: false,
							classes: "w-[105%]",
						}}
						elementClasses={{
							parentClasses: "items-start",
							headingClasses: "text-white text-left",
							childClasses: "text-white text-left",
						}}
					/>
					<Button color="primary" className="mt-10 font-semibold p-7 w-fit">
						Learn More
					</Button>
				</div>
				<div style={{ flex: 7 }} className="flex items-center justify-end">
					<div className="max-w-none mt-14 lg:mt-0 lg:max-w-[35rem] w-full p-10 rounded-3xl bg-white">
						<h4 className="mb-10 text-3xl font-semibold text-center">
							Request Appointment
						</h4>
						<div className="flex flex-col gap-5">
							<Input
								variant="bordered"
								color="primary"
								type="text"
								label="Full Name"
								classNames={{
									label: "text-[#a2a2a2]",
								}}
							/>
							<Input
								variant="bordered"
								color="primary"
								type="text"
								label="Phone Number"
								classNames={{
									label: "text-[#a2a2a2]",
								}}
							/>
							<Input
								variant="bordered"
								color="primary"
								type="email"
								label="Email Address"
								classNames={{
									label: "text-[#a2a2a2]",
								}}
							/>

							<div className="flex justify-center">
								<Button
									color="primary"
									className="px-24 text-base font-semibold w-fit py-7"
								>
									Submit
								</Button>
							</div>
						</div>
					</div>
				</div>
			</ContainerWrapper>
		</div>
	);
};

export default RequestAppointment;
