import type { StoredMovieType } from "@/shared/types/MovieType";
import { Box, IconButton, Stack, Typography } from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import MoviePoster from "@/shared/ui/MoviePoster";
import { Link } from "react-router-dom";
import { ROUTES } from "@/shared/lib/routes";
import { generatePath } from "react-router-dom";
import { useStore } from "@/shared/hooks/useStore";

interface IMovieCard {
  movie: StoredMovieType;
}

export default function MovieCard({ movie }: IMovieCard) {
  const { ConfirmModalStore } = useStore();
  const { rating, name, alternativeName, enName, poster, year, isFavorite } = movie;
  const { MovieStore } = useStore();
  const isHaveRating = rating.imdb > 0 || rating.kp > 0;

  const movieName = ((name ?? alternativeName ?? enName) as string) + (year ? ` (${year})` : "");

  const handleFavorite = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    ConfirmModalStore.showModal(
      () => MovieStore.setFavorite(movie.id, !isFavorite),
      isFavorite ? "Удалить из избранного?" : "Добавить в избранное?",
      isFavorite
        ? `Вы уверены, что хотите удалить «${movieName}» из избранного?`
        : `Добавить «${movieName}» в список избранного?`
    );
  };

  return (
    <Box
      position="relative"
      width="100%"
      height="100%"
      borderRadius={2}
      overflow="hidden"
      boxShadow={3}
      display="flex"
      flexDirection="column"
      sx={{
        transition: "0.3s",
        "&:hover": {
          cursor: "pointer",
        },
        "&:hover .rating-box, &:hover .title-box": {
          bgcolor: "rgba(0, 0, 0, 0.85)",
        },
      }}
      component={Link}
      to={generatePath(ROUTES.MOOVIE, { moovieId: movie.id.toString() })}
    >
      <Stack
        direction="row"
        justifyContent={isHaveRating ? "space-between" : "flex-end"}
        alignItems="flex-start"
        sx={{
          position: "absolute",
          top: 12,
          right: 12,
          zIndex: 10,
          width: "calc(100% - 24px)",
        }}
      >
        {isHaveRating && (
          <Box
            className="rating-box"
            sx={{
              p: 1,
              boxSizing: "border-box",
              borderRadius: 1,
              bgcolor: "rgba(0, 0, 0, 0.6)",
              color: "white",
              fontWeight: "bold",
              fontSize: { xs: "0.75rem", sm: "0.875rem" },
              display: "flex",
              flexDirection: "column",
              gap: 0.5,
            }}
          >
            {rating.kp > 0 && <Typography>КП: {rating.kp.toFixed(1)}</Typography>}
            {rating.imdb > 0 && <Typography>IMDb: {rating.imdb.toFixed(1)}</Typography>}
          </Box>
        )}

        <IconButton
          sx={{
            backgroundColor: "rgba(255,255,255,0.8)",
            "&:hover": { backgroundColor: "rgba(255,255,255,1)" },
            zIndex: 10,
          }}
          aria-label="favorite"
          onClick={handleFavorite}
        >
          <FavoriteIcon sx={{ color: isFavorite ? "red" : "inherit" }} />
        </IconButton>
      </Stack>

      <Box sx={{ height: "100%", aspectRatio: "3 / 4" }}>
        <MoviePoster poster={poster} />
      </Box>
      <Box
        className="title-box"
        sx={{
          minHeight: { xs: 48, sm: 56, md: 64 },
          maxHeight: { xs: 48, sm: 56, md: 64 },
          px: { xs: 1, sm: 1.5, md: 2 },
          py: { xs: 0.5, sm: 1 },
          position: "absolute",
          bottom: 0,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          width: "100%",
          bgcolor: "rgba(0, 0, 0, 0.6)",
          color: "white",
          fontWeight: "bold",
          fontSize: { xs: "0.875rem", sm: "1rem" },
          textAlign: "center",
        }}
      >
        <Typography
          sx={{
            width: "100%",
            overflowWrap: "break-word",
            wordBreak: "break-word",
          }}
        >
          {movieName}
        </Typography>
      </Box>
    </Box>
  );
}
