import { Box, useColorModeValue } from "@chakra-ui/react";
import { ReactNode } from "react";

interface Props {
  children: ReactNode;
}

// Netflix-style hover: after a short delay the card grows and floats above its
// neighbours. Only on devices that can hover and when motion is allowed.
const GameCardContainer = ({ children }: Props) => {
  const shadow = useColorModeValue("rgba(0,0,0,0.3)", "rgba(0,0,0,0.55)");

  return (
    <Box
      role="group"
      position="relative"
      h="100%"
      borderRadius="xl"
      transition="transform 0.25s ease, filter 0.25s ease"
      sx={{
        "@media (hover: hover) and (prefers-reduced-motion: no-preference)": {
          "&:hover, &:focus-within": {
            transform: "scale(1.2)",
            zIndex: 10,
            // drop-shadow follows the card and panel as one shape, so no seam
            filter: `drop-shadow(0 18px 24px ${shadow})`,
            transitionDelay: "0.25s",
          },
        },
      }}
    >
      {children}
    </Box>
  );
};

export default GameCardContainer;
