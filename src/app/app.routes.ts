import { Routes } from "@angular/router";

// Define the routing configuration for the Angular app
export const routes: Routes = [
  // Default route, loads the HomeComponent lazily
  {
    path: "",
    loadComponent: () =>
      import("./features/home/home.component").then((m) => m.HomeComponent),
  },

  // Route for the 404 page, loads NotFoundComponent lazily
  {
    path: "404",
    loadComponent: () =>
      import("./core/components/not-found/not-found.component").then(
        (m) => m.NotFoundComponent
      ),
  },

  // Route for movies, loads child routes from content.routes lazily
  {
    path: "movies",
    loadChildren: () =>
      import("./features/content/content.routes").then((m) => m.CONTENT_ROUTES),
  },

  // Route for TV shows, loads child routes from content.routes lazily
  {
    path: "tv-shows",
    loadChildren: () =>
      import("./features/content/content.routes").then((m) => m.CONTENT_ROUTES),
  },

  // Wildcard route, redirects any undefined route to the 404 page
  { path: "**", redirectTo: "404" },
];
