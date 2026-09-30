import { chakra, useColorModeValue } from "@chakra-ui/react";

interface Props {
  height?: number;
  showWordmark?: boolean;
}

const Logo = ({ height = 36, showWordmark = true }: Props) => {
  const ink = useColorModeValue("#14161A", "#E9E6DF");
  const signal = useColorModeValue("#B36B00", "#FFB000");

  // The orbit ring starts ~2 units inside the mark's box; crop it so the
  // ring's edge sits flush with the page gutter.
  const cropLeft = 2;
  const viewWidth = (showWordmark ? 164 : 32) - cropLeft;

  return (
    <chakra.svg
      role="img"
      aria-label="GameVerse"
      viewBox={`${cropLeft} 0 ${viewWidth} 32`}
      height={`${height}px`}
      width={`${(height * viewWidth) / 32}px`}
      flexShrink={0}
      color={ink}
    >
      <defs>
        <clipPath id="logo-front">
          <rect x="0" y="16" width="32" height="16" />
        </clipPath>
      </defs>
      <g transform="rotate(-25 16 16)">
        <ellipse
          cx="16"
          cy="16"
          rx="14"
          ry="5.5"
          fill="none"
          stroke={signal}
          strokeWidth="2"
        />
      </g>
      <rect x="8" y="8" width="16" height="16" rx="4" fill="currentColor" />
      <g transform="rotate(-25 16 16)" clipPath="url(#logo-front)">
        <ellipse
          cx="16"
          cy="16"
          rx="14"
          ry="5.5"
          fill="none"
          stroke={signal}
          strokeWidth="2"
        />
      </g>
      {showWordmark && (
        <text
          x="40"
          y="24"
          fill="currentColor"
          fontFamily="'Bricolage Grotesque', system-ui, sans-serif"
          fontSize="24"
          fontWeight="800"
          textLength="118"
          lengthAdjust="spacingAndGlyphs"
        >
          GameVerse
        </text>
      )}
    </chakra.svg>
  );
};

export default Logo;
