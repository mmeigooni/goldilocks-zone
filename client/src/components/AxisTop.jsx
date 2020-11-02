import React from 'react';

export const AxisTop = ({xScale, innerHeight}) => (
  xScale.ticks(2).map(tick => (
    <g key={tick} transform={`translate(${xScale(tick)}, 0)`}>
      <line y2={innerHeight} stroke="black"/>
      <text style={{textAnchor: 'middle'}}>{tick}</text>
    </g>
  ))
);