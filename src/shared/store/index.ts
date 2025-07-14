import ConfirmModalStore from "./ConfirmModalStore";
import MovieStore from "./MovieStore";

export class RootStore {
  MovieStore;
  ConfirmModalStore;

  constructor() {
    this.MovieStore = new MovieStore();
    this.ConfirmModalStore = new ConfirmModalStore();
  }
}

export const rootStore = new RootStore();
