import { useNavigate } from "react-router-dom";
const ErrorPage = () => {
	const navigate = useNavigate();
	return (
		<main className="container m-auto w-screen h-screen bg-gradient-to-r from-[rgba(23,24,24,1)] to-[rgba(0,17,57,1)]">
			<nav className="container m-auto p-5">
				<ul className="flex gap-3 text-sm px-10 justify-center md:gap-10 md:text-lg">
					<li className="hover:text-blue-300">
						<button onClick={() => navigate("/")}>Home</button>
					</li>
					<li className="hover:text-blue-300">
						<button onClick={() => navigate("/products")}>
							Products
						</button>
					</li>
					<li className="hover:text-blue-300">
						<button>Category</button>
					</li>
					<li className="hover:text-blue-300">
						<button>About Us</button>
					</li>
				</ul>
			</nav>
			<section className="h-[calc(100vh-150px)] flex flex-col container m-auto  justify-center items-center">
				<div className="text-5xl flex flex-col p-2 items-center font-bold gap-4">
					<span className="text-8xl">404</span>
					<div>Page not found</div>
				</div>
				<button
					className="mt-5 px-3 py-2 bg-blue-800 rounded-lg hover:bg-blue-900 font-semibold"
					onClick={() => navigate("/")}
				>
					Back to Home
				</button>
			</section>
		</main>
	);
};

export default ErrorPage;
