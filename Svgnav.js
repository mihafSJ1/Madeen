import * as React from "react"
import Svg, { Defs, G, Circle, Path } from "react-native-svg"
/* SVGR has dropped some elements not supported by react-native-svg: filter */

function SvgComponent(props) {
  return (
    <Svg width={84} height={84} viewBox="0 0 84 84" {...props}>
      <Defs></Defs>
      <G data-name="Group 10">
        <G filter="url(#prefix__a)">
          <Circle
            data-name="Ellipse 4"
            cx={33}
            cy={33}
            r={33}
            transform="translate(9 9)"
            fill="#9b9b7a"
          />
        </G>
        <G
          data-name="Icon feather-plus"
          fill="none"
          stroke="#fff"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={3}
        >
          <Path data-name="Path 20" d="M42.217 27.823v30.434" />
          <Path data-name="Path 21" d="M27 43.04h30.434" />
        </G>
      </G>
    </Svg>
  )
}

export default SvgComponent
