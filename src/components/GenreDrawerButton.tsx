import {
  Button,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  useColorModeValue,
  useDisclosure,
} from "@chakra-ui/react";
import { BsGridFill } from "react-icons/bs";
import useGenre from "../hooks/useGenre";
import useGameQueryStore from "../store";
import GenreList from "./GenreList";

// Phones and tablets don't have room for the sidebar, so genres open in a drawer.
const GenreDrawerButton = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const genreId = useGameQueryStore((s) => s.gameQuery.genreId);
  const genre = useGenre(genreId);
  const fieldBg = useColorModeValue("white", "#23262D");
  const fieldHoverBg = useColorModeValue("blackAlpha.100", "#2D3139");
  const signal = useColorModeValue("#B36B00", "#FFB000");
  const isFiltered = genreId !== undefined;

  return (
    <>
      <Button
        leftIcon={<BsGridFill />}
        onClick={onOpen}
        variant="unstyled"
        display="inline-flex"
        alignItems="center"
        h="40px"
        px={4}
        borderRadius="full"
        fontWeight="600"
        bg={fieldBg}
        border="1px solid"
        borderColor={isFiltered ? signal : "transparent"}
        color={isFiltered ? signal : undefined}
        _hover={{ bg: fieldHoverBg }}
        _focusVisible={{ boxShadow: `0 0 0 2px ${signal}` }}
      >
        {genre?.name ?? "All genres"}
      </Button>
      <Drawer isOpen={isOpen} onClose={onClose} placement="left" size="xs">
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader fontWeight="800">Genres</DrawerHeader>
          <DrawerBody pb={6}>
            <GenreList inDrawer onSelect={onClose} />
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default GenreDrawerButton;
