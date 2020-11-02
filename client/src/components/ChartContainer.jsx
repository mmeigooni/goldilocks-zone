import React from 'react';

export const ChartContainer = ({children, width, height, left, top}) => (
  <svg width={width} height={height}>
    <g transform={`translate(${left + 20}, ${top})`}>
      {children}
    </g>
  </svg>
)