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

function App() {
	const navigate = useNavigate();
	return (
		<NextUIProvider navigate={navigate}>
			<Routes>
				<Route path="/" element={<LayoutWrapper child={<Home />} />} />
				<Route path="/login" element={<LayoutWrapper child={<Login />} />} />
				<Route path="/register" element={<LayoutWrapper child={<Register />} />} />
				<Route path="/services" element={<LayoutWrapper child={<Services />} />} />
				<Route path="/blogs" element={<LayoutWrapper child={<Blogs />} />} />
				<Route path="/about" element={<LayoutWrapper child={<About />} />} />
				<Route path="/contact" element={<LayoutWrapper child={<Contact />} />} />
			</Routes>
		</NextUIProvider>
	);
}

export default App;
