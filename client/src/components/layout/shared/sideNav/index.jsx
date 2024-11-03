import {
	LayoutDashboard,
	Calendar,
	UsersRound,
	ClipboardCheck,
	Package,
	CalendarPlus,
	MessageCircleQuestion,
	User as UserIcon,
	LogOut,
} from "lucide-react";
import { cn, decrypt } from "@/lib/utils";
import { useLocation } from "react-router-dom";
import { Link, Divider, Button, User } from "@nextui-org/react";
import "./styles.css";
import { useAppStore, useAuthTokenPersisted } from "@/store/zustand";
import PropTypes from "prop-types";
import { useQuery } from "@tanstack/react-query";
import EmployeesAPIManager from "@/services/api/managers/employees/EmployeesAPIManager";
import React, { useEffect, useState } from "react";
import { useMediaQuery } from "react-responsive";

const SideNav = ({ isCustom = false }) => {
	const location = useLocation();
	const { setAuthToken, authToken } = useAuthTokenPersisted();
	const user = decrypt(authToken);
	const userRole = user?.role?.toLowerCase();

	const { setAlertDialogDetails } = useAppStore();

	const [currentUser, setCurrentUser] = useState(null);

	const smallScreen = useMediaQuery({
		query: "(max-width: 1000px)",
	});

	const { data, isSuccess } = useQuery({
		queryKey: ["patients-nav"],
		queryFn: EmployeesAPIManager.getAllEmployee,
	});

	useEffect(() => {
		if (isSuccess) {
			const filteredUser = data?.find((employee) => employee.EMAIL === user?.email);
			setCurrentUser(filteredUser);
		}
	}, [data, isSuccess]);

	// update this based on the menu links
	const menuLinks = [
		{
			name: "Dashboard",
			icon: <LayoutDashboard />,
			href: "/" + userRole + "/dashboard",
		},
		{
			name: "Calendar",
			icon: <Calendar />,
			href: "/" + userRole + "/calendar",
		},
		{
			name: "Patients",
			icon: <UsersRound />,
			href: "/" + userRole + "/patients",
		},
		{
			name: "Employees",
			icon: (
				<svg
					width="26"
					height="26"
					viewBox="0 0 21 21"
					fill="none"
					xmlns="http://www.w3.org/2000/svg"
				>
					<path
						d="M7.26025 7.13656V7.13656C5.52614 7.13656 4.65908 7.13656 4.09167 7.63828C4.03036 7.69249 3.97244 7.75042 3.91823 7.81172C3.4165 8.37914 3.4165 9.24619 3.4165 10.9803V12.9595C3.4165 14.8451 3.4165 15.7879 4.00229 16.3737C4.58808 16.9595 5.53089 16.9595 7.41651 16.9595H13.0832C14.9688 16.9595 15.9116 16.9595 16.4974 16.3737C17.0832 15.7879 17.0832 14.8451 17.0832 12.9595V10.9803C17.0832 9.24619 17.0832 8.37914 16.5814 7.81172C16.5272 7.75042 16.4693 7.69249 16.408 7.63828C15.8406 7.13656 14.9735 7.13656 13.2394 7.13656V7.13656M7.26025 7.13656V7.13656C7.26025 5.73248 7.26025 5.03044 7.69382 4.59211C7.69766 4.58824 7.70152 4.58438 7.70539 4.58054C8.14372 4.14697 8.84576 4.14697 10.2498 4.14697V4.14697C11.6539 4.14697 12.356 4.14697 12.7943 4.58054C12.7982 4.58438 12.802 4.58824 12.8058 4.59211C13.2394 5.03044 13.2394 5.73248 13.2394 7.13656V7.13656M7.26025 7.13656H13.2394"
						stroke="currentColor"
						strokeWidth="1.5"
					/>
					<path
						d="M9.33783 9.66744C9.28906 9.78517 9.28906 9.93442 9.28906 10.2329V10.8428C9.28906 10.8573 9.28906 10.8645 9.28456 10.869C9.28006 10.8735 9.27281 10.8735 9.25831 10.8735H8.64844C8.34994 10.8735 8.2007 10.8735 8.08297 10.9223C7.926 10.9873 7.80128 11.112 7.73626 11.269C7.6875 11.3867 7.6875 11.536 7.6875 11.8345C7.6875 12.133 7.6875 12.2822 7.73626 12.3999C7.80128 12.5569 7.926 12.6816 8.08297 12.7466C8.2007 12.7954 8.34994 12.7954 8.64844 12.7954H9.25831C9.27281 12.7954 9.28006 12.7954 9.28456 12.7999C9.28906 12.8044 9.28906 12.8117 9.28906 12.8262V13.436C9.28906 13.7345 9.28906 13.8838 9.33783 14.0015C9.40285 14.1585 9.52756 14.2832 9.68453 14.3482C9.80226 14.397 9.95151 14.397 10.25 14.397C10.5485 14.397 10.6977 14.397 10.8155 14.3482C10.9724 14.2832 11.0972 14.1585 11.1622 14.0015C11.2109 13.8838 11.2109 13.7345 11.2109 13.436V12.8262C11.2109 12.8117 11.2109 12.8044 11.2154 12.7999C11.2199 12.7954 11.2272 12.7954 11.2417 12.7954H11.8516C12.1501 12.7954 12.2993 12.7954 12.417 12.7466C12.574 12.6816 12.6987 12.5569 12.7637 12.3999C12.8125 12.2822 12.8125 12.133 12.8125 11.8345C12.8125 11.536 12.8125 11.3867 12.7637 11.269C12.6987 11.112 12.574 10.9873 12.417 10.9223C12.2993 10.8735 12.1501 10.8735 11.8516 10.8735H11.2417C11.2272 10.8735 11.2199 10.8735 11.2154 10.869C11.2109 10.8645 11.2109 10.8573 11.2109 10.8428V10.2329C11.2109 9.93442 11.2109 9.78517 11.1622 9.66744C11.0972 9.51047 10.9724 9.38576 10.8155 9.32074C10.6977 9.27197 10.5485 9.27197 10.25 9.27197C9.95151 9.27197 9.80226 9.27197 9.68453 9.32074C9.52756 9.38576 9.40285 9.51047 9.33783 9.66744Z"
						fill="currentColor"
					/>
				</svg>
			),
			href: "/" + userRole + "/employees",
		},
		{
			name: "Tasks",
			icon: <ClipboardCheck />,
			href: "/" + userRole + "/tasks",
		},
		{
			name: "Appointments",
			icon: <CalendarPlus />,
			href: "/" + userRole + "/appointments/new",
		},
		{
			name: "Inventory",
			icon: <Package />,
			href: "/" + userRole + "/inventory",
		},
	];

	// update this based on the general links
	const generalLinks = [
		{
			name: "My Profile",
			icon: <UserIcon />,
			href: `/${userRole}/profile/${currentUser?.ID}`,
		},
		{
			name: "Terms and Conditions",
			icon: <MessageCircleQuestion />,
			href: "/terms-and-privacy-policy",
		},
	];
	const activeLinkClasses =
		"text-primary font-semibold before:absolute before:content-[''] before:top-0 before:left-0 before:h-full before:w-1 before:rounded-tr-lg before:rounded-br-lg before:bg-primary";
	return (
		<div
			id={isCustom ? "fullSideNav" : "sideNav"}
			className={cn(
				`h-[calc(93vh-5.3rem)] lg:h-[calc(100vh-5.3rem)] border-gray-300 border-r-1`,
				isCustom && "border-none"
			)}
		>
			<div className="~mt-5/10 h-full">
				<small className="px-4 text-lightText">MENU</small>
				<div className="flex flex-col gap-3 mt-4">
					{menuLinks.map((item, index) => {
						return (
							<React.Fragment key={index}>
								<Link
									href={item.href}
									className={cn(
										"relative text-lightText flex items-center gap-5 px-5 text-base py-2",

										// if current route then, make it active state
										location.pathname.includes(item.href) && activeLinkClasses
									)}
								>
									<div>{item.icon}</div>
									<span>{item.name}</span>
								</Link>
							</React.Fragment>
						);
					})}
				</div>
				<br />
				<div className="flex justify-center w-full">
					<Divider className="w-full lg:w-9/12" />
				</div>
				<br />
				<small className="px-4 text-lightText">GENERAL</small>
				<div className="flex flex-col gap-3 mt-4">
					{generalLinks.map((item, index) => {
						if (item.name === "My Profile" && !smallScreen) {
							return null;
						}

						return (
							<React.Fragment key={index}>
								<Link
									href={item.href}
									className={cn(
										"relative text-lightText flex items-center gap-5 px-5 text-base py-2",

										// if current route then, make it active state
										location.pathname === item.href && activeLinkClasses
									)}
								>
									<div>{item.icon}</div>
									<span>{item.name}</span>
								</Link>
							</React.Fragment>
						);
					})}
				</div>
				<br />
				<div className="flex justify-center w-full">
					<Divider className="w-full lg:w-9/12" />
				</div>
				<br />
				{isCustom && (
					<div className="flex justify-between w-full">
						<User name={currentUser?.FULLNAME} description={currentUser?.ROLE} />
						<Button
							color="danger"
							variant="flat"
							startContent={<LogOut size={20} />}
							isIconOnly
							onClick={() => {
								document.querySelector(".sheet-trigger-side-nav")?.click();
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
						/>
					</div>
				)}
			</div>
		</div>
	);
};
SideNav.propTypes = {
	isCustom: PropTypes.bool,
};

export default SideNav;
