import {
  Button,
  Icon,
  Text,
  VStack,
  useColorModeValue,
} from "@chakra-ui/react";
import { IconType } from "react-icons";

interface Props {
  icon: IconType;
  title: string;
  hint?: string;
  actionLabel?: string;
  onAction?: () => void;
}

// One place for empty and error screens: say what happened, then offer a fix.
const StatusMessage = ({ icon, title, hint, actionLabel, onAction }: Props) => {
  const tileBg = useColorModeValue("blackAlpha.100", "#23262D");
  const signal = useColorModeValue("#B36B00", "#FFB000");

  return (
    <VStack spacing={3} py={16} px={4} textAlign="center" role="status">
      <VStack
        justify="center"
        boxSize="56px"
        borderRadius="full"
        bg={tileBg}
        color={signal}
      >
        <Icon as={icon} boxSize={6} />
      </VStack>
      <Text fontSize="xl" fontWeight="700">
        {title}
      </Text>
      {hint && (
        <Text maxW="420px" color="gray.500">
          {hint}
        </Text>
      )}
      {actionLabel && onAction && (
        <Button mt={2} onClick={onAction}>
          {actionLabel}
        </Button>
      )}
    </VStack>
  );
};

export default StatusMessage;
