import { create } from "zustand";

interface GameQuery {
  genreId?: number;
  platformId?: number;
  sortOrder?: string;
  searchText?: string;
}

interface GameQueryStore {
  gameQuery: GameQuery;
  setSearchText: (searchText: string) => void;
  setGenreId: (genreId?: number) => void;
  setPlatformId: (platformId?: number) => void;
  setSortOrder: (sortOrder: string) => void;
  resetQuery: () => void;
}

// A kind of a custom hook
const useGameQueryStore = create<GameQueryStore>((set) => ({
  gameQuery: {}, // Initial Value
  // "setSearchText" logic is different than others. On searching game, we are clearing the other gameQuery fields.
  setSearchText: (searchText) => set(() => ({ gameQuery: { searchText } })),
  setGenreId: (genreId) =>
    set((store) => ({ gameQuery: { ...store.gameQuery, genreId } })),
  setPlatformId: (platformId) =>
    set((store) => ({ gameQuery: { ...store.gameQuery, platformId } })),
  setSortOrder: (sortOrder) =>
    set((store) => ({ gameQuery: { ...store.gameQuery, sortOrder } })),
  resetQuery: () => set(() => ({ gameQuery: {} })),
}));

export default useGameQueryStore;
