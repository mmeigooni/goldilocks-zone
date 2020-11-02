import React from 'react';

export const AxisTop = ({innerWidth, innerHeight}) => (
  <g>
    <line y2={innerHeight} transform={`translate(${Math.ceil(innerWidth / 3) - 45}, 0)`} stroke="#fff"></line>
    <line y2={innerHeight} transform={`translate(${Math.ceil(innerWidth * 2 / 3)}, 0)`} stroke="#fff"></line>
  </g>
  // xScale.ticks(3).map(tick => (
  //   <g key={tick} transform={`translate(${xScale(tick)}, 0)`}>
  //     <line y2={innerHeight} stroke="white"/>
  //     <text style={{textAnchor: 'middle'}} fill='white'>{tick}</text>
  //   </g>
  // ))
);