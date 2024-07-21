import { Routes } from "react-router-dom";
import NavigationBar from "./components/layout/navbar/NavigationBar";
import Home from "./pages/Home";
import { useNavigate } from "react-router-dom";
import { NextUIProvider } from "@nextui-org/react";
import { Route } from "react-router-dom";
import Footer from "./components/layout/patient/Footer";
import Services from "./pages/Services";
import { Blogs } from "./pages/Blogs";
import About from "./pages/About";
import Contact from "./pages/Contact";

function App() {
	const navigate = useNavigate();
	return (
		<NextUIProvider navigate={navigate}>
			<NavigationBar />
			<Routes>
				<Route path="/" element={<Home />} />
				<Route path="/services" element={<Services />} />
				<Route path="/blogs" element={<Blogs />} />
				<Route path="/about" element={<About />} />
				<Route path="/contact" element={<Contact />} />
			</Routes>
			<Footer />
		</NextUIProvider>
	);
}

export default App;
