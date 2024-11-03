import { Image, Input, Button, Link } from "@nextui-org/react";
import { Search, LogOut } from "lucide-react";
import logoText from "../../../../assets/icons/SMILEHUB.png";
import { useAppStore, useAuthTokenPersisted } from "@/store/zustand";
import "./styles.css";
import { cn, decrypt } from "@/lib/utils";
import { useLocation } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import EmployeesAPIManager from "@/services/api/managers/employees/EmployeesAPIManager.js";
import { CustomSheet } from "../../Sheet/Sheet";

const SharedNavBar = () => {
	const { setAlertDialogDetails } = useAppStore();
	const { setAuthToken, authToken } = useAuthTokenPersisted();
	const userDetails = decrypt(authToken);
	const location = useLocation();
	const currentUserType = userDetails?.role?.toLowerCase();
	const [currentUser, setCurrentUser] = useState(null);
	const { data, isSuccess } = useQuery({
		queryKey: ["patients-nav"],
		queryFn: EmployeesAPIManager.getAllEmployee,
	});

	useEffect(() => {
		if (isSuccess) {
			const filteredUser = data?.find((employee) => employee.EMAIL === userDetails?.email);
			setCurrentUser(filteredUser);
		}
	}, [data, isSuccess]);
	return (
		<div className="flex items-center border-gray-300 border-b-1">
			<div className={cn(`flex justify-between w-full lg:w-fit item-center ~px-5/8 lg:px-0`)}>
				<div style={{ flex: 1 }} className={cn(`flex lg:hidden items-center`)}>
					<CustomSheet />
				</div>
				<div
					id="logoNav"
					className="flex justify-center px-0 border-0 border-gray-300 lg:px-5 py-7 lg:border-r-1"
				>
					<div>
						<Link href={"/"}>
							<Image
								src={logoText}
								removeWrapper
								className="rounded-none w-36 md:w-fit"
							/>
						</Link>
					</div>
				</div>
			</div>
			<div style={{ flex: 1 }} className="justify-end hidden px-5 lg:flex">
				<div style={{ flex: 1 }} className="flex justify-evenly max-w-[40rem]">
					<div>
						<h5>{currentUser?.FULLNAME}</h5>
						<h6 className="text-sm font-bold">{currentUser?.ROLE}</h6>
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
						<Button
							variant="light"
							as={Link}
							color={
								location.pathname === `/${currentUserType}/profile`
									? "primary"
									: "default"
							}
							href={`/${currentUserType}/profile/${currentUser?.ID}`}
						>
							My Profile
						</Button>
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
									confirmCallback: () => {
										// log out user
										setAuthToken(false);
										setTimeout(() => {
											setAlertDialogDetails({
												isOpen: true,
												type: "success",
												title: "Success!",
												message: "You have been successfully logged out.",
												actionLink: "/",
											});
										}, 1000);
									},
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
