export const DEFAULT = "Default";

export const orderOptions = {
  name: [
    { value: "A-Z", label: "A-Z" },
    { value: "Z-A", label: "Z-A" },
  ],
};
export const characterOptions = {
  status: [
    { value: "Alive", label: "Alive" },
    { value: "Dead", label: "Dead" },
    { value: "unknown", label: "unknown" },
  ],
  gender: [
    { value: "Male", label: "Male" },
    { value: "Female", label: "Female" },
  ],
  species: [
    { value: "Human", label: "Human" },
    { value: "Alien", label: "Alien" },
  ],
  origin: [
    { value: "Earth (C-137)", label: "Earth (C-137)" },
    { value: "Abadango", label: "Abadango" },
    { value: "unknown", label: "unknown" },
    { value: "Post-Apocalyptic Earth", label: "Post-Apocalyptic Earth" },
    { value: "Nuptia 4", label: "Nuptia 4" },
    { value: "Venzenulon 7", label: "Venzenulon 7" },
    { value: "Bepis 9", label: "Bepis 9" },
    { value: "Signus 5 Expanse", label: "Signus 5 Expanse" },
    { value: "Gromflom Prime", label: "Gromflom Prime" },
    { value: "Other Origins...", label: "Other Origins..." },
  ],
};

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
