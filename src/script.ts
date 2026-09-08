import { ApiResponseInterface } from "./interfaces/ApiResponseInterface";
import { callOmdbApi } from "./services/omdbApiServices";

const movieName = document.getElementById("movie-name") as HTMLInputElement;
const movieYear = document.getElementById("movie-year") as HTMLSelectElement;
const searchButton = document.getElementById(
	"searchButton",
) as HTMLButtonElement;

for (let i = 1960; i < 2027; i++) {
	const option = document.createElement("option");

	option.value = i.toString();
	option.textContent = i.toString();

	movieYear.appendChild(option);
}
searchButton.addEventListener("click", async () => {
	const response = await callOmdbApi([
		{ key: "s", value: movieName.value },
		{ key: "y", value: movieYear.value },
	]);

	if (response.Response === "True") {
		createMovies([response.Search[0]]);
	} else {
		const onlyNameMovies = await callOmdbApi([
			{ key: "s", value: movieName.value },
		]);

		createMovies(onlyNameMovies.Search);
	}
});
function createMovies(movies: ApiResponseInterface["Search"]) {
	const moviesHolder = document.getElementById(
		"moviesHolder",
	) as HTMLDivElement;

	moviesHolder.innerHTML = "";

	for (const movie of movies) {
		const div = document.createElement("div");

		const img = document.createElement("img");
		img.src = movie.Poster;
		img.alt = movie.Title;
		img.style.width = "200px";

		const h3 = document.createElement("h3");
		h3.textContent = movie.Title;

		const type = document.createElement("p");
		type.textContent = movie.Type;

		const year = document.createElement("p");
		year.textContent = movie.Year;

		div.appendChild(img);
		div.appendChild(h3);
		div.appendChild(type);
		div.appendChild(year);

		moviesHolder.appendChild(div);
	}
}