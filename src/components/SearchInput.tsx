import {
  IconButton,
  Input,
  InputGroup,
  InputLeftElement,
  InputRightElement,
  useBreakpointValue,
  useColorModeValue,
} from "@chakra-ui/react";
import { useEffect, useRef, useState } from "react";
import { BsSearch, BsXLg } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import useGameQueryStore from "../store";

const SearchInput = () => {
  const ref = useRef<HTMLInputElement>(null);
  const searchText = useGameQueryStore((s) => s.gameQuery.searchText);
  const setSearchText = useGameQueryStore((s) => s.setSearchText);
  const resetQuery = useGameQueryStore((s) => s.resetQuery);
  const [text, setText] = useState(searchText ?? "");
  const navigate = useNavigate();
  const placeholder = useBreakpointValue({
    base: "Type and press Enter",
    md: "Type a game name and press Enter",
  });
  const fieldBg = useColorModeValue("blackAlpha.100", "#23262D");
  const focusColor = useColorModeValue("#B36B00", "#FFB000");

  // Keep the field in sync when the query is reset elsewhere (e.g. "Clear filters")
  useEffect(() => {
    setText(searchText ?? "");
  }, [searchText]);

  const clear = () => {
    setText("");
    // A submitted search also resets the game list to show every game again
    if (searchText) resetQuery();
    ref.current?.focus();
  };

  return (
    <form
      className="search-form"
      onSubmit={(event) => {
        event.preventDefault();
        setSearchText(text);
        navigate("/");
      }}
    >
      <InputGroup>
        <InputLeftElement pointerEvents="none" children={<BsSearch />} />
        <Input
          ref={ref}
          value={text}
          onChange={(event) => setText(event.target.value)}
          onKeyDown={(event) => {
            if (event.key === "Escape" && text) clear();
          }}
          placeholder={placeholder}
          aria-label="Search games"
          variant="filled"
          bg={fieldBg}
          borderRadius="full"
          _hover={{ bg: fieldBg }}
          _focusVisible={{
            bg: fieldBg,
            borderColor: focusColor,
            boxShadow: `0 0 0 1px ${focusColor}`,
          }}
        />
        {text && (
          <InputRightElement>
            <IconButton
              aria-label="Clear search"
              icon={<BsXLg />}
              onClick={clear}
              size="xs"
              variant="ghost"
              borderRadius="full"
              fontSize="10px"
            />
          </InputRightElement>
        )}
      </InputGroup>
    </form>
  );
};

export default SearchInput;
