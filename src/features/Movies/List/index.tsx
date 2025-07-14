import type { StoredMovieType } from "@/shared/types/MovieType";
import MovieCard from "@/features/Movies/Card/index";
import { Grid, Skeleton, Typography } from "@mui/material";

const defaultSkeletonCount = 8;

interface IMovieList {
  movies: StoredMovieType[];
  isLoading: boolean;
  skeletonCount?: number;
  loaderRef: React.RefObject<HTMLDivElement | null>;
}

export default function MovieList({ movies, isLoading, skeletonCount = defaultSkeletonCount, loaderRef }: IMovieList) {
  return (
    <div>
      <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 2, md: 8, lg: 12 }}>
        {movies.map((movie) => (
          <Grid key={movie.id} size={{ xs: 2, md: 4 }}>
            <MovieCard movie={movie} />
          </Grid>
        ))}
        {isLoading &&
          Array.from({ length: skeletonCount }).map((_, i) => (
            <Grid
              key={`skeleton-${i}`}
              size={{ xs: 2, md: 4 }}
              display="flex"
              alignItems="center"
              justifyContent="center"
            >
              <Skeleton variant="rounded" height="400px" width="300px" />
            </Grid>
          ))}
      </Grid>

      <div ref={loaderRef} style={{ height: "1px" }}></div>
      {!movies.length && !isLoading && (
        <Typography variant="h6" align="center" mt={2}>
          Нет данных
        </Typography>
      )}
    </div>
  );
}
