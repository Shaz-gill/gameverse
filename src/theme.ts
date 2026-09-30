import { extendTheme, type ThemeConfig } from "@chakra-ui/react";

const config: ThemeConfig = {
  initialColorMode: "dark",
};

const theme = extendTheme({
  config,
  styles: {
    global: (props: { colorMode: string }) => ({
      body: {
        // Light mode uses warm paper and ink to match the logo and navbar
        bg: props.colorMode === "light" ? "#ECE9E2" : undefined,
        color: props.colorMode === "light" ? "#16181D" : undefined,
      },
    }),
  },
  components: {
    Button: {
      variants: {
        // Default grey buttons vanish against the light-mode paper background
        solid: (props: { colorMode: string; colorScheme: string }) =>
          props.colorScheme === "gray" && props.colorMode === "light"
            ? { bg: "white", _hover: { bg: "blackAlpha.100" } }
            : {},
      },
    },
  },
  colors: {
    gray: {
      50: "#f9f9f9",
      100: "#ededed",
      200: "#d3d3d3",
      300: "#b3b3b3",
      400: "#a0a0a0",
      500: "#898989",
      600: "#6c6c6c",
      700: "#202020",
      800: "#121212",
      900: "#111111",
    },
  },
});

export default theme;
