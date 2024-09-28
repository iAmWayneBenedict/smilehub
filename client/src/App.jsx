/* eslint-disable no-unused-vars */
import { Routes } from "react-router-dom";
import Home from "./pages/Home";
import { useNavigate } from "react-router-dom";
import { NextUIProvider } from "@nextui-org/react";
import { Route } from "react-router-dom";
import Services from "./pages/Services";
import { Blogs } from "./pages/Blogs";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Login from "./pages/Login";
import LayoutWrapper from "./components/layout/wrappers/LayoutWrapper";
import Register from "./pages/Register";
import AdminRegister from "./pages/admin/Register";
import StaffRegister from "./pages/staff/Register";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import AlertDialog from "./components/layout/AlertDialog";
import SharedLogin from "./pages/shared/Login";
import { AdminAuthRoutes, DisableAuthRoutes, StaffAuthRoutes } from "./lib/routeHelper";
import AdminDashboard from "./pages/shared/dashboard";
import Patients from "./pages/shared/patients";
import Appointments from "./pages/shared/appointments";
import AddPatient from "./pages/shared/patients/components/AddPatient";
import PatientInfo from "./pages/shared/patients/components/PatientInfo";
import Employees from "./pages/admin/employees";
import { default as EmployeeRegistration } from "./pages/shared/profile/Registration";
import Profile from "./pages/shared/profile/Profile";
import InvalidSmallScreen from "./components/layout/shared/invalids/InvalidSmallScreen";
import ProgressNotes from "./pages/shared/patients/components/ProgressNotes";
import Inventory from "./pages/shared/inventory";
import useValidateLoggedUser from "./hooks/useValidateLoggedUser";
import ItemGroup from "./pages/shared/inventory/layouts/ItemGroup";
import ItemList from "./pages/shared/inventory/layouts/ItemList";
import ItemGroupProduct from "./pages/shared/inventory/layouts/ItemGroup/layouts";
import Item from "./pages/shared/inventory/layouts/ItemList/layout/Item";
import AddItem from "./pages/shared/inventory/layouts/ItemList/layout/AddItem";
import Tasks from "./pages/shared/tasks";
import Calendar from "./pages/shared/calendar";
import TermsAndPrivacyPolicy from "@/pages/TermsAndPrivacyPolicy/index.jsx";
import EditItem from "./pages/shared/inventory/layouts/ItemList/layout/EditItem";
import AddGroupItem from "./pages/shared/inventory/layouts/ItemGroup/layouts/components/AddGroupItem";
import EditGroupItem from "./pages/shared/inventory/layouts/ItemGroup/layouts/components/EditGroupItem";

function App() {
	const navigate = useNavigate();

	// validate if user has been expired
	useValidateLoggedUser();

	const queryClient = new QueryClient();

	return (
		<NextUIProvider navigate={navigate}>
			<QueryClientProvider client={queryClient}>
				<Routes>
					<Route path="/" element={<LayoutWrapper child={<Home />} />} />

					{/* //* disable auth routes if there is a token */}
					<Route element={<DisableAuthRoutes />}>
						<Route path="/login" element={<LayoutWrapper child={<Login />} />} />
						<Route path="/register" element={<LayoutWrapper child={<Register />} />} />
					</Route>
					<Route path="/services" element={<LayoutWrapper child={<Services />} />} />
					<Route path="/blogs" element={<LayoutWrapper child={<Blogs />} />} />
					<Route path="/about" element={<LayoutWrapper child={<About />} />} />
					<Route path="/contact" element={<LayoutWrapper child={<Contact />} />} />
					<Route
						path="/terms-and-privacy-policy"
						element={<LayoutWrapper child={<TermsAndPrivacyPolicy />} />}
					/>

					<Route path="/admin">
						{/* //* disable auth routes if there is a token */}
						<Route element={<DisableAuthRoutes />}>
							<Route path="login" element={<SharedLogin />} />
							<Route path="register" element={<AdminRegister />} />
						</Route>
						<Route element={<AdminAuthRoutes />}>
							<Route
								path="dashboard"
								element={<LayoutWrapper child={<AdminDashboard />} />}
							/>
							<Route
								path="calendar"
								element={<LayoutWrapper child={<Calendar />} />}
							/>
							<Route path="patients">
								<Route index element={<LayoutWrapper child={<Patients />} />} />
								<Route
									path="add"
									element={<LayoutWrapper child={<AddPatient />} />}
								/>
								<Route
									path="info/:id"
									element={<LayoutWrapper child={<PatientInfo />} />}
								/>
								<Route
									path="edit/:id"
									element={<LayoutWrapper child={<PatientInfo />} />}
								/>
								<Route
									path="progress-notes/:id"
									element={<LayoutWrapper child={<ProgressNotes />} />}
								/>
							</Route>

							<Route path="Employees">
								<Route index element={<LayoutWrapper child={<Employees />} />} />
								<Route
									path="registration"
									element={<LayoutWrapper child={<EmployeeRegistration />} />}
								/>
								<Route
									path="profile/:id"
									element={<LayoutWrapper child={<Profile />} />}
								/>
							</Route>

							<Route
								path="appointments/:type"
								element={<LayoutWrapper child={<Appointments />} />}
							/>
							<Route
								path="profile/:id"
								element={<LayoutWrapper child={<Profile />} />}
							/>

							<Route path="inventory">
								<Route index element={<LayoutWrapper child={<Inventory />} />} />
								<Route
									path="item-group"
									element={<LayoutWrapper child={<ItemGroup />} />}
								/>
								<Route
									path="item-group/:group"
									element={<LayoutWrapper child={<ItemGroupProduct />} />}
								/>
								<Route
									path="item-group/:group/add"
									element={<LayoutWrapper child={<AddGroupItem />} />}
								/>
								<Route
									path="item-group/:group/edit/:id"
									element={<LayoutWrapper child={<EditGroupItem />} />}
								/>
								<Route
									path="item-list"
									element={<LayoutWrapper child={<ItemList />} />}
								/>
								<Route
									exact
									path="item-list/add"
									element={<LayoutWrapper child={<AddItem />} />}
								/>
								<Route
									exact
									path="item-list/edit/:id"
									element={<LayoutWrapper child={<EditItem />} />}
								/>
								<Route
									path="item-list/:item"
									element={<LayoutWrapper child={<Item />} />}
								/>
							</Route>
							<Route path="tasks" element={<LayoutWrapper child={<Tasks />} />} />
						</Route>
					</Route>

					<Route path="/staff">
						{/* //* disable auth routes if there is a token */}
						<Route element={<DisableAuthRoutes />}>
							<Route path="login" element={<SharedLogin />} />
							<Route path="register" element={<StaffRegister />} />
						</Route>
						<Route element={<StaffAuthRoutes />}>
							<Route
								path="dashboard"
								element={<LayoutWrapper child={<AdminDashboard />} />}
							/>
							<Route
								path="calendar"
								element={<LayoutWrapper child={<Calendar />} />}
							/>
							<Route path="patients">
								<Route index element={<LayoutWrapper child={<Patients />} />} />
								<Route
									path="add"
									element={<LayoutWrapper child={<AddPatient />} />}
								/>
								<Route
									path="info"
									element={<LayoutWrapper child={<PatientInfo />} />}
								/>
							</Route>
							<Route
								path="appointments/:type"
								element={<LayoutWrapper child={<Appointments />} />}
							/>
							<Route path="inventory">
								<Route index element={<LayoutWrapper child={<Inventory />} />} />
								<Route
									path="item-group"
									element={<LayoutWrapper child={<ItemGroup />} />}
								/>
								<Route
									path="item-group/:group"
									element={<LayoutWrapper child={<ItemGroupProduct />} />}
								/>
								<Route
									path="item-list"
									element={<LayoutWrapper child={<ItemList />} />}
								/>
								<Route
									exact
									path="item-list/add"
									element={<LayoutWrapper child={<AddItem />} />}
								/>
								<Route
									path="item-list/:item"
									element={<LayoutWrapper child={<Item />} />}
								/>
							</Route>
							<Route path="profile" element={<LayoutWrapper child={<Profile />} />} />
							<Route path="tasks" element={<LayoutWrapper child={<Tasks />} />} />
						</Route>
					</Route>
				</Routes>

				{/* ALERT Dialog */}
				<AlertDialog />

				{/* Invalid Screen Size for ADMIN and STAFF routes */}
				<InvalidSmallScreen />
			</QueryClientProvider>
		</NextUIProvider>
	);
}

export default App;
