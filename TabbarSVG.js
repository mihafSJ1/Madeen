import * as React from "react"
import Svg, { Defs, G, Path } from "react-native-svg"
/* SVGR has dropped some elements not supported by react-native-svg: filter */

function SvgComponent2(props) {
  return (
    <Svg
      width={431.784}
      height={80.938}
      viewBox="0 0 431.784 80.938"
      {...props}
    >
      <Defs></Defs>
      <G filter="url(#prefix__a)">
        <Path
          data-name="Path 19"
          d="M422.784 29.983v41.955H9V29.983c0-5.667 8.008-14.784 8.008-14.784s11.791-6.2 19.577-6.2h115.3c8.371 0 17.376 6.494 24.482 13.7a79.61 79.61 0 015.223 5.89c.256.317.7.905 1.124 1.509 6.236 8.854 13.991 15.645 26.486 18.529a59.476 59.476 0 0013.215 1.348c20.45 0 30.372-8.118 38.652-19.876 6.754-9.591 16.212-21.1 27.755-21.1h106.376c15.242.001 27.586 9.396 27.586 20.984z"
          fill="#fff"
        />
      </G>
    </Svg>
  )
}

export default SvgComponent2