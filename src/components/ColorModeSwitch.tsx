import { keyframes } from "@emotion/react";
import {
  IconButton,
  usePrefersReducedMotion,
  useColorMode,
  useColorModeValue,
} from "@chakra-ui/react";
import { FaMoon, FaSun } from "react-icons/fa";

const spinIn = keyframes`
  from { transform: rotate(-90deg) scale(0.5); opacity: 0; }
  to { transform: rotate(0) scale(1); opacity: 1; }
`;

const ColorModeSwitch = () => {
  const { toggleColorMode, colorMode } = useColorMode();
  const reduceMotion = usePrefersReducedMotion();
  const fieldBg = useColorModeValue("blackAlpha.100", "#23262D");
  const fieldHoverBg = useColorModeValue("blackAlpha.200", "#2D3139");
  const signal = useColorModeValue("#B36B00", "#FFB000");
  const isLight = colorMode === "light";

  return (
    <IconButton
      aria-label={isLight ? "Switch to dark mode" : "Switch to light mode"}
      icon={
        <span
          key={colorMode}
          style={{
            display: "flex",
            animation: reduceMotion ? undefined : `${spinIn} 0.35s ease-out`,
          }}
        >
          {isLight ? <FaMoon /> : <FaSun />}
        </span>
      }
      onClick={toggleColorMode}
      variant="unstyled"
      display="inline-flex"
      alignItems="center"
      justifyContent="center"
      flexShrink={0}
      w="40px"
      h="40px"
      minW="40px"
      borderRadius="full"
      bg={fieldBg}
      color={signal}
      fontSize="lg"
      transition="background 0.2s"
      _hover={{ bg: fieldHoverBg }}
      _focusVisible={{ boxShadow: `0 0 0 2px ${signal}` }}
    />
  );
};

export default ColorModeSwitch;
