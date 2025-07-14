import type { MovieParamsType, MovieResponseType, MovieDetailsType, GeneresType} from "@/shared/types/MovieType";
import { api } from "./api";

export default class MovieService {
  static async getMovies(params: MovieParamsType) {
    return api.get<MovieResponseType>("/v1.4/movie", {
      params,
      paramsSerializer: (params) => {
        const searchParams = new URLSearchParams();

        for (const key in params) {
          const value = params[key as keyof typeof params];
          if (Array.isArray(value)) {
            value.forEach((v) => searchParams.append(key, v));
          } else {
            searchParams.append(key, String(value));
          }
        }

        return searchParams.toString();
      },
    });
  }

  static async getMovieById(id: number) {
    return api.get<MovieDetailsType>(`/v1.4/movie/${id}`);
  }

  static async getGenres(){
    return api.get<GeneresType[]>("/v1/movie/possible-values-by-field?field=genres.name")
  }
}
