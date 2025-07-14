import type { MoviePosterType } from "@/shared/types/MovieType";
import { Box } from "@mui/material";
import MovieIcon from "@mui/icons-material/Movie";

interface IMoviePoster {
  poster?: MoviePosterType | null;
}
export default function MoviePoster({ poster }: IMoviePoster) {
  if (!poster)
    return (
      <Box
        sx={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          bgcolor: "grey.300",
          color: "grey.600",
        }}
      >
        <MovieIcon sx={{ fontSize: 80 }} />
      </Box>
    );
  return (
    <img
      src={poster.url}
      alt="Movie poster"
      style={{
        width: "100%",
        height: "100%",
        objectFit: "cover",
        display: "block",
      }}
    />
  );
}
