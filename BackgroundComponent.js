import * as React from "react";
import Svg, { Defs, LinearGradient, Stop, Path } from "react-native-svg";



//raghad comment
function BackgroundComponent() {
  return (
    <Svg width={728.938} height={655.025}>
      <Defs>
        <LinearGradient
          id="prefix__a"
          x1={0.326}
          y1={0.12}
          x2={0.5}
          y2={1}
          gradientUnits="objectBoundingBox"
        >
          <Stop offset={0} stopColor="#f1dca7" stopOpacity={0} />
          <Stop offset={0.522} stopColor="#f1dca7" stopOpacity={0.431} />
          <Stop offset={1} stopColor="#d9ae94" stopOpacity={0.361} />
        </LinearGradient>
      </Defs>
      <Path
        data-name="Rectangle 301"
        d="M0 0h742a242 242 0 01-242 242H0V0z"
        transform="rotate(39 76.148 215.035)"
        fill="url(#prefix__a)"
      />
    </Svg>
  );
}

export default BackgroundComponent;
