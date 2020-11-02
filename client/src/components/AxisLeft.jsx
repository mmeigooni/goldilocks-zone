import React from 'react';

export const AxisLeft = ({yScale, innerWidth}) => (
  yScale.ticks(6).map(tick => (
    <g key={tick} transform={`translate(0, ${yScale(tick)})`}>
      <line
        x2={innerWidth}
        stroke="black"
      />
      <text
        style={{textAnchor: 'end'}}
        dx="-5"
        dy="5"
      >
        {tick}
      </text>
    </g>
  ))
);