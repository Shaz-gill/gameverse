import useGameQueryStore from "../store";
import FilterMenu from "./FilterMenu";

const sortOrders = [
  { value: "", label: "Relevance" },
  { value: "-added", label: "Date added" },
  { value: "name", label: "Name" },
  { value: "-released", label: "Release date" },
  { value: "-metacritic", label: "Popularity" },
  { value: "-rating", label: "Average rating" },
];

const SortSelector = () => {
  const sortOrder = useGameQueryStore((s) => s.gameQuery.sortOrder) ?? "";
  const setSortOrder = useGameQueryStore((s) => s.setSortOrder);

  const currentSortOrder = sortOrders.find(
    (order) => order.value === sortOrder,
  );

  return (
    <FilterMenu
      label={`Order by: ${currentSortOrder?.label || "Relevance"}`}
      options={sortOrders}
      selected={sortOrder}
      onSelect={setSortOrder}
      isFiltered={sortOrder !== ""}
    />
  );
};

export default SortSelector;
