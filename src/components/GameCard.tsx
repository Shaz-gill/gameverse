import {
  Box,
  Card,
  CardBody,
  Flex,
  Heading,
  HStack,
  Image,
  Tag,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import { BsArrowRightCircle } from "react-icons/bs";
import { Link } from "react-router-dom";
import Game from "../entities/Game";
import getCroppedImageUrl from "../services/image-url";
import Emoji from "./Emoji";
import PlatformIconList from "./PlatformIconList";

interface Props {
  game: Game;
}

const scoreColor = (score: number) =>
  score > 75 ? "green.300" : score > 60 ? "yellow.300" : "gray.300";

const GameCard = ({ game }: Props) => {
  const panelBg = useColorModeValue("white", "gray.700");
  const mutedText = useColorModeValue("gray.600", "gray.400");

  return (
    <Card
      as={Link}
      to={"/games/" + game.slug}
      aria-label={game.name}
      h="100%"
      borderRadius="xl"
    >
      <Box position="relative">
        <Image
          src={getCroppedImageUrl(game.background_image)}
          alt=""
          w="100%"
          aspectRatio={3 / 2}
          objectFit="cover"
          borderTopRadius="xl"
        />
        {game.metacritic > 0 && (
          <Flex
            position="absolute"
            top={3}
            right={3}
            align="center"
            px={2}
            h="24px"
            borderRadius="md"
            bg="rgba(20,22,26,0.85)"
            border="1px solid"
            borderColor="whiteAlpha.300"
            color={scoreColor(game.metacritic)}
            fontSize="sm"
            fontWeight="700"
          >
            <Text as="span" aria-label={`Metacritic score ${game.metacritic}`}>
              {game.metacritic}
            </Text>
          </Flex>
        )}
      </Box>
      <CardBody
        display="flex"
        flexDirection="column"
        gap={2}
        px={4}
        pt={3}
        pb={4}
      >
        <HStack justify="space-between" h="24px">
          <PlatformIconList
            platforms={game.parent_platforms.map((p) => p.platform)}
          />
          <Emoji rating={game.rating_top} />
        </HStack>
        {/* Two lines are always reserved so every card has the same height */}
        <Box minH="calc(2 * 1.375em)" fontSize="lg">
          <Box position="relative">
            <Heading as="h3" fontSize="lg" lineHeight="short" noOfLines={2}>
              {game.name}
            </Heading>
            {/* Anchored to the bottom of the title, so it opens right under
                it and covers the rest of the card, whatever the title length */}
            <Box
              aria-hidden
              position="absolute"
              zIndex={1}
              top="100%"
              left={-4}
              right={-4}
              px={4}
              pt={2}
              pb={4}
              bg={panelBg}
              borderBottomRadius="xl"
              opacity={0}
              pointerEvents="none"
              transition="opacity 0.2s ease"
              _groupHover={{
                opacity: 1,
                pointerEvents: "auto",
                transitionDelay: "0.3s",
              }}
              _groupFocusWithin={{
                opacity: 1,
                pointerEvents: "auto",
                transitionDelay: "0.3s",
              }}
            >
              {game.genres?.length > 0 && (
                <Flex wrap="wrap" gap={2} mb={3}>
                  {game.genres.slice(0, 3).map((genre) => (
                    <Tag key={genre.id} size="sm" borderRadius="full">
                      {genre.name}
                    </Tag>
                  ))}
                </Flex>
              )}
              <HStack
                spacing={2}
                fontSize="sm"
                fontWeight="600"
                color={mutedText}
              >
                <BsArrowRightCircle />
                <Text>View details</Text>
              </HStack>
            </Box>
          </Box>
        </Box>
      </CardBody>
    </Card>
  );
};

export default GameCard;
