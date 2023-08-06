export const getCurrentFilters = (filters: any) => {
  const currentFilters: { [key: string]: string } = {};
  const { filtering } = filters;

  Object.keys(filtering).forEach((filterKey) => {
    const currentFilter = filtering[filterKey];
    if (currentFilter.hasOwnProperty("active")) {
      currentFilters[filterKey] = currentFilter.active;
    }
  });

  return currentFilters;
};
