import {
  Button,
  Card,
  CardBody,
  Heading,
  Icon,
  Wrap,
  WrapItem,
  useColorModeValue,
} from "@chakra-ui/react";
import { BsBoxArrowUpRight } from "react-icons/bs";
import Game from "../entities/Game";
import useGameStores from "../hooks/useGameStores";

interface Props {
  game: Game;
}

const GameStores = ({ game }: Props) => {
  const cardBg = useColorModeValue("white", "gray.800");
  const { data } = useGameStores(game.id);

  // Only show stores we have a real game link for, never a bare store homepage
  const links = (game.stores ?? []).flatMap(({ store }) => {
    const url = data?.results.find((s) => s.store_id === store.id)?.url;
    return url ? [{ id: store.id, name: store.name, url }] : [];
  });

  if (links.length === 0) return null;

  return (
    <Card bg={cardBg} variant="outline" borderRadius="xl">
      <CardBody>
        <Heading size="md" marginBottom={3}>
          Where to buy
        </Heading>
        <Wrap>
          {links.map(({ id, name, url }) => (
            <WrapItem key={id}>
              <Button
                as="a"
                href={url}
                target="_blank"
                rel="noopener noreferrer"
                size="sm"
                variant="outline"
                rightIcon={<Icon as={BsBoxArrowUpRight} />}
              >
                {name}
              </Button>
            </WrapItem>
          ))}
        </Wrap>
      </CardBody>
    </Card>
  );
};

export default GameStores;
