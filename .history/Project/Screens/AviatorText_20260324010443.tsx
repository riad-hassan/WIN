import React from "react";
import { View } from "react-native";
import Svg, { Text as SvgText, Defs, LinearGradient, Stop } from "react-native-svg";

export default function AviatorText() {
  return (
    <View>
      <Svg height="50" width="220">
        
        <Defs>
          <LinearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="0%">
            <Stop offset="0%" stopColor="#ff0000" />
            <Stop offset="100%" stopColor="#ff9900" />
          </LinearGradient>
        </Defs>

        {/* Glow effect (shadow fake) */}
        <SvgText
          x="12"
          y="35"
          fontSize="28"
          fontWeight="900"
          fill="#ff0000"
          opacity="0.3"
        >
          AVIATOR
        </SvgText>

        {/* Main Text */}
        <SvgText
          x="10"
          y="33"
          fontSize="28"
          fontWeight="900"
          fill="url(#grad)"
          stroke="#000"
          strokeWidth="0.5"
        >
          AVIATOR
        </SvgText>

      </Svg>
    </View>
  );
}