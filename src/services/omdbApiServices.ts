import axios from "axios";
import { ApiParametersInterface } from "../interfaces/ApiParametersInterface";
import { ApiResponseInterface } from "../interfaces/ApiResponseInterface";

const API_URL = "https://www.omdbapi.com/";
const API_KEY = "422052b2";

function buildURL(params: ApiParametersInterface[]): string {
	let searchParams = "";

	params.forEach((param) => {
		searchParams += `${param.key}=${param.value}&`;
	});

	return API_URL + "?" + searchParams + "apikey=" + API_KEY;
}

export async function callOmdbApi(
	params: ApiParametersInterface[],
): Promise<ApiResponseInterface> {
	const url = buildURL(params);

	const response = await axios.get<ApiResponseInterface>(url);

	return response.data;
}