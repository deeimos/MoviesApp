import { useStore } from "@/shared/hooks/useStore";
import { type PathParams, ROUTES } from "@/shared/lib/routes";
import MoviePoster from "@/shared/ui/MoviePoster";
import { getFormattedDate } from "@/shared/utils/getFormattedDate";
import { Box, Typography, Chip, Divider, Grid, IconButton, Skeleton } from "@mui/material";
import { observer } from "mobx-react-lite";
import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import FavoriteIcon from "@mui/icons-material/Favorite";

const getReleasDate = (dateStr?: string | null) => {
  return dateStr ? getFormattedDate(new Date(dateStr)) : null;
};

const PageSkeleton = () => {
  return (
    <Grid container spacing={3}>
      <Grid
        size={{ xs: 12, sm: 6, md: 5 }}
        overflow="hidden"
        borderRadius={2}
        sx={{ height: "100%", aspectRatio: "3 / 4" }}
      >
        <Box width="100%" height="100%">
          <Skeleton variant="rectangular" width="100%" height="100%" />
        </Box>
      </Grid>

      <Grid size={{ xs: 12, sm: 6, md: 7 }}>
        <Skeleton variant="text" height={48} width="80%" sx={{ mb: 1 }} />
        <Skeleton variant="text" height={24} width="40%" sx={{ mb: 2 }} />
        <Box display="flex" gap={1} flexWrap="wrap" mb={2}>
          {Array.from({ length: 4 }).map((_, i) => (
            <Skeleton key={i} variant="rounded" width={80} height={32} />
          ))}
        </Box>
        <Skeleton variant="text" height={24} width="50%" sx={{ mb: 1 }} />
        <Skeleton variant="text" height={24} width="60%" sx={{ mb: 2 }} />
        <Skeleton variant="rectangular" height={80} width="100%" />
      </Grid>
    </Grid>
  );
};

function MoviePage() {
  const params = useParams<PathParams[typeof ROUTES.MOOVIE]>();
  const navigate = useNavigate();
  const { MovieStore, ConfirmModalStore } = useStore();
  const { current, isLoading } = MovieStore;

  useEffect(() => {
    const id = Number(params.moovieId);
    if (!id) {
      navigate(ROUTES.NOT_FOUND);
      return;
    }
    MovieStore.getCurrentMovie(id);
  }, [params.moovieId]);

  if (!current || isLoading) return <PageSkeleton />;

  const movieName = current.name ?? current.alternativeName ?? current.enName ?? "";
  const releaseDate =
    getReleasDate(current.premiere?.world) ?? getReleasDate(current.premiere?.russia) ?? current.year?.toString();

  const ratingItems = [
    current.rating.kp > 0 && `КП: ${current.rating.kp.toFixed(1)}`,
    current.rating.imdb > 0 && `IMDb: ${current.rating.imdb.toFixed(1)}`,
  ].filter(Boolean);

  const handleFavorite = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    ConfirmModalStore.showModal(
      () => MovieStore.setFavorite(current.id, !current.isFavorite),
      current.isFavorite ? "Удалить из избранного?" : "Добавить в избранное?",
      current.isFavorite
        ? `Вы уверены, что хотите удалить «${movieName}» из избранного?`
        : `Добавить «${movieName}» в список избранного?`
    );
  };

  return (
    <Grid container spacing={3}>
      <Grid
        size={{ xs: 12, sm: 6, md: 5 }}
        overflow="hidden"
        borderRadius={2}
        sx={{ height: "100%", aspectRatio: "3 / 4" }}
      >
        <MoviePoster poster={current.poster} />
      </Grid>

      <Grid size={{ xs: 12, sm: 6, md: 7 }}>
        <Box display="flex" alignItems="center" mb={1}>
          <Typography variant="h4" fontWeight="bold" flexGrow={1}>
            {movieName}
          </Typography>
          <IconButton
            aria-label={current.isFavorite ? "Удалить из избранного" : "Добавить в избранное"}
            onClick={handleFavorite}
            sx={{ ml: 1 }}
          >
            <FavoriteIcon sx={{ color: current.isFavorite ? "red" : "inherit" }} />
          </IconButton>
        </Box>

        <Typography variant="subtitle1" color="text.secondary" gutterBottom>
          {releaseDate}
        </Typography>

        <Box mb={2}>
          {current.genres.map((genre) => (
            <Chip key={genre.name} label={genre.name} size="small" sx={{ mr: 1, mb: 1 }} />
          ))}
        </Box>

        <Box mb={2}>
          {ratingItems.map((rating, index) => (
            <Typography key={`rating-${index}`} variant="body1">
              {rating}
            </Typography>
          ))}
        </Box>

        <Divider sx={{ my: 2 }} />

        {current.description ? (
          <Typography variant="body1">{current.description}</Typography>
        ) : (
          <Typography variant="body2" color="text.secondary">
            Описание недоступно.
          </Typography>
        )}
      </Grid>
    </Grid>
  );
}

export default observer(MoviePage);
