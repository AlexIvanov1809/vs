// название функции должно быть глаголом
export default function wayOfSortingItems(type, state) {
  if (state.type === type && state.sort === "asc") {
    return { type, sort: "desc" };
  } else if (state.type === type && state.sort === "desc") {
    return { type, sort: "asc" };
  }
  if (state.type !== type) {
    return { type, sort: "asc" };
  }
}
