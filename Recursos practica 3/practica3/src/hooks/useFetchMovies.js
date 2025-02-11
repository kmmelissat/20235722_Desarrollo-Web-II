import { useEffect, useState } from "react";

export const API_KEY = "55b71833";

/**
 * @param {string} query
 * @return {Object}
 */

export function useFetchMovies(query) {

    const [movies, setMovies] = useState([]); //almacenar peliculas
    const [isLoading, setIsLoading] = useState(false); //cargando
    const [error, setError] = useState(""); //error

    useEffect(() => {
        if (query.length < 3) { //si la longitud de la query es menor a 3
            setMovies([]);
            setError("");
            return;
        }

        async function fetchMovies() { //async function para obtener las peliculas
            try {
                setIsLoading(true); //cargando
                setError(null); //error null

                const response = await fetch(
                    `https://www.omdbapi.com/?apikey=${API_KEY}&s=${query}` //fetch de la api
                );

                if (!response.ok) {
                    throw new Error("Error al cargar movies");
                }

                const data = await response.json();

                if (data.Response === "False") {
                    throw new Error("No se encontraron resultados");
                }

                setMovies(data.Search);
            } catch (err) {
                setError(err.message);
                setMovies([]);
            } finally {
                setIsLoading(false);
            }
        }

        fetchMovies();
    }, [query]);

    return { movies, isLoading, error };
}