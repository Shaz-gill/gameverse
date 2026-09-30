import { Box, Flex, Grid, GridItem, Show } from "@chakra-ui/react";
import GenreDrawerButton from "../components/GenreDrawerButton";
import GameGrid from "../components/GameGrid";
import GameHeading from "../components/GameHeading";
import GenreList from "../components/GenreList";
import PlatformDropdown from "../components/PlatformDropdown";
import SortSelector from "../components/SortSelector";

const HomePage = () => {
  return (
    <Grid
      templateAreas={{
        base: `"main"`,
        lg: `"aside main"`,
      }}
      templateColumns={{
        base: "1fr",
        lg: "220px 1fr",
      }}
      columnGap={{ lg: 10, xl: 14 }}
    >
      <Show above="lg">
        <GridItem area="aside">
          <GenreList />
        </GridItem>
      </Show>
      <GridItem area="main">
        <Box>
          <GameHeading />
          <Flex marginBottom={5} gap={3} wrap="wrap">
            <Show below="lg">
              <GenreDrawerButton />
            </Show>
            <PlatformDropdown />
            <SortSelector />
          </Flex>
        </Box>
        <GameGrid />
      </GridItem>
    </Grid>
  );
};

export default HomePage;
