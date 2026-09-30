import {
  Button,
  Icon,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  useColorModeValue,
} from "@chakra-ui/react";
import { BsCheck2, BsChevronDown } from "react-icons/bs";

export interface FilterOption<T> {
  value: T;
  label: string;
}

interface Props<T> {
  // Text on the button, e.g. "Platform: PC"
  label: string;
  options: FilterOption<T>[];
  selected: T;
  onSelect: (value: T) => void;
  // True when something other than the default option is selected
  isFiltered: boolean;
}

// Shared look for the Platforms and Order by dropdowns: a pill that matches
// the search box, turns amber when a filter is active, and ticks the current choice.
const FilterMenu = <T extends string | number | undefined>({
  label,
  options,
  selected,
  onSelect,
  isFiltered,
}: Props<T>) => {
  const fieldBg = useColorModeValue("white", "#23262D");
  const fieldHoverBg = useColorModeValue("blackAlpha.100", "#2D3139");
  const listBg = useColorModeValue("white", "#1B1E24");
  const border = useColorModeValue("blackAlpha.200", "#2D3139");
  const signal = useColorModeValue("#B36B00", "#FFB000");

  return (
    <Menu placement="bottom-start">
      <MenuButton
        as={Button}
        variant="unstyled"
        display="inline-flex"
        alignItems="center"
        h="40px"
        px={4}
        borderRadius="full"
        fontSize="md"
        fontWeight="600"
        bg={fieldBg}
        border="1px solid"
        borderColor={isFiltered ? signal : "transparent"}
        color={isFiltered ? signal : undefined}
        transition="background 0.15s, border-color 0.15s"
        _hover={{ bg: fieldHoverBg }}
        _active={{ bg: fieldHoverBg }}
        _focusVisible={{ boxShadow: `0 0 0 2px ${signal}` }}
        rightIcon={<Icon as={BsChevronDown} boxSize={3} />}
      >
        {label}
      </MenuButton>
      <MenuList
        bg={listBg}
        borderColor={border}
        borderRadius="xl"
        py={2}
        minW="220px"
        maxH="60vh"
        overflowY="auto"
        boxShadow="0 12px 32px rgba(0,0,0,0.35)"
      >
        {options.map((option) => {
          const isSelected = option.value === selected;
          return (
            <MenuItem
              key={String(option.value ?? "all")}
              onClick={() => onSelect(option.value)}
              bg="transparent"
              _hover={{ bg: fieldHoverBg }}
              _focus={{ bg: fieldHoverBg }}
              fontWeight={isSelected ? "700" : "500"}
              justifyContent="space-between"
              gap={4}
              px={4}
              py={2}
            >
              {option.label}
              {isSelected && <Icon as={BsCheck2} color={signal} boxSize={5} />}
            </MenuItem>
          );
        })}
      </MenuList>
    </Menu>
  );
};

export default FilterMenu;
