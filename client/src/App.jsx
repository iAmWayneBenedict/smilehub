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
import AdminLogin from "./pages/admin/Login";
import StaffLogin from "./pages/staff/Login";
import AdminRegister from "./pages/admin/Register";
import StaffRegister from "./pages/staff/Register";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
function App() {
	const navigate = useNavigate();
	const queryClient = new QueryClient();
	return (
		<NextUIProvider navigate={navigate}>
			<QueryClientProvider client={queryClient}>
				<Routes>
					<Route path="/" element={<LayoutWrapper child={<Home />} />} />
					<Route path="/login" element={<LayoutWrapper child={<Login />} />} />
					<Route path="/register" element={<LayoutWrapper child={<Register />} />} />
					<Route path="/services" element={<LayoutWrapper child={<Services />} />} />
					<Route path="/blogs" element={<LayoutWrapper child={<Blogs />} />} />
					<Route path="/about" element={<LayoutWrapper child={<About />} />} />
					<Route path="/contact" element={<LayoutWrapper child={<Contact />} />} />
					<Route path="/admin">
						<Route path="login" element={<AdminLogin />} />
						<Route path="register" element={<AdminRegister />} />
					</Route>
					<Route path="/staff">
						<Route path="login" element={<StaffLogin />} />
						<Route path="register" element={<StaffRegister />} />
					</Route>
				</Routes>
			</QueryClientProvider>
		</NextUIProvider>
	);
}

export default App;
