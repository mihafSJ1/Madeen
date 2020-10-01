import * as React from "react"
import Svg, { Defs, G, Path } from "react-native-svg"
/* SVGR has dropped some elements not supported by react-native-svg: filter */

function SvgComponent(props) {
  return (
    <Svg width={393} height={81.258} viewBox="0 0 393 81.258" {...props}>
      <Defs></Defs>
      <G filter="url(#prefix__a)">
        <Path
          data-name="Path 19"
          d="M384 30.09v42.168H9V30.09c0-5.7 7.258-14.859 7.258-14.859S26.943 9 34 9h104.494c7.587 0 15.747 6.527 22.187 13.77a76.265 76.265 0 014.734 5.92c.232.319.633.91 1.019 1.517 5.651 8.9 12.68 15.724 24 18.624a48.818 48.818 0 0011.976 1.355c18.533 0 27.525-8.16 35.029-19.977 6.121-9.639 14.692-21.208 25.153-21.208h96.4C372.81 9 384 18.443 384 30.09z"
          fill="#fff"
        />
      </G>
    </Svg>
  )
}

export default SvgComponent
