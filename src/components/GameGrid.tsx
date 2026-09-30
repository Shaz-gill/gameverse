import { SimpleGrid } from "@chakra-ui/react";
import React from "react";
import { BsSearch, BsWifiOff } from "react-icons/bs";
import InfiniteScroll from "react-infinite-scroll-component";
import useGames from "../hooks/useGames";
import GameCard from "./GameCard";
import GameCardContainer from "./GameCardContainer";
import useGameQueryStore from "../store";
import GameCardSkeleton from "./GameCardSkeleton";
import StatusMessage from "./StatusMessage";

const GameGrid = () => {
  const {
    data,
    error,
    isLoading,
    isFetchingNextPage,
    fetchNextPage,
    hasNextPage,
    refetch,
  } = useGames();
  const gameQuery = useGameQueryStore((s) => s.gameQuery);
  const resetQuery = useGameQueryStore((s) => s.resetQuery);
  const skeletons = Array.from({ length: 12 }, (_, i) => i + 1);

  if (error)
    return (
      <StatusMessage
        icon={BsWifiOff}
        title="Couldn't load games"
        hint={`${error.message}. Check your connection and try again.`}
        actionLabel="Try again"
        onAction={() => refetch()}
      />
    );

  // For calculating total number of games
  const fetchGamesCount =
    data?.pages.reduce((total, page) => total + page.results.length, 0) || 0;

  if (!isLoading && fetchGamesCount === 0)
    return (
      <StatusMessage
        icon={BsSearch}
        title={
          gameQuery.searchText
            ? `No games found for "${gameQuery.searchText}"`
            : "No games match these filters"
        }
        hint="Check the spelling, or clear your search and filters to see every game."
        actionLabel="Clear search and filters"
        onAction={resetQuery}
      />
    );

  return (
    <>
      {/* "!!" => if we will get undefined than by applying "!!" will convert it to boolean false */}
      <InfiniteScroll
        dataLength={fetchGamesCount}
        hasMore={!!hasNextPage}
        next={() => fetchNextPage()}
        // Next-page skeletons are rendered inside the grid so they align with the cards
        loader={null}
        // Default is overflow:auto, which would clip the enlarged hovered card
        style={{ overflow: "visible" }}
      >
        <SimpleGrid columns={{ sm: 1, md: 2, lg: 3, xl: 4 }} spacing={6}>
          {isLoading &&
            skeletons.map((skeleton) => (
              <GameCardContainer key={skeleton}>
                <GameCardSkeleton />
              </GameCardContainer>
            ))}

          {data?.pages.map((page, index) => (
            <React.Fragment key={index}>
              {page?.results.map((game) => (
                <GameCardContainer key={game.id}>
                  <GameCard game={game} />
                </GameCardContainer>
              ))}
            </React.Fragment>
          ))}

          {isFetchingNextPage &&
            skeletons.map((skeleton) => (
              <GameCardContainer key={`next-${skeleton}`}>
                <GameCardSkeleton />
              </GameCardContainer>
            ))}
        </SimpleGrid>
      </InfiniteScroll>
      {/* DON'T DELETE */}
      {/* {hasNextPage && (
        <Box textAlign="center" mt={5} mb={8}>
          <Button
            onClick={() => fetchNextPage()}
            size="lg"
            disabled={isFetchingNextPage}
          >
            {isFetchingNextPage ? <Spinner /> : "Load More"}
          </Button>
        </Box>
      )} */}
    </>
  );
};

export default GameGrid;
