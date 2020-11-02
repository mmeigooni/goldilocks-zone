import React from 'react';

export const Planets = ({data, xScale, yScale, rScale, xValue, yValue, rValue, nameValue}) => (
  data.map(d => (
    <circle
      key={nameValue(d)}
      cx={xScale(xValue(d))}
      cy={yScale(yValue(d))}
      r={rScale(rValue(d))}
    />
  ))
)