import { useEffect, useState } from 'react';
import { API_KEY } from './useFetchMovies';

/**
 * @param {string} selectedId
 * @return {Object}
 */

export function useFetchMovieDetails(selectedId) {
    const [movie, setMovie] = useState({});
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (!selectedId) {
            setMovie({});
            setError("");
            return;
        }

        /**
         * @param {string} selectedId
         */

        async function fetchMovieDetails(selectedId) {
            try {
                setIsLoading(true);
                setError(null);

                const response = await fetch(
                    `https://www.omdbapi.com/?apikey=${API_KEY}&i=${selectedId}`
                );

                if (!response.ok) {
                    throw new Error("Error al cargar detalles de la pelicula");
                }

                const data = await response.json();

                setMovie(data);
            } catch (err) {
                setError(err.message);
                setMovie({});
            } finally {
                setIsLoading(false);
            }
        }

        fetchMovieDetails(selectedId);
    }, [selectedId]);

    return { movie, isLoading, error };
}

