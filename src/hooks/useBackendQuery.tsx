import axios, { AxiosError } from "axios";
import { useEffect, useState } from "react";
import { BACKEND_LINK } from "../utils/apiLink";
import { Product } from "../utils/Interfaces";
const useBackendQuery = (page = 0, limit = 10) => {
	const [loading, loadingSet] = useState(true); // Indicates if data is currently being fetched
	const [error, errorSet] = useState(""); // Holds any error message encountered during data fetching
	const [data, dataSet] = useState<Product[]>([]); // Holds the fetched data (a list of products)
	const [hasMore, hasMoreSet] = useState(true); // Indicates if there is more data available to load

	// Define an asynchronous function to fetch data from the backend
	const fetchData = async () => {
		try {
			loadingSet(true); // Set 'loading' to true to indicate data fetching is in progress

			// Use Axios to make a GET request to the backend API with parameters
			await axios
				.get(BACKEND_LINK, {
					params: { skip: page * limit, limit: limit },
				})
				.then((res) =>
					// Update the 'data' state by appending the fetched products to the previous data
					dataSet((prev) => [...prev, ...res.data.products])
				);

			loadingSet(false); // Set 'loading' to false since data fetching is complete

			// Check if the skip times the limit exceeds a certain threshold (e.g., 100)
			if (page * limit > 100) {
				loadingSet(false); // Set 'loading' to false
				hasMoreSet(false); // Set 'hasMore' to false, indicating no more data to load
			}
		} catch (err) {
			loadingSet(false); // Set 'loading' to false in case of errors

			if (err instanceof AxiosError) {
				errorSet(err.message as string); // If the error is from Axios, set the error message
			} else {
				console.error(err); // Log other errors to the console
			}
		}
	};

	// Use the useEffect hook to run the fetchData function when 'page' or 'limit' changes
	useEffect(() => {
		fetchData();
	}, [page, limit]);

	// Return the fetched data, loading status, error message, and more data availability as an object
	return { data, loading, error, hasMore };
};

export default useBackendQuery;
