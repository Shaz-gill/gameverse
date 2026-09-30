import { Box, Button, Icon, Text } from "@chakra-ui/react";
import { useState } from "react";
import { BsChevronDown, BsChevronUp } from "react-icons/bs";

interface Props {
  children: string;
}

const ExpandableText = ({ children }: Props) => {
  const [expanded, setExpanded] = useState(false);

  const limit = 1000;

  if (!children) return null;

  if (children.length <= limit)
    return (
      <Text whiteSpace="pre-line" lineHeight="tall">
        {children}
      </Text>
    );

  const summary = expanded
    ? children
    : children.substring(0, limit).trimEnd() + "...";

  return (
    <Box>
      <Text whiteSpace="pre-line" lineHeight="tall">
        {summary}
      </Text>
      <Button
        onClick={() => setExpanded(!expanded)}
        size="sm"
        variant="outline"
        colorScheme="yellow"
        borderRadius="full"
        marginTop={4}
        rightIcon={<Icon as={expanded ? BsChevronUp : BsChevronDown} />}
      >
        {expanded ? "Show less" : "Read more"}
      </Button>
    </Box>
  );
};

export default ExpandableText;
