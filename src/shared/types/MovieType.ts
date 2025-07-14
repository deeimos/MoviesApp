export type MoviePosterType = {
  url: string;
  previewUrl: string;
};

export type MovieType = {
  id: number;
  name: string | null;
  alternativeName: string | null;
  enName?: string | null;
  type: string;
  typeNumber: number;
  year: number | null;
  description: string | null;
  shortDescription: string | null;
  status: string | null;
  rating: {
    kp: number;
    imdb: number;
    filmCritics: number;
    russianFilmCritics: number;
    await: number;
  };
  votes: {
    kp: number;
    imdb: number;
    filmCritics: number;
    russianFilmCritics: number;
    await: number;
  };
  movieLength: number | null;
  totalSeriesLength: number | null;
  seriesLength: number | null;
  ratingMpaa: string | null;
  ageRating: number | null;
  poster?: MoviePosterType;
  genres: {
    name: string;
  }[];
  countries: {
    name: string;
  }[];
  releaseYears?: {
    start: number;
    end: number;
  }[];
  top10: number | null;
  top250: number | null;
  isSeries: boolean;
  ticketsOnSale: boolean;
};

export type MovieListType = {
  mode: "favorite" | "default";
};

export type MoviesSearchType = {
  id?: string[];
  "genres.name"?: string[];
  "rating.kp"?: string;
  "rating.imdb"?: string;
  year?: string;
};

export type MovieParamsType = {
  page: number;
  limit: number;
} & MoviesSearchType;

export type MovieResponseType = {
  docs: MovieType[];
  limit: number;
  page: number;
  pages: number;
  total: number;
};

export type PersonType = {
  id: number;
  photo: string;
  name: string | null;
  enName: string;
  description: string | null;
  profession: string;
  enProfession: string;
};

export type MovieDetailsType = MovieType & {
  persons: PersonType[];
  premiere?: {
    world: string | null;
    russia: string | null;
  };
  watchabilityParsed?: boolean;
  lists?: string[];
  createdAt?: string;
  updatedAt?: string;
};

export type StoredMovieType = {
  isFavorite: boolean;
} & MovieType;

export type StoredDetailsType = {
  isFavorite: boolean;
} & MovieDetailsType;

export type GeneresType = {
  name: string;
  slug: string;
}
