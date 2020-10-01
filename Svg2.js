import * as React from "react"
import Svg, { Circle } from "react-native-svg"

function SvgComponent2(props) {
  return (
    <Svg width={30} height={30} viewBox="0 0 30 30" {...props}>
      <Circle data-name="Ellipse 7" cx={15} cy={15} r={15} fill="#cbca9e" />
    </Svg>
  )
}

export default SvgComponent2