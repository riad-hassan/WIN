import Svg, { Text as SvgText, Defs, LinearGradient, Stop } from "react-native-svg";

export default function AviatorText () => {
  return (
    <Svg height="40" width="200">
      <Defs>
        <LinearGradient id="grad" x1="0" y1="0" x2="1" y2="0">
          <Stop offset="0%" stopColor="#ff0000" />
          <Stop offset="100%" stopColor="#ff9900" />
        </LinearGradient>
      </Defs>

      <SvgText
        fill="url(#grad)"
        stroke="#000"
        strokeWidth="1"
        fontSize="24"
        fontWeight="bold"
        x="10"
        y="30"
      >
        AVIATOR
      </SvgText>
    </Svg>
  );
};