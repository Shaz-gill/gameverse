import {
  Box,
  Button,
  Flex,
  Heading,
  Image,
  List,
  ListItem,
  Skeleton,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import { ReactNode } from "react";
import { BsGridFill } from "react-icons/bs";
import useGenres from "../hooks/useGenres";
import getCroppedImageUrl from "../services/image-url";
import useGameQueryStore from "../store";

interface RowProps {
  label: string;
  isActive: boolean;
  onSelect: () => void;
  children: ReactNode;
}

const GenreRow = ({ label, isActive, onSelect, children }: RowProps) => {
  const hoverBg = useColorModeValue("blackAlpha.100", "whiteAlpha.100");
  const activeBg = useColorModeValue("blackAlpha.200", "#23262D");
  const signal = useColorModeValue("#B36B00", "#FFB000");

  return (
    <ListItem>
      <Button
        onClick={onSelect}
        aria-current={isActive ? "true" : undefined}
        variant="unstyled"
        display="flex"
        alignItems="center"
        justifyContent="flex-start"
        gap={3}
        w="100%"
        h="auto"
        py={2}
        px={3}
        borderRadius="lg"
        position="relative"
        textAlign="left"
        whiteSpace="normal"
        fontSize="md"
        fontWeight={isActive ? "700" : "500"}
        bg={isActive ? activeBg : "transparent"}
        transition="background 0.15s"
        _hover={{ bg: isActive ? activeBg : hoverBg }}
        _focusVisible={{ boxShadow: `0 0 0 2px ${signal}` }}
        _before={{
          content: '""',
          position: "absolute",
          left: 0,
          top: "22%",
          bottom: "22%",
          width: "3px",
          borderRadius: "full",
          bg: signal,
          opacity: isActive ? 1 : 0,
        }}
      >
        {children}
        {label}
      </Button>
    </ListItem>
  );
};

// Varied label widths so the placeholder reads as a list of names, not a block.
const skeletonWidths = [
  "72px",
  "56px",
  "88px",
  "48px",
  "80px",
  "64px",
  "96px",
  "60px",
  "76px",
  "52px",
  "84px",
];

interface ListProps {
  // Called after a genre is chosen (used to close the mobile drawer)
  onSelect?: () => void;
  // Render inside a drawer: no sticky positioning or sidebar offsets
  inDrawer?: boolean;
}

const GenreList = ({ onSelect, inDrawer = false }: ListProps) => {
  const { data, isLoading, error } = useGenres();
  const selectedGenreId = useGameQueryStore((s) => s.gameQuery.genreId);
  const setSelectedGenreId = useGameQueryStore((s) => s.setGenreId);
  const tileBg = useColorModeValue("blackAlpha.200", "#23262D");
  const signal = useColorModeValue("#B36B00", "#FFB000");
  const skeletonStart = useColorModeValue("blackAlpha.100", "#1B1E24");
  const skeletonEnd = useColorModeValue("blackAlpha.300", "#2D3139");

  if (error)
    return (
      <Text fontSize="sm" color="gray.500" px={3}>
        Couldn't load genres. Refresh the page to try again.
      </Text>
    );

  const select = (id?: number) => {
    setSelectedGenreId(id);
    onSelect?.();
  };

  return (
    <Box
      as="nav"
      aria-label="Genres"
      {...(inDrawer
        ? {}
        : {
            position: "sticky",
            top: "88px",
            maxH: "calc(100vh - 104px)",
            overflowY: "auto",
            pr: 3,
            pb: 4,
          })}
    >
      {!inDrawer && (
        <Heading
          as="h2"
          fontSize="xs"
          fontWeight="700"
          letterSpacing="0.08em"
          textTransform="uppercase"
          color="gray.500"
          mb={2}
          px={3}
        >
          Genres
        </Heading>
      )}
      {isLoading ? (
        <List spacing={1} aria-busy="true">
          {skeletonWidths.map((width, i) => (
            <ListItem key={i}>
              <Flex align="center" gap={3} py={2} px={3}>
                <Skeleton
                  boxSize="32px"
                  flexShrink={0}
                  borderRadius="md"
                  startColor={skeletonStart}
                  endColor={skeletonEnd}
                />
                <Skeleton
                  height="12px"
                  width={width}
                  borderRadius="full"
                  startColor={skeletonStart}
                  endColor={skeletonEnd}
                />
              </Flex>
            </ListItem>
          ))}
        </List>
      ) : (
        <List spacing={1}>
          <GenreRow
            label="All games"
            isActive={selectedGenreId === undefined}
            onSelect={() => select(undefined)}
          >
            <Flex
              boxSize="32px"
              flexShrink={0}
              align="center"
              justify="center"
              borderRadius="md"
              bg={tileBg}
              color={signal}
            >
              <BsGridFill />
            </Flex>
          </GenreRow>
          {data?.results?.map((genre) => (
            <GenreRow
              key={genre.id}
              label={genre.name}
              isActive={genre.id === selectedGenreId}
              onSelect={() => select(genre.id)}
            >
              <Image
                boxSize="32px"
                flexShrink={0}
                borderRadius="md"
                objectFit="cover"
                src={getCroppedImageUrl(genre.image_background)}
                alt=""
              />
            </GenreRow>
          ))}
        </List>
      )}
    </Box>
  );
};

export default GenreList;
