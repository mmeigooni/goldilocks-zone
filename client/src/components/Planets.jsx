import React from 'react';

export const Planets = ({data, xScale, yScale, rScale}) => (
  data.map(d => (
    <circle
      key={d.name}
      cx={xScale(d.Hzd)}
      cy={yScale(d.Mass)}
      r={rScale(d.Radius)}
    />
  ))
)