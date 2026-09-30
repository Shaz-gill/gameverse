import { SimpleGrid, Text } from "@chakra-ui/react";
import Game from "../entities/Game";
import CriticScore from "./CriticScore";
import { DefinationItem } from "./DefinationItem";

interface Props {
  game: Game;
}

export const GameAttributes = ({ game }: Props) => {
  return (
    <SimpleGrid columns={2} spacing={6} marginY={5} as="dl">
      <DefinationItem term="Platforms">
        {game.parent_platforms?.map(({ platform }) => (
          <Text key={platform.id}>{platform.name}</Text>
        ))}
      </DefinationItem>

      <DefinationItem term="Metascore">
        <CriticScore score={game.metacritic} />
      </DefinationItem>

      <DefinationItem term="Genres">
        {game.genres?.map((genres) => (
          <Text key={genres.id}>{genres.name}</Text>
        ))}
      </DefinationItem>

      {game.developers && game.developers.length > 0 && (
        <DefinationItem term="Developers">
          {game.developers.map((developer) => (
            <Text key={developer.id}>{developer.name}</Text>
          ))}
        </DefinationItem>
      )}

      <DefinationItem term="Publishers">
        {game.publishers?.map((publisher) => (
          <Text key={publisher.id}>{publisher.name}</Text>
        ))}
      </DefinationItem>
      {game.esrb_rating && (
        <DefinationItem term="Age Rating">
          <Text>{game.esrb_rating.name}</Text>
        </DefinationItem>
      )}

      {game.rating ? (
        <DefinationItem term="Community Rating">
          <Text>
            {game.rating.toFixed(1)} / 5
            {game.ratings_count
              ? ` (${game.ratings_count.toLocaleString()} ratings)`
              : ""}
          </Text>
        </DefinationItem>
      ) : null}

      {game.playtime ? (
        <DefinationItem term="Average Playtime">
          <Text>{game.playtime} hours</Text>
        </DefinationItem>
      ) : null}
    </SimpleGrid>
  );
};
