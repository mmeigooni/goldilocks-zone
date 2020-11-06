import React from 'react';
import { select } from 'd3';
import { generateId } from '../helpers/generateId.js';

export const Planets = ({data, xScale, yScale, rScale, xValue, yValue, rValue, nameValue, colorScale}) => {

  const handleMouseEnter = (d) => {
    select(`#${generateId(nameValue(d))}`)
      .attr('stroke', '#000')
      .attr('stroke-width', '5');

    select(`#${generateId(nameValue(d))}-text`)
      .attr('style', 'visibility: visible');
  }

  const handleMouseLeave = (d) => {
    select(`#${generateId(nameValue(d))}`)
      .attr('stroke', '#fff')
      .attr('stroke-width', '1');

      select(`#${generateId(nameValue(d))}-text`)
      .attr('style', 'visibility: hidden');
  }

  return (
    data.map(d => (
      <>
        <circle
          onMouseEnter={() => handleMouseEnter(d)}
          onMouseLeave={() => handleMouseLeave(d)}
          id={generateId(nameValue(d))}
          key={nameValue(d)}
          cx={xScale(xValue(d))}
          cy={yScale(yValue(d))}
          r={rScale(rValue(d))}
          fill={colorScale(Math.ceil(xValue(d)))}
          stroke='#fff'
          opacity='.6'
        />
        <text x={xScale(xValue(d))} y={yScale(yValue(d))} className="planet-name" id={`${generateId(nameValue(d))}-text`}>{nameValue(d)}</text>
      </>
    ))
  )
}