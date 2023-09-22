import axios, { AxiosError } from "axios";
import { Product } from "../utils/Interfaces";
import { useEffect, useState } from "react";
import { BACKEND_LINK } from "../utils/apiLink";

const useAxiosQuery = (id: number) => {
	const [loading, loadingSet] = useState(true); // Indicates if data is currently being fetched
	const [error, errorSet] = useState(""); // Holds any error message encountered during data fetching
	const [data, dataSet] = useState<Product>(); // Holds the fetched data (a single product)

	// Define an asynchronous function to fetch data by ID from the backend
	const fetchData = async () => {
		try {
			loadingSet(true); // Set 'loading' to true to indicate data fetching is in progress

			// Use Axios to make a GET request to the backend API with the provided ID
			await axios
				.get(`${BACKEND_LINK}/${id}`)
				.then((res) => dataSet(res.data));

			loadingSet(false); // Set 'loading' to false since data fetching is complete
		} catch (err) {
			loadingSet(false); // Set 'loading' to false in case of errors

			if (err instanceof AxiosError) {
				errorSet(err.message as string); // If the error is from Axios, set the error message
			} else {
				console.error(err); // Log other errors to the console
			}
		}
	};

	// Use the useEffect hook to run the fetchData function when the id changes
	useEffect(() => {
		fetchData();
	}, [id]);

	// Return the fetched data, loading status, and error message as an object
	return { data, loading, error };
};
export default useAxiosQuery;
