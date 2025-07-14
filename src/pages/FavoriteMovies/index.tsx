import MovieList from "@/features/Movies/List";
import { useInfiniteScroll } from "@/shared/hooks/useInfiniteScroll";
import { useStore } from "@/shared/hooks/useStore";
import { Box, Typography } from "@mui/material";
import { observer } from "mobx-react-lite";
import { useEffect } from "react";

function FavoritesMovie() {
  const { MovieStore } = useStore();
  const { favorites, isLoading } = MovieStore;

  useEffect(() => {
    if (favorites.length === 0) {
      MovieStore.clearLists();
      MovieStore.getFavorites();
    }
  }, []);

  const loaderRef = useInfiniteScroll({
    isLoading,
    callback: () => MovieStore.nextPage({ mode: "favorite" }),
  });

  return (
    <Box width="100%">
      <Typography variant="h5" mb={2}>
        Избранное
      </Typography>
      <MovieList movies={favorites} isLoading={isLoading} loaderRef={loaderRef} />
    </Box>
  );
}

export default observer(FavoritesMovie);
