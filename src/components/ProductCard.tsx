import { Product } from "../utils/Interfaces";
import { useNavigate } from "react-router-dom";

type ProductCardProp = {
	product: Product;
} & React.DetailedHTMLProps<
	React.HTMLAttributes<HTMLDivElement>,
	HTMLDivElement
>;
const ProductCard = ({ product }: ProductCardProp) => {
	const navigate = useNavigate();
	return (
		<div
			className="flex border-b border-gray-700 gap-10 p-2 items-center justify-between group hover:cursor-pointer"
			onClick={() => {
				navigate(`/product/${product.id}`);
			}}
		>
			<section className="flex items-center h-[250px] w-[250px] p-5 md:ml-[100px]">
				<img
					src={product.thumbnail}
					alt={product.title}
					className="border border-gray-700 rounded-md object-cover object-center h-[200px] w-[200px] group-hover:h-[220px] group-hover:w-[210px] transition-all duration-300"
				/>
			</section>
			<section className="flex flex-col gap-2 w-[500px]">
				<div className="flex gap-5 text-3xl items-center">
					<span className=" group-hover:text-blue-700 transition-all duration-200">
						{product.title}
					</span>
					<span className="text-sm rounded-md bg-green-700 p-1.5 font-semibold">
						{product.rating}
					</span>
				</div>
				<p>{product.description}</p>
				<div>
					<div className="line-through text-gray-400 text-sm">
						$
						{product.price +
							(product.price * product.discountPercentage) / 100}
					</div>
					<div className="text-2xl">${product.price}</div>
				</div>
			</section>
			<section className="mr-[100px]">
				<button
					className="mt-5 px-3 py-2 bg-blue-800 rounded-lg hover:bg-blue-900 font-semibold"
					onClick={() => {
						navigate(`/product/${product.id}`);
					}}
				>
					View Product
				</button>
			</section>
		</div>
	);
};

export default ProductCard;
