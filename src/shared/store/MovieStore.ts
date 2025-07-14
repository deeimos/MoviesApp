import { makeAutoObservable } from "mobx";
import type { StoredDetailsType, MoviesSearchType, StoredMovieType, MovieListType } from "../types/MovieType";
import MovieService from "../services/Movie.Service";

export default class MoviesStore {
  limit = 50;
  page = 1;
  pages = 2;
  isLoading = false;
  movies: StoredMovieType[] = [];
  current: StoredDetailsType | null = null;
  favoriteIds: number[] = [];
  favorites: StoredMovieType[] = [];
  genres: string[] = [];
  isGenresLoading = false;

  constructor() {
    makeAutoObservable(this);
    this.loadFavorites();
  }

  async getMovies(params?: MoviesSearchType) {
    if (this.isLoading || this.pages <= this.page) return;
    this.isLoading = true;

    try {
      const pagination = { limit: this.limit, page: this.page };
      const loaded = (await MovieService.getMovies({ ...params, ...pagination })).data;
      this.pages = loaded.pages;
      const withFavorites = loaded.docs.map((movie) => ({
        ...movie,
        isFavorite: this.isFavorite(movie.id),
      }));
      this.movies = [...this.movies, ...withFavorites];
    } catch (error) {
      console.log(error);
    } finally {
      this.isLoading = false;
    }
  }

  async getCurrentMovie(id: number) {
    if (this.isLoading || this.current?.id === id) return;
    this.isLoading = true;

    try {
      const loaded = (await MovieService.getMovieById(id)).data;
      this.current = { ...loaded, isFavorite: this.isFavorite(id) };
    } catch (error) {
      console.log(error);
    } finally {
      this.isLoading = false;
    }
  }

  async getFavorites() {
    if (this.isLoading || this.favorites.length >= this.favoriteIds.length) return;

    const sliceIds = this.favoriteIds.slice(this.limit * (this.page - 1), this.limit * this.page);

    if (sliceIds.length === 0) return;

    this.isLoading = true;
    try {
      const loaded = (await MovieService.getMovies({ id: sliceIds.map(String), limit: this.limit, page: this.page }))
        .data.docs;
      const withFavorites = loaded.map((movie) => ({
        ...movie,
        isFavorite: this.isFavorite(movie.id),
      }));
      this.favorites = [...this.favorites, ...withFavorites];
    } catch (e) {
      console.log(e);
    } finally {
      this.isLoading = false;
    }
  }

  async nextPage({ mode }: MovieListType, params?: MoviesSearchType) {
    if (this.isLoading) return;
    this.page += 1;
    if (mode === "favorite") this.getFavorites();
    else if (mode === "default") this.getMovies(params);
  }

  setFavorite(id: number, value: boolean) {
    if (value && !this.favoriteIds.includes(id)) this.favoriteIds.push(id);
    else if (!value && this.favoriteIds.includes(id)) {
      this.favoriteIds = this.favoriteIds.filter((fav) => fav !== id);
    }
    this.setListFavorite(id, value);
    this.setCurrentFavorite(id, value);
    this.syncFavorites();
  }
  setListFavorite(id: number, value: boolean) {
    this.movies = this.movies.map((movie) => (movie.id === id ? { ...movie, isFavorite: value } : movie));
  }

  setCurrentFavorite(id: number, value: boolean) {
    if (!this.current || this.current.id !== id) return;
    this.current.isFavorite = value;
  }

  isFavorite(id: number): boolean {
    return this.favoriteIds.includes(id);
  }

  private loadFavorites() {
    const saved = localStorage.getItem("favorites");
    this.favoriteIds = saved ? JSON.parse(saved) : [];
  }

  private syncFavorites() {
    localStorage.setItem("favorites", JSON.stringify(this.favoriteIds));
  }

  async getGenres() {
    if (this.isGenresLoading || this.genres.length) return;

    this.isGenresLoading = true;
    try {
      const loaded = (await MovieService.getGenres()).data;
      this.genres = loaded.map((genre) => genre.name);
    } catch (error) {
      console.log(error);
    } finally {
      this.isGenresLoading = false;
    }
  }

  clearLists() {
    this.page = 1;
    this.pages = 2;
    this.movies = [];
    this.favorites = [];
  }
}
