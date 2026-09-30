import { Skeleton } from "@chakra-ui/react";
import usePlatform from "../hooks/usePlatform";
import usePlatforms from "../hooks/usePlatforms";
import useGameQueryStore from "../store";
import FilterMenu from "./FilterMenu";

const PlatformDropdown = () => {
  const { data, isLoading, error } = usePlatforms();

  const setSelectedPlatformId = useGameQueryStore((s) => s.setPlatformId);

  const selectedPlatformId = useGameQueryStore((s) => s.gameQuery.platformId);
  const selectedPlatform = usePlatform(selectedPlatformId);

  if (error) return null;
  if (isLoading) return <Skeleton h="40px" w="130px" borderRadius="full" />;

  const options = [
    { value: undefined as number | undefined, label: "All platforms" },
    ...(data?.results?.map((platform) => ({
      value: platform.id as number | undefined,
      label: platform.name,
    })) ?? []),
  ];

  return (
    <FilterMenu
      label={
        selectedPlatform
          ? `Platform: ${selectedPlatform.name}`
          : "All platforms"
      }
      options={options}
      selected={selectedPlatformId}
      onSelect={setSelectedPlatformId}
      isFiltered={selectedPlatformId !== undefined}
    />
  );
};

export default PlatformDropdown;
