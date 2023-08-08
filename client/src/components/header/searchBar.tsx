import style from "./index.module.scss";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { setSearch } from "@/redux/slices/client/filters";

export default function SearchBar() {
  const dispatch = useAppDispatch();
  const search = useAppSelector((state) => state?.client?.filters?.search);
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log(e.target.value);
    dispatch(setSearch(e.target.value));
  };

  return (
    <div id={style["search-div"]} className="flex">
      <img src="/img/fi-br-search.svg" alt="search" />
      <input
        id={style["search-input"]}
        className="body-regular margin-b-0"
        type="search"
        value={search}
        placeholder="Buscar un personaje"
        name="search"
        onChange={handleSearch}
      />
    </div>
  );
}
