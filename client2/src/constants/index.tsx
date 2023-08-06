export const DEFAULT = "Default";

export const Routes = {
  HOME: "/",
  GAMES: "/games",
  ABOUT: "/about",
};

export const ASC = "A-Z";
export const DESC = "Z-A";

export const Filters = {
  ORIGEN: {
    title: "Origen",
    values: [DEFAULT, "own", "public"],
    active: DEFAULT,
  },
  GENRES: {
    title: "Genres",
    active: DEFAULT,
  },
  SEARCH: {
    title: "Search",
    active: "",
  },
  RATING: {
    title: "Rating",
    active: DEFAULT,
    values: [DEFAULT, "0-5", "5-0"],
  },
  NAME: {
    title: "Ordering",
    active: DEFAULT,
    values: [DEFAULT, "A-Z", "Z-A"],
  },
};
