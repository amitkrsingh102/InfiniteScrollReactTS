import { useParams } from "react-router-dom";
import useAxiosQuery from "../hooks/useAxiosQuery";
import Carousel from "react-material-ui-carousel";
import { ColorRing } from "react-loader-spinner";
import { useNavigate } from "react-router-dom";

const IndividualProductPage = () => {
	const { id } = useParams();
	const { data, loading } = useAxiosQuery(parseInt(id as string));
	const navigate = useNavigate();
	return (
		<main className="container m-auto scroll-smooth min-h-screen flex flex-col">
			<nav className="p-5">
				<ul className="flex gap-3 text-sm px-10 justify-center md:gap-10 md:text-lg">
					<li className="hover:text-blue-400">
						<button onClick={() => navigate("/")}>Home</button>
					</li>
					<li className="hover:text-blue-400">
						<button onClick={() => navigate("/products")}>
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
			{loading ? (
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
			) : (
				<div className="flex gap-10 items-center">
					<section className="p-2 flex flex-col justify-center gap-2 overflow-hidden w-[27rem]">
						<Carousel
							autoPlay={false}
							navButtonsAlwaysVisible={true}
						>
							{data?.images.map((image, idx) => (
								<img
									key={idx.toString()}
									src={image}
									alt={idx.toString()}
									className="h-[36rem] object-cover border border-gray-600 rounded-md hover:border-gray-400"
								/>
							))}
						</Carousel>
					</section>
					<section className="flex flex-col justify-center gap-5">
						<div className="text-5xl">{data?.title}</div>
						<span className="max-w-[45px] text-sm rounded-md bg-green-700 p-1.5 font-semibold">
							{data?.rating}
						</span>
						<p className="md:max-w-[600px]">
							{data?.description}
							<br /> Lorem ipsum dolor sit amet consectetur,
							adipisicing elit. Qui sequi velit esse architecto,
							debitis sint omnis. Minus excepturi, unde quos eius
							similique eligendi, neque voluptatem magnam
							blanditiis repellendus dignissimos iste!sit amet
							consectetur, adipisicing elit. Qui sequi velit esse
							architecto, debitis sint omnis. Minus excepturi,
							unde quos eius similique eligendi, neque voluptatem
							magnam blanditiis repellendus dignissimos iste!
						</p>
						<ul>
							<li>Brand : {data?.brand}</li>
							<li>Category : {data?.category}</li>
						</ul>
						<div>
							<div className="line-through text-gray-400 text-sm">
								$
								{(data?.price as number) +
									((data?.price as number) *
										(data?.discountPercentage as number)) /
										100}
							</div>
							<div className="text-3xl">${data?.price}</div>
							<div className="flex gap-3">
								<button
									className="mt-5 px-3 py-2 bg-blue-800 rounded-lg hover:bg-blue-900 font-semibold"
									onClick={() => navigate("/")}
								>
									Back to Home
								</button>
								<button
									className="mt-5 px-3 py-2 bg-blue-800 rounded-lg hover:bg-blue-900 font-semibold"
									onClick={() => navigate("/products")}
								>
									Back to Products
								</button>
							</div>
						</div>
					</section>
				</div>
			)}
		</main>
	);
};

export default IndividualProductPage;
