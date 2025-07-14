import MovieFilters from "@/features/Movies/Filters/index";
import MovieList from "@/features/Movies/List";
import { useInfiniteScroll } from "@/shared/hooks/useInfiniteScroll";
import { useStore } from "@/shared/hooks/useStore";
import type { MoviesSearchType } from "@/shared/types/MovieType";
import { Box, Typography } from "@mui/material";
import { observer } from "mobx-react-lite";
import { useEffect, useMemo } from "react";
import { useLocation, useSearchParams } from "react-router-dom";

function Movies() {
  const { MovieStore } = useStore();
  const { movies, isLoading } = MovieStore;
  const [searchParams] = useSearchParams();
  const location = useLocation();

  const filters = useMemo<MoviesSearchType | null>(() => {
    const rawGenres = searchParams.get("genres.name");
    const genres = rawGenres ? rawGenres.split(",") : [];
    const ratingKp = searchParams.get("rating.kp");
    const ratingImdb = searchParams.get("rating.imdb");
    const year = searchParams.get("year");

    const isEmpty = genres.length === 0 && !ratingKp && !ratingImdb && !year;

    if (isEmpty) return null;

    return {
      "genres.name": genres.length ? genres : undefined,
      "rating.kp": ratingKp || undefined,
      "rating.imdb": ratingImdb || undefined,
      year: year || undefined,
    };
  }, [location.search]);

  useEffect(() => {
    MovieStore.clearLists();
    MovieStore.getMovies(filters ? filters : undefined);
  }, [filters]);

  const loaderRef = useInfiniteScroll({
    isLoading,
    callback: () => MovieStore.nextPage({ mode: "default" }, filters ? filters : undefined),
  });

  return (
    <>
      <Box display="flex" flexDirection="row" justifyContent="space-between" alignItems="center" mb={2}>
        <Typography variant="h5">Поиск фильмов</Typography>
        <MovieFilters />
      </Box>
      <MovieList movies={movies} isLoading={isLoading} loaderRef={loaderRef} />
    </>
  );
}

export default observer(Movies);
