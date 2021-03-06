import React from "react";
import { SvgXml } from "react-native-svg";

export default function SvgTest() {
  const cardTemplate = `<svg width="380" height="601" viewBox="0 0 380 601" fill="none" xmlns="http://www.w3.org/2000/svg">
<line x1="264.5" y1="87" x2="0.5" y2="87" stroke="white" stroke-dasharray="2 2"/>
<line x1="264.5" y1="172" x2="0.5" y2="172" stroke="white" stroke-dasharray="2 2"/>
<line x1="264.5" y1="257" x2="0.5" y2="257" stroke="white" stroke-dasharray="2 2"/>
<line x1="264.5" y1="343" x2="0.5" y2="343" stroke="white" stroke-dasharray="2 2"/>
<line x1="264.5" y1="428" x2="0.5" y2="428" stroke="white" stroke-dasharray="2 2"/>
<line x1="264.5" y1="514" x2="0.5" y2="514" stroke="white" stroke-dasharray="2 2"/>
<rect x="264" y="1" width="599" height="263" transform="rotate(90 264 1)" stroke="white" stroke-dasharray="2 2"/>
<rect x="379" y="1" width="170" height="108" transform="rotate(90 379 1)" stroke="white" stroke-dasharray="2 2"/>
<rect x="379" y="181" width="419" height="108" transform="rotate(90 379 181)" stroke="white" stroke-dasharray="2 2"/>
</svg>

`;

  const CardTemplateSvg = () => (
    <SvgXml xml={cardTemplate} width="100%" height="100%" />
  );

  return <CardTemplateSvg />;
}
