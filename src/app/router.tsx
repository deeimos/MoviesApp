import { ROUTES } from "@/shared/lib/routes";
import { createBrowserRouter } from "react-router-dom";
import App from "@/app/App";
import { StoreProvider } from "./providers/store";

const lazyLoad = (loader: () => Promise<{ default: React.ComponentType }>) =>
  loader().then((module) => ({
    Component: module.default,
  }));

export const router = createBrowserRouter([
  {
    element: (
      <StoreProvider>
        <App />
      </StoreProvider>
    ),
    children: [
      {
        path: ROUTES.MOOVIES,
        lazy: () => lazyLoad(() => import("@/pages/Movies/index")),
      },
      {
        path: ROUTES.FAVORITE_MOOVIES,
        lazy: () => lazyLoad(() => import("@/pages/FavoriteMovies/index")),
      },
      {
        path: ROUTES.MOOVIE,
        lazy: () => lazyLoad(() => import("@/pages/Movie/index")),
      },
      {
        path: ROUTES.NOT_FOUND,
        lazy: () => lazyLoad(() => import("@/pages/NotFound/index")),
      },
      {
        path: "*",
        lazy: () => lazyLoad(() => import("@/pages/NotFound/index")),
      },
    ],
  },
]);
