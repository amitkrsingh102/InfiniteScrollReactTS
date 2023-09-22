import { Routes, Route } from "react-router-dom";
import HeroPage from "./pages/HeroPage";
import ProductsPage from "./pages/ProductsPage";
import IndividualProductPage from "./pages/IndividualProductPage";
import ErrorPage from "./pages/ErrorPage";

function App() {
	return (
		<main className="bg-gradient-to-r from-[rgba(23,24,24,1)] to-[rgba(0,17,57,1)]">
			<Routes>
				<Route path="/" element={<HeroPage />} />
				<Route path="/products" element={<ProductsPage />} />
				<Route
					path="/product/:id"
					element={<IndividualProductPage />}
				/>
				<Route path="*" element={<ErrorPage />} />
			</Routes>
		</main>
	);
}

export default App;
