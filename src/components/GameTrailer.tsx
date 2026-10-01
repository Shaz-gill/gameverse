import useTrailers from "../hooks/useTrailers";

interface Props {
  gameId: number;
}

const GameTrailer = ({ gameId }: Props) => {
  const { data, isLoading, error } = useTrailers(gameId);

  if (isLoading) return null;
  if (error) throw error;

  const gameTrailerValue = data?.results[0];

  return gameTrailerValue ? (
    <video
      src={gameTrailerValue?.data[480]}
      poster={gameTrailerValue?.preview}
      controls
      className="game-trailer"
    />
  ) : null;
};

export default GameTrailer;
