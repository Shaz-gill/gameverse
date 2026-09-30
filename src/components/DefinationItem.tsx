import { Box, Heading } from "@chakra-ui/react";
import { ReactNode } from "react";

interface Props {
  term: string;
  children: ReactNode | ReactNode[];
}

export const DefinationItem = ({ term, children }: Props) => {
  return (
    <Box>
      <Heading
        as="dt"
        fontSize="xs"
        textTransform="uppercase"
        letterSpacing="wider"
        color="gray.500"
        marginBottom={1}
      >
        {term}
      </Heading>
      <dd>{children}</dd>
    </Box>
  );
};
