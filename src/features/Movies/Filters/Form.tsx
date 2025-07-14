import { Box, Autocomplete, TextField, Typography, Slider, Button } from "@mui/material";
import { useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useStore } from "@/shared/hooks/useStore";

interface IMoviesFiltersForm {
  onApply: () => void;
}
export default function MoviesFiltersForm({ onApply }: IMoviesFiltersForm) {
  const [searchParams, setSearchParams] = useSearchParams();

  const { MovieStore } = useStore();

  const [genres, setGenres] = useState<string[]>([]);
  const [ratingKp, setRatingKp] = useState<number[]>([0, 10]);
  const [ratingImdb, setRatingImdb] = useState<number[]>([0, 10]);
  const [yearRange, setYearRange] = useState<number[]>([1990, new Date().getFullYear()]);

  useEffect(() => {
    const rawGenres = searchParams.get("genres.name");
    setGenres(rawGenres ? rawGenres.split(",") : []);

    const parseRange = (value: string | null, fallback: [number, number]): [number, number] => {
      if (!value || !value.includes("-")) return fallback;
      const [from, to] = value.split("-").map(Number);
      return [from || fallback[0], to || fallback[1]];
    };

    setRatingKp(parseRange(searchParams.get("rating.kp"), [0, 10]));
    setRatingImdb(parseRange(searchParams.get("rating.imdb"), [0, 10]));
    setYearRange(parseRange(searchParams.get("year"), [1990, new Date().getFullYear()]));
  }, [searchParams]);

  const handleApplyFilters = () => {
    const params = new URLSearchParams();

    params.set("genres.name", genres.join(","));
    params.set("rating.kp", `${ratingKp[0]}-${ratingKp[1]}`);
    params.set("rating.imdb", `${ratingImdb[0]}-${ratingImdb[1]}`);
    params.set("year", `${yearRange[0]}-${yearRange[1]}`);

    setSearchParams(params);
    onApply();
  };

  return (
    <Box display="flex" flexDirection="column" gap={3}>
      <Autocomplete
        multiple
        options={MovieStore.genres}
        value={genres}
        onChange={(_, value) => setGenres(value)}
        renderInput={(params) => <TextField {...params} label="Жанры" />}
      />

      <Box>
        <Typography gutterBottom>Рейтинг КП</Typography>
        <Slider
          value={ratingKp}
          onChange={(_, value) => setRatingKp(value as number[])}
          min={0}
          max={10}
          step={0.1}
          valueLabelDisplay="auto"
        />
      </Box>

      <Box>
        <Typography gutterBottom>Рейтинг IMDb</Typography>
        <Slider
          value={ratingImdb}
          onChange={(_, value) => setRatingImdb(value as number[])}
          min={0}
          max={10}
          step={0.1}
          valueLabelDisplay="auto"
        />
      </Box>

      <Box>
        <Typography gutterBottom>Год выпуска</Typography>
        <Slider
          value={yearRange}
          onChange={(_, value) => setYearRange(value as number[])}
          min={1990}
          max={new Date().getFullYear()}
          step={1}
          valueLabelDisplay="auto"
        />
      </Box>

      <Button variant="contained" onClick={handleApplyFilters}>
        Применить фильтры
      </Button>
    </Box>
  );
}
