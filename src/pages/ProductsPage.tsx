import { useCallback, useRef, useState } from "react";
import useBackendQuery from "../hooks/useBackendQuery";
import ProductCard from "../components/ProductCard";
import { useNavigate } from "react-router-dom";
import { ColorRing } from "react-loader-spinner";

const ProductsPage = () => {
	const navigate = useNavigate();
	const [page, pageSet] = useState(0);

	// Use the custom 'useBackendQuery' hook to fetch data with 'page' and a 'limit' of 10 items per page
	const { data, loading, error, hasMore } = useBackendQuery(page, 10); // Holds fetched data, loading status, error, and more data availability

	// Create a reference for the IntersectionObserver
	const observer = useRef<IntersectionObserver | null>(null);

	// Define an intersection observer implementation using the 'lastProductElementRef' callback
	const lastProductElementRef = useCallback(
		(node: HTMLElement | null) => {
			if (loading) return; // Return early if data is still loading

			if (observer.current) observer.current.disconnect();

			// Create a new IntersectionObserver that triggers when the last product element is in view
			observer.current = new IntersectionObserver((entries) => {
				if (entries[0].isIntersecting && hasMore) {
					// If the last element is in view and more data is available, increment the 'page' state
					pageSet((prev) => prev + 1);
				}
			});

			// Start observing the target node (the last product element)
			if (node) observer.current?.observe(node);
		},
		[loading, hasMore]
	);

	return (
		<main className="container m-auto bg-gradient-to-r from-[rgba(23,24,24,1)] to-[rgba(0,17,57,1)] scroll-smooth min-h-screen">
			<nav className="container m-auto p-5 pb-8">
				<ul className="flex gap-3 text-sm px-10 justify-center md:gap-10 md:text-lg">
					<li className="hover:text-blue-400">
						<button onClick={() => navigate("/")}>Home</button>
					</li>
					<li className="hover:text-blue-400">
						<button
							onClick={() => navigate("/products")}
							className="text-blue-300 underline"
						>
							Products
						</button>
					</li>
					<li className="hover:text-blue-400">
						<button>Category</button>
					</li>
					<li className="hover:text-blue-400">
						<button>About Us</button>
					</li>
				</ul>
			</nav>
			<div>
				{data?.map((item, idx) =>
					data.length === idx + 1 ? (
						<div key={item.id} ref={lastProductElementRef}>
							{<ProductCard product={item} />}
						</div>
					) : (
						<ProductCard key={item.id} product={item} />
					)
				)}
			</div>
			<div className="flex items-center justify-center">
				{loading && (
					<ColorRing
						height="80"
						width="80"
						colors={[
							"rgba(94, 64, 255, 0.8)",
							"rgba(94, 64, 255, 0.8)",
							"rgba(94, 64, 255, 0.8)",
							"rgba(94, 64, 255, 0.8)",
							"rgba(94, 64, 255, 0.8)",
						]}
						ariaLabel="loading"
					/>
				)}
			</div>
			<div>
				{error && (
					<div className="p-2 bg-red-500 text-red-950 text-md flex items-center justify-center">
						ERROR :<span>{error}</span>
					</div>
				)}
			</div>
			<div>
				{!hasMore && (
					<div className="p-5 flex items-center justify-center">
						<div className="text-xl">More Items coming soon</div>
					</div>
				)}
			</div>
		</main>
	);
};

export default ProductsPage;
