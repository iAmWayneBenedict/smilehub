import { Tabs, Tab } from "@nextui-org/react";
import { useState } from "react";
import TableAppointments from "./components/Table";
import AppointmentModal from "@/components/layout/shared/appointment";
import ReschedModal from "@/components/layout/Modals/ReschedModal";
import { useMediaQuery } from "react-responsive";

const Appointments = () => {
	// controlled tabs
	const [selected, setSelected] = useState("new-appointments");
	const mobileScreen = useMediaQuery({
		query: "(max-width: 640px)",
	});
	return (
		<div style={{ flex: 1 }} className="mt-10">
			<div style={{ flex: 1 }} className="relative p-4 bg-white">
				<div>
					<Tabs
						selectedKey={selected}
						onSelectionChange={setSelected}
						variant={"underlined"}
						aria-label="Tabs variants"
						color="primary"
						classNames={{
							tabContent:
								"group-data-[selected=true]:text-darkText group-data-[selected=true]:font-bold",
						}}
					>
						<Tab
							key="new-appointments"
							title={mobileScreen ? "NEW" : "NEW APPOINTMENTS"}
						>
							<TableAppointments type={"new"} />
						</Tab>
						<Tab
							key="completed-appointments"
							title={mobileScreen ? "COMPLETED" : "COMPLETED APPOINTMENTS"}
						>
							<TableAppointments type={"completed"} />
						</Tab>
						<Tab
							key="archived-appointments"
							title={mobileScreen ? "ARCHIVED" : "ARCHIVED APPOINTMENTS"}
						>
							<TableAppointments type={"archived"} />
						</Tab>
					</Tabs>
				</div>
				<AppointmentModal />
				<ReschedModal />
				{/* <div className="absolute right-0 flex justify-end px-10 top-4">
					<Button color="primary">New Appointment</Button>
				</div> */}
			</div>
		</div>
	);
};

export default Appointments;
