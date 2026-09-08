import axios from "axios";
import { ApiParametersInterface } from "../interfaces/ApiParametersInterface";
import { ApiResponseInterface } from "../interfaces/ApiResponseInterface";

const API_URL = process.env.API_URL;
const API_KEY = process.env.API_KEY;

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