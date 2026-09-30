import { useQuery } from "@tanstack/react-query";
import GameStore from "../entities/GameStore";
import APIClient from "../services/api-clients";

// Per-game store URLs; the /games/{slug} response leaves these empty
const useGameStores = (gameId: number) => {
  const apiClient = new APIClient<GameStore>(`/games/${gameId}/stores`);

  return useQuery({
    queryKey: ["game-stores", gameId],
    queryFn: apiClient.getAll,
  });
};

export default useGameStores;
