import {
  Badge,
  Box,
  Button,
  Card,
  CardBody,
  Flex,
  HStack,
  Heading,
  Icon,
  Image,
  Spinner,
  Text,
  useColorModeValue,
  Wrap,
  WrapItem,
} from "@chakra-ui/react";
import { BsArrowLeft, BsBoxArrowUpRight } from "react-icons/bs";
import { Link as RouterLink, useParams } from "react-router-dom";
import ExpandableText from "../components/ExpandableText";
import { GameAttributes } from "../components/GameAttributes";
import GameScreenshots from "../components/GameScreenshots";
import GameStores from "../components/GameStores";
import GameTrailer from "../components/GameTrailer";
import PlatformIconList from "../components/PlatformIconList";
import useGame from "../hooks/useGame";

const GameDetailPage = () => {
  const { slug } = useParams();
  const cardBg = useColorModeValue("white", "gray.800");

  // "!", we are telling TS that this value will never be null
  const { data: game, isLoading, error } = useGame(slug!);

  if (isLoading)
    return (
      <Flex justify="center" py={20}>
        <Spinner size="xl" />
      </Flex>
    );
  if (error || !game) throw error;

  const releaseYear = game.released
    ? new Date(game.released).toLocaleDateString(undefined, {
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    : null;

  const englishTags = game.tags?.filter((tag) => tag.language === "eng") ?? [];

  return (
    <Box marginBottom={10}>
      <Flex marginBottom={4}>
        <Button
          as={RouterLink}
          to="/"
          size="sm"
          variant="outline"
          borderRadius="full"
          leftIcon={<Icon as={BsArrowLeft} />}
        >
          Back to games
        </Button>
      </Flex>

      {/* Hero banner */}
      <Box
        position="relative"
        borderRadius="2xl"
        overflow="hidden"
        bg="blackAlpha.800"
        marginBottom={8}
      >
        {/* Blurred fill so the full image can be shown without empty bars */}
        <Box
          position="absolute"
          inset={-4}
          backgroundImage={`url(${game.background_image})`}
          backgroundSize="cover"
          backgroundPosition="center"
          filter="blur(24px)"
        />
        <Image
          position="relative"
          src={game.background_image}
          alt={game.name}
          display="block"
          marginX="auto"
          width="100%"
          maxH={{ base: "320px", md: "560px" }}
          objectFit="contain"
        />
        <Box
          position="absolute"
          inset={0}
          bgGradient="linear(to-t, blackAlpha.900, blackAlpha.400 60%, blackAlpha.200)"
        />
        <Flex
          position="absolute"
          bottom={0}
          left={0}
          right={0}
          padding={{ base: 5, md: 8 }}
          direction="column"
          gap={3}
          color="white"
        >
          <HStack spacing={2} wrap="wrap">
            {game.genres?.map((genre) => (
              <Badge
                key={genre.id}
                colorScheme="yellow"
                borderRadius="full"
                paddingX={3}
                paddingY={0.5}
              >
                {genre.name}
              </Badge>
            ))}
          </HStack>
          <Heading size={{ base: "xl", md: "3xl" }} textShadow="0 2px 12px #000a">
            {game.name}
          </Heading>
          <HStack spacing={5} wrap="wrap" color="whiteAlpha.900">
            {game.parent_platforms && (
              <PlatformIconList
                platforms={game.parent_platforms.map((p) => p.platform)}
              />
            )}
            {releaseYear && <Text fontSize="sm">{releaseYear}</Text>}
          </HStack>
        </Flex>
      </Box>

      <Flex gap={8} direction={{ base: "column", lg: "row" }} align="flex-start">
        {/* Left: description + facts */}
        <Box flex="1" minW={0} width="100%">
          <Card bg={cardBg} variant="outline" borderRadius="xl" marginBottom={6}>
            <CardBody>
              <Heading size="md" marginBottom={3}>
                About
              </Heading>
              <ExpandableText>{game.description_raw}</ExpandableText>
            </CardBody>
          </Card>

          <Card bg={cardBg} variant="outline" borderRadius="xl" marginBottom={6}>
            <CardBody>
              <Heading size="md">Details</Heading>
              <GameAttributes game={game} />
              {game.website && (
                <Button
                  as="a"
                  href={game.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  colorScheme="yellow"
                  size="sm"
                  rightIcon={<Icon as={BsBoxArrowUpRight} />}
                >
                  Official website
                </Button>
              )}
            </CardBody>
          </Card>

          {englishTags.length > 0 && (
            <Card bg={cardBg} variant="outline" borderRadius="xl" marginBottom={6}>
              <CardBody>
                <Heading size="md" marginBottom={3}>
                  Tags
                </Heading>
                <Wrap>
                  {englishTags.slice(0, 20).map((tag) => (
                    <WrapItem key={tag.id}>
                      <Badge borderRadius="full" paddingX={3} paddingY={1}>
                        {tag.name}
                      </Badge>
                    </WrapItem>
                  ))}
                </Wrap>
              </CardBody>
            </Card>
          )}

          <GameStores game={game} />
        </Box>

        {/* Right: media */}
        <Box flex="1" minW={0} width="100%">
          <Heading size="md" marginBottom={3}>
            Media
          </Heading>
          <GameTrailer gameId={game.id} />
          <GameScreenshots gameId={game.id} />
        </Box>
      </Flex>
    </Box>
  );
};

export default GameDetailPage;
