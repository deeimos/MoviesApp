import "react-router-dom";

export const ROUTES = {
  MOOVIES: "/",
  FAVORITE_MOOVIES: "/favorite",
  MOOVIE: "/moovie/:moovieId",
  NOT_FOUND: "/404"
} as const;

export type PathParams = {
  [ROUTES.MOOVIE]: {
    moovieId: string;
  };
};

declare module "react-router-dom" {
  interface Register {
    params: PathParams;
  }
}