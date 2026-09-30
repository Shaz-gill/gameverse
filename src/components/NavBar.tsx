import {
  Box,
  Flex,
  Spacer,
  useBreakpointValue,
  useColorModeValue,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";
import ColorModeSwitch from "./ColorModeSwitch";
import Logo from "./Logo";
import SearchInput from "./SearchInput";

const NavBar = () => {
  const showWordmark = useBreakpointValue({ base: false, md: true });
  const bg = useColorModeValue("rgba(236,233,226,0.85)", "rgba(20,22,26,0.85)");
  const border = useColorModeValue("blackAlpha.200", "#23262D");

  return (
    <Box
      as="header"
      position="sticky"
      top={0}
      zIndex="sticky"
      bg={bg}
      backdropFilter="blur(12px)"
      borderBottom="1px solid"
      borderColor={border}
    >
      <Flex
        align="center"
        gap={{ base: 3, md: 8 }}
        px={{ base: 4, md: 6 }}
        h="72px"
        maxW="1600px"
        mx="auto"
      >
        <Link to="/" aria-label="GameVerse home" style={{ flexShrink: 0 }}>
          <Logo height={34} showWordmark={showWordmark} />
        </Link>
        <SearchInput />
        <Spacer display={{ base: "none", md: "block" }} />
        <ColorModeSwitch />
      </Flex>
    </Box>
  );
};

export default NavBar;
