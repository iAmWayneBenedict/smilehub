import { Image, Input, Button } from "@nextui-org/react";
import { Search, LogOut } from "lucide-react";
import logoText from "../../../../assets/icons/SMILEHUB.png";
import { useAppStore } from "@/store/zustand";

const SharedNavBar = () => {
	const { setAlertDialogDetails } = useAppStore();
	return (
		<div className="flex items-center border-gray-300 border-b-1">
			<div className="flex justify-center px-5 border-gray-300 w-72 py-7 border-r-1">
				<div className="">
					<Image src={logoText} removeWrapper className="rounded-none" />
				</div>
			</div>
			<div style={{ flex: 1 }} className="flex justify-between px-5">
				<div style={{ flex: 1 }} className="max-w-[40rem] w-full">
					{/* search nav bar */}
					<Input
						endContent={<Search className="text-[#a2a2a2]" />}
						variant="bordered"
						color="primary"
						type="text"
						placeholder="Search"
						className="w-full bg-white"
						size="lg"
						radius="sm"
						classNames={{
							label: "text-[#a2a2a2]",
						}}
					/>
				</div>
				<div style={{ flex: 1 }} className="flex justify-evenly max-w-[40rem]">
					<div>
						{/* TODO: make this dynamic */}
						<h5>John Doe</h5>
						<h6 className="text-sm font-bold">Admin</h6>
					</div>
					<div>
						<Input
							variant="bordered"
							color="primary"
							type="text"
							readOnly
							value={formatDate(new Date())}
						/>
					</div>
					<div>
						<Button variant="light">My Profile</Button>
					</div>
					<div>
						<Button
							variant="light"
							color="danger"
							isIconOnly
							onClick={() => {
								// display the alert dialog
								setAlertDialogDetails({
									type: "danger",
									message: "Are you sure you want to logout?",
									isOpen: true,
									dialogType: "confirm",
								});
							}}
						>
							<LogOut />
						</Button>
					</div>
				</div>
			</div>
		</div>
	);
};

export default SharedNavBar;
function formatDate(date) {
	const options = { day: "2-digit", month: "long", year: "numeric" };
	const formattedDate = date.toLocaleDateString("en-PH", options);

	// Custom formatting to add a comma between day and month
	const dateParts = formattedDate.split(" ");
	return `${dateParts[1]} ${dateParts[0]} ${dateParts[2]}`;
}
