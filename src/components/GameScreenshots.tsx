import { Image, SimpleGrid } from "@chakra-ui/react";
import useScreenshots from "../hooks/useScreenshots";

interface Props {
  gameId: number;
}

const GameScreenshots = ({ gameId }: Props) => {
  const { data, isLoading, error } = useScreenshots(gameId);

  if (isLoading) return null;
  if (error) throw error;

  return (
    <SimpleGrid
      columns={{
        base: 1,
        md: 2,
      }}
      spacing={2}
      marginTop={5}
    >
      {data?.results.map((file) => (
        <Image
          key={file.id}
          src={file.image}
          loading="lazy"
          width="100%"
          aspectRatio={16 / 9}
          objectFit="cover"
          borderRadius="lg"
          transition="transform 0.2s"
          _hover={{ transform: "scale(1.03)" }}
        />
      ))}
    </SimpleGrid>
  );
};

export default GameScreenshots;
