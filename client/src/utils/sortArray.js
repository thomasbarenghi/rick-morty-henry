export const sort = (toSort, ordering) => {
  return Array.isArray(toSort)
    ? toSort.sort((a, b) => {
        return ordering === "A-Z"
          ? a.name.localeCompare(b.name)
          : ordering === "Z-A"
          ? b.name.localeCompare(a.name)
          : a.id - b.id;
      })
    : [];
};
