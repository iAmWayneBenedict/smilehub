import logoIcon from "../../../assets/icons/LOGO.png";
import logoText from "../../../assets/icons/SMILEHUB.png";
import {
	Navbar,
	NavbarBrand,
	NavbarContent,
	NavbarItem,
	NavbarMenuToggle,
	NavbarMenu,
	NavbarMenuItem,
	Link,
	Button,
	Dropdown,
	DropdownTrigger,
	DropdownMenu,
	DropdownItem,
	Avatar,
} from "@nextui-org/react";
import { useState } from "react";
import "./styles.css";
const NavigationBar = () => {
	const [isMenuOpen, setIsMenuOpen] = useState(false);

	const menuItems = [
		"Profile",
		"Dashboard",
		"Activity",
		"Analytics",
		"System",
		"Deployments",
		"My Settings",
		"Team Settings",
		"Help & Feedback",
		"Log Out",
	];
	const navItems = [
		{ name: "Home", href: "#" },
		{ name: "Services", href: "#" },
		{ name: "Blogs", href: "#" },
		{ name: "About", href: "#" },
		{ name: "Contact", href: "#" },
	];
	return (
		<Navbar id="navbar" height={"5rem"} onMenuOpenChange={setIsMenuOpen} maxWidth="2xl">
			{/**
			 ** Navigation menu for logo and menu toggle **
			 */}
			<NavbarContent>
				<NavbarMenuToggle
					aria-label={isMenuOpen ? "Close menu" : "Open menu"}
					className="md:hidden"
				/>
				<NavbarBrand>
					<div className="flex items-center gap-3 h-[3rem] md:h-fit">
						<img src={logoIcon} alt="logo-icon" className="h-full" />
						<div className="h-[1.35rem] md:h-fit">
							<img src={logoText} className="h-full" alt="logo-text" />
						</div>
					</div>
				</NavbarBrand>
			</NavbarContent>

			{/**
			 ** Navigation menu for larger screens **
			 */}
			<NavbarContent
				className="hidden md:flex"
				style={{ gap: "clamp(1rem, 2vw, 3rem)" }}
				justify="center"
			>
				{navItems.map((item, index) => (
					<NavbarItem key={index}>
						<Link
							className="font-medium"
							color="foreground"
							href={item.href}
							aria-current="page"
						>
							{item.name}
						</Link>
					</NavbarItem>
				))}
			</NavbarContent>

			{/**
			 ** Navigation menu for avatar and book now button **
			 */}
			<NavbarContent justify="end" id="avatar-container">
				<NavbarItem>
					<Dropdown placement="bottom-end">
						<DropdownTrigger>
							<Avatar
								isBordered
								as="button"
								className="transition-transform"
								color="secondary"
								name="Jason Hughes"
								size="md"
								src="https://i.pravatar.cc/150?u=a042581f4e29026704d"
							/>
						</DropdownTrigger>
						<DropdownMenu aria-label="Profile Actions" variant="flat">
							<DropdownItem key="profile" className="gap-2 h-14">
								<p className="font-semibold">Signed in as</p>
								<p className="font-semibold">zoey@example.com</p>
							</DropdownItem>
							<DropdownItem key="settings">My Settings</DropdownItem>
							<DropdownItem key="team_settings">Team Settings</DropdownItem>
							<DropdownItem key="analytics">Analytics</DropdownItem>
							<DropdownItem key="system">System</DropdownItem>
							<DropdownItem key="configurations">Configurations</DropdownItem>
							<DropdownItem key="help_and_feedback">Help & Feedback</DropdownItem>
							<DropdownItem key="logout" color="danger">
								Log Out
							</DropdownItem>
						</DropdownMenu>
					</Dropdown>
				</NavbarItem>
				<NavbarItem className="hidden sm:flex">
					<Button
						as={Link}
						color="primary"
						className="px-6 py-6 font-medium text-white bg-primary"
						href="#"
						variant="flat"
					>
						Book Now
					</Button>
				</NavbarItem>
			</NavbarContent>

			{/**
			 ** Navigation menu for mobile **
			 */}
			<NavbarMenu
				style={{
					"--navbar-height": "6rem",
				}}
			>
				{menuItems.map((item, index) => (
					<NavbarMenuItem key={`${item}-${index}`}>
						<Link
							color={
								index === 2
									? "primary"
									: index === menuItems.length - 1
									? "danger"
									: "foreground"
							}
							className="w-full"
							href="#"
							size="lg"
						>
							{item}
						</Link>
					</NavbarMenuItem>
				))}
			</NavbarMenu>
		</Navbar>
	);
};

export default NavigationBar;
{
	/* <NavbarItem className="hidden lg:flex">
					<Link href="#">Login</Link>
				</NavbarItem> */
}
