import React from "react";
import { SvgXml } from "react-native-svg";

export default function SvgTest() {
  const cardTemplate = `<svg width="380" height="401" viewBox="0 0 380 401" fill="none" xmlns="http://www.w3.org/2000/svg">
<line x1="298.5" y1="58" x2="0.5" y2="58" stroke="white" stroke-dasharray="2 2"/>
<line x1="298.5" y1="115" x2="0.5" y2="115" stroke="white" stroke-dasharray="2 2"/>
<line x1="298.5" y1="172" x2="0.5" y2="172" stroke="white" stroke-dasharray="2 2"/>
<line x1="298.5" y1="229" x2="0.5" y2="229" stroke="white" stroke-dasharray="2 2"/>
<line x1="298.5" y1="286" x2="0.5" y2="286" stroke="white" stroke-dasharray="2 2"/>
<line x1="298.5" y1="343" x2="0.5" y2="343" stroke="white" stroke-dasharray="2 2"/>
<rect x="298" y="1" width="399" height="297" transform="rotate(90 298 1)" stroke="white" stroke-dasharray="2 2"/>
<rect x="379" y="1" width="113" height="75" transform="rotate(90 379 1)" stroke="white" stroke-dasharray="2 2"/>
<rect x="379" y="121" width="279" height="75" transform="rotate(90 379 121)" stroke="white" stroke-dasharray="2 2"/>
</svg>


`;

  const CardTemplateSvg = () => (
    <SvgXml xml={cardTemplate} width="100%" height="100%" />
  );

  return <CardTemplateSvg />;
}
